(function(){try{var k='aromika-theme',s=localStorage.getItem(k),d=s?s==='dark':window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches,t=d?'dark':'light';document.documentElement.setAttribute('data-aromika-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();

window.__AROMIKA_ANTIBAK_BOOT__='starting';
(function(){
  var hero=document.getElementById('aromika-hero');
  var page=document.getElementById('antibak-page');
  if(!hero||!page)return;
  if(page.getAttribute('data-antibak-initialized')==='1')return;
  page.setAttribute('data-antibak-initialized','1');
  page.classList.add('ab-js-ready');
  window.__AROMIKA_ANTIBAK_VERSION__='v1';

  var headerDict={"ru":{"products":"Продукция","brands":"Бренды","about":"О компании","partners":"Партнёрам","careers":"Работа в компании","contacts":"Контакты","buyOnline":"Купить онлайн","shop":"Интернет-магазин"},"kk":{"products":"Өнімдер","brands":"Брендтер","about":"Компания туралы","partners":"Серіктестерге","careers":"Компаниядағы жұмыс","contacts":"Байланыс","buyOnline":"Онлайн сатып алу","shop":"Интернет-дүкен"}};
  var common={"ru":{"brandKicker":"Бренд Aromika","buySelected":"Купить выбранный продукт","allAntibak":"Все товары Antibak","series":"Серия","chooseCategory":"Выберите категорию","stripTitle":"Продукция Antibak","stripText":"Посуда разделена по литражу, а стирка, жидкое и твёрдое мыло вынесены в отдельные категории.","catDish1100":"Посуда 1100 мл","catDish500":"Посуда 500 мл","catDish3300":"Посуда 3300 мл","catLaundry":"Стирка","catLiquidSoap":"Жидкое мыло","catBarSoap":"Твёрдое мыло","allEyebrow":"Полный ассортимент","allTitle":"Вся продукция Antibak — в интернет-магазине","allText":"Все актуальные товары Antibak доступны в Aromika Shop.","allButton":"Смотреть весь ассортимент","orbitHint":"Нажмите на продукт или используйте стрелки"},"kk":{"brandKicker":"Aromika бренді","buySelected":"Таңдалған өнімді сатып алу","allAntibak":"Antibak барлық тауарлары","series":"Серия","chooseCategory":"Санатты таңдаңыз","stripTitle":"Antibak өнімдері","stripText":"Ыдыс жуу құралдары көлем бойынша бөлінген, ал кір жуу, сұйық және қатты сабын жеке санаттарға шығарылған.","catDish1100":"Ыдыс 1100 мл","catDish500":"Ыдыс 500 мл","catDish3300":"Ыдыс 3300 мл","catLaundry":"Кір жуу","catLiquidSoap":"Сұйық сабын","catBarSoap":"Қатты сабын","allEyebrow":"Толық ассортимент","allTitle":"Antibak өнімдерінің толық ассортименті — интернет-дүкенде","allText":"Antibak барлық өзекті тауарлары Aromika Shop дүкенінде қолжетімді.","allButton":"Барлық ассортиментті көру","orbitHint":"Өнімді басыңыз немесе көрсеткілерді қолданыңыз"}};
  var data={"dish1100":{"no":"01","ru":{"title":"посуда 1100 мл","lead":"Основная линейка Antibak для мытья посуды: пять ароматических вариантов и отдельный ECO гипоаллергенный продукт. Густые пенные формулы рассчитаны на ежедневную работу с жиром и пищевыми загрязнениями.","series":"Посуда 1100 мл","marquee":"ГУСТАЯ ПЕНА • ЖИР И ПЯТНА ДАЖЕ В ХОЛОДНОЙ ВОДЕ • 6 ВАРИАНТОВ • ECO ГИПОАЛЛЕРГЕННЫЙ • ANTIBAK • ","points":[{"kicker":"6 ВАРИАНТОВ","text":"Пять ароматов плюс отдельный ECO гипоаллергенный продукт."},{"kicker":"ГУСТАЯ ПЕНА","text":"Формулы помогают работать с жиром и пятнами даже в холодной воде."},{"kicker":"ПОД РАЗНЫЙ ЗАПРОС","text":"От свежих и фруктовых ароматов до отдельной ECO-концепции."}]},"kk":{"title":"ыдыс 1100 мл","lead":"Antibak ыдыс жууға арналған негізгі желісі: бес хош иісті нұсқа және жеке ECO гипоаллергенді өнім. Қою көбікті формулалар май мен тағамдық кірлермен күнделікті жұмыс істеуге арналған.","series":"Ыдыс 1100 мл","marquee":"ҚОЮ КӨБІК • МАЙ МЕН ДАҚТАР САЛҚЫН СУДА ДА • 6 НҰСҚА • ECO ГИПОАЛЛЕРГЕНДІ • ANTIBAK • ","points":[{"kicker":"6 НҰСҚА","text":"Бес хош иіс және жеке ECO гипоаллергенді өнім."},{"kicker":"ҚОЮ КӨБІК","text":"Формулалар май мен дақтармен салқын суда да жұмыс істеуге көмектеседі."},{"kicker":"ӘРТҮРЛІ СҰРАНЫСҚА","text":"Балғын және жемісті хош иістерден жеке ECO-концепцияға дейін."}]}},"dish500":{"no":"02","ru":{"title":"посуда 500 мл","lead":"Компактная линейка для ежедневного мытья посуды: Бамбук и олива, Гранатовый фреш, Лайм и мята и Цитрусовый фреш. Те же основные пенные формулы — в меньшей фасовке.","series":"Посуда 500 мл","marquee":"КОМПАКТНЫЙ ФОРМАТ 500 МЛ • 4 АРОМАТА • ГУСТАЯ ПЕНА • ЕЖЕДНЕВНОЕ МЫТЬЁ ПОСУДЫ • ANTIBAK • ","points":[{"kicker":"4 АРОМАТА","text":"Бамбук и олива, гранат, лайм и мята, цитрусовый фреш."},{"kicker":"500 МЛ","text":"Компактный формат для регулярного домашнего использования."},{"kicker":"СИСТЕМА ПАВ","text":"Амфотерные и анионные ПАВ работают с жирными и пищевыми загрязнениями."}]},"kk":{"title":"ыдыс 500 мл","lead":"Күнделікті ыдыс жууға арналған ықшам желі: Бамбук және зәйтүн, Анар фреш, Лайм және жалбыз, Цитрус фреш. Негізгі қою көбікті формулалар — кіші қаптамада.","series":"Ыдыс 500 мл","marquee":"500 МЛ ЫҚШАМ ФОРМАТ • 4 ХОШ ИІС • ҚОЮ КӨБІК • КҮНДЕЛІКТІ ЫДЫС ЖУУ • ANTIBAK • ","points":[{"kicker":"4 ХОШ ИІС","text":"Бамбук және зәйтүн, анар, лайм және жалбыз, цитрус фреш."},{"kicker":"500 МЛ","text":"Үйде тұрақты қолдануға арналған ықшам формат."},{"kicker":"ББЗ ЖҮЙЕСІ","text":"Амфотерлі және анионды ББЗ майлы және тағамдық кірлермен жұмыс істейді."}]}},"dish3300":{"no":"03","ru":{"title":"посуда 3300 мл","lead":"Большой формат Antibak для регулярного использования: Гранатовый фреш и Бамбук и олива. 3300 мл сохраняют знакомую густую пенную формулу и позволяют реже пополнять запас.","series":"Посуда 3300 мл","marquee":"БОЛЬШОЙ ФОРМАТ 3300 МЛ • ГРАНАТОВЫЙ ФРЕШ • БАМБУК И ОЛИВА • ГУСТАЯ ПЕНА • ANTIBAK • ","points":[{"kicker":"2 ВАРИАНТА","text":"Гранатовый фреш и Бамбук и олива."},{"kicker":"3300 МЛ","text":"Большая фасовка для регулярного домашнего использования."},{"kicker":"РЕЖЕ ПОПОЛНЯТЬ ЗАПАС","text":"Крупный объём без отказа от привычной формулы Antibak."}]},"kk":{"title":"ыдыс 3300 мл","lead":"Тұрақты қолдануға арналған Antibak үлкен форматы: Анар фреш және Бамбук және зәйтүн. 3300 мл таныс қою көбікті формуланы сақтап, қорды сирек толықтыруға мүмкіндік береді.","series":"Ыдыс 3300 мл","marquee":"3300 МЛ ҮЛКЕН ФОРМАТ • АНАР ФРЕШ • БАМБУК ЖӘНЕ ЗӘЙТҮН • ҚОЮ КӨБІК • ANTIBAK • ","points":[{"kicker":"2 НҰСҚА","text":"Анар фреш және Бамбук және зәйтүн."},{"kicker":"3300 МЛ","text":"Үйде тұрақты қолдануға арналған үлкен қаптама."},{"kicker":"ҚОРДЫ СИРЕК ТОЛЫҚТЫРУ","text":"Antibak таныс формуласынан бас тартпай үлкен көлем таңдау."}]}},"laundry":{"no":"04","ru":{"title":"стирка","lead":"Antibak Universal 4300 мл — отдельный антибактериальный продукт бренда для универсальной стирки. Формула сочетает несколько моющих компонентов, а рекомендуемая дозировка составляет 80 мл на 4–5 кг белья.","series":"Стирка","marquee":"UNIVERSAL 4300 МЛ • КОМПЛЕКС ПАВ • 80 МЛ НА 4–5 КГ БЕЛЬЯ • РУЧНАЯ И АВТОМАТИЧЕСКАЯ СТИРКА • ANTIBAK • ","points":[{"kicker":"UNIVERSAL","text":"Один универсальный продукт Antibak для повседневной стирки."},{"kicker":"КОМПЛЕКС ПАВ","text":"SLES, алкилбензолсульфоновая кислота и этоксилированные компоненты в составе."},{"kicker":"ДОЗИРОВКА","text":"80 мл на 4–5 кг белья; при жёсткой воде дозировку можно увеличить."}]},"kk":{"title":"кір жуу","lead":"Antibak Universal 4300 мл — әмбебап жууға арналған брендтің жеке бактерияға қарсы өнімі. Формула бірнеше жуғыш компонентті біріктіреді, ал ұсынылатын мөлшер — 4–5 кг киімге 80 мл.","series":"Кір жуу","marquee":"UNIVERSAL 4300 МЛ • ББЗ КЕШЕНІ • 4–5 КГ КИІМГЕ 80 МЛ • ҚОЛМЕН ЖӘНЕ МАШИНАМЕН ЖУУ • ANTIBAK • ","points":[{"kicker":"UNIVERSAL","text":"Күнделікті жууға арналған бір әмбебап Antibak өнімі."},{"kicker":"ББЗ КЕШЕНІ","text":"Құрамда SLES, алкилбензолсульфон қышқылы және этоксилденген компоненттер."},{"kicker":"МӨЛШЕРЛЕУ","text":"4–5 кг киімге 80 мл; кермек суда мөлшерді арттыруға болады."}]}},"liquidsoap":{"no":"05","ru":{"title":"жидкое мыло","lead":"Жидкое мыло Antibak объединяет Ультразащиту 800 мл и Nature Aloe в форматах 800 и 3300 мл. В Ультразащите заявлены алоэ вера, масло семян льна и антибактериальный комплекс; в Aloe 3300 мл — антибактериальный агент.","series":"Жидкое мыло","marquee":"УЛЬТРАЗАЩИТА • NATURE ALOE • АЛОЭ ВЕРА • МАСЛО СЕМЯН ЛЬНА • АНТИБАКТЕРИАЛЬНЫЙ КОМПЛЕКС • 800 / 3300 МЛ • ANTIBAK • ","points":[{"kicker":"3 SKU","text":"Ультразащита 800 мл и Nature Aloe 800 / 3300 мл."},{"kicker":"АКТИВНЫЕ КОМПОНЕНТЫ","text":"Алоэ вера, масло семян льна и антибактериальный комплекс — в Ультразащите."},{"kicker":"ДВА ФОРМАТА ALOE","text":"Nature Aloe можно выбрать в 800 или 3300 мл."}]},"kk":{"title":"сұйық сабын","lead":"Antibak сұйық сабыны 800 мл Ультрақорғаныс пен 800 және 3300 мл Nature Aloe нұсқаларын біріктіреді. Ультрақорғаныс құрамында алоэ вера, зығыр тұқымы майы және бактерияға қарсы кешен; Aloe 3300 мл-де бактерияға қарсы агент көрсетілген.","series":"Сұйық сабын","marquee":"УЛЬТРАҚОРҒАНЫС • NATURE ALOE • АЛОЭ ВЕРА • ЗЫҒЫР ТҰҚЫМЫ МАЙЫ • БАКТЕРИЯҒА ҚАРСЫ КЕШЕН • 800 / 3300 МЛ • ANTIBAK • ","points":[{"kicker":"3 SKU","text":"Ультрақорғаныс 800 мл және Nature Aloe 800 / 3300 мл."},{"kicker":"БЕЛСЕНДІ КОМПОНЕНТТЕР","text":"Ультрақорғаныс құрамында алоэ вера, зығыр тұқымы майы және бактерияға қарсы кешен."},{"kicker":"ALOE ЕКІ ФОРМАТТА","text":"Nature Aloe 800 немесе 3300 мл форматта таңдалады."}]}},"barsoap":{"no":"06","ru":{"title":"твёрдое мыло","lead":"Твёрдое мыло Antibak представлено в форматах 90 и 200 г: Алоэ, Бамбук и олива, антибактериальные / антимикробные варианты и Гиацинт. В описаниях магазина отмечены хорошее пенообразование и экономичный расход.","series":"Твёрдое мыло","marquee":"90 / 200 Г • АЛОЭ • БАМБУК И ОЛИВА • АНТИБАКТЕРИАЛЬНОЕ • АНТИМИКРОБНОЕ • ГИАЦИНТ • ЕЖЕДНЕВНОЕ ОЧИЩЕНИЕ • ANTIBAK • ","points":[{"kicker":"7 SKU","text":"Три варианта 90 г и четыре варианта 200 г."},{"kicker":"РАЗНЫЕ АРОМАТЫ","text":"Алоэ, Бамбук и олива, Гиацинт и функциональные варианты."},{"kicker":"НА КАЖДЫЙ ДЕНЬ","text":"Хорошее пенообразование и экономичный расход по описанию Aromika Shop."}]},"kk":{"title":"қатты сабын","lead":"Antibak қатты сабыны 90 және 200 г форматтарда ұсынылған: Алоэ, Бамбук және зәйтүн, бактерияға / микробқа қарсы нұсқалар және Гиацинт. Дүкен сипаттамаларында жақсы көбіктену мен үнемді жұмсалу атап өтілген.","series":"Қатты сабын","marquee":"90 / 200 Г • АЛОЭ • БАМБУК ЖӘНЕ ЗӘЙТҮН • БАКТЕРИЯҒА ҚАРСЫ • МИКРОБҚА ҚАРСЫ • ГИАЦИНТ • КҮНДЕЛІКТІ ТАЗАРТУ • ANTIBAK • ","points":[{"kicker":"7 SKU","text":"90 г үш нұсқа және 200 г төрт нұсқа."},{"kicker":"ӘРТҮРЛІ ХОШ ИІСТЕР","text":"Алоэ, Бамбук және зәйтүн, Гиацинт және функционалды нұсқалар."},{"kicker":"КҮН САЙЫН","text":"Aromika Shop сипаттамасына сәйкес жақсы көбіктену және үнемді жұмсалу."}]}}};
  var productInfoLabels={"ru":{"selected":"Выбранный продукт","purpose":"Назначение","feature":"Ключевая особенность","format":"Формат","shopMatched":"Карточка товара доступна в Aromika Shop","shopFallback":"Ищите этот товар в полном ассортименте Antibak","buyMatched":"Купить выбранный продукт","buyFallback":"Найти в магазине","price":"Цена на aromika.shop","priceNote":"Цена из каталога Aromika Shop","priceFallback":"Уточнить в магазине"},"kk":{"selected":"Таңдалған өнім","purpose":"Мақсаты","feature":"Негізгі ерекшелік","format":"Формат","shopMatched":"Тауар карточкасы Aromika Shop дүкенінде қолжетімді","shopFallback":"Бұл тауарды Antibak толық ассортиментінен іздеңіз","buyMatched":"Таңдалған өнімді сатып алу","buyFallback":"Дүкеннен табу","price":"aromika.shop бағасы","priceNote":"Aromika Shop каталогындағы баға","priceFallback":"Дүкеннен нақтылау"}};
  var productMeta={"dish1100":[{"ru":{"name":"Antibak Бамбук и олива 1100 мл","desc":"Густая пенная формула для ежедневного мытья посуды. По описанию Aromika Shop средство помогает удалять жир и пятна даже в холодной воде и препятствует повторному оседанию жира на уже вымытой посуде.","purpose":"Ежедневное мытьё посуды","feature":"Густая пена • жир и пятна в холодной воде","format":"1100 мл"},"kk":{"name":"Antibak Бамбук және зәйтүн 1100 мл","desc":"Күнделікті ыдыс жууға арналған қою көбікті формула. Aromika Shop сипаттамасына сәйкес, құрал май мен дақтарды салқын суда да кетіруге көмектеседі және жуылған ыдысқа майдың қайта тұнуын азайтады.","purpose":"Күнделікті ыдыс жуу","feature":"Қою көбік • салқын судағы май мен дақтар","format":"1100 мл"},"shop":{"matched":true,"product_id":"1708","product_code":"64","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-bambuk-i-oliva-1100-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Olive___Bamboo_1100.webp","image_source":"cs-cart","export_price":1392.0}},{"ru":{"name":"Antibak Цитрусовый фреш 1100 мл","desc":"Гель с цитрусовым ароматом и густой пеной. Формула на основе амфотерных и анионных ПАВ предназначена для ежедневного очищения посуды от жира и пищевых загрязнений.","purpose":"Ежедневное мытьё посуды","feature":"Амфотерные + анионные ПАВ","format":"1100 мл"},"kk":{"name":"Antibak Цитрус фреш 1100 мл","desc":"Цитрус хош иісі және қою көбігі бар гель. Амфотерлі және анионды ББЗ негізіндегі формула ыдысты май мен тағамдық кірлерден күнделікті тазартуға арналған.","purpose":"Күнделікті ыдыс жуу","feature":"Амфотерлі + анионды ББЗ","format":"1100 мл"},"shop":{"matched":true,"product_id":"1711","product_code":"67","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-citrusovyy-fresh-1100-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Citrus_Fresh_1100.webp","image_source":"cs-cart","export_price":1392.0}},{"ru":{"name":"Antibak Гранатовый фреш 1100 мл","desc":"Густой гель для ежедневного мытья посуды с ароматом граната. Помогает удалять жир и пятна, в том числе в холодной воде, а пена делает привычное мытьё посуды более комфортным.","purpose":"Ежедневное мытьё посуды","feature":"Густая пена • гранатовый аромат","format":"1100 мл"},"kk":{"name":"Antibak Анар фреш 1100 мл","desc":"Анар хош иісі бар күнделікті ыдыс жууға арналған қою гель. Май мен дақтарды, соның ішінде салқын суда да кетіруге көмектеседі, ал қою көбік жуу процесін ыңғайлы етеді.","purpose":"Күнделікті ыдыс жуу","feature":"Қою көбік • анар хош иісі","format":"1100 мл"},"shop":{"matched":true,"product_id":"1709","product_code":"65","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-granatovyy-fresh-1100-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Pomegranate_Fresh_1100.webp","image_source":"cs-cart","export_price":1392.0}},{"ru":{"name":"Antibak Лайм и мята 1100 мл","desc":"Гель с лаймом и мятой для ежедневного мытья посуды. Система ПАВ работает с жиром и пятнами, а свежая ароматическая композиция поддерживает ощущение чистоты.","purpose":"Ежедневное мытьё посуды","feature":"Лайм и мята • система ПАВ","format":"1100 мл"},"kk":{"name":"Antibak Лайм және жалбыз 1100 мл","desc":"Күнделікті ыдыс жууға арналған лайм мен жалбыз хош иісті гель. ББЗ жүйесі май мен дақтармен жұмыс істейді, ал балғын хош иіс тазалық сезімін толықтырады.","purpose":"Күнделікті ыдыс жуу","feature":"Лайм және жалбыз • ББЗ жүйесі","format":"1100 мл"},"shop":{"matched":true,"product_id":"1710","product_code":"66","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-laym-i-myata-1100-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Lime___Mint_1100.webp","image_source":"cs-cart","export_price":1392.0}},{"ru":{"name":"Antibak Морской 1100 мл","desc":"Гель для ежедневного мытья посуды с морской ароматической композицией. Густая пена и сочетание амфотерных и анионных ПАВ помогают очищать жирные и пищевые загрязнения.","purpose":"Ежедневное мытьё посуды","feature":"Морской аромат • густая пена","format":"1100 мл"},"kk":{"name":"Antibak Теңіз 1100 мл","desc":"Теңіз хош иісі бар күнделікті ыдыс жуу гелі. Қою көбік пен амфотерлі және анионды ББЗ үйлесімі майлы және тағамдық кірлерді тазартуға көмектеседі.","purpose":"Күнделікті ыдыс жуу","feature":"Теңіз хош иісі • қою көбік","format":"1100 мл"},"shop":{"matched":true,"product_id":"1712","product_code":"68","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-morskoy-1100-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Sea_1100.webp","image_source":"cs-cart","export_price":1392.0}},{"ru":{"name":"Antibak ECO гипоаллергенный 1100 мл","desc":"Отдельный ECO-вариант линейки с ароматом алоэ. В карточке Aromika Shop продукт обозначен как гипоаллергенный и разлагаемый; формула построена на моющей основе и анионных ПАВ.","purpose":"Ежедневное мытьё посуды","feature":"ECO • гипоаллергенный вариант","format":"1100 мл"},"kk":{"name":"Antibak ECO гипоаллергенді 1100 мл","desc":"Алоэ хош иісі бар желінің жеке ECO нұсқасы. Aromika Shop карточкасында өнім гипоаллергенді және ыдырайтын ретінде көрсетілген; формула жуғыш негіз бен анионды ББЗ-ға сүйенеді.","purpose":"Күнделікті ыдыс жуу","feature":"ECO • гипоаллергенді нұсқа","format":"1100 мл"},"shop":{"matched":true,"product_id":"1713","product_code":"63","url":"https://aromika.shop/vse-tovary/gipoallergennyy-gel-dlya-mytya-posudy-antibak-de-luxe-eco-1100-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_ECO_1100.webp","image_source":"cs-cart","export_price":1392.0}}],"dish500":[{"ru":{"name":"Antibak Бамбук и олива 500 мл","desc":"Компактный формат геля для ежедневного мытья посуды. Густая пена помогает работать с жиром и пятнами, а небольшая фасовка удобна для регулярного домашнего использования.","purpose":"Ежедневное мытьё посуды","feature":"Компактный формат • густая пена","format":"500 мл"},"kk":{"name":"Antibak Бамбук және зәйтүн 500 мл","desc":"Күнделікті ыдыс жууға арналған ықшам гель. Қою көбік май мен дақтармен жұмыс істеуге көмектеседі, ал шағын қаптама үйде тұрақты қолдануға ыңғайлы.","purpose":"Күнделікті ыдыс жуу","feature":"Ықшам формат • қою көбік","format":"500 мл"},"shop":{"matched":true,"product_id":"1729","product_code":"69","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-bambuk-i-oliva-500-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Olive___Bamboo_500.webp","image_source":"cs-cart","export_price":569.0}},{"ru":{"name":"Antibak Гранатовый фреш 500 мл","desc":"Компактный гель с гранатовым ароматом. Формула с амфотерными и анионными ПАВ предназначена для ежедневного очищения посуды и работы с жирными загрязнениями.","purpose":"Ежедневное мытьё посуды","feature":"Гранатовый аромат • система ПАВ","format":"500 мл"},"kk":{"name":"Antibak Анар фреш 500 мл","desc":"Анар хош иісі бар ықшам гель. Амфотерлі және анионды ББЗ бар формула ыдысты күнделікті тазартуға және майлы кірлермен жұмыс істеуге арналған.","purpose":"Күнделікті ыдыс жуу","feature":"Анар хош иісі • ББЗ жүйесі","format":"500 мл"},"shop":{"matched":true,"product_id":"1727","product_code":"70","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-granatovyy-fresh-500-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Pomegranate_Fresh_500.webp","image_source":"cs-cart","export_price":569.0}},{"ru":{"name":"Antibak Лайм и мята 500 мл","desc":"Гель для посуды с сочетанием лайма и мяты. Компактный объём удобен, если нужен отдельный аромат в небольшой фасовке без перехода на крупный формат.","purpose":"Ежедневное мытьё посуды","feature":"Лайм и мята • компактный объём","format":"500 мл"},"kk":{"name":"Antibak Лайм және жалбыз 500 мл","desc":"Лайм мен жалбыз үйлесімі бар ыдыс жуу гелі. Үлкен қаптамаға өтпей, жеке хош иісті шағын форматта таңдауға ыңғайлы.","purpose":"Күнделікті ыдыс жуу","feature":"Лайм және жалбыз • ықшам көлем","format":"500 мл"},"shop":{"matched":true,"product_id":"1728","product_code":"71","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-laym-i-myata-500-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Lime___Mint_500.webp","image_source":"cs-cart","export_price":569.0}},{"ru":{"name":"Antibak Цитрусовый фреш 500 мл","desc":"Цитрусовый вариант в компактной фасовке. Густая пенная формула рассчитана на ежедневное мытьё и помогает удалять жир и пищевые пятна.","purpose":"Ежедневное мытьё посуды","feature":"Цитрусовый аромат • густая пена","format":"500 мл"},"kk":{"name":"Antibak Цитрус фреш 500 мл","desc":"Ықшам қаптамадағы цитрус нұсқасы. Қою көбікті формула күнделікті жууға арналған және май мен тағамдық дақтарды кетіруге көмектеседі.","purpose":"Күнделікті ыдыс жуу","feature":"Цитрус хош иісі • қою көбік","format":"500 мл"},"shop":{"matched":true,"product_id":"1726","product_code":"72","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-citrusovyy-fresh-500-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Citrus_Fresh_500.webp","image_source":"cs-cart","export_price":569.0}}],"dish3300":[{"ru":{"name":"Antibak Гранатовый фреш 3300 мл","desc":"Большой формат геля для регулярного использования дома. Густая пенная формула помогает очищать жир и пятна даже в холодной воде, а 3300 мл позволяют реже пополнять запас.","purpose":"Ежедневное мытьё посуды","feature":"Большой формат • гранатовый аромат","format":"3300 мл"},"kk":{"name":"Antibak Анар фреш 3300 мл","desc":"Үйде тұрақты қолдануға арналған үлкен формат. Қою көбікті формула май мен дақтарды салқын суда да тазартуға көмектеседі, ал 3300 мл қорды сирек толықтыруға мүмкіндік береді.","purpose":"Күнделікті ыдыс жуу","feature":"Үлкен формат • анар хош иісі","format":"3300 мл"},"shop":{"matched":true,"product_id":"1735","product_code":"73","url":"https://aromika.shop/vse-tovary/sredstvo-dlya-mytya-posudy-antibak-de-luxe-granatovyy-fresh-3300-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Pomegranate_Fresh_3300.webp","image_source":"cs-cart","export_price":3496.0}},{"ru":{"name":"Antibak Бамбук и олива 3300 мл","desc":"Крупная фасовка варианта «Бамбук и олива». Подходит для регулярного использования, когда нужен большой запас средства для мытья посуды и знакомая густая пенная формула Antibak.","purpose":"Ежедневное мытьё посуды","feature":"Большой формат • бамбук и олива","format":"3300 мл"},"kk":{"name":"Antibak Бамбук және зәйтүн 3300 мл","desc":"«Бамбук және зәйтүн» нұсқасының үлкен қаптамасы. Ыдыс жууға арналған құралдың үлкен қоры және Antibak қою көбікті формуласы қажет болғанда тұрақты қолдануға ыңғайлы.","purpose":"Күнделікті ыдыс жуу","feature":"Үлкен формат • бамбук және зәйтүн","format":"3300 мл"},"shop":{"matched":true,"product_id":"119855","product_code":"74","url":"https://aromika.shop/vse-tovary/gel-dlya-mytya-posudy-antibak-granatovyy-fresh-3300-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_DG_Olive___Bamboo_3300.webp","image_source":"cs-cart","export_price":3496.0}}],"laundry":[{"ru":{"name":"Antibak Universal антибактериальный 4300 мл","desc":"Универсальный антибактериальный гель для стирки. В составе заявлены SLES, алкилбензолсульфоновая кислота, смесь этоксилированных жирных спиртов и жирных кислот, триполифосфат натрия и EDTA; дозировка — 80 мл на 4–5 кг белья.","purpose":"Универсальная стирка","feature":"Комплекс ПАВ • 80 мл на 4–5 кг","format":"4300 мл"},"kk":{"name":"Antibak Universal бактерияға қарсы 4300 мл","desc":"Әмбебап бактерияға қарсы кір жуу гелі. Құрамында SLES, алкилбензолсульфон қышқылы, этоксилденген майлы спирттер мен май қышқылдарының қоспасы, натрий триполифосфаты және EDTA көрсетілген; мөлшерлеу — 4–5 кг киімге 80 мл.","purpose":"Әмбебап жуу","feature":"ББЗ кешені • 4–5 кг-ға 80 мл","format":"4300 мл"},"shop":{"matched":true,"product_id":"1704","product_code":"14","url":"https://aromika.shop/vse-tovary/antibakterialnyy-gel-dlya-stirki-antibak-de-luxe-universal-4300-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_WG_4300.webp","image_source":"cs-cart","export_price":5084.0}}],"liquidsoap":[{"ru":{"name":"Antibak Ультразащита 800 мл","desc":"Антибактериальное жидкое мыло для ежедневного очищения рук. В формуле заявлены амфотерные и анионные ПАВ, экстракт алоэ вера, масло семян льна и антибактериальный комплекс.","purpose":"Ежедневное очищение рук","feature":"Алоэ вера + масло льна + антибактериальный комплекс","format":"800 мл"},"kk":{"name":"Antibak Ультрақорғаныс 800 мл","desc":"Қолды күнделікті тазартуға арналған бактерияға қарсы сұйық сабын. Формулада амфотерлі және анионды ББЗ, алоэ вера сығындысы, зығыр тұқымы майы және бактерияға қарсы кешен көрсетілген.","purpose":"Қолды күнделікті тазарту","feature":"Алоэ вера + зығыр майы + бактерияға қарсы кешен","format":"800 мл"},"shop":{"matched":true,"product_id":"1733","product_code":"152","url":"https://aromika.shop/vse-tovary/antibakterialnoe-zhidkoe-mylo-antibak-de-luxe-ultrazaschita-800-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_LS_Ultrasafe_800_1.webp","image_source":"cs-cart","export_price":1369.0}},{"ru":{"name":"Antibak Алоэ 800 мл","desc":"Жидкое мыло Nature Aloe для ежедневного очищения рук. Формат 800 мл удобен для регулярного использования дома, а Aloe-линия помогает выбрать вариант по аромату и назначению.","purpose":"Ежедневное очищение рук","feature":"Nature Aloe","format":"800 мл"},"kk":{"name":"Antibak Алоэ 800 мл","desc":"Қолды күнделікті тазартуға арналған Nature Aloe сұйық сабыны. 800 мл формат үйде тұрақты қолдануға ыңғайлы, ал Aloe желісі хош иіс пен мақсатқа қарай нұсқа таңдауға мүмкіндік береді.","purpose":"Қолды күнделікті тазарту","feature":"Nature Aloe","format":"800 мл"},"shop":{"matched":true,"product_id":"1842","product_code":"153","url":"https://aromika.shop/vse-tovary/antibakterialnoe-zhidkoe-mylo-antibak-de-luxe-nature-aloe-800-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_LS_Aloe_800_1.webp","image_source":"cs-cart","export_price":1369.0}},{"ru":{"name":"Antibak Алоэ 3300 мл","desc":"Большой формат жидкого мыла Nature Aloe. В опубликованном составе указаны вода, анионные ПАВ, моющая основа и антибактериальный агент — функциональная крупная фасовка для регулярного использования.","purpose":"Ежедневное очищение рук","feature":"Антибактериальный агент • большой формат","format":"3300 мл"},"kk":{"name":"Antibak Алоэ 3300 мл","desc":"Nature Aloe сұйық сабынының үлкен форматы. Жарияланған құрамда су, анионды ББЗ, жуғыш негіз және бактерияға қарсы агент көрсетілген — тұрақты қолдануға арналған функционалды үлкен қаптама.","purpose":"Қолды күнделікті тазарту","feature":"Бактерияға қарсы агент • үлкен формат","format":"3300 мл"},"shop":{"matched":true,"product_id":"1843","product_code":"154","url":"https://aromika.shop/vse-tovary/antibakterialnoe-zhidkoe-mylo-antibak-de-luxe-nature-aloe-330-ml/","image":"https://aromika.shop/images/detailed/138/Antibak_LS_Aloe_3300.webp","image_source":"cs-cart","export_price":3188.0}}],"barsoap":[{"ru":{"name":"Antibak Алоэ 90 г","desc":"Туалетное мыло с ароматом алоэ для ежедневного очищения. В описании Aromika Shop отмечены хорошее пенообразование и экономичный расход.","purpose":"Ежедневное очищение","feature":"Алоэ • хорошее пенообразование","format":"90 г"},"kk":{"name":"Antibak Алоэ 90 г","desc":"Күнделікті тазартуға арналған алоэ хош иісті дәретхана сабыны. Aromika Shop сипаттамасында жақсы көбіктену және үнемді жұмсалу атап өтілген.","purpose":"Күнделікті тазарту","feature":"Алоэ • жақсы көбіктену","format":"90 г"},"shop":{"matched":true,"product_id":"1925","product_code":"245","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-de-lux-nature-aloe-90g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibaksuperzaschita90.png","image_source":"cs-cart","export_price":308.0}},{"ru":{"name":"Antibak Антибактериальное 90 г","desc":"Компактное туалетное мыло в антибактериальном позиционировании. Подходит для ежедневного использования, хорошо пенится и экономично расходуется.","purpose":"Ежедневное очищение","feature":"Антибактериальный вариант","format":"90 г"},"kk":{"name":"Antibak Бактерияға қарсы 90 г","desc":"Бактерияға қарсы позициядағы ықшам дәретхана сабыны. Күнделікті қолдануға арналған, жақсы көбіктенеді және үнемді жұмсалады.","purpose":"Күнделікті тазарту","feature":"Бактерияға қарсы нұсқа","format":"90 г"},"shop":{"matched":true,"product_id":"1926","product_code":"246","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-de-lux-antimikrobnoe-90g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibakantimikrobnoe90.png","image_source":"cs-cart","export_price":308.0}},{"ru":{"name":"Antibak Бамбук и олива 90 г","desc":"Компактное туалетное мыло с ароматической композицией «Бамбук и олива». Хорошо пенится и подходит для ежедневного очищения.","purpose":"Ежедневное очищение","feature":"Бамбук и олива","format":"90 г"},"kk":{"name":"Antibak Бамбук және зәйтүн 90 г","desc":"«Бамбук және зәйтүн» хош иісті ықшам дәретхана сабыны. Жақсы көбіктенеді және күнделікті тазартуға арналған.","purpose":"Күнделікті тазарту","feature":"Бамбук және зәйтүн","format":"90 г"},"shop":{"matched":true,"product_id":"1927","product_code":"247","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-de-lux-bambuk-i-oliva-90g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibakOlivaibambuk90.png","image_source":"cs-cart","export_price":308.0}},{"ru":{"name":"Antibak Алоэ 200 г","desc":"Увеличенный формат туалетного мыла с ароматом алоэ. Хорошее пенообразование и экономичный расход делают 200 г практичным вариантом для ежедневного использования.","purpose":"Ежедневное очищение","feature":"Алоэ • увеличенный формат","format":"200 г"},"kk":{"name":"Antibak Алоэ 200 г","desc":"Алоэ хош иісті дәретхана сабынының үлкейтілген форматы. Жақсы көбіктену мен үнемді жұмсалу 200 г нұсқасын күнделікті қолдануға ыңғайлы етеді.","purpose":"Күнделікті тазарту","feature":"Алоэ • үлкейтілген формат","format":"200 г"},"shop":{"matched":true,"product_id":"1928","product_code":"248","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-de-lux-nature-aloe-200g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibaksuperzaschita.png","image_source":"cs-cart","export_price":705.0}},{"ru":{"name":"Antibak Антимикробное 200 г","desc":"Туалетное мыло 200 г в антимикробном позиционировании. Рассчитано на ежедневное очищение, хорошо пенится и представлено в более крупном формате.","purpose":"Ежедневное очищение","feature":"Антимикробный вариант","format":"200 г"},"kk":{"name":"Antibak Микробқа қарсы 200 г","desc":"Микробқа қарсы позициядағы 200 г дәретхана сабыны. Күнделікті тазартуға арналған, жақсы көбіктенеді және үлкенірек форматта ұсынылған.","purpose":"Күнделікті тазарту","feature":"Микробқа қарсы нұсқа","format":"200 г"},"shop":{"matched":true,"product_id":"1929","product_code":"249","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-delux-antimikrobnoe-200g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibakantimikrobnoe.png","image_source":"cs-cart","export_price":705.0}},{"ru":{"name":"Antibak Бамбук и олива 200 г","desc":"Большой формат туалетного мыла «Бамбук и олива». Отдельный аромат линейки в практичной фасовке 200 г для ежедневного использования.","purpose":"Ежедневное очищение","feature":"Бамбук и олива • 200 г","format":"200 г"},"kk":{"name":"Antibak Бамбук және зәйтүн 200 г","desc":"«Бамбук және зәйтүн» дәретхана сабынының үлкен форматы. Күнделікті қолдануға арналған 200 г практикалық қаптамадағы желінің жеке хош иісі.","purpose":"Күнделікті тазарту","feature":"Бамбук және зәйтүн • 200 г","format":"200 г"},"shop":{"matched":true,"product_id":"1930","product_code":"250","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-de-lux-bambuk-i-oliva-200g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibakOlivaibambuknovutv.png","image_source":"cs-cart","export_price":705.0}},{"ru":{"name":"Antibak Гиацинт 200 г","desc":"Туалетное мыло 200 г с ароматом гиацинта. Хорошо пенится, экономично расходуется и добавляет в линейку более цветочный ароматический профиль.","purpose":"Ежедневное очищение","feature":"Гиацинт • цветочный аромат","format":"200 г"},"kk":{"name":"Antibak Гиацинт 200 г","desc":"Гиацинт хош иісті 200 г дәретхана сабыны. Жақсы көбіктенеді, үнемді жұмсалады және желіге гүлді хош иіс профилін қосады.","purpose":"Күнделікті тазарту","feature":"Гиацинт • гүлді хош иіс","format":"200 г"},"shop":{"matched":true,"product_id":"1931","product_code":"251","url":"https://aromika.shop/vse-tovary/mylo-tualetnoe-antibak-delux-giacint-200g/","image":"https://aromika.shop/images/detailed/10/ObertkatualetnoemiloAntibakochischenieizaschitaGiacint.png","image_source":"cs-cart","export_price":705.0}}]};
  var lang='ru';
  try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  if(lang!=='ru'&&lang!=='kk')lang='ru';
  var prefersReducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyLang(){
    document.documentElement.lang=lang==='kk'?'kk':'ru';
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n');if(headerDict[lang][k]!==undefined)el.textContent=headerDict[lang][k];
    });
    document.querySelectorAll('[data-ab-i18n]').forEach(function(el){
      var k=el.getAttribute('data-ab-i18n');if(common[lang][k]!==undefined)el.textContent=common[lang][k];
    });
    document.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('is-active',b.getAttribute('data-lang')===lang)});
    var prevBtn=page.querySelector('.ab-orbit-prev'),nextBtn=page.querySelector('.ab-orbit-next');
    if(prevBtn)prevBtn.setAttribute('aria-label',lang==='kk'?'Алдыңғы өнім':'Предыдущий продукт');
    if(nextBtn)nextBtn.setAttribute('aria-label',lang==='kk'?'Келесі өнім':'Следующий продукт');
    var localNav=page.querySelector('.ab-local-nav');
    if(localNav)localNav.setAttribute('aria-label',lang==='kk'?'Antibak санаттары':'Категории Antibak');
    applyCategory(page.getAttribute('data-category')||'dish1100',false);
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
    var track=page.querySelector('.ab-marquee-track');
    if(!track)return;

    stopMarquee();
    var runId=marqueeRunId;

    var tokens=text.split('•').map(function(x){return x.trim()}).filter(Boolean);
    if(!tokens.length)return;

    function chip(label){
      var brand=label.toUpperCase()==='ANTIBAK';
      return '<span class="ab-marquee-chip'+(brand?' is-brand':'')+'">'+
        '<i aria-hidden="true"><b></b></i>'+
        '<span>'+label+'</span>'+
      '</span>';
    }

    var sequence='';
    for(var repeat=0;repeat<2;repeat++){
      tokens.forEach(function(label){sequence+=chip(label)});
    }

    track.innerHTML=
      '<div class="ab-marquee-group">'+sequence+'</div>'+
      '<div class="ab-marquee-group" aria-hidden="true">'+sequence+'</div>';

    track.style.setProperty('animation','none','important');
    track.style.setProperty('transform','translate3d(0,0,0)','important');

    requestAnimationFrame(function(){
      if(runId!==marqueeRunId)return;

      var firstGroup=track.querySelector('.ab-marquee-group');
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

    el=page.querySelector('.ab-product-info-label');
    if(el)el.textContent=labels.selected;

    el=page.querySelector('.ab-product-info-count');
    if(el)el.textContent=(index+1)+' / '+list.length;

    el=page.querySelector('.ab-product-info-name');
    if(el)el.textContent=item.name;

    el=page.querySelector('.ab-product-info-desc');
    if(el)el.textContent=item.desc;

    el=page.querySelector('.ab-info-purpose-label');
    if(el)el.textContent=labels.purpose;

    el=page.querySelector('.ab-info-feature-label');
    if(el)el.textContent=labels.feature;

    el=page.querySelector('.ab-info-format-label');
    if(el)el.textContent=labels.format;

    el=page.querySelector('.ab-info-purpose');
    if(el)el.textContent=item.purpose;

    el=page.querySelector('.ab-info-feature');
    if(el)el.textContent=item.feature;

    el=page.querySelector('.ab-info-format');
    if(el)el.textContent=item.format;

    var shop=(entry&&entry.shop)||{matched:false,url:null};
    var buyBtn=page.querySelector('.ab-selected-buy');
    var buyLabel=buyBtn&&buyBtn.querySelector('span');
    var stateText=page.querySelector('.ab-product-shop-text');
    var state=page.querySelector('.ab-product-shop-state');

    var priceLabel=page.querySelector('.ab-product-price-label');
    var priceValue=page.querySelector('.ab-product-price-value');
    var priceNote=page.querySelector('.ab-product-price-note');

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
      if(buyBtn)buyBtn.href="https://aromika.shop/index.php?dispatch=products.search&match=all&subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=antibak";
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
    if(!data[cat])cat='dish1100';
    page.setAttribute('data-category',cat);
    var d=data[cat][lang];
    page.querySelector('.ab-cat-no').textContent=data[cat].no;
    page.querySelector('[data-ab-i18n="title"]').textContent=d.title;
    page.querySelector('[data-ab-i18n="lead"]').textContent=d.lead;
    page.querySelector('.ab-series-name').textContent=d.series;
    var proof=page.querySelector('.ab-proof-grid');
    if(proof&&d.points){
      proof.innerHTML=d.points.map(function(p,i){
        return '<div class="ab-proof-item"><span>0'+(i+1)+'</span><div><small>'+p.kicker+'</small><b>'+p.text+'</b></div></div>';
      }).join('');
    }
    renderMarquee(d.marquee);
    page.querySelectorAll('.ab-products-scene').forEach(function(el){el.classList.toggle('is-active',el.getAttribute('data-scene')===cat)});
    page.querySelectorAll('[data-category]').forEach(function(el){var active=el.getAttribute('data-category')===cat;el.classList.toggle('is-active',active);if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',active?'true':'false')});
    var shopBtn=page.querySelector('.ab-all-antibak');if(shopBtn)shopBtn.href="https://aromika.shop/index.php?dispatch=products.search&match=all&subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=antibak";
    var localLinks=page.querySelector('.ab-local-links');var activeLocal=localLinks&&localLinks.querySelector('[data-category="'+cat+'"]');if(localLinks&&activeLocal&&matchMedia('(max-width:980px)').matches){var left=activeLocal.offsetLeft-(localLinks.clientWidth-activeLocal.offsetWidth)/2;localLinks.scrollTo({left:Math.max(0,left),behavior:prefersReducedMotion?'auto':'smooth'})}

  }

  document.addEventListener('click',function(e){
    var lb=e.target.closest('[data-lang]');
    if(lb){lang=lb.getAttribute('data-lang');try{localStorage.setItem('aromika-language',lang)}catch(err){}applyLang();return}
    var cb=e.target.closest('#antibak-page [data-category]');
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

    var items=Array.prototype.slice.call(scene.querySelectorAll('.ab-product-card'));
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
      var w=scene.clientWidth || page.querySelector('.ab-visual').clientWidth || 650;
      var h=scene.clientHeight || page.querySelector('.ab-visual').clientHeight || 640;
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
      el.setAttribute('role','button');el.setAttribute('tabindex','0');var cardImg=el.querySelector('img');el.setAttribute('aria-label',(cardImg&&cardImg.getAttribute('alt'))||'Продукт Antibak');

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

  page.querySelectorAll('.ab-products-scene').forEach(createOrbit);

  var orbitPrev=page.querySelector('.ab-orbit-prev');
  var orbitNext=page.querySelector('.ab-orbit-next');

  function rotateActiveOrbit(dir){
    var cat=page.getAttribute('data-category')||'dish1100';
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
      var scene=page.querySelector('.ab-products-scene[data-scene="'+cat+'"]');
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
    var cat=page.getAttribute('data-category')||'dish1100';
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

window.__AROMIKA_ANTIBAK_VERSION__='v1';
window.__AROMIKA_ANTIBAK_BOOT__='ready';