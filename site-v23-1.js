window.__AROMIKA_HOME_VERSION__='v23';

/* AROMIKA v6 — initial position controller */
(function(){
  try{history.scrollRestoration='manual';}catch(e){}

  var hash=location.hash;
  var nav=null;
  try{nav=performance.getEntriesByType('navigation')[0]||null;}catch(e){}
  var reload=!!(nav&&nav.type==='reload');

  if(reload&&hash){
    try{
      history.replaceState(null,'',location.pathname+location.search);
      hash='';
    }catch(e){}
  }

  if(hash&&!reload)return;

  var until=Date.now()+6000;
  var released=false;

  function topNow(){
    if(released||Date.now()>until)return;
    try{window.scrollTo(0,0);}catch(e){}
    try{
      document.documentElement.scrollTop=0;
      if(document.body)document.body.scrollTop=0;
    }catch(e){}
  }

  function release(){released=true;}

  topNow();
  document.addEventListener('DOMContentLoaded',topNow,{once:true});
  window.addEventListener('load',topNow,{once:true});
  window.addEventListener('pageshow',topNow);

  [0,50,150,300,600,1000,1600,2400,3600,5000].forEach(function(ms){
    setTimeout(topNow,ms);
  });

  ['wheel','touchmove','keydown'].forEach(function(type){
    window.addEventListener(type,release,{once:true,passive:true,capture:true});
  });
})();



/* AROMIKA v5: hard initial top lock against late Tilda/browser scroll restoration */
(function(){
  var navType='';
  try{
    var nav=performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    navType=nav && nav.type || '';
  }catch(e){}

  var isReload = navType === 'reload';
  var hasHash = !!location.hash;

  /* A reload must always start from the header, even if an old hash remains. */
  if(isReload && hasHash){
    try{
      history.replaceState(null, document.title, location.pathname + location.search);
      hasHash=false;
    }catch(e){}
  }

  /* Preserve a deliberate anchor only on a fresh navigation. */
  if(hasHash && !isReload) return;

  var active=true;
  var oldBehavior='';
  try{
    oldBehavior=document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior='auto';
    history.scrollRestoration='manual';
  }catch(e){}

  function topNow(){
    if(!active) return;
    try{ window.scrollTo(0,0); }catch(e){}
    try{
      document.documentElement.scrollTop=0;
      if(document.body) document.body.scrollTop=0;
    }catch(e){}
  }

  /* Run immediately and keep winning against scripts that restore scroll late. */
  topNow();
  var timer=setInterval(topNow,50);

  function release(){
    if(!active) return;
    active=false;
    clearInterval(timer);
    try{ document.documentElement.style.scrollBehavior=oldBehavior; }catch(e){}
    cleanup();
  }

  function cleanup(){
    ['wheel','touchstart','pointerdown','keydown'].forEach(function(type){
      window.removeEventListener(type,release,true);
    });
  }

  /* User interaction takes precedence immediately. */
  ['wheel','touchstart','pointerdown','keydown'].forEach(function(type){
    window.addEventListener(type,release,true,{passive:true});
  });

  window.addEventListener('DOMContentLoaded',topNow);
  window.addEventListener('load',function(){
    topNow();
    setTimeout(topNow,100);
    setTimeout(topNow,500);
    setTimeout(topNow,1200);
    setTimeout(topNow,2200);
  },{once:true});

  window.addEventListener('pageshow',function(){
    topNow();
    setTimeout(topNow,250);
    setTimeout(topNow,1000);
  });

  /* Stop the lock automatically once all late Tilda initializers have settled. */
  setTimeout(release,3200);
})();



/* AROMIKA v4: prevent geography init from restoring/forcing scroll */
(function(){
  function hasIntentionalHash(){
    return !!location.hash;
  }
  function topNow(){
    if(hasIntentionalHash()) return;
    try{ history.scrollRestoration='manual'; }catch(e){}
    try{ window.scrollTo(0,0); }catch(e){}
    try{
      document.documentElement.scrollTop=0;
      if(document.body) document.body.scrollTop=0;
    }catch(e){}
  }
  window.addEventListener('load',function(){
    if(hasIntentionalHash()) return;
    topNow();
    setTimeout(topNow,50);
    setTimeout(topNow,300);
    setTimeout(topNow,900);
  },{once:true});
  window.addEventListener('pageshow',function(){
    if(hasIntentionalHash()) return;
    topNow();
    setTimeout(topNow,120);
    setTimeout(topNow,700);
  });
})();



