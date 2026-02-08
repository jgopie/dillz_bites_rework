import {
  type OrderFormInput,
  type ValidatedOrderRequest,
  validateOrderFormInput
} from './schema';

function sanitizeEmailText(value: string | undefined): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/[<>]/g, '').trim();
}

function optionalField(value: string | undefined): string {
  const safe = sanitizeEmailText(value);
  return safe.length > 0 ? safe : 'Not provided';
}

export function generateRequestId(now = new Date()): string {
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `DB-${datePart}-${randomPart}`;
}

export interface OrderEmailPayload {
  requestId: string;
  customerEmail: string;
  internalSubject: string;
  customerSubject: string;
  internalText: string;
  customerText: string;
  replyToEmail: string;
}

export interface PreparedOrder {
  requestId: string;
  order: ValidatedOrderRequest;
  emailPayload: OrderEmailPayload;
}

export type PreparedOrderResult =
  | { success: true; data: PreparedOrder }
  | { success: false; message: string; fieldErrors: Record<string, string> };

export function buildOrderEmailPayload(order: ValidatedOrderRequest, requestId = generateRequestId()): OrderEmailPayload {
  const internalSubject = `New cake order request ${requestId}`;
  const customerSubject = `We received your Dillz Bites order request (${requestId})`;

  const internalText = [
    `Request ID: ${requestId}`,
    `Name: ${sanitizeEmailText(order.name)}`,
    `Email: ${sanitizeEmailText(order.email)}`,
    `Phone: ${optionalField(order.phone)}`,
    `Event Date: ${order.eventDate}`,
    `Lead Time: ${order.leadTimeDays} day(s)`,
    `Occasion: ${sanitizeEmailText(order.occasion)}`,
    `Cake Type: ${sanitizeEmailText(order.cakeType)}`,
    `Cake Size: ${sanitizeEmailText(order.cakeSize)}`,
    `Servings: ${order.servings}`,
    `Flavor: ${optionalField(order.flavor)}`,
    `Budget: ${sanitizeEmailText(order.budget)}`,
    `Fulfillment: ${order.fulfillmentType}`,
    `Allergies: ${optionalField(order.allergies)}`,
    `Reference URLs: ${order.referenceUrls.length > 0 ? order.referenceUrls.join(', ') : 'Not provided'}`,
    '',
    'Design Notes:',
    sanitizeEmailText(order.designNotes)
  ].join('\n');

  const customerText = [
    `Hi ${sanitizeEmailText(order.name)},`,
    '',
    'Thanks for contacting Dillz Bites. We received your custom cake request and will review it shortly.',
    '',
    `Request ID: ${requestId}`,
    `Event Date: ${order.eventDate}`,
    `Cake Type: ${sanitizeEmailText(order.cakeType)}`,
    `Cake Size: ${sanitizeEmailText(order.cakeSize)}`,
    `Estimated Servings: ${order.servings}`,
    '',
    'We typically respond within 1 business day to confirm details and next steps.',
    'If you need urgent updates, reply to this email or call us at (868) 767-4628.',
    '',
    'Warmly,',
    'Dillz Bites'
  ].join('\n');

  return {
    requestId,
    customerEmail: order.email,
    internalSubject,
    customerSubject,
    internalText,
    customerText,
    replyToEmail: order.email
  };
}

export function prepareOrderForDelivery(payload: OrderFormInput, now = new Date()): PreparedOrderResult {
  const validation = validateOrderFormInput(payload, now);
  if (!validation.success) {
    return validation;
  }

  const requestId = generateRequestId(now);
  const emailPayload = buildOrderEmailPayload(validation.data, requestId);

  return {
    success: true,
    data: {
      requestId,
      order: validation.data,
      emailPayload
    }
  };
}
