/* =========================================================
   AROMIKA / ANTIBAK V2 — architecture + copy cleanup layer
   Load AFTER antibak-v1.js
   ========================================================= */
(function(){
  'use strict';

  var page=document.getElementById('antibak-page');
  if(!page || page.dataset.abV2Ready==='1') return;
  page.dataset.abV2Ready='1';
  page.dataset.build='antibak-v2';

  var DISH=['dish500','dish1100','dish3300'];
  var CATEGORY_NO={dish500:'01',dish1100:'01',dish3300:'01',laundry:'02',liquidsoap:'03',barsoap:'04'};

  var COPY={
    ru:{
      nav:{dish:'Посуда',laundry:'Стирка',liquidsoap:'Жидкое мыло',barsoap:'Твёрдое мыло'},
      title:{
        dish:'для мытья посуды',
        laundry:'для стирки',
        liquidsoap:'жидкое мыло',
        barsoap:'твёрдое мыло'
      },
      lead:{
        dish:'Густые гели Antibak для ежедневного мытья посуды помогают удалять жир и пищевые загрязнения даже в холодной воде. Выберите аромат и подходящий объём: 500, 1100 или 3300 мл.',
        laundry:'Antibak Universal 4300 мл — универсальный гель для повседневной ручной и автоматической стирки. Рекомендуемая дозировка — 80 мл на 4–5 кг белья.',
        liquidsoap:'Жидкое мыло Antibak для ежедневного очищения рук: Ультразащита и Nature Aloe в форматах 800 и 3300 мл.',
        barsoap:'Твёрдое мыло Antibak для ежедневного очищения в форматах 90 и 200 г. В линейке — Алоэ, Бамбук и олива, Гиацинт и функциональные варианты.'
      },
      volume:'Объём',
      stripText:'Основные линейки Antibak собраны по назначению — выберите нужную категорию.'
    },
    kk:{
      nav:{dish:'Ыдыс жуу',laundry:'Кір жуу',liquidsoap:'Сұйық сабын',barsoap:'Қатты сабын'},
      title:{
        dish:'ыдыс жууға арналған',
        laundry:'кір жууға арналған',
        liquidsoap:'сұйық сабын',
        barsoap:'қатты сабын'
      },
      lead:{
        dish:'Antibak қою гельдері ыдысты күнделікті жуу кезінде май мен тағамдық кірлерді, соның ішінде салқын суда да кетіруге көмектеседі. Хош иіс пен қолайлы көлемді таңдаңыз: 500, 1100 немесе 3300 мл.',
        laundry:'Antibak Universal 4300 мл — күнделікті қолмен және машинамен жууға арналған әмбебап гель. Ұсынылатын мөлшер — 4–5 кг киімге 80 мл.',
        liquidsoap:'Қолды күнделікті тазартуға арналған Antibak сұйық сабыны: Ультрақорғаныс және 800 мен 3300 мл форматтардағы Nature Aloe.',
        barsoap:'Күнделікті тазартуға арналған Antibak қатты сабыны 90 және 200 г форматтарда ұсынылған. Желіде Алоэ, Бамбук және зәйтүн, Гиацинт және функционалды нұсқалар бар.'
      },
      volume:'Көлемі',
      stripText:'Antibak негізгі желілері мақсаты бойынша топтастырылған — қажетті санатты таңдаңыз.'
    }
  };

  function getLang(){
    return document.documentElement.lang==='kk'?'kk':'ru';
  }

  function isDish(cat){
    return DISH.indexOf(cat)!==-1;
  }

  function group(cat){
    if(isDish(cat)) return 'dish';
    return cat;
  }

  function text(el,value){
    if(el && typeof value==='string' && el.textContent!==value) el.textContent=value;
  }

  function setPressed(el,on){
    if(!el) return;
    el.classList.toggle('is-active',!!on);
    el.setAttribute('aria-pressed',on?'true':'false');
  }

  function buildVolumeSwitch(){
    var existing=page.querySelector('.ab-volume-switch');
    if(existing) return existing;

    var lead=page.querySelector('.ab-lead');
    if(!lead || !lead.parentNode) return null;

    var box=document.createElement('div');
    box.className='ab-volume-switch';
    box.setAttribute('role','group');
    box.setAttribute('aria-label','Объём');
    box.innerHTML=
      '<span class="ab-volume-label">Объём</span>'+ 
      '<button type="button" data-category="dish500" data-ab-v2-volume="500">500 мл</button>'+ 
      '<button type="button" data-category="dish1100" data-ab-v2-volume="1100">1100 мл</button>'+ 
      '<button type="button" data-category="dish3300" data-ab-v2-volume="3300">3300 мл</button>';

    lead.insertAdjacentElement('afterend',box);
    return box;
  }

  var volumeSwitch=buildVolumeSwitch();

  function compactDescription(){
    var el=page.querySelector('.ab-product-info-desc');
    if(!el) return;
    var raw=(el.textContent||'').trim();
    if(!raw) return;

    var match=raw.match(/^(.+?[.!?])(?:\s|$)/);
    var shortText=match?match[1].trim():raw;
    if(shortText.length>170){
      shortText=shortText.slice(0,167).replace(/[\s,;:–—-]+$/,'')+'…';
    }
    if(el.textContent!==shortText) el.textContent=shortText;
  }

  function sync(){
    var lang=getLang();
    var c=COPY[lang];
    var cat=page.getAttribute('data-category')||'dish1100';
    var g=group(cat);

    /* hero */
    text(page.querySelector('.ab-cat-no'),CATEGORY_NO[cat]||'01');
    text(page.querySelector('[data-ab-i18n="title"]'),c.title[g]||'');
    text(page.querySelector('[data-ab-i18n="lead"]'),c.lead[g]||'');

    /* 4-item local navigation */
    var navDish=page.querySelector('.ab-local-links [data-category="dish1100"]');
    var navLaundry=page.querySelector('.ab-local-links [data-category="laundry"]');
    var navLiquid=page.querySelector('.ab-local-links [data-category="liquidsoap"]');
    var navBar=page.querySelector('.ab-local-links [data-category="barsoap"]');
    text(navDish,c.nav.dish);
    text(navLaundry,c.nav.laundry);
    text(navLiquid,c.nav.liquidsoap);
    text(navBar,c.nav.barsoap);

    [navDish].forEach(function(el){
      if(!el) return;
      el.classList.toggle('ab-v2-group-active',isDish(cat));
      if(isDish(cat)) el.setAttribute('aria-pressed','true');
    });

    /* volume selector */
    if(volumeSwitch){
      volumeSwitch.classList.toggle('is-hidden',!isDish(cat));
      volumeSwitch.setAttribute('aria-label',c.volume);
      text(volumeSwitch.querySelector('.ab-volume-label'),c.volume);
      volumeSwitch.querySelectorAll('[data-ab-v2-volume]').forEach(function(btn){
        setPressed(btn,btn.getAttribute('data-category')===cat);
      });
    }

    /* category strip */
    text(page.querySelector('[data-ab-i18n="stripText"]'),c.stripText);

    var cards={
      dish:page.querySelector('.ab-category-cards [data-category="dish1100"]'),
      laundry:page.querySelector('.ab-category-cards [data-category="laundry"]'),
      liquidsoap:page.querySelector('.ab-category-cards [data-category="liquidsoap"]'),
      barsoap:page.querySelector('.ab-category-cards [data-category="barsoap"]')
    };
    var specs=[
      [cards.dish,'01',c.nav.dish],
      [cards.laundry,'02',c.nav.laundry],
      [cards.liquidsoap,'03',c.nav.liquidsoap],
      [cards.barsoap,'04',c.nav.barsoap]
    ];
    specs.forEach(function(x){
      if(!x[0]) return;
      text(x[0].querySelector('span'),x[1]);
      text(x[0].querySelector('b'),x[2]);
    });

    if(cards.dish){
      cards.dish.classList.toggle('ab-v2-group-active',isDish(cat));
      if(isDish(cat)) cards.dish.setAttribute('aria-pressed','true');
    }

    compactDescription();
  }

  /* V1 changes page[data-category]; sync immediately afterwards. */
  var pageObserver=new MutationObserver(function(mutations){
    var needsSync=mutations.some(function(m){return m.type==='attributes' && m.attributeName==='data-category';});
    if(needsSync) requestAnimationFrame(sync);
  });
  pageObserver.observe(page,{attributes:true,attributeFilter:['data-category']});

  /* V1 language switch changes html[lang]. */
  var langObserver=new MutationObserver(function(){requestAnimationFrame(sync);});
  langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  /* Product orbit updates the description without changing category. */
  var desc=page.querySelector('.ab-product-info-desc');
  if(desc){
    var descObserver=new MutationObserver(function(){compactDescription();});
    descObserver.observe(desc,{childList:true,characterData:true,subtree:true});
  }

  /* Let V1 click handler run first, then restore grouped active state. */
  document.addEventListener('click',function(e){
    if(e.target.closest('#antibak-page [data-category]') || e.target.closest('[data-lang]')){
      setTimeout(sync,0);
    }
  });

  sync();
  window.__AROMIKA_ANTIBAK_V2__='2.0.0';
})();
