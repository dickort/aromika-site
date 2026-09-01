(function(){
'use strict';
if(window.__AROMIKA_ASSISTANT_V5__) return;
window.__AROMIKA_ASSISTANT_V5__=true;

var LANG_KEY='aromika-language';
var TEASER_KEY='aromika-assistant-v5-teaser-dismissed';
var FEEDBACK_EMAIL='info@aromika.info';

function scriptBase(){
  var src='';
  try{src=document.currentScript&&document.currentScript.src||''}catch(e){}
  if(!src){var list=document.getElementsByTagName('script');for(var i=list.length-1;i>=0;i--){if((list[i].src||'').indexOf('assistant-v5.js')>=0){src=list[i].src;break}}}
  if(window.AROMIKA_ASSISTANT_ASSET_BASE) return String(window.AROMIKA_ASSISTANT_ASSET_BASE).replace(/\/?$/,'/');
  return src ? src.replace(/[^\/?#]+(?:[?#].*)?$/,'romi/') : '/romi/';
}
var ASSET_BASE=scriptBase();
var ROMI={
 launcher:ASSET_BASE+'romi-launcher.webp',
 greeting:ASSET_BASE+'romi-greeting.webp',
 finder:ASSET_BASE+'romi-finder.webp',
 success:ASSET_BASE+'romi-success.webp'
};

var SALES=[
 {city:'Алматы',name:'Лаптева Лора',role:'Супервайзер',phone:'+7 707 978 74 29',tel:'+77079787429',wa:'77079787429'},
 {city:'Алматы',name:'Хмурович Андрей',role:'Супервайзер',phone:'+7 707 236 33 69',tel:'+77072363369',wa:'77072363369'},
 {city:'Алматы',name:'Хусаинов Самат',role:'Супервайзер',phone:'+7 708 861 57 67',tel:'+77088615767',wa:'77088615767'},
 {city:'Алматы',name:'Якупова Гульнара',role:'Супервайзер',phone:'+7 707 387 09 31',tel:'+77073870931',wa:'77073870931'},
 {city:'Балхаш',name:'Гарипова Юзефа',role:'Супервайзер',phone:'+7 771 436 55 08',tel:'+77714365508',wa:'77714365508'},
 {city:'Жезказган',name:'Кичатая Ирина',role:'Директор филиала',phone:'+7 747 916 93 80',tel:'+77479169380',wa:'77479169380'},
 {city:'Караганда',name:'Несипбаев Мурат',role:'Супервайзер',phone:'+7 700 336 27 41',tel:'+77003362741',wa:'77003362741'},
 {city:'Караганда',name:'Сагиндык Шалкар',role:'Супервайзер',phone:'+7 708 835 65 05',tel:'+77088356505',wa:'77088356505'},
 {city:'Кокшетау',name:'Низова Олеся',role:'Супервайзер',phone:'+7 707 609 56 34',tel:'+77076095634',wa:'77076095634'},
 {city:'Петропавловск',name:'Сомова Евгения',role:'Директор филиала',phone:'+7 707 123 00 55',tel:'+77071230055',wa:'77071230055'},
 {city:'Рудный',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'},
 {city:'Уральск',name:'Тужилкина Надежда',role:'Супервайзер',phone:'+7 707 341 40 41',tel:'+77073414041',wa:'77073414041'},
 {city:'Атырау',name:'Лошманова Лидия',role:'Супервайзер',phone:'+7 775 726 84 79',tel:'+77757268479',wa:'77757268479'},
 {city:'Актобе',name:'Зайцева Нина',role:'Супервайзер',phone:'+7 701 269 38 71',tel:'+77012693871',wa:'77012693871'},
 {city:'Актау',name:'Семейных Евгения',role:'Супервайзер',phone:'+7 777 751 75 22',tel:'+77777517522',wa:'77777517522'},
 {city:'Павлодар',name:'Салова Алена',role:'Директор филиала',phone:'+7 777 939 93 39',tel:'+77779399339',wa:'77779399339'},
 {city:'Усть-Каменогорск',name:'Медведева Ольга',role:'Супервайзер',phone:'+7 776 451 50 50',tel:'+77764515050',wa:'77764515050'},
 {city:'Семей',name:'Нестерова Марина',role:'Супервайзер',phone:'+7 700 447 85 64',tel:'+77004478564',wa:'77004478564'},
 {city:'Семей',name:'Тюклин Николай',role:'Супервайзер',phone:'+7 707 801 53 26',tel:'+77078015326',wa:'77078015326'},
 {city:'Астана',name:'Абылгазина Алина',role:'Супервайзер',phone:'+7 701 960 48 93',tel:'+77019604893',wa:'77019604893'},
 {city:'Астана',name:'Мырзахметова Ботагоз',role:'Супервайзер',phone:'+7 775 093 91 45',tel:'+77750939145',wa:'77750939145'},
 {city:'Шымкент',name:'Искандаров Рустам',role:'Супервайзер',phone:'+7 707 211 78 81',tel:'+77072117881',wa:'77072117881'},
 {city:'Шымкент',name:'Интыкбекова Румия',role:'Начальник отдела продаж',phone:'+7 700 576 00 70',tel:'+77005760070',wa:'77005760070'},
 {city:'Талдыкорган',name:'Кан Елена',role:'Директор филиала',phone:'+7 777 155 70 15',tel:'+77771557015',wa:'77771557015'},
 {city:'Тараз',name:'Бакенова Анна',role:'Супервайзер',phone:'+7 747 469 80 85',tel:'+77474698085',wa:'77474698085'},
 {city:'Аркалык',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'},
 {city:'Житикара',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'},
 {city:'Лисаковск',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'}
];
var BRANCH_FALLBACK={city:'Костанай',name:'Филиал Aromika',role:'Отдел продаж',phone:'+7 (7142) 75-14-21',tel:'+77142751421',email:'oper_kost@aromika.info'};
var CITY_KK={'Алматы':'Алматы','Балхаш':'Балқаш','Жезказган':'Жезқазған','Караганда':'Қарағанды','Кокшетау':'Көкшетау','Петропавловск':'Петропавл','Рудный':'Рудный','Уральск':'Орал','Атырау':'Атырау','Актобе':'Ақтөбе','Актау':'Ақтау','Павлодар':'Павлодар','Усть-Каменогорск':'Өскемен','Семей':'Семей','Астана':'Астана','Шымкент':'Шымкент','Талдыкорган':'Талдықорған','Тараз':'Тараз','Аркалык':'Арқалық','Житикара':'Жітіқара','Лисаковск':'Лисаковск','Костанай':'Қостанай'};

var ICONS={
 shop:'<svg viewBox="0 0 24 24"><path d="M4 8h16l-1.3 11H5.3L4 8Z"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
 sale:'<svg viewBox="0 0 24 24"><path d="m4 13 9-9h6v6l-9 9-6-6Z"/><circle cx="16" cy="7" r="1"/></svg>',
 brands:'<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><circle cx="12" cy="16" r="4"/></svg>',
 finder:'<svg viewBox="0 0 24 24"><path d="M5 7h14M7 12h10M9 17h6"/><circle cx="5" cy="7" r="1"/><circle cx="17" cy="12" r="1"/><circle cx="9" cy="17" r="1"/></svg>',
 rep:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"/></svg>',
 partner:'<svg viewBox="0 0 24 24"><path d="M8 12 5.5 9.5a3 3 0 0 1 4.2-4.2L12 7.6l2.3-2.3a3 3 0 0 1 4.2 4.2L16 12"/><path d="m8 12 4 4 4-4"/></svg>',
 review:'<svg viewBox="0 0 24 24"><path d="M4 5h16v12H9l-5 3V5Z"/><path d="M8 9h8M8 13h5"/></svg>',
 contact:'<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="m6 7 6 5 6-5"/></svg>',
 work:'<svg viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5h6v2M4 12h16"/></svg>',
 production:'<svg viewBox="0 0 24 24"><path d="M4 20V9l5 3V8l5 3V5h6v15H4Z"/></svg>'
};

var TEXT={
 ru:{
  teaserTitle:'Romi подскажет',teaserText:'Помогу выбрать продукцию, найти акцию или связаться с представителем.',
  kicker:'Помощник Aromika',homeTitle:'Чем вам помочь?',homeSub:'Выберите задачу — Romi проведёт к нужному разделу.',
  back:'Назад',close:'Закрыть',online:'на связи',
  finder:'Подобрать продукцию',finderSub:'Категория → задача → объём → варианты',
  shop:'Купить продукцию',shopSub:'Интернет-магазин Aromika',sale:'Актуальные акции',saleSub:'Скидки Aromika.shop и Kaspi',brands:'Наши бренды',brandsSub:'Познакомиться с брендами Aromika',
  rep:'Связаться с представителем',repSub:'Выберите город и получите контакт',partner:'Стать партнёром',partnerSub:'Розница, HoReCa, корпоративные клиенты',review:'Оставить отзыв',reviewSub:'Оценка и комментарий прямо здесь',
  contacts:'Все контакты',contactsSub:'Филиалы и общие контакты',work:'Вакансии',workSub:'Работа в компании Aromika',production:'Производство',productionSub:'Как устроено производство Aromika',
  finderTitle:'Что вы ищете?',finderLead:'Сначала выберите категорию, затем задачу и нужный объём.',
  laundry:'Стирка',dishes:'Мытьё посуды',cleaning:'Уборка дома',care:'Уход за собой',
  laundryLead:'Линейки для стирки',dishesLead:'Средства для ежедневного мытья посуды',cleaningLead:'Средства для разных задач уборки',careLead:'Шампуни, гели, мыло и уход',
  openProducts:'Открыть раздел продукции',openShop:'Смотреть в интернет-магазине',openBrands:'Посмотреть бренды',
  needTitle:'Что именно нужно?',needLead:'Выберите задачу — так Romi точнее подберёт варианты.',needAny:'Не важно',
  volumeTitle:'Какой объём нужен?',volumeLead:'Выберите формат — покажем подходящие варианты.',anyVolume:'Любой объём',availableBrands:'Подходящие варианты',noExact:'Точного совпадения по всем параметрам нет — показываю ближайшие варианты.',
  laundryWhite:'Для белого',laundryColor:'Для цветного',laundryBlack:'Для чёрного',laundryUniversal:'Универсальное',laundryDelicate:'Деликатные ткани',
  dishesDaily:'На каждый день',dishesAntibac:'Антибактериальное',dishesEco:'Эко',dishesSensitive:'Для чувствительной кожи',
  cleaningFloor:'Полы',cleaningKitchen:'Кухня',cleaningBathroom:'Ванная и сантехника',cleaningGlass:'Стекло и зеркала',cleaningUniversal:'Универсальная уборка',
  careShampoo:'Шампунь',careShower:'Гель для душа',careSoap:'Мыло',careIntimate:'Интимная гигиена',
  resultTitle:'Нашла подходящие варианты',resultLead:'Проверьте подходящие линейки и откройте нужную страницу.',again:'Подобрать заново',home:'В главное меню',
  repTitle:'Найти представителя',repLead:'Выберите город. Покажем контакты торговой команды.',city:'Город',chooseCity:'Выберите город',noRep:'Для этого города нет отдельного представителя. Откройте все контакты Aromika.',call:'Позвонить',whatsapp:'WhatsApp',email:'Написать',allContacts:'Все контакты',
  roleSupervisor:'Супервайзер',roleDirector:'Директор филиала',roleSalesHead:'Начальник отдела продаж',roleSales:'Отдел продаж',
  feedbackTitle:'Оставить отзыв',feedbackLead:'Оцените опыт и добавьте комментарий. После нажатия подготовим письмо в Aromika.',rating:'Ваша оценка',name:'Имя (необязательно)',phone:'Телефон (необязательно)',comment:'Комментарий',commentPlaceholder:'Что понравилось или что можно улучшить?',sendFeedback:'Подготовить письмо',feedbackHint:'Отправка откроется через ваше почтовое приложение.',ratingRequired:'Выберите оценку от 1 до 5.',commentRequired:'Добавьте короткий комментарий.',feedbackSuccess:'Спасибо за отзыв',feedbackSuccessLead:'Письмо подготовлено. Осталось отправить его из почтового приложения.',
  partnerTitle:'Какое сотрудничество вас интересует?',retail:'Закупка продукции Aromika',horeca:'HoReCa / корпоративные клиенты',distribution:'Дистрибуция вашего бренда',
  brandContext:'Вы смотрите бренд',promoContext:'Вы смотрите акции',companyContext:'Вы на странице сотрудничества',contactsContext:'Нужен контакт?',vacancyContext:'Интересует работа?',productionContext:'Хотите узнать больше о производстве?',
  foot:'Aromika · Казахстанский производитель'
 },
 kk:{
  teaserTitle:'Romi көмектеседі',teaserText:'Өнім таңдауға, акция табуға немесе өкілмен байланысуға көмектесемін.',
  kicker:'Aromika көмекшісі',homeTitle:'Сізге қалай көмектесеміз?',homeSub:'Міндетті таңдаңыз — Romi қажетті бөлімге бағыттайды.',
  back:'Артқа',close:'Жабу',online:'байланыста',
  finder:'Өнім таңдау',finderSub:'Санат → міндет → көлем → нұсқалар',
  shop:'Өнім сатып алу',shopSub:'Aromika интернет-дүкені',sale:'Өзекті акциялар',saleSub:'Aromika.shop және Kaspi жеңілдіктері',brands:'Біздің брендтер',brandsSub:'Aromika брендтерімен танысу',
  rep:'Өкілмен байланысу',repSub:'Қаланы таңдап, байланыс алыңыз',partner:'Серіктес болу',partnerSub:'Бөлшек сауда, HoReCa, корпоративтік клиенттер',review:'Пікір қалдыру',reviewSub:'Баға және пікір осы жерде',
  contacts:'Барлық байланыстар',contactsSub:'Филиалдар және жалпы байланыстар',work:'Бос жұмыс орындары',workSub:'Aromika компаниясындағы жұмыс',production:'Өндіріс',productionSub:'Aromika өндірісі қалай ұйымдастырылған',
  finderTitle:'Не іздеп жүрсіз?',finderLead:'Алдымен санатты, содан кейін міндет пен қажетті көлемді таңдаңыз.',
  laundry:'Кір жуу',dishes:'Ыдыс жуу',cleaning:'Үй жинау',care:'Өзін-өзі күту',
  laundryLead:'Кір жууға арналған желілер',dishesLead:'Күнделікті ыдыс жуу құралдары',cleaningLead:'Әртүрлі тазалау міндеттеріне арналған құралдар',careLead:'Сусабындар, гельдер, сабын және күтім',
  openProducts:'Өнімдер бөлімін ашу',openShop:'Интернет-дүкенде көру',openBrands:'Брендтерді көру',
  needTitle:'Нақты не керек?',needLead:'Міндетті таңдаңыз — Romi нұсқаларды дәлірек ұсынады.',needAny:'Маңызды емес',
  volumeTitle:'Қандай көлем керек?',volumeLead:'Форматты таңдаңыз — сәйкес нұсқаларды көрсетеміз.',anyVolume:'Кез келген көлем',availableBrands:'Сәйкес нұсқалар',noExact:'Барлық параметр бойынша дәл сәйкестік жоқ — ең жақын нұсқаларды көрсетемін.',
  laundryWhite:'Ақ матаға',laundryColor:'Түсті матаға',laundryBlack:'Қара матаға',laundryUniversal:'Әмбебап',laundryDelicate:'Нәзік маталар',
  dishesDaily:'Күнделікті',dishesAntibac:'Антибактериалды',dishesEco:'Эко',dishesSensitive:'Сезімтал теріге',
  cleaningFloor:'Еден',cleaningKitchen:'Ас үй',cleaningBathroom:'Жуынатын бөлме және сантехника',cleaningGlass:'Шыны және айна',cleaningUniversal:'Әмбебап тазалау',
  careShampoo:'Сусабын',careShower:'Душ гелі',careSoap:'Сабын',careIntimate:'Интимдік гигиена',
  resultTitle:'Сәйкес нұсқаларды таптым',resultLead:'Ұсынылған желілерді қарап, қажетті бетке өтіңіз.',again:'Қайта таңдау',home:'Басты мәзір',
  repTitle:'Өкілді табу',repLead:'Қаланы таңдаңыз. Сауда командасының байланысын көрсетеміз.',city:'Қала',chooseCity:'Қаланы таңдаңыз',noRep:'Бұл қала үшін жеке өкіл көрсетілмеген. Aromika барлық байланыстарын ашыңыз.',call:'Қоңырау',whatsapp:'WhatsApp',email:'Жазу',allContacts:'Барлық байланыстар',
  roleSupervisor:'Супервайзер',roleDirector:'Филиал директоры',roleSalesHead:'Сату бөлімінің басшысы',roleSales:'Сату бөлімі',
  feedbackTitle:'Пікір қалдыру',feedbackLead:'Тәжірибеңізді бағалап, пікір қосыңыз. Батырманы басқанда Aromika-ға хат дайындалады.',rating:'Сіздің бағаңыз',name:'Аты-жөніңіз (міндетті емес)',phone:'Телефон (міндетті емес)',comment:'Пікір',commentPlaceholder:'Не ұнады немесе нені жақсартуға болады?',sendFeedback:'Хатты дайындау',feedbackHint:'Жіберу пошта қолданбасы арқылы ашылады.',ratingRequired:'1-ден 5-ке дейін баға таңдаңыз.',commentRequired:'Қысқаша пікір қосыңыз.',feedbackSuccess:'Пікіріңізге рақмет',feedbackSuccessLead:'Хат дайын. Енді оны пошта қолданбасынан жіберу қалды.',
  partnerTitle:'Қандай ынтымақтастық қызықтырады?',retail:'Aromika өнімдерін сатып алу',horeca:'HoReCa / корпоративтік клиенттер',distribution:'Брендіңізді дистрибуциялау',
  brandContext:'Сіз бренд бетін қарап отырсыз',promoContext:'Сіз акцияларды қарап отырсыз',companyContext:'Сіз ынтымақтастық бетіндесіз',contactsContext:'Байланыс керек пе?',vacancyContext:'Жұмыс қызықтыра ма?',productionContext:'Өндіріс туралы көбірек білгіңіз келе ме?',
  foot:'Aromika · Қазақстандық өндіруші'
 }
};

var FINDER={
 laundry:{
  needs:['white','color','black','universal','delicate'],
  needLabels:{white:'laundryWhite',color:'laundryColor',black:'laundryBlack',universal:'laundryUniversal',delicate:'laundryDelicate'},
  volumes:['1100 мл','1500 мл','2000 мл','3300 мл','4300 мл','5000 мл'],
  all:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Antibak','/antibak']],
  byNeed:{white:[['Perfect','/perfect'],['Wash Expert','/washexpert']],color:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka']],black:[['Perfect','/perfect'],['Wash Expert','/washexpert']],universal:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Antibak','/antibak']],delicate:[['Perfect','/perfect'],['Lavado','/brands']]},
  byVolume:{'1100 мл':[['Prachka','/prachka']],'1500 мл':[['Perfect','/perfect']],'2000 мл':[['Wash Expert','/washexpert']],'3300 мл':[['Perfect','/perfect'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Lavado','/brands']],'4300 мл':[['Wash Expert','/washexpert'],['Perfect','/perfect'],['Antibak','/antibak']],'5000 мл':[['Prachka','/prachka'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower']]}
 },
 dishes:{
  needs:['daily','antibac','eco','sensitive'],needLabels:{daily:'dishesDaily',antibac:'dishesAntibac',eco:'dishesEco',sensitive:'dishesSensitive'},volumes:['500 мл','1100 мл','3300 мл','5000 мл'],
  all:[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert'],['Blik','/brands']],
  byNeed:{daily:[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert'],['Blik','/brands']],antibac:[['Antibak','/antibak']],eco:[['Aromika Эко','/brands']],sensitive:[['Aromika','/brands'],['Perfect','/perfect']]},
  byVolume:{'500 мл':[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert']],'1100 мл':[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert'],['Blik','/brands']],'3300 мл':[['Antibak','/antibak'],['Wash Expert','/washexpert']],'5000 мл':[['Профессиональная линейка','/brands']]}
 },
 cleaning:{
  needs:['floor','kitchen','bathroom','glass','universal'],needLabels:{floor:'cleaningFloor',kitchen:'cleaningKitchen',bathroom:'cleaningBathroom',glass:'cleaningGlass',universal:'cleaningUniversal'},volumes:['500 мл','1100 мл','1500 мл','3300 мл','4300 мл','5000 мл'],
  all:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Blik','/brands']],
  byNeed:{floor:[['Perfect','/perfect'],['Wash Expert','/washexpert']],kitchen:[['Blik','/brands'],['Perfect','/perfect'],['Wash Expert','/washexpert']],bathroom:[['Blik','/brands'],['Wash Expert','/washexpert']],glass:[['Perfect','/perfect'],['Wash Expert','/washexpert']],universal:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Blik','/brands']]},
  byVolume:{'500 мл':[['Blik','/brands']],'1100 мл':[['Aromika','/brands'],['Blik','/brands']],'1500 мл':[['Perfect','/perfect']],'3300 мл':[['Maxi Power','/maxipower'],['Prachka','/prachka']],'4300 мл':[['Wash Expert','/washexpert']],'5000 мл':[['Wash Expert','/washexpert'],['Профессиональная линейка','/brands']]}
 },
 care:{
  needs:['shampoo','shower','soap','intimate'],needLabels:{shampoo:'careShampoo',shower:'careShower',soap:'careSoap',intimate:'careIntimate'},volumes:['300 мл','400 мл','530 мл','800 мл','1100 мл'],
  all:[['Aromika','/brands'],['Perfect','/perfect'],['Beauty ESSENCE','/brands'],['Delicate','/brands'],['Топ малыш','/brands']],
  byNeed:{shampoo:[['Beauty ESSENCE','/brands'],['Perfect','/perfect'],['Топ малыш','/brands']],shower:[['Perfect','/perfect'],['Aromika','/brands']],soap:[['Aromika','/brands'],['Perfect','/perfect']],intimate:[['Delicate','/brands']]},
  byVolume:{'300 мл':[['Perfect','/perfect'],['Топ малыш','/brands']],'400 мл':[['Delicate','/brands']],'530 мл':[['Aromika','/brands']],'800 мл':[['Aromika','/brands'],['Perfect','/perfect'],['Beauty ESSENCE','/brands'],['Delicate','/brands'],['Топ малыш','/brands']],'1100 мл':[['Aromika','/brands']]}
 }
};

function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function path(){var p=(location.pathname||'/').replace(/\/+$/,'');return p||'/'}
function lang(){var l='ru';try{l=localStorage.getItem(LANG_KEY)||document.documentElement.lang||'ru'}catch(e){}l=String(l).toLowerCase();return (l==='kk'||l==='kz'||l.indexOf('kk')===0)?'kk':'ru'}
function emit(action,detail){try{window.dispatchEvent(new CustomEvent('aromika-assistant-action',{detail:Object.assign({action:action,path:path()},detail||{})}))}catch(e){}try{if(typeof window.gtag==='function')window.gtag('event','assistant_'+action,{page_path:path()})}catch(e){}}
function context(){var p=path();if(['/perfect','/washexpert','/maxipower','/prachka','/antibak','/brands'].indexOf(p)>=0)return'brand';if(p==='/akcii')return'promo';if(p==='/okompanii')return'company';if(p==='/kontakty')return'contacts';if(p==='/vacancies')return'vacancy';if(p==='/proizvodstvo')return'production';return'home'}
function homeOrder(){var c=context();if(c==='brand')return['finder','shop','sale','rep','partner','review'];if(c==='promo')return['shop','finder','brands','rep','review'];if(c==='company')return['rep','partner','finder','shop','review'];if(c==='contacts')return['rep','shop','partner','review'];if(c==='vacancy')return['work','contacts','brands','shop','review'];if(c==='production')return['production','brands','partner','contacts','review'];return['finder','shop','sale','brands','rep','partner','review']}
function contextIntro(t){var c=context();if(c==='brand')return{eyebrow:t.brandContext,title:t.homeTitle,sub:t.homeSub};if(c==='promo')return{eyebrow:t.promoContext,title:t.homeTitle,sub:t.homeSub};if(c==='company')return{eyebrow:t.companyContext,title:t.homeTitle,sub:t.homeSub};if(c==='contacts')return{eyebrow:t.contactsContext,title:t.repTitle,sub:t.repLead};if(c==='vacancy')return{eyebrow:t.vacancyContext,title:t.homeTitle,sub:t.homeSub};if(c==='production')return{eyebrow:t.productionContext,title:t.homeTitle,sub:t.homeSub};return{eyebrow:t.kicker,title:t.homeTitle,sub:t.homeSub}}
function actionMeta(k,t){var map={finder:[t.finder,t.finderSub,'finder'],shop:[t.shop,t.shopSub,'shop'],sale:[t.sale,t.saleSub,'sale'],brands:[t.brands,t.brandsSub,'brands'],rep:[t.rep,t.repSub,'rep'],partner:[t.partner,t.partnerSub,'partner'],review:[t.review,t.reviewSub,'review'],contacts:[t.contacts,t.contactsSub,'contact'],work:[t.work,t.workSub,'work'],production:[t.production,t.productionSub,'production']};return map[k]}
function hrefFor(k){if(k==='shop')return'https://aromika.shop/';if(k==='sale')return'/akcii';if(k==='brands')return'/brands';if(k==='contacts')return'/kontakty';if(k==='work')return'/vacancies';if(k==='production')return'/proizvodstvo';return''}
function romiHTML(kind,cls){var src=ROMI[kind]||ROMI.greeting;return '<span class="aa-romi '+(cls||'')+'"><img src="'+esc(src)+'" alt="" decoding="async" draggable="false"></span>'}
function screenHead(eyebrow,title,sub,t,kind){return '<div class="aa-head"><div class="aa-persona">'+romiHTML(kind||'launcher','aa-romi--head')+'<div><b>Romi</b><small>'+esc(t.online)+'</small></div></div><div class="aa-kicker">'+esc(eyebrow)+'</div><h2 class="aa-title">'+esc(title)+'</h2><p class="aa-subtitle">'+esc(sub)+'</p></div>'}
function actionHTML(k,t){var m=actionMeta(k,t),isNav=['finder','rep','partner','review'].indexOf(k)>=0,href=hrefFor(k),primary=(k==='finder'&&context()==='home')||(k==='shop'&&context()==='promo'),tag=isNav?'button':'a',attrs=isNav?' type="button"':' href="'+esc(href)+'"'+(k==='shop'?' target="_blank" rel="noopener"':'');return '<'+tag+' class="aa-action'+(primary?' aa-action--primary':'')+'" data-aa-action="'+k+'"'+attrs+'><span class="aa-action-icon">'+ICONS[m[2]]+'</span><span class="aa-action-copy"><b>'+esc(m[0])+'</b><small>'+esc(m[1])+'</small></span><span class="aa-arrow">→</span></'+tag+'>'}
function renderHome(root,t){var intro=contextIntro(t);return '<div class="aa-hero aa-hero--home">'+romiHTML('greeting','aa-romi--hero')+'<div class="aa-hero-copy">'+screenHead(intro.eyebrow,intro.title,intro.sub,t,'launcher')+'</div></div><div class="aa-body"><div class="aa-actions">'+homeOrder().map(function(k){return actionHTML(k,t)}).join('')+'</div></div>'}
function needLabel(cfg,n,t){if(n==='any')return t.needAny;var key=cfg.needLabels[n];return key&&t[key]?t[key]:n}
function renderFinder(root,t){return '<div class="aa-stage-visual">'+romiHTML('finder','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.finderTitle,t.finderLead,t,'launcher')+'<div class="aa-body"><div class="aa-choice-grid">'+['laundry','dishes','cleaning','care'].map(function(k){return '<button class="aa-choice" type="button" data-aa-category="'+k+'"><b>'+esc(t[k])+'</b><span>'+esc(t[k+'Lead'])+'</span><i>→</i></button>'}).join('')+'</div><a class="aa-simple-link" href="/#products">'+esc(t.openProducts)+' <span>→</span></a></div>'}
function renderFinderNeeds(root,t){var k=state.finderCategory||'laundry',cfg=FINDER[k]||FINDER.laundry;return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('finder','aa-romi--stage')+'</div>'+screenHead(t[k],t.needTitle,t.needLead,t,'launcher')+'<div class="aa-body"><div class="aa-choice-grid aa-need-grid"><button class="aa-choice aa-choice--need" type="button" data-aa-need="any"><b>'+esc(t.needAny)+'</b><span>'+esc(t[k+'Lead'])+'</span><i>→</i></button>'+cfg.needs.map(function(n){return '<button class="aa-choice aa-choice--need" type="button" data-aa-need="'+esc(n)+'"><b>'+esc(needLabel(cfg,n,t))+'</b><span>'+esc(t[k])+'</span><i>→</i></button>'}).join('')+'</div></div>'}
function renderFinderVolumes(root,t){var k=state.finderCategory||'laundry',cfg=FINDER[k]||FINDER.laundry,need=state.finderNeed||'any';return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('finder','aa-romi--stage')+'</div>'+screenHead(needLabel(cfg,need,t),t.volumeTitle,t.volumeLead,t,'launcher')+'<div class="aa-body"><div class="aa-choice-grid aa-volume-grid"><button class="aa-choice aa-choice--volume" type="button" data-aa-volume="any"><b>'+esc(t.anyVolume)+'</b><i>→</i></button>'+cfg.volumes.map(function(v){return '<button class="aa-choice aa-choice--volume" type="button" data-aa-volume="'+esc(v)+'"><b>'+esc(v)+'</b><i>→</i></button>'}).join('')+'</div></div>'}
function pairKey(p){return p[0]+'|'+p[1]}
function finderResults(){var k=state.finderCategory||'laundry',cfg=FINDER[k]||FINDER.laundry,need=state.finderNeed||'any',vol=state.finderVolume||'any',a=need==='any'?cfg.all:(cfg.byNeed[need]||cfg.all),b=vol==='any'?cfg.all:(cfg.byVolume[vol]||cfg.all),set={};b.forEach(function(p){set[pairKey(p)]=1});var exact=a.filter(function(p){return set[pairKey(p)]});if(exact.length)return{items:exact,exact:true};var fallback=vol!=='any'?b:a;return{items:fallback&&fallback.length?fallback:cfg.all,exact:false}}
function renderFinderResult(root,t){var res=finderResults();return '<div class="aa-success-visual">'+romiHTML('success','aa-romi--success')+'</div>'+screenHead(t.availableBrands,t.resultTitle,t.resultLead,t,'launcher')+'<div class="aa-body">'+(!res.exact?'<p class="aa-note">'+esc(t.noExact)+'</p>':'')+'<div class="aa-brand-list">'+res.items.map(function(p){return '<a class="aa-brand-link" href="'+esc(p[1])+'"><b>'+esc(p[0])+'</b><span>→</span></a>'}).join('')+'</div><div class="aa-result-actions"><a class="aa-action aa-action--compact aa-action--primary" href="https://aromika.shop/" target="_blank" rel="noopener"><span class="aa-action-icon">'+ICONS.shop+'</span><span class="aa-action-copy"><b>'+esc(t.openShop)+'</b></span><span class="aa-arrow">→</span></a><button class="aa-simple-button" type="button" data-aa-restart>'+esc(t.again)+'</button></div></div>'}
function roleLabel(role,t){if(role==='Супервайзер')return t.roleSupervisor;if(role==='Директор филиала')return t.roleDirector;if(role==='Начальник отдела продаж')return t.roleSalesHead;if(role==='Отдел продаж')return t.roleSales;return role}
function cityLabel(city,l){return l==='kk'?(CITY_KK[city]||city):city}
function cities(){var x={Костанай:1};SALES.forEach(function(s){x[s.city]=1});return Object.keys(x).sort(function(a,b){return a.localeCompare(b,'ru')})}
function contactCard(s,t,l){var buttons='<div class="aa-contact-actions"><a href="tel:'+esc(s.tel)+'">'+esc(t.call)+'</a>';if(s.wa)buttons+='<a href="https://wa.me/'+esc(s.wa)+'" target="_blank" rel="noopener">'+esc(t.whatsapp)+'</a>';if(s.email)buttons+='<a href="mailto:'+esc(s.email)+'">'+esc(t.email)+'</a>';buttons+='</div>';return '<article class="aa-contact"><small>'+esc(cityLabel(s.city,l))+'</small><b>'+esc(s.name)+'</b><span>'+esc(roleLabel(s.role,t))+'</span><a class="aa-phone" href="tel:'+esc(s.tel)+'">'+esc(s.phone)+'</a>'+buttons+'</article>'}
function renderContacts(root,city,t,l){var holder=root.querySelector('.aa-contact-results');if(!holder)return;if(!city){holder.innerHTML='';return}var list=city==='Костанай'?[BRANCH_FALLBACK]:SALES.filter(function(s){return s.city===city});holder.innerHTML=list.length?list.map(function(s){return contactCard(s,t,l)}).join(''):'<p class="aa-note">'+esc(t.noRep)+'</p><a class="aa-simple-link" href="/kontakty">'+esc(t.allContacts)+' <span>→</span></a>'}
function renderRep(root,t,l){var opts=cities().map(function(c){return '<option value="'+esc(c)+'">'+esc(cityLabel(c,l))+'</option>'}).join('');return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('greeting','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.repTitle,t.repLead,t,'launcher')+'<div class="aa-body"><label class="aa-field"><span class="aa-field-label">'+esc(t.city)+'</span><span class="aa-select-wrap"><select id="aa-city" class="aa-select"><option value="">'+esc(t.chooseCity)+'</option>'+opts+'</select></span></label><div class="aa-contact-results"></div><a class="aa-simple-link" href="/kontakty">'+esc(t.allContacts)+' <span>→</span></a></div>'}
function renderPartner(root,t){return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('greeting','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.partnerTitle,t.partnerSub||t.homeSub,t,'launcher')+'<div class="aa-body"><div class="aa-brand-list"><a class="aa-brand-link" href="/okompanii?type=retail#cooperation"><b>'+esc(t.retail)+'</b><span>→</span></a><a class="aa-brand-link" href="/okompanii?type=horeca#cooperation"><b>'+esc(t.horeca)+'</b><span>→</span></a><a class="aa-brand-link" href="/okompanii?type=distributor#cooperation"><b>'+esc(t.distribution)+'</b><span>→</span></a></div></div>'}
function renderFeedback(root,t){var stars=[1,2,3,4,5].map(function(n){return '<button type="button" class="aa-star'+(state.rating>=n?' is-active':'')+'" data-aa-rating="'+n+'" aria-label="'+n+'">★</button>'}).join('');return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('greeting','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.feedbackTitle,t.feedbackLead,t,'launcher')+'<div class="aa-body"><form class="aa-feedback"><div class="aa-field"><span class="aa-field-label">'+esc(t.rating)+'</span><div class="aa-stars">'+stars+'</div></div><label class="aa-field"><span class="aa-field-label">'+esc(t.name)+'</span><input name="name" autocomplete="name"></label><label class="aa-field"><span class="aa-field-label">'+esc(t.phone)+'</span><input name="phone" inputmode="tel" autocomplete="tel"></label><label class="aa-field"><span class="aa-field-label">'+esc(t.comment)+'</span><textarea name="comment" rows="4" placeholder="'+esc(t.commentPlaceholder)+'"></textarea></label><div class="aa-form-error" role="alert"></div><button class="aa-submit" type="submit">'+esc(t.sendFeedback)+' <span>→</span></button><p class="aa-form-hint">'+esc(t.feedbackHint)+'</p></form></div>'}
function renderFeedbackSuccess(root,t){return '<div class="aa-success-visual">'+romiHTML('success','aa-romi--success')+'</div>'+screenHead(t.kicker,t.feedbackSuccess,t.feedbackSuccessLead,t,'launcher')+'<div class="aa-body"><button class="aa-simple-button aa-simple-button--wide" type="button" data-aa-home>'+esc(t.home)+'</button></div>'}

var state={screen:'home',history:[],finderCategory:'',finderNeed:'',finderVolume:'',rating:0};
function gotoScreen(root,screen,data,push){if(push!==false)state.history.push(state.screen);state.screen=screen;if(data)Object.assign(state,data);render(root);scrollPanelTop(root)}
function back(root){var prev=state.history.pop()||'home';state.screen=prev;render(root);scrollPanelTop(root)}
function home(root){state.screen='home';state.history=[];render(root);scrollPanelTop(root)}
function scrollPanelTop(root){var p=root.querySelector('.aa-panel');if(p)try{p.scrollTo({top:0,behavior:'smooth'})}catch(e){p.scrollTop=0}}
function render(root){var l=lang(),t=TEXT[l],screen=root.querySelector('.aa-screen');root.querySelector('.aa-teaser strong').textContent=t.teaserTitle;root.querySelector('.aa-teaser p').textContent=t.teaserText;root.querySelector('.aa-foot').textContent=t.foot;root.querySelector('.aa-back span').textContent=t.back;root.querySelector('.aa-back').classList.toggle('is-visible',state.screen!=='home');root.querySelector('.aa-panel-close').setAttribute('aria-label',t.close);if(state.screen==='home')screen.innerHTML=renderHome(root,t);else if(state.screen==='finder')screen.innerHTML=renderFinder(root,t);else if(state.screen==='finderNeeds')screen.innerHTML=renderFinderNeeds(root,t);else if(state.screen==='finderVolumes')screen.innerHTML=renderFinderVolumes(root,t);else if(state.screen==='finderResult')screen.innerHTML=renderFinderResult(root,t);else if(state.screen==='rep')screen.innerHTML=renderRep(root,t,l);else if(state.screen==='partner')screen.innerHTML=renderPartner(root,t);else if(state.screen==='feedback')screen.innerHTML=renderFeedback(root,t);else if(state.screen==='feedbackSuccess')screen.innerHTML=renderFeedbackSuccess(root,t);bindScreen(root,t,l)}
function bindScreen(root,t,l){
 root.querySelectorAll('[data-aa-action]').forEach(function(el){el.addEventListener('click',function(e){var k=el.getAttribute('data-aa-action');emit(k);if(k==='finder'){e.preventDefault();gotoScreen(root,'finder')}else if(k==='rep'){e.preventDefault();gotoScreen(root,'rep')}else if(k==='partner'){e.preventDefault();gotoScreen(root,'partner')}else if(k==='review'){e.preventDefault();gotoScreen(root,'feedback')}})});
 root.querySelectorAll('[data-aa-category]').forEach(function(el){el.addEventListener('click',function(){var c=el.getAttribute('data-aa-category');emit('finder_category',{category:c});gotoScreen(root,'finderNeeds',{finderCategory:c,finderNeed:'',finderVolume:''})})});
 root.querySelectorAll('[data-aa-need]').forEach(function(el){el.addEventListener('click',function(){var n=el.getAttribute('data-aa-need')||'any';emit('finder_need',{category:state.finderCategory,need:n});gotoScreen(root,'finderVolumes',{finderNeed:n,finderVolume:''})})});
 root.querySelectorAll('[data-aa-volume]').forEach(function(el){el.addEventListener('click',function(){var v=el.getAttribute('data-aa-volume')||'any';emit('finder_volume',{category:state.finderCategory,need:state.finderNeed,volume:v});gotoScreen(root,'finderResult',{finderVolume:v})})});
 var restart=root.querySelector('[data-aa-restart]');if(restart)restart.addEventListener('click',function(){state.history=[];gotoScreen(root,'finder',{finderCategory:'',finderNeed:'',finderVolume:''},false)});
 var homeBtn=root.querySelector('[data-aa-home]');if(homeBtn)homeBtn.addEventListener('click',function(){home(root)});
 var select=root.querySelector('#aa-city');if(select)select.addEventListener('change',function(){renderContacts(root,this.value,t,l);emit('representative_city',{city:this.value})});
 root.querySelectorAll('[data-aa-rating]').forEach(function(b){b.addEventListener('click',function(){state.rating=parseInt(b.getAttribute('data-aa-rating'),10)||0;root.querySelectorAll('.aa-star').forEach(function(s){s.classList.toggle('is-active',parseInt(s.getAttribute('data-aa-rating'),10)<=state.rating)});emit('feedback_rating',{rating:state.rating})})});
 var form=root.querySelector('.aa-feedback');if(form)form.addEventListener('submit',function(e){e.preventDefault();var err=form.querySelector('.aa-form-error'),fd=new FormData(form),comment=String(fd.get('comment')||'').trim();if(!state.rating){err.textContent=t.ratingRequired;return}if(comment.length<3){err.textContent=t.commentRequired;return}err.textContent='';var subj=(l==='kk'?'Aromika сайты арқылы пікір':'Отзыв с сайта Aromika')+' · '+state.rating+'/5';var body=(l==='kk'?'Баға: ':'Оценка: ')+state.rating+'/5\n'+(l==='kk'?'Аты: ':'Имя: ')+(fd.get('name')||'—')+'\n'+(l==='kk'?'Телефон: ':'Телефон: ')+(fd.get('phone')||'—')+'\n'+(l==='kk'?'Пікір: ':'Комментарий: ')+comment+'\nURL: '+location.href;emit('feedback_submit',{rating:state.rating});gotoScreen(root,'feedbackSuccess',null,false);setTimeout(function(){location.href='mailto:'+FEEDBACK_EMAIL+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body)},100)});
 root.querySelectorAll('a[href]').forEach(function(a){a.addEventListener('click',function(){var href=a.getAttribute('href')||'';if(href&&href.charAt(0)!=='#')emit('link',{href:href})})});
}
function shell(){var root=document.createElement('div');root.id='aromika-assistant';root.innerHTML='<div class="aa-teaser" role="status"><div class="aa-teaser-mascot">'+romiHTML('greeting','aa-romi--teaser')+'</div><div class="aa-teaser-copy"><button class="aa-teaser-close" type="button" aria-label="×">×</button><strong></strong><p></p></div></div><section class="aa-panel" role="dialog" aria-modal="false" aria-label="Aromika assistant"><div class="aa-topbar"><button class="aa-back" type="button" aria-label="Back">← <span></span></button><button class="aa-panel-close" type="button" aria-label="Close">×</button></div><div class="aa-screen"></div><div class="aa-foot"></div></section><button class="aa-launcher" type="button" aria-label="Romi — Aromika assistant" aria-expanded="false"><span class="aa-launcher-mascot">'+romiHTML('launcher','aa-romi--launcher')+'</span><svg class="aa-close-icon" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>';document.body.appendChild(root);return root}
function bindRoot(root){var launcher=root.querySelector('.aa-launcher'),teaser=root.querySelector('.aa-teaser'),panel=root.querySelector('.aa-panel');function close(){root.classList.remove('is-open');launcher.setAttribute('aria-expanded','false');document.documentElement.classList.remove('aa-lock-mobile');launcher.focus({preventScroll:true})}function open(){root.classList.add('is-open');launcher.setAttribute('aria-expanded','true');teaser.classList.remove('is-visible');if(window.innerWidth<=720)document.documentElement.classList.add('aa-lock-mobile');setTimeout(function(){var b=root.querySelector('.aa-panel-close');if(b)b.focus({preventScroll:true})},60)}launcher.addEventListener('click',function(){if(root.classList.contains('is-open'))close();else open();try{sessionStorage.setItem(TEASER_KEY,'1')}catch(e){}});root.querySelector('.aa-panel-close').addEventListener('click',close);root.querySelector('.aa-back').addEventListener('click',function(){back(root)});root.querySelector('.aa-teaser-close').addEventListener('click',function(e){e.stopPropagation();teaser.classList.remove('is-visible');try{sessionStorage.setItem(TEASER_KEY,'1')}catch(err){}});teaser.addEventListener('click',function(e){if(e.target.closest('.aa-teaser-close'))return;open();emit('teaser_open');try{sessionStorage.setItem(TEASER_KEY,'1')}catch(err){}});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('is-open'))close()});document.addEventListener('click',function(e){if(e.target.closest('[data-lang]'))setTimeout(function(){render(root)},60)});window.addEventListener('storage',function(e){if(e.key===LANG_KEY)render(root)});window.addEventListener('resize',function(){if(window.innerWidth>720)document.documentElement.classList.remove('aa-lock-mobile')},{passive:true});panel.addEventListener('click',function(e){e.stopPropagation()})}
function scheduleTeaser(root){var dismissed=false;try{dismissed=sessionStorage.getItem(TEASER_KEY)==='1'}catch(e){}if(dismissed)return;var shown=false,teaser=root.querySelector('.aa-teaser');function show(){if(shown||root.classList.contains('is-open'))return;shown=true;teaser.classList.add('is-visible');emit('teaser_show')}var delay=window.innerWidth<=720?40000:30000;setTimeout(show,delay);function onScroll(){var doc=document.documentElement,max=Math.max(1,doc.scrollHeight-window.innerHeight);if(window.scrollY/max>=.45){window.removeEventListener('scroll',onScroll);show()}}window.addEventListener('scroll',onScroll,{passive:true})}
function preload(){['launcher','greeting','finder','success'].forEach(function(k){var i=new Image();i.src=ROMI[k]})}
function init(){if(document.getElementById('aromika-assistant'))return;preload();var root=shell();render(root);bindRoot(root);scheduleTeaser(root)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
