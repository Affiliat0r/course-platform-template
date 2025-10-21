# Production Deployment Checklist

**Project**: TechTrain Course Platform
**Last Updated**: 2025-10-21
**Status**: Pre-Production

Use this checklist to ensure safe, secure, and successful production deployment.

---

## Phase 1: Security Audit ✅

### Credential Security
- [ ] Development Supabase service role key has been reset
- [ ] All passwords are 16+ characters with special chars
- [ ] All secrets stored in password manager (LastPass, 1Password, etc.)
- [ ] `.env.local` is in `.gitignore` (verify with `git status`)
- [ ] `.env.production` is in `.gitignore`
- [ ] No credentials in git history (verify with `git log --all`)
- [ ] No credentials in committed code (verify with grep)

### Git Repository Audit
```bash
# Check for exposed credentials
git log --all --full-history --source -- "*env*"
git log --all --oneline --grep="sb_secret\|eyJ"

# Verify .gitignore
cat .gitignore | grep -E "\.env|secret|key"

# Check for exposed keys in code
grep -r "sb_secret\|eyJ" --exclude-dir=node_modules --exclude-dir=.git
```

**Expected**: No results found ✅

---

## Phase 2: Database Migration 🗄️

### Pre-Migration Setup
- [ ] Production Supabase project created (`techtrain-production`)
- [ ] Production database region selected (EU-central-1 for Netherlands)
- [ ] Production database password stored in password manager
- [ ] Database schema deployed to production (`supabase/schema.sql`)
- [ ] All 7 tables created (courses, course_schedules, enrollments, payments, profiles, reviews, wishlists)
- [ ] RLS policies enabled on all tables
- [ ] Test Supabase project created for dry-run testing

### Migration Execution
- [ ] Dry-run migration completed successfully (`DRY_RUN=true`)
- [ ] Test migration completed on test project
- [ ] Test data verified (79 courses, 237 schedules)
- [ ] Production migration completed with confirmation
- [ ] Production data verified with SQL verification script
- [ ] No duplicate slugs detected
- [ ] All courses have schedules (3 per course)
- [ ] Test Supabase project deleted after verification

### Migration Verification
```bash
# Run verification script in Supabase SQL Editor
cat supabase/verify-migration.sql
```

**Expected Results**:
- ✅ 79 courses
- ✅ 237 schedules
- ✅ 0 duplicate slugs
- ✅ All courses have 3 schedules
- ✅ No NULL values in required fields

---

## Phase 3: Environment Configuration 🔧

### Environment Files
- [ ] `.env.local.example` exists in repository
- [ ] `.env.production.example` exists in repository
- [ ] `.env.production` created locally (not committed)
- [ ] All production credentials filled in `.env.production`
- [ ] Development `.env.local` backed up before testing

### Required Environment Variables

**Supabase** (REQUIRED):
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (production project URL)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (safe for client-side)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (⚠️ server-side only)

