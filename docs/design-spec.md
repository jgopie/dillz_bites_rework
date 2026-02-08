# Design Spec: Coastal Slate Luxury

## Brand intent

Dillz Bites should feel calm, premium, and precise. The visual language is minimal, cool-toned, and photo-forward:

- Calm: low-saturation blue/green surfaces and soft gradients
- Premium: strong typography, restrained highlights, and clean spacing
- Practical: clear CTAs, high readability, and accessible controls

## Visual direction

- Product personality: `Sophistication & Trust`
- Styling flavor: `Luxury / Refined`
- Signature move: subtle cool sheen and atmospheric gradients
- Elevation strategy: surface tint + light borders, shadow used sparingly

## Tokens (source of truth)

All tokens live in `src/styles/tokens.css`.

### Core colors

- `--bg-canvas: #f3f6f7`
- `--bg-surface: #fbfcfc`
- `--bg-deep: #0f1f2a`
- `--text-strong: #132733`
- `--text-muted: #516675`
- `--text-inverse: #eaf1f4`
- `--accent-primary: #1f4f68`
- `--accent-secondary: #2f6f67`
- `--accent-soft: #dbe7e6`
- `--accent-highlight: #89ada7`
- `--border-soft: #c5d2d8`
- `--focus-ring: rgba(31, 79, 104, 0.35)`
- `--danger: #a24b59`

### Surface utility tokens

- `--surface-frost`: translucent light panel for sticky header and outlines
- `--surface-muted`: muted section background for narrative blocks
- `--overlay-deep`: dark overlay for text on image
- `--accent-primary-soft`: subtle selected state / decorative fill
- `--accent-primary-mist` and `--accent-secondary-mist`: background atmospheric gradients

## Component rules

### Buttons

- Primary buttons use `--accent-primary` to `--accent-secondary` gradient.
- Outline buttons use `--surface-frost` and `--border-soft`.
- Focus must always show with `--focus-ring`.

### Header/navigation

- Sticky nav uses `--surface-frost` with a cool, thin border.
- Active nav states use `--accent-primary-soft`.

### Gallery/carousel

- Carousel frame uses light surface tint and border.
- Slide media stage uses `aspect-ratio: 4 / 3` and `object-fit: contain`.
- Full image visibility takes priority over edge-to-edge crop.

### Footer

- Footer uses `--bg-deep` with `--text-inverse` variants for readability.

## Typography and rhythm

- Display: `Fraunces`
- Body/UI: `Manrope`
- Existing spacing/radius system remains unchanged.
- Motion remains subtle and must respect `prefers-reduced-motion`.

## Accessibility requirements

- Body and control text must meet WCAG AA contrast on their backgrounds.
- All interactive controls must keep visible focus states.
- Carousel controls must remain keyboard accessible and labeled.

## Do / Don't

Do:

- Keep accent usage sparse and intentional.
- Use token variables instead of hardcoded color values.
- Preserve negative space and clean section hierarchy.

Don't:

- Reintroduce warm yellow/brown palette values.
- Use high-saturation colors for large surfaces.
- Crop cake images by default in the carousel.
