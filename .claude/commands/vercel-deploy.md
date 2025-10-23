# Vercel Deploy - Push to Master & Deploy

Deploy your changes to production by pushing to master, which triggers Vercel auto-deployment.

## Instructions

Execute these steps automatically:

1. **Check Current Branch**
   - Ensure you're on a feature branch (not master)
   - If on master, warn user

2. **Ensure All Changes Are Committed**
   - Check for uncommitted changes
   - Stage and commit if needed
   - Push feature branch to GitHub

3. **Merge to Master**
   - Switch to master branch
   - Pull latest changes
   - Merge feature branch into master
   - Push master to GitHub (this triggers Vercel)

4. **Monitor Deployment**
   - Show Vercel deployment URL
   - Provide command to check status
   - Show estimated deployment time

5. **Return to Feature Branch**
   - Merge master back to feature branch
   - Switch back to feature branch
   - User continues working

## Implementation

```bash
# 1. Check current branch
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "master" ]; then
  echo "⚠️  You're already on master. Switch to a feature branch first."
  exit 1
fi

# 2. Commit any uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo "📝 Committing changes..."
  git add .
  git commit -m "chore: Deploy to production via Vercel"
  git push
fi

# 3. Merge to master and push (triggers Vercel)
echo "🚀 Deploying to production..."
git checkout master
git pull origin master
git merge $CURRENT_BRANCH --no-edit
git push origin master

# 4. Show deployment info
echo ""
echo "✅ Pushed to master - Vercel deployment triggered!"
echo ""
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
echo ""
echo "⏱️  Estimated deployment time: 2-5 minutes"
echo ""
echo "📊 Check deployment status with:"
echo "   vercel ls"
echo ""

# 5. Return to feature branch
echo "🔄 Syncing feature branch with master..."
git checkout $CURRENT_BRANCH
git merge master --no-edit
git push

echo ""
echo "✅ Done! You're back on $CURRENT_BRANCH"
echo ""
echo "🌐 Your app will be live at your production URL shortly"
```

## What Happens on Vercel

When you push to master:

1. **Build Starts** (0-30s delay)
   - Vercel detects the push via GitHub webhook
   - Starts a new deployment

2. **Build Process** (1-3 minutes)
   - `npm install` in techtrain-courses/
   - `npm run build`
   - Next.js optimizes and bundles

3. **Deployment** (30s-1min)
   - Uploads build to Vercel CDN
   - Updates DNS routing
   - Assigns to production domain

4. **Live** ✅
   - Production URL shows new version
   - Previous deployment still accessible (rollback ready)

## Vercel Dashboard

Visit https://vercel.com/dashboard to:
- See real-time build logs
- Check deployment status
- View performance metrics
- Configure environment variables
- Set up custom domains

## Environment Setup (First Time)

If deploying for the first time, configure in Vercel Dashboard:

1. **Project Settings**
   - Root Directory: `techtrain-courses`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

2. **Environment Variables** (Production)
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-prod.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   RESEND_API_KEY=re_...
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

3. **Git Integration**
   - Connect GitHub repository
   - Set master as production branch
   - Enable automatic deployments

## Verify Deployment

After deployment completes:

```bash
# Check if deployment is live
curl -I https://your-domain.com

# Test specific functionality
curl https://your-domain.com/api/health

# Check Supabase connection
curl https://your-domain.com/courses
```

## Rollback If Needed

If something goes wrong:

```bash
# Option 1: Via Vercel Dashboard
# Go to Deployments → Find previous good deployment → Click "Promote to Production"

# Option 2: Via Git
git checkout master
git revert HEAD  # Reverts last commit
git push origin master  # Triggers new deployment

# Option 3: Via Vercel CLI
vercel rollback
```

## Deployment Checklist

Before deploying to production:
- [ ] All tests passing
- [ ] Database migrations applied to production Supabase
- [ ] Environment variables set in Vercel
- [ ] No console errors in build
- [ ] Critical features tested locally
- [ ] CLAUDE.md is up to date

## Common Vercel Errors

### Error: "Command failed with exit code 1"
**Check**: Build logs in Vercel Dashboard for specific error
**Common causes**:
- Missing environment variables
- TypeScript errors
- Build command incorrect

### Error: "Module not found"
**Fix**: Ensure all dependencies in `package.json`
```bash
cd techtrain-courses
npm install
```

### Error: "Out of memory"
**Fix**: Upgrade Vercel plan or optimize build
- Reduce bundle size
- Use dynamic imports
- Remove unused dependencies

## Vercel CLI Commands

Optional - for advanced control:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy to production manually
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs <deployment-url>

# Inspect deployment
vercel inspect <deployment-url>

# Promote preview to production
vercel promote <preview-url>
```

## Success Confirmation

You'll know deployment succeeded when:
- ✅ Vercel Dashboard shows "Ready" status
- ✅ Production URL loads without errors
- ✅ All pages render correctly
- ✅ Database connections work
- ✅ Authentication flows work
- ✅ No console errors in browser

## Post-Deployment Monitoring

After deployment:
1. Test critical user flows (login, enrollment, etc.)
2. Check Vercel Analytics for errors
3. Monitor Supabase logs for database issues
4. Test on mobile devices
5. Verify email notifications work

## Support

If deployment fails:
1. Check Vercel build logs
2. Review error messages
3. Test build locally: `npm run build`
4. Check Vercel status: https://vercel.com/status
5. Contact Vercel support if needed

---

**Note**: This command is safe to run multiple times. Vercel handles concurrent deployments gracefully.
