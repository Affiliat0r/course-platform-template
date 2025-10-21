# TechTrain Deployment Checklist

**Quick reference for deploying to production**

---

## Pre-Deployment (Complete Locally)

### Build & Code Quality
- [x] `npm run build` succeeds without errors
- [x] No TypeScript compilation errors
- [x] Suspense boundaries in place for `useSearchParams()`
- [ ] Remove all `console.log()` statements
- [ ] Test all critical user flows locally

### Security
- [ ] **CRITICAL**: Rotate Supabase service role key (exposed in git history)
- [ ] Create new production Supabase project
- [ ] Prepare all environment variables
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Audit git history for any exposed secrets

### Content Review
- [ ] All Dutch content proofread
- [ ] Privacy policy reviewed and updated
- [ ] Terms & conditions reviewed and updated
- [ ] Contact information verified
- [ ] All placeholder text replaced

---

## Vercel Setup (30 minutes)

### Account & Project
- [ ] Create Vercel account (use GitHub login)
- [ ] Install Vercel GitHub App
- [ ] Import project from GitHub
- [ ] **CRITICAL**: Set Root Directory to `techtrain-courses`

### Build Configuration
```
Framework Preset: Next.js
Root Directory: techtrain-courses
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x
```

### Environment Variables
Add in Vercel Dashboard > Settings > Environment Variables:

**Required (Production Environment Only)**:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (mark as Sensitive ✓)
- [ ] `STRIPE_SECRET_KEY` (mark as Sensitive ✓)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET` (mark as Sensitive ✓)
- [ ] `RESEND_API_KEY` (mark as Sensitive ✓)
- [ ] `NEXT_PUBLIC_APP_URL`

**Optional (can add later)**:
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN` (mark as Sensitive ✓)

---

## Database Setup (1-2 hours)

### Supabase Production Project
- [ ] Create new project: `techtrain-production`
- [ ] Choose region: EU (Frankfurt or London)
- [ ] Save database password securely
- [ ] Wait for provisioning (5-10 minutes)

### Schema Deployment
- [ ] Open Supabase Dashboard > SQL Editor
- [ ] Paste contents of `supabase/schema.sql`
- [ ] Execute SQL
- [ ] Verify all tables created (7 tables)

### Data Migration
- [ ] Create `.env.production` with production credentials (DO NOT COMMIT)
- [ ] Run: `NODE_ENV=production npx tsx scripts/migrate-to-supabase.ts`
- [ ] Verify: 79 courses, 237 schedules migrated
- [ ] Run verification queries from `supabase/verify-migration.sql`

---

## First Deployment (15 minutes)

### Trigger Deployment
**Option A**: Push to GitHub
```bash
git add .
git commit -m "fix: production deployment preparation"
git push origin feature/course-platform-setup
```

**Option B**: Manual deploy from Vercel Dashboard
- Go to Deployments > Click "Deploy"

### Monitor Build
- [ ] Watch build logs in Vercel
- [ ] Verify build completes successfully (3-5 minutes)
- [ ] Note the deployment URL: `https://your-app.vercel.app`

### Initial Verification
Test the deployment URL:
- [ ] Homepage loads
- [ ] Course catalog accessible (`/courses`)
- [ ] Course detail page works
- [ ] Images load correctly
- [ ] Forms display properly

---

## Post-Deployment Configuration (1 hour)

### Supabase Authentication
In Supabase Dashboard > Authentication > URL Configuration:
- [ ] Site URL: `https://techtrain.nl` (or Vercel URL)
- [ ] Add redirect URL: `https://techtrain.nl/auth/callback`
- [ ] Add redirect URL: `https://techtrain.nl/auth/confirm`
- [ ] Add redirect URL: `https://your-app.vercel.app/auth/callback`
- [ ] Add redirect URL: `https://your-app.vercel.app/auth/confirm`

### Test Authentication
- [ ] Visit `/register` and create test account
- [ ] Check email for verification link
- [ ] Complete email verification
- [ ] Test login at `/login`
- [ ] Verify dashboard access

### Stripe Webhook
In Stripe Dashboard > Webhooks:
- [ ] Create webhook endpoint: `https://techtrain.nl/api/webhooks/stripe`
- [ ] Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
- [ ] Copy webhook signing secret
- [ ] Update Vercel env var: `STRIPE_WEBHOOK_SECRET`
- [ ] Redeploy application

### Resend Email Domain
In Resend Dashboard > Domains:
- [ ] Add domain: `techtrain.nl`
- [ ] Add SPF record to DNS
- [ ] Add DKIM record to DNS
- [ ] Add DMARC record to DNS
- [ ] Verify domain

---

## Custom Domain Setup (2-48 hours)

### Add Domain in Vercel
- [ ] Go to Project Settings > Domains
- [ ] Click "Add Domain"
- [ ] Enter: `techtrain.nl`
- [ ] Add: `www.techtrain.nl` (auto-redirects to main)

