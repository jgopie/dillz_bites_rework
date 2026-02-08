/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ORDER_NOTIFICATION_EMAIL?: string;
  readonly ORDER_FROM_EMAIL?: string;
  readonly BUSINESS_REPLY_TO_EMAIL?: string;
  readonly RATE_LIMIT_MAX?: string;
  readonly RATE_LIMIT_WINDOW_MS?: string;
  readonly ENABLE_ORDER_FORM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
