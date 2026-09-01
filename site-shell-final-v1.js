(function(){
'use strict';

if(window.__AROMIKA_GLOBAL_SHELL_FINAL_V1__) return;
window.__AROMIKA_GLOBAL_SHELL_FINAL_V1__ = true;

var LANG_KEY='aromika-language';
var THEME_KEY='aromika-theme';

var TEXT={
  ru:{
    products:'Продукция',
    brands:'Бренды',
    promos:'Акции',
    about:'О компании',
    partners:'Партнёрам',
    careers:'Работа в компании',
    contacts:'Контакты',
    buy:'Купить онлайн',
    brandText:'Казахстанский производитель бытовой химии и косметической продукции.',
    shop:'Интернет-магазин',
    company:'Компания',
    production:'Производство и качество',
    allBrands:'Все бренды',
    partnerHead:'Партнёрам',
    cooperation:'Сотрудничество',
    retail:'Торговым сетям',
    horeca:'HoReCa / корпоративным клиентам',
    distribution:'Дистрибуция',
    buyers:'Покупателям',
    catalog:'Каталог',
    where:'Где купить',
    office:'Головной офис',
    city:'Костанай, Казахстан',
    phone:'Телефон',
    feedback:'Обратная связь',
    top:'Наверх',
    themeLight:'Включить светлую тему',
    themeDark:'Включить тёмную тему',
    menu:'Открыть меню',
    closeMenu:'Закрыть меню'
  },
  kk:{
    products:'Өнімдер',
    brands:'Брендтер',
    promos:'Акциялар',
    about:'Компания туралы',
    partners:'Серіктестерге',
    careers:'Компаниядағы жұмыс',
    contacts:'Байланыс',
    buy:'Онлайн сатып алу',
    brandText:'Қазақстандық тұрмыстық химия және косметикалық өнім өндірушісі.',
    shop:'Интернет-дүкен',
    company:'Компания',
    production:'Өндіріс және сапа',
    allBrands:'Барлық брендтер',
    partnerHead:'Серіктестерге',
    cooperation:'Ынтымақтастық',
    retail:'Сауда желілеріне',
    horeca:'HoReCa / корпоративтік клиенттерге',
    distribution:'Дистрибуция',
    buyers:'Сатып алушыларға',
    catalog:'Каталог',
    where:'Қайдан сатып алуға болады',
    office:'Бас кеңсе',
    city:'Қостанай, Қазақстан',
    phone:'Телефон',
    feedback:'Кері байланыс',
    top:'Жоғары',
    themeLight:'Жарық тақырыпты қосу',
    themeDark:'Қараңғы тақырыпты қосу',
    menu:'Мәзірді ашу',
    closeMenu:'Мәзірді жабу'
  }
};

function esc(v){
  return String(v==null?'':v).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function path(){
  var p=(location.pathname||'/').replace(/\/+$/,'');
  return p||'/';
}

function currentLang(){
  var v='ru';
  try{v=localStorage.getItem(LANG_KEY)||document.documentElement.lang||'ru'}catch(e){}
  v=String(v).toLowerCase();
  return (v==='kk'||v==='kz'||v.indexOf('kk')===0)?'kk':'ru';
}

function currentTheme(){
  var h=document.documentElement.getAttribute('data-aromika-theme');
  if(h==='light'||h==='dark') return h;
  try{
    var s=localStorage.getItem(THEME_KEY);
    if(s==='light'||s==='dark') return s;
  }catch(e){}
  try{
    if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }catch(e){}
  return 'light';
}

function sameOrigin(value){
  try{return new URL(value,location.href).origin===location.origin}catch(e){return false}
}

function partnerType(v){
  v=String(v||'').toLowerCase();
  if(v==='retail'||v==='supply'||v==='shop') return 'retail';
  if(v==='horeca'||v==='corporate'||v==='pro') return 'horeca';
  if(v==='distribution'||v==='distributor') return 'distributor';
  return '';
}

function normalizeHref(raw){
  if(raw==null) return raw;
  var value=String(raw).trim();
  if(!value) return value;
  if(/^(?:mailto:|tel:|sms:|whatsapp:|javascript:|data:)/i.test(value)) return value;

  /* Old local anchors that are now dedicated pages. */
  if(value==='#brands'||value==='/#brands') return '/brands';
  if(value==='#products'){
    return path()==='/' ? '#products' : '/#products';
  }

  /* Leave true external destinations untouched. */
  if(/^(?:https?:)?\/\//i.test(value)&&!sameOrigin(value)) return value;

  var u;
  try{u=new URL(value,location.href)}catch(e){return value}
  if(u.origin!==location.origin) return value;

  var p=(u.pathname||'/').replace(/\/+$/,'')||'/';
  var h=u.hash||'';
  var q=u.searchParams;

  /* Deleted / renamed pages. */
  if(p==='/partneram'){
    var pt=partnerType(q.get('type'));
    return '/okompanii'+(pt?'?type='+encodeURIComponent(pt):'')+'#cooperation';
  }
  if(p==='/proizvodstvo'||p==='/production'){
    return '/okompanii#production-quality';
  }
  if(p==='/vacancies'){
    return '/careers';
  }
  if(p==='/brends'){
    return '/brands';
  }

  /* Old nested brand URLs. */
  var oldBrands={
    '/brands/perfect':'/perfect',
    '/brands/washexpert':'/washexpert',
    '/brands/wash-expert':'/washexpert',
    '/brands/maxipower':'/maxipower',
    '/brands/maxi-power':'/maxipower',
    '/brands/prachka':'/prachka',
    '/brands/antibak':'/antibak'
  };
  if(oldBrands[p]) return oldBrands[p];

  /* Canonical company query aliases. */
  if(p==='/okompanii'&&h==='#cooperation'){
    var t=partnerType(q.get('type'));
    if(t) return '/okompanii?type='+encodeURIComponent(t)+'#cooperation';
    return '/okompanii#cooperation';
  }

  if(p==='/'&&h==='#brands') return '/brands';
  if(p!=='/'&&h==='#products') return '/#products';

  return value;
}

function patchLinks(root){
  root=root||document;
  if(!root.querySelectorAll) return;
  root.querySelectorAll('a[href]').forEach(function(a){
    var before=a.getAttribute('href')||'';
    var after=normalizeHref(before);
    if(after&&after!==before){
      a.setAttribute('href',after);
      a.setAttribute('data-aromika-route-fixed','1');
    }
    var href=a.getAttribute('href')||'';
    if(/^(?:https?:)?\/\//i.test(href)){
      try{
        var u=new URL(href,location.href);
        if(u.origin!==location.origin&&a.target==='_blank'){
          var rel=(a.getAttribute('rel')||'').split(/\s+/).filter(Boolean);
          if(rel.indexOf('noopener')<0) rel.push('noopener');
          if(rel.indexOf('noreferrer')<0) rel.push('noreferrer');
          a.setAttribute('rel',rel.join(' '));
        }
      }catch(e){}
    }
  });
}

function removeLegacyShell(){
  /* Remove only the duplicated navigation shell, never page body content. */
  document.querySelectorAll('#aromika-hero .ar-header').forEach(function(el){el.remove()});
  document.querySelectorAll('#aromika-hero .ar-overlay, #aromika-hero .ar-menu').forEach(function(el){el.remove()});
  document.querySelectorAll('#aromika-footer').forEach(function(el){el.remove()});
}

function headerHTML(){
  return ''+
  '<header id="aromika-global-header" aria-label="Aromika">'+
    '<div class="ags-wrap ags-row">'+
      '<a class="ags-logo" href="/" aria-label="Aromika">'+
        '<img src="https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/logo.webp" alt="Aromika">'+
      '</a>'+
      '<nav class="ags-nav" aria-label="Главное меню">'+
        '<a data-ags-nav="products" data-ags-i18n="products" href="/#products">Продукция</a>'+
        '<a data-ags-nav="brands" data-ags-i18n="brands" href="/brands">Бренды</a>'+
        '<a data-ags-nav="promos" data-ags-i18n="promos" href="/akcii">Акции</a>'+
        '<a data-ags-nav="about" data-ags-i18n="about" href="/okompanii">О компании</a>'+
        '<a data-ags-nav="partners" data-ags-i18n="partners" href="/okompanii#cooperation">Партнёрам</a>'+
        '<a data-ags-nav="careers" data-ags-i18n="careers" href="/careers">Работа в компании</a>'+
        '<a data-ags-nav="contacts" data-ags-i18n="contacts" href="/kontakty">Контакты</a>'+
      '</nav>'+
      '<div class="ags-lang" aria-label="Language">'+
        '<button type="button" data-lang="ru">RU</button><i></i>'+
        '<button type="button" data-lang="kk">ҚАЗ</button>'+
      '</div>'+
      '<button class="ags-theme" type="button" aria-label="Тема">'+
        '<svg viewBox="0 0 24 24" aria-hidden="true">'+
          '<circle cx="12" cy="12" r="4"></circle>'+
          '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>'+
        '</svg>'+
      '</button>'+
      '<a class="ags-shop" data-ags-i18n="buy" href="https://aromika.shop/" target="_blank" rel="noopener noreferrer">Купить онлайн</a>'+
      '<button class="ags-burger" type="button" aria-expanded="false" aria-label="Открыть меню"><span></span><span></span></button>'+
    '</div>'+
    '<div class="ags-overlay"></div>'+
    '<aside class="ags-drawer" aria-label="Мобильное меню">'+
      '<nav>'+
        '<a data-ags-nav="products" data-ags-i18n="products" href="/#products">Продукция</a>'+
        '<a data-ags-nav="brands" data-ags-i18n="brands" href="/brands">Бренды</a>'+
        '<a data-ags-nav="promos" data-ags-i18n="promos" href="/akcii">Акции</a>'+
        '<a data-ags-nav="about" data-ags-i18n="about" href="/okompanii">О компании</a>'+
        '<a data-ags-nav="partners" data-ags-i18n="partners" href="/okompanii#cooperation">Партнёрам</a>'+
        '<a data-ags-nav="careers" data-ags-i18n="careers" href="/careers">Работа в компании</a>'+
        '<a data-ags-nav="contacts" data-ags-i18n="contacts" href="/kontakty">Контакты</a>'+
      '</nav>'+
      '<div class="ags-mobile-lang" aria-label="Language">'+
        '<button type="button" data-lang="ru">RU</button>'+
        '<button type="button" data-lang="kk">ҚАЗ</button>'+
      '</div>'+
      '<a class="ags-mobile-shop" data-ags-i18n="buy" href="https://aromika.shop/" target="_blank" rel="noopener noreferrer">Купить онлайн</a>'+
    '</aside>'+
  '</header>';
}

function footerHTML(){
  return ''+
  '<footer id="aromika-global-footer">'+
    '<div class="agsf-wrap">'+
      '<div class="agsf-top">'+
        '<div class="agsf-brand">'+
          '<a href="/" aria-label="Aromika"><img class="agsf-logo" src="https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/logo.webp" alt="Aromika"></a>'+
          '<p data-ags-i18n="brandText">Казахстанский производитель бытовой химии и косметической продукции.</p>'+
          '<a class="agsf-shop" data-ags-i18n="shop" href="https://aromika.shop/" target="_blank" rel="noopener noreferrer">Интернет-магазин <span>→</span></a>'+
        '</div>'+
        '<nav class="agsf-col" aria-label="Компания">'+
          '<div class="agsf-title" data-ags-i18n="company">Компания</div>'+
          '<a data-ags-i18n="about" href="/okompanii">О компании</a>'+
          '<a data-ags-i18n="production" href="/okompanii#production-quality">Производство и качество</a>'+
          '<a data-ags-i18n="careers" href="/careers">Работа в компании</a>'+
          '<a data-ags-i18n="contacts" href="/kontakty">Контакты</a>'+
        '</nav>'+
        '<nav class="agsf-col" aria-label="Бренды">'+
          '<div class="agsf-title" data-ags-i18n="brands">Бренды</div>'+
          '<a data-ags-i18n="allBrands" href="/brands">Все бренды</a>'+
          '<a href="/perfect">Perfect</a>'+
          '<a href="/washexpert">Wash Expert</a>'+
          '<a href="/maxipower">Maxi Power</a>'+
          '<a href="/prachka">Prachka</a>'+
          '<a href="/antibak">Antibak</a>'+
        '</nav>'+
        '<nav class="agsf-col" aria-label="Партнёрам">'+
          '<div class="agsf-title" data-ags-i18n="partnerHead">Партнёрам</div>'+
          '<a data-ags-i18n="cooperation" href="/okompanii#cooperation">Сотрудничество</a>'+
          '<a data-ags-i18n="retail" href="/okompanii?type=retail#cooperation">Торговым сетям</a>'+
          '<a data-ags-i18n="horeca" href="/okompanii?type=horeca#cooperation">HoReCa / корпоративным клиентам</a>'+
          '<a data-ags-i18n="distribution" href="/okompanii?type=distributor#cooperation">Дистрибуция</a>'+
        '</nav>'+
        '<nav class="agsf-col" aria-label="Покупателям">'+
          '<div class="agsf-title" data-ags-i18n="buyers">Покупателям</div>'+
          '<a data-ags-i18n="promos" href="/akcii">Акции</a>'+
          '<a data-ags-i18n="catalog" href="https://aromika.shop/vse-tovary/" target="_blank" rel="noopener noreferrer">Каталог</a>'+
          '<a data-ags-i18n="shop" href="https://aromika.shop/" target="_blank" rel="noopener noreferrer">Интернет-магазин</a>'+
          '<a href="https://kaspi.kz/shop/info/merchant/1359004/address-tab/" target="_blank" rel="noopener noreferrer">Kaspi Магазин</a>'+
          '<a data-ags-i18n="where" href="https://aromika.shop/index.php?dispatch=store_locator.search" target="_blank" rel="noopener noreferrer">Где купить</a>'+
        '</nav>'+
      '</div>'+
      '<div class="agsf-contact">'+
        '<div class="agsf-contact-item"><small data-ags-i18n="office">Головной офис</small><b data-ags-i18n="city">Костанай, Казахстан</b></div>'+
        '<a class="agsf-contact-item" href="tel:+77142524044"><small data-ags-i18n="phone">Телефон</small><b>+7 (7142) 52-40-44</b></a>'+
        '<a class="agsf-contact-item" href="mailto:info@aromika.info"><small>E-mail</small><b>info@aromika.info</b></a>'+
        '<div class="agsf-lang" aria-label="Language"><button type="button" data-lang="ru">RU</button><i></i><button type="button" data-lang="kk">ҚАЗ</button></div>'+
      '</div>'+
      '<div class="agsf-bottom">'+
        '<span>© 2026 Aromika</span>'+
        '<div class="agsf-legal">'+
          '<a data-ags-i18n="about" href="/okompanii">О компании</a>'+
          '<a data-ags-i18n="feedback" href="/kontakty">Обратная связь</a>'+
        '</div>'+
        '<button class="agsf-top-btn" type="button"><span data-ags-i18n="top">Наверх</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"></path></svg></button>'+
      '</div>'+
    '</div>'+
  '</footer>';
}

function mount(){
  removeLegacyShell();

  if(!document.getElementById('aromika-global-header')){
    var h=document.createElement('div');
    h.innerHTML=headerHTML();
    var header=h.firstElementChild;
    var records=document.getElementById('allrecords');
    if(records&&records.parentNode) records.parentNode.insertBefore(header,records);
    else document.body.insertBefore(header,document.body.firstChild);
  }

  if(!document.getElementById('aromika-global-footer')){
    var f=document.createElement('div');
    f.innerHTML=footerHTML();
    var footer=f.firstElementChild;
    var records2=document.getElementById('allrecords');
    if(records2&&records2.parentNode) records2.parentNode.insertBefore(footer,records2.nextSibling);
    else document.body.appendChild(footer);
  }

  patchLinks(document);
  applyLanguage(currentLang(),false,false);
  applyTheme(currentTheme(),false);
  markActive();
  bind();
}

function emitLanguage(lang){
  try{window.dispatchEvent(new CustomEvent('aromika:languagechange',{detail:{lang:lang}}))}catch(e){}
  try{document.dispatchEvent(new CustomEvent('aromika:languagechange',{detail:{lang:lang}}))}catch(e){}
  try{window.dispatchEvent(new StorageEvent('storage',{key:LANG_KEY,newValue:lang}))}catch(e){}
}

function applyLanguage(lang,save,emit){
  lang=(lang==='kk'||lang==='kz')?'kk':'ru';
  if(save!==false){try{localStorage.setItem(LANG_KEY,lang)}catch(e){}}
  document.documentElement.lang=lang==='kk'?'kk':'ru';

  var d=TEXT[lang];
  document.querySelectorAll('[data-ags-i18n]').forEach(function(el){
    var k=el.getAttribute('data-ags-i18n');
    if(Object.prototype.hasOwnProperty.call(d,k)) el.textContent=d[k];
  });

  document.querySelectorAll('#aromika-global-header [data-lang],#aromika-global-footer [data-lang]').forEach(function(btn){
    var on=btn.getAttribute('data-lang')===lang;
    btn.classList.toggle('is-active',on);
    btn.setAttribute('aria-pressed',on?'true':'false');
  });

  updateThemeLabel();
  if(emit!==false) emitLanguage(lang);
}

function applyTheme(theme,save){
  theme=theme==='dark'?'dark':'light';
  if(save!==false){try{localStorage.setItem(THEME_KEY,theme)}catch(e){}}
  document.documentElement.setAttribute('data-aromika-theme',theme);
  document.documentElement.style.colorScheme=theme;

  var meta=document.querySelector('meta[name="theme-color"][data-aromika-global]');
  if(!meta){
    meta=document.createElement('meta');
    meta.name='theme-color';
    meta.setAttribute('data-aromika-global','1');
    document.head.appendChild(meta);
  }
  meta.content=theme==='dark'?'#0d0e11':'#ffffff';
  updateThemeLabel();
}

function updateThemeLabel(){
  var btn=document.querySelector('#aromika-global-header .ags-theme');
  if(!btn) return;
  var lang=currentLang();
  var theme=currentTheme();
  var label=theme==='dark'?TEXT[lang].themeLight:TEXT[lang].themeDark;
  btn.setAttribute('aria-label',label);
  btn.setAttribute('title',label);
  btn.setAttribute('aria-pressed',theme==='dark'?'true':'false');
}

function markActive(){
  var p=path(),h=location.hash||'';
  var key='';
  if(p==='/brands'||['/perfect','/washexpert','/maxipower','/prachka','/antibak'].indexOf(p)>=0) key='brands';
  else if(p==='/akcii') key='promos';
  else if(p==='/careers') key='careers';
  else if(p==='/kontakty') key='contacts';
  else if(p==='/okompanii'&&h==='#cooperation') key='partners';
  else if(p==='/okompanii') key='about';
  else if(p==='/'&&h==='#products') key='products';

  document.querySelectorAll('#aromika-global-header [data-ags-nav]').forEach(function(a){
    a.classList.toggle('is-active',a.getAttribute('data-ags-nav')===key);
  });
}

function closeMenu(){
  var header=document.getElementById('aromika-global-header');
  if(!header) return;
  var b=header.querySelector('.ags-burger');
  var d=header.querySelector('.ags-drawer');
  var o=header.querySelector('.ags-overlay');
  if(b){b.classList.remove('is-open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',TEXT[currentLang()].menu)}
  if(d)d.classList.remove('is-open');
  if(o)o.classList.remove('is-open');
  document.body.classList.remove('ags-lock');
}

function toggleMenu(){
  var header=document.getElementById('aromika-global-header');
  if(!header) return;
  var b=header.querySelector('.ags-burger');
  var d=header.querySelector('.ags-drawer');
  var o=header.querySelector('.ags-overlay');
  var open=!(d&&d.classList.contains('is-open'));
  if(b){b.classList.toggle('is-open',open);b.setAttribute('aria-expanded',open?'true':'false');b.setAttribute('aria-label',open?TEXT[currentLang()].closeMenu:TEXT[currentLang()].menu)}
  if(d)d.classList.toggle('is-open',open);
  if(o)o.classList.toggle('is-open',open);
  document.body.classList.toggle('ags-lock',open);
}

var bound=false;
function bind(){
  if(bound) return;
  bound=true;

  document.addEventListener('click',function(e){
    var langBtn=e.target.closest('#aromika-global-header [data-lang],#aromika-global-footer [data-lang]');
    if(langBtn){
      applyLanguage(langBtn.getAttribute('data-lang'),true,true);
      return;
    }

    var burger=e.target.closest('#aromika-global-header .ags-burger');
    if(burger){toggleMenu();return}

    if(e.target.closest('#aromika-global-header .ags-overlay')){
      closeMenu();return;
    }

    if(e.target.closest('#aromika-global-header .ags-drawer a')){
      closeMenu();
    }

    if(e.target.closest('#aromika-global-header .ags-theme')){
      applyTheme(currentTheme()==='dark'?'light':'dark',true);
      return;
    }

    if(e.target.closest('#aromika-global-footer .agsf-top-btn')){
      window.scrollTo({top:0,behavior:'smooth'});
    }
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') closeMenu();
  });

  window.addEventListener('resize',function(){
    if(window.innerWidth>980) closeMenu();
  },{passive:true});

  window.addEventListener('hashchange',markActive);

  window.addEventListener('storage',function(e){
    if(e.key===LANG_KEY) applyLanguage(currentLang(),false,false);
    if(e.key===THEME_KEY) applyTheme(currentTheme(),false);
  });

  /* Listen to page modules without creating an event loop. */
  window.addEventListener('aromika:languagechange',function(e){
    var l=e.detail&&e.detail.lang;
    if(l==='ru'||l==='kk') applyLanguage(l,false,false);
  });
  document.addEventListener('aromika:languagechange',function(e){
    var l=e.detail&&e.detail.lang;
    if(l==='ru'||l==='kk') applyLanguage(l,false,false);
  });
}

function watch(){
  if(!('MutationObserver' in window)) return;
  var scheduled=false;
  var observer=new MutationObserver(function(){
    if(scheduled) return;
    scheduled=true;
    requestAnimationFrame(function(){
      scheduled=false;
      removeLegacyShell();
      patchLinks(document);
    });
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});
}

function start(){
  /* Let existing page-specific runtime initialise first; only replace its shell. */
  setTimeout(function(){
    mount();
    watch();
    document.documentElement.classList.add('aromika-global-shell-ready');
  },60);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',start,{once:true});
}else{
  start();
}
})();
