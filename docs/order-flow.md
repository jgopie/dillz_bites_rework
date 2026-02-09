# Order Flow

## Endpoint

- Method: `POST`
- Path: `/api/orders`
- Content-Type: `application/json`

## Request payload

```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "eventDate": "YYYY-MM-DD",
  "occasion": "string",
  "cakeType": "string",
  "cakeSize": "string",
  "servings": 24,
  "flavor": "string (optional)",
  "designNotes": "string",
  "budget": "string",
  "fulfillmentType": "pickup | delivery",
  "allergies": "string (optional)",
  "referenceUrls": ["https://..."],
  "consent": true,
  "website": ""
}
```

## Validation rules

- `eventDate` must be at least 3 days after submission date.
- Required fields: `name`, `email`, `eventDate`, `occasion`, `cakeType`, `cakeSize`, `servings`, `designNotes`, `budget`, `fulfillmentType`, `consent`.
- `referenceUrls` must be valid URLs.
- Honeypot field `website` must be empty.

## Success response

```json
{
  "ok": true,
  "requestId": "DB-20260207-AB12",
  "message": "Thanks for your order request. We will contact you soon."
}
```

## Error response

```json
{
  "ok": false,
  "code": "VALIDATION_ERROR",
  "message": "Please review your order details and try again.",
  "fieldErrors": {
    "eventDate": "Please choose a date at least 3 days from today."
  }
}
```

Other possible error codes:

- `ORDER_FORM_DISABLED` (`503`)
- `INVALID_JSON` (`400`)
- `RATE_LIMITED` (`429`)
- `EMAIL_DELIVERY_FAILED` (`502`)

## Email behavior

For valid requests:

1. Internal notification is sent to `ORDER_NOTIFICATION_EMAIL`.
2. If internal email fails: request fails with `502`.
