(function(){
'use strict';
if(window.__ROMI_V8_COMMERCE_CORE__) return;
window.__ROMI_V8_COMMERCE_CORE__=true;

var C=Object.assign({
  site: location.hostname.indexOf('aromika.shop')>=0?'shop':'info',
  apiBase:'https://aromika.shop/index.php?dispatch=romi.',
  shopOrigin:'https://aromika.shop',
  infoOrigin:'https://aromika.info'
},window.ROMI_V8_CONFIG||{});

var SID_KEY='romi-v8-session-id';
var ROOT=null, PANEL=null, CHAT=null, FORM=null, INPUT=null;
var STATE={session_id:'',messages:[],last_products:[],customer_type:'',city:'',selected_product_id:0,lang:'ru'};

var TXT={
 ru:{
  entry:'Подобрать товар с Romi',
  hello:'Здравствуйте. Напишите, что нужно — я подберу реальные товары Aromika, сравню варианты или помогу с покупкой.',
  ph:'Например: гель для чёрного белья около 3 литров',
  typing:'Ищу в каталоге…',found:'Вот что нашла в интернет-магазине:',none:'Точного варианта не нашла. Уточните бренд, назначение или объём.',
  buy:'Купить',details:'Подробнее',compare:'Сравнить',add:'В корзину',added:'Добавлено в корзину',
  cart:'Корзина',checkout:'Оформить заказ',continue:'Продолжить',
  b2b:'Похоже, это запрос для бизнеса. Уточните город, компанию и оставьте телефон или e-mail — я подготовлю обращение.',
  complaint:'Я помогу оформить обращение. Укажите товар, что произошло, город, где покупали и контакт для связи.',
  review:'Напишите товар, оценку от 1 до 5 и сам отзыв.',
  sent:'Передано в Aromika. Номер обращения:',needContact:'Нужен телефон или e-mail для связи.',
  fail:'Не удалось отправить. Можно написать напрямую на info@aromika.info.',
  back:'Назад',close:'Закрыть'
 },
 kk:{
  entry:'Romi көмегімен өнім таңдау',
  hello:'Сәлеметсіз бе. Не қажет екенін жазыңыз — мен Aromika тауарларын тауып, салыстырып немесе сатып алуға көмектесемін.',
  ph:'Мысалы: қара киімге шамамен 3 литр гель',
  typing:'Каталогтан іздеп жатырмын…',found:'Интернет-дүкеннен тапқан нұсқалар:',none:'Дәл нұсқа табылмады. Брендті, міндетті немесе көлемді нақтылаңыз.',
  buy:'Сатып алу',details:'Толығырақ',compare:'Салыстыру',add:'Себетке',added:'Себетке қосылды',
  cart:'Себет',checkout:'Тапсырысты рәсімдеу',continue:'Жалғастыру',
  b2b:'Бұл бизнеске арналған сұраныс сияқты. Қаланы, компанияны және телефон немесе e-mail көрсетіңіз.',
  complaint:'Өтінішті рәсімдеуге көмектесемін. Тауарды, мәселені, қаланы, сатып алған жерді және байланыс деректерін жазыңыз.',
  review:'Тауарды, 1-ден 5-ке дейін бағаны және пікірді жазыңыз.',
  sent:'Aromika-ға жіберілді. Өтініш нөмірі:',needContact:'Байланыс үшін телефон немесе e-mail қажет.',
  fail:'Жіберу мүмкін болмады. info@aromika.info мекенжайына жаза аласыз.',
  back:'Артқа',close:'Жабу'
 }
};

function lang(){
  var l='ru'; try{l=localStorage.getItem('aromika-language')||document.documentElement.lang||'ru'}catch(e){}
  return /^kk|^kz/i.test(l)?'kk':'ru';
}
function t(){return TXT[lang()]||TXT.ru}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function money(v){var n=Number(v);return isFinite(n)&&n>0?Math.round(n).toLocaleString('ru-RU')+' ₸':''}
function api(mode,opts){
  opts=opts||{};var url=C.apiBase+encodeURIComponent(mode);
  if(opts.query){var q=new URLSearchParams(opts.query);url+='&'+q.toString()}
  return fetch(url,{method:opts.method||'GET',credentials:'include',headers:Object.assign({'Accept':'application/json'},opts.body?{'Content-Type':'application/json'}:{}),body:opts.body?JSON.stringify(opts.body):undefined})
    .then(function(r){return r.json().then(function(j){if(!r.ok||j.ok===false)throw new Error(j.error||('HTTP '+r.status));return j})});
}
function sid(){
  var s='';try{s=localStorage.getItem(SID_KEY)||''}catch(e){}
  if(/^[a-zA-Z0-9_-]{24,80}$/.test(s))return s;
  try{s='rs_'+Array.from(crypto.getRandomValues(new Uint8Array(24))).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}
  catch(e){s='rs_'+Date.now()+Math.random().toString(36).slice(2)}
  try{localStorage.setItem(SID_KEY,s)}catch(e){}
  return s;
}
function saveSession(){
  STATE.lang=lang();
  return api('session_save',{method:'POST',body:{session_id:STATE.session_id,session:STATE}}).catch(function(){});
}
function loadSession(){
  STATE.session_id=sid();
  return api('session_get',{query:{session_id:STATE.session_id}}).then(function(j){
    var s=j.session||{};Object.keys(s).forEach(function(k){STATE[k]=s[k]});
    STATE.session_id=j.session_id||STATE.session_id;
    try{localStorage.setItem(SID_KEY,STATE.session_id)}catch(e){}
  }).catch(function(){});
}
function msg(role,html,plain){
  if(!CHAT)return null;
  var d=document.createElement('div');d.className='rv8-msg rv8-msg--'+role;d.innerHTML=html;CHAT.appendChild(d);CHAT.scrollTop=CHAT.scrollHeight;
  if(plain){STATE.messages.push({role:role,text:String(plain).slice(0,1000)});STATE.messages=STATE.messages.slice(-20);saveSession()}
  return d;
}
function say(text){return msg('assistant','<div class="rv8-bubble">'+esc(text)+'</div>',text)}
function user(text){return msg('user','<div class="rv8-bubble">'+esc(text)+'</div>',text)}
function loading(){return msg('assistant','<div class="rv8-bubble rv8-loading"><i></i><i></i><i></i><span>'+esc(t().typing)+'</span></div>')}
function remove(el){if(el&&el.parentNode)el.parentNode.removeChild(el)}

function build(){
  var root=document.getElementById('aromika-assistant');
  if(!root)return false;
  ROOT=root;
  var panel=root.querySelector('.aa-panel');if(!panel)return false;

  var layer=document.createElement('div');layer.className='rv8-layer';layer.innerHTML=
    '<div class="rv8-head"><button type="button" data-rv8-back>← '+esc(t().back)+'</button><div><b>Romi</b><small>Commerce Core</small></div><button type="button" data-rv8-close>×</button></div>'+
    '<div class="rv8-chat"></div>'+
    '<form class="rv8-form"><textarea rows="1" maxlength="500" placeholder="'+esc(t().ph)+'"></textarea><button type="submit">→</button></form>';
  panel.appendChild(layer);PANEL=layer;CHAT=layer.querySelector('.rv8-chat');FORM=layer.querySelector('.rv8-form');INPUT=FORM.querySelector('textarea');

  var actions=root.querySelector('.aa-screen .aa-actions');
  if(actions){
    var b=document.createElement('button');b.type='button';b.className='aa-action aa-action--primary rv8-entry';
    b.innerHTML='<span class="aa-action-icon">✦</span><span class="aa-action-copy"><b>'+esc(t().entry)+'</b><small>Каталог · сравнение · покупка</small></span><span class="aa-arrow">→</span>';
    b.addEventListener('click',open);actions.insertBefore(b,actions.firstChild);
  }

  FORM.addEventListener('submit',function(e){e.preventDefault();var q=INPUT.value.trim();if(!q)return;INPUT.value='';handle(q)});
  INPUT.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();FORM.requestSubmit()}});
  layer.querySelector('[data-rv8-back]').addEventListener('click',close);
  layer.querySelector('[data-rv8-close]').addEventListener('click',function(){close();var x=root.querySelector('.aa-close');if(x)x.click()});
  layer.addEventListener('click',dynamicClick);

  loadSession().then(function(){
    if(STATE.messages.length){
      STATE.messages.forEach(function(m){msg(m.role==='user'?'user':'assistant','<div class="rv8-bubble">'+esc(m.text)+'</div>')});
    }else say(t().hello);
    deepLink();
  });

  return true;
}
function open(){if(!ROOT||!PANEL)return;ROOT.classList.add('is-rv8');PANEL.classList.add('is-active');setTimeout(function(){INPUT&&INPUT.focus({preventScroll:true})},60)}
function close(){if(!ROOT||!PANEL)return;ROOT.classList.remove('is-rv8');PANEL.classList.remove('is-active')}

