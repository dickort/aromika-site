(function(){try{var k='aromika-theme',s=localStorage.getItem(k),d=s?s==='dark':window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches,t=d?'dark':'light';document.documentElement.setAttribute('data-aromika-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();

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
    ru:{brandKicker:'Бренд Aromika',view:'Смотреть продукты',buy:'Купить онлайн',buySelected:'Купить выбранный продукт',allPerfect:'Все товары Perfect',series:'Серия',chooseCategory:'Выберите категорию',stripTitle:'Продукция Perfect',stripText:'Основные линейки Perfect собраны по назначению — выберите нужную категорию.',catLaundry:'Стирка',catFabricCare:'Аромат для белья',catDishes:'Посуда',catCleaning:'Уборка',catHaircare:'Уход за волосами',catMen:'Мужская серия',allEyebrow:'Больше категорий',allTitle:'Вся продукция Perfect — в интернет-магазине',allText:'Полный ассортимент Perfect доступен в интернет-магазине Aromika.',allButton:'Смотреть весь ассортимент',orbitHint:'Нажмите на продукт или используйте стрелки'},
    kk:{brandKicker:'Aromika бренді',view:'Өнімдерді көру',buy:'Онлайн сатып алу',buySelected:'Таңдалған өнімді сатып алу',allPerfect:'Perfect барлық тауарлары',series:'Серия',chooseCategory:'Санатты таңдаңыз',stripTitle:'Perfect өнімдері',stripText:'Perfect негізгі желілері мақсаты бойынша топтастырылған — қажетті санатты таңдаңыз.',catLaundry:'Кір жуу',catFabricCare:'Киімге арналған хош иіс',catDishes:'Ыдыс жуу',catCleaning:'Тазалау',catHaircare:'Шаш күтімі',catMen:'Ерлер сериясы',allEyebrow:'Қосымша санаттар',allTitle:'Perfect өнімдерінің толық ассортименті — интернет-дүкенде',allText:'Perfect өнімдерінің толық ассортименті Aromika интернет-дүкенінде қолжетімді.',allButton:'Барлық ассортиментті көру',orbitHint:'Өнімді басыңыз немесе көрсеткілерді қолданыңыз'}
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

  var productInfoLabels={"ru":{"selected":"Выбранный продукт","purpose":"Назначение","feature":"Ключевая особенность","format":"Формат","shopMatched":"Карточка товара доступна в Aromika Shop","shopFallback":"Ищите этот товар в полном ассортименте Perfect","buyMatched":"Купить выбранный продукт","buyFallback":"Найти в магазине","price":"Цена на aromika.shop","priceNote":"Цена из каталога Aromika Shop","priceFallback":"Уточнить в магазине"},"kk":{"selected":"Таңдалған өнім","purpose":"Мақсаты","feature":"Негізгі ерекшелік","format":"Формат","shopMatched":"Тауар карточкасы Aromika Shop дүкенінде қолжетімді","shopFallback":"Бұл тауарды Perfect толық ассортиментінен іздеңіз","buyMatched":"Таңдалған өнімді сатып алу","buyFallback":"Дүкеннен табу","price":"aromika.shop бағасы","priceNote":"Aromika Shop каталогындағы баға","priceFallback":"Дүкеннен нақтылау"}};

  var productMeta={"laundry":[{"ru":{"name":"Perfect Mix Colors 1500 мл","desc":"Гель для повседневной стирки цветного белья.","purpose":"Цветное бельё","feature":"Энзимная формула","format":"1500 мл"},"kk":{"name":"Perfect Mix Colors 1500 мл","desc":"Түсті киімді күнделікті жууға арналған гель.","purpose":"Түсті киім","feature":"Энзимді формула","format":"1500 мл"},"shop":{"matched":true,"product_id":"119533","product_code":"46","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-perfect-aromika-color-1500-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_WG_Color_1500.png","image_source":"cs-cart","export_price":1806.0}},{"ru":{"name":"Perfect Baby Care 1500 мл","desc":"Гипоаллергенный гель для стирки детского белья.","purpose":"Детское бельё","feature":"Гипоаллергенный","format":"1500 мл"},"kk":{"name":"Perfect Baby Care 1500 мл","desc":"Балалар киімін жууға арналған гипоаллергенді гель.","purpose":"Балалар киімі","feature":"Гипоаллергенді","format":"1500 мл"},"shop":{"matched":true,"product_id":"130638","product_code":"542","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-perfect-aromika-kids-1500-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_WG_Kids_1500.png","image_source":"cs-cart","export_price":1806.0}},{"ru":{"name":"Perfect Universal 1500 мл","desc":"Универсальный гель для повседневной стирки.","purpose":"Универсальная стирка","feature":"Энзимная формула","format":"1500 мл"},"kk":{"name":"Perfect Universal 1500 мл","desc":"Күнделікті жууға арналған әмбебап гель.","purpose":"Әмбебап жуу","feature":"Энзимді формула","format":"1500 мл"},"shop":{"matched":true,"product_id":"119532","product_code":"44","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-perfect-aromika-universal-1500-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_WG_Uni_1500.png","image_source":"cs-cart","export_price":1806.0}},{"ru":{"name":"Perfect Universal 3300 мл","desc":"Универсальный гель для повседневной стирки в увеличенном формате.","purpose":"Универсальная стирка","feature":"Энзимная формула","format":"3300 мл"},"kk":{"name":"Perfect Universal 3300 мл","desc":"Күнделікті жууға арналған үлкейтілген форматтағы әмбебап гель.","purpose":"Әмбебап жуу","feature":"Энзимді формула","format":"3300 мл"},"shop":{"matched":true,"product_id":"97462","product_code":"39","url":"https://aromika.shop/vse-tovary/perfect-gel-dlya-stirki-3300ml-universal-ru/","image":"https://aromika.shop/images/detailed/138/Perfect_WG_Universal_3300_.webp","image_source":"cs-cart","export_price":3416.0}},{"ru":{"name":"Perfect Universal 4300 мл","desc":"Универсальный гель для повседневной стирки в большом формате.","purpose":"Универсальная стирка","feature":"Энзимная формула","format":"4300 мл"},"kk":{"name":"Perfect Universal 4300 мл","desc":"Күнделікті жууға арналған үлкен форматтағы әмбебап гель.","purpose":"Әмбебап жуу","feature":"Энзимді формула","format":"4300 мл"},"shop":{"matched":true,"product_id":"97465","product_code":"36","url":"https://aromika.shop/vse-tovary/perfect-gel-dlya-stirki-4300ml-universal/","image":"https://aromika.shop/images/detailed/137/Perfect_WG_Universal_4300.webp","image_source":"cs-cart","export_price":4301.0}}],"fabriccare":[{"ru":{"name":"Blossom Dream 1500 мл","desc":"Парфюмированный кондиционер для белья с ароматом Blossom Dream.","purpose":"Кондиционирование белья","feature":"Парфюмированный аромат","format":"1500 мл"},"kk":{"name":"Blossom Dream 1500 мл","desc":"Blossom Dream хош иісі бар парфюмделген киім кондиционері.","purpose":"Киімді кондициялау","feature":"Парфюмделген хош иіс","format":"1500 мл"},"shop":{"matched":true,"product_id":"130199","product_code":"508","url":"https://aromika.shop/vse-tovary/kondicioner-perfect-blossem-dream-1500-ml/","image":"https://aromika.shop/images/detailed/138/CND_Perfect_Blossom_Fresh_1500.png","image_source":"cs-cart","export_price":1553.0}},{"ru":{"name":"Crystal Fresh 1500 мл","desc":"Парфюмированный кондиционер для белья с ароматом Crystal Fresh.","purpose":"Кондиционирование белья","feature":"Парфюмированный аромат","format":"1500 мл"},"kk":{"name":"Crystal Fresh 1500 мл","desc":"Crystal Fresh хош иісі бар парфюмделген киім кондиционері.","purpose":"Киімді кондициялау","feature":"Парфюмделген хош иіс","format":"1500 мл"},"shop":{"matched":true,"product_id":"130198","product_code":"507","url":"https://aromika.shop/vse-tovary/kondicioner-perfect-crystal-fresh-1500-ml/","image":"https://aromika.shop/images/detailed/138/CND_Perfect_Crystal_Fresh_1500.png","image_source":"cs-cart","export_price":1553.0}},{"ru":{"name":"Frost Fresh 1500 мл","desc":"Парфюмированный кондиционер для белья с ароматом Frost Fresh.","purpose":"Кондиционирование белья","feature":"Парфюмированный аромат","format":"1500 мл"},"kk":{"name":"Frost Fresh 1500 мл","desc":"Frost Fresh хош иісі бар парфюмделген киім кондиционері.","purpose":"Киімді кондициялау","feature":"Парфюмделген хош иіс","format":"1500 мл"},"shop":{"matched":true,"product_id":"130200","product_code":"509","url":"https://aromika.shop/vse-tovary/kondicioner-perfect-frost-fresh-1500-ml/","image":"https://aromika.shop/images/detailed/138/CND_Perfect_Frost_Fresh_1500.png","image_source":"cs-cart","export_price":1553.0}},{"ru":{"name":"Гранулы-парфюм Perfect «Флора»","desc":"Гранулы-парфюм для более выразительного аромата белья после стирки.","purpose":"Аромат для белья","feature":"Композиция «Флора»","format":"Гранулы-парфюм"},"kk":{"name":"Perfect «Флора» парфюм-түйіршіктері","desc":"Жуудан кейін киім хош иісін айқынырақ етуге арналған парфюм-түйіршіктер.","purpose":"Киімге арналған хош иіс","feature":"«Флора» композициясы","format":"Парфюм-түйіршіктер"},"shop":{"matched":true,"product_id":"130627","product_code":"534","url":"https://aromika.shop/vse-tovary/kondicionery-perefct-v-granulah-flora/","image":"https://aromika.shop/images/detailed/138/GCND_Perfect_Flr.webp","image_source":"cs-cart","export_price":2550.0}},{"ru":{"name":"Гранулы-парфюм Perfect «Озон»","desc":"Гранулы-парфюм для более выразительного аромата белья после стирки.","purpose":"Аромат для белья","feature":"Композиция «Озон»","format":"Гранулы-парфюм"},"kk":{"name":"Perfect «Озон» парфюм-түйіршіктері","desc":"Жуудан кейін киім хош иісін айқынырақ етуге арналған парфюм-түйіршіктер.","purpose":"Киімге арналған хош иіс","feature":"«Озон» композициясы","format":"Парфюм-түйіршіктер"},"shop":{"matched":true,"product_id":"130629","product_code":"532","url":"https://aromika.shop/vse-tovary/kondicionery-perefct-v-granulah-ozon/","image":"https://aromika.shop/images/detailed/138/GCND_Perfect_Oz.webp","image_source":"cs-cart","export_price":2550.0}},{"ru":{"name":"Гранулы-парфюм Perfect «Релакс»","desc":"Гранулы-парфюм для более выразительного аромата белья после стирки.","purpose":"Аромат для белья","feature":"Композиция «Релакс»","format":"Гранулы-парфюм"},"kk":{"name":"Perfect «Релакс» парфюм-түйіршіктері","desc":"Жуудан кейін киім хош иісін айқынырақ етуге арналған парфюм-түйіршіктер.","purpose":"Киімге арналған хош иіс","feature":"«Релакс» композициясы","format":"Парфюм-түйіршіктер"},"shop":{"matched":true,"product_id":"130626","product_code":"535","url":"https://aromika.shop/vse-tovary/kondicionery-perefct-v-granulah-relaks/","image":"https://aromika.shop/images/detailed/138/GCND_Perfect_Rlx.webp","image_source":"cs-cart","export_price":2550.0}}],"dishes":[{"ru":{"name":"Perfect Mangosteen 500 мл","desc":"Гель для ежедневного мытья посуды с ароматом мангостина.","purpose":"Мытьё посуды","feature":"Аромат мангостина","format":"500 мл"},"kk":{"name":"Perfect Mangosteen 500 мл","desc":"Мангостин хош иісі бар күнделікті ыдыс жуу гелі.","purpose":"Ыдыс жуу","feature":"Мангостин хош иісі","format":"500 мл"},"shop":{"matched":true,"product_id":"97353","product_code":"95","url":"https://aromika.shop/vse-tovary/perfect-gel-d-posudy-500ml-mangosteen/","image":"https://aromika.shop/images/detailed/137/Perfect_DG_Mangosteen_500.webp","image_source":"cs-cart","export_price":564.0}},{"ru":{"name":"Perfect Mangosteen 1100 мл","desc":"Гель для ежедневного мытья посуды с ароматом мангостина.","purpose":"Мытьё посуды","feature":"Аромат мангостина","format":"1100 мл"},"kk":{"name":"Perfect Mangosteen 1100 мл","desc":"Мангостин хош иісі бар күнделікті ыдыс жуу гелі.","purpose":"Ыдыс жуу","feature":"Мангостин хош иісі","format":"1100 мл"},"shop":{"matched":true,"product_id":"97349","product_code":"91","url":"https://aromika.shop/vse-tovary/perfect-gel-d-posudy-1100ml-mangosteen/","image":"https://aromika.shop/images/detailed/138/Perfect_DG_Mangosteen_1100.webp","image_source":"cs-cart","export_price":1265.0}},{"ru":{"name":"Perfect Papaya 500 мл","desc":"Гель для ежедневного мытья посуды с ароматом папайи.","purpose":"Мытьё посуды","feature":"Аромат папайи","format":"500 мл"},"kk":{"name":"Perfect Papaya 500 мл","desc":"Папайя хош иісі бар күнделікті ыдыс жуу гелі.","purpose":"Ыдыс жуу","feature":"Папайя хош иісі","format":"500 мл"},"shop":{"matched":true,"product_id":"97354","product_code":"96","url":"https://aromika.shop/vse-tovary/perfect-gel-d-posudy-500ml-papaya/","image":"https://aromika.shop/images/detailed/137/Perfect_DG_Papaya_500.webp","image_source":"cs-cart","export_price":564.0}},{"ru":{"name":"Perfect Papaya 1100 мл","desc":"Гель для ежедневного мытья посуды с ароматом папайи.","purpose":"Мытьё посуды","feature":"Аромат папайи","format":"1100 мл"},"kk":{"name":"Perfect Papaya 1100 мл","desc":"Папайя хош иісі бар күнделікті ыдыс жуу гелі.","purpose":"Ыдыс жуу","feature":"Папайя хош иісі","format":"1100 мл"},"shop":{"matched":true,"product_id":"97350","product_code":"92","url":"https://aromika.shop/vse-tovary/perfect-gel-d-posudy-1100ml-papaya/","image":"https://aromika.shop/images/detailed/138/Perfect_DG_Papaya_1100.webp","image_source":"cs-cart","export_price":1265.0}},{"ru":{"name":"Perfect Pitahaya 500 мл","desc":"Гель для ежедневного мытья посуды с ароматом питахайи.","purpose":"Мытьё посуды","feature":"Аромат питахайи","format":"500 мл"},"kk":{"name":"Perfect Pitahaya 500 мл","desc":"Питахайя хош иісі бар күнделікті ыдыс жуу гелі.","purpose":"Ыдыс жуу","feature":"Питахайя хош иісі","format":"500 мл"},"shop":{"matched":true,"product_id":"97355","product_code":"97","url":"https://aromika.shop/vse-tovary/perfect-gel-d-posudy-500ml-pitahaya/","image":"https://aromika.shop/images/detailed/137/Perfect_DG_Pitahaya_500.webp","image_source":"cs-cart","export_price":564.0}},{"ru":{"name":"Perfect Pitahaya 1100 мл","desc":"Гель для ежедневного мытья посуды с ароматом питахайи.","purpose":"Мытьё посуды","feature":"Аромат питахайи","format":"1100 мл"},"kk":{"name":"Perfect Pitahaya 1100 мл","desc":"Питахайя хош иісі бар күнделікті ыдыс жуу гелі.","purpose":"Ыдыс жуу","feature":"Питахайя хош иісі","format":"1100 мл"},"shop":{"matched":true,"product_id":"97351","product_code":"93","url":"https://aromika.shop/vse-tovary/perfect-gel-d-posudy-1100ml-pitahaya/","image":"https://aromika.shop/images/detailed/138/Perfect_DG_Pitahaya_1100.webp","image_source":"cs-cart","export_price":1265.0}}],"cleaning":[{"ru":{"name":"Perfect для полов Lemon 1500 мл","desc":"Средство для мытья полов, стен и поверхностей с ароматом лимона.","purpose":"Полы, стены и поверхности","feature":"Помогает устранять неприятный запах","format":"1500 мл"},"kk":{"name":"Perfect еденге арналған Lemon 1500 мл","desc":"Лимон хош иісі бар еден, қабырға және беттерді жууға арналған құрал.","purpose":"Еден, қабырға және беттер","feature":"Жағымсыз иісті кетіруге көмектеседі","format":"1500 мл"},"shop":{"matched":true,"product_id":"130006","product_code":"320","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-polov-perfect-aromika-ocean-1500-ml-ru/","image":"https://aromika.shop/images/detailed/137/Perfect_FloorCleaner_Lemon_1500.webp","image_source":"cs-cart","export_price":1265.0}},{"ru":{"name":"Perfect для полов Ocean 1500 мл","desc":"Средство для мытья полов, стен и поверхностей с ароматом морской свежести.","purpose":"Полы, стены и поверхности","feature":"Помогает устранять неприятный запах","format":"1500 мл"},"kk":{"name":"Perfect еденге арналған Ocean 1500 мл","desc":"Теңіз балғындығы хош иісі бар еден, қабырға және беттерді жууға арналған құрал.","purpose":"Еден, қабырға және беттер","feature":"Жағымсыз иісті кетіруге көмектеседі","format":"1500 мл"},"shop":{"matched":true,"product_id":"130005","product_code":"319","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-polov-perfect-aromika-ocean-1500-ml/","image":"https://aromika.shop/images/detailed/137/Perfect_FloorCleaner_Ocean_1500.webp","image_source":"cs-cart","export_price":1265.0}},{"ru":{"name":"Perfect для полов Лайм и фейхоа 5000 мл","desc":"Средство для мытья полов в большом формате.","purpose":"Мытьё полов","feature":"Без разводов","format":"5000 мл"},"kk":{"name":"Perfect еденге арналған Лайм және фейхоа 5000 мл","desc":"Еден жууға арналған үлкен форматтағы құрал.","purpose":"Еден жуу","feature":"Із қалдырмайды","format":"5000 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/cleaning-floor-lime-feijoa-5000.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Perfect для акрила, спрей 750 мл","desc":"Спрей для бережного очищения акриловых поверхностей.","purpose":"Акриловые поверхности","feature":"Не царапает","format":"Спрей, 750 мл"},"kk":{"name":"Perfect акрилге арналған спрей 750 мл","desc":"Акрил беттерін ұқыпты тазалауға арналған спрей.","purpose":"Акрил беттері","feature":"Сызбайды","format":"Спрей, 750 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/cleaning-acrylic-spray-750.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Perfect для акрила 500 мл","desc":"Средство для бережного очищения акриловых поверхностей.","purpose":"Акриловые поверхности","feature":"Бережно очищает, не царапает","format":"500 мл"},"kk":{"name":"Perfect акрилге арналған 500 мл","desc":"Акрил беттерін ұқыпты тазалауға арналған құрал.","purpose":"Акрил беттері","feature":"Ұқыпты тазартады, сызбайды","format":"500 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/cleaning-acrylic-gel-500.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Perfect для акрила 750 мл","desc":"Средство для бережного очищения акриловых поверхностей.","purpose":"Акриловые поверхности","feature":"Бережно очищает, не царапает","format":"750 мл"},"kk":{"name":"Perfect акрилге арналған 750 мл","desc":"Акрил беттерін ұқыпты тазалауға арналған құрал.","purpose":"Акрил беттері","feature":"Ұқыпты тазартады, сызбайды","format":"750 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/cleaning-acrylic-gel-750.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Perfect для стёкол Лимон 500 мл","desc":"Средство для очищения стёкол с ароматом лимона.","purpose":"Стёкла и зеркальные поверхности","feature":"Без разводов • антистатик","format":"500 мл"},"kk":{"name":"Perfect әйнекке арналған Лимон 500 мл","desc":"Лимон хош иісі бар әйнек тазалауға арналған құрал.","purpose":"Әйнек және айна беттері","feature":"Із қалдырмайды • антистатик","format":"500 мл"},"shop":{"matched":true,"product_id":"129976","product_code":"290","url":"https://aromika.shop/vse-tovary/zhidkost-dlya-mytya-stekol-i-zerkal-perfect-aromika-sochnyy-limon-500-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_GlassCleaner_Lemon_500.webp","image_source":"cs-cart","export_price":794.0}},{"ru":{"name":"Perfect для стёкол Морская свежесть 500 мл","desc":"Средство для очищения стёкол с ароматом морской свежести.","purpose":"Стёкла и зеркальные поверхности","feature":"Без разводов • антистатик","format":"500 мл"},"kk":{"name":"Perfect әйнекке арналған Теңіз балғындығы 500 мл","desc":"Теңіз балғындығы хош иісі бар әйнек тазалауға арналған құрал.","purpose":"Әйнек және айна беттері","feature":"Із қалдырмайды • антистатик","format":"500 мл"},"shop":{"matched":true,"product_id":"129975","product_code":"289","url":"https://aromika.shop/vse-tovary/zhidkost-dlya-mytya-stekol-i-zerkal-perfect-aromika-morskaya-svezhest-500-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_GlassCleaner_Sea_500.webp","image_source":"cs-cart","export_price":794.0}},{"ru":{"name":"Perfect против налёта и ржавчины 500 мл","desc":"Кислотное средство для удаления налёта и ржавчины.","purpose":"Налёт и ржавчина","feature":"pH 2 • для хромированных поверхностей и сплавов","format":"500 мл"},"kk":{"name":"Perfect қақ пен тотқа қарсы 500 мл","desc":"Қақ пен тотты кетіруге арналған қышқылды құрал.","purpose":"Қақ пен тот","feature":"pH 2 • хромдалған беттер мен қорытпаларға арналған","format":"500 мл"},"shop":{"matched":true,"product_id":"130652","product_code":"556","url":"https://aromika.shop/vse-tovary/perfect-sprey-ot-naleta-i-rzhavchiny-500-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_AS_500.webp","image_source":"cs-cart","export_price":770.0}}],"haircare":[{"ru":{"name":"Бальзам-кондиционер Perfect Колорист 800 мл","desc":"Уход для окрашенных волос: восстановление и поддержание яркости цвета.","purpose":"Окрашенные волосы","feature":"Кератин • масла макадамии, ши и авокадо","format":"800 мл"},"kk":{"name":"Perfect Колорист бальзам-кондиционері 800 мл","desc":"Боялған шашқа күтім: қалпына келтіру және түс қанықтығын сақтау.","purpose":"Боялған шаш","feature":"Кератин • макадамия, ши және авокадо майлары","format":"800 мл"},"shop":{"matched":true,"product_id":"130181","product_code":"492","url":"https://aromika.shop/vse-tovary/balzam-kondicioner-perfect-aromika-keratin-vosstanovlenie-800-ml/","image":"https://aromika.shop/images/detailed/138/BC_Perfect_Color_800.webp","image_source":"cs-cart","export_price":2231.0}},{"ru":{"name":"Бальзам-кондиционер Perfect Hydra-Баланс 800 мл","desc":"Увлажняющий и восстанавливающий уход для мягкости и гладкости волос.","purpose":"Увлажнение и восстановление","feature":"D-пантенол • масла авокадо и репейное","format":"800 мл"},"kk":{"name":"Perfect Hydra-Баланс бальзам-кондиционері 800 мл","desc":"Шаштың жұмсақтығы мен тегістігіне арналған ылғалдандыратын және қалпына келтіретін күтім.","purpose":"Ылғалдандыру және қалпына келтіру","feature":"D-пантенол • авокадо және ошаған майлары","format":"800 мл"},"shop":{"matched":true,"product_id":"130182","product_code":"493","url":"https://aromika.shop/vse-tovary/balzam-kondicioner-perfect-aromika-d-pantenol-uvlazhnenie-800-ml/","image":"https://aromika.shop/images/detailed/138/BC_Perfect_Hydra_800.webp","image_source":"cs-cart","export_price":2231.0}},{"ru":{"name":"Бальзам-кондиционер Perfect Интенсив 800 мл","desc":"Протеиновый уход для защиты, гладкости и блеска волос.","purpose":"Протеиновый уход","feature":"Кератин • масло ши","format":"800 мл"},"kk":{"name":"Perfect Интенсив бальзам-кондиционері 800 мл","desc":"Шашты қорғау, тегістік пен жылтырға арналған протеинді күтім.","purpose":"Протеинді күтім","feature":"Кератин • ши майы","format":"800 мл"},"shop":{"matched":true,"product_id":"130183","product_code":"511","url":"https://aromika.shop/vse-tovary/balzam-kondicioner-perfect-aromika-keratin-zaschita-800-ml/","image":"https://aromika.shop/images/detailed/138/BC_Perfect_Intensive_800.webp","image_source":"cs-cart","export_price":2231.0}},{"ru":{"name":"Шампунь Perfect Баланс очищение 800 мл","desc":"Шампунь для нормальных и жирных волос с акцентом на баланс очищения.","purpose":"Нормальные и жирные волосы","feature":"Баланс очищения • кератин","format":"800 мл"},"kk":{"name":"Perfect Тазалау балансы сусабыны 800 мл","desc":"Қалыпты және майлы шашқа арналған, тазалау балансына бағытталған сусабын.","purpose":"Қалыпты және майлы шаш","feature":"Тазалау балансы • кератин","format":"800 мл"},"shop":{"matched":true,"product_id":"119843","product_code":"136","url":"https://aromika.shop/vse-tovary/shampun-perfect-aromika-balans-ochischeniya-800-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_Sh_Balance_800.webp","image_source":"cs-cart","export_price":1806.0}},{"ru":{"name":"Шампунь Perfect Anti-Dandruff 800 мл","desc":"Шампунь против перхоти для мягкого очищения и ежедневного ухода.","purpose":"Против перхоти","feature":"Климбазол 2%","format":"800 мл"},"kk":{"name":"Perfect Anti-Dandruff сусабыны 800 мл","desc":"Жұмсақ тазалау мен күнделікті күтімге арналған қайызғаққа қарсы сусабын.","purpose":"Қайызғаққа қарсы","feature":"Климбазол 2%","format":"800 мл"},"shop":{"matched":true,"product_id":"119844","product_code":"137","url":"https://aromika.shop/vse-tovary/shampun-perfect-aromika-ot-perhoti-800-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_Sh_Climba_800.webp","image_source":"cs-cart","export_price":1806.0}},{"ru":{"name":"Бессульфатный шампунь Perfect Увлажняющий 800 мл","desc":"Бессульфатный уход для окрашенных и осветлённых волос.","purpose":"Окрашенные и осветлённые волосы","feature":"Сохранение цвета • термозащита","format":"800 мл"},"kk":{"name":"Perfect ылғалдандыратын сульфатсыз сусабыны 800 мл","desc":"Боялған және ағартылған шашқа арналған сульфатсыз күтім.","purpose":"Боялған және ағартылған шаш","feature":"Түсті сақтау • термоқорғаныс","format":"800 мл"},"shop":{"matched":true,"product_id":"129951","product_code":"285","url":"https://aromika.shop/vse-tovary/bessulfatnyy-shampun-perfect-aromika-dlya-okrashennyh-volos-800-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_Sh_Color_800.webp","image_source":"cs-cart","export_price":2093.0}},{"ru":{"name":"Бессульфатный шампунь Perfect Интенсивное питание 800 мл","desc":"Бессульфатный шампунь для интенсивного питания и более гладких волос.","purpose":"Интенсивное питание","feature":"Масло макадамии","format":"800 мл"},"kk":{"name":"Perfect Қарқынды қоректендіру сульфатсыз сусабыны 800 мл","desc":"Қарқынды қоректендіруге және шаштың тегістігіне арналған сульфатсыз сусабын.","purpose":"Қарқынды қоректендіру","feature":"Макадамия майы","format":"800 мл"},"shop":{"matched":true,"product_id":"129952","product_code":"284","url":"https://aromika.shop/vse-tovary/bessulfatnyy-shampun-perfect-aromika-intensivnoe-pitanie-800-ml/","image":"https://aromika.shop/images/detailed/138/Perfect_Sh_Intensive_800.webp","image_source":"cs-cart","export_price":2093.0}}],"men":[{"ru":{"name":"Perfect Men Ember Wood 300 мл","desc":"Гель для душа 2 в 1 для тела и волос с ароматом Ember Wood.","purpose":"Тело и волосы","feature":"Формат 2 в 1","format":"300 мл"},"kk":{"name":"Perfect Men Ember Wood 300 мл","desc":"Ember Wood хош иісі бар дене мен шашқа арналған 2 в 1 душ гелі.","purpose":"Дене және шаш","feature":"2 в 1 форматы","format":"300 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/men-shower-ember-wood-300.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Perfect Men Frost Impulse 300 мл","desc":"Гель для душа 2 в 1 для тела и волос с ароматом Frost Impulse.","purpose":"Тело и волосы","feature":"Формат 2 в 1","format":"300 мл"},"kk":{"name":"Perfect Men Frost Impulse 300 мл","desc":"Frost Impulse хош иісі бар дене мен шашқа арналған 2 в 1 душ гелі.","purpose":"Дене және шаш","feature":"2 в 1 форматы","format":"300 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/men-shower-frost-impulse-300.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Perfect Men Herbal Code 300 мл","desc":"Гель для душа 2 в 1 для тела и волос с ароматом Herbal Code.","purpose":"Тело и волосы","feature":"Формат 2 в 1","format":"300 мл"},"kk":{"name":"Perfect Men Herbal Code 300 мл","desc":"Herbal Code хош иісі бар дене мен шашқа арналған 2 в 1 душ гелі.","purpose":"Дене және шаш","feature":"2 в 1 форматы","format":"300 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/men-shower-herbal-code-300.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Шампунь Perfect с климбазолом 300 мл","desc":"Функциональный шампунь для ухода против перхоти.","purpose":"Против перхоти","feature":"Климбазол","format":"300 мл"},"kk":{"name":"Perfect климбазолды сусабыны 300 мл","desc":"Қайызғаққа қарсы күтімге арналған функционалды сусабын.","purpose":"Қайызғаққа қарсы","feature":"Климбазол","format":"300 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/men-shampoo-climbazole-300.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Шампунь Perfect с кофеином 300 мл","desc":"Функциональный шампунь для ухода и укрепления волос.","purpose":"Укрепление волос","feature":"Кофеин","format":"300 мл"},"kk":{"name":"Perfect кофеинді сусабыны 300 мл","desc":"Шаш күтімі мен нығайтуға арналған функционалды сусабын.","purpose":"Шашты нығайту","feature":"Кофеин","format":"300 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/men-shampoo-caffeine-300.webp","image_source":"github-fallback","export_price":null}},{"ru":{"name":"Шампунь Perfect с ментолом 300 мл","desc":"Функциональный шампунь с освежающим эффектом.","purpose":"Освежающий уход","feature":"Ментол","format":"300 мл"},"kk":{"name":"Perfect ментолды сусабыны 300 мл","desc":"Балғындық әсері бар функционалды сусабын.","purpose":"Балғын күтім","feature":"Ментол","format":"300 мл"},"shop":{"matched":false,"product_id":null,"product_code":null,"url":null,"image":"https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/images/perfect/men-shampoo-menthol-300.webp","image_source":"github-fallback","export_price":null}}]};

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

    var tokens=text.split('•').map(function(x){return x.trim()}).filter(Boolean);
    if(!tokens.length)return;

    function chip(label){
      var brand=label.toUpperCase()==='PERFECT';
      return '<span class="pf-marquee-chip'+(brand?' is-brand':'')+'">'+
        '<i aria-hidden="true"><b></b></i>'+
        '<span>'+label+'</span>'+
      '</span>';
    }

    var sequence='';
    for(var repeat=0;repeat<2;repeat++){
      tokens.forEach(function(label){sequence+=chip(label)});
    }

    track.innerHTML=
      '<div class="pf-marquee-group">'+sequence+'</div>'+
      '<div class="pf-marquee-group" aria-hidden="true">'+sequence+'</div>';

    track.style.setProperty('animation','none','important');
    track.style.setProperty('transform','translate3d(0,0,0)','important');

    requestAnimationFrame(function(){
      if(runId!==marqueeRunId)return;

      var firstGroup=track.querySelector('.pf-marquee-group');
      if(!firstGroup)return;

      var distance=firstGroup.getBoundingClientRect().width;
      if(!distance)return;

      var offset=0;
      var lastTime=0;
      var speed=prefersReducedMotion?16:30;

      function tick(now){
        if(runId!==marqueeRunId)return;
        if(!lastTime)lastTime=now;

        var dt=Math.min(50,now-lastTime)/1000;
        lastTime=now;
        offset+=speed*dt;

        if(offset>=distance)offset%=distance;

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

  function updateProductInfo(cat,index){
    var list=productMeta[cat];
    if(!list||!list.length)return;

    index=((index%list.length)+list.length)%list.length;
    var entry=list[index];
    var item=entry&&entry[lang];
    if(!item)return;

    var labels=productInfoLabels[lang];
    var el;

    el=page.querySelector('.pf-product-info-label');
    if(el)el.textContent=labels.selected;

    el=page.querySelector('.pf-product-info-count');
    if(el)el.textContent=(index+1)+' / '+list.length;

    el=page.querySelector('.pf-product-info-name');
    if(el)el.textContent=item.name;

    el=page.querySelector('.pf-product-info-desc');
    if(el)el.textContent=item.desc;

    el=page.querySelector('.pf-info-purpose-label');
    if(el)el.textContent=labels.purpose;

    el=page.querySelector('.pf-info-feature-label');
    if(el)el.textContent=labels.feature;

    el=page.querySelector('.pf-info-format-label');
    if(el)el.textContent=labels.format;

    el=page.querySelector('.pf-info-purpose');
    if(el)el.textContent=item.purpose;

    el=page.querySelector('.pf-info-feature');
    if(el)el.textContent=item.feature;

    el=page.querySelector('.pf-info-format');
    if(el)el.textContent=item.format;

    var shop=(entry&&entry.shop)||{matched:false,url:null};
    var buyBtn=page.querySelector('.pf-selected-buy');
    var buyLabel=buyBtn&&buyBtn.querySelector('span');
    var stateText=page.querySelector('.pf-product-shop-text');
    var state=page.querySelector('.pf-product-shop-state');

    var priceLabel=page.querySelector('.pf-product-price-label');
    var priceValue=page.querySelector('.pf-product-price-value');
    var priceNote=page.querySelector('.pf-product-price-note');

    if(priceLabel)priceLabel.textContent=labels.price;
    if(priceNote)priceNote.textContent=labels.priceNote;

    function formatPrice(value){
      var n=Number(value);
      if(!isFinite(n)||n<=0)return null;
      return Math.round(n).toLocaleString(lang==='kk'?'kk-KZ':'ru-RU')+' ₸';
    }

    if(shop.matched&&shop.url){
      if(buyBtn)buyBtn.href=shop.url;
      if(buyLabel)buyLabel.textContent=labels.buyMatched;
      if(stateText)stateText.textContent=labels.shopMatched;
      if(state)state.setAttribute('data-shop-state','matched');

      var formatted=formatPrice(shop.export_price);
      if(priceValue){
        priceValue.textContent=formatted||labels.priceFallback;
        priceValue.classList.toggle('is-fallback',!formatted);
      }
    }else{
      if(buyBtn)buyBtn.href="https://aromika.shop/index.php?dispatch=products.search&match=all&subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=perfect+aromika";
      if(buyLabel)buyLabel.textContent=labels.buyFallback;
      if(stateText)stateText.textContent=labels.shopFallback;
      if(state)state.setAttribute('data-shop-state','fallback');
      if(priceValue){
        priceValue.textContent=labels.priceFallback;
        priceValue.classList.add('is-fallback');
      }
    }
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
    var shopBtn=page.querySelector('.pf-all-perfect');if(shopBtn)shopBtn.href="https://aromika.shop/index.php?dispatch=products.search&match=all&subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=perfect+aromika";
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
      updateProductInfo(scene.getAttribute('data-scene'),selectedIndex);
      go(FRONT-selectedIndex*STEP);
    }

    function rotate(dir){
      front(selectedIndex+dir);
    }

    items.forEach(function(el,i){
      el.setAttribute('role','button');el.setAttribute('tabindex','0');var cardImg=el.querySelector('img');el.setAttribute('aria-label',(cardImg&&cardImg.getAttribute('alt'))||'Продукт Perfect');

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
      rotate:function(dir){markInteraction();rotate(dir)},
      getSelected:function(){return selectedIndex}
    };
    orbitControllers[scene.dataset.scene]=controller;
    draw();
    updateProductInfo(scene.getAttribute('data-scene'),selectedIndex);
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
      if(ctl){
        ctl.draw();
        updateProductInfo(cat,ctl.getSelected());
      }
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

window.__AROMIKA_PERFECT_VERSION__='v9.1-price-fix';
window.__AROMIKA_PERFECT_BOOT__='ready';