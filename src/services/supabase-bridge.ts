/**
 * Supabase Realtime Bridge
 * AI Agentと拡張機能間の通信ブリッジ
 */

import {
  createClient,
  RealtimeChannel,
  SupabaseClient,
} from "@supabase/supabase-js";

interface CommandMessage {
  id: string;
  command: string;
  params: any;
  status: "pending" | "running" | "completed" | "failed";
  result?: any;
  error?: string;
  created_at: string;
  updated_at?: string;
}

export class SupabaseBridge {
  private supabase: SupabaseClient;
  private channel: RealtimeChannel | null = null;
  private commandHandlers: Map<string, (params: any) => Promise<any>> =
    new Map();

  constructor(url: string, anonKey: string) {
    this.supabase = createClient(url, anonKey);
    this.registerDefaultHandlers();
  }

  /**
   * デフォルトコマンドハンドラーを登録
   */
  private registerDefaultHandlers() {
    // Difyインポートコマンド（未実装）
    this.registerCommand("dify-import", async (params) => {
      const { url, yamlPath } = params;
      // TODO: Dify自動インポート機能を実装
      console.warn("dify-import command not implemented yet");
      return { success: false, message: "Not implemented" };
    });

    // RPAマクロ実行コマンド
    this.registerCommand("run-macro", async (params) => {
      const { macroName } = params;
      // chrome.runtime.sendMessageでマクロ実行を指示
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { cmd: "playMacro", args: { name: macroName } },
          (response) => {
            if (response?.error) {
              reject(new Error(response.error));
            } else {
              resolve(response);
            }
          }
        );
      });
    });

    // スクリーンショットコマンド
    this.registerCommand("screenshot", async (params) => {
      return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve({ dataUrl });
          }
        });
      });
    });
  }

  /**
   * カスタムコマンドハンドラーを登録
   */
  registerCommand(command: string, handler: (params: any) => Promise<any>) {
    this.commandHandlers.set(command, handler);
  }

  /**
   * Realtimeチャネルに接続してコマンドをリアルタイム監視
   */
  async connect() {
    console.log("🔌 Connecting to Supabase Realtime...");

    // 既存のpendingコマンドを処理
    await this.processPendingCommands();

    // Realtimeチャネルを作成
    this.channel = this.supabase
      .channel("rpa_commands_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rpa_commands",
          filter: "status=eq.pending",
        },
        (payload) => {
          console.log("📥 New command received:", payload);
          this.handleCommand(payload.new as CommandMessage);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rpa_commands",
          filter: "status=eq.pending",
        },
        (payload) => {
          console.log("🔄 Command updated to pending:", payload);
          this.handleCommand(payload.new as CommandMessage);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("✅ Supabase Realtime connected");
        } else if (status === "CHANNEL_ERROR") {
          console.error("❌ Realtime connection error");
        } else if (status === "TIMED_OUT") {
          console.error("⏱️ Realtime connection timeout");
        }
      });
  }

  /**
   * 既存のpendingコマンドを処理
   */
  private async processPendingCommands() {
    try {
      const { data, error } = await this.supabase
        .from("rpa_commands")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("❌ Failed to fetch pending commands:", error);
        return;
      }

      if (data && data.length > 0) {
        console.log(`📋 Processing ${data.length} pending commands`);
        for (const command of data) {
          await this.handleCommand(command as CommandMessage);
        }
      }
    } catch (err) {
      console.error("❌ Exception in processPendingCommands:", err);
    }
  }

  /**
   * コマンドを実行
   */
  private async handleCommand(command: CommandMessage) {
    console.log("📥 Received command:", command);

    try {
      // ステータスを実行中に更新
      await this.updateCommandStatus(command.id, "running");

      const handler = this.commandHandlers.get(command.command);
      if (!handler) {
        throw new Error(`Unknown command: ${command.command}`);
      }

      // コマンド実行
      const result = await handler(command.params);

      // 成功ステータスと結果を更新
      await this.updateCommandStatus(command.id, "completed", result);
      console.log("✅ Command completed:", command.command);
    } catch (error) {
      // エラーステータスを更新
      await this.updateCommandStatus(
        command.id,
        "failed",
        null,
        error instanceof Error ? error.message : String(error)
      );
      console.error("❌ Command failed:", error);
    }
  }

  /**
   * コマンドステータスを更新
   */
  private async updateCommandStatus(
    id: string,
    status: CommandMessage["status"],
    result?: any,
    error?: string
  ) {
    const updates: Partial<CommandMessage> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (result !== undefined) updates.result = result;
    if (error !== undefined) updates.error = error;

    await this.supabase.from("rpa_commands").update(updates).eq("id", id);
  }

  /**
   * 切断
   */
  async disconnect() {
    if (this.channel) {
      await this.channel.unsubscribe();
      this.channel = null;
    }
  }
}

// シングルトンインスタンス
let bridgeInstance: SupabaseBridge | null = null;

export function initSupabaseBridge(
  url: string,
  anonKey: string
): SupabaseBridge {
  if (!bridgeInstance) {
    bridgeInstance = new SupabaseBridge(url, anonKey);
    bridgeInstance.connect();
  }
  return bridgeInstance;
}

export function getSupabaseBridge(): SupabaseBridge | null {
  return bridgeInstance;
}
