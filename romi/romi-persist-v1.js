/* AROMIKA · ROMI PERSIST V1.0.0
 * Keeps the ROMI shell mounted on aromika.shop and aromika.info.
 */
(function(){
'use strict';
if(window.__AROMIKA_ROMI_PERSIST_V1__) return;
window.__AROMIKA_ROMI_PERSIST_V1__=true;

var HOST=String(location.hostname||'').toLowerCase();
var IS_SHOP=HOST==='aromika.shop'||HOST==='www.aromika.shop';
var IS_INFO=HOST==='aromika.info'||HOST==='www.aromika.info';
if(!IS_SHOP&&!IS_INFO) return;

var repairing=false;
var lastRepair=0;
var timer=null;

function rootReady(){
  var r=document.getElementById('aromika-assistant');
  return !!(r&&r.isConnected&&r.querySelector('.aa-panel')&&r.querySelector('.aa-launcher'));
}

function resetGuards(){
  var keys=IS_SHOP
    ? ['__AROMIKA_ASSISTANT_V100_CHAT__','__AROMIKA_ASSISTANT_V931__','__AROMIKA_ASSISTANT_V5__']
    : ['__AROMIKA_ASSISTANT_V953__','__AROMIKA_ASSISTANT_V952__','__AROMIKA_ASSISTANT_V951__','__AROMIKA_ASSISTANT_V5__'];
  keys.forEach(function(k){
    try{delete window[k]}catch(e){try{window[k]=false}catch(_e){}}
  });
}

function assistantSrc(){
  if(IS_SHOP){
    return 'https://aromika.shop/js/addons/romi_connector/assistant-v9-3.js?v=10.0.40-persist-'+Date.now();
  }
  return 'https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/assistant-v9-5-3.js?v=9.5.3-persist-'+Date.now();
}

function inject(){
  return new Promise(function(resolve){
    var s=document.createElement('script');
    s.src=assistantSrc();
    s.async=false;
    s.setAttribute('data-romi-persist-repair','1');
    s.onload=function(){resolve(true)};
    s.onerror=function(){resolve(false)};
    (document.head||document.documentElement).appendChild(s);
  });
}

function waitRoot(maxMs){
  return new Promise(function(resolve){
    var started=Date.now();
    (function tick(){
      if(rootReady()){resolve(true);return}
      if(Date.now()-started>=maxMs){resolve(false);return}
      setTimeout(tick,100);
    })();
  });
}

async function repair(reason){
  if(rootReady()||repairing) return;
  var now=Date.now();
  if(now-lastRepair<1200) return;
  repairing=true;
  lastRepair=now;
  try{
    // Give Tilda/CS-Cart a moment to finish its own page replacement first.
    await new Promise(function(r){setTimeout(r,350)});
    if(rootReady()) return;

    var partial=document.getElementById('aromika-assistant');
    if(partial&&partial.parentNode) partial.parentNode.removeChild(partial);
    resetGuards();
    await inject();
    await waitRoot(3500);

    try{
      window.dispatchEvent(new CustomEvent('romi:persist-repair',{detail:{site:IS_SHOP?'shop':'info',reason:String(reason||'watchdog')}}));
    }catch(e){}
  }finally{
    repairing=false;
  }
}

function check(reason){
  if(!rootReady()) repair(reason);
}

function start(){
  check('startup');

  if(document.body){
    var mo=new MutationObserver(function(){
      if(!rootReady()) check('dom-mutation');
    });
    mo.observe(document.body,{childList:true,subtree:true});
  }

  timer=setInterval(function(){check('interval')},3000);
  window.addEventListener('pageshow',function(){setTimeout(function(){check('pageshow')},120)});
  window.addEventListener('popstate',function(){setTimeout(function(){check('popstate')},180)});
  window.addEventListener('hashchange',function(){setTimeout(function(){check('hashchange')},180)});
  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==='visible') setTimeout(function(){check('visible')},120);
  });
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
