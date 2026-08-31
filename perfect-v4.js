window.__AROMIKA_PERFECT_BOOT__='starting';
(function(){
  var hero=document.getElementById('aromika-hero');
  var page=document.getElementById('perfect-page');
  if(!hero||!page)return;
  if(page.getAttribute('data-perfect-initialized')==='1')return;
  page.setAttribute('data-perfect-initialized','1');
  page.classList.add('pf-js-ready');
  window.__AROMIKA_PERFECT_VERSION__='v4';

  var headerDict={
    ru:{products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин'},
    kk:{products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен'}
  };

  var common={
    ru:{brandKicker:'Бренд Aromika',view:'Смотреть продукты',buy:'Купить онлайн',series:'Серия',chooseCategory:'Выберите категорию',stripTitle:'Продукция Perfect',stripText:'Основные линейки Perfect собраны по назначению — выберите нужную категорию.',catLaundry:'Стирка',catFabricCare:'Аромат для белья',catDishes:'Посуда',catCleaning:'Уборка',catHaircare:'Уход за волосами',catMen:'Мужская серия',allEyebrow:'Больше категорий',allTitle:'Вся продукция Perfect — в интернет-магазине',allText:'Полный ассортимент Perfect доступен в интернет-магазине Aromika.',allButton:'Смотреть весь ассортимент',orbitHint:'Нажмите на продукт или используйте стрелки'},
    kk:{brandKicker:'Aromika бренді',view:'Өнімдерді көру',buy:'Онлайн сатып алу',series:'Серия',chooseCategory:'Санатты таңдаңыз',stripTitle:'Perfect өнімдері',stripText:'Perfect негізгі желілері мақсаты бойынша топтастырылған — қажетті санатты таңдаңыз.',catLaundry:'Кір жуу',catFabricCare:'Киімге арналған хош иіс',catDishes:'Ыдыс жуу',catCleaning:'Тазалау',catHaircare:'Шаш күтімі',catMen:'Ерлер сериясы',allEyebrow:'Қосымша санаттар',allTitle:'Perfect өнімдерінің толық ассортименті — интернет-дүкенде',allText:'Perfect өнімдерінің толық ассортименті Aromika интернет-дүкенінде қолжетімді.',allButton:'Барлық ассортиментті көру',orbitHint:'Өнімді басыңыз немесе көрсеткілерді қолданыңыз'}
  };

  var data={
    laundry:{
      no:'01',
      ru:{title:'для стирки',lead:'Гели Perfect рассчитаны на повседневную стирку цветного, универсального и детского белья. Энзимные формулы помогают справляться с пятнами, уменьшают эффект застирывания и бережно относятся к структуре волокон. Для детского белья в линейке предусмотрен гипоаллергенный Baby Care.',series:'Стирка',marquee:'ЭНЗИМНАЯ ФОРМУЛА • УДАЛЕНИЕ ПЯТЕН • БЕРЕЖНЫЙ УХОД ЗА ВОЛОКНАМИ • PERFECT • '},
      kk:{title:'кір жууға арналған',lead:'Perfect гельдері түрлі түсті, әмбебап және балалар киімін күнделікті жууға арналған. Энзимді формулалар дақтарды кетіруге көмектеседі, киімнің тез тозып көрінуін азайтып, талшық құрылымына ұқыпты әсер етеді. Балалар киіміне арналған гипоаллергенді Baby Care нұсқасы да бар.',series:'Кір жуу',marquee:'ЭНЗИМДІ ФОРМУЛА • ДАҚТАРДЫ КЕТІРУ • ТАЛШЫҚТАРҒА ҰҚЫПТЫ КҮТІМ • PERFECT • '}
    },
    fabriccare:{
      no:'02',
      ru:{title:'для аромата белья',lead:'Парфюмированные кондиционеры Perfect придают белью приятный аромат после стирки, а гранулы-парфюм позволяют сделать его более выразительным. Цветочные, свежие и расслабляющие композиции помогают выбрать характер аромата — от лёгкого и чистого до более насыщенного.',series:'Аромат для белья',marquee:'АРОМАТ ПОСЛЕ СТИРКИ • ПАРФЮМИРОВАННЫЙ АКЦЕНТ • ЦВЕТОЧНЫЕ И СВЕЖИЕ КОМПОЗИЦИИ • PERFECT • '},
      kk:{title:'киімге арналған хош иіс',lead:'Perfect парфюмделген кондиционерлері жуудан кейін киімге жағымды хош иіс береді, ал парфюм-түйіршіктер оны айқынырақ етуге мүмкіндік береді. Гүлді, балғын және босаңсытатын композициялар жеңіл тазалықтан қанығырақ парфюмдік хош иіске дейін таңдауға көмектеседі.',series:'Киімге арналған хош иіс',marquee:'ЖУУДАН КЕЙІНГІ ХОШ ИІС • ПАРФЮМДЕЛГЕН АКЦЕНТ • ГҮЛДІ ЖӘНЕ БАЛҒЫН КОМПОЗИЦИЯЛАР • PERFECT • '}
    },
    dishes:{
      no:'03',
      ru:{title:'для мытья посуды',lead:'Гели Perfect предназначены для ежедневного мытья посуды и представлены в ароматах мангостина, папайи и питахайи. Удобные форматы подходят для регулярного использования дома, а фруктовые композиции делают привычное мытьё посуды приятнее.',series:'Посуда',marquee:'ЭФФЕКТИВНОЕ ОЧИЩЕНИЕ • ФРУКТОВЫЕ АРОМАТЫ • ЕЖЕДНЕВНЫЙ КОМФОРТ НА КУХНЕ • PERFECT • '},
      kk:{title:'ыдыс жууға арналған',lead:'Perfect гельдері күнделікті ыдыс жууға арналған және мангостин, папайя мен питахайя хош иістерімен ұсынылған. Ыңғайлы форматтар үйде тұрақты қолдануға сай, ал жемісті композициялар күнделікті ыдыс жууды жағымдырақ етеді.',series:'Ыдыс жуу',marquee:'ТИІМДІ ТАЗАЛАУ • ЖЕМІСТІ ХОШ ИІСТЕР • АС ҮЙДЕГІ КҮНДЕЛІКТІ ЫҢҒАЙЛЫЛЫҚ • PERFECT • '}
    },
    cleaning:{
      no:'04',
      ru:{title:'для уборки дома',lead:'Средства Perfect помогают решать основные задачи уборки дома: полы, стёкла, акриловые поверхности и сантехника. Средства для полов очищают и помогают устранять неприятные запахи, спреи для стёкол работают без разводов и дают антистатический эффект, а средства для акрила очищают без царапин. Кислотное средство pH 2 предназначено для удаления налёта и ржавчины и подходит для хромированных поверхностей и сплавов.',series:'Уборка',marquee:'ЧИСТОТА БЕЗ ЛИШНИХ УСИЛИЙ • БЕЗ РАЗВОДОВ • БЕРЕЖНОЕ ОЧИЩЕНИЕ • PERFECT • '},
      kk:{title:'үйді тазалауға арналған',lead:'Perfect құралдары үйдегі негізгі тазалау міндеттеріне арналған: еден, әйнек, акрил беттері және сантехника. Еденге арналған құралдар тазалап, жағымсыз иістерді кетіруге көмектеседі, әйнекке арналған спрейлер із қалдырмай тазалап, антистатикалық әсер береді, ал акрилге арналған құралдар бетті сызбай тазартады. pH 2 қышқылды құралы қақ пен тотты кетіруге арналған және хромдалған беттер мен қорытпаларға жарайды.',series:'Тазалау',marquee:'АРТЫҚ КҮШСІЗ ТАЗАЛЫҚ • ІЗ ҚАЛДЫРМАЙ ТАЗАЛАУ • ҰҚЫПТЫ ТАЗАРТУ • PERFECT • '}
    },
    haircare:{
      no:'05',
      ru:{title:'для ухода за волосами',lead:'Шампуни и бальзамы-кондиционеры Perfect помогают подобрать уход под состояние волос: очищение и баланс, увлажнение, интенсивное питание, сохранение яркости цвета и уход против перхоти. В линейке есть формулы с кератином, D-пантенолом и маслами, а также бессульфатные шампуни для окрашенных и осветлённых волос.',series:'Уход за волосами',marquee:'БЕССУЛЬФАТНЫЙ УХОД • КЕРАТИН • УВЛАЖНЕНИЕ И ПИТАНИЕ • СОХРАНЕНИЕ ЦВЕТА • PERFECT • '},
      kk:{title:'шаш күтіміне арналған',lead:'Perfect сусабындары мен бальзам-кондиционерлері шаштың жағдайына сай күтімді таңдауға көмектеседі: тазалау мен баланс, ылғалдандыру, қарқынды қоректендіру, түстің қанықтығын сақтау және қайызғаққа қарсы күтім. Желіде кератин, D-пантенол және майлары бар формулалар, сондай-ақ боялған және ағартылған шашқа арналған сульфатсыз сусабындар бар.',series:'Шаш күтімі',marquee:'СУЛЬФАТСЫЗ КҮТІМ • КЕРАТИН • ЫЛҒАЛДАНДЫРУ МЕН ҚОРЕКТЕНДІРУ • ТҮСТІ САҚТАУ • PERFECT • '}
    },
    men:{
      no:'06',
      ru:{title:'для тела и волос',lead:'Мужская серия Perfect объединяет гели для душа 2 в 1 для тела и волос и функциональные шампуни. Климбазол помогает в уходе против перхоти, кофеин используется в формуле для укрепления волос, а ментол дарит ощущение свежести. Понятное назначение каждого продукта делает ежедневный уход проще.',series:'Мужская серия',marquee:'2 В 1 ДЛЯ ТЕЛА И ВОЛОС • ПРОТИВ ПЕРХОТИ • УКРЕПЛЕНИЕ ВОЛОС • ОСВЕЖАЮЩИЙ ЭФФЕКТ • PERFECT • '},
      kk:{title:'дене мен шашқа арналған',lead:'Perfect ерлер сериясы дене мен шашқа арналған 2 в 1 душ гельдерін және функционалды сусабындарды біріктіреді. Климбазол қайызғаққа қарсы күтімге көмектеседі, кофеин шашты нығайтуға арналған формулада қолданылады, ал ментол балғындық сезімін береді. Әр өнімнің мақсаты түсінікті болғандықтан күнделікті күтім оңайырақ болады.',series:'Ерлер сериясы',marquee:'ДЕНЕ МЕН ШАШҚА АРНАЛҒАН 2 В 1 • ҚАЙЫЗҒАҚҚА ҚАРСЫ • ШАШТЫ НЫҒАЙТУ • БАЛҒЫНДЫҚ ӘСЕРІ • PERFECT • '}
    }
  };

  var shopLinks={laundry:'https://aromika.shop/sredstva-dlya-stirki-ru/',fabriccare:'https://aromika.shop/sredstva-dlya-stirki-ru/',dishes:'https://aromika.shop/sredstva-dlya-mytya-posudy/',cleaning:'https://aromika.shop/tovary-dlya-doma-i-kuhni-ru/sredstva-dlya-uborki-i-chistki/',haircare:'https://aromika.shop/shampuni-i-balzamy/',men:'https://aromika.shop/'};

  var lang='ru';
  try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  if(lang!=='ru'&&lang!=='kk')lang='ru';
  var prefersReducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyLang(){
    document.documentElement.lang=lang==='kk'?'kk':'ru';
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n');if(headerDict[lang][k]!==undefined)el.textContent=headerDict[lang][k];
    });
    document.querySelectorAll('[data-pf-i18n]').forEach(function(el){
      var k=el.getAttribute('data-pf-i18n');if(common[lang][k]!==undefined)el.textContent=common[lang][k];
    });
    document.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('is-active',b.getAttribute('data-lang')===lang)});
    var prevBtn=page.querySelector('.pf-orbit-prev'),nextBtn=page.querySelector('.pf-orbit-next');
    if(prevBtn)prevBtn.setAttribute('aria-label',lang==='kk'?'Алдыңғы өнім':'Предыдущий продукт');
    if(nextBtn)nextBtn.setAttribute('aria-label',lang==='kk'?'Келесі өнім':'Следующий продукт');
    var localNav=page.querySelector('.pf-local-nav');
    if(localNav)localNav.setAttribute('aria-label',lang==='kk'?'Perfect санаттары':'Категории Perfect');
    applyCategory(page.getAttribute('data-category')||'laundry',false);
  }


  var marqueeRaf=0;
  var marqueeRunId=0;

  function stopMarquee(){
    marqueeRunId++;
    if(marqueeRaf){
      cancelAnimationFrame(marqueeRaf);
      marqueeRaf=0;
    }
  }

  function renderMarquee(text){
    var track=page.querySelector('.pf-marquee-track');
    if(!track)return;

    stopMarquee();
    var runId=marqueeRunId;
    var offset=0;
    var lastTime=0;

    var repeatCount=14;
    var markup='';
    for(var i=0;i<repeatCount;i++){
      markup+='<span data-marquee-item>'+text+'</span>';
    }
    track.innerHTML=markup;

    // Inline !important intentionally wins over an old reduced-motion rule
    // left in the prototype CSS that used transform:none!important.
    track.style.setProperty('transform','translate3d(0,0,0)','important');
    track.style.setProperty('animation','none','important');

    requestAnimationFrame(function(){
      if(runId!==marqueeRunId)return;

      var distance=track.scrollWidth/2;
      var speed=prefersReducedMotion?18:42; // px/sec

      function tick(now){
        if(runId!==marqueeRunId)return;

        if(!lastTime)lastTime=now;
        var dt=Math.min(50,now-lastTime)/1000;
        lastTime=now;

        offset+=speed*dt;
        if(distance>0 && offset>=distance){
          offset=offset%distance;
        }

        track.style.setProperty(
          'transform',
          'translate3d('+(-offset.toFixed(2))+'px,0,0)',
          'important'
        );
        marqueeRaf=requestAnimationFrame(tick);
      }

      marqueeRaf=requestAnimationFrame(tick);
    });
  }

  function applyCategory(cat,animate){
    if(!data[cat])cat='laundry';
    page.setAttribute('data-category',cat);
    var d=data[cat][lang];
    page.querySelector('.pf-cat-no').textContent=data[cat].no;
    page.querySelector('[data-pf-i18n="title"]').textContent=d.title;
    page.querySelector('[data-pf-i18n="lead"]').textContent=d.lead;
    page.querySelector('.pf-series-name').textContent=d.series;
    renderMarquee(d.marquee);
    page.querySelectorAll('.pf-products-scene').forEach(function(el){el.classList.toggle('is-active',el.getAttribute('data-scene')===cat)});
    page.querySelectorAll('[data-category]').forEach(function(el){var active=el.getAttribute('data-category')===cat;el.classList.toggle('is-active',active);if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',active?'true':'false')});
    var shopBtn=page.querySelector('.pf-btn-ghost');if(shopBtn&&shopLinks[cat])shopBtn.href=shopLinks[cat];
    var localLinks=page.querySelector('.pf-local-links');var activeLocal=localLinks&&localLinks.querySelector('[data-category="'+cat+'"]');if(localLinks&&activeLocal&&matchMedia('(max-width:980px)').matches){var left=activeLocal.offsetLeft-(localLinks.clientWidth-activeLocal.offsetWidth)/2;localLinks.scrollTo({left:Math.max(0,left),behavior:prefersReducedMotion?'auto':'smooth'})}

  }

  document.addEventListener('click',function(e){
    var lb=e.target.closest('[data-lang]');
    if(lb){lang=lb.getAttribute('data-lang');try{localStorage.setItem('aromika-language',lang)}catch(err){}applyLang();return}
    var cb=e.target.closest('#perfect-page [data-category]');
    if(cb){applyCategory(cb.getAttribute('data-category'),true);return}
  });

  // Header burger
  var burger=hero.querySelector('.ar-burger'),menu=hero.querySelector('.ar-menu'),overlay=hero.querySelector('.ar-overlay');
  function toggleMenu(open){burger.classList.toggle('open',open);menu.classList.toggle('open',open);overlay.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''}
  if(burger)burger.addEventListener('click',function(){toggleMenu(!menu.classList.contains('open'))});
  if(overlay)overlay.addEventListener('click',function(){toggleMenu(false)});
  if(menu)menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggleMenu(false)})});

  // Theme
  var KEY='aromika-theme',mq=null;try{mq=matchMedia('(prefers-color-scheme:dark)')}catch(e){}
  function stored(){try{var v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}catch(e){return null}}
  function current(){return stored()||(mq&&mq.matches?'dark':'light')}
  function reflect(t){
    document.documentElement.setAttribute('data-aromika-theme',t);document.documentElement.style.colorScheme=t;
    var btn=hero.querySelector('.ar-theme-toggle');if(btn){btn.setAttribute('aria-pressed',t==='dark'?'true':'false')}
  }
  reflect(current());
  var themeBtn=hero.querySelector('.ar-theme-toggle');
  if(themeBtn)themeBtn.addEventListener('click',function(){var n=current()==='dark'?'light':'dark';try{localStorage.setItem(KEY,n)}catch(e){}reflect(n)});

  // The same product-orbit animation used on the new Aromika homepage.
  var orbitControllers={};

  function createOrbit(scene){
    if(!scene || scene.dataset.orbitReady==='1') return orbitControllers[scene.dataset.scene];
    scene.dataset.orbitReady='1';

    var items=Array.prototype.slice.call(scene.querySelectorAll('.pf-product-card'));
    if(!items.length) return null;

    var N=items.length;
    var TWO=Math.PI*2;
    var STEP=TWO/N;
    var FRONT=Math.PI/2;

    // Start with the first/central useful product facing the viewer.
    var startIndex = N===2 ? 0 : Math.floor((N-1)/2);
    var selectedIndex=startIndex;
    var current=FRONT-startIndex*STEP;
    var target=current;
    var from=current;
    var start=0;
    var duration=2050;
    var activeDuration=duration;
    var moving=false;
    var raf=0;
    var mobileTimer=0;
    var lastInteraction=0;

    function markInteraction(){
      lastInteraction=Date.now();
    }

    function norm(a){
      while(a>Math.PI)a-=TWO;
      while(a<-Math.PI)a+=TWO;
      return a;
    }

    function ease(t){
      return -(Math.cos(Math.PI*t)-1)/2;
    }

    function dForIndex(index){
      var a=index*STEP+current;
      return (Math.sin(a)+1)/2;
    }

    function draw(){
      var w=scene.clientWidth || page.querySelector('.pf-visual').clientWidth || 650;
      var h=scene.clientHeight || page.querySelector('.pf-visual').clientHeight || 640;
      var cx=w*.50;
      var cy=h*.47;
      var sceneName=scene.getAttribute('data-scene');
      var isMen=sceneName==='men',isFabric=sceneName==='fabriccare',isCleaning=sceneName==='cleaning',isHair=sceneName==='haircare';
      var compact=matchMedia('(max-width:640px)').matches;
      var rx=w*(compact?(N>=7?.31:.29):(isMen?.27:(isCleaning?.30:(isFabric?.30:(isHair?.30:(N>=5?.33:.31))))));
      var ry=h*(compact?.145:(isMen?.14:(isCleaning?.145:(isFabric?.15:(isHair?.16:(N>=5?.17:.19))))));
      var frontIndex=0,frontDepth=-1;
      var depth=[];

      items.forEach(function(el,i){
        var a=i*STEP+current;
        var x=cx+Math.cos(a)*rx;
        var y=cy+Math.sin(a)*ry;
        var d=(Math.sin(a)+1)/2;

        var minScale=compact?.56:.58,maxAdd=compact?.50:.54;
        if(isHair){minScale=compact?.62:.64;maxAdd=compact?.48:.52}
        if(isMen){minScale=compact?.60:.61;maxAdd=compact?.47:.50}
        var scale=minScale+d*maxAdd;

        // Selected product gains up to ~10% extra scale only as it reaches the front.
        // This keeps the ring calm while making the chosen SKU clearly dominant.
        var selectedBoost=(i===selectedIndex)?(1+0.10*Math.pow(d,2.35)):1;
        scale*=selectedBoost;

        var rot=Math.cos(a)*(compact?4.0:(N>=5?5.0:6.0));

        el.style.transform=
          'translate3d('+
          (x-el.offsetWidth/2)+'px,'+
          (y-el.offsetHeight*.72)+'px,'+
          (d*105)+'px) scale('+scale+') rotate('+rot+'deg)';

        el.style.opacity=1;
        el.style.filter='brightness('+(.96+d*.04)+') saturate('+(.94+d*.06)+')';
        depth.push({el:el,d:d});

        if(d>frontDepth){frontDepth=d;frontIndex=i}
      });

      depth.sort(function(a,b){return a.d-b.d});
      depth.forEach(function(x,i){x.el.style.zIndex=3+i});

      items.forEach(function(el,i){
        var isFront=i===frontIndex;
        var isSelected=i===selectedIndex;
        el.classList.toggle('is-front',isFront);
        el.classList.toggle('is-selected',isSelected);

        // Once the selected SKU is effectively at the front, guarantee visual priority.
        if(isSelected && dForIndex(i)>0.94){el.style.zIndex=99}
      });
    }

    function frame(now){
      if(!moving)return;
      var t=(now-start)/activeDuration;
      if(t>=1){
        current=target;moving=false;draw();return;
      }
      current=from+(target-from)*ease(t);
      draw();
      raf=requestAnimationFrame(frame);
    }

    function go(next){
      if(moving)cancelAnimationFrame(raf);
      from=current;
      target=current+norm(next-current);
      start=performance.now();
      moving=true;
      activeDuration=prefersReducedMotion?900:duration;
      raf=requestAnimationFrame(frame);
    }

    function front(index){
      selectedIndex=(index+N)%N;
      go(FRONT-selectedIndex*STEP);
    }

    function rotate(dir){
      front(selectedIndex+dir);
    }

    items.forEach(function(el,i){
      el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label',(el.querySelector('figcaption')||{}).textContent||'Продукт Perfect');

      el.addEventListener('click',function(e){
        e.preventDefault();
        markInteraction();
        front(i);
      });

      el.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();
          markInteraction();
          front(i);
        }
      });
    });

    var sx=0,sy=0;
    scene.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse')return;
      sx=e.clientX;sy=e.clientY;
    });
    scene.addEventListener('pointerup',function(e){
      if(e.pointerType==='mouse')return;
      var dx=e.clientX-sx,dy=e.clientY-sy;
      if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){markInteraction();rotate(dx<0?-1:1)}
    });

    if(matchMedia('(max-width:980px)').matches&&!prefersReducedMotion){
      mobileTimer=setInterval(function(){
        if(
          scene.classList.contains('is-active') &&
          !moving &&
          !document.hidden &&
          Date.now()-lastInteraction>10000
        ){
          rotate(-1);
        }
      },8000);
    }

    var controller={
      draw:draw,
      front:function(index){markInteraction();front(index)},
      rotate:function(dir){markInteraction();rotate(dir)}
    };
    orbitControllers[scene.dataset.scene]=controller;
    draw();
    return controller;
  }

  page.querySelectorAll('.pf-products-scene').forEach(createOrbit);

  var orbitPrev=page.querySelector('.pf-orbit-prev');
  var orbitNext=page.querySelector('.pf-orbit-next');

  function rotateActiveOrbit(dir){
    var cat=page.getAttribute('data-category')||'laundry';
    var ctl=orbitControllers[cat];
    if(ctl)ctl.rotate(dir);
  }

  if(orbitPrev)orbitPrev.addEventListener('click',function(){rotateActiveOrbit(1)});
  if(orbitNext)orbitNext.addEventListener('click',function(){rotateActiveOrbit(-1)});

  // Patch category switching so the newly selected category redraws its own orbit.
  var originalApplyCategory=applyCategory;
  applyCategory=function(cat,animate){
    originalApplyCategory(cat,false);
    requestAnimationFrame(function(){
      var scene=page.querySelector('.pf-products-scene[data-scene="'+cat+'"]');
      var ctl=createOrbit(scene);
      if(ctl)ctl.draw();
      if(animate && scene){
        scene.style.opacity='1';
      }
    });
  };

  window.addEventListener('resize',function(){
    var cat=page.getAttribute('data-category')||'laundry';
    var ctl=orbitControllers[cat];
    if(ctl)ctl.draw();
  },{passive:true});

  applyLang();
})();

