# ROMI AI Render Backend

Small server-side proxy for ROMI. Designed to run as a Render Web Service in Frankfurt and keep the OpenAI API key outside the browser and CS-Cart frontend.

## Endpoints

- `GET /health` — safe configuration status.
- `POST /diagnose` — protected OpenAI connectivity diagnostics. Requires header `X-Romi-Token`.
- `POST /chat` — protected pass-through to the OpenAI Responses API. Requires header `X-Romi-Token`.

## Required environment variables

- `OPENAI_API_KEY` — OpenAI project API key.
- `ROMI_PROXY_TOKEN` — shared secret; must match Romi Connector.
- `ALLOWED_MODELS` — optional comma-separated allowlist. Default: `gpt-5.6-luna`.

Never commit secret values to GitHub.

## Render Dashboard setup

Create a **Web Service** from `dickort/aromika-site` with:

- Name: `romi-ai`
- Region: `Frankfurt (EU Central)`
- Branch: `main`
- Root Directory: `romi-ai-render`
- Runtime: `Node`
- Build Command: `npm install --omit=dev`
- Start Command: `npm start`
- Health Check Path: `/health`
- Instance Type: `Free` for testing

Add environment variables `OPENAI_API_KEY`, `ROMI_PROXY_TOKEN`, and `ALLOWED_MODELS=gpt-5.6-luna`.

After deployment, open `https://<service>.onrender.com/health`.

Then set Romi Connector `AI Proxy URL` to `https://<service>.onrender.com/chat` and keep the same `ROMI_PROXY_TOKEN`.
