# Quickstart

## Prerequisites

- Node.js 20+
- npm 10+
- Resend API key for live email testing

## Install

```bash
npm ci
```

## Configure environment

Copy `.env.example` to `.env` and fill required values.

```bash
cp .env.example .env
```

Minimum required for order API:

- `RESEND_API_KEY`
- `ORDER_NOTIFICATION_EMAIL`
- `ORDER_FROM_EMAIL`

## Run locally

```bash
npm run dev
```

Default local URL: `http://localhost:4321` (IPv4 also available at `http://127.0.0.1:4321`).

## Run tests

```bash
npm run test
```

## Build production output

```bash
npm run build
```

With server output enabled, production entrypoint is:

```bash
node ./dist/server/entry.mjs
```

## UI stack

- Astro pages/layouts for shell rendering
- React islands via `@astrojs/react`
- Embla (`embla-carousel-react`) for gallery carousel
- Radix Themes (`@radix-ui/themes`) for order form controls