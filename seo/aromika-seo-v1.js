/* AROMIKA.INFO · SEO V1.0.1 SAFE
 * Additive SEO layer for Tilda pages.
 * Does not change visible H1 unless explicitly enabled.
 * Does not publish KZ hreflang until explicitly enabled.
 * HTTP 301 redirects are handled separately at the edge.
 */
(function () {
  'use strict';

  if (window.__AROMIKA_SEO_V1__) return;
  window.__AROMIKA_SEO_V1__ = true;

  var ORIGIN = 'https://aromika.info';
  var KZ_PREFIX = '/kz';
  var CONFIG = window.AROMIKA_SEO_CONFIG || {};
  var ENABLE_H1 = CONFIG.enableH1 === true;
  var ENABLE_KZ = CONFIG.enableKz === true;

  var PAGES = {
    '/': {
      title: 'Aromika — производитель бытовой химии в Казахстане',
      description: 'Aromika — казахстанский производитель бытовой химии и средств ухода. Собственное производство, широкий ассортимент и филиалы по Казахстану.',
      h1: 'Казахстанский производитель бытовой химии Aromika',
      ogType: 'website'
    },
    '/brands': {
      title: 'Бренды Aromika — бытовая химия и средства ухода',
      description: 'Бренды Aromika для стирки, уборки, мытья посуды и ежедневного ухода: Perfect, Wash Expert, Maxi Power, Prachka, Antibak и другие линейки.',
      h1: 'Бренды бытовой химии и средств ухода Aromika'
    },
    '/perfect': {
      title: 'Perfect — средства для стирки, уборки и ухода | Aromika',
      description: 'Perfect от Aromika — средства для стирки, уборки, мытья посуды, ухода за волосами и телом. Посмотрите линейки и перейдите к покупке в Aromika Shop.',
      h1: 'Perfect — средства для стирки, уборки и ежедневного ухода',
      brand: 'Perfect'
    },
    '/washexpert': {
      title: 'Wash Expert — гели и средства для стирки | Aromika',
      description: 'Wash Expert — гели, порошки, капсулы и средства для ухода за бельём и домом. Форматы для разных задач и актуальный ассортимент Aromika.',
      h1: 'Wash Expert — средства для стирки и ухода за домом',
      brand: 'Wash Expert'
    },
    '/maxipower': {
      title: 'Maxi Power — средства для стирки | Aromika',
      description: 'Maxi Power от Aromika — средства для эффективной повседневной стирки. Узнайте о линейке, форматах и актуальном ассортименте.',
      h1: 'Maxi Power — средства для эффективной стирки',
      brand: 'Maxi Power'
    },
    '/prachka': {
      title: 'Prachka — гели и капсулы для стирки | Aromika',
      description: 'Prachka от Aromika — гели и капсулы для стирки. Подберите формат для повседневной стирки и перейдите к актуальному ассортименту.',
      h1: 'Prachka — гели и капсулы для стирки',
      brand: 'Prachka'
    },
    '/antibak': {
      title: 'Antibak — антибактериальные средства для дома | Aromika',
      description: 'Antibak от Aromika — средства для мытья посуды, стирки, жидкое и твёрдое мыло. Линейка для ежедневной чистоты и ухода за домом.',
      h1: 'Antibak — антибактериальные средства для дома',
      brand: 'Antibak'
    },
    '/okompanii': {
      title: 'Aromika — производство и сотрудничество в Казахстане',
      description: 'Aromika объединяет производство бытовой химии, дистрибуцию, региональные продажи и логистику. Сотрудничество с сетями, HoReCa, брендами и поставщиками.',
      h1: 'Aromika — производство и сотрудничество'
    },
    '/kontakty': {
      title: 'Контакты Aromika — филиалы по Казахстану',
      description: 'Контакты Aromika: головной офис и филиалы по Казахстану. Адреса, телефоны, e-mail и информация для связи с региональными подразделениями.',
      h1: 'Контакты и филиалы Aromika в Казахстане'
    },
    '/careers': {
      title: 'Вакансии Aromika — работа в компании',
      description: 'Актуальные вакансии Aromika по городам Казахстана. Выберите город и посмотрите открытые позиции.',
      h1: 'Вакансии Aromika'
    },
    '/akcii': {
      title: 'Акции Aromika — бытовая химия и средства ухода',
      description: 'Актуальные акции на продукцию Aromika. Смотрите специальные предложения и переходите в официальный интернет-магазин для покупки.',
      h1: 'Акции Aromika'
    },
    '/stirka': {
      title: 'Средства для стирки Aromika — гели, порошки и капсулы',
      description: 'Средства Aromika для стирки белого, цветного и чёрного белья: гели, порошки, капсулы и кондиционеры. Бренды и рекомендации по выбору.',
      h1: 'Средства для стирки Aromika'
    },
    '/dlya-mytya-posudy': {
      title: 'Средства для мытья посуды Aromika',
      description: 'Средства Aromika для ручного мытья посуды: линейки, форматы и рекомендации по выбору для ежедневного использования.',
      h1: 'Средства для мытья посуды Aromika'
    },
    '/uborka': {
      title: 'Средства для уборки дома Aromika',
      description: 'Средства Aromika для кухни, ванной, стекол и повседневной уборки. Подберите решение под поверхность и задачу.',
      h1: 'Средства для уборки дома Aromika'
    },
    '/uhod-za-telom': {
      title: 'Средства для ухода за телом Aromika',
      description: 'Гели для душа, жидкое и крем-мыло Aromika для ежедневного ухода. Линейки, ароматы и форматы.',
      h1: 'Средства для ухода за телом Aromika'
    },
    '/uhod-za-volosami': {
      title: 'Средства для ухода за волосами Aromika',
      description: 'Шампуни и средства Aromika для ежедневного ухода за волосами. Линейки для разных типов волос и задач.',
      h1: 'Средства для ухода за волосами Aromika'
    }
  };

  function cleanPath(value) {
    var p = String(value || '/').split('?')[0].split('#')[0];
    if (p.length > 1) p = p.replace(/\/+$/, '');
    return p || '/';
  }

  function currentPath() {
    return cleanPath(location.pathname);
  }

  function isKzPath(path) {
    return path === KZ_PREFIX || path.indexOf(KZ_PREFIX + '/') === 0;
  }

  function ruPath(path) {
    if (path === KZ_PREFIX || path === KZ_PREFIX + '/') return '/';
    if (isKzPath(path)) return cleanPath(path.slice(KZ_PREFIX.length));
    return path;
  }

  function kzPath(path) {
    path = ruPath(path);
    return path === '/' ? KZ_PREFIX + '/' : KZ_PREFIX + path;
  }

  function absolute(path) {
    if (/^https?:\/\//i.test(path)) return path;
    return ORIGIN + (path.charAt(0) === '/' ? path : '/' + path);
  }

  function upsertMeta(selector, attrs) {
    var node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('meta');
      document.head.appendChild(node);
    }
    Object.keys(attrs).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    return node;
  }

  function upsertLink(selector, attrs) {
    var node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('link');
      document.head.appendChild(node);
    }
    Object.keys(attrs).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    return node;
  }

  function removeManagedAlternates() {
    document.head.querySelectorAll('link[data-aromika-seo="hreflang"]').forEach(function (node) { node.remove(); });
  }

  function addAlternate(lang, href) {
    var node = document.createElement('link');
    node.rel = 'alternate';
    node.hreflang = lang;
    node.href = href;
    node.setAttribute('data-aromika-seo', 'hreflang');
    document.head.appendChild(node);
  }

  function setH1(text) {
    if (!ENABLE_H1 || !text) return;
    var candidates = [
      '[data-seo-h1]',
      '#aromika-seo-h1',
      'main h1',
      '.t-title_xl h1',
      '.t-title h1',
      'h1'
    ];
    var h1 = null;
    for (var i = 0; i < candidates.length && !h1; i++) h1 = document.querySelector(candidates[i]);
    if (!h1 || h1.getAttribute('data-seo-lock') === '1') return;
    if (!h1.getAttribute('data-aromika-original-h1')) h1.setAttribute('data-aromika-original-h1', h1.textContent || '');
    h1.textContent = text;
  }

  function jsonLd(id, data) {
    var node = document.getElementById(id);
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = id;
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(data);
  }

  function organizationGraph() {
    var languages = ENABLE_KZ ? ['ru-KZ', 'kk-KZ'] : ['ru-KZ'];
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': ORIGIN + '/#organization',
          name: 'Aromika',
          url: ORIGIN + '/',
          areaServed: { '@type': 'Country', name: 'Kazakhstan' },
          brand: ['Perfect', 'Wash Expert', 'Maxi Power', 'Prachka', 'Antibak'].map(function (name) {
            return { '@type': 'Brand', name: name };
          })
        },
        {
          '@type': 'WebSite',
          '@id': ORIGIN + '/#website',
          url: ORIGIN + '/',
          name: 'Aromika',
          publisher: { '@id': ORIGIN + '/#organization' },
          inLanguage: languages
        }
      ]
    };
  }

  function breadcrumb(path, page) {
    if (['/perfect', '/washexpert', '/maxipower', '/prachka', '/antibak'].indexOf(path) < 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: ORIGIN + '/' },
        { '@type': 'ListItem', position: 2, name: 'Бренды', item: ORIGIN + '/brands' },
        { '@type': 'ListItem', position: 3, name: page.brand || page.h1, item: ORIGIN + path }
      ]
    };
  }

  function apply() {
    var path = currentPath();
    var basePath = ruPath(path);
    var page = PAGES[basePath];
    if (!page) return;

    var kz = isKzPath(path);
    if (kz && !ENABLE_KZ) return;

    var canonicalPath = kz ? kzPath(basePath) : basePath;
    var canonical = absolute(canonicalPath);

    document.title = page.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: page.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });

    removeManagedAlternates();
    if (ENABLE_KZ) {
      addAlternate('ru-KZ', absolute(basePath));
      addAlternate('kk-KZ', absolute(kzPath(basePath)));
      addAlternate('x-default', absolute(basePath));
    }

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: page.ogType || 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Aromika' });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });

    document.documentElement.lang = kz ? 'kk-KZ' : 'ru-KZ';
    setH1(page.h1);

    jsonLd('aromika-seo-org', organizationGraph());

    if (page.brand) {
      jsonLd('aromika-seo-brand', {
        '@context': 'https://schema.org',
        '@type': 'Brand',
        '@id': absolute(basePath) + '#brand',
        name: page.brand,
        url: absolute(basePath),
        parentOrganization: { '@id': ORIGIN + '/#organization' }
      });
      var bc = breadcrumb(basePath, page);
      if (bc) jsonLd('aromika-seo-breadcrumb', bc);
    } else {
      ['aromika-seo-brand', 'aromika-seo-breadcrumb'].forEach(function (id) {
        var old = document.getElementById(id);
        if (old) old.remove();
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();

  window.addEventListener('popstate', apply);
  window.addEventListener('hashchange', function () { setTimeout(apply, 0); });
})();
