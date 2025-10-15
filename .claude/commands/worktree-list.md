# List and Manage Git Worktrees

Show all active git worktrees and their status, helping manage parallel development instances.

## Instructions

1. List all active worktrees with their locations and branches
2. Show the status of each worktree
3. Identify which worktree is the current one
4. Provide management recommendations

## Worktree Listing

```bash
# 1. List all worktrees
git worktree list

# 2. List with more details (porcelain format for parsing)
git worktree list --porcelain

# 3. Show current worktree
pwd
git worktree list | grep "$(git rev-parse --show-toplevel)"
```

## Enhanced Status Display

For each worktree, show:

```bash
# Get worktree paths
git worktree list | while read line; do
  WORKTREE_PATH=$(echo "$line" | awk '{print $1}')
  BRANCH=$(echo "$line" | awk '{print $3}' | tr -d '[]')

  echo "📁 $WORKTREE_PATH"
  echo "🌿 Branch: $BRANCH"

  # Show status for each worktree
  git -C "$WORKTREE_PATH" status -s

  # Show last commit
  git -C "$WORKTREE_PATH" log -1 --oneline

  echo "---"
done
```

## Output Format

Present information clearly:

```
Active Git Worktrees:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Main Worktree (CURRENT)
   Location: /c/Users/user/project
   Branch: master
   Status: Clean
   Last commit: abc1234 Initial commit

📁 Worktree #1
   Location: /c/Users/user/worktrees/feature/auth
   Branch: feature/auth
   Status: 2 modified files
   Last commit: def5678 Add login component

📁 Worktree #2
   Location: /c/Users/user/worktrees/feature/payments
   Branch: feature/payments
   Status: Clean
   Last commit: ghi9012 Integrate Stripe SDK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 3 worktrees (1 main + 2 additional)

💡 Management Tips:
- Use /worktree-switch to navigate between worktrees
- Use /worktree-remove to clean up completed features
- Each worktree can have its own Claude Code window
```

## Health Checks

Identify potential issues:

- **Stale worktrees**: Branches already merged to master
- **Locked worktrees**: Worktrees with administrative locks
- **Missing directories**: Worktrees whose directories were deleted manually
- **Uncommitted changes**: Worktrees with pending work

## Quick Actions

Provide actionable suggestions:

```
⚠️ Issues Found:

1. Worktree 'feature/old-feature' - Branch merged to master
   → Suggestion: Run /worktree-remove to clean up

2. Worktree 'feature/payments' - 5 uncommitted files
   → Suggestion: Commit or stash changes

3. Worktree 'hotfix/bug-123' - Directory missing
   → Suggestion: Run `git worktree prune` to clean up
```

## Worktree Pruning

If orphaned worktrees detected:

```bash
# Show pruneable worktrees
git worktree prune --dry-run

# Actually prune (with user confirmation)
git worktree prune -v
```

## Integration with TDD Workflow

When listing worktrees, also check for TDD workspace:

```bash
for each worktree:
  if [ -d "$WORKTREE/.claude-workspace" ]; then
    echo "   🧪 TDD Workflow: Active"
    # Show TDD cycle status if available
    if [ -f "$WORKTREE/.claude-workspace/tdd-cycle-status.md" ]; then
      grep "Current Phase" "$WORKTREE/.claude-workspace/tdd-cycle-status.md"
    fi
  fi
```

## Notes

- Main worktree (original clone) is always listed first
- Worktrees share the same .git directory (efficient)
- Each worktree can only have one branch checked out at a time
- Deleting a worktree directory doesn't remove the git reference
