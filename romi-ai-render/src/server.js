import http from 'node:http';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const OPENAI_MODELS_URL = 'https://api.openai.com/v1/models';
const DEFAULT_ALLOWED_MODEL = 'gpt-5.6-luna';
const MAX_BODY_BYTES = 180000;
const REQUEST_TIMEOUT_MS = 30000;
const PORT = Number(process.env.PORT || 10000);

const ALLOWED_ORIGINS = new Set([
  'https://aromika.shop',
  'https://www.aromika.shop',
  'https://aromika.info',
  'https://www.aromika.info',
]);

function allowedModels() {
  return String(process.env.ALLOWED_MODELS || DEFAULT_ALLOWED_MODEL)
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function secureEqual(a, b) {
  a = String(a || '');
  b = String(b || '');
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function corsHeaders(req) {
  const origin = String(req.headers.origin || '');
  if (!ALLOWED_ORIGINS.has(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'Content-Type, X-Romi-Token',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
}

function sendJson(res, status, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    ...extraHeaders,
  });
  res.end(body);
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

function openAIHeaders() {
  return {
    authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'content-type': 'application/json',
    accept: 'application/json',
  };
}

async function runProbe(url, options) {
  try {
    const r = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const text = await r.text();
    return {
      status: r.status,
      ok: r.ok,
      request_id: r.headers.get('x-request-id') || null,
      error: r.ok ? null : safeErrorPayload(text),
    };
  } catch (e) {
    return {
      status: null,
      ok: false,
      request_id: null,
      error: {
        code: e?.name === 'TimeoutError' ? 'timeout' : 'transport',
        type: null,
        message: String(e?.message || e),
        param: null,
      },
    };
  }
}

async function probeOpenAI() {
  const model = allowedModels()[0] || DEFAULT_ALLOWED_MODEL;
  const result = { model };

  result.model_probe = await runProbe(
    `${OPENAI_MODELS_URL}/${encodeURIComponent(model)}`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        accept: 'application/json',
      },
    },
  );

  result.response_probe = await runProbe(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: openAIHeaders(),
    body: JSON.stringify({
      model,
      input: 'Reply with exactly: OK',
      store: false,
      max_output_tokens: 32,
    }),
  });

  result.structured_probe = await runProbe(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: openAIHeaders(),
    body: JSON.stringify({
      model,
      instructions: 'Return the requested object. Keep the answer short.',
      input: JSON.stringify({ question: 'Say hello briefly.' }),
      max_output_tokens: 160,
      store: false,
      text: {
        format: {
          type: 'json_schema',
          name: 'romi_probe',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              answer: { type: 'string' },
              product_ids: { type: 'array', items: { type: 'integer' } },
              follow_up: { type: 'array', items: { type: 'string' }, maxItems: 3 },
              needs_clarification: { type: 'boolean' },
              confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
            },
            required: [
              'answer',
              'product_ids',
              'follow_up',
              'needs_clarification',
              'confidence',
            ],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  return result;
}

async function readBody(req) {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('payload_too_large'), { code: 'payload_too_large' }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function isAuthorized(req) {
  return secureEqual(req.headers['x-romi-token'] || '', process.env.ROMI_PROXY_TOKEN || '');
}

async function handle(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const cors = corsHeaders(req);

  if (req.method === 'OPTIONS') {
    const origin = String(req.headers.origin || '');
    if (!ALLOWED_ORIGINS.has(origin)) {
      return sendJson(res, 403, { ok: false, error: 'origin_not_allowed' });
    }
    res.writeHead(204, cors);
    return res.end();
  }

  if (url.pathname === '/health') {
    return sendJson(
      res,
      200,
      {
        ok: true,
        service: 'romi-ai-render',
        version: '1.0.0-render-frankfurt',
        transport: 'render_direct_openai',
        openai_configured: Boolean(process.env.OPENAI_API_KEY),
        proxy_token_configured: Boolean(process.env.ROMI_PROXY_TOKEN),
        allowed_models: allowedModels(),
        render_service: process.env.RENDER_SERVICE_NAME || null,
      },
      cors,
    );
  }

  if (url.pathname === '/diagnose') {
    if (req.method !== 'POST') {
      return sendJson(res, 405, { ok: false, error: 'method_not_allowed' }, { allow: 'POST', ...cors });
    }
    if (!process.env.OPENAI_API_KEY) {
      return sendJson(res, 503, { ok: false, error: 'openai_not_configured' }, cors);
    }
    if (!process.env.ROMI_PROXY_TOKEN) {
      return sendJson(res, 503, { ok: false, error: 'proxy_token_not_configured' }, cors);
    }
    if (!isAuthorized(req)) {
      return sendJson(res, 401, { ok: false, error: 'unauthorized' }, cors);
    }

    const probes = await probeOpenAI();
    return sendJson(
      res,
      200,
      {
        ok: Boolean(
          probes.model_probe?.ok &&
          probes.response_probe?.ok &&
          probes.structured_probe?.ok,
        ),
        service: 'romi-ai-render',
        version: '1.0.0-render-frankfurt',
        transport: 'render_direct_openai',
        ...probes,
      },
      cors,
    );
  }

  if (url.pathname !== '/chat') {
    return sendJson(res, 404, { ok: false, error: 'not_found' }, cors);
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'method_not_allowed' }, { allow: 'POST', ...cors });
  }
  if (!process.env.OPENAI_API_KEY) {
    return sendJson(res, 503, { ok: false, error: 'openai_not_configured' }, cors);
  }
  if (!process.env.ROMI_PROXY_TOKEN) {
    return sendJson(res, 503, { ok: false, error: 'proxy_token_not_configured' }, cors);
  }
  if (!isAuthorized(req)) {
    return sendJson(res, 401, { ok: false, error: 'unauthorized' }, cors);
  }

  let raw;
  try {
    raw = await readBody(req);
  } catch (e) {
    if (e?.code === 'payload_too_large') {
      return sendJson(res, 413, { ok: false, error: 'payload_too_large' }, cors);
    }
    return sendJson(res, 400, { ok: false, error: 'invalid_body' }, cors);
  }

  if (!raw) {
    return sendJson(res, 400, { ok: false, error: 'empty_body' }, cors);
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return sendJson(res, 400, { ok: false, error: 'invalid_json' }, cors);
  }

  if (!body || typeof body !== 'object' || !body.model || body.input === undefined) {
    return sendJson(res, 400, { ok: false, error: 'invalid_openai_payload' }, cors);
  }

  const models = allowedModels();
  if (!models.includes(String(body.model))) {
    return sendJson(
      res,
      400,
      {
        ok: false,
        error: 'model_not_allowed_by_proxy',
        allowed_models: models,
      },
      cors,
    );
  }

  body.store = false;

  let upstream;
  try {
    upstream = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: openAIHeaders(),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (e) {
    return sendJson(
      res,
      502,
      {
        ok: false,
        error: e?.name === 'TimeoutError' ? 'openai_timeout' : 'openai_transport_error',
      },
      cors,
    );
  }

  const responseText = await upstream.text();
  res.writeHead(upstream.status, {
    'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'x-romi-proxy': 'render-frankfurt-v1',
    'x-openai-request-id': upstream.headers.get('x-request-id') || '',
    ...cors,
  });
  res.end(responseText);
}

const server = http.createServer((req, res) => {
  handle(req, res).catch((error) => {
    console.error('[ROMI Render] unhandled', error);
    if (!res.headersSent) {
      sendJson(res, 500, { ok: false, error: 'internal_error' });
    } else {
      res.end();
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[ROMI Render] listening on 0.0.0.0:${PORT}`);
});
