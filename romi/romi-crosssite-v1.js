/* AROMIKA · ROMI CROSS-SITE BRIDGE V1.0.1
 * Syncs ROMI context between aromika.info and aromika.shop.
 * Uses the existing ROMI server session endpoint on aromika.shop.
 */
(function(){
'use strict';
if(window.__AROMIKA_ROMI_CROSSSITE_V1__)return;
window.__AROMIKA_ROMI_CROSSSITE_V1__=true;

var HOST=String(location.hostname||'').toLowerCase();
var IS_INFO=HOST==='aromika.info'||HOST==='www.aromika.info';
var IS_SHOP=HOST==='aromika.shop'||HOST==='www.aromika.shop';
if(!IS_INFO&&!IS_SHOP)return;

var SID_KEY='romi-v8-session-id';
var CORE_STATE_KEY='romi-v8-local-state-v2';
var LANG_KEY='aromika-romi-language';
var SITE_LANG_KEY='aromika-language';
var UI_STATE_KEY='aromika-romi-ui-state-v1';
var ONBOARDING_KEY='aromika-romi-onboarding-v2';
var GEO_KEY='aromika-romi-nearest-city-v1';
var API='https://aromika.shop/index.php?dispatch=romi.session_save';

function safeJson(raw){try{return JSON.parse(raw||'null')}catch(e){return null}}
function validSid(v){return /^[a-zA-Z0-9_-]{24,80}$/.test(String(v||''))}
function getSid(){
 var s='';
 try{s=localStorage.getItem(SID_KEY)||''}catch(e){}
 if(validSid(s))return s;
 try{
  s='rs_'+Array.from(crypto.getRandomValues(new Uint8Array(24))).map(function(x){return x.toString(16).padStart(2,'0')}).join('');
 }catch(e){s='rs_'+Date.now()+Math.random().toString(36).slice(2)}
 try{localStorage.setItem(SID_KEY,s)}catch(e){}
 return s;
}
function enc(obj){
 try{
  var json=JSON.stringify(obj||{}),bytes=new TextEncoder().encode(json),bin='';
  for(var i=0;i<bytes.length;i++)bin+=String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
 }catch(e){return''}
}
function dec(raw){
 try{
  var s=String(raw||'').replace(/-/g,'+').replace(/_/g,'/');
  while(s.length%4)s+='=';
  var bin=atob(s),bytes=new Uint8Array(bin.length);
  for(var i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  return JSON.parse(new TextDecoder().decode(bytes));
 }catch(e){return null}
}

function collectContext(){
 var lang='ru',ui=null,geo=null,onboarding='';
 try{lang=localStorage.getItem(LANG_KEY)||localStorage.getItem(SITE_LANG_KEY)||'ru'}catch(e){}
 lang=(String(lang).toLowerCase()==='kk'||String(lang).toLowerCase()==='kz')?'kk':'ru';
 try{ui=safeJson(localStorage.getItem(UI_STATE_KEY))}catch(e){}
 try{geo=safeJson(localStorage.getItem(GEO_KEY))}catch(e){}
 try{onboarding=localStorage.getItem(ONBOARDING_KEY)||''}catch(e){}
 var out={lang:lang,ts:Date.now()};
 if(ui&&typeof ui==='object'){
  out.ui={
   visitPurpose:ui.visitPurpose||'',
   repCity:ui.repCity||'',
   businessType:ui.businessType||'',
   businessCity:ui.businessCity||''
  };
 }
 if(geo&&geo.city)out.geo={city:geo.city,source:geo.source||'bridge',distance:Number(geo.distance)||0,ts:Number(geo.ts)||Date.now()};
 if(onboarding==='1')out.onboarding='1';
 return out;
}

function emitImported(lang,ctx){
 setTimeout(function(){
  if(lang==='ru'||lang==='kk'){
   try{window.dispatchEvent(new CustomEvent('romi:language',{detail:{language:lang,source:'crosssite'}}))}catch(e){}
  }
  if(ctx&&ctx.geo&&ctx.geo.city){
   try{window.dispatchEvent(new CustomEvent('romi:location',{detail:{city:ctx.geo.city,distance:Number(ctx.geo.distance)||0,source:'bridge'}}))}catch(e){}
  }
  try{window.dispatchEvent(new CustomEvent('romi:crosssite-import',{detail:{from:IS_INFO?'shop':'info',context:ctx||{}}}))}catch(e){}
 },0);
}

function importIncoming(){
 var u;try{u=new URL(location.href)}catch(e){return}
 var sid=u.searchParams.get('romi_session')||'';
 var ctx=dec(u.searchParams.get('romi_ctx')||'');
 var importedLang='';
 if(validSid(sid)){
  try{localStorage.setItem(SID_KEY,sid)}catch(e){}
 }
 if(ctx&&typeof ctx==='object'){
  if(ctx.lang==='ru'||ctx.lang==='kk'){
   importedLang=ctx.lang;
   try{localStorage.setItem(LANG_KEY,ctx.lang);localStorage.setItem(SITE_LANG_KEY,ctx.lang)}catch(e){}
  }
  if(ctx.geo&&ctx.geo.city){
   try{localStorage.setItem(GEO_KEY,JSON.stringify(ctx.geo))}catch(e){}
  }
  if(ctx.onboarding==='1'){
   try{localStorage.setItem(ONBOARDING_KEY,'1')}catch(e){}
  }
  if(ctx.ui&&typeof ctx.ui==='object'){
   try{
    var old=safeJson(localStorage.getItem(UI_STATE_KEY))||{};
    ['visitPurpose','repCity','businessType','businessCity'].forEach(function(k){if(ctx.ui[k])old[k]=ctx.ui[k]});
    localStorage.setItem(UI_STATE_KEY,JSON.stringify(old));
   }catch(e){}
  }
 }
 if(sid||u.searchParams.has('romi_ctx')){
  u.searchParams.delete('romi_session');
  u.searchParams.delete('romi_ctx');
  try{history.replaceState(history.state,'',u.pathname+(u.search?u.search:'')+u.hash)}catch(e){}
 }
 if(validSid(sid)||ctx)emitImported(importedLang,ctx);
}

function saveRemote(){
 var sid=getSid(),local=null;
 try{local=safeJson(localStorage.getItem(CORE_STATE_KEY))}catch(e){}
 var session=local&&local.session&&typeof local.session==='object'?local.session:null;
 if(!session)return;
 try{
  fetch(API,{
   method:'POST',
   mode:'cors',
   credentials:'include',
   keepalive:true,
   headers:{'Accept':'application/json','Content-Type':'application/json'},
   body:JSON.stringify({session_id:sid,session:session})
  }).catch(function(){});
 }catch(e){}
}

function isBridgeHost(host){
 host=String(host||'').toLowerCase();
 return host==='aromika.info'||host==='www.aromika.info'||host==='aromika.shop'||host==='www.aromika.shop';
}
function isCrossSite(u){
 if(!u||!isBridgeHost(u.hostname))return false;
 var targetShop=u.hostname.indexOf('aromika.shop')>=0;
 return (IS_INFO&&targetShop)||(IS_SHOP&&!targetShop);
}
function decorate(href){
 var u;try{u=new URL(href,location.href)}catch(e){return href}
 if(!isCrossSite(u))return href;
 var sid=getSid();
 u.searchParams.set('romi_session',sid);
 var ctx=enc(collectContext());
 if(ctx)u.searchParams.set('romi_ctx',ctx);
 return u.toString();
}
function prepareAnchor(a){
 if(!a||!a.getAttribute)return;
 var href=a.getAttribute('href')||'';
 if(!href||/^(mailto:|tel:|sms:|javascript:|data:|#)/i.test(href))return;
 var next=decorate(href);
 if(next!==href){
  saveRemote();
  a.setAttribute('href',next);
  a.setAttribute('data-romi-bridge','1');
 }
}
function eventAnchor(e){
 var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
 if(a)prepareAnchor(a);
}

/* Import immediately; core itself also understands romi_session. */
importIncoming();

/* Capture navigation gestures, including opening links in a new tab. */
document.addEventListener('pointerdown',eventAnchor,true);
document.addEventListener('mousedown',eventAnchor,true);
document.addEventListener('click',eventAnchor,true);
document.addEventListener('auxclick',eventAnchor,true);
document.addEventListener('contextmenu',eventAnchor,true);

window.AROMIKA_ROMI_BRIDGE={
 decorate:decorate,
 save:saveRemote,
 context:collectContext,
 sessionId:getSid
};

})();
