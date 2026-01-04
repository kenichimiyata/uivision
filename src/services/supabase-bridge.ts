/**
 * Supabase Realtime Bridge
 * AI Agentと拡張機能間の通信ブリッジ
 */

import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

interface CommandMessage {
  id: string;
  command: string;
  params: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  created_at: string;
  updated_at?: string;
}

export class SupabaseBridge {
  private supabase: SupabaseClient;
  private channel: RealtimeChannel | null = null;
  private commandHandlers: Map<string, (params: any) => Promise<any>> = new Map();

  constructor(url: string, anonKey: string) {
    this.supabase = createClient(url, anonKey);
    this.registerDefaultHandlers();
  }

  /**
   * デフォルトコマンドハンドラーを登録
   */
  private registerDefaultHandlers() {
    // Difyインポートコマンド
    this.registerCommand('dify-import', async (params) => {
      const { url, yamlPath } = params;
      // DifyAutomationServiceを使用
      const difyService = await import('./dify-automation');
      const macro = difyService.generateImportMacro(url, yamlPath);
      await difyService.saveMacro(macro, 'DifyImportFromAI');
      // マクロを実行（UI.Vision APIを使用）
      return { success: true, macroName: 'DifyImportFromAI' };
    });

    // RPAマクロ実行コマンド
    this.registerCommand('run-macro', async (params) => {
      const { macroName } = params;
      // chrome.runtime.sendMessageでマクロ実行を指示
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { cmd: 'playMacro', args: { name: macroName } },
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
    this.registerCommand('screenshot', async (params) => {
      return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
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
   * Realtimeチャネルに接続してコマンドを監視
   * ポーリング方式（Realtime未対応の場合）
   */
  async connect() {
    console.log('✅ Supabase Bridge connected (polling mode)');
    
    // 5秒ごとにpendingコマンドをポーリング
    setInterval(async () => {
      try {
        const { data, error } = await this.supabase
          .from('rpa_commands')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
          .limit(10);

        if (error) {
          console.error('❌ Polling error:', error);
          return;
        }

        if (data && data.length > 0) {
          console.log(`📥 Found ${data.length} pending commands`);
          for (const command of data) {
            await this.handleCommand(command as CommandMessage);
          }
        }
      } catch (err) {
        console.error('❌ Polling exception:', err);
      }
    }, 5000); // 5秒ごと
  }

  /**
   * コマンドを実行
   */
  private async handleCommand(command: CommandMessage) {
    console.log('📥 Received command:', command);

    try {
      // ステータスを実行中に更新
      await this.updateCommandStatus(command.id, 'running');

      const handler = this.commandHandlers.get(command.command);
      if (!handler) {
        throw new Error(`Unknown command: ${command.command}`);
      }

      // コマンド実行
      const result = await handler(command.params);

      // 成功ステータスと結果を更新
      await this.updateCommandStatus(command.id, 'completed', result);
      console.log('✅ Command completed:', command.command);
    } catch (error) {
      // エラーステータスを更新
      await this.updateCommandStatus(
        command.id,
        'failed',
        null,
        error instanceof Error ? error.message : String(error)
      );
      console.error('❌ Command failed:', error);
    }
  }

  /**
   * コマンドステータスを更新
   */
  private async updateCommandStatus(
    id: string,
    status: CommandMessage['status'],
    result?: any,
    error?: string
  ) {
    const updates: Partial<CommandMessage> = {
      status,
      updated_at: new Date().toISOString()
    };

    if (result !== undefined) updates.result = result;
    if (error !== undefined) updates.error = error;

    await this.supabase
      .from('rpa_commands')
      .update(updates)
      .eq('id', id);
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

export function initSupabaseBridge(url: string, anonKey: string): SupabaseBridge {
  if (!bridgeInstance) {
    bridgeInstance = new SupabaseBridge(url, anonKey);
    bridgeInstance.connect();
  }
  return bridgeInstance;
}

export function getSupabaseBridge(): SupabaseBridge | null {
  return bridgeInstance;
}
