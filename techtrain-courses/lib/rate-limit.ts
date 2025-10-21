/**
 * Rate Limiting Utilities
 *
 * Implements rate limiting using Upstash Redis to prevent abuse on critical endpoints.
 * Rate limiters are configured for different use cases with appropriate thresholds.
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Redis client only if credentials are available
let redis: Redis | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

/**
 * Authentication endpoints rate limiter
 * Limit: 5 attempts per 15 minutes per IP
 *
 * Use for: login, register, password reset
 */
export const authLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
      prefix: 'ratelimit:auth',
    })
  : null

/**
 * Payment endpoints rate limiter
 * Limit: 3 attempts per 5 minutes per IP
 *
 * Use for: checkout, payment processing
 */
export const paymentLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '5 m'),
      analytics: true,
      prefix: 'ratelimit:payment',
    })
  : null

/**
 * General API endpoints rate limiter
 * Limit: 60 requests per minute per IP
 *
 * Use for: general API routes
 */
export const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, '1 m'),
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : null

/**
 * Contact form rate limiter
 * Limit: 3 submissions per hour per IP
 *
 * Use for: contact forms, support requests
 */
export const contactLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      analytics: true,
      prefix: 'ratelimit:contact',
    })
  : null

/**
 * Helper function to extract client IP from request headers
 *
 * Checks multiple headers in order of preference:
 * 1. x-forwarded-for (most common with proxies/CDNs)
 * 2. x-real-ip (some reverse proxies)
 * 3. Falls back to 'unknown' if no IP found
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  // Fallback for local development or when IP cannot be determined
  return 'unknown'
}

/**
 * Helper function to get client IP from Next.js headers()
 * For use in Server Actions and Route Handlers
 */
export function getClientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  return 'unknown'
}

/**
 * Type definition for rate limit check result
 */
export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Checks rate limit and returns standardized result
 * Returns success: true if rate limit not configured (graceful degradation)
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<RateLimitResult> {
  // If rate limiting is not configured, allow the request
  if (!limiter) {
    console.warn('Rate limiting is not configured. Request allowed without limiting.')
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
    }
  }

  const result = await limiter.limit(identifier)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}
