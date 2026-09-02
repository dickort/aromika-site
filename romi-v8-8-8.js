(function(){
'use strict';
if (window.__ROMI_V81__) return;
window.__ROMI_V81__ = true;

var C = Object.assign({
  site: location.hostname.indexOf('aromika.shop') >= 0 ? 'shop' : 'info',
  apiBase: 'https://aromika.shop/index.php?dispatch=romi.',
  shopOrigin: 'https://aromika.shop',
  infoOrigin: 'https://aromika.info'
}, window.ROMI_V8_CONFIG || {});

var SID_KEY = 'romi-v8-session-id';
var ROOT, PANEL, LAYER, CHAT, FORM, INPUT;
var STATE = {
  session_id: '',
  messages: [],
  last_products: [],
  last_query: '',
  customer_type: '',
  city: '',
  selected_product_id: 0,
  compare_ids: [],
  lang: 'ru'
};
var COMPARE_SNAPSHOT=null;


var RU = {
  entry:'Подобрать товар',
  entrySub:'Поиск · сравнение · покупка',
  hello:'Что подобрать? Напишите обычными словами — например «Antibak для посуды 1100 мл».',
  placeholder:'Напишите, что вам нужно…',
  searching:'Ищу подходящие товары…',
  found:'Подходящие варианты',
  none:'Точного совпадения не нашла. Попробуйте уточнить назначение, бренд или объём.',
  error:'Не удалось выполнить поиск. Каталог доступен, но запрос не обработан. Повторите ещё раз.',
  add:'В корзину',
  added:'В корзине ✓',
  buy:'Купить',
  details:'Подробнее',
  compare:'Сравнить',
  compareSelected:'Сравнить выбранные',
  clearCompare:'Сбросить',
  stock:'В наличии',
  noStock:'Нет в наличии',
  cart:'Открыть корзину',
  close:'Закрыть',
  back:'Назад',
  status:'Каталог aromika.shop подключён',
  b2b:'Для бизнеса',
  complaint:'Жалоба',
  review:'Отзыв',
  send:'Отправить',
  sent:'Передано в Aromika. Номер:',
  needContact:'Укажите телефон или e-mail.',
  failed:'Не удалось отправить. Можно написать на info@aromika.info.'
};

function esc(v){return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function money(v){var n=Number(v);return isFinite(n)&&n>0?Math.round(n).toLocaleString('ru-RU')+' ₸':''}
function uniq(a){return a.filter(function(v,i){return v && a.indexOf(v)===i})}
function lower(s){return String(s||'').toLowerCase().replace(/ё/g,'е')}
function asset(name){
  var base = window.AROMIKA_ASSISTANT_ASSET_BASE || 'https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/romi/';
  return base.replace(/\/?$/,'/') + name;
}
function api(mode, opts){
  opts=opts||{};
  var url=C.apiBase + encodeURIComponent(mode);
  if(opts.query){
    var sp=new URLSearchParams();
    Object.keys(opts.query).forEach(function(k){
      if(opts.query[k]!==undefined && opts.query[k]!==null && opts.query[k]!=='') sp.set(k,opts.query[k]);
    });
    var qs=sp.toString(); if(qs) url += '&'+qs;
  }
  return fetch(url,{
    method:opts.method||'GET',
    credentials:'include',
    headers:Object.assign({'Accept':'application/json'},opts.body?{'Content-Type':'application/json'}:{}),
    body:opts.body?JSON.stringify(opts.body):undefined
  }).then(function(r){
    return r.text().then(function(txt){
      var j; try{j=JSON.parse(txt)}catch(e){throw new Error('invalid_json')}
      if(!r.ok || j.ok===false) throw new Error(j.error||('http_'+r.status));
      return j;
    });
  });
}
function initialSid(){
  var incoming='';
  try{incoming=(new URL(location.href)).searchParams.get('romi_session')||''}catch(e){}
  if(/^[a-zA-Z0-9_-]{24,80}$/.test(incoming)){
    try{localStorage.setItem(SID_KEY,incoming)}catch(e){}
    return incoming;
  }
  var s=''; try{s=localStorage.getItem(SID_KEY)||''}catch(e){}
  if(/^[a-zA-Z0-9_-]{24,80}$/.test(s)) return s;
  try{
    s='rs_'+Array.from(crypto.getRandomValues(new Uint8Array(24))).map(function(x){return x.toString(16).padStart(2,'0')}).join('');
  }catch(e){s='rs_'+Date.now()+Math.random().toString(36).slice(2)}
  try{localStorage.setItem(SID_KEY,s)}catch(e){}
  return s;
}
function saveSession(){
  var payload={
    messages:STATE.messages.slice(-18),
    last_query:STATE.last_query,
    last_products:STATE.last_products.slice(0,8),
    customer_type:STATE.customer_type,
    city:STATE.city,
    selected_product_id:STATE.selected_product_id,
    lang:'ru'
  };
  return api('session_save',{method:'POST',body:{session_id:STATE.session_id,session:payload}}).catch(function(){});
}
function loadSession(){
  STATE.session_id=initialSid();
  return api('session_get',{query:{session_id:STATE.session_id}}).then(function(j){
    STATE.session_id=j.session_id||STATE.session_id;
    var s=j.session||{};
    ['messages','last_query','last_products','customer_type','city','selected_product_id'].forEach(function(k){
      if(s[k]!==undefined) STATE[k]=s[k];
    });
    try{localStorage.setItem(SID_KEY,STATE.session_id)}catch(e){}
  }).catch(function(){});
}
function record(role,text){
  STATE.messages.push({role:role,text:String(text||'').slice(0,900)});
  STATE.messages=STATE.messages.slice(-18);
  saveSession();
}
function addMessage(role, html, plain){
  var d=document.createElement('div');
  d.className='rv81-msg rv81-msg--'+role;
  d.innerHTML=html;
  CHAT.appendChild(d);
  CHAT.scrollTop=CHAT.scrollHeight;
  if(plain) record(role,plain);
  return d;
}
function say(text){return addMessage('assistant','<div class="rv81-bubble">'+esc(text)+'</div>',text)}
function user(text){return addMessage('user','<div class="rv81-bubble">'+esc(text)+'</div>',text)}
function loading(){
  return addMessage('assistant','<div class="rv81-bubble rv81-loading"><span></span><span></span><span></span><b>'+esc(RU.searching)+'</b></div>');
}
function remove(el){if(el&&el.parentNode) el.parentNode.removeChild(el)}

function build(){
  ROOT=document.getElementById('aromika-assistant');
  if(!ROOT) return false;

  if(C.site==='info'){
    var legacyPanel=ROOT.querySelector('.aa-panel');
    if(!legacyPanel) return false;

    var shell=document.getElementById('romi-v8-info-shell');
    if(!shell){
      shell=document.createElement('div');
      shell.id='romi-v8-info-shell';
      shell.className='rv81-info-shell';
      document.body.appendChild(shell);
    }else{
      shell.innerHTML='';
    }
    PANEL=shell;
    document.documentElement.classList.add('rv81-info-ready');
  }else{
    PANEL=ROOT.querySelector('.aa-panel');
    if(!PANEL) return false;
    var old=PANEL.querySelector('.rv8-layer,.rv81-layer');
    if(old) old.remove();
  }

  LAYER=document.createElement('section');
  LAYER.className='rv81-layer';
  LAYER.innerHTML=
    '<header class="rv81-head">'+
      '<div class="rv81-person"><span class="rv81-avatar"><img src="'+esc(asset('romi-finder.webp'))+'" alt=""></span><div><b>Romi</b><small>'+esc(RU.status)+'</small></div></div>'+
      '<div class="rv81-head-actions"><button type="button" class="rv81-back" title="'+esc(RU.back)+'">←</button><button type="button" class="rv81-x" title="'+esc(RU.close)+'">×</button></div>'+
    '</header>'+
    '<div class="rv81-chat"></div>'+
    '<div class="rv81-quick">'+
      '<button type="button" data-q="гель для стирки">Стирка</button>'+
      '<button type="button" data-q="гель для мытья посуды">Посуда</button>'+
      '<button type="button" data-q="жидкое мыло">Мыло</button>'+
      '<button type="button" data-action="b2b">Для бизнеса</button>'+
    '</div>'+
    '<form class="rv81-form"><textarea rows="1" maxlength="500" placeholder="'+esc(RU.placeholder)+'"></textarea><button type="submit" aria-label="Найти">→</button></form>';

  PANEL.appendChild(LAYER);
  CHAT=LAYER.querySelector('.rv81-chat');
  FORM=LAYER.querySelector('.rv81-form');
  INPUT=FORM.querySelector('textarea');

  var actions=ROOT.querySelector('.aa-screen .aa-actions');
  if(actions && !actions.querySelector('.rv81-entry')){
    var b=document.createElement('button');
    b.type='button';
    b.className='aa-action aa-action--primary rv81-entry';
    b.innerHTML='<span class="aa-action-icon">✦</span><span class="aa-action-copy"><b>'+RU.entry+'</b><small>'+RU.entrySub+'</small></span><span class="aa-arrow">→</span>';
    b.addEventListener('click',open);
    actions.insertBefore(b,actions.firstChild);
  }

  FORM.addEventListener('submit',function(e){
    e.preventDefault();
    var q=INPUT.value.trim();
    if(!q) return;
    INPUT.value='';
    handle(q);
  });
  INPUT.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();FORM.requestSubmit()}
  });
  LAYER.addEventListener('click',clicks);
  LAYER.querySelector('.rv81-back').addEventListener('click',handleBack);
  LAYER.querySelector('.rv81-x').addEventListener('click',closeAll);

  // On aromika.info the launcher should open the unified V8 interface directly.
  // V5 still builds the shell/mascot, but its old home screen is no longer used.
  if(C.site==='info'){
    var launcher=ROOT.querySelector('.aa-launcher');
    if(launcher){
      launcher.addEventListener('click',function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        open();
      },true);
    }
    var teaser=ROOT.querySelector('.aa-teaser');
    if(teaser){
      teaser.addEventListener('click',function(e){
        if(e.target.closest && e.target.closest('.aa-teaser-close')) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        open();
      },true);
    }
  }

  loadSession().then(function(){
    if(Array.isArray(STATE.messages)&&STATE.messages.length){
      STATE.messages.forEach(function(m){
        addMessage(m.role==='user'?'user':'assistant','<div class="rv81-bubble">'+esc(m.text)+'</div>');
      });
    } else {
      intro();
    }
    try{
      var q=(new URL(location.href)).searchParams.get('romi');
      if(q){open();setTimeout(function(){handle(q)},120)}
    }catch(e){}
  });
  return true;
}
function intro(){
  say(RU.hello);
}
function open(){
  if(C.site==='info'){
    document.documentElement.classList.add('rv81-info-open');
    if(PANEL) PANEL.classList.add('is-open');
    // neutralize old V5 panel state
    ROOT.classList.remove('is-open');
    var launcher=ROOT.querySelector('.aa-launcher');
    if(launcher) launcher.setAttribute('aria-expanded','false');
  }else{
    ROOT.classList.add('is-rv8');
  }
  LAYER.classList.add('is-active');
  setTimeout(function(){INPUT&&INPUT.focus({preventScroll:true})},80);
}
function handleBack(){
  if(COMPARE_SNAPSHOT){
    exitCompareView();
    return;
  }
  closeToHome();
}
function closeToHome(){
  if(COMPARE_SNAPSHOT) exitCompareView();
  LAYER.classList.remove('is-active');
  if(C.site==='info'){
    document.documentElement.classList.remove('rv81-info-open');
    if(PANEL) PANEL.classList.remove('is-open');
  }else{
    ROOT.classList.remove('is-rv8');
  }
}
function closeAll(){
  closeToHome();
  ROOT.classList.remove('is-open');
  document.documentElement.classList.remove('aa-lock-mobile');
  var launcher=ROOT.querySelector('.aa-launcher');
  if(launcher) launcher.setAttribute('aria-expanded','false');
}
function clicks(e){
  var q=e.target.closest('[data-q]');
  if(q){open();handle(q.getAttribute('data-q'));return}
  var a=e.target.closest('[data-action]');
  if(a&&a.getAttribute('data-action')==='b2b'){say('Расскажите, для какого бизнеса нужна продукция и в каком городе.');renderFeedback('b2b');return}
  var add=e.target.closest('[data-add]');
  if(add){addCart(add);return}
  var cmp=e.target.closest('[data-compare]');
  if(cmp){toggleCompare(cmp);return}
  var doCmp=e.target.closest('[data-do-compare]');
  if(doCmp){compareSelected();return}
  var clear=e.target.closest('[data-clear-compare]');
  if(clear){STATE.compare_ids=[];updateCompareBar();return}
  var compareBack=e.target.closest('[data-compare-back]');
  if(compareBack){exitCompareView();return}
}

