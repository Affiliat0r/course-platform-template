# Quick Email Reference Card

Quick reference for email functionality in TechTrain platform.

## Setup (One-Time)

1. **Get Resend API Key**: https://resend.com/api-keys
2. **Add to .env.local**:
   ```env
   RESEND_API_KEY=re_your_key_here
   ```
3. **Start dev server**: `npm run dev`

## Preview Emails

```bash
npm run email:dev
```
Visit http://localhost:3000 to preview templates

## Test Email Sending

Send test emails (development only):

```bash
# Welcome Email
curl "http://localhost:3000/api/test-email?type=welcome&email=you@example.com"

# Enrollment Confirmation
curl "http://localhost:3000/api/test-email?type=enrollment&email=you@example.com"

# Payment Receipt
curl "http://localhost:3000/api/test-email?type=payment&email=you@example.com"
```

## Using Email Functions

### Send Welcome Email
```typescript
import { sendWelcomeEmail } from '@/lib/email'

await sendWelcomeEmail('user@example.com', 'Jan de Vries')
```

### Send Enrollment Confirmation
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

### Send Payment Receipt
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

## Email Templates

| Template | File | Trigger |
|----------|------|---------|
| Welcome | `emails/welcome.tsx` | User registration |
| Enrollment | `emails/enrollment-confirmation.tsx` | Course enrollment |
| Payment | `emails/payment-receipt.tsx` | Payment success |

## Integration Points

| Flow | File | Function |
|------|------|----------|
| Registration | `app/actions/auth.ts` | `signUp()` |
| Enrollment | `app/actions/enrollments.ts` | `createEnrollment()` |
| Payment | `app/api/webhooks/stripe/route.ts` | `POST()` |

## Troubleshooting

### Emails Not Sending
1. Check `RESEND_API_KEY` is set
2. Check console for errors
3. Verify sender domain (use `onboarding@resend.dev` for testing)

### Testing in Development
- Use test endpoint: `/api/test-email?type=welcome&email=test@test.com`
- Preview with: `npm run email:dev`
- Check logs for "email sent" messages

### Production Setup
1. Verify domain in Resend
2. Add DNS records (SPF, DKIM, DMARC)
3. Wait 24-48h for DNS propagation
4. Update `FROM_EMAIL` in `lib/email.ts`

## Monitoring

Check Resend dashboard for:
- Delivery status
- Bounce rates (target: <5%)
- Spam complaints
- Email logs

## Full Documentation

See [EMAIL_SETUP.md](EMAIL_SETUP.md) for complete guide.
