# Free Deployment Guide - Vercel

**Deploy TechTrain to Vercel for FREE in 10 minutes!**

---

## 🎯 What You'll Get

- **Free hosting** on Vercel's hobby plan
- **Live URL**: `https://techtrain-xxx.vercel.app` (or custom domain)
- **Automatic deployments** when you push to GitHub
- **SSL certificate** (HTTPS) - free and automatic
- **Global CDN** - fast loading worldwide
- **Preview deployments** for each branch

**Cost**: $0/month (Free forever for hobby projects)

---

## ⚡ Quick Deploy (10 Minutes)

### Step 1: Visit Vercel and Import Your Project

1. **Go to Vercel**:
   - Visit: https://vercel.com/
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Your Repository**:
   - After login, click "Add New..." → "Project"
   - You'll see a list of your GitHub repos
   - Find: `course-platform-template`
   - Click "Import"

---

### Step 2: Configure Build Settings

Vercel will auto-detect Next.js, but you need to configure the monorepo:

**Framework Preset**: Next.js (auto-detected) ✅

**Root Directory**:
- Click "Edit" next to Root Directory
- Enter: `techtrain-courses`
- This tells Vercel your app is in the techtrain-courses folder, not root

**Build Command**: `npm run build` (auto-detected) ✅

**Output Directory**: `.next` (auto-detected) ✅

**Install Command**: `npm install` (auto-detected) ✅

**Node Version**: 18.x or higher (auto-detected) ✅

---

### Step 3: Add Environment Variables

⚠️ **CRITICAL**: Click "Environment Variables" section and add these:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zdvkyhpqttwdqrralhlc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkdmt5aHBxdHR3ZHFycmFsaGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODY4NzQsImV4cCI6MjA3NjU2Mjg3NH0.7BAW1OOq4r3-5iRMEHSkfHgvH7KBnKIbW64AR5LAgVQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkdmt5aHBxdHR3ZHFycmFsaGxjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk4Njg3NCwiZXhwIjoyMDc2NTYyODc0fQ.hiWwfF30_fS7uJfCAOZajlt-JxPfgBIaKlGh4y4UbyY

# Application URL (you'll update this after deployment)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Optional - Leave blank for now (won't affect testing)
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_WEBHOOK_SECRET=
# RESEND_API_KEY=
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

**How to add them**:
- Click "Add another" for each variable
- Paste the name in "KEY" field
- Paste the value in "VALUE" field
- Set Environment: Production, Preview, Development (all three)

---

### Step 4: Deploy!

1. Click "Deploy" button
2. Wait 2-3 minutes while Vercel builds your app
3. You'll see a confetti animation when it's done! 🎉

---

### Step 5: Update Your Live URL

After deployment, Vercel gives you a URL like: `https://course-platform-template-xxx.vercel.app`

**Update the environment variable**:
1. Go to Project Settings → Environment Variables
2. Find `NEXT_PUBLIC_APP_URL`
3. Change value to your actual Vercel URL
4. Click "Save"
5. Go to Deployments tab
6. Click "..." on latest deployment → "Redeploy"

---

### Step 6: Update Supabase Redirect URLs

Your app needs to redirect users after login/signup:

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/zdvkyhpqttwdqrralhlc/auth/url-configuration

2. **Add Vercel URL to allowed redirect URLs**:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: Add these two:
     - `https://your-app.vercel.app/login`
     - `https://your-app.vercel.app/auth/callback`
   - Click "Save"

---

## 🎉 Your Site is Live!

Visit your URL: `https://your-app.vercel.app`

### Test Everything:

- [ ] Homepage loads
- [ ] Course catalog works
- [ ] Course detail pages work
- [ ] Search and filters work
- [ ] Login/Register works
- [ ] Course enrollment works
- [ ] Dashboard shows enrollments

---

## 🔄 Automatic Deployments

Now, every time you push to GitHub, Vercel automatically deploys!

```bash
# Make a change
git add .
git commit -m "Update homepage"
git push

# Vercel automatically deploys the new version!
# Check the Deployments tab in Vercel dashboard
```

---

## 📊 Monitor Your Site

**Vercel Dashboard**: https://vercel.com/dashboard

You can see:
- **Analytics**: Page views, visitors, performance
- **Logs**: Runtime logs and errors
- **Deployments**: History of all deployments
- **Speed Insights**: Performance metrics

---

## 💰 Free Tier Limits (Generous!)

Vercel Free (Hobby) Tier includes:
- ✅ **Unlimited** deployments
- ✅ **100GB** bandwidth/month (plenty for testing!)
- ✅ **100** GB-hours serverless function execution
- ✅ **1000** serverless function invocations/day
- ✅ **Unlimited** team members
- ✅ **Free** SSL certificates
- ✅ **Free** custom domains

**For testing**: This is MORE than enough!

**For production**: You might need Pro ($20/month) if you get lots of traffic, but for now free is perfect.

---

## 🆘 Troubleshooting

### Build Fails with "Cannot find package.json"
**Fix**: Make sure Root Directory is set to `techtrain-courses`

### Build Fails with "Environment variable missing"
**Fix**: Check that all required env vars are added in Vercel dashboard

### Site loads but login doesn't work
**Fix**: Update Supabase redirect URLs (Step 6 above)

### Database connection fails
**Fix**: Verify Supabase keys are correct in Vercel env vars

### 404 errors on dynamic routes
**Fix**: This shouldn't happen with Next.js, but if it does, check that build completed successfully

---

## 🚀 Next Steps After Deployment

Once your site is live on Vercel:

1. **Share the URL** with friends/testers
2. **Get feedback** on functionality
3. **Monitor analytics** to see usage
4. **Test payments** with Stripe test mode (when ready)
5. **Add custom domain** (optional, costs ~$10/year for domain registration)

---

## 🌐 Adding a Custom Domain (Optional)

Want `techtrain.nl` instead of `xxx.vercel.app`?

1. **Buy domain** from Namecheap, GoDaddy, TransIP, etc. (~€10/year)
2. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Click "Add"
   - Enter your domain: `techtrain.nl`
   - Follow DNS configuration instructions
3. **Wait 10-60 minutes** for DNS propagation
4. **SSL certificate** is automatically provisioned

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Next.js Docs**: https://nextjs.org/docs/deployment

---

**Ready?** Go to https://vercel.com/ and start deploying! 🚀

**Estimated Time**: 10 minutes from start to finish

**Difficulty**: ⭐ Easy (just clicking buttons!)

---

## ✅ Quick Checklist

- [ ] Sign up/login to Vercel with GitHub
- [ ] Import `course-platform-template` repository
- [ ] Set Root Directory to `techtrain-courses`
- [ ] Add environment variables (copy from .env.local)
- [ ] Click Deploy
- [ ] Wait for deployment to complete
- [ ] Update `NEXT_PUBLIC_APP_URL` with Vercel URL
- [ ] Add Vercel URL to Supabase redirect URLs
- [ ] Test your live site!

**Your free test site will be live in 10 minutes!** ⚡
