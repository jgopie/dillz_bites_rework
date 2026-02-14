# Development

## Core scripts

- `npm run dev` - run local Astro dev server (hosted on `0.0.0.0`).
- `npm run build` - build server/client production output.
- `npm run preview` - preview built app.
- `npm run test` - run Vitest suite once.
- `npm run test:watch` - run Vitest in watch mode.

## Typical local workflow

1. Install deps: `npm ci`
2. Start dev server: `npm run dev`
3. Run tests before merge: `npm run test`
4. Verify production build: `npm run build`

## Testing scope

- Current automated tests cover the React carousel behavior (`src/tests/react/cake-carousel.test.tsx`).
- Order form/API/email/rate-limit tests were removed with the WhatsApp-first migration.

## Frontend content workflow

- Contact + WhatsApp values: `src/lib/config/contact.ts`
- Core section copy/components: `src/components/*.astro`
- Global layout and shared scripts: `src/layouts/BaseLayout.astro`
