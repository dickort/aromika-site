/* AROMIKA.INFO Dashboard for Tilda · v1.0.0 */
(function () {
  'use strict';

  var ROOT_ID = 'aromika-info-dashboard';
  var VERSION = '1.0.0';
  var cfg = window.AROMIKA_INFO_DASHBOARD_CONFIG || {};
  var API = cfg.api || 'https://aromika.shop/index.php?dispatch=aromika_info_public.snapshot';
  var TOKEN = cfg.token || '';
  var state = { days: 30, data: null };

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function num(v) {
    v = Number(v || 0);
    try { return v.toLocaleString('ru-RU'); } catch (e) { return String(v); }
  }
  function pct(v) {
    v = Number(v || 0);
    return (v > 0 ? '+' : '') + v + '%';
  }
  function root() { return document.getElementById(ROOT_ID); }

  function addStyle() {
    if (document.getElementById('ai-dashboard-style')) return;
    var s = document.createElement('style');
    s.id = 'ai-dashboard-style';
    s.textContent = [
      '#'+ROOT_ID+'{font-family:Inter,Arial,sans-serif;color:#18151a;max-width:1440px;margin:0 auto;padding:24px;box-sizing:border-box}',
      '#'+ROOT_ID+' *{box-sizing:border-box}',
      '.aidb-hero{background:#fff7f8;border:1px solid #f0d9de;border-radius:28px;padding:34px 36px;display:flex;justify-content:space-between;align-items:flex-end;gap:20px}',
      '.aidb-ey{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#b35c6e}',
      '.aidb-h1{font-size:42px;line-height:1;margin:10px 0 8px;font-weight:800;letter-spacing:-.03em}',
      '.aidb-sub{color:#7c7076;font-size:15px}',
      '.aidb-live{background:#211c1f;color:#fff;padding:11px 16px;border-radius:999px;font-size:12px;white-space:nowrap}',
      '.aidb-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}',
      '.aidb-tab{border:0;background:#f2eff1;padding:10px 14px;border-radius:999px;cursor:pointer;font-weight:700;font-size:13px}',
      '.aidb-tab.is-active{background:#211c1f;color:#fff}',
      '.aidb-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}',
      '.aidb-card{background:#fff;border:1px solid #ece7ea;border-radius:22px;padding:20px}',
      '.aidb-kpi-label{font-size:11px;color:#8d7d85;text-transform:uppercase;letter-spacing:.07em}',
      '.aidb-kpi-v{font-size:34px;font-weight:800;margin-top:8px;letter-spacing:-.03em}',
      '.aidb-delta{font-size:12px;margin-top:5px;color:#7d7278}',
      '.aidb-grid{display:grid;grid-template-columns:1.35fr 1fr;gap:16px;margin-top:16px}',
      '.aidb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}',
      '.aidb-title{font-size:18px;font-weight:800;margin:0 0 14px}',
      '.aidb-meta{font-size:12px;color:#8d8187;margin-top:-7px;margin-bottom:13px}',
      '.aidb-chart{height:270px;position:relative}',
      '.aidb-chart svg{width:100%;height:100%;overflow:visible}',
      '.aidb-gridline{stroke:#eee8eb;stroke-width:1}',
      '.aidb-area{fill:rgba(205,82,111,.08)}',
      '.aidb-line{fill:none;stroke:#cd526f;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
      '.aidb-dot{fill:#cd526f}',
      '.aidb-list{display:flex;flex-direction:column;gap:8px}',
      '.aidb-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #f0ecee}',
      '.aidb-row:last-child{border-bottom:0}',
      '.aidb-name{font-weight:700;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.aidb-small{font-size:12px;color:#91858b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.aidb-val{font-weight:800;font-size:14px}',
      '.aidb-chips{display:flex;gap:9px;flex-wrap:wrap}',
      '.aidb-chip{background:#faf7f8;border:1px solid #eee6e9;border-radius:16px;padding:13px 15px;min-width:120px}',
      '.aidb-chip span{display:block;color:#8e8087;font-size:11px;text-transform:uppercase}',
      '.aidb-chip strong{display:block;font-size:22px;margin-top:5px}',
      '.aidb-romi{background:#211c1f;color:#fff;border-color:#211c1f}',
      '.aidb-romi .aidb-title,.aidb-romi .aidb-val,.aidb-romi .aidb-name{color:#fff}',
      '.aidb-romi .aidb-small,.aidb-romi .aidb-meta{color:#bfb5ba}',
      '.aidb-romi .aidb-row{border-color:rgba(255,255,255,.09)}',
      '.aidb-empty{padding:42px 12px;text-align:center;color:#988a91;font-size:13px}',
      '.aidb-error{background:#fff1f1;border:1px solid #f2c9c9;color:#852c2c;padding:18px;border-radius:18px;line-height:1.5}',
      '.aidb-foot{margin-top:16px;color:#9a8f94;font-size:11px;text-align:right}',
      '@media(max-width:980px){.aidb-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.aidb-grid,.aidb-grid2{grid-template-columns:1fr}.aidb-hero{align-items:flex-start;flex-direction:column}.aidb-h1{font-size:34px}}',
      '@media(max-width:560px){#'+ROOT_ID+'{padding:12px}.aidb-hero{padding:24px;border-radius:22px}.aidb-h1{font-size:30px}.aidb-kpis{grid-template-columns:1fr 1fr;gap:10px}.aidb-card{padding:16px;border-radius:18px}.aidb-kpi-v{font-size:28px}.aidb-live{display:none}}'
    ].join('');
    document.head.appendChild(s);
  }

  function kpi(label, value, change, note) {
    return '<div class="aidb-card"><div class="aidb-kpi-label">'+esc(label)+'</div><div class="aidb-kpi-v">'+num(value)+'</div><div class="aidb-delta">'+(change === null || change === undefined ? esc(note || '') : pct(change)+' к пред. периоду')+'</div></div>';
  }

  function listRows(rows, kind) {
    if (!rows || !rows.length) return '<div class="aidb-empty">Пока нет данных</div>';
    return '<div class="aidb-list">' + rows.map(function (r) {
      var name='', small='', value='';
      if (kind === 'source') { name=r.label; small=num(r.visitors)+' посетителей'; value=num(r.sessions)+' визитов'; }
      if (kind === 'page') { name=r.title || r.path; small=r.path; value=num(r.views); }
      if (kind === 'campaign') { name=r.campaign || '(без campaign)'; small=[r.source,r.medium].filter(Boolean).join(' · '); value=num(r.sessions); }
      if (kind === 'event') { name=r.label || r.event_type; small='событие'; value=num(r.total); }
      return '<div class="aidb-row"><div><div class="aidb-name">'+esc(name)+'</div><div class="aidb-small">'+esc(small)+'</div></div><div class="aidb-val">'+esc(value)+'</div></div>';
    }).join('') + '</div>';
  }

  function chart(series) {
    if (!series || !series.length) return '<div class="aidb-empty">Данные графика появятся после накопления визитов</div>';
    var W=900,H=250,P=18;
    var max=1;
    series.forEach(function(r){max=Math.max(max,Number(r.visitors||0));});
    var pts=series.map(function(r,i){
      var x=P+(series.length===1?(W-2*P)/2:i*(W-2*P)/(series.length-1));
      var y=H-P-(Number(r.visitors||0)/max)*(H-2*P);
      return [x,y];
    });
    var line=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ');
    var area=P+','+(H-P)+' '+line+' '+(W-P)+','+(H-P);
    var grid=''; for(var g=1;g<5;g++){var gy=P+g*(H-2*P)/5;grid+='<line class="aidb-gridline" x1="'+P+'" y1="'+gy+'" x2="'+(W-P)+'" y2="'+gy+'"/>';}
    var dots=pts.map(function(p){return '<circle class="aidb-dot" cx="'+p[0]+'" cy="'+p[1]+'" r="4"/>';}).join('');
    return '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+grid+'<polygon class="aidb-area" points="'+area+'"></polygon><polyline class="aidb-line" points="'+line+'"></polyline>'+dots+'</svg>';
  }

  function chips(rows) {
    if (!rows || !rows.length) return '<div class="aidb-empty">Пока нет данных</div>';
    return '<div class="aidb-chips">'+rows.map(function(r){return '<div class="aidb-chip"><span>'+esc(r.label)+'</span><strong>'+num(r.visitors)+'</strong></div>';}).join('')+'</div>';
  }

  function render() {
    var el=root(); if(!el || !state.data) return;
    var d=state.data, k=d.kpis||{}, r=d.romi||{};
    el.innerHTML =
      '<div class="aidb-hero"><div><div class="aidb-ey">AROMIKA · INTERNAL ANALYTICS</div><div class="aidb-h1">AROMIKA.INFO</div><div class="aidb-sub">Посещения, источники, страницы, ROMI и переходы в интернет-магазин</div></div><div class="aidb-live">Live · '+esc(d.generated_at_label||'')+'</div></div>'+
      '<div class="aidb-tabs"><button class="aidb-tab '+(state.days===7?'is-active':'')+'" data-days="7">7 дней</button><button class="aidb-tab '+(state.days===30?'is-active':'')+'" data-days="30">30 дней</button><button class="aidb-tab '+(state.days===90?'is-active':'')+'" data-days="90">90 дней</button></div>'+
      '<div class="aidb-kpis">'+
        kpi('Посетители',k.visitors,k.visitors_change)+
        kpi('Визиты',k.sessions,k.sessions_change)+
        kpi('Просмотры',k.page_views,k.page_views_change)+
        kpi('ROMI',k.romi_opens,k.romi_opens_change)+
        kpi('Переходы SHOP',k.shop_clicks,k.shop_clicks_change)+
      '</div>'+
      '<div class="aidb-grid"><div class="aidb-card"><div class="aidb-title">Посещения</div><div class="aidb-meta">Уникальные посетители за '+state.days+' дней</div><div class="aidb-chart">'+chart(d.series)+'</div></div>'+
        '<div class="aidb-card aidb-romi"><div class="aidb-title">ROMI</div><div class="aidb-meta">Активность помощника</div>'+listRows([
          {label:'Открытия',total:r.romi_open||0},{label:'Сообщения',total:r.romi_message||0},{label:'Товары',total:r.romi_product_view||0},{label:'В корзину',total:r.romi_add_to_cart||0},{label:'B2B',total:r.romi_b2b_request||0}
        ],'event')+'</div></div>'+
      '<div class="aidb-grid2"><div class="aidb-card"><div class="aidb-title">Источники трафика</div>'+listRows(d.sources,'source')+'</div><div class="aidb-card"><div class="aidb-title">Популярные страницы</div>'+listRows(d.pages,'page')+'</div></div>'+
      '<div class="aidb-grid2"><div class="aidb-card"><div class="aidb-title">UTM-кампании</div>'+listRows(d.campaigns,'campaign')+'</div><div class="aidb-card"><div class="aidb-title">Устройства</div>'+chips(d.devices)+'</div></div>'+
      '<div class="aidb-grid2"><div class="aidb-card"><div class="aidb-title">События</div>'+listRows(d.events,'event')+'</div><div class="aidb-card"><div class="aidb-title">Конверсии</div><div class="aidb-chips"><div class="aidb-chip"><span>Страниц / визит</span><strong>'+esc(k.pages_per_session||0)+'</strong></div><div class="aidb-chip"><span>SHOP / визиты</span><strong>'+esc(k.shop_conversion||0)+'%</strong></div><div class="aidb-chip"><span>Телефон</span><strong>'+num(k.phone_clicks||0)+'</strong></div><div class="aidb-chip"><span>WhatsApp</span><strong>'+num(k.whatsapp_clicks||0)+'</strong></div></div></div></div>'+
      '<div class="aidb-foot">AROMIKA.INFO Dashboard '+VERSION+' · данные агрегированы, visitor/session ID не отображаются</div>';

    Array.prototype.forEach.call(el.querySelectorAll('[data-days]'),function(btn){
      btn.addEventListener('click',function(){state.days=Number(btn.getAttribute('data-days'))||30;load();});
    });
  }

  function fail(msg) {
    var el=root(); if(!el) return;
    el.innerHTML='<div class="aidb-error"><strong>Dashboard не получил данные.</strong><br>'+esc(msg||'Проверьте API AROMIKA.INFO.')+'</div>';
  }

  function load() {
    var el=root(); if(!el) return;
    el.innerHTML='<div class="aidb-card"><div class="aidb-empty">Загружаю статистику…</div></div>';
    var url=API+(API.indexOf('?')===-1?'?':'&')+'days='+encodeURIComponent(state.days)+'&token='+encodeURIComponent(TOKEN)+'&_='+Date.now();
    fetch(url,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store'})
      .then(function(res){if(!res.ok)throw new Error('HTTP '+res.status);return res.json();})
      .then(function(data){if(!data||data.ok!==true)throw new Error((data&&data.error)||'invalid_response');state.data=data;render();})
      .catch(function(err){fail(err&&err.message?err.message:String(err));});
  }

  function boot() {
    if(!root()) return;
    addStyle();
    if(!TOKEN){fail('Не задан ключ Dashboard API.');return;}
    load();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
