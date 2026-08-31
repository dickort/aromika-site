(function(){
  'use strict';

  var hero=document.getElementById('aromika-hero');
  var page=document.getElementById('perfect-page');
  var footer=document.getElementById('aromika-footer');
  if(!hero||!page)return;
  if(page.dataset.perfectInitialized==='1')return;

  page.dataset.perfectInitialized='1';
  page.classList.add('pf-js-ready');
  window.__AROMIKA_PERFECT_VERSION__='production-clean-v1';

  var prefersReducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang='ru';
  try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  if(lang!=='ru'&&lang!=='kk')lang='ru';

  var headerDict={
    ru:{products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин'},
    kk:{products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен'}
  };

  var footerDict={
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

  var common={
    ru:{
      brandKicker:'Бренд Aromika',
      catLaundry:'Стирка',catFabricCare:'Аромат для белья',catDishes:'Посуда',
      catCleaning:'Уборка',catHaircare:'Уход за волосами',catMen:'Мужская серия',
      selectedLabel:'Выбранный продукт',buyCategory:'Купить в интернет-магазине',
      allPerfect:'Весь ассортимент Perfect',categoryLabel:'Категория',
      orbitHint:'Нажмите на продукт или используйте стрелки',
      otherKicker:'Навигация по линейке',otherTitle:'Другие категории Perfect',
      otherText:'Переключитесь на другую задачу — выбранная категория уже показана выше.',
      shopEyebrow:'Интернет-магазин Aromika',shopTitle:'Полный ассортимент Perfect',
      shopText:'Другие форматы и продукты бренда доступны в интернет-магазине.',
      shopButton:'Смотреть весь ассортимент'
    },
    kk:{
      brandKicker:'Aromika бренді',
      catLaundry:'Кір жуу',catFabricCare:'Киімге арналған хош иіс',catDishes:'Ыдыс жуу',
      catCleaning:'Тазалау',catHaircare:'Шаш күтімі',catMen:'Ерлер сериясы',
      selectedLabel:'Таңдалған өнім',buyCategory:'Интернет-дүкеннен сатып алу',
      allPerfect:'Perfect толық ассортименті',categoryLabel:'Санат',
      orbitHint:'Өнімді басыңыз немесе көрсеткілерді қолданыңыз',
      otherKicker:'Желі бойынша навигация',otherTitle:'Perfect басқа санаттары',
      otherText:'Басқа міндетті таңдаңыз — ағымдағы санат жоғарыда көрсетілген.',
      shopEyebrow:'Aromika интернет-дүкені',shopTitle:'Perfect толық ассортименті',
      shopText:'Брендтің басқа форматтары мен өнімдері интернет-дүкенде қолжетімді.',
      shopButton:'Толық ассортиментті көру'
    }
  };

  var categories={
    laundry:{
      no:'01',
      shop:'https://aromika.shop/sredstva-dlya-stirki-ru/',
      ru:{
        title:'для стирки',
        lead:'Гели Perfect рассчитаны на повседневную стирку цветного, универсального и детского белья. Энзимные формулы помогают справляться с пятнами, уменьшают эффект застирывания и бережно относятся к структуре волокон. Для детского белья в линейке предусмотрен гипоаллергенный Baby Care.',
        series:'Стирка',
        marquee:'ЭНЗИМНАЯ ФОРМУЛА • УДАЛЕНИЕ ПЯТЕН • БЕРЕЖНЫЙ УХОД ЗА ВОЛОКНАМИ • PERFECT • '
      },
      kk:{
        title:'кір жууға арналған',
        lead:'Perfect гельдері түсті, әмбебап және балалар киімін күнделікті жууға арналған. Энзимді формулалар дақтарды кетіруге көмектеседі, матаның тозып көрінуін азайтады және талшық құрылымына ұқыпты әсер етеді. Балалар киіміне арналған желіде гипоаллергенді Baby Care бар.',
        series:'Кір жуу',
        marquee:'ЭНЗИМДІ ФОРМУЛА • ДАҚТАРДЫ КЕТІРУ • ТАЛШЫҚТАРҒА ҰҚЫПТЫ КҮТІМ • PERFECT • '
      }
    },
    fabriccare:{
      no:'02',
      shop:'https://aromika.shop/sredstva-dlya-stirki-ru/',
      ru:{
        title:'для аромата белья',
        lead:'Парфюмированные кондиционеры Perfect придают белью приятный аромат после стирки, а гранулы-парфюм позволяют сделать его более выразительным. Цветочные, свежие и расслабляющие композиции помогают выбрать характер аромата — от лёгкого и чистого до более насыщенного.',
        series:'Аромат для белья',
        marquee:'АРОМАТ ПОСЛЕ СТИРКИ • ПАРФЮМИРОВАННЫЙ АКЦЕНТ • ЦВЕТОЧНЫЕ И СВЕЖИЕ КОМПОЗИЦИИ • PERFECT • '
      },
      kk:{
        title:'киімге хош иіс беруге арналған',
        lead:'Perfect парфюмделген кондиционерлері жуудан кейін киімге жағымды хош иіс береді, ал парфюм-түйіршіктер оны айқынырақ етуге мүмкіндік береді. Гүлді, балғын және босаңсытатын композициялар жеңіл тазалықтан қанығырақ парфюмдік хош иіске дейін таңдауға көмектеседі.',
        series:'Киімге арналған хош иіс',
        marquee:'ЖУҒАННАН КЕЙІНГІ ХОШ ИІС • ПАРФЮМДІК АКЦЕНТ • ГҮЛДІ ЖӘНЕ БАЛҒЫН КОМПОЗИЦИЯЛАР • PERFECT • '
      }
    },
    dishes:{
      no:'03',
      shop:'https://aromika.shop/sredstva-dlya-mytya-posudy/',
      ru:{
        title:'для мытья посуды',
        lead:'Гели Perfect предназначены для ежедневного мытья посуды и представлены в ароматах мангостина, папайи и питахайи. Густая пенная формула помогает очищать посуду от жира и бытовых загрязнений, а разные объёмы позволяют выбрать удобный формат для кухни.',
        series:'Посуда',
        marquee:'ГУСТАЯ ПЕНА • ОЧИЩЕНИЕ ОТ ЖИРА • ФРУКТОВЫЕ АРОМАТЫ • PERFECT • '
      },
      kk:{
        title:'ыдыс жууға арналған',
        lead:'Perfect гельдері күнделікті ыдыс жууға арналған және мангостин, папайя мен питахайя хош иістерімен ұсынылған. Қою көбікті формула май мен тұрмыстық ластануды тазалауға көмектеседі, ал әртүрлі көлемдер ас үйге ыңғайлы форматты таңдауға мүмкіндік береді.',
        series:'Ыдыс жуу',
        marquee:'ҚОЮ КӨБІК • МАЙДЫ ТАЗАЛАУ • ЖЕМІСТІ ХОШ ИІСТЕР • PERFECT • '
      }
    },
    cleaning:{
      no:'04',
      shop:'https://aromika.shop/tovary-dlya-doma-i-kuhni-ru/sredstva-dlya-uborki-i-chistki/',
      ru:{
        title:'для уборки дома',
        lead:'Средства Perfect помогают решать основные задачи уборки дома: полы, стёкла, акриловые поверхности и сантехника. Средства для полов очищают и помогают устранять неприятные запахи, спреи для стёкол работают без разводов и дают антистатический эффект, а средства для акрила очищают без царапин. Кислотное средство pH 2 предназначено для удаления налёта и ржавчины.',
        series:'Уборка',
        marquee:'БЕЗ РАЗВОДОВ • БЕРЕЖНОЕ ОЧИЩЕНИЕ • ПРОТИВ НАЛЁТА И РЖАВЧИНЫ • PERFECT • '
      },
      kk:{
        title:'үйді тазалауға арналған',
        lead:'Perfect құралдары үйдегі негізгі тазалау міндеттеріне арналған: еден, әйнек, акрил беттері және сантехника. Еденге арналған құралдар тазалап, жағымсыз иістерді кетіруге көмектеседі, әйнекке арналған спрейлер із қалдырмай тазалап, антистатикалық әсер береді, ал акрилге арналған құралдар бетті сызбай тазартады. pH 2 қышқылды құралы қақ пен тотты кетіруге арналған.',
        series:'Тазалау',
        marquee:'ІЗ ҚАЛДЫРМАЙ ТАЗАЛАУ • ҰҚЫПТЫ ТАЗАРТУ • ҚАҚ ПЕН ТОТҚА ҚАРСЫ • PERFECT • '
      }
    },
    haircare:{
      no:'05',
      shop:'https://aromika.shop/shampuni-i-balzamy/',
      ru:{
        title:'для ухода за волосами',
        lead:'Шампуни и бальзамы-кондиционеры Perfect помогают подобрать уход под состояние волос: очищение и баланс, увлажнение, интенсивное питание, сохранение яркости цвета и уход против перхоти. В линейке есть формулы с кератином, D-пантенолом и маслами, а также бессульфатные шампуни для окрашенных и осветлённых волос.',
        series:'Уход за волосами',
        marquee:'БЕССУЛЬФАТНЫЙ УХОД • КЕРАТИН • УВЛАЖНЕНИЕ И ПИТАНИЕ • СОХРАНЕНИЕ ЦВЕТА • PERFECT • '
      },
      kk:{
        title:'шаш күтіміне арналған',
        lead:'Perfect сусабындары мен бальзам-кондиционерлері шаштың жағдайына сай күтімді таңдауға көмектеседі: тазалау мен баланс, ылғалдандыру, қарқынды қоректендіру, түстің қанықтығын сақтау және қайызғаққа қарсы күтім. Желіде кератин, D-пантенол және майлары бар формулалар, сондай-ақ боялған және ағартылған шашқа арналған сульфатсыз сусабындар бар.',
        series:'Шаш күтімі',
        marquee:'СУЛЬФАТСЫЗ КҮТІМ • КЕРАТИН • ЫЛҒАЛДАНДЫРУ МЕН ҚОРЕКТЕНДІРУ • ТҮСТІ САҚТАУ • PERFECT • '
      }
    },
    men:{
      no:'06',
      shop:'https://aromika.shop/',
      ru:{
        title:'для тела и волос',
        lead:'Мужская серия Perfect объединяет гели для душа 2 в 1 для тела и волос и функциональные шампуни. Климбазол используется в уходе против перхоти, кофеин — в формуле для укрепления волос, а ментол дарит ощущение свежести. Понятное назначение каждого продукта делает ежедневный уход проще.',
        series:'Мужская серия',
        marquee:'2 В 1 ДЛЯ ТЕЛА И ВОЛОС • ПРОТИВ ПЕРХОТИ • УКРЕПЛЕНИЕ ВОЛОС • ОСВЕЖАЮЩИЙ ЭФФЕКТ • PERFECT • '
      },
      kk:{
        title:'дене мен шашқа арналған',
        lead:'Perfect ерлер сериясы дене мен шашқа арналған 2 в 1 душ гельдерін және функционалды сусабындарды біріктіреді. Климбазол қайызғаққа қарсы күтімде, кофеин шашты нығайтуға арналған формулада қолданылады, ал ментол балғындық сезімін береді. Әр өнімнің мақсаты түсінікті болғандықтан күнделікті күтім оңайырақ болады.',
        series:'Ерлер сериясы',
        marquee:'ДЕНЕ МЕН ШАШҚА АРНАЛҒАН 2 В 1 • ҚАЙЫЗҒАҚҚА ҚАРСЫ • ШАШТЫ НЫҒАЙТУ • БАЛҒЫНДЫҚ ӘСЕРІ • PERFECT • '
      }
    }
  };

  var products={
    laundry:[
      {ru:['Perfect Mix Colors 1500 мл','Для цветного белья','1500 мл'],kk:['Perfect Mix Colors 1500 мл','Түсті киімге арналған','1500 мл']},
      {ru:['Perfect Baby Care 1500 мл','Для детского белья','Гипоаллергенный'],kk:['Perfect Baby Care 1500 мл','Балалар киіміне арналған','Гипоаллергенді']},
      {ru:['Perfect Universal 1500 мл','Универсальный','1500 мл'],kk:['Perfect Universal 1500 мл','Әмбебап','1500 мл']},
      {ru:['Perfect Universal 3300 мл','Универсальный','3300 мл'],kk:['Perfect Universal 3300 мл','Әмбебап','3300 мл']},
      {ru:['Perfect Universal 4300 мл','Универсальный','4300 мл'],kk:['Perfect Universal 4300 мл','Әмбебап','4300 мл']}
    ],
    fabriccare:[
      {ru:['Blossom Dream 1500 мл','Парфюмированный кондиционер','1500 мл'],kk:['Blossom Dream 1500 мл','Парфюмделген кондиционер','1500 мл']},
      {ru:['Crystal Fresh 1500 мл','Парфюмированный кондиционер','1500 мл'],kk:['Crystal Fresh 1500 мл','Парфюмделген кондиционер','1500 мл']},
      {ru:['Frost Fresh 1500 мл','Парфюмированный кондиционер','1500 мл'],kk:['Frost Fresh 1500 мл','Парфюмделген кондиционер','1500 мл']},
      {ru:['Флора','Гранулы-парфюм','Аромат для белья'],kk:['Флора','Парфюм-түйіршіктер','Киімге арналған хош иіс']},
      {ru:['Озон','Гранулы-парфюм','Аромат для белья'],kk:['Озон','Парфюм-түйіршіктер','Киімге арналған хош иіс']},
      {ru:['Релакс','Гранулы-парфюм','Аромат для белья'],kk:['Релакс','Парфюм-түйіршіктер','Киімге арналған хош иіс']}
    ],
    dishes:[
      {ru:['Mangosteen 500 мл','Мангостин','500 мл'],kk:['Mangosteen 500 мл','Мангостин хош иісі','500 мл']},
      {ru:['Mangosteen 1100 мл','Мангостин','1100 мл'],kk:['Mangosteen 1100 мл','Мангостин хош иісі','1100 мл']},
      {ru:['Papaya 500 мл','Папайя','500 мл'],kk:['Papaya 500 мл','Папайя хош иісі','500 мл']},
      {ru:['Papaya 1100 мл','Папайя','1100 мл'],kk:['Papaya 1100 мл','Папайя хош иісі','1100 мл']},
      {ru:['Pitahaya 500 мл','Питахайя','500 мл'],kk:['Pitahaya 500 мл','Питахайя хош иісі','500 мл']},
      {ru:['Pitahaya 1100 мл','Питахайя','1100 мл'],kk:['Pitahaya 1100 мл','Питахайя хош иісі','1100 мл']}
    ],
    cleaning:[
      {ru:['Для полов Lemon 1500 мл','Для полов','Лимон'],kk:['Еденге арналған Lemon 1500 мл','Еденге арналған','Лимон']},
      {ru:['Для полов Ocean 1500 мл','Для полов','Морская свежесть'],kk:['Еденге арналған Ocean 1500 мл','Еденге арналған','Теңіз балғындығы']},
      {ru:['Для полов Лайм и фейхоа 5000 мл','Для полов','5000 мл'],kk:['Еденге арналған Лайм және фейхоа 5000 мл','Еденге арналған','5000 мл']},
      {ru:['Для акрила 750 мл, спрей','Для акрила','Не царапает'],kk:['Акрилге арналған спрей 750 мл','Акрилге арналған','Сызбайды']},
      {ru:['Для акрила 500 мл','Для акрила','Не царапает'],kk:['Акрилге арналған 500 мл','Акрилге арналған','Сызбайды']},
      {ru:['Для акрила 750 мл','Для акрила','Не царапает'],kk:['Акрилге арналған 750 мл','Акрилге арналған','Сызбайды']},
      {ru:['Для стёкол Лимон 500 мл','Для стёкол','Без разводов'],kk:['Әйнекке арналған Лимон 500 мл','Әйнекке арналған','Із қалдырмайды']},
      {ru:['Для стёкол Морская свежесть 500 мл','Для стёкол','Антистатик'],kk:['Әйнекке арналған Теңіз балғындығы 500 мл','Әйнекке арналған','Антистатик']},
      {ru:['Против налёта и ржавчины 500 мл','pH 2','Против налёта и ржавчины'],kk:['Қақ пен тотқа қарсы 500 мл','pH 2','Қақ пен тотқа қарсы']}
    ],
    haircare:[
      {ru:['Бальзам-кондиционер Колорист 800 мл','Защита цвета','Кератин'],kk:['Колорист бальзам-кондиционері 800 мл','Түсті сақтау','Кератин']},
      {ru:['Бальзам-кондиционер Hydra-Баланс 800 мл','Увлажнение','D-пантенол'],kk:['Hydra-Баланс бальзам-кондиционері 800 мл','Ылғалдандыру','D-пантенол']},
      {ru:['Бальзам-кондиционер Интенсив 800 мл','Протеиновый уход','Кератин'],kk:['Интенсив бальзам-кондиционері 800 мл','Протеинді күтім','Кератин']},
      {ru:['Шампунь Баланс очищение 800 мл','Баланс очищения','Кератин'],kk:['Тазалау балансы сусабыны 800 мл','Тазалау балансы','Кератин']},
      {ru:['Шампунь Anti-Dandruff 800 мл','Против перхоти','Климбазол 2%'],kk:['Anti-Dandruff сусабыны 800 мл','Қайызғаққа қарсы','Климбазол 2%']},
      {ru:['Бессульфатный шампунь Увлажняющий 800 мл','Бессульфатный','Для окрашенных волос'],kk:['Ылғалдандыратын сульфатсыз сусабын 800 мл','Сульфатсыз','Боялған шашқа арналған']},
      {ru:['Бессульфатный шампунь Интенсивное питание 800 мл','Бессульфатный','Интенсивное питание'],kk:['Қарқынды қоректендіретін сульфатсыз сусабын 800 мл','Сульфатсыз','Қарқынды қоректендіру']}
    ],
    men:[
      {ru:['Ember Wood 300 мл','2 в 1','Для тела и волос'],kk:['Ember Wood 300 мл','2 в 1','Дене мен шашқа арналған']},
      {ru:['Frost Impulse 300 мл','2 в 1','Для тела и волос'],kk:['Frost Impulse 300 мл','2 в 1','Дене мен шашқа арналған']},
      {ru:['Herbal Code 300 мл','2 в 1','Для тела и волос'],kk:['Herbal Code 300 мл','2 в 1','Дене мен шашқа арналған']},
      {ru:['Шампунь с климбазолом 300 мл','Против перхоти','Климбазол'],kk:['Климбазолды сусабын 300 мл','Қайызғаққа қарсы','Климбазол']},
      {ru:['Шампунь с кофеином 300 мл','Укрепление волос','Кофеин'],kk:['Кофеинді сусабын 300 мл','Шашты нығайту','Кофеин']},
      {ru:['Шампунь с ментолом 300 мл','Освежающий эффект','Ментол'],kk:['Ментолды сусабын 300 мл','Балғындық әсері','Ментол']}
    ]
  };

  var orbitControllers={};
  var marqueeRaf=0;
  var marqueeRun=0;

  function setLanguage(next){
    lang=next==='kk'?'kk':'ru';
    try{localStorage.setItem('aromika-language',lang)}catch(e){}
    applyLanguage();
  }

  function applyLanguage(){
    document.documentElement.lang=lang==='kk'?'kk':'ru';

    hero.querySelectorAll('[data-i18n]').forEach(function(el){
      var key=el.dataset.i18n;
      if(headerDict[lang][key]!==undefined)el.textContent=headerDict[lang][key];
    });

    page.querySelectorAll('[data-pf-i18n]').forEach(function(el){
      var key=el.dataset.pfI18n;
      if(common[lang][key]!==undefined)el.textContent=common[lang][key];
    });

    if(footer){
      footer.querySelectorAll('[data-arf-i18n]').forEach(function(el){
        var key=el.dataset.arfI18n;
        if(footerDict[lang][key]!==undefined)el.textContent=footerDict[lang][key];
      });
    }

    document.querySelectorAll('[data-lang]').forEach(function(btn){
      var active=btn.dataset.lang===lang;
      btn.classList.toggle('is-active',active);
      btn.classList.toggle('arf-active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });

    var prev=page.querySelector('.pf-orbit-prev');
    var next=page.querySelector('.pf-orbit-next');
    if(prev)prev.setAttribute('aria-label',lang==='kk'?'Алдыңғы өнім':'Предыдущий продукт');
    if(next)next.setAttribute('aria-label',lang==='kk'?'Келесі өнім':'Следующий продукт');
    page.querySelector('.pf-local-nav').setAttribute('aria-label',lang==='kk'?'Perfect санаттары':'Категории Perfect');

    applyCategory(page.dataset.category||'laundry',false);
  }

  function renderMarquee(text){
    var track=page.querySelector('.pf-marquee-track');
    if(!track)return;

    marqueeRun++;
    var run=marqueeRun;
    if(marqueeRaf)cancelAnimationFrame(marqueeRaf);

    var markup='';
    for(var i=0;i<12;i++)markup+='<span>'+text+'</span>';
    track.innerHTML=markup;
    track.style.transform='translate3d(0,0,0)';

    requestAnimationFrame(function(){
      if(run!==marqueeRun)return;
      var distance=track.scrollWidth/2;
      var speed=prefersReducedMotion?18:34;
      var offset=0;
      var last=0;

      function tick(now){
        if(run!==marqueeRun)return;
        if(!last)last=now;
        var dt=Math.min(50,now-last)/1000;
        last=now;
        offset+=speed*dt;
        if(distance>0&&offset>=distance)offset%=distance;
        track.style.transform='translate3d('+(-offset.toFixed(2))+'px,0,0)';
        marqueeRaf=requestAnimationFrame(tick);
      }
      marqueeRaf=requestAnimationFrame(tick);
    });
  }

  function updateSelected(cat,index){
    var list=products[cat]||[];
    var item=list[index]||list[0];
    if(!item)return;
    var data=item[lang];

    var name=page.querySelector('.pf-selected-name');
    var tags=page.querySelector('.pf-selected-tags');
    if(name)name.textContent=data[0];
    if(tags){
      tags.innerHTML='<span>'+data[1]+'</span><span>'+data[2]+'</span>';
    }
  }

  function activateImages(cat){
    page.querySelectorAll('.pf-products-scene').forEach(function(scene){
      var active=scene.dataset.scene===cat;
      scene.querySelectorAll('img').forEach(function(img){
        if(active){
          img.loading='eager';
          try{img.fetchPriority='high'}catch(e){}
        }else{
          img.loading='lazy';
          try{img.fetchPriority='auto'}catch(e){}
        }
      });
    });
  }

  function applyCategory(cat,animate){
    if(!categories[cat])cat='laundry';
    page.dataset.category=cat;

    var cfg=categories[cat];
    var copy=cfg[lang];

    page.querySelector('.pf-cat-no').textContent=cfg.no;
    page.querySelector('[data-pf-i18n="title"]').textContent=copy.title;
    page.querySelector('[data-pf-i18n="lead"]').textContent=copy.lead;
    page.querySelector('.pf-series-name').textContent=copy.series;

    page.querySelectorAll('.pf-products-scene').forEach(function(scene){
      scene.classList.toggle('is-active',scene.dataset.scene===cat);
    });

    page.querySelectorAll('[data-category]').forEach(function(el){
      var active=el.dataset.category===cat;
      el.classList.toggle('is-active',active);
      if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',active?'true':'false');
    });

    var shop=page.querySelector('.pf-category-shop');
    if(shop)shop.href=cfg.shop;

    activateImages(cat);
    renderMarquee(copy.marquee);

    var controller=orbitControllers[cat];
    if(controller){
      controller.draw();
      updateSelected(cat,controller.getSelected());
    }else{
      updateSelected(cat,0);
    }

    var localLinks=page.querySelector('.pf-local-links');
    var activeLocal=localLinks&&localLinks.querySelector('[data-category="'+cat+'"]');
    if(localLinks&&activeLocal&&window.matchMedia('(max-width:980px)').matches){
      var left=activeLocal.offsetLeft-(localLinks.clientWidth-activeLocal.offsetWidth)/2;
      localLinks.scrollTo({left:Math.max(0,left),behavior:prefersReducedMotion?'auto':'smooth'});
    }

    if(animate){
      var showcase=page.querySelector('#perfect-showcase');
      if(showcase)showcase.scrollIntoView({behavior:prefersReducedMotion?'auto':'smooth',block:'start'});
    }
  }

  function createOrbit(scene){
    if(!scene)return null;
    if(scene.dataset.orbitReady==='1')return orbitControllers[scene.dataset.scene];

    scene.dataset.orbitReady='1';

    var cat=scene.dataset.scene;
    var items=Array.prototype.slice.call(scene.querySelectorAll('.pf-product-card'));
    if(!items.length)return null;

    var N=items.length;
    var TWO=Math.PI*2;
    var STEP=TWO/N;
    var FRONT=Math.PI/2;

    var selectedIndex=0;
    var current=FRONT;
    var from=current;
    var target=current;
    var started=0;
    var moving=false;
    var raf=0;
    var lastInteraction=0;
    var duration=2050;
    var activeDuration=duration;

    function markInteraction(){lastInteraction=Date.now()}

    function normalize(a){
      while(a>Math.PI)a-=TWO;
      while(a<-Math.PI)a+=TWO;
      return a;
    }

    function ease(t){return -(Math.cos(Math.PI*t)-1)/2}

    function depthFor(index){
      var a=index*STEP+current;
      return (Math.sin(a)+1)/2;
    }

    function draw(){
      var w=scene.clientWidth||page.querySelector('.pf-visual').clientWidth||650;
      var h=scene.clientHeight||page.querySelector('.pf-visual').clientHeight||620;
      var compact=window.matchMedia('(max-width:700px)').matches;
      var cx=w*.50;
      var cy=h*.47;

      var isMen=cat==='men';
      var isFabric=cat==='fabriccare';
      var isCleaning=cat==='cleaning';
      var isHair=cat==='haircare';

      var rx=w*(compact?(N>=7?.31:.29):(isMen?.27:(isCleaning?.30:(isFabric?.30:(isHair?.30:(N>=5?.33:.31))))));
      var ry=h*(compact?.145:(isMen?.14:(isCleaning?.145:(isFabric?.15:(isHair?.16:(N>=5?.17:.19))))));

      var frontIndex=0;
      var frontDepth=-1;
      var depth=[];

      items.forEach(function(el,i){
        var a=i*STEP+current;
        var x=cx+Math.cos(a)*rx;
        var y=cy+Math.sin(a)*ry;
        var d=(Math.sin(a)+1)/2;

        var minScale=compact?.56:.58;
        var maxAdd=compact?.50:.54;
        if(isHair){minScale=compact?.62:.64;maxAdd=compact?.48:.52}
        if(isMen){minScale=compact?.60:.61;maxAdd=compact?.47:.50}

        var scale=minScale+d*maxAdd;
        if(i===selectedIndex)scale*=1+0.10*Math.pow(d,2.35);

        var rot=Math.cos(a)*(compact?4:(N>=5?5:6));

        el.style.transform=
          'translate3d('+
          (x-el.offsetWidth/2)+'px,'+
          (y-el.offsetHeight*.72)+'px,'+
          (d*105)+'px) scale('+scale+') rotate('+rot+'deg)';

        el.style.opacity='1';
        el.style.filter='brightness('+(.96+d*.04)+') saturate('+(.94+d*.06)+')';

        depth.push({el:el,d:d,index:i});
        if(d>frontDepth){frontDepth=d;frontIndex=i}
      });

      depth.sort(function(a,b){return a.d-b.d});
      depth.forEach(function(item,z){
        item.el.style.zIndex=String(z+2);
      });

      items.forEach(function(el,i){
        var isSelected=i===selectedIndex;
        el.classList.toggle('is-selected',isSelected);
        el.classList.toggle('is-front',i===frontIndex);
        if(isSelected&&depthFor(i)>.94)el.style.zIndex='99';
      });
    }

    function frame(now){
      var t=Math.min(1,(now-started)/activeDuration);
      current=from+normalize(target-from)*ease(t);
      draw();
      if(t<1){
        raf=requestAnimationFrame(frame);
      }else{
        current=target;
        moving=false;
        draw();
      }
    }

    function go(next){
      if(moving)cancelAnimationFrame(raf);
      from=current;
      target=current+normalize(next-current);
      started=performance.now();
      moving=true;
      activeDuration=prefersReducedMotion?900:duration;
      raf=requestAnimationFrame(frame);
    }

    function front(index){
      selectedIndex=(index+N)%N;
      updateSelected(cat,selectedIndex);
      go(FRONT-selectedIndex*STEP);
    }

    function rotate(dir){front(selectedIndex+dir)}

    items.forEach(function(el,i){
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.setAttribute('aria-label',(el.querySelector('figcaption')||{}).textContent||'Perfect');

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
      var dx=e.clientX-sx;
      var dy=e.clientY-sy;
      if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){
        markInteraction();
        rotate(dx<0?-1:1);
      }
    });

    if(window.matchMedia('(max-width:980px)').matches&&!prefersReducedMotion){
      setInterval(function(){
        if(
          scene.classList.contains('is-active') &&
          !moving &&
          !document.hidden &&
          Date.now()-lastInteraction>10000
        ){
          rotate(-1);
        }
      },9000);
    }

    var controller={
      draw:draw,
      rotate:function(dir){markInteraction();rotate(dir)},
      front:function(index){markInteraction();front(index)},
      getSelected:function(){return selectedIndex}
    };

    orbitControllers[cat]=controller;
    draw();
    return controller;
  }

  page.querySelectorAll('.pf-products-scene').forEach(createOrbit);

  var prev=page.querySelector('.pf-orbit-prev');
  var next=page.querySelector('.pf-orbit-next');

  if(prev)prev.addEventListener('click',function(){
    var ctl=orbitControllers[page.dataset.category];
    if(ctl)ctl.rotate(1);
  });

  if(next)next.addEventListener('click',function(){
    var ctl=orbitControllers[page.dataset.category];
    if(ctl)ctl.rotate(-1);
  });

  page.addEventListener('click',function(e){
    var categoryButton=e.target.closest('[data-category]');
    if(categoryButton){
      applyCategory(categoryButton.dataset.category,true);
    }
  });

  document.addEventListener('click',function(e){
    var langButton=e.target.closest('[data-lang]');
    if(langButton){
      setLanguage(langButton.dataset.lang);
    }
  });

  /* Shared header behavior */
  var burger=hero.querySelector('.ar-burger');
  var menu=hero.querySelector('.ar-menu');
  var overlay=hero.querySelector('.ar-overlay');

  function toggleMenu(open){
    if(!burger||!menu||!overlay)return;
    burger.classList.toggle('open',open);
    menu.classList.toggle('open',open);
    overlay.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  }

  if(burger)burger.addEventListener('click',function(){
    toggleMenu(!menu.classList.contains('open'));
  });
  if(overlay)overlay.addEventListener('click',function(){toggleMenu(false)});
  if(menu)menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){toggleMenu(false)});
  });

  /* Shared theme behavior */
  var THEME_KEY='aromika-theme';
  var systemTheme=null;
  try{systemTheme=window.matchMedia('(prefers-color-scheme:dark)')}catch(e){}

  function storedTheme(){
    try{
      var value=localStorage.getItem(THEME_KEY);
      return value==='dark'||value==='light'?value:null;
    }catch(e){return null}
  }

  function currentTheme(){
    return storedTheme()||(systemTheme&&systemTheme.matches?'dark':'light');
  }

  function reflectTheme(theme){
    document.documentElement.setAttribute('data-aromika-theme',theme);
    document.documentElement.style.colorScheme=theme;

    var btn=hero.querySelector('.ar-theme-toggle');
    if(btn){
      var dark=theme==='dark';
      btn.setAttribute('aria-pressed',dark?'true':'false');
      btn.setAttribute('aria-label',lang==='kk'?(dark?'Жарық тақырыпты қосу':'Қараңғы тақырыпты қосу'):(dark?'Включить светлую тему':'Включить тёмную тему'));
      btn.setAttribute('title',btn.getAttribute('aria-label'));
    }
  }

  reflectTheme(currentTheme());

  var themeButton=hero.querySelector('.ar-theme-toggle');
  if(themeButton)themeButton.addEventListener('click',function(){
    var nextTheme=currentTheme()==='dark'?'light':'dark';
    try{localStorage.setItem(THEME_KEY,nextTheme)}catch(e){}
    reflectTheme(nextTheme);
  });

  if(footer){
    var topButton=footer.querySelector('.arf-to-top');
    if(topButton)topButton.addEventListener('click',function(e){
      e.preventDefault();
      window.scrollTo({top:0,behavior:prefersReducedMotion?'auto':'smooth'});
    });
  }

  window.addEventListener('resize',function(){
    var ctl=orbitControllers[page.dataset.category];
    if(ctl)ctl.draw();
  },{passive:true});

  applyLanguage();
})();
