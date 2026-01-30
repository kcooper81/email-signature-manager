import { RATE_LIMITS } from '@esm/shared';

interface RateLimiterOptions {
  provider: 'google' | 'microsoft';
}

interface QueuedRequest<T> {
  execute: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

/**
 * Rate limiter for email provider APIs
 * Implements token bucket algorithm with exponential backoff
 */
export class RateLimiter {
  private provider: 'google' | 'microsoft';
  private queue: QueuedRequest<unknown>[] = [];
  private processing = false;
  private requestCount = 0;
  private windowStart = Date.now();
  private retryAfter = 0;

  constructor(options: RateLimiterOptions) {
    this.provider = options.provider;
  }

  private get limits() {
    return RATE_LIMITS[this.provider];
  }

  /**
   * Execute a request with rate limiting
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        execute: fn as () => Promise<unknown>,
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.processQueue();
    });
  }

  /**
   * Execute multiple requests in batches
   */
  async executeBatch<T>(
    requests: Array<() => Promise<T>>
  ): Promise<Array<{ success: boolean; result?: T; error?: Error }>> {
    const batchSize = this.limits.batchSize;
    const results: Array<{ success: boolean; result?: T; error?: Error }> = [];

    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map((req) => this.execute(req))
      );

      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          results.push({ success: true, result: result.value });
        } else {
          results.push({ success: false, error: result.reason });
        }
      }
    }

    return results;
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      // Check if we need to wait for rate limit reset
      await this.waitIfNeeded();

      const request = this.queue.shift();
      if (!request) continue;

      try {
        const result = await this.executeWithRetry(request.execute);
        request.resolve(result);
      } catch (error) {
        request.reject(error as Error);
      }

      this.requestCount++;
    }

    this.processing = false;
  }

  private async waitIfNeeded(): Promise<void> {
    const now = Date.now();

    // Reset window if needed
    if (now - this.windowStart >= 1000) {
      this.windowStart = now;
      this.requestCount = 0;
    }

    // Wait if we've hit the rate limit
    if (this.requestCount >= this.limits.requestsPerSecond) {
      const waitTime = 1000 - (now - this.windowStart);
      if (waitTime > 0) {
        await this.sleep(waitTime);
        this.windowStart = Date.now();
        this.requestCount = 0;
      }
    }

    // Wait if we got a retry-after response
    if (this.retryAfter > 0) {
      const waitTime = this.retryAfter - now;
      if (waitTime > 0) {
        await this.sleep(waitTime);
      }
      this.retryAfter = 0;
    }
  }

  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    attempt = 1,
    maxAttempts = 3
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      const err = error as Error & { status?: number; headers?: Record<string, string> };

      // Check for rate limit error (429)
      if (err.status === 429) {
        const retryAfterHeader = err.headers?.['retry-after'];
        const retryAfterMs = retryAfterHeader
          ? parseInt(retryAfterHeader, 10) * 1000
          : this.calculateBackoff(attempt);

        this.retryAfter = Date.now() + retryAfterMs;

        if (attempt < maxAttempts) {
          await this.sleep(retryAfterMs);
          return this.executeWithRetry(fn, attempt + 1, maxAttempts);
        }
      }

      // Retry on 5xx errors
      if (err.status && err.status >= 500 && attempt < maxAttempts) {
        await this.sleep(this.calculateBackoff(attempt));
        return this.executeWithRetry(fn, attempt + 1, maxAttempts);
      }

      throw error;
    }
  }

  private calculateBackoff(attempt: number): number {
    // Exponential backoff: 1s, 2s, 4s, 8s...
    return Math.min(1000 * Math.pow(2, attempt - 1), 30000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instances for each provider
let googleRateLimiter: RateLimiter | null = null;
let microsoftRateLimiter: RateLimiter | null = null;

export function getGoogleRateLimiter(): RateLimiter {
  if (!googleRateLimiter) {
    googleRateLimiter = new RateLimiter({ provider: 'google' });
  }
  return googleRateLimiter;
}

export function getMicrosoftRateLimiter(): RateLimiter {
  if (!microsoftRateLimiter) {
    microsoftRateLimiter = new RateLimiter({ provider: 'microsoft' });
  }
  return microsoftRateLimiter;
}
