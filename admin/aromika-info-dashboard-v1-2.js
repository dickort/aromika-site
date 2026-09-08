/* AROMIKA.INFO Dashboard for Tilda · tabbed compact v1.2.0 */
(function(){
'use strict';
var ROOT='aromika-info-dashboard',VERSION='1.2.0';
var cfg=window.AROMIKA_INFO_DASHBOARD_CONFIG||{};
var API=cfg.api||'https://aromika.shop/index.php?dispatch=aromika_info_public.snapshot';
var TOKEN=cfg.token||'';
var state={days:30,tab:'visits',data:null};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function num(v){v=Number(v||0);try{return v.toLocaleString('ru-RU');}catch(e){return String(v);}}
function pct(v){v=Number(v||0);return(v>0?'+':'')+v+'%';}
function el(){return document.getElementById(ROOT);}
function styles(){if(document.getElementById('aidb-v120-css'))return;var s=document.createElement('style');s.id='aidb-v120-css';s.textContent=[
'#'+ROOT+'{--pink:#f45d7d;--pink2:#ff86a1;--rose:#b75d70;--ink:#131017;--muted:#8c7880;--paper:#fff;--blush:#fff7f8;--line:#efdfe3;--soft:#f7f3f5;font-family:Inter,Arial,sans-serif;color:var(--ink);max-width:1760px;margin:0 auto;padding:16px 22px 18px;box-sizing:border-box;background:#fff}',
'#'+ROOT+' *{box-sizing:border-box}',
'.ai-hero{background:linear-gradient(135deg,#fff8f9 0%,#fff5f7 100%);border:1px solid #efd7dd;border-radius:30px;padding:24px 36px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:20px}',
'.ai-ey{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--rose)}',
'.ai-h1{font-size:48px;line-height:.95;font-weight:900;letter-spacing:-.04em;margin:10px 0 7px}',
'.ai-sub{font-size:15px;color:#886f79}',
'.ai-live{background:#211b1f;color:#fff;border-radius:999px;padding:12px 18px;font-size:12px;white-space:nowrap}',
'.ai-periods{display:flex;gap:9px;margin:16px 0 14px}',
'.ai-period{border:0;border-radius:999px;padding:10px 18px;font-weight:800;background:#f1edef;color:#211b1f;cursor:pointer;font-size:13px}',
'.ai-period.on{background:#211b1f;color:#fff}',
'.ai-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-bottom:14px}',
'.ai-kpi{border:1px solid #ece3e6;border-radius:24px;padding:18px 24px;background:#fff;min-width:0}',
'.ai-kpi-l{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#9c7e89}',
'.ai-kpi-v{font-size:34px;font-weight:900;line-height:1;margin:10px 0 8px}',
'.ai-kpi-d{font-size:11px;color:#8e737d}',
'.ai-lower{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:14px;min-height:390px}',
'.ai-panel{border:1px solid #ece1e5;border-radius:26px;padding:16px;background:#fff;min-width:0;height:390px;overflow:hidden;display:flex;flex-direction:column}',
'.ai-tabs{display:flex;gap:4px;background:#f3f0f2;border-radius:16px;padding:4px;width:max-content;max-width:100%;overflow-x:auto;flex:none}',
'.ai-tab{border:0;background:transparent;border-radius:12px;padding:9px 18px;font-weight:800;font-size:12px;cursor:pointer;color:#2a2327;white-space:nowrap}',
'.ai-tab.on{background:linear-gradient(135deg,var(--pink),var(--pink2));color:#fff;box-shadow:0 5px 14px rgba(244,93,125,.22)}',
'.ai-content{flex:1;min-height:0;margin-top:14px;overflow:hidden}',
'.ai-visits{height:100%;display:grid;grid-template-columns:1.45fr .65fr .8fr;gap:12px}',
'.ai-box{border:1px solid #eee5e8;border-radius:18px;padding:14px 16px;min-width:0;min-height:0;background:#fff;overflow:hidden}',
'.ai-box-title{font-size:14px;font-weight:900;margin-bottom:10px}',
'.ai-meta{font-size:10px;color:#9b8790;margin-top:-6px;margin-bottom:8px}',
'.ai-chart{height:265px;position:relative}',
'.ai-chart svg{width:100%;height:100%;overflow:visible}',
'.ai-gridline{stroke:#efe8ea;stroke-width:1}',
'.ai-area{fill:rgba(244,93,125,.08)}',
'.ai-line{fill:none;stroke:var(--pink);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}',
'.ai-dot{fill:var(--pink)}',
'.ai-summary{display:flex;flex-direction:column;gap:0}',
'.ai-srow{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid #f1ebed;font-size:11px}',
'.ai-srow:last-child{border-bottom:0}',
'.ai-srow span{color:#8f7a83}.ai-srow strong{font-weight:900}',
'.ai-list{height:100%;overflow:auto;scrollbar-width:thin}',
'.ai-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid #f1ebed}',
'.ai-row:last-child{border-bottom:0}',
'.ai-name{font-size:11px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.ai-small{font-size:9px;color:#998790;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.ai-value{font-size:11px;font-weight:900}',
'.ai-detailgrid{height:100%;display:grid;grid-template-columns:1fr 1fr;gap:12px}',
'.ai-chips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
'.ai-chip{background:#faf7f8;border:1px solid #eee5e8;border-radius:16px;padding:13px}',
'.ai-chip span{display:block;font-size:9px;color:#95808a;text-transform:uppercase}.ai-chip strong{display:block;font-size:24px;margin-top:5px}',
'.ai-romi{height:390px;border-radius:26px;background:#211b1f;color:#fff;padding:18px 18px 16px;display:flex;flex-direction:column;overflow:hidden}',
'.ai-romi-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}',
'.ai-romi-title{font-size:18px;font-weight:900}',
'.ai-romi-badge{font-size:9px;color:#ffc1d0;border:1px solid rgba(255,255,255,.14);padding:6px 8px;border-radius:999px}',
'.ai-romi-sub{font-size:10px;color:#c9bdc2;margin-bottom:8px}',
'.ai-romi .ai-row{border-color:rgba(255,255,255,.09)}.ai-romi .ai-small{color:#bbaeb4}.ai-romi .ai-name,.ai-romi .ai-value{color:#fff}',
'.ai-romi-foot{margin-top:auto;border-top:1px solid rgba(255,255,255,.1);padding-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px}',
'.ai-rstat{background:rgba(255,255,255,.06);border-radius:13px;padding:10px}.ai-rstat span{display:block;color:#bbaeb4;font-size:8px;text-transform:uppercase}.ai-rstat strong{display:block;font-size:18px;margin-top:3px}',
'.ai-empty{display:flex;align-items:center;justify-content:center;height:100%;color:#9c8a92;font-size:11px;text-align:center;padding:20px}',
'.ai-error{background:#fff0f2;border:1px solid #efc9d1;color:#7d283a;padding:18px;border-radius:18px}',
'.ai-foot{font-size:9px;color:#a39399;text-align:right;margin-top:8px}',
'@media(max-width:1200px){.ai-lower{grid-template-columns:minmax(0,1fr) 240px}.ai-visits{grid-template-columns:1.25fr .7fr}.ai-visits .ai-box:nth-child(3){display:none}}',
'@media(max-width:900px){#'+ROOT+'{padding:10px}.ai-hero{grid-template-columns:1fr;padding:20px;border-radius:22px}.ai-h1{font-size:36px}.ai-live{justify-self:start}.ai-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.ai-lower{grid-template-columns:1fr}.ai-panel,.ai-romi{height:auto;min-height:360px}.ai-visits,.ai-detailgrid{grid-template-columns:1fr}.ai-content{overflow:visible}.ai-panel{overflow:visible}.ai-chart{height:230px}.ai-romi{min-height:300px}.ai-visits .ai-box:nth-child(3){display:block}}',
'@media(max-width:560px){.ai-h1{font-size:31px}.ai-sub{font-size:12px}.ai-kpi{padding:14px}.ai-kpi-v{font-size:28px}.ai-tabs{width:100%}.ai-tab{padding:8px 12px}.ai-chips{grid-template-columns:repeat(2,minmax(0,1fr))}}'
].join('');document.head.appendChild(s);}
function kpi(label,value,change){return'<div class="ai-kpi"><div class="ai-kpi-l">'+esc(label)+'</div><div class="ai-kpi-v">'+num(value)+'</div><div class="ai-kpi-d">'+pct(change||0)+' к пред. периоду</div></div>';}
function listRows(list,kind,limit){if(!list||!list.length)return'<div class="ai-empty">Пока нет данных</div>';var a=typeof limit==='number'?list.slice(0,limit):list;return'<div class="ai-list">'+a.map(function(r,i){var n='',sm='',v='';if(kind==='source'){n=r.label||'Direct';sm=num(r.visitors)+' посетителей';v=num(r.sessions)+' визитов';}else if(kind==='page'){n=r.title||r.path||'/';sm=r.path||'';v=num(r.views);}else if(kind==='campaign'){n=r.campaign||'(без campaign)';sm=[r.source,r.medium].filter(Boolean).join(' · ');v=num(r.sessions);}else if(kind==='event'){n=r.label||r.event_type;sm='событие';v=num(r.total);}return'<div class="ai-row"><div><div class="ai-name">'+(kind==='page'?(i+1)+'. ':'')+esc(n)+'</div><div class="ai-small">'+esc(sm)+'</div></div><div class="ai-value">'+esc(v)+'</div></div>';}).join('')+'</div>';}
function chart(series){if(!series||!series.length)return'<div class="ai-empty">График появится после накопления данных</div>';var W=900,H=250,P=18,max=1;series.forEach(function(r){max=Math.max(max,Number(r.visitors||0));});var pts=series.map(function(r,i){var x=P+(series.length===1?(W-2*P)/2:i*(W-2*P)/(series.length-1)),y=H-P-(Number(r.visitors||0)/max)*(H-2*P);return[x,y];});var line=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' '),area=P+','+(H-P)+' '+line+' '+(W-P)+','+(H-P),grid='';for(var g=1;g<5;g++){var gy=P+g*(H-2*P)/5;grid+='<line class="ai-gridline" x1="'+P+'" y1="'+gy+'" x2="'+(W-P)+'" y2="'+gy+'"/>';}var dots=pts.map(function(p){return'<circle class="ai-dot" cx="'+p[0]+'" cy="'+p[1]+'" r="4"/>';}).join('');return'<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+grid+'<polygon class="ai-area" points="'+area+'"></polygon><polyline class="ai-line" points="'+line+'"></polyline>'+dots+'</svg>';}
function summary(k){return'<div class="ai-summary">'+[['Посетители',k.visitors],['Визиты',k.sessions],['Просмотры',k.page_views],['Страниц / визит',k.pages_per_session||0],['SHOP / визиты',(k.shop_conversion||0)+'%'],['Телефон',k.phone_clicks||0],['WhatsApp',k.whatsapp_clicks||0]].map(function(x){return'<div class="ai-srow"><span>'+x[0]+'</span><strong>'+esc(x[1])+'</strong></div>';}).join('')+'</div>';}
function tabs(){var t=[['visits','Посещения'],['sources','Источники'],['pages','Страницы'],['devices','Устройства'],['utm','UTM'],['events','События']];return'<div class="ai-tabs">'+t.map(function(x){return'<button class="ai-tab '+(state.tab===x[0]?'on':'')+'" data-tab="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div>';}
function visits(d){var k=d.kpis||{};return'<div class="ai-visits"><div class="ai-box"><div class="ai-box-title">Посещения</div><div class="ai-meta">Уникальные посетители · '+state.days+' дней</div><div class="ai-chart">'+chart(d.series)+'</div></div><div class="ai-box"><div class="ai-box-title">Сводка за период</div>'+summary(k)+'</div><div class="ai-box"><div class="ai-box-title">Популярные страницы</div>'+listRows(d.pages,'page',6)+'</div></div>';}
function detail(d){var html='';if(state.tab==='sources')html='<div class="ai-detailgrid"><div class="ai-box"><div class="ai-box-title">Источники трафика</div>'+listRows(d.sources,'source')+'</div><div class="ai-box"><div class="ai-box-title">Устройства</div>'+deviceChips(d.devices||[])+'</div></div>';if(state.tab==='pages')html='<div class="ai-detailgrid"><div class="ai-box"><div class="ai-box-title">Популярные страницы</div>'+listRows(d.pages,'page')+'</div><div class="ai-box"><div class="ai-box-title">Сводка</div>'+summary(d.kpis||{})+'</div></div>';if(state.tab==='devices')html='<div class="ai-detailgrid"><div class="ai-box"><div class="ai-box-title">Устройства</div>'+deviceChips(d.devices||[])+'</div><div class="ai-box"><div class="ai-box-title">Источники</div>'+listRows(d.sources,'source',8)+'</div></div>';if(state.tab==='utm')html='<div class="ai-detailgrid"><div class="ai-box"><div class="ai-box-title">UTM-кампании</div>'+listRows(d.campaigns,'campaign')+'</div><div class="ai-box"><div class="ai-box-title">Источники</div>'+listRows(d.sources,'source')+'</div></div>';if(state.tab==='events')html='<div class="ai-detailgrid"><div class="ai-box"><div class="ai-box-title">Все события</div>'+listRows(d.events,'event')+'</div><div class="ai-box"><div class="ai-box-title">Популярные страницы</div>'+listRows(d.pages,'page',8)+'</div></div>';return html||visits(d);}
function deviceChips(list){if(!list.length)return'<div class="ai-empty">Пока нет данных</div>';return'<div class="ai-chips">'+list.map(function(r){return'<div class="ai-chip"><span>'+esc(r.label)+'</span><strong>'+num(r.visitors)+'</strong></div>';}).join('')+'</div>';}
function romi(d){var r=d.romi||{},k=d.kpis||{},rr=[{label:'Открытия',total:r.romi_open||0},{label:'Сообщения',total:r.romi_message||0},{label:'Товары',total:r.romi_product_view||0},{label:'В корзину',total:r.romi_add_to_cart||0},{label:'B2B',total:r.romi_b2b_request||0}];return'<aside class="ai-romi"><div class="ai-romi-head"><div class="ai-romi-title">ROMI</div><div class="ai-romi-badge">LIVE</div></div><div class="ai-romi-sub">Активность помощника за выбранный период</div>'+listRows(rr,'event',5)+'<div class="ai-romi-foot"><div class="ai-rstat"><span>Открытия</span><strong>'+num(k.romi_opens||0)+'</strong></div><div class="ai-rstat"><span>SHOP</span><strong>'+num(k.shop_clicks||0)+'</strong></div></div></aside>';}
function render(){var e=el();if(!e||!state.data)return;var d=state.data,k=d.kpis||{};e.innerHTML='<div class="ai-hero"><div><div class="ai-ey">AROMIKA · INTERNAL ANALYTICS</div><div class="ai-h1">AROMIKA.INFO</div><div class="ai-sub">Посещения, источники, страницы, ROMI и переходы в интернет-магазин</div></div><div class="ai-live">Live · '+esc(d.generated_at_label||'')+'</div></div><div class="ai-periods">'+[7,30,90].map(function(x){return'<button class="ai-period '+(state.days===x?'on':'')+'" data-days="'+x+'">'+x+' дней</button>';}).join('')+'</div><div class="ai-kpis">'+kpi('Посетители',k.visitors,k.visitors_change)+kpi('Визиты',k.sessions,k.sessions_change)+kpi('Просмотры',k.page_views,k.page_views_change)+kpi('ROMI',k.romi_opens,k.romi_opens_change)+kpi('Переходы SHOP',k.shop_clicks,k.shop_clicks_change)+'</div><div class="ai-lower"><section class="ai-panel">'+tabs()+'<div class="ai-content">'+(state.tab==='visits'?visits(d):detail(d))+'</div></section>'+romi(d)+'</div><div class="ai-foot">AROMIKA.INFO Dashboard '+VERSION+'</div>';Array.prototype.forEach.call(e.querySelectorAll('[data-days]'),function(b){b.onclick=function(){state.days=Number(b.getAttribute('data-days'))||30;load();};});Array.prototype.forEach.call(e.querySelectorAll('[data-tab]'),function(b){b.onclick=function(){state.tab=b.getAttribute('data-tab')||'visits';render();};});}
function fail(m){var e=el();if(e)e.innerHTML='<div class="ai-error"><strong>Dashboard не получил данные.</strong><br>'+esc(m||'Проверьте API.')+'</div>';}
function load(){var e=el();if(!e)return;e.innerHTML='<div class="ai-empty" style="min-height:260px">Загружаю статистику…</div>';var u=API+(API.indexOf('?')<0?'?':'&')+'days='+encodeURIComponent(state.days)+'&token='+encodeURIComponent(TOKEN)+'&_='+Date.now();fetch(u,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}).then(function(d){if(!d||d.ok===false)throw new Error(d&&d.error?d.error:'API error');state.data=d;render();}).catch(function(e2){fail(e2.message);});}
function boot(){styles();if(!el()){var d=document.createElement('div');d.id=ROOT;document.body.appendChild(d);}load();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();