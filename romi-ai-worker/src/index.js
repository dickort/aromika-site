const DEFAULT_ALLOWED_MODEL = 'gpt-5.6-luna';
const DEFAULT_RENDER_BASE_URL = 'https://aromika-site.onrender.com';
const MAX_BODY_BYTES = 180000;

const ALLOWED_ORIGINS = new Set([
  'https://aromika.shop',
  'https://www.aromika.shop',
  'https://aromika.info',
  'https://www.aromika.info',
]);

function corsHeaders(request) {
  const origin = request.headers.get('origin') || '';
  if (!ALLOWED_ORIGINS.has(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'Content-Type, X-Romi-Token',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...extraHeaders,
    },
  });
}

function allowedModels(env) {
  return String(env.ALLOWED_MODELS || DEFAULT_ALLOWED_MODEL)
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function renderBase(env) {
  return String(env.RENDER_BASE_URL || DEFAULT_RENDER_BASE_URL).replace(/\/+$/, '');
}

function safeErrorPayload(text) {
  try {
    const parsed = JSON.parse(text);
    const e = parsed?.error || parsed;
    return {
      code: e?.code ?? null,
      type: e?.type ?? null,
      message: e?.message ?? null,
      param: e?.param ?? null,
    };
  } catch {
    return {
      code: null,
      type: null,
      message: String(text || '').slice(0, 500),
      param: null,
    };
  }
}

async function readRenderJson(response) {
  const text = await response.text();
  try {
    return { text, data: JSON.parse(text) };
  } catch {
    return { text, data: null };
  }
}

async function relayDiagnose(request, env, cors) {
  const suppliedToken = request.headers.get('x-romi-token') || '';
  if (!suppliedToken) {
    return json({ ok: false, error: 'proxy_token_missing' }, 401, cors);
  }

  let upstream;
  try {
    upstream = await fetch(`${renderBase(env)}/diagnose`, {
      method: 'POST',
      headers: {
        'x-romi-token': suppliedToken,
        accept: 'application/json',
      },
    });
  } catch (e) {
    return json({
      ok: false,
      service: 'romi-ai-worker',
      version: '1.2.0-render-relay',
      transport: 'cloudflare_render_relay',
      ingress_colo: request.cf?.colo || null,
      render_http: null,
      error: 'render_transport_error',
      render_error: String(e?.message || e),
    }, 200, cors);
  }

  const { text, data } = await readRenderJson(upstream);
  if (!data || typeof data !== 'object') {
    return json({
      ok: false,
      service: 'romi-ai-worker',
      version: '1.2.0-render-relay',
      transport: 'cloudflare_render_relay',
      ingress_colo: request.cf?.colo || null,
      render_http: upstream.status,
      error: 'invalid_render_response',
      render_error: safeErrorPayload(text),
    }, 200, cors);
  }

  return json({
    ok: Boolean(upstream.ok && data.ok),
    service: 'romi-ai-worker',
    version: '1.2.0-render-relay',
    transport: 'cloudflare_render_relay',
    ingress_colo: request.cf?.colo || null,
    render_http: upstream.status,
    render_service: data.service || null,
    render_version: data.version || null,
    render_transport: data.transport || null,
    model: data.model || allowedModels(env)[0] || DEFAULT_ALLOWED_MODEL,
    model_probe: data.model_probe || null,
    response_probe: data.response_probe || null,
    structured_probe: data.structured_probe || null,
    error: data.error || null,
  }, 200, cors);
}

async function relayChat(request, env, cors) {
  const suppliedToken = request.headers.get('x-romi-token') || '';
  if (!suppliedToken) {
    return json({ ok: false, error: 'proxy_token_missing' }, 401, cors);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'payload_too_large' }, 413, cors);
  }

  let raw;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400, cors);
  }

  if (!raw || raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: raw ? 'payload_too_large' : 'empty_body' }, raw ? 413 : 400, cors);
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400, cors);
  }

  if (!body || typeof body !== 'object' || !body.model || body.input === undefined) {
    return json({ ok: false, error: 'invalid_openai_payload' }, 400, cors);
  }

  const models = allowedModels(env);
  if (!models.includes(String(body.model))) {
    return json({
      ok: false,
      error: 'model_not_allowed_by_proxy',
      allowed_models: models,
    }, 400, cors);
  }

  body.store = false;

  let upstream;
  try {
    upstream = await fetch(`${renderBase(env)}/chat`, {
      method: 'POST',
      headers: {
        'x-romi-token': suppliedToken,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return json({
      ok: false,
      error: 'render_transport_error',
      message: String(e?.message || e),
    }, 502, cors);
  }

  const responseText = await upstream.text();
  return new Response(responseText, {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'x-romi-proxy': 'cloudflare-worker-v1.2.0-render-relay',
      'x-romi-upstream': 'render-frankfurt',
      'x-romi-ingress-colo': request.cf?.colo || '',
      'x-openai-request-id': upstream.headers.get('x-openai-request-id') || '',
      ...cors,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request);

    if (request.method === 'OPTIONS') {
      const origin = request.headers.get('origin') || '';
      if (!ALLOWED_ORIGINS.has(origin)) {
        return json({ ok: false, error: 'origin_not_allowed' }, 403);
      }
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/health') {
      return json({
        ok: true,
        service: 'romi-ai-worker',
        version: '1.2.0-render-relay',
        transport: 'cloudflare_render_relay',
        ingress_colo: request.cf?.colo || null,
        render_upstream: renderBase(env),
        allowed_models: allowedModels(env),
      }, 200, cors);
    }

    if (url.pathname === '/diagnose') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: 'method_not_allowed' }, 405, { allow: 'POST', ...cors });
      }
      return relayDiagnose(request, env, cors);
    }

    if (url.pathname === '/chat') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: 'method_not_allowed' }, 405, { allow: 'POST', ...cors });
      }
      return relayChat(request, env, cors);
    }

    return json({ ok: false, error: 'not_found' }, 404, cors);
  },
};
