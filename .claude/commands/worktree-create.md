# Create Git Worktree for Parallel Development

Create a new git worktree to work on a feature branch in a separate directory, enabling parallel Claude Code instances.

## Instructions

1. Ask the user for the feature branch name (or suggest based on context)
2. Create worktree directory structure: `../worktrees/<branch-name>`
3. Create the worktree with a new or existing branch
4. Set up the worktree for immediate development
5. Provide instructions for opening the worktree in a new Claude Code window

## Worktree Creation Steps

```bash
# 1. Determine branch name
BRANCH_NAME="feature/new-feature"  # User-provided or suggested

# 2. Check if branch exists remotely or locally
git branch -a | grep "$BRANCH_NAME"

# 3. Create worktree directory
WORKTREE_PATH="../worktrees/$BRANCH_NAME"

# If branch exists:
git worktree add "$WORKTREE_PATH" "$BRANCH_NAME"

# If new branch (from current branch):
git worktree add -b "$BRANCH_NAME" "$WORKTREE_PATH"

# If new branch (from master):
git worktree add -b "$BRANCH_NAME" "$WORKTREE_PATH" master

# 4. Verify worktree creation
git worktree list
```

## Post-Creation Setup

After creating the worktree:

1. **Copy workspace files** (if TDD workflow needed):
```bash
cp -r .claude-workspace "$WORKTREE_PATH/"
```

2. **Show worktree info**:
```bash
cd "$WORKTREE_PATH"
git branch --show-current
git status
```

3. **Provide user instructions**:
```
✅ Worktree created successfully!

📁 Location: <absolute-path-to-worktree>
🌿 Branch: <branch-name>

Next steps:
1. Open a new Claude Code window
2. Open folder: <worktree-path>
3. Start working on your feature in parallel!

💡 Tip: Use the TDD workflow in .claude-workspace/ for structured development
```

## Safety Checks

Before creating worktree:
- ✅ Verify not already in a worktree (warn if true)
- ✅ Check for uncommitted changes (warn user)
- ✅ Ensure branch name follows naming conventions
- ✅ Confirm worktree directory doesn't already exist

## Common Patterns

### Pattern 1: New Feature Branch
```bash
# Create new feature branch from master
git worktree add -b feature/user-auth ../worktrees/feature/user-auth master
```

### Pattern 2: Existing Remote Branch
```bash
# Checkout existing branch in new worktree
git worktree add ../worktrees/feature/payments feature/payments
```

### Pattern 3: Bug Fix from Current State
```bash
# Create hotfix from current branch
git worktree add -b hotfix/critical-bug ../worktrees/hotfix/critical-bug
```

## Integration with TDD Workflow

When creating worktree for TDD multi-instance development:

1. Create worktree with appropriate branch
2. Copy `.claude-workspace/` to the worktree
3. Instruct user to open 3 windows:
   - RED instance: Write tests
   - GREEN instance: Implement code
   - REFACTOR instance: Improve code quality

## Cleanup Reference

To remove a worktree later (don't do automatically):
```bash
git worktree remove <path>
# or
git worktree remove --force <path>  # if uncommitted changes
```
