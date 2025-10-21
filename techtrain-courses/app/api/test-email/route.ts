import { NextResponse } from 'next/server'
import { sendWelcomeEmail, sendEnrollmentConfirmation, sendPaymentReceipt } from '@/lib/email'

/**
 * Test endpoint for email sending (development only)
 *
 * Usage:
 * - GET /api/test-email?type=welcome&email=test@example.com
 * - GET /api/test-email?type=enrollment&email=test@example.com
 * - GET /api/test-email?type=payment&email=test@example.com
 */
export async function GET(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    )
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const email = searchParams.get('email') || 'test@example.com'

  try {
    switch (type) {
      case 'welcome':
        await sendWelcomeEmail(email, 'Test Gebruiker')
        return NextResponse.json({
          success: true,
          message: `Welcome email sent to ${email}`
        })

      case 'enrollment':
        await sendEnrollmentConfirmation({
          to: email,
          fullName: 'Test Gebruiker',
          courseTitle: 'React Development Masterclass',
          startDate: '15 januari 2025',
          location: 'Amsterdam - Zuidas',
          price: 1299,
        })
        return NextResponse.json({
          success: true,
          message: `Enrollment confirmation sent to ${email}`
        })

      case 'payment':
        await sendPaymentReceipt({
          to: email,
          fullName: 'Test Gebruiker',
          courseTitle: 'React Development Masterclass',
          amount: 1299,
          paymentDate: new Date().toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          paymentMethod: 'iDEAL',
          invoiceNumber: 'INV-TEST-12345',
        })
        return NextResponse.json({
          success: true,
          message: `Payment receipt sent to ${email}`
        })

      default:
        return NextResponse.json(
          {
            error: 'Unknown type. Use: welcome, enrollment, or payment',
            usage: '/api/test-email?type=welcome&email=test@example.com'
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: 'Failed to send test email', details: error },
      { status: 500 }
    )
  }
}
