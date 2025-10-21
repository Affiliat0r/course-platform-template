/**
 * CSRF (Cross-Site Request Forgery) Protection
 *
 * Next.js Server Actions have built-in CSRF protection via the Origin header check.
 * This module provides additional utilities for API routes that need CSRF protection.
 */

import { headers } from 'next/headers'

/**
 * Validates CSRF protection by checking the Origin header
 * Returns true if the request is from an allowed origin
 *
 * Use this in API routes that accept POST/PUT/DELETE requests
 */
export async function validateCsrf(): Promise<boolean> {
  const headersList = await headers()
  const origin = headersList.get('origin')
  const host = headersList.get('host')

  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://techtrain.nl',
    'https://www.techtrain.nl',
  ]

  // Add current host to allowed origins if in production
  if (host && process.env.NODE_ENV === 'production') {
    allowedOrigins.push(`https://${host}`)
  }

  // If no origin header, it's likely a same-origin request
  // This is acceptable for same-site requests
  if (!origin) {
    return true
  }

  // Check if origin is in allowed list
  const isAllowed = allowedOrigins.some(allowed => {
    try {
      const allowedUrl = new URL(allowed)
      const originUrl = new URL(origin)
      return allowedUrl.origin === originUrl.origin
    } catch {
      return false
    }
  })

  return isAllowed
}

/**
 * CSRF middleware for API routes
 * Use this as a wrapper for API route handlers
 *
 * Example:
 * ```typescript
 * export async function POST(request: Request) {
 *   const csrfCheck = await withCsrfProtection(request)
 *   if (!csrfCheck.valid) {
 *     return csrfCheck.response
 *   }
 *
 *   // Your API logic here
 * }
 * ```
 */
export async function withCsrfProtection(request: Request): Promise<{
  valid: boolean
  response?: Response
}> {
  const isValid = await validateCsrf()

  if (!isValid) {
    return {
      valid: false,
      response: new Response(
        JSON.stringify({ error: 'Invalid origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }

  return { valid: true }
}

/**
 * Validates referer header (additional security check)
 * Returns true if referer is from an allowed origin
 */
export async function validateReferer(): Promise<boolean> {
  const headersList = await headers()
  const referer = headersList.get('referer')

  if (!referer) {
    // No referer header - this is acceptable
    // Some browsers/privacy tools don't send referer
    return true
  }

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://techtrain.nl',
    'https://www.techtrain.nl',
  ]

  // Check if referer starts with an allowed origin
  return allowedOrigins.some(allowed => referer.startsWith(allowed))
}

/**
 * Gets the origin from the request headers
 * Returns null if no origin is found
 */
export async function getOrigin(): Promise<string | null> {
  const headersList = await headers()
  return headersList.get('origin')
}

/**
 * Checks if the request is from a trusted source
 * Combines CSRF and referer validation
 */
export async function validateTrustedSource(): Promise<boolean> {
  const csrfValid = await validateCsrf()
  const refererValid = await validateReferer()

  return csrfValid && refererValid
}
