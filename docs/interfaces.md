# Interfaces

## Public web routes

- `/` - main marketing page with Hero, Gallery, About, and Contact sections.
- `/order` - WhatsApp-first order guidance page with checklist and CTA.

## API routes

- `/api/orders`
  - Methods: `GET`, `POST`
  - Status: deprecated endpoint
  - Response: `410 Gone` with JSON body:

```json
{
  "ok": false,
  "code": "ORDER_FLOW_REMOVED",
  "message": "Order submissions are no longer accepted on this endpoint. Please use WhatsApp instead."
}
```

## Shared interface constants

The canonical contact and CTA values are exported from:

- `src/lib/config/contact.ts`

Exports used across Astro components:

- `BUSINESS_PHONE_DISPLAY`
- `BUSINESS_PHONE_TEL`
- `BUSINESS_EMAIL`
- `WHATSAPP_NUMBER`
- `WHATSAPP_PREFILL`
- `WHATSAPP_URL`
