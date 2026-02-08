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

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
    return (error as any).message as string;
  }

  return 'Unknown error';
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

  let customerInfo: any;
  try {
    customerInfo = await transport.sendMail({
      from: config.fromEmail,
      to: payload.customerEmail,
      replyTo: config.replyToEmail,
      subject: payload.customerSubject,
      text: payload.customerText
    });
  } catch (error) {
    return {
      internalEmailId,
      customerSendError: getErrorMessage(error)
    };
  }

  const customerEmailId =
    customerInfo && typeof customerInfo.messageId === 'string' ? (customerInfo.messageId as string) : undefined;

  return {
    internalEmailId,
    customerEmailId
  };
}
