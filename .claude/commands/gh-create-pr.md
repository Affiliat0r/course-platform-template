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
6. **Automatically merge the PR** using `gh pr merge --squash` or `--merge`
7. Switch back to master/main branch
8. Pull the merged changes: `git pull origin master`
9. Optionally delete the feature branch locally and remotely

**IMPORTANT:** This command should work automatically - create PR, merge it, and sync master without asking for confirmation.

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

# Immediately merge the PR (squash commits)
gh pr merge --squash --auto

# Switch back to master
git checkout master

# Pull the merged changes
git pull origin master

# Clean up: delete feature branch
git branch -d feature/course-catalog
git push origin --delete feature/course-catalog
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
- Confirm you're back on master branch with latest changes
- Show summary of what was merged
- Confirm feature branch cleanup (if deleted)

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
