/**
 * Simple in-memory rate limiting
 * Tracks requests per IP address
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimit = new Map<string, RateLimitRecord>();

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - IP address to check
 * @param limit - Maximum number of requests allowed (default: 5)
 * @param windowMs - Time window in milliseconds (default: 1 hour)
 * @returns Object with success status and remaining requests
 */
export function checkRateLimit(
  ip: string,
  limit: number = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  windowMs: number = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000')
): { success: boolean; remaining: number; resetTime?: number } {
  const now = Date.now();
  const record = rateLimit.get(ip);

  // No record or expired record - create new one
  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    rateLimit.set(ip, { count: 1, resetTime });
    return { success: true, remaining: limit - 1, resetTime };
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  return { success: true, remaining: limit - record.count, resetTime: record.resetTime };
}

/**
 * Clean up expired rate limit records (optional, for memory management)
 */
export function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimit.entries()) {
    if (now > record.resetTime) {
      rateLimit.delete(ip);
    }
  }
}

