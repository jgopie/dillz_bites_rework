# Configuration

## Environment variables

None. The site is static and needs no runtime configuration.

## Contact source of truth

All business details live in `src/lib/config/contact.ts`:

- `BUSINESS_NAME`, `PHONE_DISPLAY`, `PHONE_E164`, `EMAIL`
- `HOURS`: rows rendered in the Contact section
- `WHATSAPP_NUMBER_DIGITS`, `WHATSAPP_DEFAULT_MESSAGE`
- `ORDER_TEMPLATE_FIELDS`: fields in the order template (also drawn as the ticket on `/order`)
- `buildWhatsAppHref(message?)`, `buildOrderTemplateMessage()`

## Site config

`astro.config.mjs` sets `site: 'https://www.dillzbites.com'` (used for canonical and OG URLs) and `output: 'static'`. `public/CNAME` holds the custom domain for GitHub Pages.