**Application** (REQUIRED):
- [ ] `NEXT_PUBLIC_APP_URL` (production domain, e.g., https://techtrain.nl)

**Stripe** (OPTIONAL - for payments):
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_SECRET_KEY` (⚠️ secret)
- [ ] `STRIPE_WEBHOOK_SECRET` (⚠️ secret)

**Email** (OPTIONAL):
- [ ] `RESEND_API_KEY` or `SENDGRID_API_KEY`

**Analytics** (OPTIONAL):
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] `NEXT_PUBLIC_SENTRY_DSN`

---

## Phase 4: Supabase Configuration ⚙️

### Database Settings
- [ ] Database backups enabled (automatic on Pro plan)
- [ ] Point-in-Time Recovery (PITR) enabled (Pro plan)
- [ ] SSL enforcement enabled
- [ ] Connection pooling configured (if high traffic expected)

### Authentication Settings
- [ ] Site URL configured: `https://techtrain.nl`
- [ ] Redirect URLs configured:
  - [ ] `https://techtrain.nl/auth/callback`
  - [ ] `https://techtrain.nl/auth/confirm`
  - [ ] `http://localhost:3000/auth/callback` (for local testing)
- [ ] Email templates configured (Dutch):
  - [ ] Confirmation email
  - [ ] Password reset email
  - [ ] Magic link email
- [ ] Email rate limiting configured
- [ ] Custom SMTP configured (optional, better deliverability)

### Security Settings
- [ ] MFA enabled on Supabase account
- [ ] Service role key marked as "Production" in dashboard
- [ ] API rate limiting enabled
- [ ] Database roles and permissions reviewed
- [ ] RLS policies tested with anonymous user

Test RLS policies:
```sql
-- Run as anonymous user
SET ROLE anon;
SELECT * FROM courses WHERE is_published = true;  -- Should work
DELETE FROM courses WHERE id = 'some-id';  -- Should fail
RESET ROLE;
```

---

## Phase 5: Application Testing 🧪

### Local Testing with Production DB
- [ ] Next.js app connects to production Supabase
- [ ] Homepage loads courses correctly
- [ ] Course listing page shows all 79 courses
- [ ] Course detail pages load correctly
- [ ] Search functionality works
- [ ] Filtering works (category, level, language)
- [ ] Course images load correctly
- [ ] No console errors in browser
- [ ] Development credentials restored after testing

### Authentication Flow Testing
- [ ] User registration works
- [ ] Email confirmation received (Dutch)
- [ ] User login works
- [ ] Password reset flow works
- [ ] Password reset email received (Dutch)
- [ ] Session persistence works (refresh page)
- [ ] Logout works

### Frontend Build Testing
```bash
cd techtrain-courses
npm run build
npm run start
```

- [ ] Build completes without errors
- [ ] Production build runs locally
- [ ] No hydration errors
- [ ] All pages accessible

---

## Phase 6: Performance Optimization ⚡

### Image Optimization
- [ ] All hero images compressed (use TinyPNG or similar)
- [ ] Course thumbnails optimized (WebP format)
- [ ] `next/image` used for all images
- [ ] Lazy loading enabled for below-fold images
- [ ] Blur placeholders configured

### Code Optimization
- [ ] Large course descriptions file optimized (~177KB)
- [ ] Code splitting for admin dashboard
- [ ] Unused dependencies removed (`npm prune`)
- [ ] Bundle size analyzed (`npm run build` - check output)

### Caching Strategy
- [ ] Static pages use ISR (Incremental Static Regeneration)
- [ ] Course pages revalidate every hour
- [ ] API routes have proper cache headers
- [ ] Stale-while-revalidate configured for course catalog

### Performance Testing
- [ ] Lighthouse audit: Performance > 90
- [ ] Lighthouse audit: Accessibility > 90
- [ ] Lighthouse audit: Best Practices > 90
- [ ] Lighthouse audit: SEO > 90
- [ ] Core Web Vitals: All "Good"
- [ ] Load time < 3 seconds (homepage)
- [ ] Time to Interactive < 5 seconds

---

## Phase 7: SEO Configuration 🔍

### Meta Tags
- [ ] `robots.txt` created and configured
- [ ] `sitemap.xml` generated dynamically
- [ ] Canonical URLs configured on all pages
- [ ] Open Graph tags added (for social sharing)
- [ ] Twitter Card tags added
- [ ] Meta descriptions optimized (155 chars, Dutch)

### Structured Data
- [ ] JSON-LD for courses (Schema.org Course type)
- [ ] JSON-LD for organization
- [ ] Breadcrumb structured data
- [ ] Rich results tested (Google Rich Results Test)

### Search Console
- [ ] Google Search Console configured
- [ ] Sitemap submitted to Google
- [ ] Bing Webmaster Tools configured
- [ ] Sitemap submitted to Bing

---

## Phase 8: Security Hardening 🔒

### Application Security
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Security headers configured:
  - [ ] Content-Security-Policy (CSP)
  - [ ] X-Frame-Options: DENY
  - [ ] X-Content-Type-Options: nosniff
  - [ ] Referrer-Policy: strict-origin-when-cross-origin
  - [ ] Permissions-Policy configured
- [ ] CORS headers configured correctly
- [ ] CSRF protection enabled on forms
- [ ] Rate limiting on API routes
- [ ] Rate limiting on auth endpoints
- [ ] Input validation on all forms (Zod schemas)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React escapes by default, verify)

