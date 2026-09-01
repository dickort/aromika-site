
(function(){
  var page=document.getElementById('brands-page-v10');
  var core=document.getElementById('brands');
  var header=document.getElementById('aromika-hero');
  var footer=document.getElementById('aromika-footer');
  if(!page||!header)return;

  var headerDict={
    ru:{products:'Продукция',brands:'Бренды',about:'О компании',partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',buyOnline:'Купить онлайн',shop:'Интернет-магазин'},
    kk:{products:'Өнімдер',brands:'Брендтер',about:'Компания туралы',partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыс',buyOnline:'Онлайн сатып алу',shop:'Интернет-дүкен'}
  };
  var coreDict={
    ru:{kicker:'Наши бренды',title1:'Разные задачи.',title2:'Один стандарт качества.',intro:'Линейки Aromika для разных сценариев ухода за домом, стирки и ежедневной чистоты.',perfectText:'Широкая линейка средств для стирки, уборки и ежедневного ухода.',washText:'Практичные средства для стирки и поддержания чистоты в доме.',maxiText:'Линейка средств для интенсивной и эффективной стирки.',prachkaText:'Средства для повседневной стирки и ухода за бельём.',antibakText:'Антибактериальная линейка для чистоты в доме и повседневном уходе.'},
    kk:{kicker:'Біздің брендтер',title1:'Әртүрлі міндет.',title2:'Бір сапа стандарты.',intro:'Үй күтімі, кір жуу және күнделікті тазалықтың әртүрлі сценарийлеріне арналған Aromika желілері.',perfectText:'Кір жууға, тазалауға және күнделікті күтімге арналған кең желі.',washText:'Кір жууға және үй тазалығын сақтауға арналған практикалық құралдар.',maxiText:'Қарқынды және тиімді кір жууға арналған құралдар желісі.',prachkaText:'Күнделікті кір жууға және киім күтіміне арналған құралдар.',antibakText:'Үй тазалығы мен күнделікті күтімге арналған бактерияға қарсы желі.'}
  };
  var pageDict={
    ru:{heroKicker:'Портфель Aromika',hero1:'Бренды',hero2:'на каждый день.',heroLead:'Стирка, уборка, уход за телом, детские продукты и косметика — выбирайте бренд под конкретную задачу.',otherTitle:'Ещё в ассортименте',otherLead:'Специализированные бренды и линейки для ухода, кухни, детских задач, ванны и дома.',partnerKicker:'Партнёрские бренды',partnerTitle:'Бренды, которые мы представляем.',tfLead:'Декоративная косметика: тон, пудры, средства для губ и глаз, продукты для бровей и профессиональные кисти.',tfAll:'Весь Topface'},
    kk:{heroKicker:'Aromika портфелі',hero1:'Брендтер',hero2:'күн сайын.',heroLead:'Кір жуу, тазалық, дене күтімі, балалар тауарлары мен косметика — нақты міндетке сай брендті таңдаңыз.',otherTitle:'Ассортиментте тағы бар',otherLead:'Күтімге, ас үйге, балаларға, ваннаға және үйге арналған мамандандырылған брендтер мен желілер.',partnerKicker:'Серіктес брендтер',partnerTitle:'Біз ұсынатын брендтер.',tfLead:'Сәндік косметика: тон, опа, ерін мен көзге арналған өнімдер, қасқа арналған құралдар және кәсіби қылқаламдар.',tfAll:'Topface толық'}
  };
  var footerDict={
    ru:{brandText:'Казахстанский производитель бытовой химии и косметической продукции.',shopBtn:'Интернет-магазин',company:'Компания',about:'О компании',production:'Производство',contacts:'Контакты',careers:'Работа в компании',brands:'Бренды',allBrands:'Все бренды',partners:'Партнёрам',distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',buyers:'Покупателям',catalog:'Каталог',online:'Интернет-магазин',where:'Где купить',office:'Головной офис',city:'Костанай, Казахстан',rights:'Aromika. Все права защищены.'},
    kk:{brandText:'Қазақстандық тұрмыстық химия және косметикалық өнім өндірушісі.',shopBtn:'Интернет-дүкен',company:'Компания',about:'Компания туралы',production:'Өндіріс',contacts:'Байланыс',careers:'Компаниядағы жұмыс',brands:'Брендтер',allBrands:'Барлық брендтер',partners:'Серіктестерге',distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',buyers:'Сатып алушыларға',catalog:'Каталог',online:'Интернет-дүкен',where:'Қайдан сатып алуға болады',office:'Бас кеңсе',city:'Қостанай, Қазақстан',rights:'Aromika. Барлық құқықтар қорғалған.'}
  };
  function getLang(){try{return localStorage.getItem('aromika-language')==='kk'?'kk':'ru'}catch(e){return'ru'}}
  function setLang(lang){
    lang=lang==='kk'?'kk':'ru';
    document.documentElement.lang=lang;
    if(core)core.classList.toggle('arb-lang-kk',lang==='kk');
    header.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(headerDict[lang][k]!=null)el.textContent=headerDict[lang][k]});
    if(core)core.querySelectorAll('[data-arb-i18n]').forEach(function(el){var k=el.getAttribute('data-arb-i18n');if(coreDict[lang][k]!=null)el.textContent=coreDict[lang][k]});
    page.querySelectorAll('[data-brv10]').forEach(function(el){var k=el.getAttribute('data-brv10');if(pageDict[lang][k]!=null)el.textContent=pageDict[lang][k]});
    page.querySelectorAll('[data-ru][data-kk]').forEach(function(el){el.textContent=el.getAttribute(lang==='kk'?'data-kk':'data-ru')});
    if(footer)footer.querySelectorAll('[data-arf-i18n]').forEach(function(el){var k=el.getAttribute('data-arf-i18n');if(footerDict[lang][k]!=null)el.textContent=footerDict[lang][k]});
    document.querySelectorAll('[data-lang]').forEach(function(btn){var on=btn.getAttribute('data-lang')===lang;btn.classList.toggle('is-active',on);btn.classList.toggle('arf-active',on)});
    try{localStorage.setItem('aromika-language',lang)}catch(e){}
    reflectTheme();
  }
  document.addEventListener('click',function(e){var btn=e.target.closest('[data-lang]');if(btn)setLang(btn.getAttribute('data-lang'))});
  var burger=header.querySelector('.ar-burger'),menu=header.querySelector('.ar-menu'),overlay=header.querySelector('.ar-overlay');
  function menuOpen(on){if(!burger||!menu||!overlay)return;burger.classList.toggle('open',on);menu.classList.toggle('open',on);overlay.classList.toggle('open',on);document.body.style.overflow=on?'hidden':''}
  if(burger)burger.addEventListener('click',function(){menuOpen(!menu.classList.contains('open'))});
  if(overlay)overlay.addEventListener('click',function(){menuOpen(false)});
  if(menu)menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menuOpen(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')menuOpen(false)});
  var KEY='aromika-theme';
  function storedTheme(){try{var v=localStorage.getItem(KEY);return(v==='dark'||v==='light')?v:null}catch(e){return null}}
  function currentTheme(){return document.documentElement.getAttribute('data-aromika-theme')||storedTheme()||'light'}
  function themeLabel(t){var kk=getLang()==='kk';return t==='dark'?(kk?'Жарық тақырыпты қосу':'Включить светлую тему'):(kk?'Қараңғы тақырыпты қосу':'Включить тёмную тему')}
  function reflectTheme(){var t=currentTheme()==='dark'?'dark':'light';document.documentElement.setAttribute('data-aromika-theme',t);document.documentElement.style.colorScheme=t;document.querySelectorAll('.ar-theme-toggle').forEach(function(b){b.setAttribute('aria-pressed',t==='dark'?'true':'false');b.setAttribute('aria-label',themeLabel(t));b.setAttribute('title',themeLabel(t))})}
  document.querySelectorAll('.ar-theme-toggle').forEach(function(b){b.addEventListener('click',function(){var t=currentTheme()==='dark'?'light':'dark';try{localStorage.setItem(KEY,t)}catch(e){}document.documentElement.setAttribute('data-aromika-theme',t);reflectTheme()})});
  var topBtn=footer&&footer.querySelector('.arf-to-top');
  if(topBtn)topBtn.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});

  function processCutout(img){
    if(!img || img.dataset.cutoutDone==='1')return;
    img.dataset.cutoutDone='1';
    var src=img.getAttribute('data-source')||img.getAttribute('src');
    var loader=new Image();
    loader.crossOrigin='anonymous';
    loader.decoding='async';
    loader.onload=function(){
      try{
        var w=loader.naturalWidth||loader.width,h=loader.naturalHeight||loader.height;
        if(!w||!h)return;
        var c=document.createElement('canvas');c.width=w;c.height=h;
        var ctx=c.getContext('2d',{willReadFrequently:true});
        ctx.drawImage(loader,0,0);
        var id=ctx.getImageData(0,0,w,h),d=id.data;
        var seen=new Uint8Array(w*h),q=new Uint32Array(w*h),head=0,tail=0;
        function white(px){return d[px+3]>0 && d[px]>236 && d[px+1]>236 && d[px+2]>236}
        function push(x,y){if(x<0||y<0||x>=w||y>=h)return;var idx=y*w+x;if(seen[idx])return;var p=idx*4;if(!white(p))return;seen[idx]=1;q[tail++]=idx}
        for(var x=0;x<w;x++){push(x,0);push(x,h-1)}
        for(var y=1;y<h-1;y++){push(0,y);push(w-1,y)}
        while(head<tail){var idx=q[head++],x=idx%w,y=(idx/w)|0,p=idx*4;d[p+3]=0;push(x-1,y);push(x+1,y);push(x,y-1);push(x,y+1)}
        for(var i=0;i<d.length;i+=4){if(!d[i+3])continue;var avg=(d[i]+d[i+1]+d[i+2])/3;if(avg>248)d[i+3]=Math.min(d[i+3],180)}
        ctx.putImageData(id,0,0);
        var minX=w,minY=h,maxX=-1,maxY=-1;
        for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){var a=d[(yy*w+xx)*4+3];if(a>12){if(xx<minX)minX=xx;if(yy<minY)minY=yy;if(xx>maxX)maxX=xx;if(yy>maxY)maxY=yy;}}
        if(maxX<minX||maxY<minY)return;
        var bw=maxX-minX+1,bh=maxY-minY+1;
        var out=document.createElement('canvas'), pad=90;
        if(img.classList.contains('brv10-cutout--topface')){out.width=900;out.height=1400;pad=80}else{out.width=900;out.height=1200;pad=90}
        var customPad=parseFloat(img.getAttribute('data-cutout-pad')||'');
        if(!isNaN(customPad)) pad=customPad;
        var scaleBoost=parseFloat(img.getAttribute('data-cutout-scale')||'1');
        if(isNaN(scaleBoost)||!isFinite(scaleBoost)||scaleBoost<=0) scaleBoost=1;
        var ox=out.getContext('2d');
        var availW=out.width-pad*2,availH=out.height-pad*2;
        var scale=Math.min(availW/bw,availH/bh)*scaleBoost;
        var maxScale=Math.min((out.width-16)/bw,(out.height-16)/bh);
        if(scale>maxScale) scale=maxScale;
        var dw=bw*scale,dh=bh*scale,dx=(out.width-dw)/2,dy=(out.height-dh)/2;
        ox.drawImage(c,minX,minY,bw,bh,dx,dy,dw,dh);
        img.src=out.toDataURL('image/png');
        img.classList.add('is-cutout-ready');
      }catch(err){}
    };
    loader.onerror=function(){};
    loader.src=src;
  }
  function runCutout(){page.querySelectorAll('.brv10-cutout').forEach(processCutout)}

  setLang(getLang());
  reflectTheme();
  if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(runCutout,120)}else{document.addEventListener('DOMContentLoaded',runCutout)}
  window.addEventListener('load',function(){setTimeout(runCutout,300)});
})();
