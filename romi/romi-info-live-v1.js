/* AROMIKA.INFO · ROMI LIVE LOADER V1
 * Original ROMI 1.0.50 visual shell + site-aware 1.0.50.2 functional layer.
 * INFO uses aromika.shop as API/runtime source and keeps GitHub only for the loader/assets.
 */
(function(){
'use strict';

var HOST=String(location.hostname||'').toLowerCase();
if(HOST!=='aromika.info'&&HOST!=='www.aromika.info')return;
if(window.__AROMIKA_ROMI_INFO_LIVE_V1__)return;
window.__AROMIKA_ROMI_INFO_LIVE_V1__=true;

var SHOP='https://aromika.shop';
var INFO='https://aromika.info';
var BASE=SHOP+'/js/addons/romi_connector/';
var STATIC='https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/romi/';
var BUILD='1.0.50.2';

window.AROMIKA_ASSISTANT_ASSET_BASE=STATIC;
window.ROMI_V8_CONFIG=Object.assign({},window.ROMI_V8_CONFIG||{}, {
  site:'info',
  apiBase:SHOP+'/index.php?dispatch=romi.',
  shopOrigin:SHOP,
  infoOrigin:INFO
});
window.ROMI_COMPLETE_CONFIG=Object.assign({},window.ROMI_COMPLETE_CONFIG||{}, {
  site:'info',
  apiBase:SHOP+'/index.php?dispatch=romi.',
  shopOrigin:SHOP,
  infoOrigin:INFO,
  assetBase:STATIC,
  promotionsUrl:SHOP+'/bestsellery/'
});

function hasScript(fragment){
  return Array.prototype.some.call(document.scripts||[],function(s){return String(s.src||'').indexOf(fragment)!==-1});
}
function hasCss(fragment){
  return Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'),function(l){return String(l.href||'').indexOf(fragment)!==-1});
}
function css(src,fragment){
  if(hasCss(fragment))return;
  var l=document.createElement('link');
  l.rel='stylesheet';
  l.href=src;
  (document.head||document.documentElement).appendChild(l);
}
function js(src,fragment){
  return new Promise(function(resolve){
    if(hasScript(fragment)){resolve(true);return;}
    var s=document.createElement('script');
    s.src=src;
    s.async=false;
    s.onload=function(){resolve(true)};
    s.onerror=function(){console.error('[ROMI INFO LIVE] failed:',src);resolve(false)};
    (document.head||document.documentElement).appendChild(s);
  });
}
function removeLegacy(){
  /* Do not allow old/parallel ROMI cores to boot on INFO. */
  Array.prototype.forEach.call(document.querySelectorAll('script[src]'),function(s){
    var src=String(s.src||'');
    if(
      src.indexOf('assistant-v9-5-')!==-1 ||
      src.indexOf('romi-info-bootstrap-v1.js')!==-1 ||
      src.indexOf('romi-chat-v10-core.js')!==-1 ||
      src.indexOf('romi-living-v2.js')!==-1 ||
      src.indexOf('romi-info-cooperation-v2.js')!==-1 ||
      src.indexOf('romi-ui-stable-patch-v1.js')!==-1 ||
      src.indexOf('romi-v9-3-core.js')!==-1
    ){
      try{s.remove()}catch(e){}
    }
  });
}

async function boot(){
  removeLegacy();

  /* Exact original 1.0.50 visual layer from the installed CS-Cart module. */
  css(BASE+'romi-v9-3-ui.css?v='+BUILD,'romi-v9-3-ui.css');

  /* Shared INFO↔SHOP session first. */
  await js(BASE+'romi-crosssite-v1.js?v='+BUILD,'/romi-crosssite-v1.js');

  /* Original 1.0.50 shell/markup. */
  await js(BASE+'assistant-v9-3.js?v='+BUILD,'/assistant-v9-3.js');

  /* New site-aware functional layer. No visual replacement. */
  await js(BASE+'romi-full-function-10502.js?v='+BUILD,'/romi-full-function-10502.js');

  window.__ROMI_INFO_FRONTEND_SOURCE__='shop-module';
  window.__ROMI_INFO_FRONTEND_BUILD__=BUILD;
  window.__ROMI_INFO_SITE_MODE__='info';
  try{window.dispatchEvent(new CustomEvent('romi:info-live-ready',{detail:{build:BUILD,site:'info'}}))}catch(e){}
}

function start(){
  boot().catch(function(e){console.error('[ROMI INFO LIVE] boot error',e)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
