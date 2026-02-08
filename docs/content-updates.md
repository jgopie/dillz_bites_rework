# Content Updates

## Updating copy

Primary marketing text lives in:

- `src/components/Hero.astro`
- `src/components/About.astro`
- `src/components/Contact.astro`
- `src/components/Footer.astro`

## Updating cake images

Gallery source images are stored in `src/assets/images` and mapped in:

- `src/components/react/carousel-slides.ts`

Responsive variants are generated server-side in:

- `src/components/Gallery.astro` via `getImage`

When replacing or adding images:

1. Add/update image imports and alt text in `src/components/react/carousel-slides.ts`.
2. Keep `id` values stable when possible for predictable keyed rendering.
3. Prefer high-quality originals; optimization to WebP/JPEG variants is handled in `Gallery.astro`.
4. Keep source dimensions reasonably high so generated widths (`420, 640, 860, 1080, 1320`) remain crisp.

## Carousel behavior

Carousel interaction and autoplay behavior are implemented in:

- `src/components/react/CakeCarousel.tsx`

For design/layout refinements, update:

- `src/styles/react/cake-carousel.css`

Current fit behavior is intentionally `object-fit: contain` so each full cake image remains visible without cropping.

## Contact details

Update phone/email references in:

- `src/components/Contact.astro`
- `src/components/Footer.astro` (if needed)
- `src/lib/config/env.ts` default fallback email values (if business inbox changes)

## Order options

Order field options and submit behavior live in:

- `src/components/react/OrderFormIsland.tsx`

Order payload/validation contracts are enforced in:

- `src/lib/order/schema.ts`