function intent(q){
  var s=lower(q);
  if(/жалоб|претенз|протек|сломал|брак|поврежд|не работает|проблем/.test(s)) return 'complaint';
  if(/оставить отзыв|отзыв|оценк/.test(s)) return 'review';
  if(/гостиниц|отел|ресторан|кафе|опт|дистриб|торговая сеть|для бизнеса|horeca|корпоратив/.test(s)) return 'b2b';
  return 'search';
}
function handle(q){
  user(q);
  var i=intent(q);
  if(i==='complaint'){say('Помогу оформить обращение. Укажите товар, что произошло, город, где покупали, и контакт для связи.');renderFeedback('complaint');return}
  if(i==='review'){say('Оставьте товар, оценку и текст отзыва.');renderFeedback('review');return}
  if(i==='b2b'){STATE.customer_type='b2b';say('Для B2B-запроса укажите город, компанию и телефон или e-mail.');renderFeedback('b2b');return}
  smartSearch(q);
}

function normalizeQuery(q){
  return lower(q)
    .replace(/[!?.,;:()]/g,' ')
    .replace(/\b(мне|нужно|нужен|нужна|хочу|покажи|подбери|найди|пожалуйста|есть ли|что есть)\b/g,' ')
    .replace(/\s+/g,' ').trim();
}
function volumeTarget(q){
  var s=lower(q),m=s.match(/(\d+(?:[.,]\d+)?)\s*(мл|ml|л|литр(?:а|ов)?|l)\b/);
  if(!m) return 0;
  var n=parseFloat(m[1].replace(',','.'));
  return /мл|ml/.test(m[2])?Math.round(n):Math.round(n*1000);
}
function productVolume(p){
  var features=p.features||[], i, v;
  for(i=0;i<features.length;i++){
    if(/объ[её]м|volume/i.test(features[i].name||'')){
      v=parseFloat(String(features[i].value||'').replace(',','.'));
      if(isFinite(v)) return v>20?Math.round(v):Math.round(v*1000);
    }
  }
  var s=lower(p.name),m=s.match(/(\d{3,5})\s*мл\b/);
  if(m) return parseInt(m[1],10);
  m=s.match(/(\d+(?:[.,]\d+)?)\s*л\b/);
  return m?Math.round(parseFloat(m[1].replace(',','.'))*1000):0;
}
function detect(q){
  var s=lower(q);
  var d={
    brand:'',
    category:'',
    subcategory:'',
    purpose:'',
    volume:volumeTarget(q),
    explicitCategory:false
  };

  [
    ['wash expert','Wash Expert'],
    ['washexpert','Wash Expert'],
    ['maxi power','Maxi Power'],
    ['antibak','Antibak'],
    ['perfect','Perfect'],
    ['prachka','Prachka']
  ].some(function(pair){
    if(s.indexOf(pair[0])>=0){d.brand=pair[1];return true}
  });

  // Hard product intent. Order matters.
  if(/гель\s+для\s+стир|для\s+стирк|стиральн|бель[яе]|laundry/.test(s)){
    d.category='laundry'; d.explicitCategory=true;
  } else if(/гель\s+для\s+мытья\s+посуд|для\s+посуд|посуд/.test(s)){
    d.category='dish'; d.explicitCategory=true;
  } else if(/гель\s+для\s+душ|душ/.test(s)){
    d.category='shower'; d.explicitCategory=true;
  } else if(/жидк\w*\s+мыл|крем[-\s]?мыл/.test(s)){
    d.category='liquid_soap'; d.explicitCategory=true;
  } else if(/кусков\w*\s+мыл|банн\w*\s+мыл|тверд\w*\s+мыл/.test(s)){
    d.category='bar_soap'; d.explicitCategory=true;
  } else if(/\bмыл[оа]?\b/.test(s)){
    // Generic "мыло" should first show liquid soap, not bath/bar soap.
    d.category='soap_generic'; d.explicitCategory=true;
  } else if(/шампун/.test(s)){
    d.category='shampoo'; d.explicitCategory=true;
  } else if(/кондиционер.*бель|для\s+белья/.test(s)){
    d.category='laundry_conditioner'; d.explicitCategory=true;
  } else if(/чистящ|уборк|антижир|стекл|сануз/.test(s)){
    d.category='cleaning'; d.explicitCategory=true;
  }

  if(/черн|темн|black|dark/.test(s)) d.purpose='black';
  else if(/бел|white/.test(s)) d.purpose='white';
  else if(/цветн|color|colour/.test(s)) d.purpose='color';
  else if(/гипо|hypo|эко|eco/.test(s)) d.purpose='hypo';

  return d;
}

