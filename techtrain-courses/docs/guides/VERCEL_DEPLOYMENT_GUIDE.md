# TechTrain Vercel Deployment Guide

**Last Updated**: 2025-10-21
**Status**: Ready for deployment - Build successful ✅

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables Preparation](#environment-variables-preparation)
3. [Vercel Account Setup](#vercel-account-setup)
4. [Project Configuration](#project-configuration)
5. [Deployment Process](#deployment-process)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Custom Domain Setup](#custom-domain-setup)
8. [External Services Configuration](#external-services-configuration)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Code Quality ✅
- [x] Production build successful (`npm run build`)
- [x] No TypeScript errors
- [x] All Suspense boundaries in place
- [x] Environment variables documented
- [ ] All console.logs removed from production code
- [ ] Error boundaries tested

### Security ⚠️
- [ ] Supabase service role key rotated (exposed in git history)
- [ ] All environment variables prepared for production
- [ ] `.env.local` in `.gitignore`
- [ ] No credentials committed to git
- [ ] Rate limiting configured (optional for initial launch)

### Content
- [ ] All Dutch content proofread
- [ ] All placeholder text replaced
- [ ] Privacy policy and Terms updated
- [ ] Contact information accurate

---

## Environment Variables Preparation

### Step 1: Create Production Supabase Project

**CRITICAL**: Your current Supabase service role key was exposed in documentation and MUST be rotated before production use.

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create new project: `techtrain-production`
3. Choose region: EU (Frankfurt or London for Netherlands)
4. **Important**: Use a strong database password and store it securely
5. Wait for project provisioning (5-10 minutes)

### Step 2: Deploy Database Schema

```bash
# Navigate to project directory
cd techtrain-courses

# Copy the schema
# Go to Supabase Dashboard > SQL Editor
# Paste contents of supabase/schema.sql
# Execute the SQL
```

### Step 3: Migrate Course Data

```bash
# Create production environment file (DO NOT COMMIT)
# Copy .env.local to .env.production
# Update with production Supabase credentials

# Run migration
NODE_ENV=production npx tsx scripts/migrate-to-supabase.ts
```

### Step 4: Prepare Production Environment Variables

Create a secure document (password manager) with these values:

```env
# Production Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_production_service_role_key

# Production Application URL
NEXT_PUBLIC_APP_URL=https://techtrain.nl

# Stripe Production Keys (initially use test mode)
STRIPE_SECRET_KEY=sk_test_your_test_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_test_webhook_secret

# Resend Production API Key
RESEND_API_KEY=re_your_production_key

# Upstash Redis (for rate limiting - optional for initial launch)
UPSTASH_REDIS_REST_URL=https://your-production-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_production_token
```

**Security Notes**:
- ✅ Use production Supabase keys
- ⚠️ Start with Stripe **test mode** keys
- ✅ Use production Resend key
- ⚠️ Upstash Redis is optional for initial launch

---

## Vercel Account Setup

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account (recommended)
3. This enables automatic deployments from GitHub

### Step 2: Install Vercel GitHub App

1. During signup, Vercel will prompt to install GitHub App
2. Grant access to your repository
3. If you skipped this, go to: Settings > Git > Configure GitHub App

### Step 3: Import Project

1. Click "Add New Project" from Vercel dashboard
2. Select your GitHub repository
3. **CRITICAL**: Configure root directory

---

## Project Configuration

### Build Settings

**Root Directory**: `techtrain-courses` ⚠️ **CRITICAL**

The application is in a subdirectory, not the repository root. Vercel must know this.

```
Framework Preset: Next.js (auto-detected)
Root Directory: techtrain-courses
Build Command: npm run build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
Node.js Version: 18.x (or latest LTS)
```

### Environment Variables Configuration

In Vercel Dashboard > Project Settings > Environment Variables, add each variable:

| Name | Value | Environment | Sensitive |
|------|-------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://...supabase.co` | Production | ❌ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Production | ❌ |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Production | ✅ |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Production | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Production | ❌ |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production | ✅ |
| `RESEND_API_KEY` | `re_...` | Production | ✅ |
| `UPSTASH_REDIS_REST_URL` | `https://...upstash.io` | Production | ❌ |
| `UPSTASH_REDIS_REST_TOKEN` | `...` | Production | ✅ |
| `NEXT_PUBLIC_APP_URL` | `https://techtrain.nl` | Production | ❌ |

**Important**:
- Check "✓ Sensitive" for all secret keys (will be hidden in logs)
- Only add to "Production" environment initially
- Add to "Preview" later for staging tests
- Never add production keys to "Development"

---

## Deployment Process

### Step 1: Trigger First Deployment

**Option A: From Vercel Dashboard**
1. Go to Deployments tab
2. Click "Deploy" or "Redeploy"
3. Monitor build logs in real-time

**Option B: From Git (Recommended)**
```bash
git add .
git commit -m "fix: wrap login page in Suspense boundary for production build"
git push origin feature/course-platform-setup
```

Vercel automatically deploys on push.

### Step 2: Monitor Deployment

Watch for these stages:
```
✓ Queued
✓ Building
  - Running "npm install"
  - Running "npm run build"
  - Creating optimized production build
  - Linting and checking validity of types
  - Collecting page data
  - Generating static pages
  - Finalizing page optimization
✓ Deploying
✓ Ready
```

**Expected Build Time**: 3-5 minutes

### Step 3: Verify Deployment

Once deployed, Vercel provides a URL: `https://your-app-name.vercel.app`

Test:
1. ✅ Homepage loads
2. ✅ Course catalog accessible
3. ✅ Course detail pages work
4. ✅ Images load correctly
5. ✅ Forms display properly
6. ⚠️ Authentication (requires Supabase config)
7. ⚠️ Enrollment (requires Supabase config)

---

## Post-Deployment Configuration

### Update Supabase Authentication URLs

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Update:
   - **Site URL**: `https://techtrain.nl` (or your Vercel URL)
   - **Redirect URLs**:
     - `https://techtrain.nl/auth/callback`
     - `https://techtrain.nl/auth/confirm`
     - `https://your-app-name.vercel.app/auth/callback` (for Vercel preview)
     - `https://your-app-name.vercel.app/auth/confirm`

### Test Authentication Flow

1. Visit `/register`
2. Create test account
3. Check email for verification
4. Complete email verification
5. Test login at `/login`
6. Verify dashboard access

---

## Custom Domain Setup

### Option 1: Use Vercel DNS (Recommended)

**Step 1: Add Domain in Vercel**
1. Go to Project Settings > Domains
2. Click "Add Domain"
3. Enter: `techtrain.nl`
4. Click "Add"

**Step 2: Update Nameservers at Registrar**
1. Go to your domain registrar (TransIP, Versio, GoDaddy, etc.)
2. Update nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Save changes

**Step 3: Wait for DNS Propagation**
- Initial propagation: 1-24 hours
- Full propagation: up to 48 hours
- Check status: [dnschecker.org](https://dnschecker.org)

**Step 4: SSL Certificate**
- Vercel automatically provisions SSL via Let's Encrypt
- Certificate auto-renews every 90 days
- HTTPS enforced automatically

### Option 2: Keep Existing DNS (CNAME Method)

**If you want to keep your current DNS provider:**

Add these records:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

### Add www Subdomain

1. In Vercel, add domain: `www.techtrain.nl`
2. Configure redirect: `www.techtrain.nl` → `techtrain.nl`
3. Vercel handles this automatically

---

## External Services Configuration

### Stripe Webhook Configuration

**Step 1: Create Webhook Endpoint**
1. Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter URL: `https://techtrain.nl/api/webhooks/stripe`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click "Add endpoint"

**Step 2: Update Webhook Secret**
1. Copy the webhook signing secret (starts with `whsec_`)
2. Update in Vercel: Environment Variables > `STRIPE_WEBHOOK_SECRET`
3. Redeploy: Deployments > Click ••• > Redeploy

**Step 3: Test Webhook**
1. Use Stripe CLI or test payment
2. Check Vercel logs for webhook events

### Resend Domain Verification

**Step 1: Add Domain**
1. Go to [Resend Dashboard > Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `techtrain.nl`

**Step 2: Configure DNS Records**

Add these records at your DNS provider:

```
# SPF Record
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

# DKIM Records (Resend will provide specific values)
Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

# DMARC Record
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@techtrain.nl
```

**Step 3: Verify Domain**
1. Click "Verify" in Resend dashboard
2. Wait for DNS propagation (up to 48 hours)
3. Once verified, emails will send from `@techtrain.nl`

---

## Monitoring & Analytics

### Enable Vercel Analytics

**Step 1: Enable in Dashboard**
1. Go to Vercel Dashboard > Analytics tab
2. Enable Web Analytics (free tier)
3. Enable Speed Insights (free tier)

**Step 2: Install Dependencies**
```bash
cd techtrain-courses
npm install @vercel/analytics @vercel/speed-insights
```

**Step 3: Update Root Layout**

Edit `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Step 4: Deploy Changes**
```bash
git add .
git commit -m "feat: add Vercel Analytics and Speed Insights"
git push
```

### Set Up Error Monitoring (Optional)

**Option A: Sentry (Recommended)**
```bash
cd techtrain-courses
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Add Sentry DSN to Vercel environment variables.

**Option B: Vercel Built-in Monitoring**
- View errors: Vercel Dashboard > Logs
- Real-time error tracking included
- Stack traces available

### Configure Uptime Monitoring

**Option A: Vercel Cron Jobs** (for health checks)

Create `vercel.json` in `techtrain-courses/`:
```json
{
  "crons": [
    {
      "path": "/api/health",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Option B: UptimeRobot (Free)**
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add monitor: `https://techtrain.nl`
3. Check every 5 minutes
4. Email alerts on downtime

---

## CI/CD Pipeline

### Automatic Deployments

Vercel automatically deploys on:
- **Push to master**: Production deployment
- **Push to feature branches**: Preview deployment
- **Pull requests**: Preview deployment with comment

### Configure Deployment Settings

In Vercel Dashboard > Git:
- ✓ Production Branch: `master`
- ✓ Preview Branches: All branches
- ✓ Comment on Pull Requests
- ✓ Auto-assign custom domains to production

### GitHub Actions for Tests (Optional)

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [master, feature/**]
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: techtrain-courses/package-lock.json

      - name: Install dependencies
        run: |
          cd techtrain-courses
          npm ci

      - name: Run linter
        run: |
          cd techtrain-courses
          npm run lint

      - name: Build
        run: |
          cd techtrain-courses
          npm run build
```

---

## Troubleshooting

### Build Errors

**Error**: `Module not found`
- **Fix**: Check import paths, ensure `@/*` alias works in `tsconfig.json`

**Error**: `Environment variable not defined`
- **Fix**: Add missing variables in Vercel Dashboard > Settings > Environment Variables
- **Fix**: Redeploy after adding variables

**Error**: `TypeScript errors`
- **Fix**: Run `npm run build` locally, fix errors, commit, push

**Error**: `useSearchParams() should be wrapped in a suspense boundary`
- **Fix**: ✅ Already fixed in `/login` page
- **Pattern**: Wrap components using `useSearchParams()` in `<Suspense>`

### Runtime Errors

**Error**: `Supabase connection failed`
- **Verify**: Environment variables are set correctly in Vercel
- **Check**: `NEXT_PUBLIC_SUPABASE_URL` is accessible
- **Check**: `SUPABASE_SERVICE_ROLE_KEY` is correct (no extra spaces)

**Error**: `Stripe webhook signature invalid`
- **Fix**: Update `STRIPE_WEBHOOK_SECRET` with production webhook secret
- **Verify**: Webhook URL matches exactly (no trailing slash)

**Error**: `Rate limit errors`
- **Fix**: Verify Upstash Redis credentials
- **Workaround**: Comment out rate limiting for initial launch

### Performance Issues

**Slow page loads**
- Enable Edge Runtime for API routes (add `export const runtime = 'edge'`)
- Optimize images (ensure using `next/image`)
- Enable ISR for course pages (add `export const revalidate = 3600`)
- Check bundle size: `npm run build` shows sizes

**High error rate**
- Check Vercel logs: Dashboard > Logs
- Review Sentry errors (if configured)
- Verify RLS policies aren't blocking legitimate requests

### Deployment Not Triggering

**Issue**: Push to Git but Vercel doesn't deploy
- **Check**: Vercel GitHub App is installed
- **Check**: Repository is connected in Vercel
- **Fix**: Trigger manual deployment from Vercel Dashboard

---

## Final Pre-Launch Checklist

### Technical
- [ ] Production build successful locally
- [ ] All environment variables configured in Vercel
- [ ] Supabase production database populated
- [ ] Supabase redirect URLs updated
- [ ] Stripe webhook configured
- [ ] Resend domain verified
- [ ] Custom domain configured (SSL active)
- [ ] Analytics installed
- [ ] Error monitoring active

### Testing
- [ ] Registration flow works
- [ ] Login flow works
- [ ] Course catalog loads
- [ ] Course detail pages work
- [ ] Enrollment flow tested (test mode)
- [ ] Payment tested (Stripe test mode)
- [ ] Email sending works
- [ ] Mobile responsive verified
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

### Content
- [ ] All Dutch content proofread
- [ ] Privacy policy updated
- [ ] Terms & conditions updated
- [ ] Contact information accurate
- [ ] All placeholder text replaced

### Security
- [ ] Supabase service role key rotated
- [ ] No credentials in git history review
- [ ] RLS policies tested
- [ ] HTTPS enforced
- [ ] Sensitive env vars marked in Vercel

### Go Live
- [ ] Switch Stripe from test mode to live mode
- [ ] Update Stripe webhook to production URL
- [ ] Announce launch
- [ ] Monitor error rates for first 24 hours

---

## Success Metrics

After deployment, monitor:
- **Uptime**: Target 99.9%
- **Performance**: < 500ms average page load
- **Errors**: < 0.1% error rate
- **Core Web Vitals**:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

---

## Next Steps After Launch

### Week 1
- Monitor error rates daily
- Respond to user feedback
- Fix critical bugs immediately
- Verify payment processing (live mode)

### Week 2-4
- Optimize based on analytics
- Improve slow pages
- Add admin CRUD operations
- Implement testing infrastructure

### Ongoing
- Monthly security audits
- Quarterly dependency updates
- Regular performance reviews
- User feedback implementation

---

## Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel Analytics**: https://vercel.com/analytics
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs

---

**Status**: Ready for deployment 🚀

**Last Build**: Successful ✅
**Environment Variables**: Documented ✅
**Database Schema**: Ready ✅
**External Services**: Documented ✅

---

**Deployment is the beginning, not the end. Monitor closely, iterate quickly, and keep improving!**