### Password Requirements
- [ ] Minimum 8 characters enforced
- [ ] Password complexity requirements enabled
- [ ] Password reset rate limiting enabled
- [ ] Session timeout configured (30 minutes recommended)

### API Security
- [ ] Service role key never exposed to client
- [ ] API routes validate authentication
- [ ] API routes validate authorization
- [ ] Error messages don't leak sensitive info

---

## Phase 9: Monitoring & Logging 📊

### Error Monitoring
- [ ] Sentry configured (or alternative)
- [ ] Error alerts configured
- [ ] Source maps uploaded for better error tracking
- [ ] User feedback mechanism added

### Analytics
- [ ] Google Analytics 4 installed
- [ ] Event tracking configured:
  - [ ] Course views
  - [ ] Course searches
  - [ ] Enrollment clicks
  - [ ] Payment completions
- [ ] Conversion goals configured

### Uptime Monitoring
- [ ] UptimeRobot configured (or alternative)
- [ ] Health check endpoint created (`/api/health`)
- [ ] Uptime alerts configured (email/SMS)
- [ ] Response time alerts configured

### Database Monitoring
- [ ] Supabase dashboard logs enabled
- [ ] Query performance monitoring enabled
- [ ] Slow query alerts configured
- [ ] Database usage alerts configured

---

## Phase 10: Legal & Compliance ⚖️

### Privacy & Terms
- [ ] Privacy Policy page complete and accurate
- [ ] Terms & Conditions page complete
- [ ] Cookie consent banner implemented (GDPR)
- [ ] Cookie policy page created
- [ ] Data processing agreement documented

### GDPR Compliance (Dutch/EU law)
- [ ] Right to access implemented (user can view their data)
- [ ] Right to deletion implemented (user can delete account)
- [ ] Right to data portability implemented (export user data)
- [ ] Data retention policy documented
- [ ] Data breach notification procedure documented
- [ ] Privacy policy mentions:
  - [ ] What data is collected
  - [ ] How data is used
  - [ ] How data is stored
  - [ ] Third-party services (Supabase, Stripe, etc.)
  - [ ] User rights under GDPR

### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] Accessibility statement published
- [ ] Skip links to main content
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works throughout
- [ ] Screen reader tested (NVDA or JAWS)

---

## Phase 11: Content & Design ✨

### Content Review
- [ ] All Dutch content proofread by native speaker
- [ ] All placeholder text replaced
- [ ] All Lorem Ipsum removed
- [ ] Contact information accurate
- [ ] Company information accurate
- [ ] Instructor bios accurate
- [ ] Course descriptions accurate

### Design Consistency
- [ ] Logo correct and high-quality
- [ ] Brand colors consistent throughout
- [ ] Typography consistent
- [ ] Favicon added (multiple sizes)
- [ ] Apple touch icons added
- [ ] Social media preview images configured

### Error Pages
- [ ] 404 page styled and helpful
- [ ] 500 page styled and helpful
- [ ] Error boundary pages tested
- [ ] All error pages in Dutch

---

## Phase 12: Payment Integration 💳

### Stripe Configuration (if implemented)
- [ ] Stripe account created
- [ ] Business information verified
- [ ] Bank account connected
- [ ] iDEAL payment method enabled (for Dutch customers)
- [ ] Live mode API keys generated
- [ ] Webhook endpoint configured: `https://techtrain.nl/api/webhooks/stripe`
- [ ] Webhook signature verification implemented
- [ ] Webhook events tested (test mode)
- [ ] Payment confirmation emails configured (Dutch)
- [ ] Invoice generation implemented
- [ ] Invoice storage configured (Supabase Storage)
- [ ] Refund process documented
- [ ] Failed payment handling implemented

### Payment Testing
- [ ] Test mode payment successful
- [ ] iDEAL test payment successful
- [ ] Credit card test payment successful
- [ ] Payment webhook receives events
- [ ] Enrollment created on successful payment
- [ ] Confirmation email sent
- [ ] Invoice generated and stored

---

## Phase 13: Deployment 🚀

### Pre-Deployment
- [ ] All code committed to git
- [ ] All code pushed to GitHub
- [ ] `.env.local` not in repository
- [ ] `.env.production` not in repository
- [ ] Production branch created (if using separate branch)

