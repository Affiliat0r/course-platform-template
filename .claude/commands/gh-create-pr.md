# Create Pull Request

Create a pull request on GitHub and automatically merge it to the base branch.

## Instructions

1. Verify current branch is not main/master
2. Ensure branch is pushed to GitHub
3. Check git log to understand all commits in the PR
4. Automatically generate PR details:
   - Title (from first commit message or branch name)
   - Description (summarize all changes in the branch)
   - Base branch (default: master or main)
5. Create PR using `gh pr create`
6. **Automatically merge the PR** using `gh pr merge --squash` (without --delete-branch flag)
7. Switch back to master/main branch
8. Pull the merged changes: `git pull origin master`
9. Merge master back into the feature branch to keep it up-to-date
10. Switch back to the feature branch so user can continue working

**IMPORTANT:** This command should work automatically - create PR, merge it, sync master, and return to feature branch. DO NOT delete the feature branch as the user may want to continue working on it.

## Example Workflow

```bash
# Check current branch
git branch --show-current

# See commits that will be in PR
git log master..HEAD --oneline

# Create PR with auto-generated details
gh pr create \
  --title "Add course catalog feature" \
  --body "Implements course listing, filtering, and search functionality" \
  --base master

# Immediately merge the PR (squash commits, keep branch)
gh pr merge --squash

# Switch back to master
git checkout master

# Pull the merged changes
git pull origin master

# Merge master back into feature branch to keep it synced
git checkout feature/course-catalog
git merge master

# Now you're back on the feature branch and can continue working
```

## PR Description Template

Suggest this format:

```markdown
## Summary
- Brief overview of changes
- Why this change is needed

## Changes
- List of specific changes made
- Component/file modifications

## Test Plan
- How to test this PR
- What scenarios were tested

## Screenshots (if UI changes)
[Add screenshots]

## Checklist
- [ ] Tests pass
- [ ] No console errors
- [ ] Accessibility checked
- [ ] Mobile responsive
```

## Auto-fill from Commits

Generate PR description from commit messages:
```bash
# Get all commit messages in the branch
git log main..HEAD --pretty=format:"- %s"
```

## Verification

After merging PR:
- Confirm PR was created and merged successfully
- Show PR number and URL
- Confirm master was updated with merged changes
- Confirm feature branch was synced with master
- Confirm you're back on the feature branch ready to continue working

## Advanced Options

```bash
# Create draft PR
gh pr create --draft

# Assign reviewers
gh pr create --reviewer username1,username2

# Add labels
gh pr create --label bug,urgent

# Link to issue
gh pr create --body "Closes #123"
```
