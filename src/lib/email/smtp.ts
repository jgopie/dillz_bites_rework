import * as nodemailer from 'nodemailer';
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

  if (!config.smtpUrl) {
    throw new InternalEmailSendError('SMTP_URL is not configured.');
  }

  // Strict TLS by default. If the SMTP server does not support STARTTLS, sending will fail (by design).
  const transport = nodemailer.createTransport(config.smtpUrl, {
    requireTLS: true,
    tls: {
      rejectUnauthorized: true
    }
  });

  let internalInfo: any;
  try {
    internalInfo = await transport.sendMail({
      from: config.fromEmail,
      to: config.notificationEmail,
      replyTo: payload.replyToEmail,
      subject: payload.internalSubject,
      text: payload.internalText
    });
  } catch {
    throw new InternalEmailSendError('Failed to send internal order notification email.');
  }

  const internalEmailId =
    internalInfo && typeof internalInfo.messageId === 'string' ? (internalInfo.messageId as string) : undefined;

  return {
    internalEmailId
  };
}