function productText(p){
  return lower(
    (p.name||'')+' '+(p.sku||'')+' '+
    (p.short_description||'')+' '+
    (p.features||[]).map(function(f){return (f.name||'')+' '+(f.value||'')}).join(' ')
  );
}

function categoryMatch(p,d){
  var s=productText(p);

  if(!d.category) return true;

  if(d.category==='laundry'){
    // Positive match + hard negatives prevent shower gels and soap.
    return (/стир|бель|laundry/.test(s) || /wash expert|maxi power|prachka/.test(s))
      && !/для\s+душ|шампун|жидк\w*\s+мыл|крем[-\s]?мыл|посуд/.test(s);
  }
  if(d.category==='dish'){
    return /посуд|dish/.test(s) && !/стир|душ|шампун/.test(s);
  }
  if(d.category==='shower'){
    return /для\s+душ|гель\s+душ|shower/.test(s);
  }
  if(d.category==='liquid_soap'){
    return /жидк\w*\s+мыл|крем[-\s]?мыл/.test(s) && !/кусков|банн\w*\s+мыл/.test(s);
  }
  if(d.category==='bar_soap'){
    return /кусков\w*\s+мыл|банн\w*\s+мыл|тверд\w*\s+мыл/.test(s);
  }
  if(d.category==='soap_generic'){
    return /мыл/.test(s);
  }
  if(d.category==='shampoo'){
    return /шампун|shampoo/.test(s);
  }
  if(d.category==='laundry_conditioner'){
    return /кондиционер/.test(s) && /бель|стир/.test(s);
  }
  if(d.category==='cleaning'){
    return /чистящ|уборк|антижир|стекл|сануз|clean/.test(s);
  }
  return true;
}

