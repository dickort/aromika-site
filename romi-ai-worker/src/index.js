const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const OPENAI_MODELS_URL = 'https://api.openai.com/v1/models';
const DEFAULT_ALLOWED_MODEL = 'gpt-5.6-luna';
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
    'vary': 'Origin',
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

function secureEqual(a, b) {
  a = String(a || '');
  b = String(b || '');
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function allowedModels(env) {
  return String(env.ALLOWED_MODELS || DEFAULT_ALLOWED_MODEL)
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function authHeaders(env) {
  return {
    authorization: `Bearer ${env.OPENAI_API_KEY}`,
    'content-type': 'application/json',
    accept: 'application/json',
  };
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
    return { code: null, type: null, message: String(text || '').slice(0, 500), param: null };
  }
}

async function probeOpenAI(env) {
  const model = allowedModels(env)[0] || DEFAULT_ALLOWED_MODEL;
  const result = { model };

  try {
    const r = await fetch(`${OPENAI_MODELS_URL}/${encodeURIComponent(model)}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${env.OPENAI_API_KEY}`,
        accept: 'application/json',
      },
    });
    const text = await r.text();
    result.model_probe = {
      status: r.status,
      ok: r.ok,
      request_id: r.headers.get('x-request-id') || null,
      error: r.ok ? null : safeErrorPayload(text),
    };
  } catch (e) {
    result.model_probe = { status: null, ok: false, request_id: null, error: { code: 'transport', type: null, message: String(e?.message || e), param: null } };
  }

  try {
    const r = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: authHeaders(env),
      body: JSON.stringify({ model, input: 'Reply with exactly: OK', store: false, max_output_tokens: 8 }),
    });
    const text = await r.text();
    result.response_probe = {
      status: r.status,
      ok: r.ok,
      request_id: r.headers.get('x-request-id') || null,
      error: r.ok ? null : safeErrorPayload(text),
    };
  } catch (e) {
    result.response_probe = { status: null, ok: false, request_id: null, error: { code: 'transport', type: null, message: String(e?.message || e), param: null } };
  }

  return result;
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
        version: '1.0.3-cors-diagnostics',
        ingress_colo: request.cf?.colo || null,
        openai_configured: Boolean(env.OPENAI_API_KEY),
        proxy_token_configured: Boolean(env.ROMI_PROXY_TOKEN),
        allowed_models: allowedModels(env),
      }, 200, cors);
    }

    if (url.pathname === '/diagnose') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: 'method_not_allowed' }, 405, { allow: 'POST', ...cors });
      }
      if (!env.OPENAI_API_KEY) return json({ ok: false, error: 'openai_not_configured' }, 503, cors);
      if (!env.ROMI_PROXY_TOKEN) return json({ ok: false, error: 'proxy_token_not_configured' }, 503, cors);
      const suppliedToken = request.headers.get('x-romi-token') || '';
      if (!secureEqual(suppliedToken, env.ROMI_PROXY_TOKEN)) return json({ ok: false, error: 'unauthorized' }, 401, cors);

      const probes = await probeOpenAI(env);
      return json({
        ok: Boolean(probes.model_probe?.ok && probes.response_probe?.ok),
        service: 'romi-ai-worker',
        version: '1.0.3-cors-diagnostics',
        ingress_colo: request.cf?.colo || null,
        ...probes,
      }, 200, cors);
    }

    if (url.pathname !== '/chat') {
      return json({ ok: false, error: 'not_found' }, 404, cors);
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, { allow: 'POST', ...cors });
    }

    if (!env.OPENAI_API_KEY) {
      return json({ ok: false, error: 'openai_not_configured' }, 503, cors);
    }
    if (!env.ROMI_PROXY_TOKEN) {
      return json({ ok: false, error: 'proxy_token_not_configured' }, 503, cors);
    }

    const suppliedToken = request.headers.get('x-romi-token') || '';
    if (!secureEqual(suppliedToken, env.ROMI_PROXY_TOKEN)) {
      return json({ ok: false, error: 'unauthorized' }, 401, cors);
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
      upstream = await fetch(OPENAI_RESPONSES_URL, {
        method: 'POST',
        headers: authHeaders(env),
        body: JSON.stringify(body),
      });
    } catch {
      return json({ ok: false, error: 'openai_transport_error' }, 502, cors);
    }

    const responseText = await upstream.text();
    return new Response(responseText, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
        'x-romi-proxy': 'cloudflare-worker-v1.0.3-cors-diagnostics',
        'x-romi-ingress-colo': request.cf?.colo || '',
        'x-openai-request-id': upstream.headers.get('x-request-id') || '',
        ...cors,
      },
    });
  },
};