/* AROMIKA: force top on page reload, preserve intentional hash navigation */
(function () {
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  } catch (e) {}

  function shouldPreserveHash() {
    return !!(location.hash && document.querySelector(location.hash));
  }

  function forceTop() {
    if (shouldPreserveHash()) return;
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
    try {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (e) {}
  }

  window.addEventListener('beforeunload', function () {
    if (!location.hash) {
      try { window.scrollTo(0, 0); } catch (e) {}
    }
  });

  window.addEventListener('pageshow', function (event) {
    if (shouldPreserveHash()) return;
    forceTop();
    setTimeout(forceTop, 0);
    setTimeout(forceTop, 120);
    setTimeout(forceTop, 450);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (!shouldPreserveHash()) {
        forceTop();
        setTimeout(forceTop, 80);
      }
    });
  } else if (!shouldPreserveHash()) {
    forceTop();
  }
})();


(function(){if(window.__aromikaLanguageBridge)return;window.__aromikaLanguageBridge=true;document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(!b)return;var l=b.getAttribute('data-lang');if(l!=='ru'&&l!=='kk')return;try{localStorage.setItem('aromika-language',l)}catch(err){}document.documentElement.lang=(l==='kk'?'kk':'ru')},true)})();


(function(){
  function init(){
    var root=document.getElementById('aromika-hero');
    if(!root || root.dataset.ready==='1') return;
    root.dataset.ready='1';

    /* LANGUAGE */
    var translations = {
      ru: {
        products: 'Продукция',
        brands: 'Бренды',
        about: 'О компании',
        partners: 'Партнёрам',
        careers: 'Работа в компании',
        contacts: 'Контакты',
        buyOnline: 'Купить онлайн',
        shop: 'Интернет-магазин',
        eyebrow: 'Казахстанский производитель',
        title1: 'Создаём',
        title2: 'чистоту',
        title3: 'каждый день',
        lead: 'Бытовая химия и средства ухода собственного производства. Более 20 лет создаём продукты для повседневной жизни.',
        viewProducts: 'Смотреть продукцию',
        yearsExp: 'лет опыта',
        items: 'наименований',
        ownProduction: 'собственное<br>производство',
        made: 'Сделано',
        inKazakhstan: 'в Казахстане'
      },
      kk: {
        products: 'Өнімдер',
        brands: 'Брендтер',
        about: 'Компания туралы',
        partners: 'Серіктестерге',
        careers: 'Компаниядағы жұмыс',
        contacts: 'Байланыс',
        buyOnline: 'Онлайн сатып алу',
        shop: 'Интернет-дүкен',
        eyebrow: 'Қазақстандық өндіруші',
        title1: 'Күн сайын',
        title2: 'тазалық',
        title3: 'жасаймыз',
        lead: 'Өз өндірісіміздегі тұрмыстық химия және күтім құралдары. 20 жылдан астам уақыт бойы күнделікті өмірге арналған өнімдер жасап келеміз.',
        viewProducts: 'Өнімдерді көру',
        yearsExp: 'жыл тәжірибе',
        items: 'өнім атауы',
        ownProduction: 'өз<br>өндірісіміз',
        made: 'Қазақстанда',
        inKazakhstan: 'жасалған'
      }
    };

    function setLanguage(lang){
      if(!translations[lang]) lang='ru';

      root.classList.toggle('lang-kk', lang==='kk');
      root.setAttribute('lang', lang==='kk' ? 'kk' : 'ru');

      root.querySelectorAll('[data-i18n]').forEach(function(el){
        var key=el.getAttribute('data-i18n');
        if(translations[lang][key] !== undefined){
          el.textContent=translations[lang][key];
        }
      });

      root.querySelectorAll('[data-i18n-html]').forEach(function(el){
        var key=el.getAttribute('data-i18n-html');
        if(translations[lang][key] !== undefined){
          el.innerHTML=translations[lang][key];
        }
      });

      root.querySelectorAll('[data-lang]').forEach(function(btn){
        btn.classList.toggle('is-active', btn.getAttribute('data-lang')===lang);
      });

      try{
        localStorage.setItem('aromika-language',lang);
      }catch(e){}
    }

    root.querySelectorAll('[data-lang]').forEach(function(btn){
      btn.addEventListener('click',function(){
        setLanguage(this.getAttribute('data-lang'));
      });
    });

    var savedLang='ru';
    try{
      savedLang=localStorage.getItem('aromika-language') || 'ru';
    }catch(e){}
    setLanguage(savedLang);

    /* MENU */
    var burger=root.querySelector('.ar-burger');
    var menu=root.querySelector('.ar-menu');
    var overlay=root.querySelector('.ar-overlay');

    function toggleMenu(open){
      burger.classList.toggle('open',open);
      menu.classList.toggle('open',open);
      overlay.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    }

    burger.addEventListener('click',function(e){
      e.preventDefault();
      toggleMenu(!menu.classList.contains('open'));
    });

    overlay.addEventListener('click',function(){toggleMenu(false)});

    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){toggleMenu(false)});
    });

    /* ORBIT */
    var stage=root.querySelector('.ar-stage');
    var items=[
      stage.querySelector('.ar-wash'),
      stage.querySelector('.ar-perfect'),
      stage.querySelector('.ar-maxi'),
      stage.querySelector('.ar-prachka')
    ];

    var factors=[1.04,1,1.02,1.16];
    var N=items.length;
    var TWO=Math.PI*2;
    var STEP=TWO/N;
    var FRONT=Math.PI/2;

    var current=FRONT-STEP;
    var target=current;
    var from=current;
    var start=0;
    var duration=4200;
    var moving=false;
    var raf=0;

    function norm(a){
      while(a>Math.PI)a-=TWO;
      while(a<-Math.PI)a+=TWO;
      return a;
    }

    function ease(t){
      return -(Math.cos(Math.PI*t)-1)/2;
    }

    function draw(){
      var w=stage.clientWidth||650;
      var h=stage.clientHeight||625;
      var cx=w*.5, cy=h*.47;
      var rx=w*.34, ry=h*.19;
      var depth=[];

      items.forEach(function(el,i){
        var a=i*STEP+current;
        var x=cx+Math.cos(a)*rx;
        var y=cy+Math.sin(a)*ry;
        var d=(Math.sin(a)+1)/2;
        var scale=(.68+d*.35)*factors[i];
        var rot=Math.cos(a)*7;

        el.style.transform=
          'translate3d('+
          (x-el.offsetWidth/2)+'px,'+
          (y-el.offsetHeight*.72)+'px,'+
          (d*90)+'px) scale('+scale+') rotate('+rot+'deg)';

        el.style.opacity=1;
        el.style.filter=
          'brightness('+(.96+d*.04)+') saturate('+(.94+d*.06)+')';

        depth.push({el:el,d:d});
      });

      depth.sort(function(a,b){return a.d-b.d});
      depth.forEach(function(x,i){x.el.style.zIndex=3+i});
    }

    function frame(now){
      if(!moving)return;

      var t=(now-start)/duration;

      if(t>=1){
        current=target;
        moving=false;
        draw();
        return;
      }

      current=from+(target-from)*ease(t);
      draw();
      raf=requestAnimationFrame(frame);
    }

    function go(next){
      if(moving){
        cancelAnimationFrame(raf);
      }

      from=current;
      target=current+norm(next-current);
      start=performance.now();
      moving=true;
      raf=requestAnimationFrame(frame);
    }

    function rotate(dir){
      go(target-dir*STEP);
    }

    function front(index){
      go(FRONT-index*STEP);
    }

    draw();

    /* desktop hover + click/tap */
    items.forEach(function(el,i){
      el.addEventListener('mouseenter',function(){
        if(matchMedia('(hover:hover)').matches) front(i);
      });

      el.addEventListener('click',function(e){
        e.preventDefault();
        front(i);
      });
    });

    /* swipe */
    var sx=0,sy=0;

    stage.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse')return;
      sx=e.clientX;
      sy=e.clientY;
    });

    stage.addEventListener('pointerup',function(e){
      if(e.pointerType==='mouse')return;

      var dx=e.clientX-sx;
      var dy=e.clientY-sy;

      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){
        rotate(dx<0?1:-1);
      }
    });

    /* mobile auto motion */
    if(matchMedia('(max-width:980px)').matches){
      setInterval(function(){
        if(!moving && !document.hidden) rotate(1);
      },8000);
    }

    window.addEventListener('resize',draw,{passive:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }

  setTimeout(init,500);
})();



