/* AROMIKA · ROMI PERSIST V1.0.1
 * Keeps the ROMI shell mounted on aromika.shop and aromika.info.
 * First choice: reattach the existing DOM root so chat state/listeners stay intact.
 * Fallback: rebuild the shell only if the previous root is gone or invalid.
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
var lastRoot=null;

function validRoot(r){
  return !!(r&&r.querySelector&&r.querySelector('.aa-panel')&&r.querySelector('.aa-launcher'));
}
function currentRoot(){
  var r=document.getElementById('aromika-assistant');
  if(validRoot(r)) lastRoot=r;
  return r;
}
function rootReady(){
  var r=currentRoot();
  return !!(validRoot(r)&&r.isConnected);
}
function reattachLastRoot(){
  if(rootReady()) return true;
  if(!validRoot(lastRoot)||!document.body) return false;
  try{
    var duplicate=document.getElementById('aromika-assistant');
    if(duplicate&&duplicate!==lastRoot&&duplicate.parentNode) duplicate.parentNode.removeChild(duplicate);
    document.body.appendChild(lastRoot);
    return rootReady();
  }catch(e){return false}
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
  if(now-lastRepair<900) return;
  repairing=true;
  lastRepair=now;
  try{
    await new Promise(function(r){setTimeout(r,250)});
    if(rootReady()) return;

    // Best path: the site removed our node during a dynamic page update.
    // Put the very same node back: chat DOM, state and event listeners survive.
    if(reattachLastRoot()){
      try{window.dispatchEvent(new CustomEvent('romi:persist-reattach',{detail:{site:IS_SHOP?'shop':'info',reason:String(reason||'watchdog')}}))}catch(e){}
      return;
    }

    // Fallback for a hard navigation/complete destruction of the old node.
    var partial=document.getElementById('aromika-assistant');
    if(partial&&partial.parentNode) partial.parentNode.removeChild(partial);
    resetGuards();
    await inject();
    await waitRoot(3500);
    currentRoot();

    try{window.dispatchEvent(new CustomEvent('romi:persist-repair',{detail:{site:IS_SHOP?'shop':'info',reason:String(reason||'watchdog')}}))}catch(e){}
  }finally{
    repairing=false;
  }
}
function check(reason){
  if(rootReady()) return;
  if(reattachLastRoot()) return;
  repair(reason);
}

function start(){
  currentRoot();
  check('startup');

  if(document.body){
    var mo=new MutationObserver(function(){
      currentRoot();
      if(!rootReady()) check('dom-mutation');
    });
    mo.observe(document.body,{childList:true,subtree:true});
  }

  setInterval(function(){check('interval')},2500);
  window.addEventListener('pageshow',function(){setTimeout(function(){check('pageshow')},100)});
  window.addEventListener('popstate',function(){setTimeout(function(){check('popstate')},150)});
  window.addEventListener('hashchange',function(){setTimeout(function(){check('hashchange')},150)});
  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==='visible') setTimeout(function(){check('visible')},100);
  });
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
