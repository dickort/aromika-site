
(function(){try{var k='aromika-theme',s=localStorage.getItem(k),d=s?s==='dark':window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches,t=d?'dark':'light';document.documentElement.setAttribute('data-aromika-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();

window.__AROMIKA_MAXIPOWER_BOOT__='starting';

(function(){
  var hero=document.getElementById('aromika-hero');
  var page=document.getElementById('maxipower-page');
  if(!hero||!page)return;
  if(page.getAttribute('data-maxipower-initialized')==='1')return;
  page.setAttribute('data-maxipower-initialized','1');
  page.classList.add('mp-js-ready');
  window.__AROMIKA_MAXIPOWER_VERSION__='v1';

  var headerDict={
    ru:{products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин'},
    kk:{products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен'}
  };

  var common={"ru":{"brandKicker":"Бренд Aromika","buySelected":"Купить выбранный продукт","allMaxi":"Все товары Maxi Power","series":"Серия","chooseCategory":"Выберите категорию","stripTitle":"Продукция Maxi Power","stripText":"На бренд-странице собраны средства для стирки и элементы питания Maxi Power.","catLaundry":"Стирка","catBatteries":"Батарейки","allEyebrow":"Полный ассортимент","allTitle":"Вся продукция Maxi Power — в интернет-магазине","allText":"Все актуальные товары Maxi Power доступны в Aromika Shop.","allButton":"Смотреть весь ассортимент","orbitHint":"Нажмите на продукт или используйте стрелки"},"kk":{"brandKicker":"Aromika бренді","buySelected":"Таңдалған өнімді сатып алу","allMaxi":"Maxi Power барлық тауарлары","series":"Серия","chooseCategory":"Санатты таңдаңыз","stripTitle":"Maxi Power өнімдері","stripText":"Бренд парақшасында Maxi Power кір жуу құралдары мен қуат элементтері жинақталған.","catLaundry":"Кір жуу","catBatteries":"Батареялар","allEyebrow":"Толық ассортимент","allTitle":"Maxi Power өнімдерінің толық ассортименті — интернет-дүкенде","allText":"Maxi Power барлық өзекті тауарлары Aromika Shop дүкенінде қолжетімді.","allButton":"Барлық ассортиментті көру","orbitHint":"Өнімді басыңыз немесе көрсеткілерді қолданыңыз"}};
  var data={"laundry":{"no":"01","ru":{"title":"для стирки","lead":"Maxi Power объединяет гели для разных задач стирки, большой формат 5000 мл и капсулы с пятновыводителем. В линейке есть Universal, Color, Dark & Black, Пятновыводитель и Ультрасвежесть.","series":"Стирка","marquee":"UNIVERSAL • COLOR • DARK & BLACK • ПЯТНОВЫВОДИТЕЛЬ • УЛЬТРАСВЕЖЕСТЬ • 3300 / 5000 МЛ • 25 КАПСУЛ • MAXI POWER • "},"kk":{"title":"кір жууға арналған","lead":"Maxi Power әртүрлі жуу міндеттеріне арналған гельдерді, 5000 мл үлкен форматты және дақ кетіргіші бар капсулаларды біріктіреді. Желіде Universal, Color, Dark & Black, Дақ кетіргіш және Ультрабалғындық нұсқалары бар.","series":"Кір жуу","marquee":"UNIVERSAL • COLOR • DARK & BLACK • ДАҚ КЕТІРГІШ • УЛЬТРАБАЛҒЫНДЫҚ • 3300 / 5000 МЛ • 25 КАПСУЛА • MAXI POWER • "}},"batteries":{"no":"02","ru":{"title":"для дома","lead":"В ассортименте Maxi Power также представлены батарейки типоразмеров AA и AAA в упаковках по 2 и 4 штуки. На странице собраны все варианты из текущего каталога Aromika Shop.","series":"Батарейки","marquee":"AA • AAA • 2 ШТ • 4 ШТ • MAXI POWER • "},"kk":{"title":"үйге арналған","lead":"Maxi Power ассортиментінде AA және AAA өлшеміндегі батареялар 2 және 4 данадан қаптамада ұсынылған. Бұл бетте Aromika Shop каталогындағы барлық өзекті нұсқалар жинақталған.","series":"Батареялар","marquee":"AA • AAA • 2 ДАНА • 4 ДАНА • MAXI POWER • "}}};
  var productInfoLabels={"ru":{"selected":"Выбранный продукт","purpose":"Назначение","feature":"Ключевая особенность","format":"Формат","shopMatched":"Карточка товара доступна в Aromika Shop","buyMatched":"Купить выбранный продукт","price":"Цена на aromika.shop","priceNote":"Цена из каталога Aromika Shop"},"kk":{"selected":"Таңдалған өнім","purpose":"Мақсаты","feature":"Негізгі ерекшелік","format":"Формат","shopMatched":"Тауар карточкасы Aromika Shop дүкенінде қолжетімді","buyMatched":"Таңдалған өнімді сатып алу","price":"aromika.shop бағасы","priceNote":"Aromika Shop каталогындағы баға"}};
  var productMeta={"laundry":[{"ru":{"name":"Maxi Power Color 3300 мл","desc":"Гель для стирки цветного белья.","purpose":"Цветное бельё","feature":"Энзимы + ингибитор переноса красителя","format":"3300 мл"},"kk":{"name":"Maxi Power Color 3300 мл","desc":"Түсті киімді жууға арналған гель.","purpose":"Түсті киім","feature":"Энзимдер + бояғыштың ауысуын тежегіш","format":"3300 мл"},"shop":{"matched":true,"product_id":"1664","product_code":"16","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-maxi-power-color-3300-ml/","image":"https://aromika.shop/images/detailed/138/LG_MaxiPower_Color.webp","image_source":"cs-cart","export_price":5012.0}},{"ru":{"name":"Maxi Power Dark & Black 3300 мл","desc":"Гель для стирки чёрного и тёмного белья.","purpose":"Чёрное и тёмное бельё","feature":"Ингибитор переноса красителя","format":"3300 мл"},"kk":{"name":"Maxi Power Dark & Black 3300 мл","desc":"Қара және қою түсті киімді жууға арналған гель.","purpose":"Қара және қою түсті киім","feature":"Бояғыштың ауысуын тежегіш","format":"3300 мл"},"shop":{"matched":true,"product_id":"1665","product_code":"18","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-maxi-power-dark-and-black-3300-ml/","image":"https://aromika.shop/images/detailed/138/LG_MaxiPower_Dark.webp","image_source":"cs-cart","export_price":5012.0}},{"ru":{"name":"Maxi Power + Пятновыводитель 3300 мл","desc":"Гель для стирки с пятновыводителем.","purpose":"Стирка загрязнённого белья","feature":"Энзимы","format":"3300 мл"},"kk":{"name":"Maxi Power + Дақ кетіргіш 3300 мл","desc":"Дақ кетіргіші бар кір жуу гелі.","purpose":"Ластанған киімді жуу","feature":"Энзимдер","format":"3300 мл"},"shop":{"matched":true,"product_id":"1666","product_code":"17","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-maxi-power-pyatnovyvoditel-3300-ml/","image":"https://aromika.shop/images/detailed/138/LG_MaxiPower_Remover.webp","image_source":"cs-cart","export_price":5012.0}},{"ru":{"name":"Maxi Power Universal 3300 мл","desc":"Универсальный гель для повседневной стирки.","purpose":"Универсальная стирка","feature":"Оптический отбеливатель","format":"3300 мл"},"kk":{"name":"Maxi Power Universal 3300 мл","desc":"Күнделікті жууға арналған әмбебап гель.","purpose":"Әмбебап жуу","feature":"Оптикалық ағартқыш","format":"3300 мл"},"shop":{"matched":true,"product_id":"1663","product_code":"15","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-maxi-power-universal-3300-ml/","image":"https://aromika.shop/images/detailed/138/LG_MaxiPower_Univrtsal.webp","image_source":"cs-cart","export_price":5012.0}},{"ru":{"name":"Maxi Power Ультрасвежесть 3300 мл","desc":"Гель для стирки серии «Ультрасвежесть».","purpose":"Повседневная стирка","feature":"Энзимы + ингибитор переноса красителя","format":"3300 мл"},"kk":{"name":"Maxi Power Ультрабалғындық 3300 мл","desc":"«Ультрабалғындық» сериясындағы кір жуу гелі.","purpose":"Күнделікті жуу","feature":"Энзимдер + бояғыштың ауысуын тежегіш","format":"3300 мл"},"shop":{"matched":true,"product_id":"1667","product_code":"19","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-maxi-power-ultrasvezhest-3300-ml/","image":"https://aromika.shop/images/detailed/138/LG_MaxiPower_Ultra.webp","image_source":"cs-cart","export_price":5012.0}},{"ru":{"name":"Maxi Power Ультрасвежесть 5000 мл","desc":"Гель для стирки в большом формате.","purpose":"Повседневная стирка","feature":"Большой формат","format":"5000 мл"},"kk":{"name":"Maxi Power Ультрабалғындық 5000 мл","desc":"Үлкен форматтағы кір жуу гелі.","purpose":"Күнделікті жуу","feature":"Үлкен формат","format":"5000 мл"},"shop":{"matched":true,"product_id":"130623","product_code":"531","url":"https://aromika.shop/vse-tovary/gel-dlya-stirki-maxi-power-5000-ml/","image":"https://aromika.shop/images/detailed/138/MaxiPOWER_ULTRA_5000.webp","image_source":"cs-cart","export_price":5233.0}},{"ru":{"name":"Maxi Power капсулы + пятновыводитель","desc":"Капсулы для стирки с пятновыводителем.","purpose":"Стирка разных типов тканей","feature":"С пятновыводителем","format":"25 капсул"},"kk":{"name":"Maxi Power капсулалары + дақ кетіргіш","desc":"Дақ кетіргіші бар кір жуу капсулалары.","purpose":"Әртүрлі мата түрлерін жуу","feature":"Дақ кетіргіші бар","format":"25 капсула"},"shop":{"matched":true,"product_id":"130116","product_code":"482","url":"https://aromika.shop/vse-tovary/kapsuly-dlya-stirki-maxi-power-c-pyatnovyvoditelem-25-sht/","image":"https://aromika.shop/images/detailed/138/Capsules_Maxi_Power_Front.webp","image_source":"cs-cart","export_price":3209.0}}],"batteries":[{"ru":{"name":"Maxi Power AAA 2 шт.","desc":"Батарейки типоразмера AAA.","purpose":"Элементы питания","feature":"Типоразмер AAA","format":"2 шт."},"kk":{"name":"Maxi Power AAA 2 дана","desc":"AAA өлшеміндегі батареялар.","purpose":"Қуат элементтері","feature":"AAA өлшемі","format":"2 дана"},"shop":{"matched":true,"product_id":"130079","product_code":"448","url":"https://aromika.shop/vse-tovary/batareyki-maxi-power-aaa/","image":"https://aromika.shop/images/detailed/137/батарейки_макси_повер_2_шт.webp","image_source":"cs-cart","export_price":297.0}},{"ru":{"name":"Maxi Power AAA 4 шт.","desc":"Батарейки типоразмера AAA.","purpose":"Элементы питания","feature":"Типоразмер AAA","format":"4 шт."},"kk":{"name":"Maxi Power AAA 4 дана","desc":"AAA өлшеміндегі батареялар.","purpose":"Қуат элементтері","feature":"AAA өлшемі","format":"4 дана"},"shop":{"matched":true,"product_id":"130080","product_code":"449","url":"https://aromika.shop/vse-tovary/batareyki-maxi-power-aaa-4-sht/","image":"https://aromika.shop/images/detailed/137/батарейки_макси_повер_4_шт.webp","image_source":"cs-cart","export_price":557.0}},{"ru":{"name":"Maxi Power AAA 4 шт., шринк","desc":"Батарейки AAA в шринк-упаковке.","purpose":"Элементы питания","feature":"AAA, шринк-упаковка","format":"4 шт."},"kk":{"name":"Maxi Power AAA 4 дана, шринк","desc":"Шринк-қаптамадағы AAA батареялары.","purpose":"Қуат элементтері","feature":"AAA, шринк-қаптама","format":"4 дана"},"shop":{"matched":true,"product_id":"130081","product_code":"450","url":"https://aromika.shop/vse-tovary/batareyki-maxi-power-aaa-4-sht-ru/","image":"https://aromika.shop/images/detailed/137/батарейки_в_шринке_макси_повер_4_шт.webp","image_source":"cs-cart","export_price":482.0}},{"ru":{"name":"Maxi Power AA 2 шт.","desc":"Батарейки типоразмера AA.","purpose":"Элементы питания","feature":"Типоразмер AA","format":"2 шт."},"kk":{"name":"Maxi Power AA 2 дана","desc":"AA өлшеміндегі батареялар.","purpose":"Қуат элементтері","feature":"AA өлшемі","format":"2 дана"},"shop":{"matched":true,"product_id":"130085","product_code":"455","url":"https://aromika.shop/vse-tovary/batareyki-maxi-power-aa-2-sht/","image":"https://aromika.shop/images/detailed/137/Изображение_WhatsApp_2024-07-03_в_16.09.10_8521c356.jpg","image_source":"cs-cart","export_price":366.0}},{"ru":{"name":"Maxi Power AA 4 шт.","desc":"Батарейки типоразмера AA.","purpose":"Элементы питания","feature":"Типоразмер AA","format":"4 шт."},"kk":{"name":"Maxi Power AA 4 дана","desc":"AA өлшеміндегі батареялар.","purpose":"Қуат элементтері","feature":"AA өлшемі","format":"4 дана"},"shop":{"matched":true,"product_id":"130086","product_code":"454","url":"https://aromika.shop/vse-tovary/batareyki-maxi-power-aa-4-sht/","image":"https://aromika.shop/images/detailed/137/Изображение_WhatsApp_2024-07-03_в_16.09.11_a7439f35.jpg","image_source":"cs-cart","export_price":665.0}},{"ru":{"name":"Maxi Power AA 4 шт., шринк","desc":"Батарейки AA в шринк-упаковке.","purpose":"Элементы питания","feature":"AA, шринк-упаковка","format":"4 шт."},"kk":{"name":"Maxi Power AA 4 дана, шринк","desc":"Шринк-қаптамадағы AA батареялары.","purpose":"Қуат элементтері","feature":"AA, шринк-қаптама","format":"4 дана"},"shop":{"matched":true,"product_id":"130087","product_code":"456","url":"https://aromika.shop/vse-tovary/batareyki-maxi-power-aa-4-sht-ru/","image":"https://aromika.shop/images/detailed/137/батарейки_в_шринке_макси_повер_4_шт_9eax-oo.webp","image_source":"cs-cart","export_price":596.0}}]};

  var lang='ru';
  try{lang=localStorage.getItem('aromika-language')||'ru'}catch(e){}
  if(lang!=='ru'&&lang!=='kk')lang='ru';
  var prefersReducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function formatPrice(value){
    var n=Number(value);
    if(!isFinite(n)||n<=0)return '';
    return Math.round(n).toLocaleString(lang==='kk'?'kk-KZ':'ru-RU')+' ₸';
  }

  var marqueeRaf=0,marqueeRunId=0;
  function stopMarquee(){
    marqueeRunId++;
    if(marqueeRaf){cancelAnimationFrame(marqueeRaf);marqueeRaf=0;}
  }

  function renderMarquee(text){
    var track=page.querySelector('.mp-marquee-track');
    if(!track)return;
    stopMarquee();
    var runId=marqueeRunId;
    var tokens=text.split('•').map(function(x){return x.trim()}).filter(Boolean);
    function chip(label){
      var brand=label.toUpperCase()==='MAXI POWER';
      return '<span class="mp-marquee-chip'+(brand?' is-brand':'')+'"><i aria-hidden="true"><b></b></i><span>'+label+'</span></span>';
    }
    var sequence='';
    for(var repeat=0;repeat<2;repeat++)tokens.forEach(function(label){sequence+=chip(label)});
    track.innerHTML='<div class="mp-marquee-group">'+sequence+'</div><div class="mp-marquee-group" aria-hidden="true">'+sequence+'</div>';
    track.style.setProperty('animation','none','important');
    track.style.setProperty('transform','translate3d(0,0,0)','important');

    requestAnimationFrame(function(){
      if(runId!==marqueeRunId)return;
      var first=track.querySelector('.mp-marquee-group');
      if(!first)return;
      var distance=first.getBoundingClientRect().width;
      if(!distance)return;
      var offset=0,last=0,speed=prefersReducedMotion?16:30;
      function tick(now){
        if(runId!==marqueeRunId)return;
        if(!last)last=now;
        var dt=Math.min(50,now-last)/1000;last=now;offset+=speed*dt;
        if(offset>=distance)offset%=distance;
        track.style.setProperty('transform','translate3d('+(-offset.toFixed(2))+'px,0,0)','important');
        marqueeRaf=requestAnimationFrame(tick);
      }
      marqueeRaf=requestAnimationFrame(tick);
    });
  }

  function updateProductInfo(cat,index){
    var list=productMeta[cat];
    if(!list||!list.length)return;
    index=((index%list.length)+list.length)%list.length;
    var entry=list[index],item=entry&&entry[lang];
    if(!item)return;
    var labels=productInfoLabels[lang],el;

    el=page.querySelector('.mp-product-info-label');if(el)el.textContent=labels.selected;
    el=page.querySelector('.mp-product-info-count');if(el)el.textContent=(index+1)+' / '+list.length;
    el=page.querySelector('.mp-product-info-name');if(el)el.textContent=item.name;
    el=page.querySelector('.mp-product-info-desc');if(el)el.textContent=item.desc;
    el=page.querySelector('.mp-info-purpose-label');if(el)el.textContent=labels.purpose;
    el=page.querySelector('.mp-info-feature-label');if(el)el.textContent=labels.feature;
    el=page.querySelector('.mp-info-format-label');if(el)el.textContent=labels.format;
    el=page.querySelector('.mp-info-purpose');if(el)el.textContent=item.purpose;
    el=page.querySelector('.mp-info-feature');if(el)el.textContent=item.feature;
    el=page.querySelector('.mp-info-format');if(el)el.textContent=item.format;

    var shop=entry.shop||{};
    var buy=page.querySelector('.mp-selected-buy'),buyLabel=buy&&buy.querySelector('span');
    var stateText=page.querySelector('.mp-product-shop-text');
    var priceLabel=page.querySelector('.mp-product-price-label');
    var priceValue=page.querySelector('.mp-product-price-value');
    var priceNote=page.querySelector('.mp-product-price-note');

    if(priceLabel)priceLabel.textContent=labels.price;
    if(priceValue)priceValue.textContent=formatPrice(shop.export_price);
    if(priceNote)priceNote.textContent=labels.priceNote;
    if(buy&&shop.url)buy.href=shop.url;
    if(buyLabel)buyLabel.textContent=labels.buyMatched;
    if(stateText)stateText.textContent=labels.shopMatched;
  }

  var orbitControllers={};

  function createOrbit(scene){
    if(!scene||scene.dataset.orbitReady==='1')return orbitControllers[scene.dataset.scene];
    scene.dataset.orbitReady='1';
    var items=Array.prototype.slice.call(scene.querySelectorAll('.mp-product-card'));
    if(!items.length)return null;

    var N=items.length,TWO=Math.PI*2,STEP=TWO/N,FRONT=Math.PI/2;
    var startIndex=N===2?0:Math.floor((N-1)/2);
    var selectedIndex=startIndex,current=FRONT-startIndex*STEP,target=current,from=current,start=0;
    var duration=2050,activeDuration=duration,moving=false,raf=0,lastInteraction=0;

    function markInteraction(){lastInteraction=Date.now()}
    function norm(a){while(a>Math.PI)a-=TWO;while(a<-Math.PI)a+=TWO;return a}
    function ease(t){return -(Math.cos(Math.PI*t)-1)/2}
    function depthFor(i){var a=i*STEP+current;return (Math.sin(a)+1)/2}

    function draw(){
      var w=scene.clientWidth||page.querySelector('.mp-visual').clientWidth||650;
      var h=scene.clientHeight||page.querySelector('.mp-visual').clientHeight||640;
      var cx=w*.50,cy=h*.47;
      var compact=matchMedia('(max-width:640px)').matches;
      var batteryScene=scene.getAttribute('data-scene')==='batteries';
      var rx=w*(compact?(N>=7?.31:.29):(batteryScene?.31:(N>=7?.33:.32)));
      var ry=h*(compact?(batteryScene?.12:.145):(batteryScene?.13:.17));
      var frontIndex=0,frontDepth=-1,depth=[];

      items.forEach(function(el,i){
        var a=i*STEP+current,x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry,d=(Math.sin(a)+1)/2;
        var minScale=batteryScene?(compact?.62:.64):(compact?.56:.58);
        var maxAdd=batteryScene?(compact?.42:.46):(compact?.50:.54);
        var scale=minScale+d*maxAdd;
        if(i===selectedIndex)scale*=1+0.10*Math.pow(d,2.35);
        var rot=Math.cos(a)*(compact?4:(N>=7?4.6:5.5));

        el.style.transform='translate3d('+(x-el.offsetWidth/2)+'px,'+(y-el.offsetHeight*.72)+'px,'+(d*105)+'px) scale('+scale+') rotate('+rot+'deg)';
        el.style.opacity=1;
        el.style.filter='brightness('+(.96+d*.04)+') saturate('+(.94+d*.06)+')';
        depth.push({el:el,d:d});
        if(d>frontDepth){frontDepth=d;frontIndex=i;}
      });

      depth.sort(function(a,b){return a.d-b.d});
      depth.forEach(function(x,i){x.el.style.zIndex=3+i});
      items.forEach(function(el,i){
        el.classList.toggle('is-front',i===frontIndex);
        el.classList.toggle('is-selected',i===selectedIndex);
        if(i===selectedIndex&&depthFor(i)>.94)el.style.zIndex=99;
      });
    }

    function frame(now){
      if(!moving)return;
      var t=(now-start)/activeDuration;
      if(t>=1){current=target;moving=false;draw();return;}
      current=from+(target-from)*ease(t);draw();raf=requestAnimationFrame(frame);
    }
    function go(next){
      if(moving)cancelAnimationFrame(raf);
      from=current;target=current+norm(next-current);start=performance.now();moving=true;
      activeDuration=prefersReducedMotion?900:duration;raf=requestAnimationFrame(frame);
    }
    function front(index){
      selectedIndex=(index+N)%N;updateProductInfo(scene.getAttribute('data-scene'),selectedIndex);go(FRONT-selectedIndex*STEP);
    }
    function rotate(dir){front(selectedIndex+dir)}

    items.forEach(function(el,i){
      el.setAttribute('role','button');el.setAttribute('tabindex','0');
      var img=el.querySelector('img');el.setAttribute('aria-label',(img&&img.alt)||'Maxi Power');
      el.addEventListener('click',function(e){e.preventDefault();markInteraction();front(i)});
      el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();markInteraction();front(i)}});
    });

    var sx=0,sy=0;
    scene.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;sx=e.clientX;sy=e.clientY});
    scene.addEventListener('pointerup',function(e){
      if(e.pointerType==='mouse')return;
      var dx=e.clientX-sx,dy=e.clientY-sy;
      if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){markInteraction();rotate(dx<0?-1:1)}
    });

    if(matchMedia('(max-width:980px)').matches&&!prefersReducedMotion){
      setInterval(function(){
        if(scene.classList.contains('is-active')&&!moving&&!document.hidden&&Date.now()-lastInteraction>10000)rotate(-1);
      },8000);
    }

    var ctl={draw:draw,front:function(i){markInteraction();front(i)},rotate:function(d){markInteraction();rotate(d)},getSelected:function(){return selectedIndex}};
    orbitControllers[scene.dataset.scene]=ctl;
    draw();updateProductInfo(scene.getAttribute('data-scene'),selectedIndex);
    return ctl;
  }

  function applyCategory(cat){
    if(!data[cat])cat='laundry';
    page.setAttribute('data-category',cat);
    var d=data[cat][lang];
    page.querySelector('.mp-cat-no').textContent=data[cat].no;
    page.querySelector('[data-mp-i18n="title"]').textContent=d.title;
    page.querySelector('[data-mp-i18n="lead"]').textContent=d.lead;
    page.querySelector('.mp-series-name').textContent=d.series;
    renderMarquee(d.marquee);
    page.querySelectorAll('.mp-products-scene').forEach(function(el){el.classList.toggle('is-active',el.dataset.scene===cat)});
    page.querySelectorAll('#maxipower-page [data-category]').forEach(function(el){
      var active=el.dataset.category===cat;el.classList.toggle('is-active',active);
      if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',active?'true':'false');
    });
    var all=page.querySelector('.mp-all-maxi');if(all)all.href="https://aromika.shop/index.php?dispatch=products.search&match=all&subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=maxi+power";
    requestAnimationFrame(function(){
      var scene=page.querySelector('.mp-products-scene[data-scene="'+cat+'"]');
      var ctl=createOrbit(scene);if(ctl){ctl.draw();updateProductInfo(cat,ctl.getSelected());}
    });
  }

  function applyLang(){
    document.documentElement.lang=lang==='kk'?'kk':'ru';
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n');if(headerDict[lang][k]!==undefined)el.textContent=headerDict[lang][k];
    });
    document.querySelectorAll('[data-mp-i18n]').forEach(function(el){
      var k=el.getAttribute('data-mp-i18n');if(common[lang][k]!==undefined)el.textContent=common[lang][k];
    });
    document.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('is-active',b.getAttribute('data-lang')===lang)});
    var prev=page.querySelector('.mp-orbit-prev'),next=page.querySelector('.mp-orbit-next');
    if(prev)prev.setAttribute('aria-label',lang==='kk'?'Алдыңғы өнім':'Предыдущий продукт');
    if(next)next.setAttribute('aria-label',lang==='kk'?'Келесі өнім':'Следующий продукт');
    var nav=page.querySelector('.mp-local-nav');if(nav)nav.setAttribute('aria-label',lang==='kk'?'Maxi Power санаттары':'Категории Maxi Power');
    applyCategory(page.getAttribute('data-category')||'laundry');
  }

  document.addEventListener('click',function(e){
    var lb=e.target.closest('[data-lang]');
    if(lb){lang=lb.getAttribute('data-lang');try{localStorage.setItem('aromika-language',lang)}catch(err){}applyLang();return;}
    var cb=e.target.closest('#maxipower-page [data-category]');
    if(cb){applyCategory(cb.getAttribute('data-category'));return;}
  });

  // Header burger
  var burger=hero.querySelector('.ar-burger'),menu=hero.querySelector('.ar-menu'),overlay=hero.querySelector('.ar-overlay');
  function toggleMenu(open){if(burger)burger.classList.toggle('open',open);if(menu)menu.classList.toggle('open',open);if(overlay)overlay.classList.toggle('open',open);document.body.style.overflow=open?'hidden':''}
  if(burger)burger.addEventListener('click',function(){toggleMenu(!menu.classList.contains('open'))});
  if(overlay)overlay.addEventListener('click',function(){toggleMenu(false)});
  if(menu)menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggleMenu(false)})});

  // Theme
  var KEY='aromika-theme',mq=null;try{mq=matchMedia('(prefers-color-scheme:dark)')}catch(e){}
  function stored(){try{var v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}catch(e){return null}}
  function current(){return stored()||(mq&&mq.matches?'dark':'light')}
  function reflect(t){document.documentElement.setAttribute('data-aromika-theme',t);document.documentElement.style.colorScheme=t;var btn=hero.querySelector('.ar-theme-toggle');if(btn)btn.setAttribute('aria-pressed',t==='dark'?'true':'false')}
  reflect(current());
  var themeBtn=hero.querySelector('.ar-theme-toggle');
  if(themeBtn)themeBtn.addEventListener('click',function(){var n=current()==='dark'?'light':'dark';try{localStorage.setItem(KEY,n)}catch(e){}reflect(n)});

  page.querySelectorAll('.mp-products-scene').forEach(createOrbit);
  var prev=page.querySelector('.mp-orbit-prev'),next=page.querySelector('.mp-orbit-next');
  function rotateActive(dir){var cat=page.getAttribute('data-category')||'laundry',ctl=orbitControllers[cat];if(ctl)ctl.rotate(dir)}
  if(prev)prev.addEventListener('click',function(){rotateActive(1)});
  if(next)next.addEventListener('click',function(){rotateActive(-1)});
  window.addEventListener('resize',function(){var ctl=orbitControllers[page.getAttribute('data-category')||'laundry'];if(ctl)ctl.draw()},{passive:true});

  applyLang();
})();

