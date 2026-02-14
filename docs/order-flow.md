# Order Flow

## Primary conversion channel

- Channel: WhatsApp
- Link source: `src/lib/config/contact.ts` (`WHATSAPP_URL`)
- Message source: `WHATSAPP_PREFILL` (URL-encoded into `WHATSAPP_URL`)

## Customer path

1. User clicks a WhatsApp CTA (hero, contact section, nav, footer, floating button, or `/order` page).
2. WhatsApp opens with prefilled message template.
3. Bakery continues intake and confirmation directly in chat.

## `/order` page behavior

- Path: `/order`
- Purpose: WhatsApp-first order instructions and checklist.
- No form submission is available on this page.

## Legacy API behavior

- Path: `/api/orders`
- Methods: `GET`, `POST`
- Status: `410 Gone`

Response body:

```json
{
  "ok": false,
  "code": "ORDER_FLOW_REMOVED",
  "message": "Order submissions are no longer accepted on this endpoint. Please use WhatsApp instead."
}
```
