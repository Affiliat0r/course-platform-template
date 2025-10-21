# Email Automation Setup Guide

This document explains the email automation system implemented for TechTrain course platform.

## Overview

The platform uses **Resend** for transactional email delivery with **React Email** for templating. All emails are in Dutch and follow professional design standards.

## Features Implemented

### Email Types

1. **Welcome Email** - Sent on user registration
2. **Enrollment Confirmation** - Sent when user enrolls in a course
3. **Payment Receipt** - Sent after successful payment via Stripe

### Technology Stack

- **Resend** - Email delivery service (3,000 emails/month free tier)
- **React Email** - Email templating with React components
- **Supabase** - User and course data storage
- **Stripe** - Payment processing (triggers payment receipt emails)

## File Structure

```
techtrain-courses/
├── emails/                              # Email templates
│   ├── welcome.tsx                      # Welcome email template
│   ├── enrollment-confirmation.tsx      # Enrollment confirmation template
│   └── payment-receipt.tsx              # Payment receipt template
├── lib/
│   └── email.ts                         # Email service functions
├── app/
│   ├── actions/
│   │   ├── auth.ts                      # Auth actions (sends welcome email)
│   │   └── enrollments.ts               # Enrollment actions (sends confirmation)
│   └── api/
│       ├── webhooks/
│       │   └── stripe/
│       │       └── route.ts             # Stripe webhook (sends payment receipt)
│       └── test-email/
│           └── route.ts                 # Test endpoint (development only)
└── .env.local.example                   # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies

Already installed:
```bash
npm install resend react-email @react-email/components
```

### 2. Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address
4. Get your API key from the dashboard

### 3. Configure Environment Variables

Add to your `.env.local`:

```env
RESEND_API_KEY=re_your_api_key_here
```

### 4. Domain Configuration (Production)

For production use, you'll need to verify your domain:

#### DNS Records to Add:

```
Type: TXT
Name: @
Value: resend-verify=<your-verification-code>

Type: MX
Priority: 10
Value: feedback-smtp.resend.com

Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: <your-dkim-key>
```

**Note**: DNS propagation can take 24-48 hours.

### 5. Update Email Sender Address

In [lib/email.ts](lib/email.ts), update the `FROM_EMAIL` constant:

```typescript
const FROM_EMAIL = 'TechTrain <info@techtrain.nl>'
const REPLY_TO = 'info@techtrain.nl'
```

For development, you can use Resend's test domain:
```typescript
const FROM_EMAIL = 'TechTrain <onboarding@resend.dev>'
```

## Email Templates

### Welcome Email

**Trigger**: User registration
**File**: [emails/welcome.tsx](emails/welcome.tsx)
**Includes**:
- Personalized greeting
- Account benefits list
- Link to browse courses
- Contact information

### Enrollment Confirmation

**Trigger**: Course enrollment
**File**: [emails/enrollment-confirmation.tsx](emails/enrollment-confirmation.tsx)
**Includes**:
- Course title
- Start date and location
- Price confirmation
- Link to user dashboard

### Payment Receipt

**Trigger**: Successful Stripe payment
**File**: [emails/payment-receipt.tsx](emails/payment-receipt.tsx)
**Includes**:
- Invoice number
- Payment details (date, method, amount)
- Course title
- Official receipt message

## Email Service Functions

Located in [lib/email.ts](lib/email.ts):

### `sendWelcomeEmail(to: string, fullName: string)`

Sends welcome email after user registration.

**Usage**:
```typescript
import { sendWelcomeEmail } from '@/lib/email'

await sendWelcomeEmail('user@example.com', 'Jan de Vries')
```

### `sendEnrollmentConfirmation({ to, fullName, courseTitle, startDate, location, price })`

Sends enrollment confirmation email.

**Usage**:
```typescript
import { sendEnrollmentConfirmation } from '@/lib/email'

await sendEnrollmentConfirmation({
  to: 'user@example.com',
  fullName: 'Jan de Vries',
  courseTitle: 'React Development',
  startDate: '15 januari 2025',
  location: 'Amsterdam',
  price: 1299,
})
```

### `sendPaymentReceipt({ to, fullName, courseTitle, amount, paymentDate, paymentMethod, invoiceNumber })`

Sends payment receipt email.

**Usage**:
```typescript
import { sendPaymentReceipt } from '@/lib/email'

await sendPaymentReceipt({
  to: 'user@example.com',
  fullName: 'Jan de Vries',
  courseTitle: 'React Development',
  amount: 1299,
  paymentDate: '21 oktober 2025',
  paymentMethod: 'iDEAL',
  invoiceNumber: 'INV-12345',
})
```

## Integration Points

### 1. Registration (Welcome Email)

**File**: [app/actions/auth.ts](app/actions/auth.ts)

The welcome email is sent after successful user registration:

```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: { data: { full_name: fullName } },
})

if (data.user && fullName) {
  await sendWelcomeEmail(email, fullName)
}
```

### 2. Enrollment (Confirmation Email)

**File**: [app/actions/enrollments.ts](app/actions/enrollments.ts)

The enrollment confirmation is sent after creating an enrollment:

```typescript
const { data: enrollment, error } = await supabase
  .from('enrollments')
  .insert({ user_id, course_id, schedule_id })
  .select('*, course:courses(*), schedule:course_schedules(*)')
  .single()

