# Production Database Migration Guide

**Status**: Ready for Execution
**Last Updated**: 2025-10-21
**Migration Tool**: Enhanced with production safety checks ✅

---

## Overview

This guide walks you through migrating the TechTrain course platform from development Supabase to production Supabase. The migration script has been enhanced with:

- ✅ Production environment detection and confirmation
- ✅ Dry-run mode for safe testing
- ✅ Database connection verification
- ✅ Detailed logging and error handling
- ✅ Duplicate detection warnings

---

## Prerequisites

Before starting, ensure you have:

- [ ] Supabase account with ability to create projects
- [ ] Development database with 79 courses and 237 schedules
- [ ] Password manager for storing production credentials
- [ ] Access to DNS settings (for production domain)
- [ ] 2-3 hours of uninterrupted time

---

## Phase 1: Security Audit ✅ COMPLETED

### Step 1: Git History Check ✅
```bash
# Check for exposed credentials in git history
git log --all --full-history --source -- "*env*"
git log --all --oneline --grep="sb_secret\|eyJ"
```

**Status**: ✅ No credentials found in git history
**Status**: ✅ `.env*.local` properly gitignored

### Step 2: Reset Development Keys (Action Required)

⚠️ **CRITICAL**: The production-db-migration-specialist.md mentions an exposed service role key:
- Key pattern: `sb_secret_0k5lN4D7L7Nf-SR5bLW7GA_AT0UufQX`

**Action Required**:
1. Log into Supabase dashboard: https://app.supabase.com
2. Select your development project
3. Go to **Project Settings > API**
4. Click **"Reset"** on Service Role Key
5. Copy new service role key immediately
6. Update `techtrain-courses/.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-new-service-role-key
   ```
7. Test that migration script still works:
   ```bash
   cd techtrain-courses
   DRY_RUN=true npx tsx scripts/migrate-to-supabase.ts
   ```

---

## Phase 2: Production Supabase Setup

### Step 3: Create Production Project

1. **Log into Supabase**: https://app.supabase.com
2. **Click "New Project"**
3. **Configure Project**:
   - **Name**: `techtrain-production`
   - **Database Password**: Generate strong password (save in password manager!)
   - **Region**: `eu-central-1` (closest to Netherlands)
   - **Pricing Plan**:
     - Free tier for testing/MVP
     - Pro plan ($25/month) recommended for production
4. **Wait 3-5 minutes** for project creation

### Step 4: Deploy Database Schema

1. **Open SQL Editor** in Supabase dashboard
2. **Load Schema File**: Copy contents from `techtrain-courses/supabase/schema.sql`
3. **Execute Schema**:
   - Paste schema into SQL Editor
   - Click "Run" to execute
   - Verify no errors
4. **Verify Tables Created**:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';
   ```
   Should return 7 tables:
   - `profiles`
   - `courses`
   - `course_schedules`
   - `enrollments`
   - `payments`
   - `wishlists`
   - `reviews`

5. **Verify RLS Policies**:
   ```sql
   SELECT schemaname, tablename, policyname
   FROM pg_policies
   WHERE schemaname = 'public';
   ```
   Should show multiple policies for each table

### Step 5: Get Production Credentials

1. **Go to Project Settings > API**
2. **Copy the following** (store in password manager):
   - **Project URL**: `https://your-production-project.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ⚠️ KEEP SECRET

3. **Create `.env.production`** (local only, not committed):
   ```bash
   cd techtrain-courses
   cp .env.local.example .env.production
   ```

4. **Edit `.env.production`**:
   ```env
   # Production Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
   NEXT_PUBLIC_APP_URL=https://techtrain.nl  # Your production domain
   ```

---

## Phase 3: Test Migration (Dry Run)

### Step 6: Create Test Supabase Project

1. **Create another project** in Supabase: `techtrain-test`
2. **Deploy schema** (same as production)
3. **Get test credentials**

### Step 7: Test Migration with Dry Run

First, test in dry-run mode (no database writes):

```bash
cd techtrain-courses

# Test with current development credentials
DRY_RUN=true npx tsx scripts/migrate-to-supabase.ts
```

Expected output:
```
============================================================
🚀 SUPABASE MIGRATION TOOL
============================================================
Environment: 🟢 DEVELOPMENT
Mode: 👁️  DRY RUN (no changes)
Courses to migrate: 79
============================================================

🔍 Verifying database connection...
✅ Connected to: https://zdvkyhpqttwdqrralhlc.supabase.co
📊 Current courses in database: 79

🚀 Starting migration...
📚 Found 79 courses to migrate

Migrating: Advanced TypeScript voor Professionals...
  👁️  Would create course: Advanced TypeScript voor Professionals
  👁️  Would create 3 schedules
...

📊 Migration Summary
✅ Courses created: 79
✅ Schedules created: 237
❌ Errors: 0
```

### Step 8: Test on Test Project

