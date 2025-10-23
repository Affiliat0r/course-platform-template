# Deploy to Production (Vercel)

Push changes to master branch and trigger Vercel deployment automatically.

## What This Command Does

1. **Pushes to Master**: Commits and pushes all changes to the master branch
2. **Triggers Vercel**: Vercel automatically detects the push and starts deployment
3. **Shows Deployment URL**: Displays the Vercel deployment URL to track progress
4. **Returns to Feature Branch**: Switches back to your feature branch after deployment

## Prerequisites

Before using this command, ensure:
- Vercel is connected to your GitHub repository
- Master branch is set as the production branch in Vercel settings
- You have committed all changes you want to deploy

## How Vercel Auto-Deployment Works

When you push to the master branch:
1. GitHub receives the push
2. Vercel webhook detects the change
3. Vercel automatically:
   - Pulls the latest code
   - Runs `npm install`
   - Runs `npm run build`
   - Deploys to production
   - Assigns the production URL

## Vercel Configuration

Your project should have a `vercel.json` at the root (optional, but recommended):

```json
{
  "buildCommand": "cd techtrain-courses && npm run build",
  "devCommand": "cd techtrain-courses && npm run dev",
  "installCommand": "cd techtrain-courses && npm install",
  "framework": "nextjs",
  "outputDirectory": "techtrain-courses/.next",
  "git": {
    "deploymentEnabled": {
      "master": true
    }
  },
  "regions": ["ams1"]
}
```

## Usage

Simply run:
```
/deploy-production
```

This will:
- Check you're on a feature branch (won't deploy from master directly)
- Push your current feature branch to master
- Show Vercel deployment status
- Return you to your feature branch

## Deployment Status

After running this command, you can:

1. **Check Deployment Status**:
   ```bash
   vercel inspect <deployment-url>
   ```

2. **View Deployment Logs**:
   ```bash
   vercel logs <deployment-url>
   ```

3. **Visit Vercel Dashboard**:
   - Go to https://vercel.com/dashboard
   - Click on your project
   - View deployment progress in real-time

## Environment Variables

Ensure these are set in Vercel Dashboard (Settings → Environment Variables):

**Production Environment**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-role-key
RESEND_API_KEY=your-resend-key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Rollback (If Needed)

If deployment fails or you need to rollback:

```bash
# Via Vercel CLI
vercel rollback

# Or via Git (revert master and push)
git checkout master
git revert HEAD
git push origin master
```

## Common Issues

### Issue 1: Build Fails in Vercel
**Check**: Build command in Vercel settings should be:
```
cd techtrain-courses && npm run build
```

### Issue 2: Environment Variables Not Working
**Solution**:
- Go to Vercel Dashboard → Settings → Environment Variables
- Ensure all variables are set for "Production" environment
- Redeploy after adding variables

### Issue 3: Wrong Directory Being Built
**Solution**: Set Root Directory in Vercel settings to `techtrain-courses`

## Alternative: Deploy Specific Commit

If you want to deploy a specific commit instead of the latest:

```bash
# Get commit hash
git log --oneline -5

# Push specific commit to master
git checkout master
git reset --hard <commit-hash>
git push --force-with-lease origin master
```

⚠️ **Warning**: Use `--force-with-lease` carefully - it overwrites master history

## Vercel CLI (Optional)

For more control, install Vercel CLI:

```bash
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy manually (if auto-deploy fails)
vercel --prod

# Check deployments
vercel ls

# View logs
vercel logs
```

## Success Indicators

After running this command, watch for:
- ✅ GitHub shows the push to master
- ✅ Vercel dashboard shows "Building" status
- ✅ Build completes successfully
- ✅ Production URL is updated
- ✅ No errors in deployment logs

Typical deployment time: 2-5 minutes

## Deployment Notifications

Enable Slack/Discord notifications in Vercel:
1. Go to Vercel Dashboard → Settings → Integrations
2. Add Slack or Discord webhook
3. Get notified when deployments succeed/fail
