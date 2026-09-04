/* AROMIKA.INFO · ROMI V9.5.4 · SELF-HEALING BOOTSTRAP */
(function(){
'use strict';
if(window.__ROMI_V954_BOOT__) return;
window.__ROMI_V954_BOOT__=true;

var CDN='https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/';
var SHOP='https://aromika.shop';

window.AROMIKA_ASSISTANT_ASSET_BASE=window.AROMIKA_ASSISTANT_ASSET_BASE||CDN+'romi/';
window.ROMI_V8_CONFIG=Object.assign({},window.ROMI_V8_CONFIG||{}, {
  site:'info',
  apiBase:SHOP+'/index.php?dispatch=romi.',
  shopOrigin:SHOP,
  infoOrigin:'https://aromika.info'
});

function has(fragment){
  var s=document.getElementsByTagName('script');
  for(var i=0;i<s.length;i++) if(String(s[i].src||'').indexOf(fragment)!==-1) return true;
  return false;
}
function load(src,fragment){
  return new Promise(function(resolve){
    if(fragment&&has(fragment)){resolve(true);return}
    var s=document.createElement('script');
    s.src=src;s.async=false;
    s.onload=function(){resolve(true)};s.onerror=function(){resolve(false)};
    (document.head||document.documentElement).appendChild(s);
  });
}
function css(){
  if(document.getElementById('romi-ui-css')) return;
  var l=document.createElement('link');
  l.id='romi-ui-css';l.rel='stylesheet';
  l.href=CDN+'romi-v9-3-ui.css?v=9.5.4';
  (document.head||document.documentElement).appendChild(l);
}
function rootReady(){
  var r=document.getElementById('aromika-assistant');
  return !!(r&&r.querySelector('.aa-panel')&&r.querySelector('.aa-launcher'));
}
function waitRoot(ms){
  return new Promise(function(resolve){
    var st=Date.now();
    (function tick(){
      if(rootReady()){resolve(true);return}
      if(Date.now()-st>=ms){resolve(false);return}
      setTimeout(tick,100);
    })();
  });
}
async function boot(){
  css();
  await load(CDN+'assistant-v9-5-3.js?v=9.5.3','assistant-v9-5-3.js');
  await waitRoot(3000);
  load(CDN+'romi/romi-crosssite-v1-3.js?v=1.3.0','romi-crosssite-v1-3.js');
  load(CDN+'romi/romi-persist-v1.js?v=1.0.0','romi-persist-v1.js');
  load(CDN+'romi/romi-living-v2.js?v=2.0.0','romi-living-v2.js');

  if(!(window.AROMIKA_ROMI_CHAT&&typeof window.AROMIKA_ROMI_CHAT.ask==='function')){
    await load(SHOP+'/js/addons/romi_connector/romi-chat-v10-core.js?v=10.0.40','romi-chat-v10-core.js');
  }
}
function start(){boot().catch(function(e){console.error('[ROMI INFO 9.5.4]',e)})}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