(function(){
  function initAromikaProducts(){
    var root=document.getElementById('products');
    if(!root || root.dataset.arpReady==='1') return;
    root.dataset.arpReady='1';

    var dict={
      ru:{
        kicker:'Продукция',
        title1:'Всё необходимое',
        title2:'для чистоты и ухода',
        intro:'Средства для дома и ежедневного ухода, разработанные для решения конкретных задач.',

        laundryTitle:'Стирка',
        laundryText:'Гели, порошки, кондиционеры, отбеливатели и пятновыводители.',

        dishesTitle:'Для мытья посуды',
        dishesText:'Гели для эффективного удаления жира и ежедневного ухода за посудой.',

        cleaningTitle:'Уборка',
        cleaningText:'Средства для кухни, ванной, стекла и различных поверхностей.',

        bodyTitle:'Уход за телом',
        bodyText:'Гели для душа, жидкое и крем-мыло для ежедневного использования.',

        hairTitle:'Уход за волосами',
        hairText:'Шампуни и средства ухода для различных типов волос.',

        allTitle:'Вся продукция',
        allText:'Перейти в интернет-магазин и посмотреть полный ассортимент.'
      },

      kk:{
        kicker:'Өнімдер',
        title1:'Тазалық пен күтімге',
        title2:'қажеттінің бәрі',
        intro:'Үйге және күнделікті күтімге арналған, нақты міндеттерді шешуге әзірленген өнімдер.',

        laundryTitle:'Кір жуу',
        laundryText:'Кір жууға арналған гельдер, ұнтақтар, кондиционерлер, ағартқыштар және дақ кетіргіштер.',

        dishesTitle:'Ыдыс жуу',
        dishesText:'Майды тиімді кетіруге және ыдысты күнделікті жууға арналған гельдер.',

        cleaningTitle:'Тазалау',
        cleaningText:'Асүйге, жуынатын бөлмеге, әйнекке және әртүрлі беттерге арналған тазартқыш құралдар.',

        bodyTitle:'Дене күтімі',
        bodyText:'Күнделікті қолдануға арналған душ гельдері, сұйық және крем-сабын.',

        hairTitle:'Шаш күтімі',
        hairText:'Әртүрлі шаш түрлеріне арналған сусабындар мен күтім құралдары.',

        allTitle:'Барлық өнімдер',
        allText:'Интернет-дүкенге өтіп, толық ассортиментті көру.'
      }
    };

    function setLanguage(lang){
      if(!dict[lang]) lang='ru';

      root.classList.toggle('arp-lang-kk',lang==='kk');
      root.setAttribute('lang',lang==='kk'?'kk':'ru');

      root.querySelectorAll('[data-arp-i18n]').forEach(function(el){
        var key=el.getAttribute('data-arp-i18n');
        if(dict[lang][key]!==undefined){
          el.textContent=dict[lang][key];
        }
      });
    }

    var lang='ru';

    try{
      lang=localStorage.getItem('aromika-language')||'ru';
    }catch(e){}

    setLanguage(lang);

    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting)return;
          root.querySelectorAll('.arp-card').forEach(function(el,i){
            el.animate(
              [{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],
              {duration:560,delay:i*65,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}
            );
          });
          io.disconnect();
        });
      },{threshold:.12});
      io.observe(root);
    }

    /* Sync with RU / KZ buttons from the Hero block */
    document.addEventListener('click',function(e){
      var btn=e.target.closest('[data-lang]');
      if(!btn) return;

      var newLang=btn.getAttribute('data-lang');

      if(newLang==='ru' || newLang==='kk'){
        setLanguage(newLang);
      }
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initAromikaProducts);
  }else{
    initAromikaProducts();
  }

  setTimeout(initAromikaProducts,500);
})();



