import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as nodemailer from 'nodemailer';
import { InternalEmailSendError, sendOrderEmails } from '../../../lib/email/smtp';

vi.mock('nodemailer', () => {
  return {
    createTransport: vi.fn()
  };
});

function payload(overrides: Partial<Parameters<typeof sendOrderEmails>[0]> = {}): Parameters<typeof sendOrderEmails>[0] {
  return {
    requestId: 'DB-20260208-TEST',
    customerEmail: 'customer@example.com',
    internalSubject: 'Internal subject',
    customerSubject: 'Customer subject',
    internalText: 'Internal body',
    customerText: 'Customer body',
    replyToEmail: 'customer@example.com',
    ...overrides
  };
}

function setBaseEnv() {
  process.env.SMTP_URL = 'smtp://user:pass@smtp.example.com:587';
  process.env.ORDER_FROM_EMAIL = 'Dillz Bites <orders@dillzbites.com>';
  process.env.ORDER_NOTIFICATION_EMAIL = 'orders@dillzbites.com';
  process.env.BUSINESS_REPLY_TO_EMAIL = 'orders@dillzbites.com';
}

describe('sendOrderEmails (SMTP)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setBaseEnv();
  });

  it('throws when SMTP_URL is missing', async () => {
    delete process.env.SMTP_URL;

    const promise = sendOrderEmails(payload());
    await expect(promise).rejects.toBeInstanceOf(InternalEmailSendError);
    await expect(promise).rejects.toThrow('SMTP_URL is not configured.');
  });

  it('throws when internal email send fails', async () => {
    const sendMail = vi.fn().mockRejectedValueOnce(new Error('smtp down'));
    (nodemailer.createTransport as any).mockReturnValue({ sendMail });

    const promise = sendOrderEmails(payload());
    await expect(promise).rejects.toBeInstanceOf(InternalEmailSendError);
    await expect(promise).rejects.toThrow('Failed to send internal order notification email.');
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('returns success when customer confirmation fails but internal email succeeds', async () => {
    const sendMail = vi
      .fn()
      .mockResolvedValueOnce({ messageId: '<internal@id>' })
      .mockRejectedValueOnce(new Error('invalid recipient'));
    (nodemailer.createTransport as any).mockReturnValue({ sendMail });

    const result = await sendOrderEmails(payload());
    expect(result.internalEmailId).toBe('<internal@id>');
    expect(result.customerEmailId).toBeUndefined();
    expect(result.customerSendError).toContain('invalid recipient');
    expect(sendMail).toHaveBeenCalledTimes(2);
  });

  it('returns email ids when both internal and customer emails succeed', async () => {
    const sendMail = vi.fn().mockResolvedValueOnce({ messageId: '<internal@id>' }).mockResolvedValueOnce({
      messageId: '<customer@id>'
    });
    (nodemailer.createTransport as any).mockReturnValue({ sendMail });

    const result = await sendOrderEmails(payload());
    expect(result).toEqual({
      internalEmailId: '<internal@id>',
      customerEmailId: '<customer@id>'
    });
    expect(sendMail).toHaveBeenCalledTimes(2);
  });
});
