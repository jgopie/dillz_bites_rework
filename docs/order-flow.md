# Order Flow

## Channel

WhatsApp only. There is no form or backend; links are built in `src/lib/config/contact.ts`.

## Messages

- Short greeting (`WHATSAPP_DEFAULT_MESSAGE`): hero, contact section, floating button, and "Or just say hello" on `/order`.
- Order template (`buildOrderTemplateMessage()`): the How it works CTA and the main `/order` CTA. It lists every entry in `ORDER_TEMPLATE_FIELDS` with a blank to fill in, then asks for inspiration photos.

## Customer path

1. Visitor taps a CTA; WhatsApp opens with the message prefilled.
2. They fill in the template and send photos.
3. The bakery replies with design ideas, pricing and availability, and confirms in chat.

## Changing the template

Edit `ORDER_TEMPLATE_FIELDS` in `src/lib/config/contact.ts`. The `/order` ticket and the WhatsApp message update together, and `src/tests/lib/contact.test.ts` checks that every field reaches the encoded link.
