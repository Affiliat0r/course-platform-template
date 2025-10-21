/**
 * Environment Variable Validation
 *
 * Validates that all required environment variables are present at startup.
 * Throws an error if any required variables are missing.
 */

export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_APP_URL',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(key => `  - ${key}`).join('\n')}\n\n` +
      `Please check your .env.local file and ensure all required variables are set.\n` +
      `See .env.local.example for the template.`
    )
  }

  // Validate URL formats
  try {
    new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!)
    new URL(process.env.NEXT_PUBLIC_APP_URL!)
  } catch (error) {
    throw new Error(
      `Invalid URL format in environment variables.\n` +
      `Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_APP_URL are valid URLs.`
    )
  }

  // Validate key formats (basic check)
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (anonKey.length < 100 || serviceRoleKey.length < 100) {
    throw new Error(
      `Supabase API keys appear to be invalid (too short).\n` +
      `Please check your .env.local file and ensure the keys are correct.`
    )
  }

  // Warn if using placeholder values
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('your-project') ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes('your-anon-key')
  ) {
    // During build time, skip validation if using placeholders
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.warn(
        '\n⚠️  WARNING: Building with placeholder environment variables.\n' +
        'Make sure to set real credentials in production.\n'
      )
      return
    }

    console.warn(
      '\n⚠️  WARNING: You appear to be using placeholder environment variables.\n' +
      'Please update your .env.local file with real Supabase credentials.\n'
    )
  }
}

/**
 * Validates Stripe environment variables if payment features are enabled
 */
export function validateStripeEnv() {
  const stripeVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ]

  const missing = stripeVars.filter(key => !process.env[key])

  if (missing.length > 0 && missing.length < stripeVars.length) {
    console.warn(
      '\n⚠️  WARNING: Some Stripe environment variables are missing:\n' +
      missing.map(key => `  - ${key}`).join('\n') +
      '\n\nPayment functionality may not work correctly.\n'
    )
  }

  return missing.length === 0
}

/**
 * Validates Upstash Redis environment variables for rate limiting
 */
export function validateUpstashEnv() {
  const upstashVars = [
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
  ]

  const missing = upstashVars.filter(key => !process.env[key])

  if (missing.length > 0 && missing.length < upstashVars.length) {
    console.warn(
      '\n⚠️  WARNING: Some Upstash Redis environment variables are missing:\n' +
      missing.map(key => `  - ${key}`).join('\n') +
      '\n\nRate limiting functionality may not work correctly.\n'
    )
  }

  return missing.length === 0
}
