# Push Changes to GitHub

Automatically commit all changes and push to the remote GitHub repository.

## Instructions

1. Check git status to see uncommitted changes
2. If there are uncommitted changes, automatically stage and commit them with a meaningful message
3. Show the commits that will be pushed
4. Push to GitHub (use -u flag if upstream not set)
5. Handle any errors (e.g., need to pull first)

**IMPORTANT:** This command should work automatically without asking the user for confirmation. Just commit and push.

## Example Workflow

```bash
# Check status
git status

# If there are uncommitted changes, stage and commit
git add .
git commit -m "Add course catalog feature"

# Show commits to be pushed
git log origin/feature/course-catalog..HEAD --oneline

# Push to GitHub
git push

# If upstream not set (first push on new branch)
git push -u origin feature/course-catalog

# Force push (use with caution, ask user first)
git push --force-with-lease
```

## Safety Checks

Before pushing:
- ✅ Verify branch name (warn if pushing to main/master)
- ✅ Check for sensitive data in commits (.env files, secrets, API keys)
- ✅ Generate meaningful commit message based on the changes
- ⚠️ Only warn if force push is needed (don't ask, just inform)

## Common Scenarios

**First push on new branch:**
```bash
git push -u origin feature/course-catalog
```

**Need to pull first (remote has changes):**
```bash
git pull --rebase origin feature/course-catalog
git push
```

**Push rejected (diverged histories):**
```bash
# Safer than --force
git push --force-with-lease
```

## Verification

After pushing:
- Confirm push was successful
- Show GitHub URL for the branch
- Summary of what was committed and pushed
