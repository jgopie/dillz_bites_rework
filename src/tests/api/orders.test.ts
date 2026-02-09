import { describe, expect, it, vi } from 'vitest';
import { handleOrderPost } from '../../pages/api/orders';

const validPayload = {
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  phone: '555-123-9999',
  eventDate: '2026-02-12',
  occasion: 'Birthday',
  cakeType: 'Buttercream cake',
  cakeSize: '8 inch',
  servings: 30,
  flavor: 'Chocolate',
  designNotes: 'Neutral tones and floral accents for a surprise dinner.',
  budget: '$120-$220',
  fulfillmentType: 'pickup',
  allergies: '',
  referenceUrls: ['https://example.com/inspiration'],
  consent: true,
  website: ''
};

function jsonRequest(body: unknown) {
  return new Request('http://localhost/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

describe('POST /api/orders', () => {
  it('accepts a valid order and returns request id', async () => {
    const response = await handleOrderPost(jsonRequest(validPayload), '127.0.0.1', {
      enabled: () => true,
      checkLimit: () => ({ allowed: true, remaining: 4, retryAfterSeconds: 0 }),
      sendEmails: vi.fn().mockResolvedValue({}),
      now: () => new Date('2026-02-07T10:00:00Z')
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.requestId).toMatch(/^DB-20260207-/);
  });

  it('returns validation error details for invalid payload', async () => {
    const response = await handleOrderPost(jsonRequest({ ...validPayload, name: '' }), '127.0.0.1', {
      enabled: () => true,
      checkLimit: () => ({ allowed: true, remaining: 4, retryAfterSeconds: 0 }),
      sendEmails: vi.fn().mockResolvedValue({}),
      now: () => new Date('2026-02-07T10:00:00Z')
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.code).toBe('VALIDATION_ERROR');
    expect(data.fieldErrors.name).toBeTruthy();
  });

  it('returns 429 when over the rate limit', async () => {
    const response = await handleOrderPost(jsonRequest(validPayload), '127.0.0.1', {
      enabled: () => true,
      checkLimit: () => ({ allowed: false, remaining: 0, retryAfterSeconds: 120 }),
      sendEmails: vi.fn().mockResolvedValue({}),
      now: () => new Date('2026-02-07T10:00:00Z')
    });

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('120');
  });

  it('skips processing when honeypot field is filled', async () => {
    const response = await handleOrderPost(jsonRequest({ ...validPayload, website: 'bot-value' }), '127.0.0.1', {
      enabled: () => true,
      checkLimit: () => ({ allowed: true, remaining: 4, retryAfterSeconds: 0 }),
      sendEmails: vi.fn().mockResolvedValue({}),
      now: () => new Date('2026-02-07T10:00:00Z')
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.requestId).toBe('IGNORED');
  });

  it('returns 502 when internal email delivery fails', async () => {
    const response = await handleOrderPost(jsonRequest(validPayload), '127.0.0.1', {
      enabled: () => true,
      checkLimit: () => ({ allowed: true, remaining: 4, retryAfterSeconds: 0 }),
      sendEmails: vi.fn().mockRejectedValue(new Error('smtp down')),
      now: () => new Date('2026-02-07T10:00:00Z')
    });

    expect(response.status).toBe(502);
    const data = await response.json();
    expect(data.code).toBe('EMAIL_DELIVERY_FAILED');
  });
});
