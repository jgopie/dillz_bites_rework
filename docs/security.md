# Security

## Secrets handling

- Never commit real API keys to git.
- Use `.env.example` for placeholder defaults only.

## External link safety

- WhatsApp links that open in a new tab must use `rel="noopener noreferrer"`.
- Keep `WHATSAPP_URL` centralized in `src/lib/config/contact.ts` to avoid drift or malformed links.

## Data handling

- No order form payloads are processed server-side.
- No SMTP delivery pipeline is active.
- Legacy route `/api/orders` is intentionally non-functional and returns `410 Gone`.

## Logging

- Logs should not include secrets or sensitive user content.

## Future hardening options

1. Add analytics events for WhatsApp CTA click monitoring.
2. Add CSP refinements for stricter external-link policies.
3. Add link integrity tests to validate `WHATSAPP_URL` formatting in CI.
