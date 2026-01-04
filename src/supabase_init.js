/**
 * Supabase Bridge初期化エントリーポイント
 * bg.jsの最初で実行される
 */

// Supabase設定
const SUPABASE_CONFIG = {
  url: 'https://rootomzbucovwdqsscqd.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvb3RvbXpidWNvdndkcXNzY3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4OTE4ODMsImV4cCI6MjA1MTQ2Nzg4M30.fYKOe-HPh4WUdvBhEJxakLWCMQBp4E90EDwARk7ucf8'
};

console.log('🔧 Initializing Supabase Bridge...');

import('./services/supabase-bridge').then(({ initSupabaseBridge }) => {
  initSupabaseBridge(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  console.log('✅ Supabase Realtime Bridge initialized');
}).catch((e) => {
  console.error('❌ Supabase Bridge initialization failed:', e);
});
