import { afterEach, describe, expect, it } from 'vitest';
import { checkRateLimit, resetRateLimiter } from './rate-limit';

afterEach(() => {
  resetRateLimiter();
});

describe('checkRateLimit', () => {
  it('allows requests inside the configured threshold', () => {
    const config = { maxRequests: 2, windowMs: 60_000 };

    const first = checkRateLimit('1.1.1.1', 0, config);
    const second = checkRateLimit('1.1.1.1', 5_000, config);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(second.remaining).toBe(0);
  });

  it('blocks when over the threshold and reports retry-after', () => {
    const config = { maxRequests: 1, windowMs: 30_000 };

    checkRateLimit('2.2.2.2', 0, config);
    const blocked = checkRateLimit('2.2.2.2', 1_000, config);

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('resets after the window elapses', () => {
    const config = { maxRequests: 1, windowMs: 20_000 };

    checkRateLimit('3.3.3.3', 0, config);
    const blocked = checkRateLimit('3.3.3.3', 1_000, config);
    const allowedAgain = checkRateLimit('3.3.3.3', 20_001, config);

    expect(blocked.allowed).toBe(false);
    expect(allowedAgain.allowed).toBe(true);
  });
});