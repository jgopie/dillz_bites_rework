# Configuration

## Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Yes (prod) | none | Auth token for Resend email API |
| `ORDER_NOTIFICATION_EMAIL` | No | `orders@dillzbites.com` | Internal inbox for new order notifications |
| `ORDER_FROM_EMAIL` | No | `Dillz Bites <orders@dillzbites.com>` | Sender identity for both outgoing emails |
| `BUSINESS_REPLY_TO_EMAIL` | No | `orders@dillzbites.com` | Reply-to address used in customer confirmations |
| `ENABLE_ORDER_FORM` | No | `true` non-prod, `false` prod | Feature flag for `/order` page and `/api/orders` endpoint |
| `RATE_LIMIT_MAX` | No | `5` | Max order submissions per IP in window |
| `RATE_LIMIT_WINDOW_MS` | No | `900000` | Rate-limit window (15 minutes by default) |

## Notes

- In production, set `ENABLE_ORDER_FORM=true` after deployment verification.
- `ORDER_FROM_EMAIL` should use a verified sender/domain in Resend.
- Keep secrets in hosting provider environment settings, never in git.