import type { APIRoute } from 'astro';
import { sendOrderEmails } from '../../lib/email/resend';
import { isOrderFormEnabled } from '../../lib/config/env';
import { prepareOrderForDelivery } from '../../lib/order/service';
import type { OrderApiError, OrderApiSuccess, OrderFormInput } from '../../lib/order/schema';
import { checkRateLimit } from '../../lib/security/rate-limit';

export const prerender = false;

interface OrderRouteDeps {
  enabled: () => boolean;
  sendEmails: typeof sendOrderEmails;
  checkLimit: typeof checkRateLimit;
  now: () => Date;
}

const defaultDeps: OrderRouteDeps = {
  enabled: isOrderFormEnabled,
  sendEmails: sendOrderEmails,
  checkLimit: checkRateLimit,
  now: () => new Date()
};

function json(data: OrderApiSuccess | OrderApiError, status = 200, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
}

function getClientIp(request: Request, explicitAddress?: string): string {
  if (explicitAddress && explicitAddress.trim().length > 0) {
    return explicitAddress;
  }

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  const xRealIp = request.headers.get('x-real-ip');
  return xRealIp?.trim() || 'unknown';
}

function parseBody(body: unknown): OrderFormInput {
  if (!body || typeof body !== 'object') {
    return {} as OrderFormInput;
  }

  return body as OrderFormInput;
}

export async function handleOrderPost(
  request: Request,
  explicitClientIp?: string,
  overrides: Partial<OrderRouteDeps> = {}
): Promise<Response> {
  const deps: OrderRouteDeps = {
    ...defaultDeps,
    ...overrides
  };

  if (!deps.enabled()) {
    return json(
      {
        ok: false,
        code: 'ORDER_FORM_DISABLED',
        message: 'Order requests are currently unavailable. Please contact us directly.'
      },
      503
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      {
        ok: false,
        code: 'INVALID_JSON',
        message: 'Unable to process this request payload.'
      },
      400
    );
  }

  const parsedBody = parseBody(body);
  const honeypotValue = typeof parsedBody.website === 'string' ? parsedBody.website.trim() : '';
  if (honeypotValue.length > 0) {
    return json({
      ok: true,
      requestId: 'IGNORED',
      message: 'Thanks. Your request has been received.'
    });
  }

  const ipAddress = getClientIp(request, explicitClientIp);
  const rateLimit = deps.checkLimit(ipAddress);
  if (!rateLimit.allowed) {
    return json(
      {
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again in a few minutes.'
      },
      429,
      {
        'Retry-After': String(rateLimit.retryAfterSeconds)
      }
    );
  }

  const prepared = prepareOrderForDelivery(parsedBody, deps.now());
  if (!prepared.success) {
    return json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: prepared.message,
        fieldErrors: prepared.fieldErrors
      },
      400
    );
  }

  try {
    const emailResult = await deps.sendEmails(prepared.data.emailPayload);

    if (emailResult.customerSendError) {
      console.warn(
        `[orders] Customer confirmation failed for ${prepared.data.requestId}: ${emailResult.customerSendError}`
      );
    }

    return json({
      ok: true,
      requestId: prepared.data.requestId,
      message: 'Thanks for your order request. We will contact you soon.'
    });
  } catch (error) {
    console.error('[orders] Internal order email failed', error);

    return json(
      {
        ok: false,
        code: 'EMAIL_DELIVERY_FAILED',
        message: 'We could not send your request right now. Please try again shortly.'
      },
      502
    );
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  return handleOrderPost(request, clientAddress);
};