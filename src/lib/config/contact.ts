export const BUSINESS_NAME = 'Dillz Bites';
export const PHONE_DISPLAY = '(868) 767-4628';
export const PHONE_E164 = '+18687674628';
export const WHATSAPP_NUMBER_DIGITS = '18687674628';
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Dillz Bites! I'd like to order a custom cake and check availability.";
export const EMAIL = 'orders@dillzbites.com';

export const HOURS = [
  { days: 'Tuesday to Saturday', time: '9:00 AM to 6:00 PM' },
  { days: 'Sunday', time: '10:00 AM to 4:00 PM' },
  { days: 'Monday', time: 'Closed' }
] as const;

/** Fields the customer fills in on WhatsApp; also rendered as the order ticket on /order. */
export const ORDER_TEMPLATE_FIELDS = [
  'Event date',
  'Pickup or delivery (and time)',
  'Number of servings',
  'Occasion and theme',
  'Colours and style',
  'Flavours or dietary notes',
  'Budget range'
] as const;

export function buildOrderTemplateMessage(): string {
  const lines = ORDER_TEMPLATE_FIELDS.map((field) => `${field}: `);
  return [
    "Hi Dillz Bites! I'd like to order a custom cake.",
    '',
    ...lines,
    '',
    "I'll send inspiration photos next."
  ].join('\n');
}

export function buildWhatsAppHref(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${encodeURIComponent(message)}`;
}
