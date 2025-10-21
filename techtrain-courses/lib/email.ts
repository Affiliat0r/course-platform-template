import { Resend } from 'resend'
import WelcomeEmail from '@/emails/welcome'
import EnrollmentConfirmation from '@/emails/enrollment-confirmation'
import PaymentReceipt from '@/emails/payment-receipt'

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = 'TechTrain <info@techtrain.nl>'
const REPLY_TO = 'info@techtrain.nl'

export async function sendWelcomeEmail(to: string, fullName: string) {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent.')
    return { error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: 'Welkom bij TechTrain!',
      react: WelcomeEmail({ fullName }),
    })

    if (error) {
      console.error('Welcome email error:', error)
      return { error }
    }

    console.log('Welcome email sent:', data?.id)
    return { data }
  } catch (error) {
    console.error('Welcome email exception:', error)
    return { error }
  }
}

export async function sendEnrollmentConfirmation({
  to,
  fullName,
  courseTitle,
  startDate,
  location,
  price,
}: {
  to: string
  fullName: string
  courseTitle: string
  startDate: string
  location: string
  price: number
}) {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent.')
    return { error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: `Inschrijving bevestigd: ${courseTitle}`,
      react: EnrollmentConfirmation({
        fullName,
        courseTitle,
        startDate,
        location,
        price,
      }),
    })

    if (error) {
      console.error('Enrollment email error:', error)
      return { error }
    }

    console.log('Enrollment email sent:', data?.id)
    return { data }
  } catch (error) {
    console.error('Enrollment email exception:', error)
    return { error }
  }
}

export async function sendPaymentReceipt({
  to,
  fullName,
  courseTitle,
  amount,
  paymentDate,
  paymentMethod,
  invoiceNumber,
}: {
  to: string
  fullName: string
  courseTitle: string
  amount: number
  paymentDate: string
  paymentMethod: string
  invoiceNumber: string
}) {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent.')
    return { error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: `Betaling ontvangen - Factuur ${invoiceNumber}`,
      react: PaymentReceipt({
        fullName,
        courseTitle,
        amount,
        paymentDate,
        paymentMethod,
        invoiceNumber,
      }),
    })

    if (error) {
      console.error('Payment receipt error:', error)
      return { error }
    }

    console.log('Payment receipt sent:', data?.id)
    return { data }
  } catch (error) {
    console.error('Payment receipt exception:', error)
    return { error }
  }
}