function normalizeQuery(q){
  var s=q.toLowerCase().replace(/ё/g,'е');
  // Strip conversational filler but keep product terms.
  return s.replace(/\b(мне|нужно|нужен|нужна|хочу|покажи|подбери|найди|что есть|пожалуйста)\b/g,' ').replace(/\s+/g,' ').trim();
}
function intent(q){
  var s=q.toLowerCase().replace(/ё/g,'е');
  if(/жалоб|претенз|протек|сломал|брак|поврежд|не работает|проблем/.test(s))return'complaint';
  if(/отзыв|оценк|понравил|не понравил/.test(s))return'review';
  if(/гостиниц|отел|ресторан|кафе|опт|дистриб|магазин|торговая сеть|бизнес|horeca|корпоратив/.test(s))return'b2b';
  if(/сравн/.test(s))return'compare';
  return'search';
}
function handle(q){
  user(q);
  var mode=intent(q);
  if(mode==='complaint'){say(t().complaint);renderFeedbackForm('complaint');return}
  if(mode==='review'){say(t().review);renderFeedbackForm('review');return}
  if(mode==='b2b'){STATE.customer_type='b2b';say(t().b2b);renderFeedbackForm('b2b');return}
  if(mode==='compare'){compareLast();return}
  search(q);
}
function search(q){
  var wait=loading(),query=normalizeQuery(q);
  api('search',{query:{q:query}}).then(function(j){
    remove(wait);var products=j.products||[];STATE.last_products=products.map(function(p){return p.product_id});STATE.last_query=q;saveSession();
    if(!products.length){say(t().none);return}
    renderProducts(products);
  }).catch(function(){remove(wait);say(t().none)});
}
function productCard(p){
  var canCart=C.site==='shop',price=money(p.price),old=money(p.old_price);
  return '<article class="rv8-product" data-pid="'+esc(p.product_id)+'">'+
    '<a href="'+esc(p.url)+'" target="_blank" rel="noopener" class="rv8-img">'+(p.image?'<img src="'+esc(p.image)+'" alt="" loading="lazy">':'<span>AROMIKA</span>')+'</a>'+
    '<div class="rv8-copy"><small>'+esc(p.sku||'Aromika')+'</small><b>'+esc(p.name)+'</b>'+
      '<div class="rv8-price">'+(price?'<strong>'+esc(price)+'</strong>':'')+(old?'<del>'+esc(old)+'</del>':'')+(p.discount_percent?'<em>−'+esc(p.discount_percent)+'%</em>':'')+'</div>'+
      '<div class="rv8-stock">'+(p.in_stock===true?'✓ В наличии':p.in_stock===false?'Нет в наличии':'')+'</div>'+
      '<div class="rv8-actions">'+
        (canCart?'<button type="button" data-rv8-add="'+esc(p.product_id)+'">'+esc(t().add)+'</button>':'<a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+esc(t().buy)+' ↗</a>')+
        '<a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+esc(t().details)+'</a>'+
        '<button type="button" data-rv8-select="'+esc(p.product_id)+'">'+esc(t().compare)+'</button>'+
      '</div>'+
    '</div></article>';
}
function renderProducts(products){
  msg('assistant','<div class="rv8-title">'+esc(t().found)+'</div><div class="rv8-products">'+products.slice(0,6).map(productCard).join('')+'</div>','');
}
function compareLast(){
  var ids=STATE.last_products.slice(0,3);if(ids.length<2){say(t().none);return}
  var wait=loading();
  api('compare',{query:{ids:ids.join(',')}}).then(function(j){remove(wait);renderCompare(j.products||[])}).catch(function(){remove(wait);say(t().none)});
}
function renderCompare(ps){
  if(ps.length<2){say(t().none);return}
  var html='<div class="rv8-title">'+esc(t().compare)+'</div><div class="rv8-compare"><table><thead><tr><th></th>'+ps.map(function(p){return'<th>'+esc(p.name)+'</th>'}).join('')+'</tr></thead><tbody>'+
    '<tr><td>Цена</td>'+ps.map(function(p){return'<td>'+esc(money(p.price)||'—')+'</td>'}).join('')+'</tr>'+
    '<tr><td>Наличие</td>'+ps.map(function(p){return'<td>'+(p.in_stock===true?'✓':p.in_stock===false?'—':'?')+'</td>'}).join('')+'</tr>'+
    '<tr><td></td>'+ps.map(function(p){return'<td><a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+esc(t().buy)+' ↗</a></td>'}).join('')+'</tr>'+
    '</tbody></table></div>';
  msg('assistant',html,'');
}
function dynamicClick(e){
  var add=e.target.closest('[data-rv8-add]');if(add){addCart(add);return}
  var sel=e.target.closest('[data-rv8-select]');if(sel){
    var id=Number(sel.getAttribute('data-rv8-select'));STATE.selected_product_id=id;
    var a=STATE.last_products.filter(function(x){return Number(x)!==id});STATE.last_products=[id].concat(a);saveSession();compareLast();return
  }
}
function addCart(btn){
  var id=Number(btn.getAttribute('data-rv8-add'));btn.disabled=true;
  api('cart_add',{method:'POST',body:{product_id:id,amount:1}}).then(function(j){
    btn.textContent=t().added;renderCart(j.cart||{});
  }).catch(function(){btn.disabled=false});
}
function renderCart(c){
  msg('assistant','<div class="rv8-cart"><b>'+esc(t().cart)+'</b><span>'+esc((c.amount||0)+' товар(а) · '+(money(c.total)||''))+'</span><div><a href="'+esc(c.cart_url||C.shopOrigin+'/index.php?dispatch=checkout.cart')+'">'+esc(t().cart)+'</a><a href="'+esc(c.checkout_url||C.shopOrigin+'/index.php?dispatch=checkout.checkout')+'">'+esc(t().checkout)+'</a></div></div>','');
}
function renderFeedbackForm(type){
  var labels=type==='review'?{msg:'Отзыв',extra:'Оценка 1–5'}:{msg:'Описание',extra:'Товар / компания'};
  var html='<form class="rv8-feedback" data-type="'+esc(type)+'"><input name="company_url" class="rv8-hp" tabindex="-1" autocomplete="off">'+
    '<input name="name" placeholder="Имя">'+
    '<input name="phone" placeholder="Телефон">'+
    '<input name="email" placeholder="E-mail">'+
    '<input name="city" placeholder="Город">'+
    '<input name="product_name" placeholder="'+esc(labels.extra)+'">'+
    (type==='review'?'<input name="rating" inputmode="numeric" placeholder="Оценка 1–5">':'')+
    '<textarea name="message" rows="4" placeholder="'+esc(labels.msg)+'"></textarea>'+
    (type==='complaint'?'<label class="rv8-file"><span>Фото (необязательно)</span><input name="photo" type="file" accept="image/jpeg,image/png,image/webp"></label>':'')+
    '<button type="submit">Отправить →</button><div class="rv8-error"></div></form>';
  var box=msg('assistant',html,'');var form=box.querySelector('form');
  form.addEventListener('submit',function(e){e.preventDefault();submitFeedback(form,type)});
}
function fileToDataURL(file){
  return new Promise(function(resolve,reject){
    if(!file){resolve('');return}
    if(file.size>5*1024*1024){reject(new Error('file_too_large'));return}
    var r=new FileReader();r.onload=function(){resolve(String(r.result||''))};r.onerror=function(){reject(r.error||new Error('file_read'))};r.readAsDataURL(file);
  });
}
function submitFeedback(form,type){
  var fd=new FormData(form),body={type:type,session_id:STATE.session_id,source:C.site};
  fd.forEach(function(v,k){if(k!=='photo')body[k]=String(v||'').trim()});
  if((type==='b2b')&&!body.phone&&!body.email){form.querySelector('.rv8-error').textContent=t().needContact;return}
  var mode=type==='b2b'?'b2b':'feedback',b=form.querySelector('button');b.disabled=true;
  var fileInput=form.querySelector('input[name="photo"]'),file=fileInput&&fileInput.files&&fileInput.files[0];
  fileToDataURL(file).then(function(data){
    if(data)body.photo_data=data;
    return api(mode,{method:'POST',body:body});
  }).then(function(j){form.remove();say(t().sent+' '+(j.reference||''))}).catch(function(err){b.disabled=false;form.querySelector('.rv8-error').textContent=(err&&err.message==='file_too_large')?'Фото слишком большое (максимум 5 МБ).':t().fail});
}
function withSession(url){
  try{var u=new URL(url,location.href);u.searchParams.set('romi_session',STATE.session_id);return u.toString()}catch(e){return url}
}
function deepLink(){
  try{
    var u=new URL(location.href),incoming=u.searchParams.get('romi_session'),q=u.searchParams.get('romi');
    if(incoming&&incoming!==STATE.session_id){STATE.session_id=incoming;try{localStorage.setItem(SID_KEY,incoming)}catch(e){}}
    if(q){open();setTimeout(function(){handle(q)},150)}
  }catch(e){}
}
function boot(){
  var tries=0;(function find(){
    if(build())return;
    if(++tries<80)setTimeout(find,125);
  })();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();