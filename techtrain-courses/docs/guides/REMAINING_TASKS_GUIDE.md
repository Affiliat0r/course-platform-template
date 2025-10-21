# Remaining Tasks to Production Launch

**Current Status**: 75% Production Ready (Code: 95%, Services: 55%)
**Estimated Time to Launch**: 1-2 weeks
**Last Updated**: 2025-10-21

---

## 🚨 CRITICAL - Do These First (Day 1)

### Task 1: Reset Supabase Service Role Key ⚠️ SECURITY ISSUE

**Why**: The service role key was exposed in documentation files and must be rotated immediately.

**Steps**:

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/api
   - Login to your Supabase account

2. **Reset the Service Role Key**:
   - Scroll to "Service role key" section
   - Click "Reset service_role secret"
   - Confirm the reset
   - Copy the new key immediately

3. **Update Local Environment**:
   ```bash
   cd techtrain-courses
   # Open .env.local and replace:
   SUPABASE_SERVICE_ROLE_KEY=your_new_service_role_key_here
   ```

4. **Verify Migration Still Works**:
   ```bash
   npm run migrate
   ```

   Expected output: "✅ Migration complete! 79 courses and 237 schedules migrated"

5. **Test Server Actions**:
   ```bash
   npm run dev
   ```

   Visit http://localhost:3000 and test:
   - Login/Register (should work)
   - Course enrollment (should work)
   - Dashboard (should show data)

**Success Criteria**: ✅ Migration runs without errors, auth works, enrollments work

---

## 🎯 HIGH PRIORITY - Production Infrastructure (Days 2-3)

### Task 2: Create Production Supabase Project

**Why**: You need a separate production database for live users.

**Steps**:

1. **Create New Supabase Project**:
   - Visit: https://supabase.com/dashboard
   - Click "New Project"
   - Organization: Your organization
   - Name: `techtrain-production`
   - Database Password: Use a strong password (save in password manager!)
   - Region: `West EU (Frankfurt)` or `North EU (Ireland)` (closest to Netherlands)
   - Pricing Plan: Free tier is fine for MVP, upgrade later

2. **Wait for Project Creation** (2-3 minutes)

3. **Get Production Credentials**:
   - Go to Project Settings > API
   - Copy these values:
     - Project URL
     - anon (public) key
     - service_role key

4. **Configure Production Environment Variables**:

   Create a new file for production values (DO NOT COMMIT THIS):

   ```bash
   # File: techtrain-courses/.env.production.local (add to .gitignore)

   NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_prod_service_role_key

   # Keep these same as dev for now
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   RESEND_API_KEY=your_resend_key
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   NEXT_PUBLIC_SITE_URL=https://techtrain.nl
   ```

5. **Run Production Migration**:

   ```bash
   # Temporarily swap environment variables
   cp .env.local .env.local.backup
   cp .env.production.local .env.local

   # Run migration to production
   npm run migrate

   # Should see: ✅ Migration complete! 79 courses and 237 schedules migrated

   # Restore dev environment
   cp .env.local.backup .env.local
   rm .env.local.backup
   ```

6. **Verify Production Database**:
   - Go to Supabase Dashboard > Table Editor
   - Check tables: courses (79 rows), schedules (237 rows)
   - Check RLS policies are enabled on all tables

**Success Criteria**: ✅ Production Supabase has all data, RLS policies enabled

---

### Task 3: Set Up Production Stripe Account

**Why**: Accept real payments from customers.

**Steps**:

1. **Create Stripe Account**:
   - Visit: https://dashboard.stripe.com/register
   - Country: Netherlands
   - Business type: Individual or Company
   - Complete business verification

2. **Enable iDEAL Payment Method**:
   - Go to: https://dashboard.stripe.com/settings/payment_methods
   - Enable: "iDEAL" (most popular in Netherlands)
   - Also enable: "Card" (Visa, Mastercard)

3. **Get Production API Keys**:
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy:
     - Publishable key (starts with `pk_live_`)
     - Secret key (starts with `sk_live_`)

4. **Configure Webhook for Production**:
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://techtrain.nl/api/webhooks/stripe`
   - Events to send:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Copy the webhook secret (starts with `whsec_`)

5. **Update Production Environment Variables**:
   ```bash
   # Add to .env.production.local:
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_SECRET
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   ```

6. **Test in Stripe Test Mode First**:
   ```bash
   npm run dev
   # Visit checkout page
   # Use test card: 4000 0027 6000 0016 (iDEAL test card)
   # Verify payment flow works
   ```

**Success Criteria**: ✅ Test payment completes, webhook receives event, enrollment created

---

### Task 4: Set Up Resend for Email

**Why**: Send transactional emails (welcome, enrollment confirmation, receipts).

**Steps**:

1. **Create Resend Account**:
   - Visit: https://resend.com/signup
   - Sign up with your email
   - Verify email address

2. **Add Your Domain**:
   - Go to: https://resend.com/domains
   - Click "Add Domain"
   - Enter: `techtrain.nl`
   - You'll get DNS records to add

