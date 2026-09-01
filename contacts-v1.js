(function(){
 function initHeaderOnly(){
  var root=document.getElementById('aromika-hero');
  if(!root||root.dataset.headerOnlyReady==='1')return;
  root.dataset.headerOnlyReady='1';
  var tr={
   ru:{products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин'},
   kk:{products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен'}
  };
  function setLanguage(lang){
   if(!tr[lang])lang='ru';
   root.classList.toggle('lang-kk',lang==='kk');
   root.setAttribute('lang',lang==='kk'?'kk':'ru');
   root.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(tr[lang][k]!==undefined)el.textContent=tr[lang][k]});
   root.querySelectorAll('[data-lang]').forEach(function(btn){btn.classList.toggle('is-active',btn.getAttribute('data-lang')===lang)});
   try{localStorage.setItem('aromika-language',lang)}catch(e){}
   try{window.dispatchEvent(new CustomEvent('aromika:languagechange',{detail:{lang:lang}}))}catch(e){}
  }
  var saved='ru';try{saved=localStorage.getItem('aromika-language')||'ru'}catch(e){}setLanguage(saved);
  root.querySelectorAll('[data-lang]').forEach(function(btn){btn.addEventListener('click',function(){setLanguage(this.getAttribute('data-lang'))})});
  var burger=root.querySelector('.ar-burger'),menu=root.querySelector('.ar-menu'),overlay=root.querySelector('.ar-overlay');
  function toggle(open){if(burger)burger.classList.toggle('open',open);if(menu)menu.classList.toggle('open',open);if(overlay)overlay.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''}
  if(burger)burger.addEventListener('click',function(e){e.preventDefault();toggle(!(menu&&menu.classList.contains('open')))});
  if(overlay)overlay.addEventListener('click',function(){toggle(false)});
  if(menu)menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
  window.addEventListener('resize',function(){if(window.innerWidth>980)toggle(false)},{passive:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initHeaderOnly);else initHeaderOnly();
 setTimeout(initHeaderOnly,500);
})();

(function(){
 function initArg(){
  var root=document.getElementById('geography');
  if(!root||root.dataset.argReady==='1')return;
  root.dataset.argReady='1';

  var branches=[{"id":"kostanay","ru":"Костанай","kk":"Қостанай","address_ru":"Северная промзона, 184","address_kk":"Солтүстік өнеркәсіп аймағы, 184","email":"info@aromika.info","phone":"+7 (7142) 52-40-44","lat":53.2144,"lon":63.6246,"hq":true,"x":389.2,"y":112.9},{"id":"rudny","ru":"Рудный","kk":"Рудный","address_ru":"ул. 50 лет Октября, 24","address_kk":"50 лет Октября көшесі, 24","email":"west-2002@mail.ru","phone":"+7 701 720-78-13","lat":52.9729,"lon":63.1168,"x":379.8,"y":119.0},{"id":"shymkent","ru":"Шымкент","kk":"Шымкент","address_ru":"ул. Толе би, 43Б","address_kk":"Төле би көшесі, 43Б","email":"shymkent_dir@aromika.info","phone":"+7 705 198-76-68","lat":42.3417,"lon":69.5901,"x":499.5,"y":387.6},{"id":"aktau","ru":"Актау","kk":"Ақтау","address_ru":"3 мкр., 157Д, база «Араз»","address_kk":"3 шағынаудан, 157Д, «Араз» базасы","email":"aktau_sv2@aromika.info","phone":"+7 707 330-58-60","lat":43.6532,"lon":51.1975,"x":159.5,"y":354.4},{"id":"zhezkazgan","ru":"Жезказган","kk":"Жезқазған","address_ru":"ул. Асылбекова, 95","address_kk":"Асылбеков көшесі, 95","email":"zheskazgan_dir@aromika.info","phone":"+7 777 394-29-65","lat":47.7964,"lon":67.702,"x":464.6,"y":249.7},{"id":"aktobe","ru":"Актобе","kk":"Ақтөбе","address_ru":"ул. Черепанова, 1Г","address_kk":"Черепанов көшесі, 1Г","email":"aktobe_dir@aromika.info","phone":"+7 705 820-11-86","lat":50.2839,"lon":57.1669,"x":269.8,"y":186.9},{"id":"astana","ru":"Астана","kk":"Астана","address_ru":"шоссе Караганда — Астана, 3/6","address_kk":"Қарағанды — Астана тасжолы, 3/6","email":"aromika_astana@mail.ru","phone":"+7 701 527-03-61","lat":51.1694,"lon":71.4491,"x":533.9,"y":164.5},{"id":"semey","ru":"Семей","kk":"Семей","address_ru":"ул. Красный Пильщик, 34","address_kk":"Красный Пильщик көшесі, 34","email":"semej@aromika.info","phone":"+7 747 829-10-54","lat":50.4111,"lon":80.2275,"x":696.1,"y":183.7},{"id":"oskemen","ru":"Усть-Каменогорск","kk":"Өскемен","address_ru":"ул. Абая, 189","address_kk":"Абай көшесі, 189","email":"ust_kamenogorsk@aromika.info","phone":"+7 705 150-85-26","lat":49.9483,"lon":82.6275,"x":740.5,"y":195.4},{"id":"kokshetau","ru":"Кокшетау","kk":"Көкшетау","address_ru":"Северная промзона, 5У","address_kk":"Солтүстік өнеркәсіп аймағы, 5У","email":"kokchetav@aromika.info","phone":"+7 705 658-37-85","lat":53.2833,"lon":69.3833,"x":495.7,"y":111.1},{"id":"atyrau","ru":"Атырау","kk":"Атырау","address_ru":"ул. Канцева, 2А","address_kk":"Канцев көшесі, 2А","email":"atyrau_dir@aromika.info","phone":"+7 701 901-33-34","lat":47.0945,"lon":51.9238,"x":172.9,"y":267.5},{"id":"almaty","ru":"Алматы","kk":"Алматы","address_ru":"ул. Бурундайская, 93В","address_kk":"Бурундайская көшесі, 93В","email":"aromika-almaty@mail.ru","phone":"+7 747 318-17-05","lat":43.2389,"lon":76.8897,"x":634.4,"y":364.9},{"id":"karaganda","ru":"Караганда","kk":"Қарағанды","address_ru":"ул. Сакена Сейфуллина, 105А","address_kk":"Сәкен Сейфуллин көшесі, 105А","email":"aaromika@mail.ru","phone":"+7 747 325-83-32","lat":49.8064,"lon":73.0855,"x":564.1,"y":199.0},{"id":"taldykorgan","ru":"Талдыкорган","kk":"Талдықорған","address_ru":"ул. Ракишева, 6, офис 2Б","address_kk":"Рақышев көшесі, 6, 2Б кеңсе","email":"Taldykorgan_dir@aromika.info","phone":"+7 777 022-32-89","lat":45.0156,"lon":78.3739,"x":661.9,"y":320.0},{"id":"pavlodar","ru":"Павлодар","kk":"Павлодар","address_ru":"ул. Карла Маркса, 328","address_kk":"Карл Маркс көшесі, 328","email":"aromikapvl@mail.ru","phone":"+7 705 198-76-68","lat":52.2873,"lon":76.9674,"x":635.9,"y":136.3},{"id":"zhitikara","ru":"Житикара","kk":"Жітіқара","address_ru":"11 мкр., строение 55","address_kk":"11 шағынаудан, 55 ғимарат","email":"now_west@mail.ru","phone":"+7 777 524-00-20","lat":52.1908,"lon":61.2006,"x":344.4,"y":138.7},{"id":"taraz","ru":"Тараз","kk":"Тараз","address_ru":"ул. Исатая, 1Т","address_kk":"Исатай көшесі, 1Т","email":"bakenova.anyuta@mail.ru","phone":"+7 747 469-80-85","lat":42.9,"lon":71.3667,"x":532.3,"y":373.5},{"id":"uralsk","ru":"Уральск","kk":"Орал","address_ru":"ул. Жданова, 1","address_kk":"Жданов көшесі, 1","email":"uralsk_aromika@mail.ru","phone":"+7 747 081-25-32","lat":51.2278,"lon":51.3865,"x":163.0,"y":163.0},{"id":"petropavlovsk","ru":"Петропавловск","kk":"Петропавл","address_ru":"Омское шоссе, 1","address_kk":"Омбы тасжолы, 1","email":"petropavlovsk@aromika.info","phone":"+7 777 608-92-10","lat":54.8753,"lon":69.1628,"x":491.6,"y":70.9}];
  var regionMeta={
   kostanay:{pcode:'KZ39',ru:'Костанайская область',kk:'Қостанай облысы'},
   rudny:{pcode:'KZ39',ru:'Костанайская область',kk:'Қостанай облысы'},
   zhitikara:{pcode:'KZ39',ru:'Костанайская область',kk:'Қостанай облысы'},
   shymkent:{pcode:'KZ79',ru:'Шымкент',kk:'Шымкент'},
   aktau:{pcode:'KZ47',ru:'Мангистауская область',kk:'Маңғыстау облысы'},
   zhezkazgan:{pcode:'KZ62',ru:'Улытауская область',kk:'Ұлытау облысы'},
   aktobe:{pcode:'KZ15',ru:'Актюбинская область',kk:'Ақтөбе облысы'},
   astana:{pcode:'KZ71',ru:'Астана',kk:'Астана'},
   semey:{pcode:'KZ10',ru:'Абайская область',kk:'Абай облысы'},
   oskemen:{pcode:'KZ63',ru:'Восточно-Казахстанская область',kk:'Шығыс Қазақстан облысы'},
   kokshetau:{pcode:'KZ11',ru:'Акмолинская область',kk:'Ақмола облысы'},
   atyrau:{pcode:'KZ23',ru:'Атырауская область',kk:'Атырау облысы'},
   almaty:{pcode:'KZ75',ru:'Алматы',kk:'Алматы'},
   karaganda:{pcode:'KZ35',ru:'Карагандинская область',kk:'Қарағанды облысы'},
   taldykorgan:{pcode:'KZ33',ru:'Жетысуская область',kk:'Жетісу облысы'},
   pavlodar:{pcode:'KZ55',ru:'Павлодарская область',kk:'Павлодар облысы'},
   taraz:{pcode:'KZ31',ru:'Жамбылская область',kk:'Жамбыл облысы'},
   uralsk:{pcode:'KZ27',ru:'Западно-Казахстанская область',kk:'Батыс Қазақстан облысы'},
   petropavlovsk:{pcode:'KZ59',ru:'Северо-Казахстанская область',kk:'Солтүстік Қазақстан облысы'}
  };
  var regionData=null,regionPromise=null;
  function fetchRegionJson(url){
   return fetch(url,{mode:'cors',cache:'force-cache'})
    .then(function(r){if(!r.ok)throw new Error('regions '+r.status);return r.json()});
  }
  function loadRegions(){
   if(regionData)return Promise.resolve(regionData);
   if(regionPromise)return regionPromise;
   regionPromise=fetchRegionJson('https://cdn.jsdelivr.net/gh/galymorg/new_qazaqstan_GeoJSON@main/regions.json')
    .catch(function(){
     return fetchRegionJson('https://raw.githubusercontent.com/galymorg/new_qazaqstan_GeoJSON/refs/heads/main/regions.json');
    })
    .then(function(d){
     if(!Array.isArray(d))throw new Error('regions invalid');
     regionData=d;
     return d;
    })
    .catch(function(err){
     console.warn('Aromika region map data failed to load',err);
     regionPromise=null;
     return null;
    });
   return regionPromise;
  }
  var dict={
   ru:{kicker:'География Aromika',title1:'Мы рядом',title2:'по всему Казахстану',intro:'Выберите город на карте, чтобы посмотреть адрес и контакты филиала.',branch:'Филиал Aromika',route:'Построить маршрут',hq:'Головной город компании',mapCaption:'Филиалы в Казахстане',backMap:'Вся карта Казахстана',bottomText:'Нужны контакты другого подразделения?',allContacts:'Все контакты'},
   kk:{kicker:'Aromika географиясы',title1:'Біз сізге жақынбыз',title2:'Қазақстанның түкпір-түкпірінде',intro:'Филиалдың мекенжайы мен байланыстарын көру үшін картадан қаланы таңдаңыз.',branch:'Aromika филиалы',route:'Бағыт құру',hq:'Компанияның бас қаласы',mapCaption:'Қазақстандағы филиалдар',backMap:'Қазақстан картасы',bottomText:'Басқа бөлімшенің байланыстары керек пе?',allContacts:'Барлық байланыстар'}
  };

  var lang='ru',active=0;
  try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}

  var pointsGroup=root.querySelector('.arg-points');
  var strip=root.querySelector('.arg-city-strip');

  branches.forEach(function(b,i){
   var ns='http://www.w3.org/2000/svg';
   var g=document.createElementNS(ns,'g');
   g.setAttribute('class','arg-point');
   g.setAttribute('tabindex','0');
   g.setAttribute('transform','translate('+b.x+' '+b.y+')');
   g.dataset.index=i;

   var pulse=document.createElementNS(ns,'circle');
   pulse.setAttribute('class','arg-pulse');pulse.setAttribute('r','7');
   var dot=document.createElementNS(ns,'circle');
   dot.setAttribute('class','arg-dot');dot.setAttribute('r','6');
   var text=document.createElementNS(ns,'text');
   text.setAttribute('x','12');text.setAttribute('y','4');text.textContent=b.ru;

   g.appendChild(pulse);g.appendChild(dot);g.appendChild(text);
   pointsGroup.appendChild(g);

   var btn=document.createElement('button');
   btn.type='button';btn.className='arg-city-btn';btn.dataset.index=i;btn.textContent=b.ru;
   strip.appendChild(btn);

   g.addEventListener('click',function(){select(i,true);showRegion(i)});
   g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i,true);showRegion(i)}});
   btn.addEventListener('click',function(){select(i,true);showRegion(i);}); 
  });

  function cleanPhone(p){return p.replace(/[^+\d]/g,'')}

  
  function resetMap(){
   var wrap=root.querySelector('.arg-map-wrap');
   var layer=root.querySelector('.arg-region-layer');
   var country=root.querySelector('.arg-country');
   var points=root.querySelector('.arg-points');
   var source=root.querySelector('.arg-map-source');
   var title=root.querySelector('.arg-region-name');

   if(source)source.textContent='Контур: Natural Earth';
   if(title)title.textContent='';

   if(!wrap||!layer){
    if(layer){layer.innerHTML='';layer.setAttribute('aria-hidden','true')}
    return;
   }

   if(!wrap.classList.contains('is-region')){
    wrap.classList.remove('is-zooming');
    layer.innerHTML='';
    layer.setAttribute('aria-hidden','true');
    return;
   }

   wrap.classList.add('is-zooming');

   var zoomNode=layer.querySelector('.arg-region-zoom');
   if(zoomNode&&zoomNode.animate){
    zoomNode.animate(
      [{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.08)'}],
      {duration:360,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}
    );
   }

   if(country&&country.animate){
    country.animate(
      [{opacity:0,transform:'scale(1.06)'},{opacity:1,transform:'scale(1)'}],
      {duration:420,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}
    );
   }
   if(points&&points.animate){
    points.animate(
      [{opacity:0,transform:'scale(1.06)'},{opacity:1,transform:'scale(1)'}],
      {duration:420,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}
    );
   }

   setTimeout(function(){
    wrap.classList.remove('is-region');
    wrap.classList.remove('is-zooming');
    layer.innerHTML='';
    layer.setAttribute('aria-hidden','true');
   },320);
  }

  function showRegion(i){
   var b=branches[i],meta=regionMeta[b.id];
   if(!meta)return;
   loadRegions().then(function(data){
    if(!data)return;
    var r=data.find(function(x){return x.pcode===meta.pcode});
    if(!r)return;
    var ns='http://www.w3.org/2000/svg';
    var layer=root.querySelector('.arg-region-layer');
    var wrap=root.querySelector('.arg-map-wrap');
    var country=root.querySelector('.arg-country');
    var points=root.querySelector('.arg-points');
    if(!layer||!wrap)return;

    wrap.classList.add('is-zooming');
    layer.innerHTML='';

    var zoomGroup=document.createElementNS(ns,'g');
    zoomGroup.setAttribute('class','arg-region-zoom');

    var group=document.createElementNS(ns,'g');
    var path=document.createElementNS(ns,'path');
    path.setAttribute('class','arg-region-shape');
    path.setAttribute('d',r.path);
    group.appendChild(path);

    var pulse=document.createElementNS(ns,'circle');
    pulse.setAttribute('class','arg-region-pulse');
    pulse.setAttribute('cx',r.cx);pulse.setAttribute('cy',r.cy);

    var dot=document.createElementNS(ns,'circle');
    dot.setAttribute('class','arg-region-dot');
    dot.setAttribute('cx',r.cx);dot.setAttribute('cy',r.cy);

    var text=document.createElementNS(ns,'text');
    text.setAttribute('class','arg-region-label');
    text.setAttribute('x',r.cx);text.setAttribute('y',r.cy);
    text.textContent=lang==='kk'?b.kk:b.ru;

    group.appendChild(pulse);
    group.appendChild(dot);
    group.appendChild(text);
    zoomGroup.appendChild(group);
    layer.appendChild(zoomGroup);

    requestAnimationFrame(function(){
     try{
      var bb=path.getBBox(),padX=110,padY=80;
      var scale=Math.min((900-padX*2)/Math.max(1,bb.width),(500-padY*2)/Math.max(1,bb.height));
      /* no upper cap: republican cities must fill the frame just like regions */
      scale=Math.max(.9,scale);
      var tx=450-(bb.x+bb.width/2)*scale;
      var ty=250-(bb.y+bb.height/2)*scale;
      group.setAttribute('transform','translate('+tx+' '+ty+') scale('+scale+')');
      pulse.setAttribute('r',String(16/scale));
      dot.setAttribute('r',String(8/scale));
      dot.setAttribute('stroke-width',String(3/scale));
      text.setAttribute('x',String(r.cx+14/scale));
      text.setAttribute('font-size',String(11/scale));
      text.setAttribute('stroke-width','0');
     }catch(e){}

     layer.setAttribute('aria-hidden','false');
     wrap.classList.add('is-region');

     var title=root.querySelector('.arg-region-name');
     if(title)title.textContent=lang==='kk'?meta.kk:meta.ru;
     var source=root.querySelector('.arg-map-source');
     if(source)source.textContent='Границы областей: geokz / 2024';

     if(country&&country.animate){
      country.animate(
        [{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.09)'}],
        {duration:380,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}
      );
     }
     if(points&&points.animate){
      points.animate(
        [{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.09)'}],
        {duration:380,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}
      );
     }
     if(zoomGroup.animate){
      zoomGroup.animate(
        [{opacity:0,transform:'scale(.78)'},{opacity:1,transform:'scale(1.02)'},{opacity:1,transform:'scale(1)'}],
        {duration:560,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'}
      );
     }else{
      zoomGroup.style.opacity='1';
     }

     setTimeout(function(){wrap.classList.remove('is-zooming')},420);
    });
   });
  }


  function select(i, shouldScroll){
   active=i;var b=branches[i];
   root.querySelectorAll('.arg-point').forEach(function(el,j){el.classList.toggle('is-active',j===i)});
   root.querySelectorAll('.arg-city-btn').forEach(function(el,j){el.classList.toggle('is-active',j===i)});
   root.querySelector('.arg-current-num').textContent=String(i+1).padStart(2,'0');
   root.querySelector('.arg-city').textContent=lang==='kk'?b.kk:b.ru;
   root.querySelector('.arg-address').textContent=lang==='kk'?b.address_kk:b.address_ru;
   var phone=root.querySelector('.arg-phone');phone.textContent=b.phone;phone.href='tel:'+cleanPhone(b.phone);
   var email=root.querySelector('.arg-email');email.textContent=b.email;email.href='mailto:'+b.email;
   var route=root.querySelector('.arg-route');
   var city=lang==='kk'?b.kk:b.ru;
   var addr=lang==='kk'?b.address_kk:b.address_ru;
   route.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(city+', Kazakhstan, '+addr);
   root.querySelector('.arg-hq-badge').classList.toggle('is-visible',!!b.hq);

   var activeBtn=root.querySelector('.arg-city-btn.is-active');
   if(shouldScroll && activeBtn){
    var stripEl=root.querySelector('.arg-city-strip');
    if(stripEl){
      var targetLeft=activeBtn.offsetLeft-(stripEl.clientWidth-activeBtn.offsetWidth)/2;
      stripEl.scrollTo({left:Math.max(0,targetLeft),behavior:'smooth'});
    }
   }
  }

  function setLang(next){
   if(!dict[next])next='ru';lang=next;
   root.classList.toggle('arg-lang-kk',lang==='kk');
   root.setAttribute('lang',lang==='kk'?'kk':'ru');
   root.querySelectorAll('[data-arg-i18n]').forEach(function(el){
    var k=el.getAttribute('data-arg-i18n');if(dict[lang][k]!==undefined)el.textContent=dict[lang][k];
   });
   root.querySelectorAll('.arg-point text').forEach(function(el,i){el.textContent=lang==='kk'?branches[i].kk:branches[i].ru});
   root.querySelectorAll('.arg-city-btn').forEach(function(el,i){el.textContent=lang==='kk'?branches[i].kk:branches[i].ru});
   select(active,false);
   var wrap=root.querySelector('.arg-map-wrap');
   if(wrap&&wrap.classList.contains('is-region')){
    var b=branches[active],m=regionMeta[b.id],title=root.querySelector('.arg-region-name');
    if(m&&title)title.textContent=lang==='kk'?m.kk:m.ru;
    var rt=root.querySelector('.arg-region-label');
    if(rt)rt.textContent=lang==='kk'?b.kk:b.ru;
   }
  }

  setLang(lang);select(0,false);
  loadRegions();
  var backBtn=root.querySelector('.arg-map-back');
  if(backBtn)backBtn.addEventListener('click',resetMap);

  document.addEventListener('click',function(e){
   var btn=e.target.closest('[data-lang]');if(!btn)return;
   var next=btn.getAttribute('data-lang');if(next==='ru'||next==='kk')setLang(next);
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initArg);else initArg();
 setTimeout(initArg,500);
})();

(function(){
  var root = document.getElementById('aromika-footer');
  if(!root) return;

  var dict = {
    ru:{
      brandText:'Казахстанский производитель бытовой химии и косметической продукции.',
      shopBtn:'Интернет-магазин',company:'Компания',about:'О компании',
      production:'Производство',contacts:'Контакты',careers:'Работа в компании',brands:'Бренды',
      partners:'Партнёрам',distributors:'Дистрибьюторам',retail:'Торговым сетям',
      corporate:'Корпоративным клиентам',buyers:'Покупателям',catalog:'Каталог',
      online:'Интернет-магазин',where:'Где купить',office:'Головной офис',
      city:'Костанай, Казахстан',phone:'Телефон',privacy:'Политика конфиденциальности',
      feedback:'Обратная связь',top:'Наверх'
    },
    kk:{
      brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',
      shopBtn:'Интернет-дүкен',company:'Компания',about:'Компания туралы',
      production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',brands:'Брендтер',
      partners:'Серіктестерге',distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',
      corporate:'Корпоративтік клиенттерге',buyers:'Сатып алушыларға',catalog:'Каталог',
      online:'Интернет-дүкен',where:'Қайдан сатып алуға болады',office:'Бас кеңсе',
      city:'Қостанай, Қазақстан',phone:'Телефон',privacy:'Құпиялық саясаты',
      feedback:'Кері байланыс',top:'Жоғары'
    }
  };

  function applyLanguage(lang){
    if(lang !== 'kk') lang = 'ru';

    root.setAttribute('lang', lang === 'kk' ? 'kk' : 'ru');
    root.classList.toggle('arf-lang-kk', lang === 'kk');

    root.querySelectorAll('[data-arf-i18n]').forEach(function(el){
      var key = el.getAttribute('data-arf-i18n');
      if(Object.prototype.hasOwnProperty.call(dict[lang], key)){
        el.textContent = dict[lang][key];
      }
    });

    root.querySelectorAll('[data-lang]').forEach(function(btn){
      btn.classList.toggle('arf-active', btn.getAttribute('data-lang') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function currentLanguage(){
    try {
      return localStorage.getItem('aromika-language') === 'kk' ? 'kk' : 'ru';
    } catch(e) {
      return 'ru';
    }
  }

  applyLanguage(currentLanguage());

  // One delegated listener. Works for footer buttons and RU/KZ controls in other blocks.
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-lang]');
    if(!btn) return;

    var lang = btn.getAttribute('data-lang');
    if(lang !== 'ru' && lang !== 'kk') return;

    try { localStorage.setItem('aromika-language', lang); } catch(err) {}
    applyLanguage(lang);

    try {
      window.dispatchEvent(new CustomEvent('aromika:languagechange', {detail:{lang:lang}}));
    } catch(err) {}
  });

  // Allows other blocks to notify the footer without synthetic clicks.
  window.addEventListener('aromika:languagechange', function(e){
    if(e.detail && (e.detail.lang === 'ru' || e.detail.lang === 'kk')){
      applyLanguage(e.detail.lang);
    }
  });

  // Covers language changes made by older blocks that only update localStorage.
  window.addEventListener('storage', function(e){
    if(e.key === 'aromika-language') applyLanguage(currentLanguage());
  });

  var topBtn = root.querySelector('.arf-to-top');
  if(topBtn){
    topBtn.addEventListener('click', function(e){
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }
})();

/* AROMIKA v20 theme controller */
(function(){
 var KEY='aromika-theme';
 var mq=null;
 try{mq=window.matchMedia('(prefers-color-scheme: dark)')}catch(e){}
 function stored(){try{var v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}catch(e){return null}}
 function current(){var v=document.documentElement.getAttribute('data-aromika-theme');if(v==='dark'||v==='light')return v;var s=stored();return s||(mq&&mq.matches?'dark':'light')}
 function lang(){try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return 'ru'}}
 function label(theme){var kk=lang()==='kk';if(theme==='dark')return kk?'Жарық тақырыпты қосу':'Включить светлую тему';return kk?'Қараңғы тақырыпты қосу':'Включить тёмную тему'}
 function metaColor(theme){var m=document.querySelector('meta[name="theme-color"][data-aromika-theme-meta]');if(!m){m=document.createElement('meta');m.name='theme-color';m.setAttribute('data-aromika-theme-meta','1');document.head.appendChild(m)}m.content=theme==='dark'?'#0d0e11':'#ffffff'}
 function reflect(theme){
  document.documentElement.setAttribute('data-aromika-theme',theme);
  document.documentElement.style.colorScheme=theme;
  metaColor(theme);
  document.querySelectorAll('.ar-theme-toggle').forEach(function(btn){var l=label(theme);btn.setAttribute('aria-pressed',theme==='dark'?'true':'false');btn.setAttribute('aria-label',l);btn.setAttribute('title',l)});
 }
 function applyInitial(){reflect(current())}
 function toggle(){var next=current()==='dark'?'light':'dark';try{localStorage.setItem(KEY,next)}catch(e){}reflect(next)}
 function init(){
  applyInitial();
  document.querySelectorAll('.ar-theme-toggle').forEach(function(btn){if(btn.dataset.themeReady==='1')return;btn.dataset.themeReady='1';btn.addEventListener('click',toggle)});
  document.addEventListener('click',function(e){if(e.target.closest('[data-lang]'))setTimeout(function(){reflect(current())},0)});
  if(mq){var systemChange=function(e){if(!stored())reflect(e.matches?'dark':'light')};try{mq.addEventListener('change',systemChange)}catch(e){try{mq.addListener(systemChange)}catch(_) {}}}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 setTimeout(init,500);
})();

/* AROMIKA CONTACTS V1 */
(function(){
  'use strict';
  var SALES=[{"city":"Алматы","name":"Лаптева Лора","role":"Супервайзер","phone":"+7 707 978 74 29","tel":"+77079787429","wa":"77079787429"},{"city":"Алматы","name":"Хмурович Андрей","role":"Супервайзер","phone":"+7 707 236 33 69","tel":"+77072363369","wa":"77072363369"},{"city":"Алматы","name":"Хусаинов Самат","role":"Супервайзер","phone":"+7 708 861 57 67","tel":"+77088615767","wa":"77088615767"},{"city":"Алматы","name":"Якупова Гульнара","role":"Супервайзер","phone":"+7 707 387 09 31","tel":"+77073870931","wa":"77073870931"},{"city":"Балхаш","name":"Гарипова Юзефа","role":"Супервайзер","phone":"+7 771 436 55 08","tel":"+77714365508","wa":"77714365508"},{"city":"Жезказган","name":"Кичатая Ирина","role":"Директор филиала","phone":"+7 747 916 93 80","tel":"+77479169380","wa":"77479169380"},{"city":"Караганда","name":"Несипбаев Мурат","role":"Супервайзер","phone":"+7 700 336 27 41","tel":"+77003362741","wa":"77003362741"},{"city":"Караганда","name":"Сагиндык Шалкар","role":"Супервайзер","phone":"+7 708 835 65 05","tel":"+77088356505","wa":"77088356505"},{"city":"Кокшетау","name":"Низова Олеся","role":"Супервайзер","phone":"+7 707 609 56 34","tel":"+77076095634","wa":"77076095634"},{"city":"Петропавловск","name":"Сомова Евгения","role":"Директор филиала","phone":"+7 707 123 00 55","tel":"+77071230055","wa":"77071230055"},{"city":"Рудный","name":"Силеверстова Марина","role":"Супервайзер","phone":"+7 778 559 13 23","tel":"+77785591323","wa":"77785591323"},{"city":"Уральск","name":"Тужилкина Надежда","role":"Супервайзер","phone":"+7 707 341 40 41","tel":"+77073414041","wa":"77073414041"},{"city":"Атырау","name":"Лошманова Лидия","role":"Супервайзер","phone":"+7 775 726 84 79","tel":"+77757268479","wa":"77757268479"},{"city":"Актобе","name":"Зайцева Нина","role":"Супервайзер","phone":"+7 701 269 38 71","tel":"+77012693871","wa":"77012693871"},{"city":"Актау","name":"Семейных Евгения","role":"Супервайзер","phone":"+7 777 751 75 22","tel":"+77777517522","wa":"77777517522"},{"city":"Павлодар","name":"Салова Алена","role":"Директор филиала","phone":"+7 777 939 93 39","tel":"+77779399339","wa":"77779399339"},{"city":"Усть-Каменогорск","name":"Медведева Ольга","role":"Супервайзер","phone":"+7 776 451 50 50","tel":"+77764515050","wa":"77764515050"},{"city":"Семей","name":"Нестерова Марина","role":"Супервайзер","phone":"+7 700 447 85 64","tel":"+77004478564","wa":"77004478564"},{"city":"Семей","name":"Тюклин Николай","role":"Супервайзер","phone":"+7 707 801 53 26","tel":"+77078015326","wa":"77078015326"},{"city":"Астана","name":"Абылгазина Алина","role":"Супервайзер","phone":"+7 701 960 48 93","tel":"+77019604893","wa":"77019604893"},{"city":"Астана","name":"Мырзахметова Ботагоз","role":"Супервайзер","phone":"+7 775 093 91 45","tel":"+77750939145","wa":"77750939145"},{"city":"Шымкент","name":"Искандаров Рустам","role":"Супервайзер","phone":"+7 707 211 78 81","tel":"+77072117881","wa":"77072117881"},{"city":"Шымкент","name":"Интыкбекова Румия","role":"Начальник отдела продаж","phone":"+7 700 576 00 70","tel":"+77005760070","wa":"77005760070"},{"city":"Талдыкорган","name":"Кан Елена","role":"Директор филиала","phone":"+7 777 155 70 15","tel":"+77771557015","wa":"77771557015"},{"city":"Тараз","name":"Бакенова Анна","role":"Супервайзер","phone":"+7 747 469 80 85","tel":"+77474698085","wa":"77474698085"},{"city":"Аркалык","name":"Силеверстова Марина","role":"Супервайзер","phone":"+7 778 559 13 23","tel":"+77785591323","wa":"77785591323"},{"city":"Житикара","name":"Силеверстова Марина","role":"Супервайзер","phone":"+7 778 559 13 23","tel":"+77785591323","wa":"77785591323"},{"city":"Лисаковск","name":"Силеверстова Марина","role":"Супервайзер","phone":"+7 778 559 13 23","tel":"+77785591323","wa":"77785591323"}];
  var CITY_KK={"Алматы":"Алматы","Балхаш":"Балқаш","Жезказган":"Жезқазған","Караганда":"Қарағанды","Кокшетау":"Көкшетау","Петропавловск":"Петропавл","Рудный":"Рудный","Уральск":"Орал","Атырау":"Атырау","Актобе":"Ақтөбе","Актау":"Ақтау","Павлодар":"Павлодар","Усть-Каменогорск":"Өскемен","Семей":"Семей","Астана":"Астана","Шымкент":"Шымкент","Талдыкорган":"Талдықорған","Тараз":"Тараз","Аркалык":"Арқалық","Житикара":"Жітіқара","Лисаковск":"Лисаковск"};
  var grouped={}; SALES.forEach(function(x){(grouped[x.city]||(grouped[x.city]=[])).push(x)});
  var dict={
    ru:{heroKicker:'Контакты',heroTitle:'Найдите свой филиал —<br><em>или пригласите нас к себе.</em>',heroLead:'Выберите город на карте. Покажем адрес филиала, маршрут и контакт руководителя торговой команды, который организует визит торгового представителя.',hqLabel:'Головной офис Aromika',hqCity:'Костанай',hqAddress:'Северная промзона, 184',route:'Построить маршрут',searchLabel:'Быстрый поиск',searchTitle:'Введите город',searchPlaceholder:'Например, Алматы',salesKicker:'Торговые команды',salesTitle:'Пригласите торгового<br><em>представителя Aromika.</em>',salesLead:'Контакт руководителя торговой команды определяется по городу. Он подберёт торгового представителя вашей территории и организует визит.',salesNote:'Если вашего города нет в списке, свяжитесь с ближайшим филиалом на карте — команда подскажет, кто обслуживает вашу территорию.',modalKicker:'Торговая команда',modalLead:'Свяжитесь с руководителем торговой команды — он направит к вам торгового представителя.',modalNote:'WhatsApp откроется с уже подготовленным сообщением. Вам останется только отправить его.',call:'Позвонить',wa:'WhatsApp',team:'Торговая команда',invite:'Пригласить торгового представителя',contacts:'Контакты торговой команды',noSales:'Для этого города отдельный контакт торговой команды в базе не указан. Позвоните в филиал — вас соединят с торговым отделом.',branchCall:'Позвонить в филиал',searchKindBranch:'Филиал',searchKindSales:'Торговая территория'},
    kk:{heroKicker:'Байланыстар',heroTitle:'Өз филиалыңызды табыңыз —<br><em>немесе бізді өзіңізге шақырыңыз.</em>',heroLead:'Картадан қаланы таңдаңыз. Филиалдың мекенжайын, бағытын және сауда өкілінің келуін ұйымдастыратын сауда тобы жетекшісінің байланысын көрсетеміз.',hqLabel:'Aromika бас кеңсесі',hqCity:'Қостанай',hqAddress:'Солтүстік өнеркәсіп аймағы, 184',route:'Бағыт құру',searchLabel:'Жылдам іздеу',searchTitle:'Қаланы енгізіңіз',searchPlaceholder:'Мысалы, Алматы',salesKicker:'Сауда командалары',salesTitle:'Aromika сауда<br><em>өкілін шақырыңыз.</em>',salesLead:'Сауда командасы жетекшісінің байланысы қалаға қарай анықталады. Ол сіздің аумағыңызға жауапты сауда өкілін тағайындап, сапарын ұйымдастырады.',salesNote:'Қалаңыз тізімде болмаса, картадағы ең жақын филиалға хабарласыңыз — команда сіздің аумағыңызға кім жауапты екенін айтады.',modalKicker:'Сауда командасы',modalLead:'Сауда командасының жетекшісіне хабарласыңыз — ол сізге сауда өкілін жібереді.',modalNote:'WhatsApp дайын мәтінмен ашылады. Сізге тек хабарламаны жіберу қалады.',call:'Қоңырау шалу',wa:'WhatsApp',team:'Сауда командасы',invite:'Сауда өкілін шақыру',contacts:'Сауда командасының байланыстары',noSales:'Бұл қала бойынша сауда командасының жеке байланысы базада көрсетілмеген. Филиалға қоңырау шалыңыз — сізді сату бөлімімен байланыстырады.',branchCall:'Филиалға қоңырау шалу',searchKindBranch:'Филиал',searchKindSales:'Сауда аумағы'}
  };
  var lang='ru';try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  function cityLabel(c){return lang==='kk'?(CITY_KK[c]||c):c}
  function roleLabel(r){if(lang!=='kk')return r;return r==='Супервайзер'?'Супервайзер':r==='Директор филиала'?'Филиал директоры':r==='Начальник отдела продаж'?'Сату бөлімінің басшысы':r}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function currentBranchPhone(){var a=document.querySelector('#geography .arg-phone');return a?{href:a.getAttribute('href')||'',text:a.textContent.trim()}:null}
  function message(city){return lang==='kk'?'Сәлеметсіз бе! '+cityLabel(city)+' қаласында Aromika сауда өкілін шақырғым келеді.':'Здравствуйте! Хочу пригласить торгового представителя Aromika в городе '+city+'.'}
  function openModal(city){
    var modal=document.getElementById('ac-agent-modal'), people=modal&&modal.querySelector('.ac-modal-people');if(!modal||!people)return;
    modal.querySelector('#ac-modal-title').textContent=cityLabel(city); people.innerHTML='';
    var list=grouped[city]||[];
    if(!list.length){var p=currentBranchPhone();people.innerHTML='<div class="ac-no-sales">'+esc(dict[lang].noSales)+(p?'<br><a href="'+esc(p.href)+'">'+esc(dict[lang].branchCall)+' · '+esc(p.text)+'</a>':'')+'</div>';}
    else list.forEach(function(x){
      var role=roleLabel(x.role);
      var wa='https://wa.me/'+x.wa+'?text='+encodeURIComponent(message(city));
      var card=document.createElement('article');card.className='ac-person';
      card.innerHTML='<div class="ac-person-head"><div><b>'+esc(x.name)+'</b><br><a class="ac-person-phone" href="tel:'+esc(x.tel)+'">'+esc(x.phone)+'</a></div><small>'+esc(role)+'</small></div><div class="ac-person-actions"><a class="ac-call" href="tel:'+esc(x.tel)+'">'+esc(dict[lang].call)+'</a><a class="ac-wa" target="_blank" rel="noopener" href="'+esc(wa)+'">'+esc(dict[lang].wa)+'</a></div>';
      people.appendChild(card);
    });
    modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('ac-modal-open');setTimeout(function(){var b=modal.querySelector('.ac-modal-close');if(b)b.focus()},20);
  }
  function closeModal(){var m=document.getElementById('ac-agent-modal');if(!m)return;m.hidden=true;m.setAttribute('aria-hidden','true');document.body.classList.remove('ac-modal-open')}
  function mappedCityButton(city){var btns=[].slice.call(document.querySelectorAll('#geography .arg-city-btn'));return btns.find(function(b){return b.textContent.trim()===city || b.textContent.trim()===(CITY_KK[city]||'')})}
  function chooseCity(city){var b=mappedCityButton(city);if(b){b.click();setTimeout(function(){var geo=document.getElementById('geography');if(geo)geo.scrollIntoView({behavior:'smooth',block:'start'})},50)}else openModal(city)}
  function updateAgentButton(){var btn=document.querySelector('#geography .ac-agent-trigger'), cityEl=document.querySelector('#geography .arg-city');if(!btn||!cityEl)return;var city=cityEl.textContent.trim();var ruCity=Object.keys(CITY_KK).find(function(k){return CITY_KK[k]===city})||city;btn.dataset.city=ruCity;var s=btn.querySelector('small'),b=btn.querySelector('b');if(s)s.textContent=dict[lang].team;if(b)b.textContent=grouped[ruCity]?dict[lang].invite:dict[lang].branchCall}
  function setLang(next){if(!dict[next])next='ru';lang=next;document.querySelectorAll('[data-ac-i18n]').forEach(function(el){var k=el.getAttribute('data-ac-i18n');if(dict[lang][k]!=null)el.textContent=dict[lang][k]});document.querySelectorAll('[data-ac-i18n-html]').forEach(function(el){var k=el.getAttribute('data-ac-i18n-html');if(dict[lang][k]!=null)el.innerHTML=dict[lang][k]});var inp=document.querySelector('.ac-city-search');if(inp)inp.placeholder=dict[lang].searchPlaceholder;document.querySelectorAll('.ac-city-card').forEach(function(card){var c=card.dataset.salesCity,b=card.querySelector('.ac-city-card-top b'),a=card.querySelector('.ac-city-card-action');if(b)b.textContent=cityLabel(c);var sm=card.querySelector('small');if(sm){if(!sm.dataset.roles)sm.dataset.roles=sm.textContent.trim();sm.textContent=sm.dataset.roles.split(' / ').map(roleLabel).join(' / ')}if(a)a.childNodes[0].nodeValue=dict[lang].contacts+' '});var m=document.getElementById('ac-agent-modal');if(m&&!m.hidden){var title=m.querySelector('#ac-modal-title'),cur=Object.keys(CITY_KK).find(function(k){return cityLabel(k)===title.textContent})||title.textContent;closeModal();openModal(cur)}setTimeout(updateAgentButton,120)}
  function initSearch(){var inp=document.querySelector('.ac-city-search'),box=document.querySelector('.ac-search-results');if(!inp||!box)return;var cities=Object.keys(grouped);var mapped=[];document.querySelectorAll('#geography .arg-city-btn').forEach(function(b){var c=b.textContent.trim();var ru=Object.keys(CITY_KK).find(function(k){return CITY_KK[k]===c})||c;if(cities.indexOf(ru)<0)cities.push(ru);mapped.push(ru)});function render(){var q=inp.value.trim().toLowerCase();if(!q){box.hidden=true;box.innerHTML='';return}var out=cities.filter(function(c){return c.toLowerCase().indexOf(q)>-1 || (CITY_KK[c]||'').toLowerCase().indexOf(q)>-1}).slice(0,8);box.innerHTML='';out.forEach(function(c){var b=document.createElement('button');b.type='button';b.className='ac-search-item';b.innerHTML='<b>'+esc(cityLabel(c))+'</b><small>'+esc(mapped.indexOf(c)>-1?dict[lang].searchKindBranch:dict[lang].searchKindSales)+'</small>';b.addEventListener('click',function(){inp.value=cityLabel(c);box.hidden=true;chooseCity(c)});box.appendChild(b)});box.hidden=!out.length}inp.addEventListener('input',render);inp.addEventListener('focus',render);document.addEventListener('click',function(e){if(!e.target.closest('.ac-search-wrap'))box.hidden=true})}
  function init(){
    document.querySelectorAll('#contacts-page .ac-reveal').forEach(function(el){if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es,o){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-visible');o.unobserve(x.target)}})},{threshold:.08});io.observe(el)}else el.classList.add('is-visible')});
    initSearch();
    document.addEventListener('click',function(e){var c=e.target.closest('[data-sales-city]');if(c)openModal(c.dataset.salesCity);var t=e.target.closest('#geography .ac-agent-trigger');if(t){var city=t.dataset.city||document.querySelector('#geography .arg-city').textContent.trim();var ru=Object.keys(CITY_KK).find(function(k){return CITY_KK[k]===city})||city;openModal(ru)}if(e.target.closest('[data-ac-close]'))closeModal();var l=e.target.closest('[data-lang]');if(l)setTimeout(function(){setLang(l.getAttribute('data-lang'))},0)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});
    var city=document.querySelector('#geography .arg-city');if(city&&'MutationObserver'in window)new MutationObserver(updateAgentButton).observe(city,{childList:true,subtree:true,characterData:true});
    setTimeout(function(){setLang(lang);updateAgentButton()},650);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
