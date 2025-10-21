import Stripe from 'stripe'

// Initialize Stripe only if API key is available
// During build time or when key is missing, stripe will be null
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
      typescript: true,
    })
  : null as any // Type assertion to allow null during build
