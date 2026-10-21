# Quickstart

## Prerequisites

- Node.js 22+
- npm 10+

## Install

```bash
npm ci
```

## Run locally

```bash
npm run dev
```

Default local URL: `http://localhost:4321`.

## Run tests

```bash
npm run test
```

## Build and preview

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`; `npm run preview` serves it at `http://localhost:4321`.

## UI stack

- Astro pages and components, rendered at build time
- React island via `@astrojs/react` for the gallery
- Embla (`embla-carousel-react`) for the carousel
