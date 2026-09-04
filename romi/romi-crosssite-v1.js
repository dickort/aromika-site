/* AROMIKA · ROMI CROSS-SITE BRIDGE V1.2.0
 * Keeps one ROMI session/context between aromika.info and aromika.shop.
 */
(function(){
'use strict';
if(window.__AROMIKA_ROMI_CROSSSITE_V12__)return;
window.__AROMIKA_ROMI_CROSSSITE_V12__=true;

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
 try{s='rs_'+Array.from(crypto.getRandomValues(new Uint8Array(24))).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
 catch(e){s='rs_'+Date.now()+Math.random().toString(36).slice(2)}
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
function normalizeLang(v){v=String(v||'').toLowerCase();return(v==='kk'||v==='kz'||v.indexOf('kk')===0)?'kk':'ru'}

function collectContext(){
 var lang='ru',ui=null,geo=null,onboarding='';
 try{lang=localStorage.getItem(LANG_KEY)||localStorage.getItem(SITE_LANG_KEY)||'ru'}catch(e){}
 lang=normalizeLang(lang);
 try{ui=safeJson(localStorage.getItem(UI_STATE_KEY))}catch(e){}
 try{geo=safeJson(localStorage.getItem(GEO_KEY))}catch(e){}
 try{onboarding=localStorage.getItem(ONBOARDING_KEY)||''}catch(e){}
 var out={lang:lang,ts:Date.now()};
 if(ui&&typeof ui==='object')out.ui={
  screen:ui.screen||'',visitPurpose:ui.visitPurpose||'',finderCategory:ui.finderCategory||'',finderNeed:ui.finderNeed||'',finderVolume:ui.finderVolume||'',
  repPurpose:ui.repPurpose||'',repCity:ui.repCity||'',businessType:ui.businessType||'',businessCity:ui.businessCity||''
 };
 if(geo&&geo.city)out.geo={city:geo.city,source:geo.source||'bridge',distance:Number(geo.distance)||0,ts:Number(geo.ts)||Date.now()};
 if(onboarding==='1')out.onboarding='1';
 try{
  var local=safeJson(localStorage.getItem(CORE_STATE_KEY));
  var cs=local&&local.session&&typeof local.session==='object'?local.session:null;
  if(cs){
   out.core={
    messages:Array.isArray(cs.messages)?cs.messages.slice(-6).map(function(m){return{role:m.role==='user'?'user':'assistant',text:String(m.text||'').slice(0,360)}}):[],
    last_query:String(cs.last_query||'').slice(0,240),customer_type:String(cs.customer_type||'').slice(0,40),
    city:String(cs.city||'').slice(0,80),selected_product_id:Number(cs.selected_product_id)||0,
    lang:normalizeLang(cs.lang||lang),updated_at:Number(cs.updated_at)||Date.now()
   };
  }
 }catch(e){}
 return out;
}
function mergeUi(ctx){
 if(!ctx||typeof ctx!=='object')return;
 try{
  var old=safeJson(localStorage.getItem(UI_STATE_KEY))||{};
  Object.keys(ctx).forEach(function(k){if(ctx[k]!==undefined&&ctx[k]!==null&&ctx[k]!=='')old[k]=ctx[k]});
  localStorage.setItem(UI_STATE_KEY,JSON.stringify(old));
 }catch(e){}
}
function importIncoming(){
 var u;try{u=new URL(location.href)}catch(e){return}
 var sid=u.searchParams.get('romi_session')||'';
 var ctx=dec(u.searchParams.get('romi_ctx')||'');
 if(validSid(sid)){try{localStorage.setItem(SID_KEY,sid)}catch(e){}}
 if(ctx&&typeof ctx==='object'){
  if(ctx.lang){var l=normalizeLang(ctx.lang);try{localStorage.setItem(LANG_KEY,l);localStorage.setItem(SITE_LANG_KEY,l)}catch(e){}}
  if(ctx.geo&&ctx.geo.city){try{localStorage.setItem(GEO_KEY,JSON.stringify(ctx.geo))}catch(e){}}
  if(ctx.onboarding==='1'){try{localStorage.setItem(ONBOARDING_KEY,'1')}catch(e){}}
  if(ctx.ui)mergeUi(ctx.ui);
  if(ctx.core&&typeof ctx.core==='object'&&validSid(sid)){
   try{
    var prev=safeJson(localStorage.getItem(CORE_STATE_KEY));
    var prevSession=prev&&prev.session&&typeof prev.session==='object'?prev.session:{};
    var prevTs=Number(prevSession.updated_at)||0,incTs=Number(ctx.core.updated_at)||0;
    if(!prev||prev.session_id!==sid||incTs>=prevTs){
     var merged=Object.assign({},prevSession,ctx.core,{updated_at:Math.max(incTs,Date.now())});
     localStorage.setItem(CORE_STATE_KEY,JSON.stringify({session_id:sid,session:merged}));
    }
   }catch(e){}
  }
  setTimeout(function(){try{window.dispatchEvent(new CustomEvent('romi:language',{detail:{language:normalizeLang(ctx.lang)}}))}catch(e){}},0);
 }
 if(sid||u.searchParams.has('romi_ctx')){
  u.searchParams.delete('romi_session');u.searchParams.delete('romi_ctx');
  try{history.replaceState(history.state,'',u.pathname+(u.search?u.search:'')+u.hash)}catch(e){}
 }
}
function saveRemote(){
 var sid=getSid(),local=null;
 try{local=safeJson(localStorage.getItem(CORE_STATE_KEY))}catch(e){}
 var session=local&&local.session&&typeof local.session==='object'?local.session:null;
 if(!session)return;
 try{fetch(API,{method:'POST',mode:'cors',credentials:'include',keepalive:true,headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({session_id:sid,session:session})}).catch(function(){})}catch(e){}
}
function isBridgeHost(host){host=String(host||'').toLowerCase();return host==='aromika.info'||host==='www.aromika.info'||host==='aromika.shop'||host==='www.aromika.shop'}
function isCrossSite(u){if(!u||!isBridgeHost(u.hostname))return false;var targetShop=u.hostname.indexOf('aromika.shop')>=0;return(IS_INFO&&targetShop)||(IS_SHOP&&!targetShop)}
function decorate(href){
 var u;try{u=new URL(href,location.href)}catch(e){return href}
 if(!isCrossSite(u))return href;
 u.searchParams.set('romi_session',getSid());
 var ctx=enc(collectContext());if(ctx)u.searchParams.set('romi_ctx',ctx);
 return u.toString();
}
function prepareAnchor(a){
 if(!a||!a.getAttribute)return;
 var href=a.getAttribute('href')||'';
 if(!href||/^(mailto:|tel:|sms:|javascript:|data:|#)/i.test(href))return;
 var next=decorate(href);
 if(next!==href){saveRemote();a.setAttribute('href',next);a.setAttribute('data-romi-bridge','1')}
}
function eventAnchor(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(a)prepareAnchor(a)}

importIncoming();
['pointerdown','mousedown','click','auxclick','contextmenu'].forEach(function(ev){document.addEventListener(ev,eventAnchor,true)});
window.addEventListener('pagehide',saveRemote);
window.AROMIKA_ROMI_BRIDGE={decorate:decorate,save:saveRemote,context:collectContext,sessionId:getSid};
})();
