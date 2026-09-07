/* AROMIKA.INFO · ROMI LIVE LOADER V2 · 1.0.50.33
 * Clean INFO bootstrap for the full backup-restore build.
 * Loads the same shell/functionality from aromika.shop and the common stable-window CSS.
 */
(function(){
'use strict';

var HOST=String(location.hostname||'').toLowerCase();
if(HOST!=='aromika.info'&&HOST!=='www.aromika.info')return;
if(window.__AROMIKA_ROMI_INFO_LIVE_V2__)return;
window.__AROMIKA_ROMI_INFO_LIVE_V2__=true;

var SHOP='https://aromika.shop';
var BASE=SHOP+'/js/addons/romi_connector/';
var STATIC='https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/romi/';
var BUILD='1.0.50.33';

window.AROMIKA_ASSISTANT_ASSET_BASE=STATIC;
window.ROMI_V8_CONFIG=Object.assign({},window.ROMI_V8_CONFIG||{}, {
  site:'info',
  apiBase:SHOP+'/index.php?dispatch=romi.',
  shopOrigin:SHOP,
  infoOrigin:'https://aromika.info'
});
window.ROMI_COMPLETE_CONFIG=Object.assign({},window.ROMI_COMPLETE_CONFIG||{}, {
  site:'info',
  apiBase:SHOP+'/index.php?dispatch=romi.',
  shopOrigin:SHOP,
  infoOrigin:'https://aromika.info',
  promotionsUrl:SHOP+'/bestsellery/'
});

function hasScript(fragment){
  return Array.prototype.some.call(document.scripts||[],function(s){return String(s.src||'').indexOf(fragment)!==-1});
}
function hasCss(fragment){
  return Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'),function(l){return String(l.href||'').indexOf(fragment)!==-1});
}
function css(file){
  if(hasCss(file))return;
  var l=document.createElement('link');
  l.rel='stylesheet';
  l.href=BASE+file+'?v='+BUILD;
  (document.head||document.documentElement).appendChild(l);
}
function js(file){
  return new Promise(function(resolve){
    if(hasScript('/'+file)){resolve(true);return;}
    var s=document.createElement('script');
    s.src=BASE+file+'?v='+BUILD;
    s.async=false;
    s.onload=function(){resolve(true)};
    s.onerror=function(){console.error('[ROMI INFO V2] failed:',file);resolve(false)};
    (document.head||document.documentElement).appendChild(s);
  });
}
function purgeLegacy(){
  var root=document.getElementById('aromika-assistant');
  if(root&&root.parentNode)root.parentNode.removeChild(root);
  Array.prototype.forEach.call(document.querySelectorAll('script[src]'),function(s){
    var src=String(s.src||'');
    if(
      src.indexOf('assistant-v9-5-')!==-1 ||
      src.indexOf('romi-info-bootstrap-v1.js')!==-1 ||
      src.indexOf('romi-info-live-v1.js')!==-1
    ){
      try{s.remove()}catch(e){}
    }
  });
  [
    '__AROMIKA_ASSISTANT_V100_CHAT__','__AROMIKA_ASSISTANT_V931__','__AROMIKA_ASSISTANT_V5__',
    '__AROMIKA_ROMI_CHAT_V10__','__AROMIKA_ROMI_LIVING_V2__','__AROMIKA_ROMI_UI_STABLE_PATCH_V1__',
    '__ROMI_FULL_FUNCTION_10502__'
  ].forEach(function(k){try{delete window[k]}catch(e){window[k]=false}});
}

async function boot(){
  purgeLegacy();
  css('romi-v9-3-ui.css');
  css('romi-window-stable-105033.css');

  await js('romi-crosssite-v1.js');
  await js('assistant-v9-3.js');
  await js('romi-chat-v10-core.js');
  await js('romi-living-v2.js');
  await js('romi-full-function-10502.js');
  await js('romi-info-cooperation-v2.js');
  await js('romi-ui-stable-patch-v1.js');

  window.__ROMI_INFO_FRONTEND_SOURCE__='shop-module-v2';
  window.__ROMI_INFO_FRONTEND_BUILD__=BUILD;
  document.documentElement.setAttribute('data-romi-build',BUILD+'-info');
  try{window.dispatchEvent(new CustomEvent('romi:info-live-ready',{detail:{build:BUILD}}))}catch(e){}
}

function start(){boot().catch(function(e){console.error('[ROMI INFO V2] boot error',e)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
