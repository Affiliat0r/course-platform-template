# Create Pull Request

Create a pull request on GitHub from your current branch.

## Instructions

1. Verify current branch is not main/master
2. Ensure branch is pushed to GitHub
3. Check git log to understand all commits in the PR
4. Ask user for PR details:
   - Title (default: first commit message or branch name)
   - Description (summarize all changes in the branch)
   - Base branch (default: main)
5. Create PR using `gh pr create`
6. Show PR URL

## Example Workflow

```bash
# Check current branch
git branch --show-current

# Ensure branch is pushed
git push -u origin feature/course-catalog

# See commits that will be in PR
git log main..HEAD --oneline

# Create PR interactively
gh pr create

# Or create with flags
gh pr create \
  --title "Add course catalog feature" \
  --body "Implements course listing, filtering, and search functionality" \
  --base main

# Create PR and open in browser
gh pr create --web
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

After creating PR:
- Show PR number and URL
- Remind user that CI checks will run
- Ask if they want to assign reviewers
- Optionally link related issues (e.g., "Closes #123")

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