function brandMatch(p,d){
  if(!d.brand) return true;
  return productText(p).indexOf(lower(d.brand))>=0;
}

function searchTerms(q){
  var n=normalizeQuery(q),d=detect(q),a=[];

  // Most specific phrase first.
  if(d.brand && d.category==='laundry') a.push(d.brand+' гель для стирки');
  else if(d.brand && d.category==='dish') a.push(d.brand+' гель для мытья посуды');
  else if(d.brand && d.category==='shower') a.push(d.brand+' гель для душа');
  else if(d.brand && d.category==='liquid_soap') a.push(d.brand+' жидкое мыло');
  else if(n) a.push(n);

  // Strong category query second.
  if(d.category==='laundry') a.push('гель для стирки');
  else if(d.category==='dish') a.push('гель для мытья посуды');
  else if(d.category==='shower') a.push('гель для душа');
  else if(d.category==='liquid_soap') a.push('жидкое мыло');
  else if(d.category==='soap_generic') a.push('мыло');
  else if(d.category==='bar_soap') a.push('банное мыло');
  else if(d.category==='shampoo') a.push('шампунь');
  else if(d.category==='laundry_conditioner') a.push('кондиционер для белья');
  else if(d.category==='cleaning') a.push('чистящее средство');

  // Brand-only query is only a fallback pool; hard filtering still applies later.
  if(d.brand) a.push(d.brand);

  return uniq(a).slice(0,3);
}
function score(p,q){
  var s=productText(p),d=detect(q),sc=0;

  if(d.brand){
    if(s.indexOf(lower(d.brand))>=0) sc+=40;
    else sc-=80;
  }

  if(categoryMatch(p,d)) sc+=35;
  else if(d.explicitCategory) sc-=120;

  if(d.purpose==='black' && /black|dark|черн|темн/.test(s)) sc+=22;
  if(d.purpose==='white' && /white|бел/.test(s)) sc+=22;
  if(d.purpose==='color' && /color|colour|цвет/.test(s)) sc+=20;
  if(d.purpose==='hypo' && /гипо|hypo|eco|эко/.test(s)) sc+=20;

  if(d.category==='soap_generic'){
    // Prefer liquid soap for a generic "мыло" request.
    if(/жидк\w*\s+мыл|крем[-\s]?мыл/.test(s)) sc+=24;
    if(/кусков|банн\w*\s+мыл|тверд\w*\s+мыл/.test(s)) sc-=10;
  }

  if(d.volume){
    var pv=productVolume(p), diff=Math.abs(pv-d.volume);
    if(pv){
      if(diff<=100) sc+=25;
      else if(diff<=350) sc+=18;
      else if(diff<=800) sc+=10;
      else if(diff<=1400) sc+=3;
      else sc-=8;
    }
  }

  normalizeQuery(q).split(' ').filter(function(x){
    return x.length>=4 && !/^(гель|мыло|товар|продукт)$/.test(x);
  }).forEach(function(tok){
    if(s.indexOf(tok)>=0) sc+=3;
  });

  if(p.in_stock===true) sc+=3;
  return sc;
}

