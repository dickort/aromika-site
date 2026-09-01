
(function(){
  var page=document.getElementById('company-page');
  var hero=document.getElementById('aromika-hero');
  var footer=document.getElementById('aromika-footer');
  if(!page)return;

  var dict={
    ru:{
      products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин',
      heroKicker:'О компании',heroTitle:'Компания, которая<br><em>выросла вокруг продукта.</em>',heroLead:'Aromika начиналась с торговли и дистрибуции. Сегодня производство, региональные продажи, склады и логистика работают как одна система.',heroHistory:'История компании',heroSystem:'Как устроена Aromika',stageCenter:'ЕДИНАЯ СИСТЕМА',nodeProduction:'Производство',nodeDistribution:'Дистрибуция',nodeSales:'Продажи',nodeLogistics:'Логистика',stageCaption:'От продукта до поставки',
      historyKicker:'История',historyTitle:'От торговой компании<br>к собственной системе.',historyLead:'История Aromika — это не один скачок, а последовательное расширение возможностей: от дистрибуции к производству и собственной операционной инфраструктуре.',time1Tag:'Начало',time1Title:'Работа на рынке Казахстана',time1Text:'Компания развивала торговое направление, клиентскую базу и дистрибуцию бытовой химии, парфюмерии и косметики.',time2Title:'Запуск собственного производства',time2Text:'Aromika начала выпускать бытовую химию, мыломоющие средства и косметическую продукцию собственного производства.',time3Tag:'Рост',time3Title:'Расширение ассортимента и сети',time3Text:'Вместе с продуктовой линейкой развивались региональные торговые команды, складская инфраструктура и собственная организация доставки.',time4Tag:'Сегодня',time4Title:'Производство и дистрибуция в одном контуре',time4Text:'Aromika объединяет собственные продукты и операционную систему, которая помогает доводить ассортимент от производства до торговой точки и покупателя.',
      systemKicker:'Aromika сегодня',systemTitle:'Четыре части.<br><em>Одна компания.</em>',systemLead:'Сильная сторона Aromika — не отдельная функция, а связка производства, дистрибуции, продаж и логистики.',sys1Title:'Производство',sys1Text:'Собственные продуктовые линейки и выпуск бытовой химии и средств ежедневного ухода.',sys2Title:'Дистрибуция',sys2Text:'Работа с ассортиментом, клиентской базой и региональным покрытием через структурные подразделения.',sys3Title:'Продажи',sys3Text:'Торговые агенты, супервайзеры и мерчендайзинг обеспечивают работу с рынком на местах.',sys4Title:'Логистика',sys4Text:'Складские процессы, комплектование заказов и собственная организация региональной доставки.',
      infraKicker:'Инфраструктура',infraTitle:'За дистрибуцией<br>стоят <em>люди и процессы.</em>',infraLead:'Сеть Aromika — это не только точки на карте. Каждый заказ проходит через продажи, склад, комплектование и доставку.',infraStat:'структурных подразделений в системе компании',infra1Title:'Торговые команды',infra1Text:'Агенты, супервайзеры и мерчендайзеры работают с клиентами и торговыми точками.',infra2Title:'Склады',infra2Text:'Приёмка, хранение, комплектование и подготовка товаров к дальнейшей поставке.',infra3Title:'Транспортная логистика',infra3Text:'Маршруты и доставка организуются как часть собственной операционной системы.',infra4Title:'Региональная работа',infra4Text:'Подразделения помогают поддерживать присутствие продукции и связь с рынком в регионах.',
      flowKicker:'Операционная модель',flowTitle:'Один маршрут —<br>от заявки до поставки.',flowLead:'Собственная инфраструктура связывает коммерческую работу и физическое движение товара в один понятный процесс.',flow1:'Заявка клиента',flow2:'Комплектование',flow3:'Подготовка к отгрузке',flow4:'Доставка',statement:'Мы развиваем не набор отдельных функций, а систему, в которой производство, продажи и поставка усиливают друг друга.',
      nextKicker:'Дальше',nextTitle:'Узнайте Aromika с нужной стороны',nextLead:'Отдельные разделы раскрывают производство, условия сотрудничества и работу в компании подробнее.',next1Tag:'Как создаём продукт',next1Title:'Производство',next2Tag:'Как работаем с бизнесом',next2Title:'Партнёрам',next3Tag:'Как стать частью команды',next3Title:'Работа в компании'
    },
    kk:{
      products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен',
      heroKicker:'Компания туралы',heroTitle:'Өнімнің айналасында<br><em>өскен компания.</em>',heroLead:'Aromika сауда және дистрибуциядан басталды. Бүгінде өндіріс, өңірлік сату, қоймалар мен логистика біртұтас жүйе ретінде жұмыс істейді.',heroHistory:'Компания тарихы',heroSystem:'Aromika қалай құрылған',stageCenter:'БІРТҰТАС ЖҮЙЕ',nodeProduction:'Өндіріс',nodeDistribution:'Дистрибуция',nodeSales:'Сату',nodeLogistics:'Логистика',stageCaption:'Өнімнен жеткізуге дейін',
      historyKicker:'Тарих',historyTitle:'Сауда компаниясынан<br>өз жүйесіне дейін.',historyLead:'Aromika тарихы — бір сәттік секіріс емес, мүмкіндіктердің біртіндеп кеңеюі: дистрибуциядан өндіріске және жеке операциялық инфрақұрылымға дейін.',time1Tag:'Бастау',time1Title:'Қазақстан нарығындағы жұмыс',time1Text:'Компания сауда бағытын, клиенттік базаны және тұрмыстық химия, парфюмерия мен косметика дистрибуциясын дамытты.',time2Title:'Өз өндірісін іске қосу',time2Text:'Aromika өз өндірісіндегі тұрмыстық химия, жуғыш құралдар және косметикалық өнімдер шығара бастады.',time3Tag:'Өсу',time3Title:'Ассортимент пен желіні кеңейту',time3Text:'Өнім желісімен бірге өңірлік сауда командалары, қойма инфрақұрылымы және жеткізуді ұйымдастыру жүйесі дамыды.',time4Tag:'Бүгін',time4Title:'Өндіріс пен дистрибуция бір контурда',time4Text:'Aromika өз өнімдері мен ассортиментті өндірістен сауда нүктесіне және сатып алушыға жеткізуге көмектесетін операциялық жүйені біріктіреді.',
      systemKicker:'Aromika бүгін',systemTitle:'Төрт бөлік.<br><em>Бір компания.</em>',systemLead:'Aromika-ның күші — жеке функцияда емес, өндіріс, дистрибуция, сату және логистиканың байланысында.',sys1Title:'Өндіріс',sys1Text:'Өз өнім желілері және тұрмыстық химия мен күнделікті күтім құралдарын шығару.',sys2Title:'Дистрибуция',sys2Text:'Құрылымдық бөлімшелер арқылы ассортиментпен, клиенттік базамен және өңірлік қамтумен жұмыс.',sys3Title:'Сату',sys3Text:'Сауда агенттері, супервайзерлер мен мерчендайзинг жергілікті нарықпен жұмысты қамтамасыз етеді.',sys4Title:'Логистика',sys4Text:'Қойма процестері, тапсырыстарды жинақтау және өңірлік жеткізуді өз күшімен ұйымдастыру.',
      infraKicker:'Инфрақұрылым',infraTitle:'Дистрибуцияның артында<br><em>адамдар мен процестер тұр.</em>',infraLead:'Aromika желісі — картадағы нүктелер ғана емес. Әр тапсырыс сату, қойма, жинақтау және жеткізу кезеңдерінен өтеді.',infraStat:'компания жүйесіндегі құрылымдық бөлімше',infra1Title:'Сауда командалары',infra1Text:'Агенттер, супервайзерлер мен мерчендайзерлер клиенттермен және сауда нүктелерімен жұмыс істейді.',infra2Title:'Қоймалар',infra2Text:'Қабылдау, сақтау, жинақтау және тауарды кейінгі жеткізуге дайындау.',infra3Title:'Көлік логистикасы',infra3Text:'Маршруттар мен жеткізу компанияның жеке операциялық жүйесінің бөлігі ретінде ұйымдастырылады.',infra4Title:'Өңірлік жұмыс',infra4Text:'Бөлімшелер өңірлерде өнімнің болуын және нарықпен байланысты қолдауға көмектеседі.',
      flowKicker:'Операциялық модель',flowTitle:'Бір маршрут —<br>өтінімнен жеткізуге дейін.',flowLead:'Жеке инфрақұрылым коммерциялық жұмысты және тауардың физикалық қозғалысын бір түсінікті процеске біріктіреді.',flow1:'Клиент өтінімі',flow2:'Жинақтау',flow3:'Жөнелтуге дайындау',flow4:'Жеткізу',statement:'Біз жеке функциялар жиынтығын емес, өндіріс, сату және жеткізу бір-бірін күшейтетін жүйені дамытамыз.',
      nextKicker:'Келесі',nextTitle:'Aromika-ны қажетті қырынан таныңыз',nextLead:'Жеке бөлімдер өндірісті, ынтымақтастық шарттарын және компаниядағы жұмысты толығырақ ашады.',next1Tag:'Өнімді қалай жасаймыз',next1Title:'Өндіріс',next2Tag:'Бизнеспен қалай жұмыс істейміз',next2Title:'Серіктестерге',next3Tag:'Командаға қалай қосылуға болады',next3Title:'Компаниядағы жұмыс'
    }
  };

  var footerDict={
    ru:{brandText:'Казахстанский производитель бытовой химии и косметической продукции.',shopBtn:'Интернет-магазин',company:'Компания',about:'О компании',production:'Производство',contacts:'Контакты',careers:'Работа в компании',brands:'Бренды',partners:'Партнёрам',distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',buyers:'Покупателям',catalog:'Каталог',online:'Интернет-магазин',where:'Где купить',office:'Головной офис',city:'Костанай, Казахстан',phone:'Телефон',feedback:'Обратная связь',top:'Наверх'},
    kk:{brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',shopBtn:'Интернет-дүкен',company:'Компания',about:'Компания туралы',production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',brands:'Брендтер',partners:'Серіктестерге',distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',buyers:'Сатып алушыларға',catalog:'Каталог',online:'Интернет-дүкен',where:'Қайдан сатып алуға болады',office:'Бас кеңсе',city:'Қостанай, Қазақстан',phone:'Телефон',feedback:'Кері байланыс',top:'Жоғары'}
  };

  function apply(lang){
    if(lang!=='kk')lang='ru';
    document.documentElement.lang=lang==='kk'?'kk':'ru';
    page.classList.toggle('ac-lang-kk',lang==='kk');
    page.querySelectorAll('[data-ac-i18n]').forEach(function(el){var k=el.getAttribute('data-ac-i18n');if(dict[lang][k]!=null)el.textContent=dict[lang][k]});
    page.querySelectorAll('[data-ac-i18n-html]').forEach(function(el){var k=el.getAttribute('data-ac-i18n-html');if(dict[lang][k]!=null)el.innerHTML=dict[lang][k]});
    if(hero){hero.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(dict[lang][k]!=null)el.textContent=dict[lang][k]});hero.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('is-active',b.getAttribute('data-lang')===lang)})}
    if(footer){footer.querySelectorAll('[data-arf-i18n]').forEach(function(el){var k=el.getAttribute('data-arf-i18n');if(footerDict[lang][k]!=null)el.textContent=footerDict[lang][k]});footer.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('arf-active',b.getAttribute('data-lang')===lang)})}
    try{localStorage.setItem('aromika-language',lang)}catch(e){}
  }
  function lang(){try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return'ru'}}
  apply(lang());
  document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(!b)return;var l=b.getAttribute('data-lang');if(l==='ru'||l==='kk'){apply(l);try{window.dispatchEvent(new CustomEvent('aromika:languagechange',{detail:{lang:l}}))}catch(err){}}});
  window.addEventListener('aromika:languagechange',function(e){if(e.detail)apply(e.detail.lang)});

  if(hero){
    var burger=hero.querySelector('.ar-burger'),menu=hero.querySelector('.ar-menu'),overlay=hero.querySelector('.ar-overlay');
    function toggle(open){if(!burger||!menu||!overlay)return;burger.classList.toggle('open',open);menu.classList.toggle('open',open);overlay.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''}
    if(burger)burger.addEventListener('click',function(){toggle(!menu.classList.contains('open'))});
    if(overlay)overlay.addEventListener('click',function(){toggle(false)});
    if(menu)menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
  }

  var reveal=page.querySelectorAll('.ac-reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-visible');io.unobserve(x.target)}})},{threshold:.10,rootMargin:'0px 0px -30px 0px'});reveal.forEach(function(x){io.observe(x)})}else{reveal.forEach(function(x){x.classList.add('is-visible')})}

  if(footer){var top=footer.querySelector('.arf-to-top');if(top)top.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})})}
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
