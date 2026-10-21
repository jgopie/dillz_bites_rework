# Content Updates

## Updating copy

Marketing text lives in:

- `src/components/Hero.astro`
- `src/components/Occasions.astro` (list of occasions in the raspberry band)
- `src/components/HowItWorks.astro` (the three ordering steps)
- `src/components/About.astro`
- `src/components/Contact.astro`
- `src/components/Footer.astro`
- `src/pages/order.astro`

House style: short sentences, no em dashes, British/Caribbean spelling ("colours", "flavours").

## Updating cake images

Source images live in `src/assets/images`. Gallery slides are listed in `src/components/react/carousel-slides.ts`; each has an `id`, `image`, `caption` and `alt`.

When replacing or adding images:

1. Import the image and add a slide entry with a short caption and an alt text that describes the actual cake.
2. Keep `id` values stable.
3. Use portrait originals around 1200 by 1600px; slides are cropped to 3:4.
4. The hero (`Hero.astro`, `cake_4` and `cake_9`) and About (`About.astro`, `cake_6`) photos are set in those components. Avoid showing the same photo in the hero and the first gallery slide.

Optimised WebP/JPEG variants are generated at build time in `src/components/Gallery.astro`.

## Carousel behaviour

Interaction and autoplay live in `src/components/react/CakeCarousel.tsx`; layout in `src/styles/react/cake-carousel.css`.

## Contact details, hours and WhatsApp messages

Edit `src/lib/config/contact.ts`. Every CTA, the Contact section, the footer and the `/order` ticket read from it.
