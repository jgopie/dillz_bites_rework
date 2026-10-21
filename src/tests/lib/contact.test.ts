import { describe, expect, it } from 'vitest';
import {
  ORDER_TEMPLATE_FIELDS,
  WHATSAPP_NUMBER_DIGITS,
  buildOrderTemplateMessage,
  buildWhatsAppHref
} from '../../lib/config/contact';

describe('contact config', () => {
  it('builds a wa.me link with an encoded message', () => {
    const href = buildWhatsAppHref('Hi & hello\nthere');
    expect(href).toBe(`https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=Hi%20%26%20hello%0Athere`);
  });

  it('includes every order field in the template message', () => {
    const message = buildOrderTemplateMessage();
    for (const field of ORDER_TEMPLATE_FIELDS) {
      expect(message).toContain(`${field}: `);
    }
    expect(decodeURIComponent(buildWhatsAppHref(message).split('?text=')[1])).toBe(message);
  });
});
