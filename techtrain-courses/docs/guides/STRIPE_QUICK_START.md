# Stripe Payment Integration - Quick Start Guide

**⏱️ Time to set up**: ~30 minutes
**📍 Status**: Implementation Complete - Ready for Configuration

---

## 🚀 Quick Start (5 Steps)

### Step 1: Create Stripe Account (15 min)

1. Go to **https://stripe.com**
2. Click **"Start now"** → Sign up
3. Enter business details:
   - Name: TechTrain
   - Country: **Netherlands**
   - Industry: **Education**
4. ✅ You're in Test Mode (perfect for development)

---

### Step 2: Enable iDEAL (5 min)

1. In Stripe Dashboard: **Settings** > **Payment methods**
2. Click **"Add payment method"**
3. Search: **"iDEAL"**
4. Click **"Turn on"**
5. Set currency: **EUR**

---

### Step 3: Get API Keys (2 min)

1. Go to: **Developers** > **API keys**
2. Copy these two keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...` (click "Reveal")

---

### Step 4: Add to .env.local (3 min)

```bash
# In techtrain-courses directory
cd techtrain-courses

# Edit .env.local and add:
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_placeholder_for_now

# Restart dev server
npm run dev
```

---

### Step 5: Set Up Webhooks (10 min)

#### Option A: Local Testing (Recommended for Development)

```bash
# 1. Install Stripe CLI (Windows)
scoop install stripe

# Or macOS
brew install stripe/stripe-cli/stripe

# 2. Login
stripe login

# 3. Start forwarding (in separate terminal)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 4. Copy the webhook secret from output (whsec_...)
# 5. Add to .env.local
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# 6. Restart dev server
```

#### Option B: Production Deployment

1. Deploy app to production first
2. Stripe Dashboard > **Developers** > **Webhooks**
3. Click **"Add endpoint"**
4. URL: `https://your-domain.com/api/webhooks/stripe`
5. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
6. Copy signing secret → Add to production env vars

---

## 🧪 Test It! (5 min)

### Test Successful Payment

1. Start dev server: `npm run dev`
2. Go to any course page
3. Click **"Enroll"** or **"Book Now"**
4. You'll be redirected to checkout
5. Enter test card:
   - **Card**: `4242 4242 4242 4242`
   - **Expiry**: `12/34`
   - **CVC**: `123`
   - **ZIP**: `12345`
6. Click **"Betaal €X.XX"**
7. ✅ Should see success page!

### Test iDEAL Payment

1. On checkout page, select **iDEAL**
2. Choose any test bank
3. Click **"Authorize Test Payment"**
4. ✅ Auto-succeeds and shows success page!

### Test Failed Payment

1. Use card: `4000 0000 0000 0002`
2. ❌ Should show error: *"Je kaart is geweigerd"*

---

## ✅ Verify It Works

After successful payment, check:

- [ ] Success page shows *"Betaling gelukt!"*
- [ ] Supabase `enrollments` table has new entry
- [ ] Supabase `payments` table has payment record
- [ ] Stripe Dashboard > Payments shows the payment
- [ ] Webhook fired (check Stripe Dashboard > Webhooks > Logs)

---

## 🔍 Troubleshooting

### "STRIPE_SECRET_KEY is not defined"
→ Check `.env.local` has the key
→ Restart dev server: `npm run dev`

### Payment succeeds but no enrollment
→ Check webhook is running: `stripe listen ...`
→ Check server logs for errors
→ Verify `STRIPE_WEBHOOK_SECRET` is correct

### iDEAL not showing
→ Ensure currency is EUR
→ Check iDEAL enabled in Stripe Dashboard
→ Verify `automatic_payment_methods: { enabled: true }`

---

## 📚 Full Documentation

- **Complete Setup**: [STRIPE_SETUP.md](STRIPE_SETUP.md)
- **Implementation Details**: [STRIPE_INTEGRATION_COMPLETE.md](STRIPE_INTEGRATION_COMPLETE.md)
- **Full Summary**: [../STRIPE_IMPLEMENTATION_SUMMARY.md](../STRIPE_IMPLEMENTATION_SUMMARY.md)

---

## 🎯 Test Cards Reference

| Scenario | Card Number | Result |
|----------|-------------|--------|
| ✅ Success | `4242 4242 4242 4242` | Always succeeds |
| ❌ Declined | `4000 0000 0000 0002` | Card declined |
| ❌ Insufficient Funds | `4000 0000 0000 9995` | Insufficient funds |
| 🔐 3D Secure | `4000 0027 6000 3184` | Requires authentication |

**Expiry**: Any future date (e.g., `12/34`)
**CVC**: Any 3 digits (e.g., `123`)
**ZIP**: Any 5 digits (e.g., `12345`)

---

## 🚀 Going Live

When ready for production:

1. ✅ Complete Stripe business verification (1-3 days)
2. ✅ Switch to **live keys** (`sk_live_...`, `pk_live_...`)
3. ✅ Create production webhook endpoint
4. ✅ Test in production with real card (refund after)
5. ✅ Update Terms & Privacy Policy

---

## 💡 Quick Commands

```bash
# Start dev server
cd techtrain-courses && npm run dev

# Forward webhooks (separate terminal)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook
stripe trigger payment_intent.succeeded

# Check TypeScript
npx tsc --noEmit

# Build for production
npm run build
```

---

## 🎉 You're Ready!

Your Stripe integration is **100% complete**. Just follow the 5 steps above to start accepting payments!

**Time investment**:
- ⏱️ Setup: ~30 minutes
- 💰 Cost: Free (test mode)
- 🚀 Result: Production-ready payment system

**Questions?** See [STRIPE_SETUP.md](STRIPE_SETUP.md) for detailed help.

---

**Created**: October 21, 2025
**Status**: ✅ Ready to Configure
**Next Step**: Create Stripe account at https://stripe.com