function smartSearch(q){
  var wait=loading(),terms=searchTerms(q),d=detect(q);

  function fetchTerms(list){
    return Promise.all(list.map(function(term){
      return api('search',{query:{q:term}})
        .then(function(j){return j.products||[]})
        .catch(function(){return []});
    }));
  }

  function prepare(groups){
    var byId={};
    groups.forEach(function(g){
      g.forEach(function(p){byId[p.product_id]=p});
    });

    var list=Object.keys(byId).map(function(k){return byId[k]});

    if(d.explicitCategory){
      list=list.filter(function(p){return categoryMatch(p,d)});
    }
    if(d.brand){
      list=list.filter(function(p){return brandMatch(p,d)});
    }

    list.sort(function(a,b){return score(b,q)-score(a,q)});
    return list;
  }

  fetchTerms(terms).then(function(groups){
    var list=prepare(groups);

    // If a strict phrase still yielded no candidate, retry one broad category
    // query. Server returns up to 40 candidates, then categoryMatch gates them.
    if(!list.length && d.category){
      var fallback='';
      if(d.category==='laundry') fallback='стирки';
      else if(d.category==='dish') fallback='посуды';
      else if(d.category==='shower') fallback='душа';
      else if(d.category==='liquid_soap'||d.category==='soap_generic'||d.category==='bar_soap') fallback='мыло';
      else if(d.category==='shampoo') fallback='шампунь';
      else if(d.category==='laundry_conditioner') fallback='кондиционер';
      else if(d.category==='cleaning') fallback='чистящее';

      if(fallback){
        return fetchTerms([fallback]).then(function(extra){
          return prepare(groups.concat(extra));
        });
      }
    }
    return list;
  }).then(function(list){
    remove(wait);

    STATE.last_query=q;
    STATE.last_products=list.slice(0,8).map(function(p){return p.product_id});
    saveSession();

    if(!list.length){
      say(RU.none);
      return;
    }
    renderProducts(list.slice(0,6));
  }).catch(function(err){
    remove(wait);
    console.error('[Romi search]',err);
    say(RU.error);
  });
}
function meta(p){
  var v=productVolume(p),bits=[];
  if(v) bits.push(v>=1000?(Math.round(v/100)/10)+' л':v+' мл');
  if(p.in_stock===true) bits.push(RU.stock);
  return bits;
}

