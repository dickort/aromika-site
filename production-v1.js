
(function(){
  var page=document.getElementById('production-page');
  var hero=document.getElementById('aromika-hero');
  var footer=document.getElementById('aromika-footer');
  if(!page)return;

  var dict={
    ru:{
      products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин',
      heroKicker:'Производство',heroTitle:'От рецептуры —<br><em>до готовой партии.</em>',heroLead:'На собственной производственной площадке Aromika выпускает бытовую химию, мыломоющие средства и косметическую продукцию. Каждый продукт проходит последовательный маршрут подготовки, производства, фасовки и выпуска.',heroProcess:'Как устроен процесс',heroQuality:'Контроль качества',fact1:'год запуска собственного производства',fact2:'площадь производственной площадки',stageCaption:'Производственная система Aromika',stageTank1:'Подготовка',stageTank2:'Смешивание',stageLine:'Фасовка',stagePack:'Упаковка',stageStatus:'Собственное производство с 2005 года',
      processKicker:'Процесс',processTitle:'Типовой маршрут<br><em>жидкого продукта.</em>',processLead:'Конкретная технология зависит от категории и рецептуры. Для жидких моющих и уходовых средств процесс можно представить как последовательность из шести этапов.',processSelected:'Выбранный этап',processNote:'Схема показывает общий принцип. Набор операций различается для разных типов продукции.',step1Title:'Рецептура',step2Title:'Подготовка сырья',step3Title:'Смешивание',step4Title:'Фасовка',step5Title:'Маркировка и упаковка',step6Title:'Готовая партия',
      qualityKicker:'Контроль качества',qualityTitle:'Контроль не в конце.<br><em>Он внутри процесса.</em>',qualityLead:'Качество формируется не одной финальной проверкой. Параметры продукта контролируются на ключевых этапах — от сырья и соблюдения рецептуры до готовой продукции и маркировки.',q1Title:'Сырьё',q1Text:'Проверка соответствия используемых компонентов требованиям технологической документации.',q2Title:'Технологический процесс',q2Text:'Соблюдение рецептуры, последовательности операций и заданных технологических параметров.',q3Title:'Параметры продукта',q3Text:'Контроль характеристик, предусмотренных для конкретной рецептуры и категории продукции.',q4Title:'Готовая продукция',q4Text:'Проверка готового продукта, упаковки и маркировки перед дальнейшим движением партии.',standardTag:'Нормативная база',standardTitle:'ГОСТ / ТУ / требования ЕАЭС',standardText:'Продукция выпускается по применимой нормативной и технической документации; предусмотренные документы соответствия оформляются для соответствующих категорий продукции.',
      capKicker:'Возможности',capTitle:'Разные категории.<br><em>Одна производственная база.</em>',capLead:'Собственное производство позволяет Aromika работать сразу с несколькими направлениями бытовой химии и средств ежедневного ухода.',cap1Title:'Средства для стирки',cap1Text:'Гели, кондиционирующие и другие продукты для ухода за бельём.',cap2Title:'Посуда и уборка',cap2Text:'Жидкие моющие и чистящие средства для повседневных задач дома.',cap3Title:'Мыло',cap3Text:'Жидкое и твёрдое мыло в разных продуктовых линейках и форматах.',cap4Title:'Средства ухода',cap4Text:'Шампуни, гели для душа и другие продукты ежедневного ухода.',
      materialsKicker:'Сырьё и компоненты',materialsTitle:'Рецептура начинается<br><em>с выбора компонентов.</em>',materialsLead:'Aromika использует ингредиенты профильных российских и зарубежных поставщиков. В отдельных рецептурах применяются эфирные масла, экстракты и парфюмерные композиции.',materialsNote:'Конкретный состав всегда определяется назначением продукта и его рецептурой.',m1Title:'Моющая основа',m1Text:'Поверхностно-активные и функциональные компоненты подбираются под задачу конкретного продукта.',m2Title:'Функциональные добавки',m2Text:'Компоненты, отвечающие за необходимые свойства формулы, стабильность и пользовательские характеристики.',m3Title:'Экстракты и масла',m3Text:'Натуральные компоненты используются в тех рецептурах, где они предусмотрены продуктовой концепцией.',m4Title:'Ароматические композиции',m4Text:'Парфюмерные композиции формируют ароматический профиль продуктов разных линеек Aromika.',
      finishKicker:'Финальный этап',finishTitle:'Продукт должен быть готов<br><em>не только по формуле.</em>',finishLead:'После производства важна вся финальная цепочка: фасовка, закрытие упаковки, маркировка, групповая упаковка и подготовка к дальнейшей логистике.',finish1:'Фасовка',finish2:'Закрытие',finish3:'Маркировка',finish4:'Групповая упаковка',finish5:'Передача в логистику',statement:'Собственное производство даёт Aromika возможность управлять продуктом как целостным процессом — от рецептуры до готовой упаковки.',
      nextKicker:'Дальше',nextTitle:'Продолжить знакомство с Aromika',nextLead:'Посмотрите продукты, узнайте больше о компании или обсудите сотрудничество.',next1Tag:'Что выпускаем',next1Title:'Продукция',next2Tag:'Как устроен бизнес',next2Title:'О компании',next3Tag:'Для бизнеса',next3Title:'Партнёрам'
    },
    kk:{
      products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен',
      heroKicker:'Өндіріс',heroTitle:'Рецептурадан —<br><em>дайын партияға дейін.</em>',heroLead:'Aromika өз өндірістік алаңында тұрмыстық химия, жуғыш құралдар және косметикалық өнімдер шығарады. Әр өнім дайындау, өндіру, құю және шығарудың жүйелі кезеңдерінен өтеді.',heroProcess:'Процесс қалай құрылған',heroQuality:'Сапаны бақылау',fact1:'өз өндірісін іске қосқан жыл',fact2:'өндірістік алаңның ауданы',stageCaption:'Aromika өндірістік жүйесі',stageTank1:'Дайындау',stageTank2:'Араластыру',stageLine:'Құю',stagePack:'Қаптау',stageStatus:'2005 жылдан бері өз өндірісі',
      processKicker:'Процесс',processTitle:'Сұйық өнімнің<br><em>типтік маршруты.</em>',processLead:'Нақты технология санат пен рецептураға байланысты. Сұйық жуғыш және күтім құралдары үшін процесті алты кезеңнен тұратын тізбек ретінде көрсетуге болады.',processSelected:'Таңдалған кезең',processNote:'Сызба жалпы қағиданы көрсетеді. Әртүрлі өнім түрлерінде операциялар жиынтығы өзгеше болады.',step1Title:'Рецептура',step2Title:'Шикізатты дайындау',step3Title:'Араластыру',step4Title:'Құю',step5Title:'Таңбалау және қаптау',step6Title:'Дайын партия',
      qualityKicker:'Сапаны бақылау',qualityTitle:'Бақылау тек соңында емес.<br><em>Ол процестің ішінде.</em>',qualityLead:'Сапа бір ғана соңғы тексерумен қалыптаспайды. Өнім параметрлері негізгі кезеңдерде — шикізаттан және рецептураны сақтаудан бастап дайын өнім мен таңбалауға дейін бақыланады.',q1Title:'Шикізат',q1Text:'Пайдаланылатын компоненттердің технологиялық құжаттама талаптарына сәйкестігін тексеру.',q2Title:'Технологиялық процесс',q2Text:'Рецептураны, операциялар ретін және белгіленген технологиялық параметрлерді сақтау.',q3Title:'Өнім параметрлері',q3Text:'Нақты рецептура мен өнім санаты үшін көзделген сипаттамаларды бақылау.',q4Title:'Дайын өнім',q4Text:'Партияның одан әрі қозғалысына дейін дайын өнімді, қаптаманы және таңбалауды тексеру.',standardTag:'Нормативтік база',standardTitle:'ГОСТ / ТШ / ЕАЭО талаптары',standardText:'Өнім қолданылатын нормативтік және техникалық құжаттама бойынша шығарылады; тиісті өнім санаттары үшін көзделген сәйкестік құжаттары рәсімделеді.',
      capKicker:'Мүмкіндіктер',capTitle:'Әртүрлі санаттар.<br><em>Бір өндірістік база.</em>',capLead:'Өз өндірісі Aromika-ға тұрмыстық химия мен күнделікті күтім құралдарының бірнеше бағытымен қатар жұмыс істеуге мүмкіндік береді.',cap1Title:'Кір жуу құралдары',cap1Text:'Киім-кешек күтіміне арналған гельдер, кондиционерлеуші және басқа өнімдер.',cap2Title:'Ыдыс және тазалау',cap2Text:'Үйдегі күнделікті міндеттерге арналған сұйық жуғыш және тазартқыш құралдар.',cap3Title:'Сабын',cap3Text:'Әртүрлі өнім желілері мен форматтардағы сұйық және қатты сабын.',cap4Title:'Күтім құралдары',cap4Text:'Сусабындар, душқа арналған гельдер және басқа күнделікті күтім өнімдері.',
      materialsKicker:'Шикізат және компоненттер',materialsTitle:'Рецептура<br><em>компонент таңдаудан басталады.</em>',materialsLead:'Aromika бейінді ресейлік және шетелдік жеткізушілердің ингредиенттерін пайдаланады. Жекелеген рецептураларда эфир майлары, сығындылар және парфюмерлік композициялар қолданылады.',materialsNote:'Нақты құрам әрқашан өнімнің мақсаты мен оның рецептурасына байланысты анықталады.',m1Title:'Жуғыш негіз',m1Text:'Беттік-белсенді және функционалдық компоненттер нақты өнімнің міндетіне қарай таңдалады.',m2Title:'Функционалдық қоспалар',m2Text:'Формуланың қажетті қасиеттеріне, тұрақтылығына және тұтынушылық сипаттамаларына жауап беретін компоненттер.',m3Title:'Сығындылар мен майлар',m3Text:'Табиғи компоненттер өнім тұжырымдамасында көзделген рецептураларда пайдаланылады.',m4Title:'Хош иісті композициялар',m4Text:'Парфюмерлік композициялар Aromika-ның әртүрлі желілеріндегі өнімдердің хош иіс бейінін қалыптастырады.',
      finishKicker:'Соңғы кезең',finishTitle:'Өнім тек формула бойынша ғана емес,<br><em>толық дайын болуы керек.</em>',finishLead:'Өндірістен кейінгі бүкіл соңғы тізбек маңызды: құю, қаптаманы жабу, таңбалау, топтық қаптау және одан әрі логистикаға дайындау.',finish1:'Құю',finish2:'Жабу',finish3:'Таңбалау',finish4:'Топтық қаптау',finish5:'Логистикаға беру',statement:'Өз өндірісі Aromika-ға өнімді рецептурадан дайын қаптамаға дейін біртұтас процесс ретінде басқаруға мүмкіндік береді.',
      nextKicker:'Келесі',nextTitle:'Aromika-мен танысуды жалғастырыңыз',nextLead:'Өнімдерді қараңыз, компания туралы көбірек біліңіз немесе ынтымақтастықты талқылаңыз.',next1Tag:'Не шығарамыз',next1Title:'Өнімдер',next2Tag:'Бизнес қалай құрылған',next2Title:'Компания туралы',next3Tag:'Бизнес үшін',next3Title:'Серіктестерге'
    }
  };

  var processData={
    ru:[
      {n:'01',t:'Рецептура',x:'Перед запуском производства продукт опирается на утверждённую рецептуру и технологическую документацию, которые задают состав и параметры процесса.'},
      {n:'02',t:'Подготовка сырья',x:'Компоненты подготавливаются к технологическому процессу в соответствии с рецептурой и требованиями конкретного продукта.'},
      {n:'03',t:'Смешивание',x:'Компоненты вводятся в заданной последовательности, а процесс ведётся с соблюдением установленных технологических параметров.'},
      {n:'04',t:'Фасовка',x:'После получения готовой массы продукт подаётся на фасовку в потребительскую упаковку соответствующего формата.'},
      {n:'05',t:'Маркировка и упаковка',x:'Упаковка закрывается, маркируется и подготавливается к групповой упаковке и дальнейшему перемещению.'},
      {n:'06',t:'Готовая партия',x:'После предусмотренных проверок готовая продукция оформляется как партия и передаётся на следующий этап — хранение и логистику.'}
    ],
    kk:[
      {n:'01',t:'Рецептура',x:'Өндіріс басталар алдында өнім бекітілген рецептура мен технологиялық құжаттамаға сүйенеді; олар құрам мен процесс параметрлерін белгілейді.'},
      {n:'02',t:'Шикізатты дайындау',x:'Компоненттер рецептураға және нақты өнім талаптарына сәйкес технологиялық процеске дайындалады.'},
      {n:'03',t:'Араластыру',x:'Компоненттер белгіленген ретпен енгізіліп, процесс белгіленген технологиялық параметрлерді сақтай отырып жүргізіледі.'},
      {n:'04',t:'Құю',x:'Дайын масса алынғаннан кейін өнім тиісті форматтағы тұтынушылық қаптамаға құю кезеңіне беріледі.'},
      {n:'05',t:'Таңбалау және қаптау',x:'Қаптама жабылып, таңбаланып, топтық қаптауға және одан әрі тасымалдауға дайындалады.'},
      {n:'06',t:'Дайын партия',x:'Көзделген тексерулерден кейін дайын өнім партия ретінде рәсімделіп, келесі кезеңге — сақтау мен логистикаға беріледі.'}
    ]
  };

  var footerDict={
    ru:{brandText:'Казахстанский производитель бытовой химии и косметической продукции.',shopBtn:'Интернет-магазин',company:'Компания',about:'О компании',production:'Производство',contacts:'Контакты',careers:'Работа в компании',brands:'Бренды',partners:'Партнёрам',distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',buyers:'Покупателям',catalog:'Каталог',online:'Интернет-магазин',where:'Где купить',office:'Головной офис',city:'Костанай, Казахстан',phone:'Телефон',feedback:'Обратная связь',top:'Наверх'},
    kk:{brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',shopBtn:'Интернет-дүкен',company:'Компания',about:'Компания туралы',production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',brands:'Брендтер',partners:'Серіктестерге',distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',buyers:'Сатып алушыларға',catalog:'Каталог',online:'Интернет-дүкен',where:'Қайдан сатып алуға болады',office:'Бас кеңсе',city:'Қостанай, Қазақстан',phone:'Телефон',feedback:'Кері байланыс',top:'Жоғары'}
  };

  var currentLang='ru',currentStep=0;
  function updateProcess(){
    var item=processData[currentLang][currentStep];
    var n=page.querySelector('.ap-process-number'),t=page.querySelector('.ap-process-title'),x=page.querySelector('.ap-process-text'),core=page.querySelector('.ap-pv-core b');
    if(n)n.textContent=item.n;if(t)t.textContent=item.t;if(x)x.textContent=item.x;if(core)core.textContent=item.n;
    page.querySelectorAll('.ap-step').forEach(function(b,i){b.classList.toggle('is-active',i===currentStep)});
  }
  function apply(lang){
    if(lang!=='kk')lang='ru';currentLang=lang;
    document.documentElement.lang=lang==='kk'?'kk':'ru';
    page.classList.toggle('ap-lang-kk',lang==='kk');
    page.querySelectorAll('[data-ap-i18n]').forEach(function(el){var k=el.getAttribute('data-ap-i18n');if(dict[lang][k]!=null)el.textContent=dict[lang][k]});
    page.querySelectorAll('[data-ap-i18n-html]').forEach(function(el){var k=el.getAttribute('data-ap-i18n-html');if(dict[lang][k]!=null)el.innerHTML=dict[lang][k]});
    if(hero){hero.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(dict[lang][k]!=null)el.textContent=dict[lang][k]});hero.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('is-active',b.getAttribute('data-lang')===lang)})}
    if(footer){footer.querySelectorAll('[data-arf-i18n]').forEach(function(el){var k=el.getAttribute('data-arf-i18n');if(footerDict[lang][k]!=null)el.textContent=footerDict[lang][k]});footer.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('arf-active',b.getAttribute('data-lang')===lang)})}
    updateProcess();
    try{localStorage.setItem('aromika-language',lang)}catch(e){}
  }
  function savedLang(){try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return'ru'}}
  apply(savedLang());

  page.querySelectorAll('.ap-step').forEach(function(b,i){b.addEventListener('click',function(){currentStep=i;updateProcess()})});
  document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(!b)return;var l=b.getAttribute('data-lang');if(l==='ru'||l==='kk'){apply(l);try{window.dispatchEvent(new CustomEvent('aromika:languagechange',{detail:{lang:l}}))}catch(err){}}});
  window.addEventListener('aromika:languagechange',function(e){if(e.detail)apply(e.detail.lang)});

  if(hero){
    var burger=hero.querySelector('.ar-burger'),menu=hero.querySelector('.ar-menu'),overlay=hero.querySelector('.ar-overlay');
    function toggle(open){if(!burger||!menu||!overlay)return;burger.classList.toggle('open',open);menu.classList.toggle('open',open);overlay.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''}
    if(burger)burger.addEventListener('click',function(){toggle(!menu.classList.contains('open'))});
    if(overlay)overlay.addEventListener('click',function(){toggle(false)});
    if(menu)menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
  }

  var reveal=page.querySelectorAll('.ap-reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-visible');io.unobserve(x.target)}})},{threshold:.10,rootMargin:'0px 0px -30px 0px'});reveal.forEach(function(x){io.observe(x)})}else{reveal.forEach(function(x){x.classList.add('is-visible')})}
  if(footer){var top=footer.querySelector('.arf-to-top');if(top)top.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})})}
})();
