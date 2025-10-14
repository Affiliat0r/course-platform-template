# Create Feature Branch

Create a new feature branch for development work.

## Instructions

1. Check current branch and status
2. Ensure working directory is clean (or offer to stash changes)
3. Ask for feature branch name (suggest format: `feature/feature-name` or `fix/bug-name`)
4. Create and switch to the new branch
5. Optionally push the branch to GitHub to set up tracking

## Example Workflow

```bash
# Check current status
git status

# Make sure we're on main/master
git checkout main

# Pull latest changes
git pull origin main

# Create and switch to new branch
git checkout -b feature/course-catalog

# Or use git switch (modern syntax)
git switch -c feature/course-catalog

# Push to GitHub and set upstream
git push -u origin feature/course-catalog
```

## Branch Naming Conventions

Suggest following patterns:
- `feature/add-payment-integration` - New features
- `fix/checkout-button-bug` - Bug fixes
- `refactor/cleanup-api-routes` - Code refactoring
- `docs/update-readme` - Documentation updates
- `test/add-checkout-tests` - Test additions

## Verification

After creation:
- Confirm you're on the new branch: `git branch --show-current`
- Show branch status
- Remind user to make commits and push when ready