### Vercel Deployment (Recommended)

**Account Setup**:
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel

**Environment Variables** (add in Vercel dashboard):
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (production)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (production)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (mark as sensitive)
- [ ] `NEXT_PUBLIC_APP_URL` (production domain)
- [ ] `STRIPE_SECRET_KEY` (mark as sensitive, if using Stripe)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (if using Stripe)
- [ ] `STRIPE_WEBHOOK_SECRET` (mark as sensitive, if using Stripe)
- [ ] Any other required variables

**Build Configuration**:
- [ ] Framework preset: Next.js
- [ ] Build command: `cd techtrain-courses && npm run build`
- [ ] Output directory: `techtrain-courses/.next`
- [ ] Install command: `npm install`
- [ ] Node.js version: 18.x or 20.x

**Domain Configuration**:
- [ ] Custom domain added (techtrain.nl)
- [ ] DNS configured (A/CNAME records)
- [ ] SSL certificate issued (automatic with Vercel)
- [ ] Domain verified and working

### Post-Deployment Verification
- [ ] Site loads at production URL
- [ ] HTTPS working correctly
- [ ] All pages accessible
- [ ] Course listing works
- [ ] Course detail pages work
- [ ] Search works
- [ ] Authentication works
- [ ] User registration works
- [ ] Email confirmation received
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

---

## Phase 14: Post-Launch Monitoring 👁️

### First 24 Hours
- [ ] Monitor error rates in Sentry
- [ ] Monitor uptime in UptimeRobot
- [ ] Monitor database performance in Supabase
- [ ] Monitor server logs in Vercel
- [ ] Check for any user-reported issues
- [ ] Verify email deliverability
- [ ] Check analytics for traffic

### First Week
- [ ] Review Core Web Vitals in Search Console
- [ ] Review user feedback
- [ ] Monitor database growth
- [ ] Check for slow queries
- [ ] Review error logs
- [ ] Analyze user behavior in analytics
- [ ] Adjust caching strategy if needed

### Ongoing
- [ ] Weekly database backups verified
- [ ] Monthly security audit
- [ ] Monthly dependency updates (`npm outdated`)
- [ ] Monthly performance audit
- [ ] Quarterly accessibility audit
- [ ] Quarterly GDPR compliance review

---

## Phase 15: Rollback Plan 🔄

### If Deployment Fails
1. **Immediate Actions**:
   - [ ] Revert Vercel deployment to previous version
   - [ ] Or disable production environment in Vercel
   - [ ] Display maintenance page
   - [ ] Notify users via email/social media

2. **Investigate**:
   - [ ] Check Vercel deployment logs
   - [ ] Check browser console errors
   - [ ] Check Sentry error reports
   - [ ] Check Supabase logs

3. **Fix and Redeploy**:
   - [ ] Fix issue in development
   - [ ] Test thoroughly
   - [ ] Deploy to staging (if available)
   - [ ] Redeploy to production

### If Database Migration Fails
1. **Rollback Database**:
   ```sql
   TRUNCATE course_schedules, courses CASCADE;
   ```
2. **Fix migration script**
3. **Re-run migration**
4. **Verify data integrity**

---

## Emergency Contacts 🆘

### Services
- **Supabase Support**: https://supabase.com/support
- **Vercel Support**: https://vercel.com/support
- **Stripe Support**: https://support.stripe.com

### Communities
- **Supabase Discord**: https://discord.supabase.com
- **Next.js Discord**: https://nextjs.org/discord
- **Vercel Discord**: https://vercel.com/discord

---

## Success Criteria 🎯

**Deployment is successful when**:
- ✅ Site loads at production URL with HTTPS
- ✅ All 79 courses display correctly
- ✅ Users can register and login
- ✅ Email confirmation works
- ✅ No critical errors in logs
- ✅ Performance scores > 90 in Lighthouse
- ✅ Uptime monitoring active
- ✅ Analytics tracking correctly
- ✅ Database backups configured
- ✅ All security headers configured
- ✅ GDPR compliance verified

**You're ready to launch!** 🚀

---

**Last Updated**: 2025-10-21
**Version**: 1.0
**Maintained By**: TechTrain Development Team
