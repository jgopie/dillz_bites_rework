# Deployment

## Platform

- Target: Render Web Service
- Runtime: Node 20
- Build command: `npm ci && npm run build`
- Start command: `node ./dist/server/entry.mjs`

Reference config:

- `render.yaml`
- `astro.config.mjs`

## Runtime configuration

- No app-specific runtime env vars are currently required for the WhatsApp-first flow.
- `NODE_VERSION` is set in `render.yaml` for the Render environment.

## Production verification checklist

1. Build succeeds in CI/CD (`npm run build`).
2. Homepage hero CTA opens WhatsApp.
3. Navigation/footer WhatsApp links open in a new tab.
4. `/order` shows WhatsApp checklist + CTA.
5. `/api/orders` returns `410 Gone`.
6. Contact section still exposes phone, email, and hours.
