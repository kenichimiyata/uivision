"use strict";
(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[34],{

/***/ 52034:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



/**
 * Supabase Bridge初期化エントリーポイント
 * bg.jsの最初で実行される
 */

// Supabase設定
var SUPABASE_CONFIG = {
  url: 'https://rootomzbucovwdqsscqd.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvb3RvbXpidWNvdndkcXNzY3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4OTE4ODMsImV4cCI6MjA1MTQ2Nzg4M30.fYKOe-HPh4WUdvBhEJxakLWCMQBp4E90EDwARk7ucf8'
};
console.log('🔧 Initializing Supabase Bridge...');
Promise.all(/* import() */[__webpack_require__.e(515), __webpack_require__.e(901)]).then(__webpack_require__.bind(__webpack_require__, 901)).then(function (_ref) {
  var initSupabaseBridge = _ref.initSupabaseBridge;
  initSupabaseBridge(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  console.log('✅ Supabase Realtime Bridge initialized');
})["catch"](function (e) {
  console.error('❌ Supabase Bridge initialization failed:', e);
});

/***/ })

}]);