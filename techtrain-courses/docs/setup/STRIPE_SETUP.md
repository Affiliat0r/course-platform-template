# Stripe Payment Integration - Setup Guide

This guide walks you through setting up Stripe payments for the TechTrain course platform, including iDEAL support for Dutch customers.

## Table of Contents

1. [Stripe Account Setup](#stripe-account-setup)
2. [Enable Payment Methods](#enable-payment-methods)
3. [Get API Keys](#get-api-keys)
4. [Configure Environment Variables](#configure-environment-variables)
5. [Set Up Webhooks](#set-up-webhooks)
6. [Test Payment Flow](#test-payment-flow)
7. [Going Live Checklist](#going-live-checklist)
8. [Troubleshooting](#troubleshooting)

---

## Stripe Account Setup

### Step 1: Create Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Start now" or "Sign up"
3. Provide your business details:
   - **Business name**: TechTrain (or your business name)
   - **Country**: Netherlands
   - **Business type**: Online services
   - **Industry**: Education
4. Complete email verification
5. You'll start in **Test Mode** (can switch to Live Mode later)

### Step 2: Complete Business Verification (Required for Live Mode)

To accept real payments, you need to complete identity verification:

1. Go to **Settings** > **Business settings** > **Business details**
2. Provide:
   - Business legal name
   - Tax ID (KVK number for Netherlands)
   - Business address
   - Representative information
3. Upload required documents (ID, proof of address)
4. Add bank account for payouts (IBAN for Netherlands)

⏱️ **Verification typically takes 1-3 business days**

---

## Enable Payment Methods

### Step 3: Configure Payment Methods

1. Go to **Settings** > **Payment methods**
2. Enable the following payment methods:

#### ✅ Required Payment Methods

- **iDEAL** (Most popular in Netherlands)
  - Click "Add payment method"
  - Search for "iDEAL"
  - Click "Turn on"
  - Set EUR as default currency

- **Cards** (Visa, Mastercard, American Express)
  - Usually enabled by default
  - Verify it's turned on in Payment methods list

#### 🔧 Optional Payment Methods

- **Bancontact** (Popular in Belgium)
- **SEPA Direct Debit** (For subscription-based payments)

### Step 4: Set Default Currency

1. Go to **Settings** > **Business settings** > **Currency**
2. Set default currency to **EUR (€)**

---

## Get API Keys

### Step 5: Retrieve API Keys

1. Go to **Developers** > **API keys**
2. You'll see two sets of keys:

#### Test Mode Keys (for development)
- **Publishable key**: `pk_test_...`
- **Secret key**: `sk_test_...` (click "Reveal test key")

#### Live Mode Keys (for production)
- **Publishable key**: `pk_live_...`
- **Secret key**: `sk_live_...` (click "Reveal live key")

⚠️ **IMPORTANT**: Never expose the Secret key in client-side code!

---

## Configure Environment Variables

### Step 6: Add Keys to .env.local

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cd techtrain-courses
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Stripe keys:

   ```env
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

3. **For production**, switch to live keys:
   ```env
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here
   ```

---

## Set Up Webhooks

Webhooks allow Stripe to notify your application about payment events (success, failure, refunds).

### Step 7: Create Webhook Endpoint

#### Option A: Production Deployment (Recommended)

1. Deploy your app to Vercel/production first
2. Go to Stripe Dashboard > **Developers** > **Webhooks**
3. Click "Add endpoint"
4. Enter your webhook URL:
   ```
   https://your-domain.com/api/webhooks/stripe
   ```
5. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
6. Click "Add endpoint"
7. Copy the **Signing secret** (starts with `whsec_...`)
8. Add it to your `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_actual_signing_secret
   ```

#### Option B: Local Testing with Stripe CLI

For testing webhooks locally during development:

1. **Install Stripe CLI**:
   - **Windows**: `scoop install stripe`
   - **macOS**: `brew install stripe/stripe-cli/stripe`
   - **Linux**: [Download from Stripe](https://stripe.com/docs/stripe-cli)

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**:
   ```bash
   cd techtrain-courses
   npm run dev  # Start your Next.js app in another terminal

   # In a separate terminal:
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. The CLI will output a webhook signing secret:
   ```
   Ready! Your webhook signing secret is whsec_...
   ```

5. Copy this secret to your `.env.local`

6. **Test webhook** (in another terminal):
   ```bash
   stripe trigger payment_intent.succeeded
   ```

---

## Test Payment Flow

### Step 8: Test with Stripe Test Cards

Stripe provides test card numbers that simulate different scenarios:

#### ✅ Successful Payments

**Credit/Debit Card (Success)**:
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**iDEAL (Success)**:
- Select "iDEAL" as payment method
- Choose any test bank from the dropdown
- You'll be redirected to a test bank page
- Click "Authorize Test Payment"
- Automatically succeeds

#### ❌ Failed Payments

**Card Declined**:
- Card number: `4000 0000 0000 0002`
- Simulates a generic decline

**Insufficient Funds**:
- Card number: `4000 0000 0000 9995`

**3D Secure Required**:
- Card number: `4000 0027 6000 3184`
- Prompts for 3D Secure authentication

[More test cards](https://stripe.com/docs/testing)

### Step 9: Test Checklist

Test the complete payment flow:

- [ ] Navigate to a course detail page
- [ ] Click "Enroll" or "Book Now"
- [ ] Get redirected to checkout page (`/checkout?courseId=...&scheduleId=...&amount=...`)
- [ ] See Stripe payment form load
- [ ] Enter test card details (or select iDEAL)
- [ ] Click "Pay €X.XX"
- [ ] Get redirected to success page (`/checkout/success`)
- [ ] See success message
- [ ] Check Supabase `enrollments` table (enrollment created)
- [ ] Check Supabase `payments` table (payment recorded)
- [ ] Check Stripe Dashboard > Payments (payment appears)
- [ ] Check webhook logs in Stripe Dashboard > Webhooks

#### Test Failed Payment

- [ ] Use card `4000 0000 0000 0002` (decline)
- [ ] See error message in Dutch
- [ ] Payment not created in database

#### Test Refund (Admin Action)

- [ ] Create successful payment
- [ ] Go to Stripe Dashboard > Payments
- [ ] Click on the payment
- [ ] Click "Refund payment"
- [ ] Verify webhook receives `charge.refunded`
- [ ] Check database: payment status = `refunded`, enrollment status = `cancelled`

---

## Going Live Checklist

Before accepting real payments, complete these steps:

### ✅ Stripe Account Ready

- [ ] Business verification completed
- [ ] Bank account added for payouts
- [ ] Business details verified
- [ ] Terms of service accepted

### ✅ Configuration

- [ ] Switch to **live API keys** in `.env.local`
- [ ] Update webhook endpoint to production URL
- [ ] Test webhook with live webhook secret
- [ ] Enable Stripe Radar (fraud protection)
- [ ] Set up email receipts (Stripe sends automatically)

### ✅ Application Ready

- [ ] Deploy to production (Vercel/VPS)
- [ ] Test complete payment flow in production
- [ ] Verify SSL certificate is active (HTTPS)
- [ ] Test failed payment handling
- [ ] Test refund flow

### ✅ Legal & Compliance

- [ ] Terms & conditions include refund policy
- [ ] Privacy policy mentions Stripe
- [ ] Cookie consent includes Stripe cookies
- [ ] GDPR compliance verified

### ✅ Monitoring

- [ ] Set up Stripe email notifications for payments
- [ ] Monitor Stripe Dashboard daily
- [ ] Set up alerts for failed payments

---

## Implementation Overview

The Stripe integration consists of these key files:

### Client-Side Files
- `lib/stripe-client.ts` - Stripe.js loader for browser
- `app/checkout/page.tsx` - Checkout page with Stripe Elements
- `components/CheckoutForm.tsx` - Payment form component
- `app/checkout/success/page.tsx` - Success page after payment

### Server-Side Files
- `lib/stripe.ts` - Stripe SDK initialization
- `app/actions/payments.ts` - Server Actions for payment operations
- `app/api/webhooks/stripe/route.ts` - Webhook handler

### Utilities
- `lib/payment-errors.ts` - Dutch error message translations

### Payment Flow

1. **User clicks "Enroll"** → Redirects to `/checkout` with course details
2. **Checkout page loads** → Calls `createPaymentIntent()` Server Action
3. **Server Action** → Creates Stripe Payment Intent, returns `clientSecret`
4. **Stripe Elements** → Loads payment form in browser
5. **User enters payment details** → Submits form
6. **Stripe processes payment** → Redirects to success page
7. **Success page** → Calls `confirmPayment()` and `createEnrollment()`
8. **Webhook** → Stripe sends `payment_intent.succeeded` to your server
9. **Webhook handler** → Saves payment to database, sends receipt email

---

## Troubleshooting

### Problem: "STRIPE_SECRET_KEY is not defined"

**Solution**: Ensure `.env.local` has the correct key:
```env
STRIPE_SECRET_KEY=sk_test_...
```
Restart the dev server after adding environment variables.

---

### Problem: Webhook signature verification fails

**Error**: `Webhook signature verification failed`

**Solutions**:
1. Verify `STRIPE_WEBHOOK_SECRET` matches the webhook signing secret
2. Check webhook endpoint URL is correct
3. Ensure webhook is sending to the right environment (test vs live)
4. If using Stripe CLI, make sure it's running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

---

### Problem: Payment succeeds but enrollment not created

**Possible causes**:
1. Webhook not configured or not firing
2. Database connection issue
3. User ID mismatch

**Solution**:
1. Check Stripe Dashboard > Webhooks > Logs
2. Check server logs for errors
3. Manually verify in Supabase `enrollments` table

---

### Problem: "This API call cannot be made with a publishable API key"

**Solution**: You're using the publishable key on the server side. Use `STRIPE_SECRET_KEY` in server code, not `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

---

### Problem: iDEAL not appearing as payment option

**Solutions**:
1. Verify iDEAL is enabled in Stripe Dashboard > Settings > Payment methods
2. Ensure currency is EUR (iDEAL only works with EUR)
3. Check payment intent was created with `automatic_payment_methods: { enabled: true }`

---

### Problem: Payments work in test mode but not live mode

**Checklist**:
- [ ] Switched to live API keys (`sk_live_...` and `pk_live_...`)
- [ ] Business verification completed
- [ ] Live mode webhook created with live signing secret
- [ ] Production URL is using HTTPS

---

## Resources

- **Stripe Documentation**: [https://stripe.com/docs](https://stripe.com/docs)
- **Stripe + Next.js Guide**: [https://stripe.com/docs/payments/quickstart](https://stripe.com/docs/payments/quickstart)
- **iDEAL Setup**: [https://stripe.com/docs/payments/ideal](https://stripe.com/docs/payments/ideal)
- **Webhook Best Practices**: [https://stripe.com/docs/webhooks/best-practices](https://stripe.com/docs/webhooks/best-practices)
- **Stripe Dashboard**: [https://dashboard.stripe.com](https://dashboard.stripe.com)
- **Test Cards**: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## Support

If you encounter issues:

1. Check Stripe Dashboard > Developers > Logs for errors
2. Check your application server logs
3. Review Stripe Webhook logs
4. Contact Stripe Support: [https://support.stripe.com](https://support.stripe.com)

---

**You're all set! 🎉** Test the payment flow thoroughly before going live.