function productCard(p){
  var old=money(p.old_price),price=money(p.price),inCmp=STATE.compare_ids.indexOf(Number(p.product_id))>=0;
  var primary=C.site==='shop'
    ? '<button type="button" class="rv81-primary" data-add="'+esc(p.product_id)+'">'+RU.add+'</button>'
    : '<a class="rv81-primary" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+RU.buy+' ↗</a>';

  return '<article class="rv81-product" data-pid="'+esc(p.product_id)+'">'+
    '<a class="rv81-product-img" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+
      (p.image?'<img src="'+esc(p.image)+'" alt="" loading="lazy">':'<span>AROMIKA</span>')+
    '</a>'+
    '<div class="rv81-product-main">'+
      '<div class="rv81-sku">SKU '+esc(p.sku||'—')+'</div>'+
      '<a class="rv81-name" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+esc(p.name)+'</a>'+
      '<div class="rv81-meta">'+meta(p).map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div>'+
      '<div class="rv81-price">'+
        (price?'<strong>'+esc(price)+'</strong>':'')+
        (old?'<del>'+esc(old)+'</del>':'')+
        (p.discount_percent?'<em>−'+esc(p.discount_percent)+'%</em>':'')+
      '</div>'+
    '</div>'+
    '<div class="rv81-card-actions">'+
      primary+
      '<a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+RU.details+'</a>'+
      '<button type="button" class="'+(inCmp?'is-selected':'')+'" data-compare="'+esc(p.product_id)+'">'+(inCmp?'✓ ':'')+RU.compare+'</button>'+
    '</div>'+
  '</article>';
}

function renderProducts(products){
  var box=addMessage('assistant','<div class="rv81-result-head"><b>'+RU.found+'</b><span>'+products.length+' шт.</span></div><div class="rv81-products">'+products.map(productCard).join('')+'</div><div class="rv81-comparebar"></div>');
  updateCompareBar(box);
}
function compareBar(){
  return CHAT.querySelectorAll('.rv81-comparebar');
}
function updateCompareBar(scope){
  var bars=scope?[scope.querySelector('.rv81-comparebar')]:Array.from(compareBar());
  bars.forEach(function(bar){
    if(!bar) return;
    if(STATE.compare_ids.length<2){bar.innerHTML='';return}
    bar.innerHTML='<button type="button" data-do-compare>'+RU.compareSelected+' ('+STATE.compare_ids.length+')</button><button type="button" data-clear-compare>'+RU.clearCompare+'</button>';
  });
}
function toggleCompare(btn){
  var id=Number(btn.getAttribute('data-compare')),i=STATE.compare_ids.indexOf(id);
  if(i>=0){STATE.compare_ids.splice(i,1);btn.classList.remove('is-selected');btn.textContent=RU.compare}
  else{
    if(STATE.compare_ids.length>=3) STATE.compare_ids.shift();
    STATE.compare_ids.push(id);btn.classList.add('is-selected');btn.textContent='✓ '+RU.compare;
  }
  updateCompareBar();
}
function compareSelected(){
  if(STATE.compare_ids.length<2) return;
  var wait=loading();
  api('compare',{query:{ids:STATE.compare_ids.join(',')}}).then(function(j){
    remove(wait);
    enterCompareView(j.products||[]);
  }).catch(function(){
    remove(wait);
    say(RU.error);
  });
}

function compareFeatureMap(p){
  var map={};
  (p.features||[]).forEach(function(f){
    var name=String(f.name||'').trim();
    var value=String(f.value||'').trim();
    if(name && value) map[name]=value;
  });
  return map;
}

function compareFeatureNames(ps){
  var names=[];
  ps.forEach(function(p){
    Object.keys(compareFeatureMap(p)).forEach(function(name){
      if(/объ[её]м|volume|sku|артикул/i.test(name)) return;
      if(names.indexOf(name)<0) names.push(name);
    });
  });
  return names.slice(0,12);
}

