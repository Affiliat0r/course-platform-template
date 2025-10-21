# Supabase Setup Guide

This guide walks you through setting up Supabase for the TechTrain course platform.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at [supabase.com](https://supabase.com))
- npm or yarn package manager

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: `techtrain-courses` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is sufficient for development
4. Click "Create new project"
5. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, click on the ⚙️ **Settings** icon in the sidebar
2. Navigate to **API** section
3. You'll need these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGc...`)
   - **service_role** key (starts with `eyJhbGc...`) - ⚠️ Keep this secret!

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cd techtrain-courses
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   ⚠️ **Important**: Never commit `.env.local` to version control! It's already in `.gitignore`.

## Step 4: Run Database Schema

1. In your Supabase project dashboard, click on the **SQL Editor** icon in the sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this repository
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- All database tables (profiles, courses, enrollments, etc.)
- Indexes for performance
- Row Level Security (RLS) policies for data protection
- Triggers for automatic profile creation on signup
- Auto-update triggers for `updated_at` fields

## Step 5: Verify Database Setup

1. In Supabase dashboard, navigate to **Table Editor**
2. You should see the following tables:
   - `profiles`
   - `courses`
   - `course_schedules`
   - `enrollments`
   - `payments`
   - `wishlists`
   - `reviews`

3. Click on any table to verify the columns match the schema

## Step 6: Migrate Mock Data (Optional)

To populate your database with the existing mock course data:

1. Install tsx (TypeScript execution) if not already installed:
   ```bash
   npm install --save-dev tsx
   ```

2. Run the migration script:
   ```bash
   npx tsx scripts/migrate-to-supabase.ts
   ```

3. The script will:
   - Migrate all courses from `lib/data.ts`
   - Create course schedules
   - Display a summary of the migration

4. Verify in Supabase Table Editor:
   - Check the `courses` table has entries
   - Check the `course_schedules` table has schedules

## Step 7: Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/register` and create a test account
3. Check your email for the confirmation link (Supabase sends real emails even in development!)
4. Confirm your account
5. Log in at `/login`
6. Check Supabase dashboard:
   - **Authentication > Users** - you should see your test user
   - **Table Editor > profiles** - you should see your profile

## Step 8: Enable Authentication Providers (Optional)

To enable social login (Google, GitHub, etc.):

1. In Supabase dashboard, go to **Authentication > Providers**
2. Enable desired providers:
   - **Google**: Configure OAuth credentials from Google Cloud Console
   - **GitHub**: Configure OAuth app from GitHub Settings
   - **Email**: Already enabled by default

3. Update your callback URLs in provider settings:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

## Step 9: Configure Storage (Optional)

For file uploads (course thumbnails, certificates, etc.):

1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Create a bucket named `course-assets`
4. Set bucket to **Public** if you want thumbnails accessible without auth
5. Configure policies:
   - **INSERT**: Authenticated users can upload
   - **SELECT**: Public read access
   - **UPDATE**: Only file owner can update
   - **DELETE**: Only file owner can delete

## Step 10: Set Up Row Level Security (RLS)

RLS is already configured in the schema! But here's how to verify:

1. In Supabase dashboard, go to **Authentication > Policies**
2. Each table should have policies defined:
   - **courses**: Public can view published courses, admins/instructors can manage
   - **enrollments**: Users can only view/manage their own enrollments
   - **payments**: Users can only view their own payments
   - **wishlists**: Users can only manage their own wishlist
   - **reviews**: Anyone can read, only enrolled users can create

## Troubleshooting

### Issue: "Invalid API key" error

**Solution**:
- Double-check your API keys in `.env.local`
- Make sure you're using the correct keys from the API settings page
- Restart your development server after changing `.env.local`

### Issue: Database migration fails

**Solution**:
- Check that the schema was run successfully in SQL Editor
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check the error message for specific table/column issues

### Issue: Users can't sign up

**Solution**:
- Check Supabase **Authentication > Settings**
- Ensure "Enable email confirmations" is configured
- Check your email provider settings (Supabase uses their SMTP in development)
- For production, configure your own SMTP provider

### Issue: RLS policies blocking queries

**Solution**:
- Check that the user is properly authenticated
- Verify the RLS policies match your use case
- Use the service role key (server-side only) to bypass RLS for admin operations
- Check Supabase logs in **Logs > Postgres Logs**

## Development vs Production

### Development
- Use test API keys
- Email confirmations may take a few minutes
- Use Supabase's default SMTP
- Free tier limits apply

### Production
- Switch to production API keys
- Configure custom SMTP for emails
- Set up proper domain and SSL
- Consider upgrading to paid tier for:
  - Higher rate limits
  - More database storage
  - Better performance
  - Priority support

## Next Steps

1. **Update UI Components**: Modify login, register, and dashboard pages to use the new Supabase actions
2. **Test Enrollment Flow**: Test the complete flow from course browsing to enrollment
3. **Integrate Stripe**: Set up payment processing (see Payment Flow Expert agent)
4. **Add Reviews**: Implement course review functionality
5. **Admin Dashboard**: Build admin interfaces for course management

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase with Next.js 14](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development)

## Support

If you encounter issues:
1. Check the [Supabase Discord](https://discord.supabase.com/)
2. Review [Supabase GitHub Discussions](https://github.com/supabase/supabase/discussions)
3. Check our project documentation in `docs/`

---

**Last Updated**: 2025-10-20