// Corporate footer language behavior
(function(){
  var root=document.getElementById('aromika-footer');if(!root)return;
  var dict={
    ru:{brandText:'Казахстанский производитель бытовой химии и косметической продукции.',shopBtn:'Интернет-магазин',company:'Компания',about:'О компании',production:'Производство',contacts:'Контакты',careers:'Работа в компании',brands:'Бренды',partners:'Партнёрам',distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',buyers:'Покупателям',catalog:'Каталог',online:'Интернет-магазин',where:'Где купить',office:'Головной офис',city:'Костанай, Казахстан',phone:'Телефон',feedback:'Обратная связь',top:'Наверх'},
    kk:{brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',shopBtn:'Интернет-дүкен',company:'Компания',about:'Компания туралы',production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',brands:'Брендтер',partners:'Серіктестерге',distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',buyers:'Сатып алушыларға',catalog:'Каталог',online:'Интернет-дүкен',where:'Қайдан сатып алуға болады',office:'Бас кеңсе',city:'Қостанай, Қазақстан',phone:'Телефон',feedback:'Кері байланыс',top:'Жоғары'}
  };
  function cur(){try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return 'ru'}}
  function apply(l){if(l!=='kk')l='ru';root.querySelectorAll('[data-arf-i18n]').forEach(function(el){var k=el.getAttribute('data-arf-i18n');if(dict[l][k]!==undefined)el.textContent=dict[l][k]});root.querySelectorAll('[data-lang]').forEach(function(btn){btn.classList.toggle('arf-active',btn.getAttribute('data-lang')===l)})}
  apply(cur());
  document.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b)setTimeout(function(){apply(b.getAttribute('data-lang'))},0)});
  var top=root.querySelector('.arf-to-top');if(top)top.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})})
})();

window.__AROMIKA_MAXIPOWER_VERSION__='v1';
window.__AROMIKA_MAXIPOWER_BOOT__='ready';
