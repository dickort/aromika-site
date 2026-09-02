(function(){
 'use strict';
 var page=document.getElementById('company-coop-page');
 var header=document.getElementById('aromika-hero');
 var footer=document.getElementById('aromika-footer');
 if(!page||!header)return;

 var dict={
  ru:{
   heroKicker:'Aromika',heroTitle1:'Производим.',heroTitle2:'Доставляем.',heroTitle3:'Работаем вместе.',
   heroLead:'Aromika объединяет собственное производство, региональные продажи, склады и логистику. Это позволяет нам развивать свои бренды и выстраивать понятную работу с партнёрами.',
   heroCompany:'О компании',heroCoop:'Сотрудничество',proof1:'работаем на рынке Казахстана',proof2:'структурных подразделений',proof3Strong:'4 звена',proof3:'производство · дистрибуция · продажи · логистика',
   companyKicker:'О компании',companyTitle:'Всё необходимое —<br><em>внутри одной системы.</em>',companyLead:'Мы не отделяем продукт от его движения к клиенту: производство, коммерческая работа и поставка связаны между собой.',
   sys1Title:'Производство',sys1Text:'Собственные линейки бытовой химии и средств ежедневного ухода.',sys1Link:'Подробнее',sys2Title:'Дистрибуция',sys2Text:'Работа с собственным и партнёрским ассортиментом через региональную инфраструктуру.',sys3Title:'Продажи',sys3Text:'Торговые команды работают с розницей, оптом, HoReCa и корпоративными клиентами.',sys4Title:'Логистика',sys4Text:'Склады, комплектование заказов и организация региональной доставки.',
   coopKicker:'Сотрудничество',coopTitle:'Открыты к новым<br><em>деловым связям.</em>',coopLead:'Запросы покупателей обрабатывают региональные филиалы, а предложения поставщиков — центральный офис Aromika.',
   repTag:'Клиентам и партнёрам',repTitle:'Связаться с представителем',repText:'Получите актуальный прайс-лист, запросите сертификаты или пригласите торгового агента в вашу торговую точку.',repItem1:'Прайс-лист',repItem2:'Сертификаты',repItem3:'Визит агента',repCta:'Открыть в ROMI',
   supplyTag:'Поставщикам',supplyTitle:'Предложить сотрудничество',supplyText:'Рассматриваем предложения от типографий, производителей упаковки и тары, поставщиков сырья, отдушек, комплектующих, оборудования и других решений для производства бытовой химии и косметической продукции.',supplyItem1:'Типография и этикетки',supplyItem2:'Упаковка и тара',supplyItem3:'Сырьё и отдушки',supplyItem4:'Оборудование',supplyItem5:'Технические услуги',supplyCta:'Выбрать направление в ROMI',
   endKicker:'Aromika',endTitle:'Продукт создаётся здесь.<br><em>Партнёрство начинается с разговора.</em>',endCta:'Связаться'
  },
  kk:{
   heroKicker:'Aromika',heroTitle1:'Өндіреміз.',heroTitle2:'Жеткіземіз.',heroTitle3:'Бірге жұмыс істейміз.',
   heroLead:'Aromika өз өндірісін, өңірлік сатуды, қоймалар мен логистиканы біріктіреді. Бұл өз брендтерімізді дамытуға және серіктестермен түсінікті жұмыс құруға мүмкіндік береді.',
   heroCompany:'Компания туралы',heroCoop:'Ынтымақтастық',proof1:'Қазақстан нарығында жұмыс істейміз',proof2:'құрылымдық бөлімше',proof3Strong:'4 буын',proof3:'өндіріс · дистрибуция · сату · логистика',
   companyKicker:'Компания туралы',companyTitle:'Қажетті нәрсенің бәрі —<br><em>бір жүйенің ішінде.</em>',companyLead:'Біз өнімді оның клиентке қозғалысынан бөлмейміз: өндіріс, коммерциялық жұмыс және жеткізу өзара байланысты.',
   sys1Title:'Өндіріс',sys1Text:'Тұрмыстық химия мен күнделікті күтімге арналған өз өнім желілері.',sys1Link:'Толығырақ',sys2Title:'Дистрибуция',sys2Text:'Өңірлік инфрақұрылым арқылы өз және серіктес ассортиментімен жұмыс.',sys3Title:'Сату',sys3Text:'Сауда командалары бөлшек саудамен, көтерме компаниялармен, HoReCa және корпоративтік клиенттермен жұмыс істейді.',sys4Title:'Логистика',sys4Text:'Қоймалар, тапсырыстарды жинақтау және өңірлік жеткізуді ұйымдастыру.',
   coopKicker:'Ынтымақтастық',coopTitle:'Жаңа іскерлік<br><em>байланыстарға ашықпыз.</em>',coopLead:'Сатып алушылардың сұрауларын өңірлік филиалдар, ал жеткізушілердің ұсыныстарын Aromika орталық кеңсесі қарайды.',
   repTag:'Клиенттер мен серіктестерге',repTitle:'Өкілмен байланысу',repText:'Өзекті прайс-парақты немесе өнім сертификаттарын алыңыз, сауда агентін сауда нүктеңізге шақырыңыз.',repItem1:'Прайс-парақ',repItem2:'Сертификаттар',repItem3:'Агенттің келуі',repCta:'ROMI арқылы ашу',
   supplyTag:'Жеткізушілерге',supplyTitle:'Ынтымақтастық ұсыну',supplyText:'Баспаханалардан, қаптама мен ыдыс өндірушілерінен, шикізат, хош иістендіргіштер, жиынтықтаушы бөлшектер, жабдықтар және тұрмыстық химия мен косметикалық өнімдер өндірісіне арналған басқа шешімдер жеткізушілерінен ұсыныстарды қараймыз.',supplyItem1:'Баспахана және заттаңбалар',supplyItem2:'Қаптама және ыдыс',supplyItem3:'Шикізат және хош иістендіргіштер',supplyItem4:'Жабдық',supplyItem5:'Техникалық қызметтер',supplyCta:'ROMI-де бағытты таңдау',
   endKicker:'Aromika',endTitle:'Өнім осында жасалады.<br><em>Серіктестік әңгімеден басталады.</em>',endCta:'Байланысу'
  }
 };

 var headerDict={ru:{products:'Продукция',brands:'Бренды',about:'Сотрудничество',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин'},kk:{products:'Өнімдер',brands:'Брендтер',about:'Ынтымақтастық',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен'}};
 var footerDict={ru:{brandText:'Казахстанский производитель бытовой химии и косметической продукции.',shopBtn:'Интернет-магазин',company:'Компания',about:'Сотрудничество',production:'Производство',contacts:'Контакты',careers:'Работа в компании',brands:'Бренды',allBrands:'Все бренды',partners:'Партнёрам',distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',buyers:'Покупателям',catalog:'Каталог',online:'Интернет-магазин',where:'Где купить',office:'Головной офис',city:'Костанай, Казахстан',phone:'Телефон',feedback:'Обратная связь',top:'Наверх'},kk:{brandText:'Қазақстандық тұрмыстық химия және косметикалық өнім өндірушісі.',shopBtn:'Интернет-дүкен',company:'Компания',about:'Ынтымақтастық',production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',brands:'Брендтер',allBrands:'Барлық брендтер',partners:'Серіктестерге',distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',buyers:'Сатып алушыларға',catalog:'Каталог',online:'Интернет-дүкен',where:'Қайдан сатып алуға болады',office:'Бас кеңсе',city:'Қостанай, Қазақстан',phone:'Телефон',feedback:'Кері байланыс',top:'Жоғары'}};

 function getLang(){try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return'ru'}}
 function applyLang(lang){
  if(lang!=='kk')lang='ru';
  document.documentElement.lang=lang;
  page.querySelectorAll('[data-cc]').forEach(function(el){var key=el.getAttribute('data-cc');if(dict[lang][key]!=null)el.textContent=dict[lang][key]});
  page.querySelectorAll('[data-cc-html]').forEach(function(el){var key=el.getAttribute('data-cc-html');if(dict[lang][key]!=null)el.innerHTML=dict[lang][key]});
  header.querySelectorAll('[data-i18n]').forEach(function(el){var key=el.getAttribute('data-i18n');if(headerDict[lang][key]!=null)el.textContent=headerDict[lang][key]});
  if(footer)footer.querySelectorAll('[data-arf-i18n]').forEach(function(el){var key=el.getAttribute('data-arf-i18n');if(footerDict[lang][key]!=null)el.textContent=footerDict[lang][key]});
  document.querySelectorAll('[data-lang]').forEach(function(button){var active=button.getAttribute('data-lang')===lang;button.classList.toggle('is-active',active);button.classList.toggle('arf-active',active)});
  try{localStorage.setItem('aromika-language',lang)}catch(e){}
 }

 document.addEventListener('click',function(event){var button=event.target.closest('[data-lang]');if(button)applyLang(button.getAttribute('data-lang'))});
 window.addEventListener('storage',function(event){if(event.key==='aromika-language')applyLang(getLang())});

 var burger=header.querySelector('.ar-burger'),menu=header.querySelector('.ar-menu'),overlay=header.querySelector('.ar-overlay');
 function mobileMenu(open){if(!burger||!menu||!overlay)return;burger.classList.toggle('open',open);menu.classList.toggle('open',open);overlay.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''}
 if(burger)burger.addEventListener('click',function(){mobileMenu(!menu.classList.contains('open'))});
 if(overlay)overlay.addEventListener('click',function(){mobileMenu(false)});
 if(menu)menu.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){mobileMenu(false)})});

 var THEME_KEY='aromika-theme';
 function currentTheme(){return document.documentElement.getAttribute('data-aromika-theme')||'light'}
 function renderTheme(){var theme=currentTheme()==='dark'?'dark':'light';document.documentElement.setAttribute('data-aromika-theme',theme);document.documentElement.style.colorScheme=theme;document.querySelectorAll('.ar-theme-toggle').forEach(function(button){button.setAttribute('aria-pressed',theme==='dark'?'true':'false')})}
 document.querySelectorAll('.ar-theme-toggle').forEach(function(button){button.addEventListener('click',function(){var theme=currentTheme()==='dark'?'light':'dark';try{localStorage.setItem(THEME_KEY,theme)}catch(e){}document.documentElement.setAttribute('data-aromika-theme',theme);renderTheme()})});

 var revealItems=page.querySelectorAll('.cc-reveal');
 if('IntersectionObserver'in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -35px 0px'});revealItems.forEach(function(item){observer.observe(item)})}else{revealItems.forEach(function(item){item.classList.add('is-visible')})}
 if(footer){var toTop=footer.querySelector('.arf-to-top');if(toTop)toTop.addEventListener('click',function(event){event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})})}

 applyLang(getLang());
 renderTheme();
})();
