import { z } from 'zod';
import type { ZodError } from 'zod';

const MIN_LEAD_DAYS = 3;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const trimmedOptional = z.string().trim().max(240).optional().or(z.literal(''));

const orderFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.string().trim().email('Please enter a valid email address.').max(120),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(30).optional().or(z.literal('')),
  eventDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a valid event date.'),
  occasion: z.string().trim().min(2, 'Please enter an occasion.').max(80),
  cakeType: z.string().trim().min(2, 'Please choose a cake type.').max(80),
  cakeSize: z.string().trim().min(2, 'Please choose a cake size.').max(80),
  servings: z.coerce
    .number({ invalid_type_error: 'Please provide the estimated servings.' })
    .int('Servings must be a whole number.')
    .min(1, 'Servings must be at least 1.')
    .max(500, 'Servings must be 500 or fewer.'),
  flavor: z.string().trim().max(120).optional().or(z.literal('')),
  designNotes: z.string().trim().min(10, 'Please provide a few design details.').max(2000),
  budget: z.string().trim().min(2, 'Please choose a budget range.').max(80),
  fulfillmentType: z.enum(['pickup', 'delivery']),
  allergies: trimmedOptional,
  referenceUrls: z.array(z.string().trim().url('Each reference link must be a valid URL.').max(500)).max(6).optional().default([]),
  consent: z.boolean().refine((value) => value, {
    message: 'You must agree before submitting your order request.'
  }),
  website: z.string().trim().max(0).optional().default('')
});

export type OrderFormInput = z.input<typeof orderFormSchema>;

export interface ValidatedOrderRequest extends z.output<typeof orderFormSchema> {
  leadTimeDays: number;
}

export interface OrderApiSuccess {
  ok: true;
  requestId: string;
  message: string;
}

export interface OrderApiError {
  ok: false;
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
}

type ValidationResult =
  | { success: true; data: ValidatedOrderRequest }
  | { success: false; message: string; fieldErrors: Record<string, string> };

function getFieldErrors(error: ZodError): Record<string, string> {
  const flattened = error.flatten();
  const fieldErrors: Record<string, string> = {};

  for (const [field, errors] of Object.entries(flattened.fieldErrors)) {
    if (errors && errors.length > 0) {
      fieldErrors[field] = errors[0];
    }
  }

  return fieldErrors;
}

function parseEventDate(dateValue: string): Date | null {
  const [yearRaw, monthRaw, dayRaw] = dateValue.split('-');
  const year = Number.parseInt(yearRaw, 10);
  const month = Number.parseInt(monthRaw, 10);
  const day = Number.parseInt(dayRaw, 10);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export function validateOrderFormInput(
  payload: unknown,
  now = new Date(),
  minimumLeadDays = MIN_LEAD_DAYS
): ValidationResult {
  const parsed = orderFormSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please review your order details and try again.',
      fieldErrors: getFieldErrors(parsed.error)
    };
  }

  const eventDate = parseEventDate(parsed.data.eventDate);
  if (!eventDate) {
    return {
      success: false,
      message: 'Please review your order details and try again.',
      fieldErrors: {
        eventDate: 'Please choose a valid event date.'
      }
    };
  }

  const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const leadTimeDays = Math.floor((eventDate.getTime() - todayUtc.getTime()) / MS_PER_DAY);

  if (leadTimeDays < minimumLeadDays) {
    return {
      success: false,
      message: 'We need additional lead time for custom cakes.',
      fieldErrors: {
        eventDate: `Please choose a date at least ${minimumLeadDays} days from today.`
      }
    };
  }

  return {
    success: true,
    data: {
      ...parsed.data,
      leadTimeDays,
      phone: parsed.data.phone ?? '',
      flavor: parsed.data.flavor ?? '',
      allergies: parsed.data.allergies ?? '',
      website: parsed.data.website ?? ''
    }
  };
}

export const orderValidationRules = {
  minimumLeadDays: MIN_LEAD_DAYS
};
