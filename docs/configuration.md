# Configuration

## Environment variables

No environment variables are currently required for the WhatsApp-first contact flow.

## Contact source of truth

Business contact and WhatsApp CTA values are centralized in:

- `src/lib/config/contact.ts`

Exports:

- `BUSINESS_PHONE_DISPLAY`
- `BUSINESS_PHONE_TEL`
- `BUSINESS_EMAIL`
- `WHATSAPP_NUMBER`
- `WHATSAPP_PREFILL`
- `WHATSAPP_URL`

## Notes

- Update contact details only in `src/lib/config/contact.ts` to keep all CTAs synchronized.
- Keep secrets out of git if new runtime config is introduced later.
