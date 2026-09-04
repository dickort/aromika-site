(function(){
'use strict';
if (window.__ROMI_V953_LOADER__) return;
window.__ROMI_V953_LOADER__ = true;

function loadIntegratedCore(){
  if (window.AROMIKA_ROMI_CHAT && typeof window.AROMIKA_ROMI_CHAT.ask === 'function') return;
  var existing = document.querySelector('script[src*="/js/addons/romi_connector/romi-chat-v10-core.js"]');
  if (existing) return;

  var s = document.createElement('script');
  s.src = 'https://aromika.shop/js/addons/romi_connector/romi-chat-v10-core.js?v=10.0.38';
  s.async = false;
  s.defer = true;
  s.setAttribute('data-romi-core', 'v9.5.3-customer-context');
  (document.head || document.documentElement).appendChild(s);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadIntegratedCore, {once:true});
} else {
  loadIntegratedCore();
}
})();