(function(){
  function initAromikaBrands(){
    var root=document.getElementById('brands');
    if(!root || root.dataset.arbReady==='1') return;
    root.dataset.arbReady='1';

    var dict={
      ru:{
        kicker:'Наши бренды',
        title1:'Разные задачи.',
        title2:'Один стандарт качества.',
        intro:'Линейки Aromika для разных сценариев ухода за домом, стирки и ежедневной чистоты.',
        perfectText:'Широкая линейка средств для стирки, уборки и ежедневного ухода.',
        washText:'Практичные средства для стирки и поддержания чистоты в доме.',
        maxiText:'Линейка средств для интенсивной и эффективной стирки.',
        prachkaText:'Средства для повседневной стирки и ухода за бельём.',
        antibakText:'Антибактериальная линейка для чистоты белья и дома.',
        viewBrand:'Смотреть продукты'
      },
      kk:{
        kicker:'Біздің брендтер',
        title1:'Әртүрлі міндеттер.',
        title2:'Бір сапа стандарты.',
        intro:'Үй күтімі, кір жуу және күнделікті тазалықтың әртүрлі міндеттеріне арналған Aromika желілері.',
        perfectText:'Кір жууға, үй тазалауға және күнделікті күтімге арналған кең өнім желісі.',
        washText:'Кір жууға және үйдегі тазалықты сақтауға арналған практикалық құралдар.',
        maxiText:'Қарқынды әрі тиімді кір жууға арналған өнімдер желісі.',
        prachkaText:'Күнделікті кір жууға және киім күтіміне арналған құралдар.',
        antibakText:'Киім мен үй тазалығына арналған бактерияға қарсы өнімдер желісі.',
        viewBrand:'Өнімдерді көру'
      }
    };

    function setLang(lang){
      if(!dict[lang]) lang='ru';
      root.classList.toggle('arb-lang-kk',lang==='kk');
      root.setAttribute('lang',lang==='kk'?'kk':'ru');

      root.querySelectorAll('[data-arb-i18n]').forEach(function(el){
        var key=el.getAttribute('data-arb-i18n');
        if(dict[lang][key]!==undefined){
          el.textContent=dict[lang][key];
        }
      });
    }

    var lang='ru';
    try{
      lang=localStorage.getItem('aromika-language')||'ru';
    }catch(e){}

    setLang(lang);

    document.addEventListener('click',function(e){
      var btn=e.target.closest('[data-lang]');
      if(!btn) return;

      var next=btn.getAttribute('data-lang');
      if(next==='ru' || next==='kk') setLang(next);
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initAromikaBrands);
  }else{
    initAromikaBrands();
  }

  setTimeout(initAromikaBrands,500);
})();




/* legacy initializer removed in v19 */





/* legacy initializer removed in v19 */




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
 function initARPT(){
  var root=document.getElementById('partners-home');
  if(!root||root.dataset.arptReady==='1')return;
  root.dataset.arptReady='1';

  var dict={
   ru:{
    kicker:'Партнёрам',title1:'Развиваем бизнес',title2:'вместе',
    lead:'Aromika открыта к сотрудничеству с торговыми сетями, дистрибьюторами, HoReCa и корпоративными клиентами.',
    cta:'Стать партнёром',center:'Партнёрская сеть',
    n1:'Дистрибуция',n2:'Торговые сети',n4:'Корпоративные клиенты',
    d1title:'Дистрибьюторам',d1text:'Развитие продаж продукции Aromika на региональных рынках.',
    d2title:'Торговым сетям',d2text:'Широкий ассортимент бытовой химии и продукции ежедневного спроса.',
    d3text:'Профессиональные решения для гостиниц, ресторанов и предприятий сервиса.',
    d4title:'Корпоративным клиентам',d4text:'Подбор продукции под задачи бизнеса и регулярные поставки.'
   },
   kk:{
    kicker:'Серіктестерге',title1:'Бизнесті',title2:'бірге дамытамыз',
    lead:'Aromika сауда желілерімен, дистрибьюторлармен, HoReCa және корпоративтік клиенттермен ынтымақтастыққа ашық.',
    cta:'Серіктес болу',center:'Серіктестік желі',
    n1:'Дистрибуция',n2:'Сауда желілері',n4:'Корпоративтік клиенттер',
    d1title:'Дистрибьюторларға',d1text:'Aromika өнімдерінің өңірлік нарықтардағы сатылымын дамыту.',
    d2title:'Сауда желілеріне',d2text:'Тұрмыстық химия мен күнделікті сұранысқа арналған өнімдердің кең ассортименті.',
    d3text:'Қонақүйлерге, мейрамханаларға және сервис кәсіпорындарына арналған кәсіби шешімдер.',
    d4title:'Корпоративтік клиенттерге',d4text:'Бизнес міндеттеріне сай өнімдерді таңдау және тұрақты жеткізу.'
   }
  };

  function setLang(lang){
   if(!dict[lang])lang='ru';
   root.classList.toggle('arpt-lang-kk',lang==='kk');
   root.setAttribute('lang',lang==='kk'?'kk':'ru');
   root.querySelectorAll('[data-arpt-i18n]').forEach(function(el){
    var k=el.getAttribute('data-arpt-i18n');
    if(dict[lang][k]!==undefined)el.textContent=dict[lang][k];
   });
  }
  var statNumbers=Array.prototype.slice.call(root.querySelectorAll('.arc-stats strong'));
  statNumbers.forEach(function(el){
   var target=parseInt(el.textContent,10)||0;
   el.dataset.arcTarget=String(target);
   el.textContent='0';
  });

  function animateStats(){
   if(root.dataset.arcCounted==='1')return;
   root.dataset.arcCounted='1';

   var reduced=false;
   try{reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}

   statNumbers.forEach(function(el,index){
    var target=parseInt(el.dataset.arcTarget,10)||0;
    if(reduced){el.textContent=String(target);return}

    var duration=1250+index*120;
    var startTime=null;

    function tick(now){
     if(startTime===null)startTime=now;
     var p=Math.min(1,(now-startTime)/duration);
     var eased=1-Math.pow(1-p,3);
     var value=Math.round(target*eased);
     el.textContent=String(value);
     if(p<1)requestAnimationFrame(tick);
     else el.textContent=String(target);
    }
    requestAnimationFrame(tick);
   });
  }

  var lang='ru';try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  setLang(lang);
  document.addEventListener('click',function(e){
   var b=e.target.closest('[data-lang]');if(!b)return;
   var l=b.getAttribute('data-lang');if(l==='ru'||l==='kk')setLang(l);
  });

  if('IntersectionObserver' in window){
   var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
     if(entry.isIntersecting){
      var copy=root.querySelector('.arpt-copy');
      if(copy)copy.animate(
       [{opacity:.82,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],
       {duration:700,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}
      );
      root.querySelectorAll('.arpt-card').forEach(function(el,i){
       el.animate(
        [{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:650,delay:100+i*90,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}
       );
      });
      io.disconnect();
     }
    });
   },{threshold:.2});
   io.observe(root.querySelector('.arpt-panel'));
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initARPT);else initARPT();
 setTimeout(initARPT,500);
})();