if (enrollment) {
  await sendEnrollmentConfirmation({
    to: profile.email,
    fullName: profile.full_name,
    courseTitle: enrollment.course.title,
    startDate: formatDate(enrollment.schedule.start_date),
    location: enrollment.schedule.location,
    price: enrollment.course.price,
  })
}
```

### 3. Payment (Receipt Email)

**File**: [app/api/webhooks/stripe/route.ts](app/api/webhooks/stripe/route.ts)

The payment receipt is sent after Stripe webhook confirms payment:

```typescript
case 'payment_intent.succeeded': {
  const { data: payment } = await supabase.from('payments').insert({...})

  if (payment) {
    await sendPaymentReceipt({
      to: profile.email,
      fullName: profile.full_name,
      courseTitle: course.title,
      amount: paymentIntent.amount / 100,
      paymentDate: formatDate(new Date()),
      paymentMethod: 'iDEAL',
      invoiceNumber: `INV-${payment.id}`,
    })
  }
}
```

## Testing

### Preview Emails Locally

Run the email preview server:

```bash
npm run email:dev
```

Visit [http://localhost:3000](http://localhost:3000) to preview emails in your browser.

### Test Email Sending (Development Only)

Use the test endpoint to send real test emails:

**Welcome Email**:
```
GET http://localhost:3000/api/test-email?type=welcome&email=your@email.com
```

**Enrollment Confirmation**:
```
GET http://localhost:3000/api/test-email?type=enrollment&email=your@email.com
```

**Payment Receipt**:
```
GET http://localhost:3000/api/test-email?type=payment&email=your@email.com
```

**Note**: This endpoint is disabled in production for security.

## Error Handling

All email functions handle errors gracefully:

- Errors are logged to console
- Errors don't block the main flow (registration/enrollment/payment still succeeds)
- Returns error object for monitoring

Example:
```typescript
const { data, error } = await sendWelcomeEmail(email, fullName)

if (error) {
  console.error('Failed to send welcome email:', error)
  // Continue with registration flow
}
```

## Monitoring

### Resend Dashboard

Monitor email delivery in the Resend dashboard:
- Delivery status (sent, delivered, opened, clicked)
- Bounce tracking
- Spam complaints
- Email logs

### Production Recommendations

1. **Set up alerts** for high bounce rates
2. **Monitor delivery rates** (should be >95%)
3. **Track open rates** for engagement
4. **Review spam complaints** regularly
5. **Keep sender reputation high** by maintaining clean email lists

## Customization

### Styling

Email templates use inline styles for maximum email client compatibility. Modify styles in each template file:

```typescript
const button = {
  backgroundColor: '#2563EB',  // Primary blue
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 20px',
}
```

### Content

All content is in Dutch. Update text directly in template files:
- [emails/welcome.tsx](emails/welcome.tsx)
- [emails/enrollment-confirmation.tsx](emails/enrollment-confirmation.tsx)
- [emails/payment-receipt.tsx](emails/payment-receipt.tsx)

### Branding

Update branding elements:
- Logo: Add `<Img src="..." />` component
- Colors: Modify style constants
- Fonts: Update `fontFamily` in styles

## Production Checklist

Before going live:

- [ ] Resend account created and verified
- [ ] Domain verified in Resend
- [ ] DNS records configured (SPF, DKIM, DMARC)
- [ ] Production `RESEND_API_KEY` added to environment variables
- [ ] Email sender address updated (`FROM_EMAIL`)
- [ ] All email templates tested
- [ ] Emails display correctly in Gmail, Outlook, Apple Mail
- [ ] Unsubscribe link added (GDPR requirement)
- [ ] Privacy policy updated with email practices
- [ ] Monitoring configured in Resend dashboard

## Troubleshooting

### Emails Not Sending

1. Check `RESEND_API_KEY` is set correctly
2. Verify sender email domain is verified
3. Check Resend dashboard for errors
4. Review console logs for error messages

### Emails Going to Spam

1. Verify SPF/DKIM/DMARC records
2. Check sender reputation in Resend dashboard
3. Avoid spam trigger words in subject/content
4. Maintain clean recipient lists

### Styling Issues

1. Test in multiple email clients
2. Use inline styles (not CSS classes)
3. Avoid complex layouts
4. Test on mobile devices

## Additional Resources

- **Resend Documentation**: [https://resend.com/docs](https://resend.com/docs)
- **React Email Documentation**: [https://react.email/docs](https://react.email/docs)
- **Email Client Support**: [https://www.caniemail.com](https://www.caniemail.com)
- **Email Testing Tool**: [https://www.emailonacid.com](https://www.emailonacid.com)

## Support

For issues or questions:
- Review Resend logs in dashboard
- Check [Resend Discord](https://discord.gg/resend)
- Consult [React Email Examples](https://react.email/examples)

---

**Implementation Status**: ✅ Complete
**Last Updated**: 2025-10-21
**Version**: 1.0
