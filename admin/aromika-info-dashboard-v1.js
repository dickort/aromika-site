/* AROMIKA.INFO Dashboard for Tilda · compact v1.1.0 */
(function(){
'use strict';
var ROOT_ID='aromika-info-dashboard',VERSION='1.1.0';
var cfg=window.AROMIKA_INFO_DASHBOARD_CONFIG||{};
var API=cfg.api||'https://aromika.shop/index.php?dispatch=aromika_info_public.snapshot';
var TOKEN=cfg.token||'';
var state={days:30,view:'overview',data:null};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function num(v){v=Number(v||0);try{return v.toLocaleString('ru-RU');}catch(e){return String(v);}}
function pct(v){v=Number(v||0);return(v>0?'+':'')+v+'%';}
function root(){return document.getElementById(ROOT_ID);}
function addStyle(){if(document.getElementById('ai-dashboard-style'))return;var s=document.createElement('style');s.id='ai-dashboard-style';s.textContent=[
'#'+ROOT_ID+'{font-family:Inter,Arial,sans-serif;color:#18151a;max-width:1500px;margin:0 auto;padding:10px;box-sizing:border-box}',
'#'+ROOT_ID+' *{box-sizing:border-box}',
'.aidb-shell{display:flex;flex-direction:column;gap:10px;height:100%}',
'.aidb-top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;background:#fff7f8;border:1px solid #f0d9de;border-radius:20px;padding:14px 18px}',
'.aidb-ey{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#b35c6e}',
'.aidb-titleline{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}',
'.aidb-h1{font-size:28px;line-height:1;margin:5px 0 0;font-weight:800;letter-spacing:-.03em}',
'.aidb-sub{color:#7c7076;font-size:12px}',
'.aidb-live{background:#211c1f;color:#fff;padding:8px 11px;border-radius:999px;font-size:10px;white-space:nowrap}',
'.aidb-toolbar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}',
'.aidb-tabs,.aidb-periods{display:flex;gap:6px;flex-wrap:wrap}',
'.aidb-tab,.aidb-period{border:0;background:#f2eff1;padding:7px 10px;border-radius:999px;cursor:pointer;font-weight:700;font-size:11px;color:#2c272a}',
'.aidb-tab.is-active,.aidb-period.is-active{background:#211c1f;color:#fff}',
'.aidb-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px}',
'.aidb-card{background:#fff;border:1px solid #ece7ea;border-radius:16px;padding:12px;min-width:0}',
'.aidb-kpi-label{font-size:9px;color:#8d7d85;text-transform:uppercase;letter-spacing:.06em}',
'.aidb-kpi-v{font-size:25px;font-weight:800;margin-top:3px;letter-spacing:-.03em;line-height:1}',
'.aidb-delta{font-size:9px;margin-top:4px;color:#7d7278}',
'.aidb-main{display:grid;grid-template-columns:1.4fr .8fr .8fr;gap:9px;min-height:0;flex:1}',
'.aidb-side{display:grid;grid-template-rows:1fr 1fr;gap:9px;min-height:0}',
'.aidb-title{font-size:14px;font-weight:800;margin:0 0 8px}',
'.aidb-meta{font-size:10px;color:#8d8187;margin-top:-5px;margin-bottom:7px}',
'.aidb-chart{height:100%;min-height:170px;position:relative}',
'.aidb-chart svg{width:100%;height:100%;overflow:visible}',
'.aidb-gridline{stroke:#eee8eb;stroke-width:1}',
'.aidb-area{fill:rgba(205,82,111,.08)}',
'.aidb-line{fill:none;stroke:#cd526f;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
'.aidb-dot{fill:#cd526f}',
'.aidb-list{display:flex;flex-direction:column;gap:0;min-height:0}',
'.aidb-scroll{overflow:auto;max-height:100%}',
'.aidb-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid #f0ecee}',
'.aidb-row:last-child{border-bottom:0}',
'.aidb-name{font-weight:700;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.aidb-small{font-size:9px;color:#91858b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.aidb-val{font-weight:800;font-size:11px}',
'.aidb-chips{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}',
'.aidb-chip{background:#faf7f8;border:1px solid #eee6e9;border-radius:12px;padding:9px 10px;min-width:0}',
'.aidb-chip span{display:block;color:#8e8087;font-size:8px;text-transform:uppercase}',
'.aidb-chip strong{display:block;font-size:18px;margin-top:2px}',
'.aidb-romi{background:#211c1f;color:#fff;border-color:#211c1f}',
'.aidb-romi .aidb-title,.aidb-romi .aidb-val,.aidb-romi .aidb-name{color:#fff}',
'.aidb-romi .aidb-small,.aidb-romi .aidb-meta{color:#bfb5ba}',
'.aidb-romi .aidb-row{border-color:rgba(255,255,255,.09)}',
'.aidb-detail{min-height:0;flex:1;display:grid;grid-template-columns:1fr 1fr;gap:9px}',
'.aidb-detail>.aidb-card{min-height:0;overflow:hidden}',
'.aidb-detail .aidb-scroll{height:100%;max-height:none}',
'.aidb-empty{padding:22px 8px;text-align:center;color:#988a91;font-size:11px}',
'.aidb-error{background:#fff1f1;border:1px solid #f2c9c9;color:#852c2c;padding:16px;border-radius:16px;line-height:1.45}',
'.aidb-foot{color:#9a8f94;font-size:9px;text-align:right}',
'@media(min-width:981px){#'+ROOT_ID+'{height:calc(100vh - 92px);min-height:620px;max-height:900px}.aidb-main>.aidb-card,.aidb-side>.aidb-card{min-height:0;overflow:hidden}.aidb-main .aidb-scroll{height:100%}}',
'@media(max-width:980px){#'+ROOT_ID+'{padding:10px}.aidb-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.aidb-main,.aidb-detail{grid-template-columns:1fr}.aidb-side{grid-template-rows:auto}.aidb-top{grid-template-columns:1fr}.aidb-chart{height:230px}.aidb-live{justify-self:start}}',
'@media(max-width:560px){.aidb-top{padding:14px;border-radius:16px}.aidb-h1{font-size:24px}.aidb-sub{font-size:11px}.aidb-card{padding:11px}.aidb-kpi-v{font-size:23px}.aidb-live{display:none}.aidb-tabs{overflow:auto;flex-wrap:nowrap;padding-bottom:2px}.aidb-tab{white-space:nowrap}}'
].join('');document.head.appendChild(s);}
function kpi(label,value,change,note){return '<div class="aidb-card"><div class="aidb-kpi-label">'+esc(label)+'</div><div class="aidb-kpi-v">'+num(value)+'</div><div class="aidb-delta">'+(change===null||change===undefined?esc(note||''):pct(change)+' к пред. периоду')+'</div></div>';}
function rows(list,kind,limit){if(!list||!list.length)return '<div class="aidb-empty">Пока нет данных</div>';var arr=typeof limit==='number'?list.slice(0,limit):list;return '<div class="aidb-list">'+arr.map(function(r){var name='',small='',value='';if(kind==='source'){name=r.label;small=num(r.visitors)+' посетителей';value=num(r.sessions);}if(kind==='page'){name=r.title||r.path;small=r.path;value=num(r.views);}if(kind==='campaign'){name=r.campaign||'(без campaign)';small=[r.source,r.medium].filter(Boolean).join(' · ');value=num(r.sessions);}if(kind==='event'){name=r.label||r.event_type;small='событие';value=num(r.total);}return '<div class="aidb-row"><div><div class="aidb-name">'+esc(name)+'</div><div class="aidb-small">'+esc(small)+'</div></div><div class="aidb-val">'+esc(value)+'</div></div>';}).join('')+'</div>';}
function chart(series){if(!series||!series.length)return '<div class="aidb-empty">Данные графика появятся после накопления визитов</div>';var W=900,H=240,P=16,max=1;series.forEach(function(r){max=Math.max(max,Number(r.visitors||0));});var pts=series.map(function(r,i){var x=P+(series.length===1?(W-2*P)/2:i*(W-2*P)/(series.length-1));var y=H-P-(Number(r.visitors||0)/max)*(H-2*P);return[x,y];});var line=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');var area=P+','+(H-P)+' '+line+' '+(W-P)+','+(H-P),grid='';for(var g=1;g<5;g++){var gy=P+g*(H-2*P)/5;grid+='<line class="aidb-gridline" x1="'+P+'" y1="'+gy+'" x2="'+(W-P)+'" y2="'+gy+'"/>';}var dots=pts.map(function(p){return '<circle class="aidb-dot" cx="'+p[0]+'" cy="'+p[1]+'" r="3.5"/>';}).join('');return '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+grid+'<polygon class="aidb-area" points="'+area+'"></polygon><polyline class="aidb-line" points="'+line+'"></polyline>'+dots+'</svg>';}
function chips(list,mode){if(!list||!list.length)return '<div class="aidb-empty">Пока нет данных</div>';return '<div class="aidb-chips">'+list.map(function(r){var label=r.label||'',value=r.visitors||0;if(mode==='conv'){label=r.label;value=r.value;}return '<div class="aidb-chip"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></div>';}).join('')+'</div>';}
function top(d){return '<div class="aidb-top"><div><div class="aidb-ey">AROMIKA · INTERNAL ANALYTICS</div><div class="aidb-titleline"><div class="aidb-h1">AROMIKA.INFO</div><div class="aidb-sub">визиты · источники · ROMI · SHOP</div></div></div><div class="aidb-live">Live · '+esc(d.generated_at_label||'')+'</div></div>';}
function toolbar(){var views=[['overview','Обзор'],['sources','Источники'],['pages','Страницы'],['utm','UTM'],['events','События']];return '<div class="aidb-toolbar"><div class="aidb-tabs">'+views.map(function(v){return '<button class="aidb-tab '+(state.view===v[0]?'is-active':'')+'" data-view="'+v[0]+'">'+v[1]+'</button>';}).join('')+'</div><div class="aidb-periods"><button class="aidb-period '+(state.days===7?'is-active':'')+'" data-days="7">7д</button><button class="aidb-period '+(state.days===30?'is-active':'')+'" data-days="30">30д</button><button class="aidb-period '+(state.days===90?'is-active':'')+'" data-days="90">90д</button></div></div>';}
function overview(d){var k=d.kpis||{},r=d.romi||{};var romiRows=[{label:'Открытия',total:r.romi_open||0},{label:'Сообщения',total:r.romi_message||0},{label:'Товары',total:r.romi_product_view||0},{label:'В корзину',total:r.romi_add_to_cart||0},{label:'B2B',total:r.romi_b2b_request||0}];var conv=[{label:'Страниц / визит',value:k.pages_per_session||0},{label:'SHOP / визиты',value:(k.shop_conversion||0)+'%'},{label:'Телефон',value:k.phone_clicks||0},{label:'WhatsApp',value:k.whatsapp_clicks||0}];return '<div class="aidb-kpis">'+kpi('Посетители',k.visitors,k.visitors_change)+kpi('Визиты',k.sessions,k.sessions_change)+kpi('Просмотры',k.page_views,k.page_views_change)+kpi('ROMI',k.romi_opens,k.romi_opens_change)+kpi('SHOP',k.shop_clicks,k.shop_clicks_change)+'</div><div class="aidb-main"><div class="aidb-card"><div class="aidb-title">Посещения</div><div class="aidb-meta">Уникальные посетители · '+state.days+' дней</div><div class="aidb-chart">'+chart(d.series)+'</div></div><div class="aidb-side"><div class="aidb-card"><div class="aidb-title">Источники</div><div class="aidb-scroll">'+rows(d.sources,'source',5)+'</div></div><div class="aidb-card"><div class="aidb-title">Устройства</div>'+chips((d.devices||[]).slice(0,4))+'</div></div><div class="aidb-side"><div class="aidb-card aidb-romi"><div class="aidb-title">ROMI</div><div class="aidb-scroll">'+rows(romiRows,'event',5)+'</div></div><div class="aidb-card"><div class="aidb-title">Конверсии</div>'+chips(conv,'conv')+'</div></div></div>';}
function detail(d){var left='',right='',lt='',rt='';if(state.view==='sources'){lt='Источники трафика';left=rows(d.sources,'source');rt='Устройства';right=chips(d.devices||[]);}if(state.view==='pages'){lt='Популярные страницы';left=rows(d.pages,'page');rt='Конверсии';var k=d.kpis||{};right=chips([{label:'Страниц / визит',value:k.pages_per_session||0},{label:'SHOP / визиты',value:(k.shop_conversion||0)+'%'},{label:'Телефон',value:k.phone_clicks||0},{label:'WhatsApp',value:k.whatsapp_clicks||0}],'conv');}if(state.view==='utm'){lt='UTM-кампании';left=rows(d.campaigns,'campaign');rt='Источники';right=rows(d.sources,'source');}if(state.view==='events'){lt='События';left=rows(d.events,'event');rt='ROMI';var r=d.romi||{};right=rows([{label:'Открытия',total:r.romi_open||0},{label:'Сообщения',total:r.romi_message||0},{label:'Товары',total:r.romi_product_view||0},{label:'В корзину',total:r.romi_add_to_cart||0},{label:'B2B',total:r.romi_b2b_request||0}],'event');}return '<div class="aidb-detail"><div class="aidb-card"><div class="aidb-title">'+esc(lt)+'</div><div class="aidb-scroll">'+left+'</div></div><div class="aidb-card"><div class="aidb-title">'+esc(rt)+'</div><div class="aidb-scroll">'+right+'</div></div></div>';}
function bind(el){Array.prototype.forEach.call(el.querySelectorAll('[data-days]'),function(b){b.addEventListener('click',function(){state.days=Number(b.getAttribute('data-days'))||30;load();});});Array.prototype.forEach.call(el.querySelectorAll('[data-view]'),function(b){b.addEventListener('click',function(){state.view=b.getAttribute('data-view')||'overview';render();});});}
function render(){var el=root();if(!el||!state.data)return;var d=state.data;el.innerHTML='<div class="aidb-shell">'+top(d)+toolbar()+(state.view==='overview'?overview(d):detail(d))+'<div class="aidb-foot">Dashboard '+VERSION+' · агрегированные данные</div></div>';bind(el);}
function fail(msg){var el=root();if(el)el.innerHTML='<div class="aidb-error"><strong>Dashboard не получил данные.</strong><br>'+esc(msg||'Проверьте API AROMIKA.INFO.')+'</div>';}
function load(){var el=root();if(!el)return;el.innerHTML='<div class="aidb-card"><div class="aidb-empty">Загружаю статистику…</div></div>';var url=API+(API.indexOf('?')===-1?'?':'&')+'days='+encodeURIComponent(state.days)+'&token='+encodeURIComponent(TOKEN)+'&_='+Date.now();fetch(url,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store'}).then(function(res){if(!res.ok)throw new Error('HTTP '+res.status);return res.json();}).then(function(data){if(!data||!data.ok)throw new Error((data&&data.error)||'bad_response');state.data=data;render();}).catch(function(err){fail(err&&err.message?err.message:String(err));});}
function init(){addStyle();var el=root();if(!el)return;load();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
