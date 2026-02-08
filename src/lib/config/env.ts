const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on']);

function parseBoolean(value: string | undefined): boolean | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  return TRUE_VALUES.has(value.trim().toLowerCase());
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (typeof value !== 'string') {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function isOrderFormEnabled(): boolean {
  const explicit = parseBoolean(import.meta.env.ENABLE_ORDER_FORM);
  if (typeof explicit === 'boolean') {
    return explicit;
  }

  return !import.meta.env.PROD;
}

export function getRateLimitConfig() {
  return {
    maxRequests: parseNumber(import.meta.env.RATE_LIMIT_MAX, 5),
    windowMs: parseNumber(import.meta.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000)
  };
}

export function getOrderEmailConfig() {
  // Email delivery configuration is server-only and should come from runtime env.
  // Using process.env keeps secrets out of Vite's import.meta.env exposure model.
  return {
    smtpUrl: process.env.SMTP_URL,
    fromEmail: process.env.ORDER_FROM_EMAIL ?? 'Dillz Bites <orders@dillzbites.com>',
    notificationEmail: process.env.ORDER_NOTIFICATION_EMAIL ?? 'orders@dillzbites.com',
    replyToEmail:
      process.env.BUSINESS_REPLY_TO_EMAIL ?? process.env.ORDER_NOTIFICATION_EMAIL ?? 'orders@dillzbites.com'
  };
}