3. **Configure DNS Records**:

   Go to your domain registrar (TransIP, Hostinger, etc.) and add these DNS records:

   ```
   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]

   Type: MX
   Name: @
   Value: feedback-smtp.eu-west-1.amazonses.com
   Priority: 10
   ```

4. **Verify Domain**:
   - Wait 5-10 minutes for DNS propagation
   - Click "Verify" in Resend dashboard
   - Should show green checkmark

5. **Get API Key**:
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Name: `techtrain-production`
   - Permission: Full Access
   - Copy the key (starts with `re_`)

6. **Update Production Environment**:
   ```bash
   # Add to .env.production.local:
   RESEND_API_KEY=re_YOUR_API_KEY
   ```

7. **Test Email Sending**:
   ```bash
   npm run email:dev  # Preview emails locally

   # Or test real sending:
   npm run dev
   # Register new account
   # Check email inbox for welcome email
   ```

**Success Criteria**: ✅ Domain verified, test email received in inbox (not spam)

---

### Task 5: Set Up Production Upstash Redis

**Why**: Rate limiting to prevent abuse and DDoS attacks.

**Steps**:

1. **Create Upstash Account**:
   - Visit: https://console.upstash.com/
   - Sign up with GitHub or email

2. **Create Production Redis Database**:
   - Click "Create Database"
   - Name: `techtrain-production`
   - Type: Regional
   - Region: `eu-west-1` (Ireland - closest to NL)
   - TLS: Enabled

3. **Get Connection Details**:
   - Click on your database
   - Copy:
     - UPSTASH_REDIS_REST_URL
     - UPSTASH_REDIS_REST_TOKEN

4. **Update Production Environment**:
   ```bash
   # Add to .env.production.local:
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token
   ```

5. **Test Rate Limiting**:
   ```bash
   npm run dev
   # Try logging in with wrong password 6 times
   # Should see: "Te veel pogingen. Probeer het over 15 minuten opnieuw."
   ```

**Success Criteria**: ✅ Rate limiting works, blocks after 5 failed attempts

---

## 📝 MEDIUM PRIORITY - Testing & Quality (Days 4-5)

### Task 6: Write Test Suite (Achieve 60%+ Coverage)

**Current Coverage**: ~5%
**Target**: 60%+
**Estimated Effort**: 8-12 hours

**Priority Tests to Write**:

1. **Authentication Tests** (2 hours):
   ```bash
   # File: test/unit/auth.test.ts
   # Test: signUp, signIn, signOut, password reset
   ```

2. **Enrollment Tests** (2 hours):
   ```bash
   # File: test/unit/enrollments.test.ts
   # Test: createEnrollment, checkEnrollment, cancelEnrollment
   ```

3. **Payment Tests** (2 hours):
   ```bash
   # File: test/unit/payments.test.ts
   # Test: createPaymentIntent, webhook handling
   ```

4. **Sanitization Tests** (1 hour):
   ```bash
   # File: test/unit/sanitize.test.ts
   # Test: all sanitization functions
   ```

5. **E2E User Flows** (3 hours):
   ```bash
   # File: e2e/user-journey.spec.ts
   # Test: Browse > Select Course > Enroll > Pay > Dashboard
   ```

**Run Tests**:
```bash
npm run test              # Unit tests
npm run test:coverage     # Check coverage
npm run test:e2e          # E2E tests
```

**Success Criteria**: ✅ 60%+ coverage, all critical paths tested

---

### Task 7: Translate Supabase Auth Emails to Dutch

**Steps**:

1. **Go to Supabase Dashboard**:
   - Project Settings > Authentication > Email Templates

2. **Update Each Template**:

   **Confirm Signup Email**:
   ```html
   <h2>Bevestig je e-mailadres</h2>
   <p>Bedankt voor je registratie bij TechTrain!</p>
   <p>Klik op de onderstaande link om je e-mailadres te bevestigen:</p>
   <p><a href="{{ .ConfirmationURL }}">Bevestig e-mailadres</a></p>
   ```

   **Reset Password Email**:
   ```html
   <h2>Wachtwoord opnieuw instellen</h2>
   <p>Je hebt verzocht om je wachtwoord opnieuw in te stellen.</p>
   <p>Klik op de onderstaande link om een nieuw wachtwoord in te stellen:</p>
   <p><a href="{{ .ConfirmationURL }}">Nieuw wachtwoord instellen</a></p>
   <p>Als je dit niet hebt aangevraagd, negeer dan deze e-mail.</p>
   ```

   **Magic Link Email** (if using):
   ```html
   <h2>Inloggen bij TechTrain</h2>
   <p>Klik op de onderstaande link om in te loggen:</p>
   <p><a href="{{ .ConfirmationURL }}">Inloggen</a></p>
   ```

3. **Test Each Email**:
   - Register new test account
   - Request password reset
   - Verify emails arrive in Dutch

**Success Criteria**: ✅ All auth emails in Dutch, professional formatting

---

## 🚀 DEPLOYMENT - Final Steps (Days 6-7)

