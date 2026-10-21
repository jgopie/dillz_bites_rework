# Troubleshooting

## Live site did not update after a push

1. Check the "Deploy to GitHub Pages" run in the Actions tab; a failing `npm test` or build stops the deploy.
2. Confirm Settings > Pages > Source is "GitHub Actions".
3. Hard-refresh; GitHub Pages caches for a few minutes.

## Custom domain dropped or HTTPS warning

1. Confirm `public/CNAME` contains `www.dillzbites.com` and appears in the built `dist/`.
2. Confirm the DNS CNAME for `www` points to `jgopie.github.io`.
3. In Settings > Pages, re-save the custom domain and keep "Enforce HTTPS" on.

## Build fails with an adapter or server error

The site must stay `output: 'static'` with no adapter and no API routes. Remove any `src/pages/api/*` file or `export const prerender = false`.

## WhatsApp opens with a missing or garbled message

1. Check `WHATSAPP_DEFAULT_MESSAGE` and `ORDER_TEMPLATE_FIELDS` in `src/lib/config/contact.ts`.
2. Run `npm run test`; `contact.test.ts` verifies the encoding.

## Contact info differs between sections

All sections import from `src/lib/config/contact.ts`. Search `src/` for hard-coded numbers or emails and replace them with the constants.
