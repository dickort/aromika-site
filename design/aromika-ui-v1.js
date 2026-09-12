/* Aromika INFO: progressive UI refinement. No dependencies or API calls. */
(function () {
  'use strict';
  if (window.__AROMIKA_UI_V1__) return;
  window.__AROMIKA_UI_V1__ = true;
  var ownScript = document.currentScript;
  var cssURL = ownScript && new URL('aromika-ui-v1.css', ownScript.src).href;
  function start() {
    var html = document.documentElement;
    var hero = document.getElementById('aromika-hero');
    if (!hero) return;
    html.setAttribute('data-aromika-ui', '1');
    if (cssURL && !document.getElementById('aromika-ui-v1-css')) {
      var css = document.createElement('link');
      css.id = 'aromika-ui-v1-css'; css.rel = 'stylesheet'; css.href = cssURL;
      document.head.appendChild(css);
    }
    var text = {
      ru: { careers:'Вакансии', nav:'Основная навигация', lang:'Язык сайта', close:'Закрыть меню', open:'Открыть меню', light:'Включить светлую тему', dark:'Включить тёмную тему', skip:'К содержанию', direct:'Связаться напрямую с филиалом', help:'Контакты команды доступны и без помощника.' },
      kk: { careers:'Бос жұмыс орындары', nav:'Негізгі навигация', lang:'Сайт тілі', close:'Мәзірді жабу', open:'Мәзірді ашу', light:'Ашық тақырыпты қосу', dark:'Қараңғы тақырыпты қосу', skip:'Мазмұнға өту', direct:'Филиалмен тікелей байланысу', help:'Команданың байланыс деректері көмекшісіз де қолжетімді.' }
    };
    function language() {
      try { return localStorage.getItem('aromika-language') === 'kk' ? 'kk' : 'ru'; }
      catch (_) { return hero.querySelector('[data-lang="kk"].is-active') ? 'kk' : 'ru'; }
    }
    function attr(el, key, value) { if (el && el.getAttribute(key) !== value) el.setAttribute(key, value); }
    var menu = hero.querySelector('.ar-menu');
    var burger = hero.querySelector('.ar-burger');
    var overlay = hero.querySelector('.ar-overlay');
    var close, wasOpen = false;
    if (menu && burger) {
      if (!menu.id) menu.id = 'aromika-mobile-menu';
      attr(burger, 'aria-controls', menu.id);
      close = document.createElement('button');
      close.type = 'button'; close.className = 'ar-ui-close'; close.textContent = '×';
      menu.prepend(close);
      burger.addEventListener('click', function () {
        var before = menu.classList.contains('open');
        requestAnimationFrame(function () {
          if (menu.classList.contains('open') !== before) return;
          menu.classList.toggle('open', !before); burger.classList.toggle('open', !before);
          if (overlay) overlay.classList.toggle('open', !before);
          document.body.style.overflow = !before ? 'hidden' : '';
        });
      }, true);
      function closeMenu(restoreFocus) {
        if (!menu.classList.contains('open')) return;
        burger.click();
        // Older page bundles may not provide a burger handler.
        if (menu.classList.contains('open')) {
          menu.classList.remove('open'); burger.classList.remove('open');
          if (overlay) overlay.classList.remove('open');
          document.body.style.overflow = '';
        }
        if (restoreFocus) burger.focus();
      }
      close.addEventListener('click', function () { closeMenu(true); });
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a[href]')) closeMenu(false);
      });
      document.addEventListener('keydown', function (e) {
        if (!menu.classList.contains('open')) return;
        if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); return; }
        if (e.key !== 'Tab') return;
        var focusable = Array.from(menu.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')).filter(function (el) { return el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden'; });
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (!first) return;
        if (e.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      });
      new MutationObserver(syncMenu).observe(menu, { attributes:true, attributeFilter:['class'] });
      function syncMenu() {
        var open = menu.classList.contains('open');
        menu.inert = !open;
        attr(menu, 'aria-hidden', String(!open));
        attr(burger, 'aria-expanded', String(open));
        attr(burger, 'aria-label', open ? text[language()].close : text[language()].open);
        if (open) { attr(menu, 'role', 'dialog'); attr(menu, 'aria-modal', 'true'); if (!wasOpen) close.focus(); }
        else { menu.removeAttribute('aria-modal'); menu.removeAttribute('role'); }
        wasOpen = open;
      }
      syncMenu();
      window.matchMedia('(min-width:1381px)').addEventListener('change', function (e) { if (e.matches) closeMenu(false); });
      window.matchMedia('(min-width:1200px)').addEventListener('change', function (e) { if (e.matches && language() === 'ru') closeMenu(false); });
    }
    var main = document.querySelector('main') || document.getElementById('products');
    var skip;
    if (main) {
      if (!main.id) main.id = 'aromika-main';
      if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
      skip = document.createElement('a'); skip.className = 'ar-ui-skip'; skip.href = '#' + main.id;
      document.body.prepend(skip);
    }
    var cooperation = document.querySelector('#company-coop-page #cooperation');
    var direct, hint;
    if (cooperation) {
      var fallback = document.createElement('div'); fallback.className = 'ar-ui-contact';
      hint = document.createElement('p'); direct = document.createElement('a');
      direct.href = 'https://aromika.info/kontakty';
      fallback.append(hint, direct); cooperation.appendChild(fallback);
    }
    function refine() {
      var lang = language(), t = text[lang];
      attr(html, 'lang', lang);
      hero.querySelectorAll('.ar-nav,.ar-menu nav').forEach(function (nav) {
        attr(nav, 'aria-label', t.nav);
        var about = nav.querySelector('[data-ar-common="about"]');
        var duplicate = nav.querySelector('[data-ar-common="partners"]');
        if (about && duplicate && about.getAttribute('href') === duplicate.getAttribute('href')) duplicate.remove();
        var careers = nav.querySelector('[data-ar-common="careers"]');
        if (careers && careers.textContent !== t.careers) careers.textContent = t.careers;
        nav.querySelectorAll('a').forEach(function (a) {
          if (a.classList.contains('is-active')) attr(a, 'aria-current', 'page');
          else a.removeAttribute('aria-current');
        });
      });
      document.querySelectorAll('.ar-lang,.ar-menu-lang,.arf-lang').forEach(function (group) {
        attr(group, 'aria-label', t.lang);
        group.querySelectorAll('button[data-lang]').forEach(function (b) {
          attr(b, 'aria-label', b.dataset.lang === 'kk' ? 'Қазақша' : 'Русский');
          attr(b, 'aria-pressed', String(b.dataset.lang === lang));
        });
      });
      var dark = html.getAttribute('data-aromika-theme') === 'dark';
      hero.querySelectorAll('.ar-theme-toggle').forEach(function (b) {
        attr(b, 'aria-label', dark ? t.light : t.dark); attr(b, 'title', dark ? t.light : t.dark); attr(b, 'aria-pressed', String(dark));
      });
      if (close) { attr(close, 'aria-label', t.close); attr(menu, 'aria-label', t.nav); }
      if (burger) attr(burger, 'aria-label', menu && menu.classList.contains('open') ? t.close : t.open);
      if (skip) skip.textContent = t.skip;
      if (direct) { direct.textContent = t.direct + ' →'; hint.textContent = t.help; }
    }
    var queued = false;
    function schedule() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; refine(); }); }
    hero.querySelectorAll('.ar-nav,.ar-menu nav').forEach(function (nav) {
      new MutationObserver(schedule).observe(nav, { childList:true, subtree:true });
    });
    new MutationObserver(schedule).observe(html, { attributes:true, attributeFilter:['data-aromika-theme'] });
    document.addEventListener('click', function (e) { if (e.target.closest('[data-lang],.ar-theme-toggle')) schedule(); });
    window.addEventListener('hashchange', schedule);
    window.addEventListener('storage', function (e) { if (e.key === 'aromika-language') schedule(); });
    refine();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true }); else start();
})();
