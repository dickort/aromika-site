(function(){
'use strict';
if(window.__AROMIKA_ROUTE_FIX_PRODUCTION_V1__) return;
window.__AROMIKA_ROUTE_FIX_PRODUCTION_V1__=true;

function cleanPath(p){
  p=(p||'/').replace(/\/+$/,'');
  return p||'/';
}
function here(){return cleanPath(location.pathname)}
function sameOrigin(v){
  try{return new URL(v,location.href).origin===location.origin}catch(e){return false}
}
function partnerType(v){
  v=String(v||'').toLowerCase();
  if(v==='retail'||v==='supply'||v==='shop')return'retail';
  if(v==='horeca'||v==='corporate'||v==='pro')return'horeca';
  if(v==='distribution'||v==='distributor')return'distributor';
  return'';
}

function normalize(raw){
  if(raw==null)return raw;
  var v=String(raw).trim();
  if(!v)return v;
  if(/^(?:mailto:|tel:|sms:|javascript:|data:)/i.test(v))return v;

  /* Testpub home used local #brands. Production has a dedicated /brands page. */
  if(v==='#brands'||v==='/#brands')return'/brands';

  /* Products remains a home section. */
  if(v==='#products')return here()==='/'?'#products':'/#products';

  /* Do not touch real external URLs. */
  if(/^(?:https?:)?\/\//i.test(v)&&!sameOrigin(v))return v;

  var u;
  try{u=new URL(v,location.href)}catch(e){return v}
  if(u.origin!==location.origin)return v;

  var p=cleanPath(u.pathname);
  var h=u.hash||'';
  var q=u.searchParams;

  /* Deleted standalone pages. */
  if(p==='/partneram'){
    var t=partnerType(q.get('type'));
    return'/okompanii'+(t?'?type='+encodeURIComponent(t):'')+'#cooperation';
  }
  if(p==='/proizvodstvo'||p==='/production'){
    return'/okompanii#production-quality';
  }

  /* Renamed pages. */
  if(p==='/vacancies')return'/careers';
  if(p==='/brends')return'/brands';

  /* Historical nested brand URLs. */
  var brands={
    '/brands/perfect':'/perfect',
    '/brands/washexpert':'/washexpert',
    '/brands/wash-expert':'/washexpert',
    '/brands/maxipower':'/maxipower',
    '/brands/maxi-power':'/maxipower',
    '/brands/prachka':'/prachka',
    '/brands/antibak':'/antibak'
  };
  if(brands[p])return brands[p];

  /* Old home hash from internal pages. */
  if(p==='/'&&h==='#brands')return'/brands';
  if(p!=='/'&&h==='#products')return'/#products';

  /* Canonical partner aliases. */
  if(p==='/okompanii'&&h==='#cooperation'){
    var pt=partnerType(q.get('type'));
    if(pt)return'/okompanii?type='+encodeURIComponent(pt)+'#cooperation';
    return'/okompanii#cooperation';
  }

  return v;
}

function patchLinks(root){
  root=root||document;
  if(!root.querySelectorAll)return;
  root.querySelectorAll('a[href]').forEach(function(a){
    var old=a.getAttribute('href')||'';
    var next=normalize(old);
    if(next&&next!==old){
      a.setAttribute('href',next);
      a.setAttribute('data-aromika-route-fixed','1');
    }

    var href=a.getAttribute('href')||'';
    if(/^(?:https?:)?\/\//i.test(href)&&a.target==='_blank'){
      try{
        var u=new URL(href,location.href);
        if(u.origin!==location.origin){
          var rel=(a.getAttribute('rel')||'').split(/\s+/).filter(Boolean);
          if(rel.indexOf('noopener')<0)rel.push('noopener');
          if(rel.indexOf('noreferrer')<0)rel.push('noreferrer');
          a.setAttribute('rel',rel.join(' '));
        }
      }catch(e){}
    }
  });
}

/* Add semantic anchors to the existing company design without changing its appearance. */
function ensureCompanyAnchors(){
  if(here()!=='/okompanii')return;

  if(!document.getElementById('cooperation')){
    var coop=
      document.querySelector('.cc-coop')||
      document.querySelector('[data-section="cooperation"]')||
      document.querySelector('[data-cc-section="cooperation"]');
    if(coop)coop.id='cooperation';
  }

  if(!document.getElementById('production-quality')){
    var prod=
      document.querySelector('[data-cc-i18n="production"]')||
      document.querySelector('[data-cc-i18n="systemProduction"]')||
      document.querySelector('.cc-system article:first-child')||
      document.querySelector('.cc-company');

    if(prod){
      var target=prod.closest('article,section')||prod;
      if(target.id!=='cooperation')target.id='production-quality';
    }else{
      /* Last-resort text match only inside the company page. */
      var nodes=document.querySelectorAll('#company-coop-page h2,#company-coop-page h3,#company-coop-page b,#company-coop-page span');
      for(var i=0;i<nodes.length;i++){
        var txt=(nodes[i].textContent||'').trim().toLowerCase();
        if(txt==='производство'||txt.indexOf('өндіріс')===0){
          var t=nodes[i].closest('article,section')||nodes[i];
          t.id='production-quality';
          break;
        }
      }
    }
  }
}

function scrollCanonicalHash(){
  var h=location.hash;
  if(h!=='#cooperation'&&h!=='#production-quality')return;
  setTimeout(function(){
    var el=document.getElementById(h.slice(1));
    if(el){
      var reduce=false;
      try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
      el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    }
  },120);
}

function run(){
  patchLinks(document);
  ensureCompanyAnchors();
  scrollCanonicalHash();
}

function watch(){
  if(!('MutationObserver'in window))return;
  var pending=false;
  new MutationObserver(function(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(function(){
      pending=false;
      patchLinks(document);
      ensureCompanyAnchors();
    });
  }).observe(document.documentElement,{childList:true,subtree:true});
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){run();watch()},{once:true});
}else{
  run();watch();
}
})();