```bash
cd techtrain-courses

# Temporarily use test credentials
cp .env.production .env.local  # Backup your .env.local first!

# Run actual migration on test project
npx tsx scripts/migrate-to-supabase.ts
```

### Step 9: Verify Test Migration

1. **Log into test Supabase project**
2. **Check Table Editor**:
   - `courses` table: Should have 79 rows
   - `course_schedules` table: Should have 237 rows
3. **Run verification queries**:
   ```sql
   -- Count courses by category
   SELECT category, COUNT(*) as count
   FROM courses
   WHERE is_published = true
   GROUP BY category
   ORDER BY count DESC;

   -- Verify all courses have schedules
   SELECT c.title, COUNT(cs.id) as schedule_count
   FROM courses c
   LEFT JOIN course_schedules cs ON c.id = cs.course_id
   GROUP BY c.id, c.title
   HAVING COUNT(cs.id) < 3;  -- Should return 0 rows

   -- Check for duplicate slugs
   SELECT slug, COUNT(*) as count
   FROM courses
   GROUP BY slug
   HAVING COUNT(*) > 1;  -- Should return 0 rows
   ```

4. **If all checks pass**: ✅ Ready for production migration
5. **Delete test project** after verification

---

## Phase 4: Production Migration

### Step 10: Pre-Migration Checklist

Before migrating to production, verify:

- [ ] Production Supabase project created
- [ ] Production database schema deployed (7 tables)
- [ ] RLS policies enabled on all tables
- [ ] Production credentials saved in password manager
- [ ] `.env.production` file created locally
- [ ] Test migration completed successfully
- [ ] Development `.env.local` backed up

### Step 11: Production Migration

```bash
cd techtrain-courses

# Backup current .env.local
cp .env.local .env.local.backup

# Use production credentials
cp .env.production .env.local

# Run production migration with safety checks
NODE_ENV=production npx tsx scripts/migrate-to-supabase.ts
```

You will see:
```
============================================================
🚀 SUPABASE MIGRATION TOOL
============================================================
Environment: 🔴 PRODUCTION
Mode: ✍️  LIVE (will write data)
Courses to migrate: 79
============================================================

⚠️  WARNING: Running in PRODUCTION mode
This will migrate data to your production database.
Make sure you have:
  1. ✅ Backed up your production database
  2. ✅ Tested migration on a test/staging environment
  3. ✅ Verified your production credentials are correct

Type "CONFIRM" to proceed:
```

**Type "CONFIRM"** and press Enter to continue.

### Step 12: Monitor Migration Progress

Watch the output for:
- ✅ Green checkmarks for successful course/schedule creation
- ❌ Red X marks for errors
- Course IDs being assigned
- Final summary with counts

Expected output:
```
Migrating: Advanced TypeScript voor Professionals...
  ✅ Course created (ID: uuid-here)
  ✅ 3 schedules created
...

📊 Migration Summary
✅ Courses created: 79
✅ Schedules created: 237
❌ Errors: 0

✨ Migration completed!
```

### Step 13: Verify Production Migration

1. **Log into production Supabase dashboard**
2. **Table Editor > courses**: Should have 79 rows
3. **Table Editor > course_schedules**: Should have 237 rows
4. **Run verification queries** (same as test phase)
5. **Check data quality**:
   - No NULL values in required fields
   - All images/thumbnails valid
   - All slugs unique
   - All prices correct

---

## Phase 5: Configuration & Testing

### Step 14: Configure Auth Settings

1. **Go to Authentication > URL Configuration**
2. **Site URL**: `https://techtrain.nl`
3. **Redirect URLs** (add all):
   ```
   https://techtrain.nl/auth/callback
   https://techtrain.nl/auth/confirm
   http://localhost:3000/auth/callback
   ```
4. **Configure Email Templates** (Dutch):
   - Go to Authentication > Email Templates
   - Edit Confirmation email (Dutch)
   - Edit Password Reset email (Dutch)
   - Edit Magic Link email (Dutch)

### Step 15: Restore Development Environment

```bash
cd techtrain-courses

# Restore development credentials
cp .env.local.backup .env.local

# Or manually recreate .env.local with development credentials
```

Keep `.env.production` separate and secure!

### Step 16: Test Frontend Connection

Update Next.js app to use production Supabase (for testing):

```bash
cd techtrain-courses

# Temporarily use production
cp .env.production .env.local

# Start development server
npm run dev
```

Test:
- [ ] Homepage loads courses
- [ ] Course detail pages work
- [ ] Search works
- [ ] Filtering works
- [ ] User registration works
- [ ] Login works

After testing, restore development credentials.

---

## Phase 6: Security & Monitoring

### Step 17: Enable Database Backups

**Supabase Pro Plan** (automatic):
1. Daily backups enabled by default
2. 7-day retention
3. Point-in-Time Recovery (PITR) available

**Free Plan** (manual):
1. **Weekly Manual Exports**:
   ```sql
   -- Run in SQL Editor, then download
   SELECT * FROM courses;
   SELECT * FROM course_schedules;
   ```
