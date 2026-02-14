# Troubleshooting

## WhatsApp CTA opens with missing/incorrect message

Checks:

1. Verify `WHATSAPP_PREFILL` in `src/lib/config/contact.ts`.
2. Verify `WHATSAPP_URL` is built with `encodeURIComponent`.
3. Rebuild and reload the site after changes.

## WhatsApp link does not open in a new tab

Checks:

1. Verify CTA links include `target="_blank"`.
2. Verify CTA links include `rel="noopener noreferrer"`.

## Customer still calling deprecated API route

Expected behavior:

- `GET /api/orders` and `POST /api/orders` return `410 Gone`.

Action:

1. Update any old frontend integrations/bookmarks to use WhatsApp CTAs.

## Contact info appears inconsistent across sections

Checks:

1. Confirm values in `src/lib/config/contact.ts`.
2. Confirm components import and use those constants directly.