function compareCellAction(p){
  if(C.site==='shop'){
    return '<button type="button" class="rv88-buy" data-add="'+esc(p.product_id)+'">'+RU.add+'</button>';
  }
  return '<a class="rv88-buy" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+RU.buy+' ↗</a>';
}

function compareValueRow(label,ps,getter){
  return '<tr><th>'+esc(label)+'</th>'+ps.map(function(p){
    var v=getter(p);
    return '<td>'+esc(v===undefined||v===null||v===''?'—':v)+'</td>';
  }).join('')+'</tr>';
}

function pricePerLiter(p){
  var ml=productVolume(p),price=Number(p.price);
  if(!ml || !price) return '—';
  return money(price/(ml/1000));
}

function enterCompareView(ps){
  if(!ps || ps.length<2) return;

  if(!COMPARE_SNAPSHOT){
    COMPARE_SNAPSHOT={
      html:CHAT.innerHTML,
      scroll:CHAT.scrollTop
    };
  }

  LAYER.classList.add('is-compare');

  var featureNames=compareFeatureNames(ps);
  var minWidth=110+(ps.length*165);

  var html=
    '<div class="rv88-compare-page">'+
      '<div class="rv88-compare-top">'+
        '<button type="button" data-compare-back>← К результатам</button>'+
        '<div><b>Сравнение товаров</b><small>'+ps.length+' товара</small></div>'+
      '</div>'+
      '<div class="rv88-compare-scroll">'+
        '<table class="rv88-compare-table" style="min-width:'+minWidth+'px">'+
          '<thead><tr><th>Характеристика</th>'+
          ps.map(function(p){
            return '<th>'+
              '<div class="rv88-cproduct">'+
                '<a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener" class="rv88-cimage">'+
                  (p.image?'<img src="'+esc(p.image)+'" alt="" loading="lazy">':'<span>AROMIKA</span>')+
                '</a>'+
                '<b>'+esc(p.name)+'</b>'+
                '<div class="rv88-cactions">'+
                  compareCellAction(p)+
                  '<a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">Подробнее</a>'+
                '</div>'+
              '</div>'+
            '</th>';
          }).join('')+
          '</tr></thead>'+
          '<tbody>'+
            compareValueRow('Цена',ps,function(p){return money(p.price)||'—'})+
            compareValueRow('Цена за 1 л',ps,pricePerLiter)+
            compareValueRow('Объём',ps,function(p){
              var ml=productVolume(p);
              return ml?(ml>=1000?(Math.round(ml/100)/10)+' л':ml+' мл'):'—';
            })+
            compareValueRow('Наличие',ps,function(p){return p.in_stock===true?'В наличии':p.in_stock===false?'Нет в наличии':'—'})+
            compareValueRow('SKU',ps,function(p){return p.sku||'—'})+
            compareValueRow('Скидка',ps,function(p){return p.discount_percent?'−'+p.discount_percent+'%':'—'})+
            featureNames.map(function(name){
              return compareValueRow(name,ps,function(p){
                return compareFeatureMap(p)[name]||'—';
              });
            }).join('')+
          '</tbody>'+
        '</table>'+
      '</div>'+
    '</div>';

  CHAT.innerHTML=html;
  CHAT.scrollTop=0;
}

function exitCompareView(){
  if(!COMPARE_SNAPSHOT) return false;
  var snap=COMPARE_SNAPSHOT;
  COMPARE_SNAPSHOT=null;
  LAYER.classList.remove('is-compare');
  CHAT.innerHTML=snap.html;
  requestAnimationFrame(function(){CHAT.scrollTop=snap.scroll||0});
  return true;
}

