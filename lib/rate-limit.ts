// Simple in-memory rate limiter for contact form
// In production, consider using Redis or Upstash for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // Max 3 requests per hour per IP

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = store.get(identifier);

  // Clean up expired entries
  if (entry && now > entry.resetAt) {
    store.delete(identifier);
  }

  const current = store.get(identifier);

  if (!current) {
    // First request
    store.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (current.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  // Increment count
  current.count += 1;
  store.set(identifier, current);

  return { success: true, remaining: MAX_REQUESTS - current.count };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, WINDOW_MS);
