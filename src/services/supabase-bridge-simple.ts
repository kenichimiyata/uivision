/**
 * Supabase Bridge - Simplified Polling Version
 * Service Worker互換
 */

console.log('[Supabase Bridge] Loading...');

// グローバルに設定して他のモジュールからアクセス可能に
self.SUPABASE_POLLING_ACTIVE = false;

export async function initSimpleSupabaseBridge() {
  console.log('[Supabase Bridge] Initializing simple polling version...');
  
  const SUPABASE_URL = 'https://rootomzbucovwdqsscqd.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvb3RvbXpidWNvdndkcXNzY3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4OTE4ODMsImV4cCI6MjA1MTQ2Nzg4M30.fYKOe-HPh4WUdvBhEJxakLWCMQBp4E90EDwARk7ucf8';
  
  async function pollCommands() {
    try {
      console.log('[Supabase Bridge] Polling for commands...');
      
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/rpa_commands?status=eq.pending&order=created_at.asc&limit=10`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        console.error('[Supabase Bridge] Poll failed:', response.status, response.statusText);
        return;
      }
      
      const commands = await response.json();
      console.log(`[Supabase Bridge] Found ${commands.length} pending commands`);
      
      for (const cmd of commands) {
        await handleCommand(cmd);
      }
    } catch (error) {
      console.error('[Supabase Bridge] Poll error:', error);
    }
  }
  
  async function handleCommand(cmd) {
    console.log('[Supabase Bridge] Handling command:', cmd.command, cmd.id);
    
    // ステータスを running に更新
    await updateCommandStatus(cmd.id, 'running');
    
    try {
      let result = null;
      
      if (cmd.command === 'screenshot') {
        result = await takeScreenshot();
      } else if (cmd.command === 'dify-import') {
        result = await difyImport(cmd.params);
      } else if (cmd.command === 'run-macro') {
        result = await runMacro(cmd.params);
      } else {
        throw new Error(`Unknown command: ${cmd.command}`);
      }
      
      await updateCommandStatus(cmd.id, 'completed', result);
      console.log('[Supabase Bridge] Command completed:', cmd.id);
    } catch (error) {
      console.error('[Supabase Bridge] Command failed:', error);
      await updateCommandStatus(cmd.id, 'failed', null, error.message);
    }
  }
  
  async function updateCommandStatus(id, status, result = null, error = null) {
    const SUPABASE_URL = 'https://rootomzbucovwdqsscqd.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvb3RvbXpidWNvdndkcXNzY3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4OTE4ODMsImV4cCI6MjA1MTQ2Nzg4M30.fYKOe-HPh4WUdvBhEJxakLWCMQBp4E90EDwARk7ucf8';
    
    const updates = {
      status,
      updated_at: new Date().toISOString()
    };
    
    if (result !== null) updates.result = result;
    if (error !== null) updates.error = error;
    
    await fetch(
      `${SUPABASE_URL}/rest/v1/rpa_commands?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(updates)
      }
    );
  }
  
  async function takeScreenshot() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve({ dataUrl: dataUrl.substring(0, 100) + '...' }); // 短縮版
            }
          });
        } else {
          reject(new Error('No active tab'));
        }
      });
    });
  }
  
  async function difyImport(params) {
    console.log('[Supabase Bridge] Dify import:', params);
    // TODO: 実装
    return { success: true, message: 'Dify import not yet implemented' };
  }
  
  async function runMacro(params) {
    console.log('[Supabase Bridge] Run macro:', params);
    // TODO: 実装
    return { success: true, message: 'Run macro not yet implemented' };
  }
  
  // ポーリング開始
  self.SUPABASE_POLLING_ACTIVE = true;
  console.log('[Supabase Bridge] Starting polling (every 5 seconds)...');
  setInterval(pollCommands, 5000);
  
  // 即座に1回実行
  pollCommands();
}
