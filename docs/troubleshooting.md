# Troubleshooting

## API returns `EMAIL_DELIVERY_FAILED`

Checks:

1. Confirm `RESEND_API_KEY` is set in runtime env.
2. Confirm `ORDER_FROM_EMAIL` uses a verified sender/domain in Resend.
3. Check server logs for `[orders] Internal order email failed`.

## API returns `ORDER_FORM_DISABLED`

Checks:

1. Set `ENABLE_ORDER_FORM=true` in production env.
2. Redeploy or restart service after updating environment variables.

## API returns `RATE_LIMITED`

Checks:

1. Wait for current rate-limit window to reset.
2. Adjust `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS` if limits are too strict.

## Form validation errors for event date

Cause:

- Event date is less than 3 days from current date.

Fix:

- Choose a date at least 3 calendar days ahead.

## Customer did not receive confirmation email

If internal notification was delivered, customer send failures do not fail API response.

Checks:

1. Confirm customer email address was entered correctly.
2. Check logs for warning: `Customer confirmation failed`.
3. Ask customer to check spam/junk folder.