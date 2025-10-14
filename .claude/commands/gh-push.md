# Push Changes to GitHub

Push your local commits to the remote GitHub repository.

## Instructions

1. Check git status to see uncommitted changes
2. If there are uncommitted changes, ask if user wants to commit them first
3. Show the commits that will be pushed
4. Push to GitHub
5. Handle any errors (e.g., need to pull first, upstream not set)

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
- ✅ Verify branch name (don't accidentally push to main)
- ✅ Check commit message quality
- ✅ Confirm no sensitive data in commits (.env files, secrets)
- ⚠️ Warn if force push is needed
- ⚠️ Warn if pushing to main/master without PR

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
- Optionally ask if user wants to create a PR
