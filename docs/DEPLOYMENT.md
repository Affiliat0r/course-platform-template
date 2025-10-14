# Deployment Guide

Guide for deploying your course platform to production.

## Overview

This template is optimized for deployment on **Vercel**, but can also be deployed to other platforms that support Next.js.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ Tested locally with production build (`npm run build`)
- ✅ All tests passing (`npm test`)
- ✅ Environment variables ready for production
- ✅ Database hosted and accessible
- ✅ Stripe account in live mode
- ✅ Domain name (optional, Vercel provides one)

## Vercel Deployment (Recommended)

### 1. Prepare Your Repository

Ensure code is pushed to GitHub:

\`\`\`bash
# Using Claude Code command
/gh-create-repo

# Or manually
git add .
git commit -m "chore: prepare for deployment"
git push origin main
\`\`\`

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository

### 3. Configure Build Settings

Vercel auto-detects Next.js. Verify settings:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4. Set Environment Variables

Add these in Vercel project settings:

\`\`\`env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# NextAuth.js
NEXTAUTH_SECRET=<generate-new-for-production>
NEXTAUTH_URL=https://yourdomain.com

# Stripe (LIVE KEYS)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (if using)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@yourdomain.com

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=Your Course Platform
NODE_ENV=production
\`\`\`

**Important:**
- Generate NEW `NEXTAUTH_SECRET` for production: `openssl rand -base64 32`
- Use Stripe **live keys**, not test keys
- Update `NEXTAUTH_URL` to production domain

### 5. Deploy

Click "Deploy"

Vercel will:
1. Clone repository
2. Install dependencies
3. Run `npm run build`
4. Deploy to CDN

First deployment takes ~2-3 minutes.

### 6. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable

### 7. Set Up Database

**Option 1: Vercel Postgres**

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Create Postgres database
vercel postgres create

# Link to project
vercel link

# Get DATABASE_URL
vercel env pull .env.production
\`\`\`

**Option 2: External Provider**

Use hosted PostgreSQL:
- Supabase
- Neon
- Railway
- AWS RDS

Update `DATABASE_URL` environment variable in Vercel.

### 8. Run Database Migrations

**From local machine:**

\`\`\`bash
# Set production DATABASE_URL
export DATABASE_URL="postgresql://..."

# Run migrations
npm run db:migrate:deploy

# Seed database (optional)
npm run db:seed
\`\`\`

**Or using Vercel CLI:**

\`\`\`bash
vercel env pull .env.production
npx prisma migrate deploy
\`\`\`

### 9. Configure Stripe Webhooks

1. Go to [Stripe Webhooks Dashboard](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://yourdomain.com/api/payments/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy **Signing secret**
5. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
6. Redeploy

### 10. Test Production Deployment

1. Visit your production URL
2. Test course enrollment flow
3. Test payment with Stripe test card (if still in test mode)
4. Verify webhooks work (check Stripe Dashboard)
5. Test user authentication

### 11. Enable Live Mode (Stripe)

Once tested:

1. Switch Stripe to live mode
2. Update environment variables with live keys
3. Test with real payment (small amount)
4. Monitor Stripe Dashboard for payments

## CI/CD with GitHub Actions

This template includes automated CI/CD pipelines.

### Workflows Included

1. **test.yml** - Runs on every PR
   - Type checking
   - Linting
   - Unit tests
   - Build verification

2. **e2e-test.yml** - Runs on every PR
   - Playwright E2E tests
   - Accessibility tests

3. **preview-deploy.yml** - Runs on PR
   - Deploys preview to Vercel
   - Comments preview URL on PR

4. **production-deploy.yml** - Runs on push to main
   - Deploys to production
   - Runs smoke tests

### Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

\`\`\`
VERCEL_TOKEN              # From vercel.com/account/tokens
VERCEL_ORG_ID             # From .vercel/project.json
VERCEL_PROJECT_ID         # From .vercel/project.json
STRIPE_TEST_SECRET_KEY    # For CI tests
STRIPE_TEST_PUBLISHABLE_KEY
\`\`\`

### Get Vercel IDs

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Get IDs from .vercel/project.json
cat .vercel/project.json
\`\`\`

## Alternative Deployment Platforms

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Set environment variables
5. Enable Next.js runtime

### Railway

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add PostgreSQL
railway add postgresql

# Deploy
railway up
\`\`\`

### Docker

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Build and run:

\`\`\`bash
docker build -t course-platform .
docker run -p 3000:3000 --env-file .env course-platform
\`\`\`

## Post-Deployment

### 1. Monitor Application

- **Vercel Dashboard:** Analytics, errors, logs
- **Stripe Dashboard:** Payments, webhooks
- **Database:** Connection pools, query performance

### 2. Set Up Error Tracking

Install Sentry (optional):

\`\`\`bash
npm install @sentry/nextjs

npx @sentry/wizard -i nextjs
\`\`\`

### 3. Configure Email Notifications

Set up transactional emails:
- Enrollment confirmations
- Password resets
- Course updates

Providers:
- [Resend](https://resend.com/)
- [SendGrid](https://sendgrid.com/)
- [Postmark](https://postmarkapp.com/)

### 4. SEO Optimization

1. Submit sitemap to Google Search Console
   - Sitemap URL: `https://yourdomain.com/sitemap.xml`

