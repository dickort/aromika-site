# ROMI AI Worker

Cloudflare Worker proxy for ROMI. The CS-Cart add-on sends a prepared OpenAI Responses API payload to this Worker. The Worker stores the OpenAI key as a Cloudflare Secret and forwards the request to OpenAI from Cloudflare infrastructure.

## Endpoints

- `GET /health` — configuration status only; never returns secrets.
- `POST /chat` — protected proxy to OpenAI Responses API.

`/chat` requires header:

```text
X-ROMI-Token: <shared secret>
```

## Required Cloudflare secrets

Create two Worker secrets in Cloudflare:

- `OPENAI_API_KEY` — OpenAI API secret key.
- `ROMI_PROXY_TOKEN` — a long random shared token. Put the same value in Romi Connector settings in CS-Cart.

Do not commit either value to GitHub.

## Cloudflare dashboard deployment from GitHub

1. Workers & Pages → Create → Import a repository.
2. Select repository `dickort/aromika-site`.
3. Root directory: `romi-ai-worker`.
4. Deploy command: `npm run deploy` if Cloudflare asks for one.
5. After the first deploy open Worker Settings → Variables and Secrets.
6. Add `OPENAI_API_KEY` and `ROMI_PROXY_TOKEN` as encrypted Secrets.
7. Redeploy.
8. Open `https://<worker>.workers.dev/health` and confirm both `*_configured` fields are `true`.
9. In CS-Cart Romi Connector set AI Proxy URL to `https://<worker>.workers.dev/chat` and set the same ROMI Proxy Token.

## Security

- OpenAI API key is never sent to the browser or CS-Cart.
- The Worker only accepts the configured model list (`gpt-5.6-luna` by default).
- Responses API storage is forced to `store: false`.
- Request bodies are capped at 180 KB.
- `/chat` requires the shared proxy token.
- No user message content is deliberately logged by the Worker code.
