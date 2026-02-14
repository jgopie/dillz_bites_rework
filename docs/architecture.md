# Architecture

## Runtime model

- Astro app running in `output: server` mode with `@astrojs/node` adapter.
- Render hosts the Node server process.
- Astro is the shell framework; React is used only for targeted interactivity (gallery carousel).
- No backend order-processing pipeline is active.

## UI architecture

- Astro layout/pages:
  - `src/layouts/BaseLayout.astro`
  - `src/pages/index.astro`
  - `src/pages/order.astro` (repurposed to WhatsApp guidance + CTA)
- React islands:
  - `src/components/react/CakeCarousel.tsx`
- Shared contact config:
  - `src/lib/config/contact.ts`

## High-level conversion flow

1. User clicks a primary CTA (hero, contact section, nav/footer, floating button).
2. CTA opens prefilled WhatsApp chat via `WHATSAPP_URL`.
3. `/order` page provides a message checklist and the same WhatsApp CTA.
4. Legacy API route `/api/orders` returns `410 Gone` for backward compatibility.

## Key source files

- `src/lib/config/contact.ts` - phone/email/WhatsApp source of truth
- `src/components/Hero.astro` - primary homepage WhatsApp CTA
- `src/components/Contact.astro` - WhatsApp-first contact grid/actions
- `src/components/Navigation.astro` - global WhatsApp nav link
- `src/components/Footer.astro` - global WhatsApp footer link
- `src/components/WhatsAppFloat.astro` - floating WhatsApp CTA
- `src/pages/api/orders.ts` - deprecated endpoint (`410 Gone`)

## Constraints

- Contact/business values should be updated centrally in `src/lib/config/contact.ts`.
- External WhatsApp links must use `target="_blank"` and `rel="noopener noreferrer"`.
- `/api/orders` should remain non-functional unless a future backend order system is intentionally reintroduced.