2. Add Google Analytics (optional)
   - Update `NEXT_PUBLIC_GA_MEASUREMENT_ID`

3. Verify robots.txt
   - URL: `https://yourdomain.com/robots.txt`

### 5. Performance Monitoring

Monitor Core Web Vitals:
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- Lighthouse CI (in GitHub Actions)

### 6. Backups

**Database Backups:**

Most hosted databases have automatic backups. Verify:
- Backup frequency (daily recommended)
- Retention period
- Restore process

**Manual backup:**

\`\`\`bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
\`\`\`

## Scaling

### Database Scaling

- **Connection Pooling:** Use PgBouncer or Prisma Accelerate
- **Read Replicas:** For high-traffic sites
- **Caching:** Redis for session/query caching

### Application Scaling

Vercel scales automatically, but consider:

- **Edge Caching:** Configure Next.js caching
- **Image Optimization:** Use Next.js Image component
- **API Rate Limiting:** Implement rate limiting

### Cost Optimization

- Monitor Vercel usage (function invocations, bandwidth)
- Optimize database queries (use Prisma query logging)
- Use incremental static regeneration (ISR) for course pages
- Implement CDN for video content

## Troubleshooting

### Build Fails on Vercel

\`\`\`
Error: Cannot find module...
\`\`\`

**Solution:**
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to reproduce
- Check Node.js version matches (18.18+)

### Database Connection Error

\`\`\`
Error: Can't reach database server
\`\`\`

**Solution:**
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Use connection pooling for serverless

### Stripe Webhooks Failing

\`\`\`
Error: No signatures found
\`\`\`

**Solution:**
- Verify `STRIPE_WEBHOOK_SECRET` is set
- Check webhook endpoint URL is correct
- Monitor Stripe Dashboard → Webhooks → Attempts

### Environment Variables Not Working

**Solution:**
- Redeploy after adding variables
- Check variable names match exactly
- Verify production vs preview environments

## Security Checklist

Before going live:

- ✅ HTTPS enabled (automatic on Vercel)
- ✅ Environment secrets not exposed to client
- ✅ NEXTAUTH_SECRET is strong and unique
- ✅ Database uses strong password
- ✅ Stripe webhooks verify signatures
- ✅ CORS configured properly
- ✅ Rate limiting enabled (optional)
- ✅ Security headers configured (see next.config.js)

## Maintenance

### Regular Updates

\`\`\`bash
# Update dependencies monthly
npm update

# Check for security vulnerabilities
npm audit

# Update major versions carefully
npm outdated
\`\`\`

### Database Maintenance

- Monitor query performance
- Review slow queries
- Optimize indexes
- Clean up old data

### Monitoring Checklist

Weekly:
- Check error logs
- Review payment failures
- Monitor uptime

Monthly:
- Review analytics
- Check Core Web Vitals
- Update dependencies
- Database backups verified

## Rollback Procedure

If deployment fails:

### Vercel

1. Go to Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

### Database

\`\`\`bash
# Rollback last migration
npx prisma migrate resolve --rolled-back <migration-name>
\`\`\`

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Production Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Stripe Production Checklist](https://stripe.com/docs/payments/checkout/production-checklist)