### Update DNS (Choose One)

**Option A: Vercel DNS (Recommended)**
At your domain registrar:
- [ ] Update nameservers to `ns1.vercel-dns.com`
- [ ] Update nameservers to `ns2.vercel-dns.com`

**Option B: CNAME Method**
Add DNS records:
- [ ] CNAME: `www` → `cname.vercel-dns.com`
- [ ] A: `@` → `76.76.21.21`

### Wait for Propagation
- [ ] Check status at [dnschecker.org](https://dnschecker.org)
- [ ] Wait for SSL certificate (automatic via Vercel)
- [ ] Verify HTTPS works

---

## Monitoring & Analytics (30 minutes)

### Vercel Analytics
- [ ] Enable Web Analytics in Vercel Dashboard
- [ ] Install: `npm install @vercel/analytics @vercel/speed-insights`
- [ ] Add to `app/layout.tsx`:
  ```typescript
  import { Analytics } from '@vercel/analytics/react'
  import { SpeedInsights } from '@vercel/speed-insights/next'
  ```
- [ ] Deploy changes

### Uptime Monitoring
**Option A**: Create Vercel cron job (`/api/health` every 5 minutes)
**Option B**: Set up UptimeRobot account

### Error Tracking (Optional)
- [ ] Install Sentry: `npx @sentry/wizard@latest -i nextjs`
- [ ] Add Sentry DSN to Vercel environment variables

---

## Final Testing (1 hour)

### Critical User Flows
- [ ] User registration → Email verification → Login
- [ ] Browse courses → Course detail → Enrollment
- [ ] Checkout → Payment (test mode) → Confirmation
- [ ] Email notifications received
- [ ] Admin dashboard accessible

### Cross-Platform Testing
- [ ] Desktop: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Chrome Mobile, Firefox Mobile
- [ ] Tablet: iPad, Android tablet

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Check Core Web Vitals:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

---

## Go Live (Production Mode)

### Enable Stripe Live Mode
**Only after thorough testing**:
- [ ] Go to Stripe Dashboard
- [ ] Toggle from Test Mode to Live Mode
- [ ] Update Vercel environment variables:
  - [ ] `STRIPE_SECRET_KEY` → live key (`sk_live_...`)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → live key (`pk_live_...`)
- [ ] Update webhook secret (create new webhook for production)
- [ ] Redeploy application

### Final Verification
- [ ] Test real payment with your own card
- [ ] Verify payment appears in Stripe Dashboard
- [ ] Verify enrollment created in database
- [ ] Verify confirmation email sent
- [ ] Monitor for first 24 hours

---

## Launch Announcement

### SEO & Discovery
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Update meta descriptions
- [ ] Add Open Graph tags for social sharing

### Marketing
- [ ] Announce on social media
- [ ] Email existing customers (if any)
- [ ] Update marketing materials with new domain

---

## Ongoing Maintenance

### Daily (First Week)
- [ ] Monitor error rates in Vercel Logs
- [ ] Check Sentry for exceptions
- [ ] Respond to user feedback
- [ ] Fix critical bugs immediately

### Weekly
- [ ] Review analytics and user behavior
- [ ] Optimize slow pages
- [ ] Update content as needed

### Monthly
- [ ] Security audit
- [ ] Performance review
- [ ] Dependency updates (`npm outdated`)
- [ ] Database backup verification

### Quarterly
- [ ] Major dependency updates
- [ ] Feature roadmap review
- [ ] User feedback implementation

---

## Emergency Rollback

If critical issues occur:

**Option 1**: Rollback in Vercel Dashboard
1. Go to Deployments
2. Find last working deployment
3. Click ••• > Promote to Production

**Option 2**: Revert Git commit
```bash
git revert HEAD
git push
```

**Option 3**: Environment variable issue
1. Update env var in Vercel Dashboard
2. Redeploy

---

## Support Resources

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)
- **Next.js Discord**: [nextjs.org/discord](https://nextjs.org/discord)
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)

---

## Status Tracking

**Current Status**: Ready for deployment ✅

**Completed**:
- [x] Production build successful
- [x] Suspense boundary issues fixed
- [x] Documentation created

**In Progress**:
- [ ] Environment variables preparation
- [ ] Vercel account setup

**Blocked**:
- None

---

**Total Estimated Time**: 6-8 hours (excluding DNS propagation wait time)

**Recommended Schedule**:
- **Day 1 Morning (2 hours)**: Pre-deployment prep, Vercel setup, environment variables
- **Day 1 Afternoon (2 hours)**: Database setup, first deployment
- **Day 1 Evening (2 hours)**: Post-deployment config, testing
- **Day 2-3**: DNS propagation, custom domain setup
- **Day 3 Evening (1 hour)**: Final testing, go live with Stripe live mode

---

**You're ready to deploy! Follow each section carefully and check off items as you complete them. Good luck! 🚀**
