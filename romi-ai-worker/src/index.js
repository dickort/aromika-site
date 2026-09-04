const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_ALLOWED_MODEL = 'gpt-5.6-luna';
const MAX_BODY_BYTES = 180000;

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return json({
        ok: true,
        service: 'romi-ai-worker',
        version: '1.0.0',
        openai_configured: Boolean(env.OPENAI_API_KEY),
        proxy_token_configured: Boolean(env.ROMI_PROXY_TOKEN),
        allowed_models: allowedModels(env),
      });
    }

    if (url.pathname !== '/chat') {
      return json({ ok: false, error: 'not_found' }, 404);
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, { allow: 'POST' });
    }

    if (!env.OPENAI_API_KEY) {
      return json({ ok: false, error: 'openai_not_configured' }, 503);
    }
    if (!env.ROMI_PROXY_TOKEN) {
      return json({ ok: false, error: 'proxy_token_not_configured' }, 503);
    }

    const suppliedToken = request.headers.get('x-romi-token') || '';
    if (!secureEqual(suppliedToken, env.ROMI_PROXY_TOKEN)) {
      return json({ ok: false, error: 'unauthorized' }, 401);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'payload_too_large' }, 413);
    }

    let raw;
    try {
      raw = await request.text();
    } catch {
      return json({ ok: false, error: 'invalid_body' }, 400);
    }
    if (!raw || raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: raw ? 'payload_too_large' : 'empty_body' }, raw ? 413 : 400);
    }

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400);
    }

    if (!body || typeof body !== 'object' || !body.model || body.input === undefined) {
      return json({ ok: false, error: 'invalid_openai_payload' }, 400);
    }

    const models = allowedModels(env);
    if (!models.includes(String(body.model))) {
      return json({
        ok: false,
        error: 'model_not_allowed_by_proxy',
        allowed_models: models,
      }, 400);
    }

    // ROMI conversations must not be retained by the OpenAI Responses API.
    body.store = false;

    let upstream;
    try {
      upstream = await fetch(OPENAI_RESPONSES_URL, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${env.OPENAI_API_KEY}`,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch {
      return json({ ok: false, error: 'openai_transport_error' }, 502);
    }

    const responseText = await upstream.text();
    return new Response(responseText, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
        'x-romi-proxy': 'cloudflare-worker-v1',
      },
    });
  },
};
