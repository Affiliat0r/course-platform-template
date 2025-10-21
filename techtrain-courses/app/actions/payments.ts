'use server'

import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function createPaymentIntent({
  courseId,
  scheduleId,
  amount,
  userId
}: {
  courseId: string
  scheduleId: string
  amount: number
  userId: string
}) {
  try {
    const supabase = await createClient()

    // Get course details
    const { data: course } = await supabase
      .from('courses')
      .select('title, slug')
      .eq('id', courseId)
      .single()

    // Get user details
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single()

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        courseId,
        scheduleId,
        userId,
        courseName: course?.title || 'Onbekende Cursus',
        userEmail: profile?.email || 'Onbekend E-mailadres'
      },
      description: `Cursus: ${course?.title}`,
      receipt_email: profile?.email || undefined,
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return { error: 'Het aanmaken van de betaling is mislukt' }
  }
}

export async function confirmPayment(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      status: paymentIntent.status,
      metadata: paymentIntent.metadata
    }
  } catch (error) {
    console.error('Payment confirmation error:', error)
    return { error: 'Het bevestigen van de betaling is mislukt' }
  }
}

export async function refundPayment(paymentIntentId: string) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    })

    return { success: true, refund }
  } catch (error) {
    console.error('Refund error:', error)
    return { error: 'Het terugbetalen is mislukt' }
  }
}
