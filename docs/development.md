# Development

## Core scripts

- `npm run dev`: local Astro dev server (hosted on `0.0.0.0`).
- `npm run build`: static production build into `dist/`.
- `npm run preview`: serve the built site.
- `npm run test`: run the Vitest suite once.
- `npm run test:watch`: Vitest in watch mode.

## Typical local workflow

1. Install deps: `npm ci`
2. Start dev server: `npm run dev`
3. Run tests: `npm run test`
4. Type check: `npx astro check`
5. Verify the build: `npm run build`

Pushing to `main` deploys to production (see [`deployment.md`](deployment.md)), so run the steps above first.

## Testing scope

- `src/tests/react/cake-carousel.test.tsx`: carousel controls, keyboard navigation, index wrapping.
- `src/tests/lib/contact.test.ts`: WhatsApp link encoding and order template contents.

## Where things live

- Contact details and WhatsApp messages: `src/lib/config/contact.ts`
- Section copy and layout: `src/components/*.astro`
- Head, fonts and shared scripts: `src/layouts/BaseLayout.astro`
