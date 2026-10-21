# Design Spec: Warm Artisan Bakery

## Brand intent

Dillz Bites makes playful, personal celebration cakes. The site should feel like a boutique cake studio: warm, generous and photo-led, with enough personality to match the cakes.

Scene: someone planning a birthday or shower, opening the site on their phone in daylight from an Instagram or WhatsApp link. That calls for a light, warm theme, big photos and an obvious way to message.

## Color strategy

Committed: raspberry owns the hero, closing CTA and order page; cream carries the reading sections; cocoa anchors the gallery, footer and text; caramel is the secondary for the ribbon, badge, labels and script accents. All tokens are OKLCH in `src/styles/tokens.css`.

- Canvas `--bg-canvas` (cream), surfaces `--bg-surface`, blush band `--bg-blush`, footer `--bg-deep` (cocoa)
- Text `--text-strong` (cocoa), `--text-muted`; inverse variants for the footer and band
- Primary `--accent-primary` (raspberry) / `--accent-primary-strong` for hover
- Secondary `--accent-secondary` (caramel, decorative) / `--accent-secondary-text` (AA on cream, for eyebrows and labels)
- `--whatsapp` / `--whatsapp-strong`: only on WhatsApp-branded buttons (contact CTA, floating button)

## Typography

- Display: Young Serif (warm, chunky old-style serif) for headings, numerals and captions
- Body/UI: Figtree
- Script: Allura, only for the wordmark and a single accent word per heading (`.script-accent`)
- Headings use fluid `clamp()` sizes; body text is capped near 60ch

## Signature moves

- Section rhythm with its own colour per section: raspberry hero, caramel ribbon, cocoa gallery, blush steps, cream About, raspberry closing CTA, cocoa footer
- Drenched raspberry hero with oversized display type (lines rise in on load) and a fan of three framed snapshots with script captions; the fan spreads on hover
- Slowly spinning caramel "Made to order, baked fresh" badge
- Tilted caramel ribbon with a scrolling marquee of occasions and sparkle separators (static under reduced motion)
- Piped-buttercream scallop edges between sections (`.scallop-bottom` + `--scallop-color` in `global.css`)
- Dark "display case" gallery using the `.on-dark` token scope, with staggered slide heights
- Giant outlined numerals on staggered step cards in How it works
- Chunky cream `.button-cream` with a raised, pressable edge on raspberry sections
- Arch-topped About photo, tilted contact card and paper order ticket with a scalloped edge

## Component rules

- Primary button `.button`: raspberry pill with the WhatsApp glyph when it opens WhatsApp.
- Outline button `.button-outline`: cocoa outline that fills cocoa on hover.
- `.button-whatsapp`: WhatsApp green, used sparingly so the brand colour stays raspberry.
- Carousel: portrait 3:4 slides, `object-fit: cover`, three per view on desktop, two on tablet and one plus a peek on mobile, with captions under each slide.
- The floating WhatsApp button shrinks to an icon-only circle under 40rem.

## Accessibility

- Text and controls meet WCAG AA on their backgrounds; caramel is never used for body text.
- Visible focus ring (`--focus-ring`) on every interactive element.
- Carousel is keyboard operable with labelled arrows and dots.
- Reveal motion uses exponential ease-out and turns off under `prefers-reduced-motion`.

## Don't

- Use gradients on buttons or text, glass panels, or side-stripe borders.
- Add more script text than the wordmark and one accent per heading.
- Use em dashes in copy.
