# Architecture

## Runtime model

- Astro app running in `output: server` mode with `@astrojs/node` adapter.
- Render hosts the Node server process.
- Astro is the shell framework; React is used as targeted islands for interactive UI.
- No database in v1; email delivery is the persistence channel.

## UI architecture

- Astro layout/pages:
  - `src/layouts/BaseLayout.astro`
  - `src/pages/index.astro`
  - `src/pages/order.astro`
- React islands:
  - `src/components/react/CakeCarousel.tsx` (Embla carousel)
  - `src/components/react/OrderFormIsland.tsx` (Radix Themes form controls)
- Shared UI data/types:
  - `src/components/react/carousel-slides.ts`
  - `src/components/react/order-form.types.ts`

## High-level flow

1. User visits `/order` and submits form through the React order island.
2. Browser sends JSON payload to `POST /api/orders`.
3. Endpoint validates payload using `zod` schema and lead-time rule.
4. Honeypot and IP rate limiter filter abuse.
5. Internal and customer emails are sent via Resend.
6. API returns `requestId` and status message to the client.

## Key source files

- `src/pages/api/orders.ts` - API endpoint and orchestration
- `src/lib/order/schema.ts` - canonical validation/types
- `src/lib/order/service.ts` - request ID + email payload composition
- `src/lib/email/resend.ts` - provider integration
- `src/lib/security/rate-limit.ts` - fixed-window in-memory limiter
- `src/lib/config/env.ts` - env parsing and defaults

## Constraints

- Rate limiter is in-memory and instance-local. Horizontal scaling means per-instance limits.
- No order database means order history depends on inbox retention.
- Customer confirmation failures are logged but do not fail successful internal notification requests.
- Tests must not live under `src/pages/**` to avoid accidental route exposure.