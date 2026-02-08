import { describe, expect, it } from 'vitest';
import { orderValidationRules, validateOrderFormInput } from './schema';

const basePayload = {
  name: 'Alex Rivera',
  email: 'alex@example.com',
  phone: '+1 868 767 4628',
  eventDate: '2026-02-12',
  occasion: 'Birthday',
  cakeType: 'Buttercream cake',
  cakeSize: '8 inch',
  servings: 24,
  flavor: 'Chocolate',
  designNotes: 'Warm neutrals, floral accents, and elegant piping details.',
  budget: '$120-$220',
  fulfillmentType: 'pickup' as const,
  allergies: '',
  referenceUrls: ['https://example.com/inspo-one'],
  consent: true,
  website: ''
};

describe('validateOrderFormInput', () => {
  it('accepts a valid payload', () => {
    const result = validateOrderFormInput(basePayload, new Date('2026-02-07T10:00:00Z'));

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.leadTimeDays).toBeGreaterThanOrEqual(orderValidationRules.minimumLeadDays);
    }
  });

  it('returns field error for invalid email', () => {
    const result = validateOrderFormInput(
      {
        ...basePayload,
        email: 'invalid-email'
      },
      new Date('2026-02-07T10:00:00Z')
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.email).toBeTruthy();
    }
  });

  it('enforces minimum lead time', () => {
    const result = validateOrderFormInput(
      {
        ...basePayload,
        eventDate: '2026-02-08'
      },
      new Date('2026-02-07T10:00:00Z')
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.eventDate).toContain(String(orderValidationRules.minimumLeadDays));
    }
  });

  it('rejects malformed reference urls', () => {
    const result = validateOrderFormInput(
      {
        ...basePayload,
        referenceUrls: ['not-a-url']
      },
      new Date('2026-02-07T10:00:00Z')
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.referenceUrls).toBeTruthy();
    }
  });
});