# Security

## Secrets handling

- Never commit real API keys to git.
- Store `SMTP_URL` only in deployment provider secret management.
- Use `.env.example` for placeholder defaults only.

## Abuse controls

- Honeypot field (`website`) to catch basic bots.
- IP-based fixed-window rate limit at API layer.

## Data handling

- No database persistence in v1.
- Order details are transmitted over HTTPS and forwarded by email.
- Avoid adding highly sensitive customer data to form fields.

## Input validation

- All order payloads are validated server-side with Zod.
- URL fields are validated as URL format.
- Minimum lead-time policy enforced in API regardless of client behavior.

## Logging

- Endpoint logs operational failures and warnings.
- Logs should not include API keys or full sensitive payload dumps.

## Future hardening options

1. Add CAPTCHA/Turnstile for stronger bot protection.
2. Add durable queue + data store for auditability and retries.
3. Add per-route monitoring/alerting for email delivery errors.
