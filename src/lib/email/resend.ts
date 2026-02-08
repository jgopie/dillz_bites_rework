import { Resend } from 'resend';
import { getOrderEmailConfig } from '../config/env';
import type { OrderEmailPayload } from '../order/service';

export class InternalEmailSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InternalEmailSendError';
  }
}

export interface EmailSendResult {
  internalEmailId?: string;
  customerEmailId?: string;
  customerSendError?: string;
}

export async function sendOrderEmails(payload: OrderEmailPayload): Promise<EmailSendResult> {
  const config = getOrderEmailConfig();

  if (!config.apiKey) {
    throw new InternalEmailSendError('RESEND_API_KEY is not configured.');
  }

  const resend = new Resend(config.apiKey);

  const internalResponse = await resend.emails.send({
    from: config.fromEmail,
    to: config.notificationEmail,
    replyTo: payload.replyToEmail,
    subject: payload.internalSubject,
    text: payload.internalText
  });

  if (internalResponse.error) {
    throw new InternalEmailSendError('Failed to send internal order notification email.');
  }

  const customerResponse = await resend.emails.send({
    from: config.fromEmail,
    to: payload.customerEmail,
    replyTo: config.replyToEmail,
    subject: payload.customerSubject,
    text: payload.customerText
  });

  if (customerResponse.error) {
    return {
      internalEmailId: internalResponse.data?.id,
      customerSendError: customerResponse.error.message
    };
  }

  return {
    internalEmailId: internalResponse.data?.id,
    customerEmailId: customerResponse.data?.id
  };
}