(function(){
'use strict';
if(window.__AROMIKA_COMMON_NAV_FINAL_V2__) return;
window.__AROMIKA_COMMON_NAV_FINAL_V2__=true;
window.__AROMIKA_COMMON_NAV_FINAL_V1__=true;

var SHOP='https://aromika.shop/';
var CATALOG='https://aromika.shop/vse-tovary/';
var KASPI='https://kaspi.kz/shop/info/merchant/1359004/address-tab/';
var LOCATOR='https://aromika.shop/index.php?dispatch=store_locator.search';

var TEXT={
  ru:{
    products:'Продукция',brands:'Бренды',promos:'Акции',about:'Сотрудничество',
    partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',
    buy:'Купить онлайн',shop:'Интернет-магазин',
    company:'Компания',production:'Производство',allBrands:'Все бренды',
    distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',
    buyers:'Покупателям',catalog:'Каталог',where:'Где купить',
    brandText:'Казахстанский производитель бытовой химии и косметической продукции.',
    office:'Головной офис',city:'Костанай, Казахстан',phone:'Телефон',
    feedback:'Обратная связь',top:'Наверх'
  },
  kk:{
    products:'Өнімдер',brands:'Брендтер',promos:'Акциялар',about:'Ынтымақтастық',
    partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыстар',
    buy:'Онлайн сатып алу',shop:'Интернет-дүкен',
    company:'Компания',production:'Өндіріс',allBrands:'Барлық брендтер',
    distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',
    buyers:'Сатып алушыларға',catalog:'Каталог',where:'Қайдан сатып алуға болады',
    brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',
    office:'Бас кеңсе',city:'Қостанай, Қазақстан',phone:'Телефон',
    feedback:'Кері байланыс',top:'Жоғары'
  }
};

function path(){
  var p=(location.pathname||'/').replace(/\/+$/,'');
  return p||'/';
}
function lang(){
  var s='';
  try{s=localStorage.getItem('aromika-language')||''}catch(e){}
  if(s==='kk') return 'kk';
  var active=document.querySelector('.ar-lang [data-lang].is-active,.ar-menu-lang [data-lang].is-active,.arf-lang [data-lang].is-active');
  if(active && active.getAttribute('data-lang')==='kk') return 'kk';
  return 'ru';
}
function t(){return TEXT[lang()]||TEXT.ru}

function activeKey(){
  var p=path(), h=location.hash||'';
  if(p==='/brands'||['/perfect','/washexpert','/maxipower','/prachka','/antibak'].indexOf(p)>=0) return 'brands';
  if(p==='/akcii') return 'promos';
  if(p==='/okompanii'&&h==='#cooperation'){
    try{return new URLSearchParams(location.search).has('type')?'partners':'about'}catch(e){return'about'}
  }
  if(p==='/okompanii') return 'about';
  if(p==='/careers') return 'careers';
  if(p==='/kontakty') return 'contacts';
  return '';
}

function link(href,key,label,extra){
  var cls=activeKey()===key?' class="is-active"':'';
  return '<a href="'+href+'" data-ar-common="'+key+'"'+cls+(extra||'')+'>'+label+'</a>';
}

function headerHTML(){
  var x=t();
  return [
    link('/#products','products',x.products),
    link('/brands','brands',x.brands),
    link('/akcii','promos',x.promos),
    link('/okompanii#cooperation','about',x.about),
    link('/okompanii#cooperation','partners',x.partners),
    link('/careers','careers',x.careers),
    link('/kontakty','contacts',x.contacts)
  ].join('');
}

function patchHeader(){
  document.querySelectorAll('#aromika-hero .ar-nav').forEach(function(n){
    n.innerHTML=headerHTML();
  });
  document.querySelectorAll('#aromika-hero .ar-menu nav').forEach(function(n){
    n.innerHTML=headerHTML();
  });
  document.querySelectorAll('#aromika-hero .ar-shop').forEach(function(a){
    a.href=SHOP;a.target='_blank';a.rel='noopener noreferrer';
    var s=a.querySelector('span'); if(s)s.textContent=t().buy;
  });
  document.querySelectorAll('#aromika-hero .ar-menu-shop').forEach(function(a){
    a.href=SHOP;a.target='_blank';a.rel='noopener noreferrer';
    var s=a.querySelector('span'); if(s)s.textContent=t().shop;
  });
}

function footerCol(title,links){
  return '<nav class="arf-col"><div class="arf-col-title">'+title+'</div>'+
    links.map(function(v){
      var target=v[2]?' target="_blank" rel="noopener noreferrer"':'';
      return '<a href="'+v[0]+'"'+target+'>'+v[1]+'</a>';
    }).join('')+'</nav>';
}

function patchFooter(){
  var f=document.querySelector('#aromika-footer');
  if(!f) return;
  var x=t(), top=f.querySelector('.arf-top');
  if(top){
    var brand=top.querySelector('.arf-brand');
    if(brand){
      var p=brand.querySelector('p'); if(p)p.textContent=x.brandText;
      var b=brand.querySelector('.arf-shop-btn');
      if(b){b.href=SHOP;b.target='_blank';b.rel='noopener noreferrer';var s=b.querySelector('span');if(s)s.textContent=x.shop;}
    }
    top.querySelectorAll(':scope > nav.arf-col').forEach(function(n){n.remove()});
    top.insertAdjacentHTML('beforeend',
      footerCol(x.company,[
        ['/okompanii#cooperation',x.about],
        ['/okompanii#production-quality',x.production],
        ['/careers',x.careers],
        ['/kontakty',x.contacts]
      ])+
      footerCol(x.brands,[
        ['/brands',x.allBrands],
        ['/perfect','Perfect'],
        ['/washexpert','Wash Expert'],
        ['/maxipower','Maxi Power'],
        ['/prachka','Prachka'],
        ['/antibak','Antibak']
      ])+
      footerCol(x.partners,[
        ['/okompanii?type=distributor#cooperation',x.distributors],
        ['/okompanii?type=retail#cooperation',x.retail],
        ['/okompanii?type=horeca#cooperation','HoReCa'],
        ['/okompanii?type=horeca#cooperation',x.corporate]
      ])+
      footerCol(x.buyers,[
        ['/akcii',x.promos],
        [CATALOG,x.catalog,true],
        [SHOP,x.shop,true],
        [KASPI,'Kaspi Магазин',true],
        [LOCATOR,x.where,true]
      ])
    );
  }

  var strip=f.querySelector('.arf-contact-strip');
  if(strip){
    var items=strip.querySelectorAll('.arf-contact');
    if(items[0]){
      var sm=items[0].querySelector('small'), b=items[0].querySelector('b');
      if(sm)sm.textContent=x.office;if(b)b.textContent=x.city;
    }
    if(items[1]){
      var sm2=items[1].querySelector('small');if(sm2)sm2.textContent=x.phone;
    }
  }

  var legal=f.querySelector('.arf-legal');
  if(legal){
    legal.innerHTML='<a href="/okompanii#cooperation">'+x.about+'</a><a href="/kontakty">'+x.feedback+'</a>';
  }
  var topLink=f.querySelector('.arf-to-top span'); if(topLink)topLink.textContent=x.top;
}

function canonicalHref(raw){
  if(raw==null)return raw;
  var v=String(raw).trim();
  if(!v)return v;
  if(/^(mailto:|tel:|sms:|javascript:|data:)/i.test(v))return v;

  if(v==='#products')return path()==='/'?'#products':'/#products';
  if(v==='#brands'||v==='/#brands')return'/brands';

  var rel={
    'brands':'/brands','brends':'/brands','okompanii':'/okompanii',
    'partneram':'/okompanii#cooperation','vacancies':'/careers','careers':'/careers',
    'kontakty':'/kontakty','proizvodstvo':'/okompanii#production-quality','production':'/okompanii#production-quality',
    'perfect':'/perfect','washexpert':'/washexpert','maxipower':'/maxipower','prachka':'/prachka','antibak':'/antibak'
  };
  if(rel[v])return rel[v];

  var u;try{u=new URL(v,location.href)}catch(e){return v}
  if(u.origin!==location.origin)return v;
  var p=(u.pathname||'/').replace(/\/+$/,'')||'/';
  if(p==='/vacancies')return'/careers';
  if(p==='/brends')return'/brands';
  if(p==='/proizvodstvo'||p==='/production')return'/okompanii#production-quality';
  if(p==='/partneram'){
    var type=(u.searchParams.get('type')||'').toLowerCase();
    if(type==='corporate'||type==='pro')type='horeca';
    if(type==='distribution')type='distributor';
    if(type!=='retail'&&type!=='horeca'&&type!=='distributor')type='';
    return'/okompanii'+(type?'?type='+type:'')+'#cooperation';
  }
  var old={
    '/brands/perfect':'/perfect','/brands/washexpert':'/washexpert','/brands/wash-expert':'/washexpert',
    '/brands/maxipower':'/maxipower','/brands/maxi-power':'/maxipower','/brands/prachka':'/prachka','/brands/antibak':'/antibak'
  };
  if(old[p])return old[p];
  return v;
}

function patchRoutes(){
  document.querySelectorAll('a[href]').forEach(function(a){
    var old=a.getAttribute('href')||'', next=canonicalHref(old);
    if(next&&next!==old)a.setAttribute('href',next);
    if(a.target==='_blank'){
      var href=a.getAttribute('href')||'';
      try{
        if(new URL(href,location.href).origin!==location.origin)a.rel='noopener noreferrer';
      }catch(e){}
    }
  });
}

function ensureCompany(){
  if(path()!=='/okompanii')return;
  if(!document.getElementById('production-quality')){
    var first=document.querySelector('#company-coop-page .cc-system article:first-child');
    if(first)first.id='production-quality';
  }
  if(location.hash==='#cooperation'){
    var q=new URLSearchParams(location.search), type=(q.get('type')||'').toLowerCase();
    if(type==='corporate')type='horeca';
    var route=type==='retail'?'supply':type==='horeca'?'pro':type==='distributor'?'distribution':'';
    if(route){
      [0,100,300,700].forEach(function(ms){
        setTimeout(function(){
          var b=document.querySelector('#company-coop-page .cc-route[data-route="'+route+'"]');
          if(b&&!b.classList.contains('is-active'))b.click();
        },ms);
      });
    }
  }
  if(location.hash==='#production-quality'){
    setTimeout(function(){
      var el=document.getElementById('production-quality');
      if(el)el.scrollIntoView({block:'start'});
    },150);
  }
}

function apply(){
  patchRoutes();
  patchHeader();
  patchFooter();
  ensureCompany();
}

function bindLang(){
  document.addEventListener('click',function(e){
    var b=e.target&&e.target.closest?e.target.closest('[data-lang]'):null;
    if(!b)return;
    var l=b.getAttribute('data-lang');
    if(l==='ru'||l==='kk'){
      try{localStorage.setItem('aromika-language',l)}catch(err){}
      setTimeout(apply,30);
      setTimeout(apply,180);
    }
  },true);
  window.addEventListener('storage',function(e){
    if(e.key==='aromika-language')setTimeout(apply,0);
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();bindLang()},{once:true});
else{apply();bindLang()}

if('MutationObserver'in window){
  var pending=false;
  new MutationObserver(function(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(function(){pending=false;patchRoutes()});
  }).observe(document.documentElement,{childList:true,subtree:true});
}
})();
