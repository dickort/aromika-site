/* AROMIKA.INFO · REDIRECT WORKER V1.0.0
 * Cloudflare Worker / edge redirect layer.
 * Route after deployment: aromika.info/* and www.aromika.info/*
 *
 * IMPORTANT:
 * - This file returns real HTTP 301 responses before Tilda HTML is served.
 * - Keep ORIGIN_HOST pointed at the real Tilda origin if using a Worker as reverse proxy.
 * - If Cloudflare route is configured directly on aromika.info/*, normal requests fall through with fetch(request).
 */

const CANONICAL_ORIGIN = 'https://aromika.info';
const CANONICAL_HOST = 'aromika.info';

const EXACT_REDIRECTS = new Map([
  ['/partneram', '/okompanii#cooperation'],
  ['/proizvodstvo', '/okompanii#production-quality'],
  ['/production', '/okompanii#production-quality'],
  ['/brends', '/brands'],

  ['/brands/perfect', '/perfect'],
  ['/brands/washexpert', '/washexpert'],
  ['/brands/wash-expert', '/washexpert'],
  ['/brands/maxipower', '/maxipower'],
  ['/brands/maxi-power', '/maxipower'],
  ['/brands/prachka', '/prachka'],
  ['/brands/antibak', '/antibak'],

  ['/sales', 'https://aromika.shop/']
]);

/* Enable these only when the destination page is live. */
const CONDITIONAL_REDIRECTS = new Map([
  // ['/vacancies', '/careers'],
  // ['/currentpromotions', '/akcii'],
  // ['/page72065703.html', '/kz/'],
  // ['/team', '/okompanii'],

  /* Do not enable until a precise destination is chosen:
   * ['/hozyastvennoe', '...'],
   * ['/kidsseries', '...']
   */
]);

function normalizePath(pathname) {
  let path = pathname || '/';
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

function preserveQuery(target, sourceUrl) {
  if (!sourceUrl.search) return target;

  const destination = new URL(target, CANONICAL_ORIGIN);

  sourceUrl.searchParams.forEach((value, key) => {
    /* Never carry common tracking params into canonical redirect targets. */
    if (/^(utm_|gclid$|yclid$|fbclid$)/i.test(key)) return;
    if (!destination.searchParams.has(key)) destination.searchParams.append(key, value);
  });

  return destination.toString();
}

function canonicalizeHostAndProtocol(url) {
  if (url.protocol === 'https:' && url.hostname === CANONICAL_HOST) return null;

  const destination = new URL(url.pathname + url.search + url.hash, CANONICAL_ORIGIN);
  return destination.toString();
}

function lookupRedirect(path) {
  return EXACT_REDIRECTS.get(path) || CONDITIONAL_REDIRECTS.get(path) || null;
}

function redirectResponse(location) {
  return new Response(null, {
    status: 301,
    headers: {
      'Location': location,
      'Cache-Control': 'public, max-age=86400',
      'X-Aromika-Redirect': 'seo-v1'
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);

    /* 1. Legacy URL redirect takes precedence and lands directly on canonical host. */
    const mapped = lookupRedirect(path);
    if (mapped) {
      let target = mapped;
      if (!/^https?:\/\//i.test(target)) target = CANONICAL_ORIGIN + target;
      target = preserveQuery(target, url);
      return redirectResponse(target);
    }

    /* 2. Canonicalize protocol + host in one hop. */
    const canonical = canonicalizeHostAndProtocol(url);
    if (canonical) return redirectResponse(canonical);

    /* 3. Canonical request continues to Tilda/origin unchanged. */
    return fetch(request);
  }
};