### Task 8: Deploy to Vercel Staging

**Steps**:

1. **Connect GitHub to Vercel**:
   - Visit: https://vercel.com/
   - Click "Import Project"
   - Connect GitHub
   - Select your repository

2. **Configure Build Settings**:
   ```
   Framework Preset: Next.js
   Root Directory: techtrain-courses
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Add Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.production.local`
   - Set environment: Production

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get staging URL: `https://techtrain-xxx.vercel.app`

5. **Test Staging Site**:
   - [ ] Homepage loads
   - [ ] Course catalog works
   - [ ] Search and filters work
   - [ ] Login/Register works
   - [ ] Course enrollment works
   - [ ] Payment flow works (use Stripe test mode)
   - [ ] Emails are sent
   - [ ] Dashboard shows enrollments

**Success Criteria**: ✅ All features work on staging URL

---

### Task 9: Configure Production Domain

**Steps**:

1. **Add Domain in Vercel**:
   - Project Settings > Domains
   - Add: `techtrain.nl`
   - Add: `www.techtrain.nl`

2. **Update DNS Records**:

   Go to your domain registrar and add:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (5-30 minutes)

4. **Verify SSL Certificate**:
   - Vercel automatically provisions SSL
   - Check: https://techtrain.nl (should show padlock)

**Success Criteria**: ✅ Site accessible at https://techtrain.nl with SSL

---

### Task 10: Final Pre-Launch Checklist

**Security**:
- [ ] All environment variables secured
- [ ] RLS policies enabled on all Supabase tables
- [ ] Rate limiting tested and working
- [ ] CSP headers configured
- [ ] HTTPS enforced (no HTTP)
- [ ] Service role key never exposed

**Functionality**:
- [ ] Course catalog loads all 79 courses
- [ ] Search works (try: "React", "Python", "DevOps")
- [ ] Filters work (Frontend, Backend, etc.)
- [ ] Course detail pages load
- [ ] Enrollment flow works end-to-end
- [ ] Payment with iDEAL works
- [ ] Payment with card works
- [ ] Emails are sent and received
- [ ] Dashboard shows user enrollments
- [ ] Cancellation works

**Content**:
- [ ] All text in Dutch
- [ ] No Lorem Ipsum or placeholder text
- [ ] Course images load
- [ ] Instructor photos load
- [ ] Company information correct
- [ ] Contact information correct (email, phone)

**Performance**:
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console errors
- [ ] No console warnings

**Legal**:
- [ ] Privacy policy up to date
- [ ] Terms & conditions up to date
- [ ] GDPR compliance verified
- [ ] Cookie consent (if using analytics)

**Monitoring**:
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (Sentry recommended)
- [ ] Stripe dashboard monitoring set up
- [ ] Supabase monitoring reviewed

---

## 🎉 Launch Day

### Final Steps:

1. **Switch to Production Stripe**:
   - Update environment variables to use `pk_live_` and `sk_live_` keys
   - Redeploy Vercel

2. **Announce Launch**:
   - Social media
   - Email list (if you have one)
   - LinkedIn

3. **Monitor First 24 Hours**:
   - Watch Vercel Analytics for traffic
   - Check Stripe dashboard for payments
   - Monitor error logs
   - Test user flows yourself

4. **Be Ready to Fix Issues**:
   - Have laptop ready
   - Monitor email for user reports
   - Quick rollback plan (revert Vercel deployment)

---

## 📊 Progress Tracking

### Completion Status:

**Critical Tasks**:
- [ ] Task 1: Reset service role key
- [ ] Task 2: Production Supabase
- [ ] Task 3: Production Stripe
- [ ] Task 4: Resend email
- [ ] Task 5: Upstash Redis

**High Priority**:
- [ ] Task 6: Write tests (60%+ coverage)
- [ ] Task 7: Translate auth emails

**Deployment**:
- [ ] Task 8: Deploy to Vercel staging
- [ ] Task 9: Configure production domain
- [ ] Task 10: Pre-launch checklist

**Estimated Remaining Time**: 1-2 weeks

---

## 🆘 Troubleshooting

### Common Issues:

**Issue**: Migration fails with "service_role key invalid"
- **Fix**: Make sure you reset the key (Task 1) and updated .env.local

**Issue**: Emails not sending
- **Fix**: Verify Resend domain in dashboard, check DNS records

**Issue**: Payments failing
- **Fix**: Check Stripe webhook is configured correctly, verify webhook secret

**Issue**: Rate limiting not working
- **Fix**: Verify Upstash Redis credentials, check connection

**Issue**: Build fails on Vercel
- **Fix**: Make sure Root Directory is set to "techtrain-courses"

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Ready to start?** Begin with Task 1 (Reset service role key) right now!

**Questions?** Ask Claude Code - the specialized agents are ready to help:
- `/auth-integration` - Authentication issues
- `/payment-integration` - Stripe and payment questions
- `/email-automation` - Email setup and templates
- `/vercel-deployment` - Deployment questions

**Good luck! 🚀**
