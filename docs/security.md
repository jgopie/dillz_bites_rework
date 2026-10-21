# Security

## Attack surface

- The site is static files on GitHub Pages: no server, API, form handling or stored user data.
- Customer details are only typed into WhatsApp, phone or email, never into the site.

## Secrets

- No secrets are needed to build or run the site. Never commit credentials; `.env` is git-ignored.

## External link safety

- WhatsApp links that open a new tab use `rel="noopener noreferrer"`.
- Links are built only by `buildWhatsAppHref()` in `src/lib/config/contact.ts`, which URL-encodes the message.

## Deployment

- Deploys use GitHub's OIDC-based `actions/deploy-pages`; the workflow only has `contents: read`, `pages: write` and `id-token: write`.
- Keep "Enforce HTTPS" enabled in the repo's Pages settings.
