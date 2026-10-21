# UI System

## Direction

Warm artisan bakery: cream canvas, cocoa ink, raspberry accent, caramel secondary. The full rationale is in [`design-spec.md`](design-spec.md).

## Token source

- Tokens: `src/styles/tokens.css` (OKLCH colours, radii including `--radius-arch`, shadows, spacing, fonts, easing)
- Shared patterns: `src/styles/global.css` (container, section rhythm, eyebrow, section title, buttons, reveal animation)

## Color model

- Backgrounds: `--bg-canvas`, `--bg-surface`, `--bg-blush`, `--bg-deep`
- Text: `--text-strong`, `--text-muted`, `--text-inverse*`
- Accents: `--accent-primary(-strong)`, `--accent-secondary(-text)`, `--accent-soft`, `--accent-highlight`
- WhatsApp: `--whatsapp`, `--whatsapp-strong`
- Interaction: `--focus-ring`, `--border-soft`

## Motion and elevation

- `--transition-fast` (180ms) for hovers; `--transition-base` (600ms) for scroll reveals; both use `--ease-out`.
- Shadows are warm-tinted: `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
- `prefers-reduced-motion` disables transitions and reveals globally.

## Component stacks

- Astro components for all sections: Navigation, Hero, Occasions, Gallery, HowItWorks, About, Contact, Footer, WhatsAppFloat, WhatsAppIcon.
- React island for the carousel: `src/components/react/CakeCarousel.tsx`, styled by `src/styles/react/cake-carousel.css`.

Carousel images are optimised at build time in `src/components/Gallery.astro` with `getImage` (WebP and JPEG at 320 to 860px) and rendered as `<picture>` sources in the island. Without JavaScript, a static grid of the same images is shown.

## Accessibility baseline

- Focus indicators use `--focus-ring` and stay visible on all surfaces.
- One `h1` per page, with sections using `h2`/`h3` and `aria-labelledby`.
- AA contrast minimum for body text and controls.
