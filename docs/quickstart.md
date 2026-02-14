# Quickstart

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm ci
```

## Optional environment file

Copy `.env.example` to `.env` only if you need local custom variables for future features.

```bash
cp .env.example .env
```

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
