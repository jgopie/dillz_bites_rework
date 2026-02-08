# Deployment (Render)

## Hosting model

The site is deployed as a Render Web Service running Astro server output.

## Files used

- `render.yaml`
- `astro.config.mjs`

## Build and start commands

- Build: `npm ci && npm run build`
- Start: `node ./dist/server/entry.mjs`

## Environment setup in Render

Set the following variables in Render dashboard or via `render.yaml`:

- `RESEND_API_KEY` (required)
- `ORDER_NOTIFICATION_EMAIL`
- `ORDER_FROM_EMAIL`
- `BUSINESS_REPLY_TO_EMAIL`
- `ENABLE_ORDER_FORM`
- `RATE_LIMIT_MAX`
- `RATE_LIMIT_WINDOW_MS`

## DNS cutover checklist

1. Confirm production deploy is healthy on Render URL.
2. Verify `/order` and `/api/orders` with a live test submission.
3. Confirm internal + customer emails are both delivered.
4. Point custom domain DNS to Render.
5. Verify HTTPS certificate issuance and redirect behavior.

## Previous GitHub Pages path

GitHub Pages deploy workflow was retired for production because static hosting cannot run server-side API routes.