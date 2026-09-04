/* AROMIKA · ROMI LIVING LAYER V2.0.0
 * Safe enhancement for INFO + SHOP: nearest branch, page-aware teaser,
 * time-aware greeting and live status. Does not replace search/cart/core.
 */
(function(){
'use strict';
if(window.__AROMIKA_ROMI_LIVING_V2__)return;
window.__AROMIKA_ROMI_LIVING_V2__=true;
var HOST=String(location.hostname||'').toLowerCase();
var IS_SHOP=HOST.indexOf('aromika.shop')>=0;
var IS_INFO=HOST.indexOf('aromika.info')>=0;
if(!IS_SHOP&&!IS_INFO)return;

var GEO_KEY='aromika-romi-nearest-city-v1';
var GEO_DENIED_KEY='aromika-romi-geo-denied-v1';
var LANG_KEY='aromika-romi-language';
var MAX_AGE=30*86400000,DENIED_COOLDOWN=7*86400000;
var locating=false,autoSelecting=false;

var CITIES={
 'Алматы':[43.2383,76.9450],'Балхаш':[46.8481,74.9950],'Жезказган':[47.7833,67.7667],'Караганда':[49.8064,73.0855],
 'Кокшетау':[53.2833,69.4000],'Петропавловск':[54.8728,69.1430],'Рудный':[52.9729,63.1168],'Уральск':[51.2333,51.3667],
 'Атырау':[47.0945,51.9238],'Актобе':[50.2839,57.1670],'Актау':[43.6500,51.1600],'Павлодар':[52.2873,76.9674],
 'Усть-Каменогорск':[49.9483,82.6285],'Семей':[50.4111,80.2275],'Астана':[51.1694,71.4491],'Шымкент':[42.3155,69.5869],
 'Талдыкорган':[45.0156,78.3739],'Тараз':[42.9000,71.3667],'Аркалык':[50.2486,66.9114],'Житикара':[52.1908,61.2006],
 'Лисаковск':[52.5369,62.4936],'Костанай':[53.2144,63.6246]
};
var CITY_KK={'Алматы':'Алматы','Балхаш':'Балқаш','Жезказган':'Жезқазған','Караганда':'Қарағанды','Кокшетау':'Көкшетау','Петропавловск':'Петропавл','Рудный':'Рудный','Уральск':'Орал','Атырау':'Атырау','Актобе':'Ақтөбе','Актау':'Ақтау','Павлодар':'Павлодар','Усть-Каменогорск':'Өскемен','Семей':'Семей','Астана':'Астана','Шымкент':'Шымкент','Талдыкорган':'Талдықорған','Тараз':'Тараз','Аркалык':'Арқалық','Житикара':'Жітіқара','Лисаковск':'Лисаковск','Костанай':'Қостанай'};
var COPY={
 ru:{locating:'Определяю ближайший филиал…',found:'Похоже, вы рядом с {city}. Покажу местного представителя.',nearest:'Ближайший филиал Aromika — {city} · примерно {km} км.',denied:'Не удалось определить город автоматически. Выберите его вручную.',unavailable:'Геолокация недоступна. Выберите город вручную.',tooFar:'Не смогла уверенно определить ближайший филиал. Выберите город вручную.',retry:'Определить город',change:'Город можно изменить в списке ниже.',morning:'Доброе утро',day:'Добрый день',evening:'Добрый вечер'},
 kk:{locating:'Ең жақын филиалды анықтап жатырмын…',found:'Сіз {city} қаласына жақын сияқтысыз. Жергілікті өкілді көрсетемін.',nearest:'Aromika-ның ең жақын филиалы — {city} · шамамен {km} км.',denied:'Қаланы автоматты түрде анықтау мүмкін болмады. Тізімнен таңдаңыз.',unavailable:'Геолокация қолжетімсіз. Қаланы тізімнен таңдаңыз.',tooFar:'Ең жақын филиалды нақты анықтай алмадым. Қаланы тізімнен таңдаңыз.',retry:'Қаланы анықтау',change:'Қаланы төмендегі тізімнен өзгертуге болады.',morning:'Қайырлы таң',day:'Қайырлы күн',evening:'Қайырлы кеш'}
};
function lang(){try{return localStorage.getItem(LANG_KEY)==='kk'?'kk':'ru'}catch(e){return'ru'}}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fmt(s,m){return String(s||'').replace(/\{(\w+)\}/g,function(_,k){return m[k]==null?'':m[k]})}
function cityLabel(c,l){return l==='kk'?(CITY_KK[c]||c):c}
function rad(v){return v*Math.PI/180}
function dist(a,b,c,d){var R=6371,x=rad(c-a),y=rad(d-b),q=Math.sin(x/2)*Math.sin(x/2)+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(y/2)*Math.sin(y/2);return R*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q))}
function loadSaved(){try{var x=JSON.parse(localStorage.getItem(GEO_KEY)||'null');return x&&x.city&&x.ts&&Date.now()-x.ts<MAX_AGE?x:null}catch(e){return null}}
function saveCity(city,source,distance){try{localStorage.setItem(GEO_KEY,JSON.stringify({city:city,source:source||'manual',distance:Math.round(distance||0),ts:Date.now()}));localStorage.removeItem(GEO_DENIED_KEY)}catch(e){}}
function deniedRecently(){try{var x=Number(localStorage.getItem(GEO_DENIED_KEY)||0);return x&&Date.now()-x<DENIED_COOLDOWN}catch(e){return false}}
function markDenied(){try{localStorage.setItem(GEO_DENIED_KEY,String(Date.now()))}catch(e){}}
function cssEscape(v){return window.CSS&&CSS.escape?CSS.escape(v):String(v).replace(/["\\]/g,'\\$&')}

function style(){if(document.getElementById('romi-living-v2-style'))return;var s=document.createElement('style');s.id='romi-living-v2-style';s.textContent='\
#aromika-assistant .aa-persona small,#aromika-assistant .rv81-person small{display:inline-flex;align-items:center;gap:6px}\
#aromika-assistant .aa-persona small:before,#aromika-assistant .rv81-person small:before{content:"";width:6px;height:6px;border-radius:50%;background:#39b86f;box-shadow:0 0 0 3px rgba(57,184,111,.12);animation:romiLivePulse 2.1s ease-in-out infinite}\
.aa-geo-hint{margin:0 0 12px;padding:11px 12px;border:1px solid rgba(17,24,39,.10);border-radius:14px;background:rgba(255,255,255,.72);font-size:12px;line-height:1.45;color:inherit}.aa-geo-row{display:flex;align-items:center;gap:8px}.aa-geo-dot{width:7px;height:7px;border-radius:50%;background:currentColor;opacity:.55;flex:0 0 auto}.aa-geo-hint[data-state="locating"] .aa-geo-dot{animation:romiLivePulse 1.15s ease-in-out infinite}.aa-geo-sub{display:block;margin-top:4px;opacity:.62;font-size:11px}.aa-geo-retry{margin-top:8px;padding:0;border:0;background:none;color:inherit;font:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px;cursor:pointer}\
@keyframes romiLivePulse{0%,100%{transform:scale(.82);opacity:.55}50%{transform:scale(1.18);opacity:1}}';document.head.appendChild(s)}
function hintFor(select){var field=select.closest('.aa-field');if(!field)return null;var holder=field.parentNode,h=holder.querySelector('.aa-geo-hint');if(!h){h=document.createElement('div');h.className='aa-geo-hint';holder.insertBefore(h,field)}return h}
function setHint(select,state,text,retry){var h=hintFor(select);if(!h)return;var t=COPY[lang()];h.dataset.state=state||'idle';h.innerHTML='<div class="aa-geo-row"><i class="aa-geo-dot"></i><span>'+esc(text)+'</span></div>'+((state==='found'||state==='nearest')?'<small class="aa-geo-sub">'+esc(t.change)+'</small>':'')+(retry?'<button type="button" class="aa-geo-retry">'+esc(t.retry)+'</button>':'');var b=h.querySelector('.aa-geo-retry');if(b)b.onclick=function(){requestLocation(select,true)}}
function available(select){var o={};Array.prototype.forEach.call(select.options||[],function(x){if(x.value)o[x.value]=1});return o}
function nearest(lat,lon,select){var ok=available(select),best=null;Object.keys(CITIES).forEach(function(city){if(!ok[city])return;var c=CITIES[city],d=dist(lat,lon,c[0],c[1]);if(!best||d<best.distance)best={city:city,distance:d}});return best}
function selectCity(select,city,source,distance){if(!city||!select.querySelector('option[value="'+cssEscape(city)+'"]'))return false;autoSelecting=true;select.value=city;select.dispatchEvent(new Event('change',{bubbles:true}));setTimeout(function(){autoSelecting=false},0);saveCity(city,source,distance);return true}
function applySaved(select){var x=loadSaved();if(!x||!selectCity(select,x.city,x.source,x.distance))return false;var t=COPY[lang()],d=Number(x.distance)||0,label=cityLabel(x.city,lang());setHint(select,d>80?'nearest':'found',d>80?fmt(t.nearest,{city:label,km:Math.round(d)}):fmt(t.found,{city:label}),false);return true}
function requestLocation(select,force){if(!select||locating)return;var t=COPY[lang()];if(!navigator.geolocation){setHint(select,'error',t.unavailable,false);return}if(!force&&deniedRecently()){setHint(select,'error',t.denied,true);return}locating=true;setHint(select,'locating',t.locating,false);navigator.geolocation.getCurrentPosition(function(p){locating=false;var best=nearest(p.coords.latitude,p.coords.longitude,select);if(!best||best.distance>650){setHint(select,'error',t.tooFar,false);return}selectCity(select,best.city,'geo',best.distance);var d=Math.round(best.distance),label=cityLabel(best.city,lang());setHint(select,d<=80?'found':'nearest',d<=80?fmt(t.found,{city:label}):fmt(t.nearest,{city:label,km:d}),false);try{window.dispatchEvent(new CustomEvent('romi:location',{detail:{city:best.city,distance:d,source:'geo'}}))}catch(e){}},function(err){locating=false;if(err&&err.code===1)markDenied();setHint(select,'error',err&&err.code===1?t.denied:t.unavailable,true)},{enableHighAccuracy:false,timeout:8000,maximumAge:900000})}
function bindSelect(select){if(!select||select.dataset.romiGeoBound==='1')return;select.dataset.romiGeoBound='1';select.addEventListener('change',function(){if(autoSelecting||!select.value)return;saveCity(select.value,'manual',0);setHint(select,'found',fmt(COPY[lang()].found,{city:cityLabel(select.value,lang())}),false)});if(!applySaved(select))requestLocation(select,false)}

function greeting(){var h=(new Date()).getHours(),t=COPY[lang()];return h<12?t.morning:(h<18?t.day:t.evening)}
function pageContext(){
 var p=location.pathname.toLowerCase(),l=lang();
 if(IS_SHOP){
  if(/bestsellery|sale|akci/.test(p))return l==='kk'?['Акцияларды қарап жатырсыз ба?','Жеңілдіктегі тауарларды табуға көмектесемін.']:['Смотрите акции?','Помогу быстро найти подходящий товар со скидкой.'];
  if(/cart|checkout/.test(p))return l==='kk'?['Себетке көмектесейін бе?','Тауарды нақтылауға немесе басқа нұсқаны табуға көмектесемін.']:['Нужна помощь с корзиной?','Могу уточнить товар или подобрать другой вариант.'];
  if(/products\.|product|\/products\//.test(p)||document.querySelector('.ty-product-block'))return l==='kk'?['Осы тауарды қарап жатырсыз ба?','Ұқсас нұсқаларды немесе басқа көлемді табуға көмектесемін.']:['Смотрите этот товар?','Могу подобрать похожий вариант или другой объём.'];
  return l==='kk'?['Romi осында','Тауарды мақсат, бренд немесе көлем бойынша таңдап беремін.']:['Romi на связи','Подберу товар по задаче, бренду или объёму.'];
 }
 if(/perfect|washexpert|maxipower|prachka|antibak/.test(p))return l==='kk'?['Осы брендті қарап жатырсыз ба?','Линияны таңдауға немесе дүкеннен тауар табуға көмектесемін.']:['Смотрите этот бренд?','Помогу выбрать линейку или найти товар в магазине.'];
 if(/okompanii/.test(p))return l==='kk'?['Ынтымақтастық қызықтыра ма?','Қажетті бағыт пен байланысқа бағыттаймын.']:['Интересует сотрудничество?','Подскажу направление и нужный контакт.'];
 if(/kontakty/.test(p))return l==='kk'?['Байланыс керек пе?','Қалаңызға ең жақын өкілді табамын.']:['Нужен контакт?','Найду ближайшего представителя по вашему городу.'];
 return l==='kk'?['Romi көмектеседі','Қажетті бөлімді немесе тауарды табуға көмектесемін.']:['Romi подскажет','Помогу найти нужный раздел или продукцию.'];
}
function applyContext(){
 var root=document.getElementById('aromika-assistant');if(!root)return;
 var teaser=root.querySelector('.aa-teaser');if(teaser){var c=pageContext(),b=teaser.querySelector('strong'),p=teaser.querySelector('p');if(b)b.textContent=c[0];if(p)p.textContent=c[1]}
 var actions=root.querySelector('.aa-screen .aa-actions');if(actions){var title=root.querySelector('.aa-screen .aa-title');if(title&&!title.dataset.romiTimeGreeting){title.dataset.romiTimeGreeting='1';title.textContent=greeting()+'. '+title.textContent}}
}
function scan(){style();bindSelect(document.getElementById('aa-city'));bindSelect(document.getElementById('aa-business-city'));applyContext()}
function start(){scan();var pending=false;new MutationObserver(function(){if(pending)return;pending=true;requestAnimationFrame(function(){pending=false;scan()})}).observe(document.documentElement,{childList:true,subtree:true});window.addEventListener('romi:language',function(){setTimeout(scan,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