2. Store in secure location (Google Drive, S3)

### Step 18: Security Hardening

1. **Enable MFA** on Supabase account:
   - Go to Account Settings > Security
   - Enable Two-Factor Authentication

2. **Restrict API Access**:
   - Go to Project Settings > API
   - Under "API Settings", restrict anon key to production domain

3. **Review RLS Policies**:
   ```sql
   -- Test RLS as anonymous user
   SET ROLE anon;
   SELECT * FROM courses;  -- Should work (public read)
   DELETE FROM courses WHERE id = 'some-id';  -- Should fail
   RESET ROLE;
   ```

4. **Enable SSL Enforcement**:
   - Go to Project Settings > Database
   - Enable "Enforce SSL"

### Step 19: Set Up Monitoring

1. **Create Health Check Endpoint** (`app/api/health/route.ts`):
   ```typescript
   import { createClient } from '@/lib/supabase/server'

   export async function GET() {
     try {
       const supabase = createClient()
       const { data, error } = await supabase
         .from('courses')
         .select('id')
         .limit(1)

       if (error) throw error

       return Response.json({
         status: 'healthy',
         database: 'connected',
         timestamp: new Date().toISOString()
       })
     } catch (error) {
       return Response.json({
         status: 'unhealthy',
         database: 'disconnected',
         error: error.message
       }, { status: 503 })
     }
   }
   ```

2. **Set Up Uptime Monitoring**:
   - Use UptimeRobot (free): https://uptimerobot.com
   - Monitor: `https://techtrain.nl/api/health`
   - Email alerts on downtime

3. **Enable Supabase Logs**:
   - Go to Database > Logs
   - Enable query logs
   - Set up alert emails

---

## Rollback Plan

If migration fails or data is corrupted:

### Option 1: Truncate and Re-run
```sql
-- In Supabase SQL Editor
TRUNCATE course_schedules, courses CASCADE;
```
Then re-run migration script.

### Option 2: Delete and Recreate Project
1. Delete production Supabase project
2. Create new production project
3. Re-deploy schema
4. Re-run migration

### Option 3: Restore from Backup
1. If using Supabase Pro: Restore from automatic backup
2. If manual backups: Re-import CSV data

---

## Post-Migration Checklist

- [ ] ✅ 79 courses migrated to production
- [ ] ✅ 237 schedules migrated to production
- [ ] ✅ All slugs unique (no duplicates)
- [ ] ✅ RLS policies working correctly
- [ ] ✅ Auth redirect URLs configured
- [ ] ✅ Email templates configured (Dutch)
- [ ] ✅ Database backups enabled/configured
- [ ] ✅ MFA enabled on Supabase account
- [ ] ✅ Health check endpoint created
- [ ] ✅ Uptime monitoring configured
- [ ] ✅ Development credentials restored
- [ ] ✅ Production credentials documented and secured

---

## Next Steps (After Migration)

1. **Update PRODUCTION_ROADMAP.md**: Mark migration task complete
2. **Update CLAUDE.md**: Add production Supabase URL (public info only)
3. **Deploy Next.js app to Vercel**:
   - Configure environment variables in Vercel dashboard
   - Deploy from GitHub repository
4. **Connect Authentication UI to Backend** (next priority task)
5. **Set up Payment Processing** (Stripe integration)

---

## Common Issues & Solutions

### Issue: "Duplicate key value violates unique constraint"
**Cause**: Data already exists in production DB
**Solution**: Truncate tables before re-running:
```sql
TRUNCATE course_schedules, courses CASCADE;
```

### Issue: "Permission denied for table"
**Cause**: Using anon key instead of service role key
**Solution**: Verify `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

### Issue: "Connection timeout"
**Cause**: Network issue or Supabase project suspended
**Solution**:
- Check internet connection
- Verify project is active in Supabase dashboard
- Check Supabase status: https://status.supabase.com

### Issue: Migration script hangs on "Type CONFIRM"
**Cause**: Script waiting for user input
**Solution**: Type "CONFIRM" (all caps) and press Enter

---

## Migration Script Commands Reference

```bash
# Dry run (no database writes) - Development
cd techtrain-courses
DRY_RUN=true npx tsx scripts/migrate-to-supabase.ts

# Dry run (no database writes) - Production credentials
NODE_ENV=production DRY_RUN=true npx tsx scripts/migrate-to-supabase.ts

# Live migration - Development
npx tsx scripts/migrate-to-supabase.ts

# Live migration - Production (with confirmation)
NODE_ENV=production npx tsx scripts/migrate-to-supabase.ts
```

---

## Contact & Support

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Support**: https://supabase.com/support
- **Supabase Discord**: https://discord.supabase.com
- **Production Checklist**: https://supabase.com/docs/guides/platform/going-into-prod

---

**Remember**: Production data is precious. Always test on staging first. Always have backups. Always document your steps. 🚀

**Status**: Ready for execution when you are! ✅
