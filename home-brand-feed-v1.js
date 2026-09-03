(function () {
  'use strict';

  if (window.__AROMIKA_HOME_BRAND_FEED_V1__) return;
  window.__AROMIKA_HOME_BRAND_FEED_V1__ = true;

  var API_BASE = (
    window.ROMI_V8_CONFIG && window.ROMI_V8_CONFIG.apiBase
  ) || 'https://aromika.shop/index.php?dispatch=romi.';

  var CACHE_KEY = 'aromika-home-brand-feed-v1';
  var CACHE_TTL = 30 * 60 * 1000;

  var BRANDS = {
    perfect: {
      query: 'Perfect гель для стирки 3300',
      brand: /perfect/i,
      preferred: /(?:mix\s*color|colour|color|цветн).{0,30}3300|3300.{0,30}(?:mix\s*color|colour|color|цветн)/i,
      hero: '.ar-perfect img',
      card: '.arb-product--perfect'
    },
    wash: {
      query: 'Wash Expert гель для стирки 5000',
      brand: /wash\s*expert/i,
      preferred: /цветн.{0,35}5000|5000.{0,35}цветн/i,
      hero: '.ar-wash img',
      card: '.arb-product--wash'
    },
    maxi: {
      query: 'Maxi Power гель для стирки 3300',
      brand: /maxi\s*power/i,
      preferred: /(?:colour|color|цветн).{0,30}3300|3300.{0,30}(?:colour|color|цветн)/i,
      hero: '.ar-maxi img',
      card: '.arb-product--maxi'
    },
    prachka: {
      query: 'Prachka гель для стирки 5000',
      brand: /prachka/i,
      preferred: /цветн.{0,35}5000|5000.{0,35}цветн/i,
      hero: '.ar-prachka img',
      card: '.arb-product--prachka'
    },
    antibak: {
      query: 'Antibak гель для стирки 4300',
      brand: /antibak/i,
      preferred: /universal.{0,35}4300|4300.{0,35}universal/i,
      hero: '',
      card: '.arb-product--antibak'
    }
  };

  function safeProduct(product) {
    if (!product || !Number(product.product_id)) return null;
    var image = String(product.image || '');
    var url = String(product.url || '');
    if (!/^https:\/\/aromika\.shop\/images\//i.test(image)) return null;
    if (!/^https:\/\/aromika\.shop\//i.test(url)) return null;
    if (product.in_stock === false) return null;
    return {
      product_id: Number(product.product_id),
      name: String(product.name || ''),
      image: image,
      url: url
    };
  }

  function selectProduct(products, rules) {
    var valid = (Array.isArray(products) ? products : []).map(safeProduct).filter(Boolean);
    var branded = valid.filter(function (product) {
      return rules.brand.test(product.name) && /стирк/i.test(product.name);
    });
    return branded.find(function (product) {
      return rules.preferred.test(product.name);
    }) || branded[0] || valid.find(function (product) {
      return rules.brand.test(product.name);
    }) || null;
  }

  function readCache(allowExpired) {
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (!cached || !cached.products || typeof cached.products !== 'object') return null;
      if (!allowExpired && Date.now() - Number(cached.created || 0) > CACHE_TTL) return null;
      return cached.products;
    } catch (error) {
      return null;
    }
  }

  function writeCache(products) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        created: Date.now(),
        products: products
      }));
    } catch (error) {}
  }

  function productNodes(key) {
    var rules = BRANDS[key];
    var selectors = [rules.hero, rules.card].filter(Boolean).join(',');
    return selectors ? Array.prototype.slice.call(document.querySelectorAll(selectors)) : [];
  }

  function applyProduct(key, product) {
    if (!product || !product.image) return;
    var nodes = productNodes(key);
    if (!nodes.length) return;

    var image = new Image();
    image.decoding = 'async';
    image.onload = function () {
      nodes.forEach(function (node) {
        node.src = product.image;
        node.alt = product.name;
        node.title = product.name;
        node.setAttribute('data-feed-product-id', String(product.product_id));
        node.setAttribute('data-feed-product-url', product.url);
        if (node.closest && node.closest('#brands')) {
          node.loading = 'lazy';
          node.decoding = 'async';
        }
      });
    };
    image.src = product.image;
  }

  function applyProducts(products) {
    Object.keys(BRANDS).forEach(function (key) {
      if (products[key]) applyProduct(key, products[key]);
    });
    try {
      window.dispatchEvent(new CustomEvent('aromika:home-brand-feed', {
        detail: { products: products }
      }));
    } catch (error) {}
  }

  function requestBrand(key) {
    var rules = BRANDS[key];
    var url = API_BASE + encodeURIComponent('search') + '&q=' + encodeURIComponent(rules.query);
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('http_' + response.status);
      return response.json();
    }).then(function (payload) {
      return selectProduct(payload && payload.products, rules);
    }).catch(function () {
      return null;
    });
  }

  function loadFeed() {
    var cached = readCache(false);
    if (cached) {
      applyProducts(cached);
      return;
    }

    var keys = Object.keys(BRANDS);
    Promise.all(keys.map(requestBrand)).then(function (items) {
      var products = {};
      items.forEach(function (product, index) {
        if (product) products[keys[index]] = product;
      });

      if (!Object.keys(products).length) {
        var stale = readCache(true);
        if (stale) applyProducts(stale);
        return;
      }

      writeCache(products);
      applyProducts(products);
    });
  }

  function schedule() {
    function afterLoad() {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadFeed, { timeout: 3500 });
      } else {
        setTimeout(loadFeed, 1200);
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(afterLoad, 0);
    } else {
      window.addEventListener('load', afterLoad, { once: true });
    }
  }

  schedule();
})();