(function(){
 function initARWB(){
  var root=document.getElementById('where-buy-home');
  if(!root||root.dataset.ready==='1')return;
  root.dataset.ready='1';
  var d={
   ru:{
    kicker:'Где купить',title1:'Выбирайте удобный',title2:'способ покупки',
    lead:'Заказывайте продукцию Aromika в официальном интернет-магазине, через Kaspi, в мобильном приложении или выбирайте ближайшую точку продаж.',
    official:'Официальный интернет-магазин',shopTitle:'Весь ассортимент<br>в одном месте',shopCta:'Перейти в магазин',
    catalogKicker:'Маркетплейс',catalogTitle:'Kaspi Магазин',catalogText:'Привычное оформление заказа и удобная доставка через Kaspi.',
    appKicker:'Мобильное приложение',appTitle:'Aromika',appText:'Покупки со смартфона — через приложение Aromika.',
    pointsKicker:'Офлайн',pointsTitle:'Точки продаж',pointsText:'Адреса магазинов и пунктов самовывоза.',
    delivery:'Доставка по Казахстану',pickup:'Пункты самовывоза в городах',official2:'Официальный магазин Aromika'
   },
   kk:{
    kicker:'Қайдан сатып алуға болады',title1:'Өзіңізге ыңғайлы',title2:'сатып алу тәсілін таңдаңыз',
    lead:'Aromika өнімдеріне ресми интернет-дүкенде, Kaspi арқылы, мобильді қосымшада тапсырыс беріңіз немесе жақын сату нүктесін таңдаңыз.',
    official:'Ресми интернет-дүкен',shopTitle:'Барлық ассортимент<br>бір жерде',shopCta:'Дүкенге өту',
    catalogKicker:'Маркетплейс',catalogTitle:'Kaspi Магазин',catalogText:'Kaspi арқылы тапсырысты ыңғайлы рәсімдеу және жеткізу.',
    appKicker:'Мобильді қосымша',appTitle:'Aromika',appText:'Aromika қосымшасы арқылы смартфоннан сатып алыңыз.',
    pointsKicker:'Офлайн',pointsTitle:'Сату нүктелері',pointsText:'Дүкендер мен алып кету нүктелерінің мекенжайлары.',
    delivery:'Қазақстан бойынша жеткізу',pickup:'Қалалардағы алып кету нүктелері',official2:'Aromika ресми дүкені'
   }
  };
  function setLang(l){
   if(!d[l])l='ru';
   root.classList.toggle('arwb-lang-kk',l==='kk');
   root.querySelectorAll('[data-arwb-i18n]').forEach(function(el){
    var k=el.getAttribute('data-arwb-i18n');
    if(d[l][k]!=null) el.innerHTML=d[l][k];
   });
  }
  var l='ru';try{l=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  setLang(l);
  document.addEventListener('click',function(e){
   var b=e.target.closest('[data-lang]');if(!b)return;
   var x=b.getAttribute('data-lang');if(x==='ru'||x==='kk')setLang(x);
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initARWB);else initARWB();
 setTimeout(initARWB,500);
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



(function(){
  if(window.__aromikaMobileFinal) return;
  window.__aromikaMobileFinal = true;

  function init(){
    var site=document.getElementById('aromika-onepiece-site');
    if(!site) return;

    /* unified section reveal; does not replace existing section animations */
    var selectors=[
      '#products .arp-wrap',
      '#brands .arb-wrap',
      '#about-company .ara-wrap',
      '#production-quality .arpq-wrap',
      '#geography .arg-wrap',
      '#partners-home .arpt-wrap',
      '#where-buy-home .arwb-wrap',
      '#aromika-footer .arf-wrap'
    ];
    var nodes=[];
    selectors.forEach(function(sel){
      var el=site.querySelector(sel);
      if(el){el.classList.add('am-reveal');nodes.push(el);}
    });

    if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('am-visible');
            io.unobserve(entry.target);
          }
        });
      },{threshold:.08,rootMargin:'0px 0px -6% 0px'});
      nodes.forEach(function(el){io.observe(el);});
    }else{
      nodes.forEach(function(el){el.classList.add('am-visible');});
    }

    /* make all language controls synchronized in this one-piece version */
    function syncLang(lang){
      if(lang!=='ru' && lang!=='kk') lang='ru';
      try{localStorage.setItem('aromika-language',lang);}catch(e){}
      document.documentElement.lang=(lang==='kk'?'kk':'ru');
      window.dispatchEvent(new CustomEvent('aromika:languagechange',{detail:{lang:lang}}));
    }
    document.addEventListener('click',function(e){
      var btn=e.target.closest('[data-lang]');
      if(!btn || !site.contains(btn)) return;
      syncLang(btn.getAttribute('data-lang'));
    },true);

    /* hero menu safety on mobile */
    var hero=site.querySelector('#aromika-hero');
    if(hero){
      var burger=hero.querySelector('.ar-burger');
      var menu=hero.querySelector('.ar-menu');
      var overlay=hero.querySelector('.ar-overlay');
      function hardClose(){
        if(burger) burger.classList.remove('open');
        if(menu) menu.classList.remove('open');
        if(overlay) overlay.classList.remove('open');
        document.body.style.overflow='';
      }
      document.addEventListener('keydown',function(e){
        if(e.key==='Escape') hardClose();
      });
      window.addEventListener('resize',function(){
        if(window.innerWidth>980) hardClose();
      },{passive:true});
      window.addEventListener('pageshow',function(){document.body.style.overflow='';});
    }

    /* prevent horizontal drag from producing page overflow */
    var scrollers=site.querySelectorAll('#geography .arg-cities');
    scrollers.forEach(function(el){
      el.style.touchAction='pan-x';
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();



(function(){
 function initARC(){
  var root=document.getElementById('about-company');
  if(!root||root.dataset.arcReady==='1')return;
  root.dataset.arcReady='1';
  var dict={
   ru:{
    kicker:'О компании',title1:'Более 20 лет',title2:'создаём продукцию в Казахстане',
    intro:'Aromika объединяет собственное производство, разработку продукции, логистику и дистрибуцию. Производственная система позволяет контролировать ключевые этапы — от идеи до готового продукта.',
    more:'Подробнее о компании',own:'Собственное производство',kazakhstan:'Казахстан',launch:'год запуска производства',
    stat1:'лет на рынке Казахстана',stat2:'наименований продукции',stat3:'структурных подразделений',
    p1t:'Разработка',p1d:'Создание и совершенствование рецептур.',
    p2t:'Производство',p2d:'Выпуск продукции на собственной площадке.',
    p3t:'Контроль качества',p3d:'Контроль параметров на ключевых этапах.',
    p4t:'Готовый продукт',p4d:'Упаковка и подготовка к дистрибуции.',
    statement:'Собственное производство — часть единой системы Aromika: от разработки продукта до его поставки покупателю.'
   },
   kk:{
    kicker:'Компания туралы',title1:'20 жылдан астам',title2:'Қазақстанда өнім өндіреміз',
    intro:'Aromika өз өндірісін, өнім әзірлеуді, логистиканы және дистрибуцияны біріктіреді. Өндірістік жүйе идеядан дайын өнімге дейінгі негізгі кезеңдерді бақылауға мүмкіндік береді.',
    more:'Компания туралы толығырақ',own:'Өз өндірісіміз',kazakhstan:'Қазақстан',launch:'өндіріс іске қосылған жыл',
    stat1:'Қазақстан нарығында',stat2:'өнім атауы',stat3:'құрылымдық бөлімше',
    p1t:'Әзірлеу',p1d:'Рецептураларды жасау және жетілдіру.',
    p2t:'Өндіріс',p2d:'Өнімдерді өз өндірістік алаңымызда шығару.',
    p3t:'Сапаны бақылау',p3d:'Негізгі кезеңдердегі параметрлерді бақылау.',
    p4t:'Дайын өнім',p4d:'Қаптау және дистрибуцияға дайындау.',
    statement:'Өз өндірісіміз — Aromika-ның бірыңғай жүйесінің бір бөлігі: өнім әзірлеуден бастап оны сатып алушыға жеткізуге дейін.'
   }
  };
  function setLang(lang){
   if(!dict[lang])lang='ru';
   root.classList.toggle('arc-lang-kk',lang==='kk');
   root.setAttribute('lang',lang==='kk'?'kk':'ru');
   root.querySelectorAll('[data-arc-i18n]').forEach(function(el){
    var k=el.getAttribute('data-arc-i18n');
    if(dict[lang][k]!==undefined)el.textContent=dict[lang][k];
   });
  }
  var lang='ru';try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  setLang(lang);
  document.addEventListener('click',function(e){
   var b=e.target.closest('[data-lang]');if(!b)return;
   var n=b.getAttribute('data-lang');if(n==='ru'||n==='kk')setLang(n);
  });
  if('IntersectionObserver'in window){
   var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
     if(!entry.isIntersecting)return;
     animateStats();
     var passport=root.querySelector('.arc-passport');
     if(passport)passport.animate([{opacity:.84,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:720,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
     root.querySelectorAll('.arc-stats article,.arc-process article').forEach(function(el,i){
      el.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:560,delay:80+i*55,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
     });
     io.disconnect();
    });
   },{threshold:.15});
   io.observe(root.querySelector('.arc-main'));
  }else{
   animateStats();
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initARC);else initARC();
 setTimeout(initARC,500);
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
