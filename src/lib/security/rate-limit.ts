import { getRateLimitConfig } from '../config/env';

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const limiterState = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  nowMs = Date.now(),
  config = getRateLimitConfig()
): RateLimitResult {
  const safeKey = key.trim().length > 0 ? key : 'anonymous';
  const current = limiterState.get(safeKey);

  if (!current || nowMs - current.windowStart >= config.windowMs) {
    limiterState.set(safeKey, {
      count: 1,
      windowStart: nowMs
    });

    return {
      allowed: true,
      remaining: Math.max(config.maxRequests - 1, 0),
      retryAfterSeconds: 0
    };
  }

  if (current.count >= config.maxRequests) {
    const retryAfterMs = Math.max(config.windowMs - (nowMs - current.windowStart), 0);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000)
    };
  }

  current.count += 1;
  limiterState.set(safeKey, current);

  return {
    allowed: true,
    remaining: Math.max(config.maxRequests - current.count, 0),
    retryAfterSeconds: 0
  };
}

export function resetRateLimiter(): void {
  limiterState.clear();
}