import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { sendPaymentReceipt } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = headers()
  const signature = headersList.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Save payment to database
        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .insert({
            user_id: paymentIntent.metadata.userId,
            course_id: paymentIntent.metadata.courseId,
            schedule_id: paymentIntent.metadata.scheduleId,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'completed',
            stripe_payment_intent_id: paymentIntent.id,
            payment_method: paymentIntent.payment_method_types[0],
            paid_at: new Date().toISOString()
          })
          .select()
          .single()

        if (paymentError) {
          console.error('Error saving payment:', paymentError)
        }

        // Send payment receipt email
        if (payment) {
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', paymentIntent.metadata.userId)
            .single()

          // Get course details
          const { data: course } = await supabase
            .from('courses')
            .select('title')
            .eq('id', paymentIntent.metadata.courseId)
            .single()

          if (profile && course) {
            const paymentDate = new Date().toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            // Determine payment method display name
            const paymentMethodDisplay =
              paymentIntent.payment_method_types[0] === 'ideal'
                ? 'iDEAL'
                : paymentIntent.payment_method_types[0] === 'card'
                ? 'Creditcard'
                : paymentIntent.payment_method_types[0]

            await sendPaymentReceipt({
              to: profile.email,
              fullName: profile.full_name || 'Student',
              courseTitle: course.title,
              amount: paymentIntent.amount / 100,
              paymentDate: paymentDate,
              paymentMethod: paymentMethodDisplay,
              invoiceNumber: `INV-${payment.id}`,
            })
          }
        }

        console.log(`Payment succeeded: ${paymentIntent.id}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Log failed payment
        const { error: paymentError } = await supabase.from('payments').insert({
          user_id: paymentIntent.metadata.userId,
          course_id: paymentIntent.metadata.courseId,
          schedule_id: paymentIntent.metadata.scheduleId,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'failed',
          stripe_payment_intent_id: paymentIntent.id,
          payment_method: paymentIntent.payment_method_types[0],
        })

        if (paymentError) {
          console.error('Error logging failed payment:', paymentError)
        }

        console.log(`Payment failed: ${paymentIntent.id}`)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Update payment status
        const { error: updateError } = await supabase
          .from('payments')
          .update({ status: 'refunded' })
          .eq('stripe_payment_intent_id', charge.payment_intent)

        if (updateError) {
          console.error('Error updating payment status:', updateError)
        }

        // Cancel enrollment
        const { data: payment } = await supabase
          .from('payments')
          .select('course_id, user_id')
          .eq('stripe_payment_intent_id', charge.payment_intent)
          .single()

        if (payment) {
          const { error: enrollmentError } = await supabase
            .from('enrollments')
            .update({ status: 'cancelled' })
            .eq('course_id', payment.course_id)
            .eq('user_id', payment.user_id)

          if (enrollmentError) {
            console.error('Error cancelling enrollment:', enrollmentError)
          }
        }

        console.log(`Payment refunded: ${charge.id}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
