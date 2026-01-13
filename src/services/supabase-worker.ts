/**
 * Service Worker用のSupabase軽量クライアント
 * documentを使わない実装
 */

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

export class SupabaseWorkerClient {
  private supabaseUrl: string;
  private supabaseKey: string;
  private pollingInterval: number | null = null;
  private commandHandlers: Map<string, (params: any) => Promise<any>> =
    new Map();

  constructor(url: string, key: string) {
    this.supabaseUrl = url;
    this.supabaseKey = key;
    this.registerDefaultHandlers();
  }

  private registerDefaultHandlers() {
    // スクリーンショットコマンド
    this.registerCommand("screenshot", async (params) => {
      return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab(
          null as any,
          { format: "png" },
          (dataUrl) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve({ dataUrl: dataUrl?.substring(0, 100) + "..." });
            }
          }
        );
      });
    });

    // RPAマクロ実行コマンド
    this.registerCommand("run-macro", async (params) => {
      const { macroName } = params;
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
  }

  registerCommand(command: string, handler: (params: any) => Promise<any>) {
    this.commandHandlers.set(command, handler);
  }

  async connect() {
    console.log("🔌 Starting Supabase polling (lightweight mode)...");

    this.pollingInterval = setInterval(async () => {
      await this.checkPendingCommands();
    }, 3000) as any;

    // 初回実行
    await this.checkPendingCommands();
  }

  private async checkPendingCommands() {
    try {
      const response = await fetch(
        `${this.supabaseUrl}/rest/v1/rpa_commands?status=eq.pending&order=created_at.asc&limit=10`,
        {
          headers: {
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("❌ Polling error:", response.statusText);
        return;
      }

      const commands = await response.json();

      if (commands && commands.length > 0) {
        console.log(`📥 Found ${commands.length} pending commands`);
        for (const command of commands) {
          await this.handleCommand(command as CommandMessage);
        }
      }
    } catch (err) {
      console.error("❌ Polling exception:", err);
    }
  }

  private async handleCommand(command: CommandMessage) {
    console.log("📥 Processing command:", command.command);

    try {
      // ステータスを実行中に更新
      await this.updateCommandStatus(command.id, "running");

      const handler = this.commandHandlers.get(command.command);
      if (!handler) {
        throw new Error(`Unknown command: ${command.command}`);
      }

      const result = await handler(command.params);
      await this.updateCommandStatus(command.id, "completed", result);
      console.log("✅ Command completed:", command.command);
    } catch (error) {
      await this.updateCommandStatus(
        command.id,
        "failed",
        null,
        error instanceof Error ? error.message : String(error)
      );
      console.error("❌ Command failed:", error);
    }
  }

  private async updateCommandStatus(
    id: string,
    status: CommandMessage["status"],
    result?: any,
    error?: string
  ) {
    const updates: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (result !== undefined) updates.result = result;
    if (error !== undefined) updates.error = error;

    await fetch(`${this.supabaseUrl}/rest/v1/rpa_commands?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(updates),
    });
  }

  disconnect() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

// シングルトンインスタンス
let clientInstance: SupabaseWorkerClient | null = null;

export function initSupabaseWorker(
  url: string,
  key: string
): SupabaseWorkerClient {
  if (!clientInstance) {
    clientInstance = new SupabaseWorkerClient(url, key);
    clientInstance.connect();
    console.log("✅ Supabase Worker Client initialized");
  }
  return clientInstance;
}

export function getSupabaseWorker(): SupabaseWorkerClient | null {
  return clientInstance;
}