(function(){
  var root=document.getElementById('aromika-footer');
  if(!root)return;

  var dict={
    ru:{
      brandText:'Казахстанский производитель бытовой химии и косметической продукции.',
      shopBtn:'Интернет-магазин',company:'Компания',about:'О компании',
      production:'Производство',contacts:'Контакты',careers:'Работа в компании',
      brands:'Бренды',partners:'Партнёрам',distributors:'Дистрибьюторам',
      retail:'Торговым сетям',corporate:'Корпоративным клиентам',
      buyers:'Покупателям',catalog:'Каталог',online:'Интернет-магазин',
      where:'Где купить',office:'Головной офис',city:'Костанай, Казахстан',
      phone:'Телефон',feedback:'Обратная связь',top:'Наверх'
    },
    kk:{
      brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',
      shopBtn:'Интернет-дүкен',company:'Компания',about:'Компания туралы',
      production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',
      brands:'Брендтер',partners:'Серіктестерге',distributors:'Дистрибьюторларға',
      retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',
      buyers:'Сатып алушыларға',catalog:'Каталог',online:'Интернет-дүкен',
      where:'Қайдан сатып алуға болады',office:'Бас кеңсе',
      city:'Қостанай, Қазақстан',phone:'Телефон',feedback:'Кері байланыс',
      top:'Жоғары'
    }
  };

  function currentLanguage(){
    try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return 'ru'}
  }

  function applyFooterLanguage(lang){
    if(lang!=='kk')lang='ru';
    root.classList.toggle('arf-lang-kk',lang==='kk');
    root.querySelectorAll('[data-arf-i18n]').forEach(function(el){
      var key=el.getAttribute('data-arf-i18n');
      if(dict[lang][key]!==undefined)el.textContent=dict[lang][key];
    });
    root.querySelectorAll('[data-lang]').forEach(function(btn){
      var active=btn.getAttribute('data-lang')===lang;
      btn.classList.toggle('arf-active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
  }

  applyFooterLanguage(currentLanguage());

  document.addEventListener('click',function(e){
    var btn=e.target.closest('[data-lang]');
    if(!btn)return;
    var chosen=btn.getAttribute('data-lang');
    if(chosen==='ru'||chosen==='kk'){
      setTimeout(function(){applyFooterLanguage(chosen)},0);
    }
  });

  var topBtn=root.querySelector('.arf-to-top');
  if(topBtn){
    topBtn.addEventListener('click',function(e){
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }
})();

window.__AROMIKA_PERFECT_BOOT__='ready';
