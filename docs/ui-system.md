# UI System

## Direction

The visual system uses a **Coastal Slate Luxury** palette: muted blue/green accents, refined neutrals, and low-noise premium contrast.

## Token source

Core design tokens live in:

- `src/styles/tokens.css`

Global usage patterns live in:

- `src/styles/global.css`

## Color model

- Backgrounds: cool neutrals (`--bg-canvas`, `--bg-surface`, `--bg-deep`)
- Text: strong slate and muted blue-gray (`--text-strong`, `--text-muted`)
- Accents: deep slate blue + muted coastal green (`--accent-primary`, `--accent-secondary`, `--accent-highlight`)
- Interaction/focus: shared ring and border system (`--focus-ring`, `--border-soft`)
- Surface utilities: translucent and muted overlays (`--surface-frost`, `--surface-muted`, `--overlay-deep`)

## Motion and elevation

- Motion uses two standard durations: `--transition-fast` and `--transition-base`.
- Shadows are cool-toned and consistent: `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
- Respect reduced-motion preferences globally.

## Component stacks

- Astro components for structural sections (hero/about/contact/footer/nav).
- React islands for interactive widgets:
  - Carousel: `src/components/react/CakeCarousel.tsx`
  - Order form controls: `src/components/react/OrderFormIsland.tsx`

Carousel images are prepared server-side in `src/components/Gallery.astro` using `getImage` and rendered as responsive `<picture>` sources in the React island.

## Accessibility baseline

- Focus indicators use `--focus-ring` and must remain visible on all surfaces.
- Keep semantic heading hierarchy in Astro pages.
- Keep label-to-field relationships intact in React form controls.
- Preserve contrast at AA minimum for body text and key controls.