function addCart(btn){
  var id=Number(btn.getAttribute('data-add'));
  btn.disabled=true;btn.textContent='Добавляю…';
  api('cart_add',{method:'POST',body:{product_id:id,amount:1}}).then(function(j){
    btn.textContent=RU.added;
    btn.classList.add('is-added');
    var c=j.cart||{};
    addMessage('assistant','<div class="rv81-cartmsg"><b>Товар добавлен</b><span>'+esc((c.amount||0)+' товар(а) · '+(money(c.total)||''))+'</span><a href="'+esc(c.cart_url||C.shopOrigin+'/cart/')+'">'+RU.cart+' →</a></div>');
  }).catch(function(err){
    console.error('[Romi cart]',err);
    btn.disabled=false;btn.textContent=RU.add;
    say('Не удалось добавить товар в корзину. Попробуйте ещё раз.');
  });
}
function renderFeedback(type){
  var title=type==='b2b'?'B2B-запрос':type==='review'?'Отзыв':'Обращение';
  var html='<form class="rv81-feedback" data-type="'+esc(type)+'">'+
    '<b>'+esc(title)+'</b>'+
    '<input name="company_url" class="rv81-hp" tabindex="-1" autocomplete="off">'+
    '<div class="rv81-fields"><input name="name" placeholder="Имя"><input name="city" placeholder="Город"></div>'+
    '<div class="rv81-fields"><input name="phone" placeholder="Телефон"><input name="email" placeholder="E-mail"></div>'+
    '<input name="product_name" placeholder="'+(type==='b2b'?'Компания / что требуется':'Товар')+'">'+
    (type==='review'?'<input name="rating" inputmode="numeric" placeholder="Оценка 1–5">':'')+
    '<textarea name="message" rows="4" placeholder="Комментарий"></textarea>'+
    (type==='complaint'?'<label class="rv81-file">Фото, если нужно<input name="photo" type="file" accept="image/jpeg,image/png,image/webp"></label>':'')+
    '<button type="submit">'+RU.send+' →</button><small class="rv81-form-error"></small></form>';
  var box=addMessage('assistant',html),form=box.querySelector('form');
  form.addEventListener('submit',function(e){e.preventDefault();submitFeedback(form,type)});
}
function fileData(file){
  return new Promise(function(resolve,reject){
    if(!file){resolve('');return}
    if(file.size>5*1024*1024){reject(new Error('too_large'));return}
    var r=new FileReader();r.onload=function(){resolve(String(r.result||''))};r.onerror=function(){reject(new Error('read'))};r.readAsDataURL(file);
  });
}
function submitFeedback(form,type){
  var fd=new FormData(form),body={type:type,session_id:STATE.session_id,source:C.site};
  fd.forEach(function(v,k){if(k!=='photo') body[k]=String(v||'').trim()});
  if(type==='b2b'&&!body.phone&&!body.email){form.querySelector('.rv81-form-error').textContent=RU.needContact;return}
  var submit=form.querySelector('button[type=submit]'),file=form.querySelector('input[name=photo]');
  submit.disabled=true;
  fileData(file&&file.files&&file.files[0]).then(function(data){
    if(data) body.photo_data=data;
    return api(type==='b2b'?'b2b':'feedback',{method:'POST',body:body});
  }).then(function(j){
    form.remove();say(RU.sent+' '+(j.reference||''));
  }).catch(function(){
    submit.disabled=false;form.querySelector('.rv81-form-error').textContent=RU.failed;
  });
}
function withSession(url){
  try{
    var u=new URL(url,location.href);
    u.searchParams.set('romi_session',STATE.session_id);
    return u.toString();
  }catch(e){return url}
}

function fixLegacyInfoLinks(){
  if(C.site!=='shop') return;

  var commerceBrandRoutes={
    '/perfect':'Perfect',
    '/washexpert':'Wash Expert',
    '/maxipower':'Maxi Power',
    '/prachka':'Prachka',
    '/antibak':'Antibak'
  };

  var infoRoutes=[
    '/', '/brands', '/okompanii', '/careers', '/kontakty'
  ];

  document.addEventListener('click',function(e){
    var a=e.target && e.target.closest ? e.target.closest('#aromika-assistant a[href]') : null;
    if(!a) return;

    var raw=a.getAttribute('href')||'';
    if(!raw || raw.charAt(0)!=='/' || raw.indexOf('//')===0) return;

    var pathOnly=raw.split('?')[0].split('#')[0]||'/';

    // "Актуальные акции" on aromika.shop must stay inside the shop.
    if(pathOnly==='/akcii'){
      e.preventDefault();
      e.stopPropagation();
      window.location.href=C.shopOrigin.replace(/\/$/,'')+'/bestsellery/';
      return;
    }

    // Product/brand recommendations on the shop stay in commerce:
    // open live CS-Cart results inside Romi instead of aromika.info.
    if(commerceBrandRoutes[pathOnly]){
      e.preventDefault();
      e.stopPropagation();
      open();
      var brandQuery=commerceBrandRoutes[pathOnly];
      setTimeout(function(){
        user(brandQuery);
        smartSearch(brandQuery);
      },60);
      return;
    }

    // Generic product route also remains a shop flow.
    if(raw.indexOf('/#products')===0){
      e.preventDefault();
      e.stopPropagation();
      open();
      setTimeout(function(){
        user('Продукция Aromika');
        smartSearch('Aromika');
      },60);
      return;
    }

    // Only genuinely corporate/informational routes go to aromika.info.
    if(infoRoutes.indexOf(pathOnly)!==-1){
      e.preventDefault();
      var dest=C.infoOrigin.replace(/\/$/,'')+raw;
      if(a.target==='_blank') window.open(dest,'_blank','noopener');
      else window.location.href=dest;
    }
  },true);
}

function boot(){
  fixLegacyInfoLinks();
  var tries=0;(function wait(){
    if(build()) return;
    if(++tries<100) setTimeout(wait,120);
  })();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();