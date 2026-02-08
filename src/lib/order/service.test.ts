import { describe, expect, it } from 'vitest';
import { buildOrderEmailPayload, prepareOrderForDelivery } from './service';

const validOrderInput = {
  name: 'Chris Baker',
  email: 'chris@example.com',
  phone: '',
  eventDate: '2026-02-12',
  occasion: 'Wedding',
  cakeType: 'Fondant cake',
  cakeSize: 'Tiered',
  servings: 80,
  flavor: 'Vanilla almond',
  designNotes: 'Ivory palette, sugar flowers, and initials on top tier.',
  budget: '$350+',
  fulfillmentType: 'delivery' as const,
  allergies: 'No peanuts',
  referenceUrls: ['https://example.com/photo-one'],
  consent: true,
  website: ''
};

describe('order service', () => {
  it('builds internal and customer payloads', () => {
    const prepared = prepareOrderForDelivery(validOrderInput, new Date('2026-02-07T10:00:00Z'));
    expect(prepared.success).toBe(true);

    if (prepared.success) {
      const payload = buildOrderEmailPayload(prepared.data.order, 'DB-20260207-AB12');
      expect(payload.internalSubject).toContain('DB-20260207-AB12');
      expect(payload.customerSubject).toContain('DB-20260207-AB12');
      expect(payload.internalText).toContain('Wedding');
      expect(payload.customerText).toContain('We received your custom cake request');
    }
  });

  it('sanitizes unsafe note characters in email text', () => {
    const prepared = prepareOrderForDelivery(
      {
        ...validOrderInput,
        designNotes: 'Please add <sparkles> and <topper> details for display.'
      },
      new Date('2026-02-07T10:00:00Z')
    );

    expect(prepared.success).toBe(true);
    if (prepared.success) {
      expect(prepared.data.emailPayload.internalText).not.toContain('<');
      expect(prepared.data.emailPayload.internalText).not.toContain('>');
    }
  });

  it('returns validation issues for invalid order data', () => {
    const prepared = prepareOrderForDelivery(
      {
        ...validOrderInput,
        name: ''
      },
      new Date('2026-02-07T10:00:00Z')
    );

    expect(prepared.success).toBe(false);
    if (!prepared.success) {
      expect(prepared.fieldErrors.name).toBeTruthy();
    }
  });
});