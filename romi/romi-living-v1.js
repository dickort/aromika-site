/* AROMIKA.INFO · ROMI LIVING LAYER V1.0.0
 * Safe add-on for assistant-v9-5-3.js.
 * Feature 1: browser geolocation -> nearest existing ROMI representative city.
 * Does not replace core ROMI, search, cart, persistence, or navigation.
 */
(function(){
'use strict';

var HOST=String(location.hostname||'').toLowerCase();
if(HOST==='aromika.shop'||HOST==='www.aromika.shop')return;
if(window.__AROMIKA_ROMI_LIVING_V1__)return;
window.__AROMIKA_ROMI_LIVING_V1__=true;

var GEO_KEY='aromika-romi-nearest-city-v1';
var GEO_DENIED_KEY='aromika-romi-geo-denied-v1';
var LANG_KEY='aromika-romi-language';
var MAX_AGE=30*24*60*60*1000;
var DENIED_COOLDOWN=7*24*60*60*1000;
var locating=false;
var autoSelecting=false;

/* Coordinates are city centres, used only for nearest-branch calculation in the browser. */
var CITIES={
 'Алматы':[43.2383,76.9450],
 'Балхаш':[46.8481,74.9950],
 'Жезказган':[47.7833,67.7667],
 'Караганда':[49.8064,73.0855],
 'Кокшетау':[53.2833,69.4000],
 'Петропавловск':[54.8728,69.1430],
 'Рудный':[52.9729,63.1168],
 'Уральск':[51.2333,51.3667],
 'Атырау':[47.0945,51.9238],
 'Актобе':[50.2839,57.1670],
 'Актау':[43.6500,51.1600],
 'Павлодар':[52.2873,76.9674],
 'Усть-Каменогорск':[49.9483,82.6285],
 'Семей':[50.4111,80.2275],
 'Астана':[51.1694,71.4491],
 'Шымкент':[42.3155,69.5869],
 'Талдыкорган':[45.0156,78.3739],
 'Тараз':[42.9000,71.3667],
 'Аркалык':[50.2486,66.9114],
 'Житикара':[52.1908,61.2006],
 'Лисаковск':[52.5369,62.4936],
 'Костанай':[53.2144,63.6246]
};

var CITY_KK={
 'Алматы':'Алматы','Балхаш':'Балқаш','Жезказган':'Жезқазған','Караганда':'Қарағанды',
 'Кокшетау':'Көкшетау','Петропавловск':'Петропавл','Рудный':'Рудный','Уральск':'Орал',
 'Атырау':'Атырау','Актобе':'Ақтөбе','Актау':'Ақтау','Павлодар':'Павлодар',
 'Усть-Каменогорск':'Өскемен','Семей':'Семей','Астана':'Астана','Шымкент':'Шымкент',
 'Талдыкорган':'Талдықорған','Тараз':'Тараз','Аркалык':'Арқалық','Житикара':'Жітіқара',
 'Лисаковск':'Лисаковск','Костанай':'Қостанай'
};

var COPY={
 ru:{
  locating:'Определяю ближайший филиал…',
  found:'Похоже, вы рядом с {city}. Покажу местного представителя.',
  nearest:'Ближайший филиал Aromika — {city} · примерно {km} км.',
  denied:'Не удалось определить город автоматически. Выберите его вручную.',
  unavailable:'Геолокация недоступна. Выберите город вручную.',
  tooFar:'Не смогла уверенно определить ближайший филиал. Выберите город вручную.',
  retry:'Определить город',
  change:'Город можно изменить в списке ниже.'
 },
 kk:{
  locating:'Ең жақын филиалды анықтап жатырмын…',
  found:'Сіз {city} қаласына жақын сияқтысыз. Жергілікті өкілді көрсетемін.',
  nearest:'Aromika-ның ең жақын филиалы — {city} · шамамен {km} км.',
  denied:'Қаланы автоматты түрде анықтау мүмкін болмады. Тізімнен таңдаңыз.',
  unavailable:'Геолокация қолжетімсіз. Қаланы тізімнен таңдаңыз.',
  tooFar:'Ең жақын филиалды нақты анықтай алмадым. Қаланы тізімнен таңдаңыз.',
  retry:'Қаланы анықтау',
  change:'Қаланы төмендегі тізімнен өзгертуге болады.'
 }
};

function lang(){
 try{return localStorage.getItem(LANG_KEY)==='kk'?'kk':'ru'}catch(e){return'ru'}
}
function cityLabel(city,l){return l==='kk'?(CITY_KK[city]||city):city}
function fmt(str,map){return String(str||'').replace(/\{(\w+)\}/g,function(_,k){return map[k]==null?'':map[k]})}
function rad(v){return v*Math.PI/180}
function distanceKm(lat1,lon1,lat2,lon2){
 var R=6371,dLat=rad(lat2-lat1),dLon=rad(lon2-lon1);
 var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
 return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function loadSaved(){
 try{
  var x=JSON.parse(localStorage.getItem(GEO_KEY)||'null');
  if(!x||!x.city||!x.ts||Date.now()-x.ts>MAX_AGE)return null;
  return x;
 }catch(e){return null}
}
function saveCity(city,source,distance){
 try{localStorage.setItem(GEO_KEY,JSON.stringify({city:city,source:source||'manual',distance:Math.round(distance||0),ts:Date.now()}))}catch(e){}
 try{localStorage.removeItem(GEO_DENIED_KEY)}catch(e){}
}
function recentlyDenied(){
 try{var ts=Number(localStorage.getItem(GEO_DENIED_KEY)||0);return ts&&Date.now()-ts<DENIED_COOLDOWN}catch(e){return false}
}
function markDenied(){try{localStorage.setItem(GEO_DENIED_KEY,String(Date.now()))}catch(e){}}

function availableCities(select){
 var set={};
 Array.prototype.forEach.call(select.options||[],function(o){if(o.value)set[o.value]=1});
 return set;
}
function nearestCity(lat,lon,select){
 var allowed=availableCities(select),best=null;
 Object.keys(CITIES).forEach(function(city){
  if(!allowed[city])return;
  var c=CITIES[city],d=distanceKm(lat,lon,c[0],c[1]);
  if(!best||d<best.distance)best={city:city,distance:d};
 });
 return best;
}

function ensureStyle(){
 if(document.getElementById('romi-living-v1-style'))return;
 var s=document.createElement('style');
 s.id='romi-living-v1-style';
 s.textContent='\
 .aa-geo-hint{margin:0 0 12px;padding:11px 12px;border:1px solid rgba(17,24,39,.10);border-radius:14px;background:rgba(255,255,255,.72);font-size:12px;line-height:1.45;color:inherit}\
 .aa-geo-hint[data-state="locating"]{opacity:.8}\
 .aa-geo-row{display:flex;align-items:center;gap:8px}\
 .aa-geo-dot{width:7px;height:7px;border-radius:50%;background:currentColor;opacity:.55;flex:0 0 auto}\
 .aa-geo-hint[data-state="locating"] .aa-geo-dot{animation:aaGeoPulse 1.15s ease-in-out infinite}\
 .aa-geo-sub{display:block;margin-top:4px;opacity:.62;font-size:11px}\
 .aa-geo-retry{margin-top:8px;padding:0;border:0;background:none;color:inherit;font:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px;cursor:pointer}\
 @keyframes aaGeoPulse{0%,100%{transform:scale(.8);opacity:.35}50%{transform:scale(1.25);opacity:.85}}';
 document.head.appendChild(s);
}
function hintFor(select){
 var field=select.closest('.aa-field');
 if(!field)return null;
 var holder=field.parentNode;
 var hint=holder.querySelector(':scope > .aa-geo-hint');
 if(!hint){
  hint=document.createElement('div');
  hint.className='aa-geo-hint';
  hint.setAttribute('data-state','idle');
  holder.insertBefore(hint,field);
 }
 return hint;
}
function setHint(select,state,text,showRetry){
 var h=hintFor(select);if(!h)return;
 var t=COPY[lang()];
 h.setAttribute('data-state',state||'idle');
 h.innerHTML='<div class="aa-geo-row"><i class="aa-geo-dot"></i><span>'+escapeHtml(text||'')+'</span></div>'+
  ((state==='found'||state==='nearest')?'<small class="aa-geo-sub">'+escapeHtml(t.change)+'</small>':'')+
  (showRetry?'<button type="button" class="aa-geo-retry">'+escapeHtml(t.retry)+'</button>':'');
 var b=h.querySelector('.aa-geo-retry');if(b)b.addEventListener('click',function(){requestLocation(select,true)});
}
function escapeHtml(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

function selectCity(select,city,source,distance){
 if(!city||!select.querySelector('option[value="'+cssEscape(city)+'"]'))return false;
 autoSelecting=true;
 select.value=city;
 try{select.dispatchEvent(new Event('change',{bubbles:true}))}catch(e){var ev=document.createEvent('HTMLEvents');ev.initEvent('change',true,false);select.dispatchEvent(ev)}
 setTimeout(function(){autoSelecting=false},0);
 saveCity(city,source,distance);
 return true;
}
function cssEscape(v){
 if(window.CSS&&CSS.escape)return CSS.escape(v);
 return String(v).replace(/["\\]/g,'\\$&');
}

function applySaved(select){
 var saved=loadSaved();if(!saved)return false;
 if(!selectCity(select,saved.city,saved.source,saved.distance))return false;
 var t=COPY[lang()],label=cityLabel(saved.city,lang()),d=Number(saved.distance)||0;
 var msg=d>80?fmt(t.nearest,{city:label,km:Math.round(d)}):fmt(t.found,{city:label});
 setHint(select,d>80?'nearest':'found',msg,false);
 return true;
}

function requestLocation(select,force){
 if(!select||locating)return;
 var t=COPY[lang()];
 if(!navigator.geolocation){setHint(select,'error',t.unavailable,false);return}
 if(!force&&recentlyDenied()){setHint(select,'error',t.denied,true);return}
 locating=true;
 setHint(select,'locating',t.locating,false);
 navigator.geolocation.getCurrentPosition(function(pos){
  locating=false;
  var lat=pos.coords.latitude,lon=pos.coords.longitude;
  var best=nearestCity(lat,lon,select);
  /* Avoid confidently routing a visitor to a very remote city. */
  if(!best||best.distance>650){setHint(select,'error',t.tooFar,false);return}
  selectCity(select,best.city,'geo',best.distance);
  var label=cityLabel(best.city,lang()),d=Math.round(best.distance);
  if(d<=80)setHint(select,'found',fmt(t.found,{city:label}),false);
  else setHint(select,'nearest',fmt(t.nearest,{city:label,km:d}),false);
  try{window.dispatchEvent(new CustomEvent('romi:location',{detail:{city:best.city,distance:d,source:'geo'}}))}catch(e){}
 },function(err){
  locating=false;
  if(err&&err.code===1)markDenied();
  setHint(select,'error',err&&err.code===1?t.denied:t.unavailable,true);
 },{enableHighAccuracy:false,timeout:8000,maximumAge:15*60*1000});
}

function bindSelect(select){
 if(!select||select.getAttribute('data-romi-geo-bound')==='1')return;
 select.setAttribute('data-romi-geo-bound','1');
 select.addEventListener('change',function(){
  if(autoSelecting||!select.value)return;
  saveCity(select.value,'manual',0);
  var t=COPY[lang()];
  setHint(select,'found',fmt(t.found,{city:cityLabel(select.value,lang())}),false);
 });
 if(applySaved(select))return;
 requestLocation(select,false);
}

function scan(){
 ensureStyle();
 var a=document.getElementById('aa-city');
 var b=document.getElementById('aa-business-city');
 if(a)bindSelect(a);
 if(b)bindSelect(b);
}

function start(){
 scan();
 if('MutationObserver'in window){
  var pending=false;
  new MutationObserver(function(){
   if(pending)return;pending=true;
   requestAnimationFrame(function(){pending=false;scan()});
  }).observe(document.documentElement,{childList:true,subtree:true});
 }
 window.addEventListener('romi:language',function(){setTimeout(scan,50)});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();

})();
