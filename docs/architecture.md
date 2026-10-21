# Architecture

## Runtime model

- Static Astro site (`output: 'static'` in `astro.config.mjs`). There is no server, API route or backend.
- GitHub Pages serves the built `dist/` folder; see [`deployment.md`](deployment.md).
- Astro renders every page at build time. React is used only for the gallery carousel island (`client:visible`).

## Routes

- `/`: homepage with Hero, Occasions band, Gallery, How it works, About and Contact sections.
- `/order`: WhatsApp order page that shows the order template as a ticket and opens WhatsApp with it prefilled.

## Source layout

- `src/layouts/BaseLayout.astro`: document head (SEO/OG tags, fonts), skip link, floating WhatsApp button, scroll-reveal script.
- `src/pages/index.astro`, `src/pages/order.astro`: page composition.
- `src/components/*.astro`: page sections, plus `WhatsAppIcon.astro` (glyph from `simple-icons`, inlined at build time).
- `src/components/react/CakeCarousel.tsx` + `carousel-slides.ts`: gallery island and its slide data.
- `src/lib/config/contact.ts`: single source for phone, email, hours, WhatsApp number and messages.
- `src/styles/tokens.css`, `src/styles/global.css`: design tokens and shared styles.

## Conversion flow

1. Visitor taps a WhatsApp CTA (hero, How it works, contact, `/order`, floating button).
2. `buildWhatsAppHref()` opens `wa.me` with either the short greeting or the full order template (`buildOrderTemplateMessage()`).
3. Quotes, design and confirmation continue in the WhatsApp chat.

## Constraints

- Nothing may require a server at runtime; GitHub Pages only serves files.
- Change contact details and messages only in `src/lib/config/contact.ts`.
- External WhatsApp links use `target="_blank"` and `rel="noopener noreferrer"`.
