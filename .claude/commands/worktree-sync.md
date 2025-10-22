# Sync Worktree with Main Branch

Synchronize a worktree's feature branch with the latest changes from the main branch (master), managing conflicts and keeping parallel development up-to-date.

## Instructions

1. Identify current worktree and branch
2. Fetch latest changes from remote
3. Sync with master using merge or rebase strategy
4. Handle conflicts if they arise
5. Verify sync completed successfully

## Sync Process

```bash
# 1. Verify we're in a worktree (not main repo)
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "master" ]; then
  echo "⚠️ Already on master branch"
  echo "This command is for syncing feature branches with master"
  exit 1
fi

# 2. Save any uncommitted work
if ! git diff-index --quiet HEAD --; then
  echo "💾 Uncommitted changes detected - stashing..."
  git stash push -m "Auto-stash before sync with master"
  STASHED=true
fi

# 3. Fetch latest from remote
git fetch origin

# 4. Show what will be synced
echo "📊 Changes in master since branch creation:"
git log --oneline "$CURRENT_BRANCH..origin/master"

# 5. Ask user preference: merge or rebase
echo ""
echo "Sync strategy:"
echo "1. Merge master into feature branch (preserves all commits)"
echo "2. Rebase feature branch onto master (cleaner history)"
echo "3. Cancel"
```

## Strategy 1: Merge (Safer, Preserves History)

```bash
# Merge master into current branch
git merge origin/master -m "Merge master into $CURRENT_BRANCH for sync"

if [ $? -eq 0 ]; then
  echo "✅ Merged successfully"
else
  echo "⚠️ Merge conflicts detected"
  echo ""
  echo "Conflicted files:"
  git diff --name-only --diff-filter=U
  echo ""
  echo "Resolve conflicts, then run:"
  echo "  git add <resolved-files>"
  echo "  git commit"
  exit 1
fi
```

## Strategy 2: Rebase (Cleaner, More Complex)

```bash
# Rebase current branch onto master
git rebase origin/master

if [ $? -eq 0 ]; then
  echo "✅ Rebased successfully"
else
  echo "⚠️ Rebase conflicts detected"
  echo ""
  echo "Conflicted files:"
  git diff --name-only --diff-filter=U
  echo ""
  echo "To resolve:"
  echo "  1. Fix conflicts in the listed files"
  echo "  2. git add <resolved-files>"
  echo "  3. git rebase --continue"
  echo ""
  echo "To abort rebase:"
  echo "  git rebase --abort"
  exit 1
fi

# Note: After rebase, force push may be needed if branch was already pushed
if git branch -r | grep -q "origin/$CURRENT_BRANCH"; then
  echo ""
  echo "⚠️ Branch exists on remote"
  echo "After rebase, you'll need to force push:"
  echo "  git push --force-with-lease origin $CURRENT_BRANCH"
fi
```

## Conflict Resolution Helper

If conflicts occur:

```bash
# Show conflict summary
echo "📋 Conflict Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

git diff --name-only --diff-filter=U | while read file; do
  echo ""
  echo "📄 $file"
  echo "   Ours (current branch): changes from feature"
  echo "   Theirs (master): changes from master"
  echo ""

  # Show conflict markers
  grep -n "^<<<<<<< \|^======= \|^>>>>>>>" "$file" | head -5
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Resolve conflicts by:"
echo "1. Edit each file to choose correct changes"
echo "2. Remove conflict markers (<<<<<<<, =======, >>>>>>>)"
echo "3. git add <file> after resolving"
echo "4. Continue with: git merge --continue (or git rebase --continue)"
```

## Post-Sync Actions

After successful sync:

```bash
# 1. Restore stashed changes if any
if [ "$STASHED" = true ]; then
  echo "📦 Restoring stashed changes..."
  git stash pop

  if [ $? -ne 0 ]; then
    echo "⚠️ Stash conflicts with synced changes"
    echo "Resolve conflicts and run: git stash drop"
  fi
fi

# 2. Run tests if available
if [ -f "package.json" ]; then
  echo ""
  echo "🧪 Run tests to verify sync? (y/n)"
  # If yes: npm test
fi

# 3. Push synced branch to remote
echo ""
echo "📤 Push synced branch to remote? (y/n)"
# If yes: git push origin $CURRENT_BRANCH
```

## Sync All Worktrees

To sync multiple worktrees at once:

```bash
# Get all worktrees except master
git worktree list | grep -v "master" | while read line; do
  WORKTREE_PATH=$(echo "$line" | awk '{print $1}')
  BRANCH=$(echo "$line" | awk '{print $3}' | tr -d '[]')

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Syncing worktree: $WORKTREE_PATH"
  echo "Branch: $BRANCH"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Run sync in that worktree
  (
    cd "$WORKTREE_PATH"
    # Run merge strategy
    git merge origin/master -m "Sync with master"
  )
done

echo ""
echo "✅ All worktrees synced"
```

## Smart Sync Strategies

### Strategy Selection Guide

**Use MERGE when:**
- ✅ Working with others on the same branch
- ✅ Want to preserve exact commit history
- ✅ Branch has already been pushed to remote
- ✅ Conflicts are expected and complex

**Use REBASE when:**
- ✅ Working alone on feature branch
- ✅ Want clean, linear history
- ✅ Branch not yet pushed (or force push is acceptable)
- ✅ Few commits to rebase

## Verification Checks

After sync, verify:

```bash
# 1. Check we're still on correct branch
git branch --show-current

# 2. Verify master changes are integrated
git log --oneline --graph -10

# 3. Check working tree is clean
git status

# 4. Verify upstream is set correctly
git branch -vv

# 5. Test that code still works
# npm run build || npm test
```

## Integration with TDD Workflow

When syncing worktrees with TDD workflow:

```bash
# Update TDD workspace status
if [ -d ".claude-workspace" ]; then
  echo "🧪 TDD Workflow detected"
  echo ""
  echo "After sync, you may need to:"
  echo "  1. Re-run tests (RED phase might need updates)"
  echo "  2. Update feature-requirements.md if master has new patterns"
  echo "  3. Verify GREEN and REFACTOR phases still valid"
  echo ""
  echo "Update .claude-workspace/tdd-cycle-status.md"
fi
```

## Common Scenarios

### Scenario 1: Daily Sync (No Conflicts)
```bash
git fetch origin
git merge origin/master
# Fast-forward merge, no issues
```

### Scenario 2: Long-Running Feature (Conflicts Expected)
```bash
git fetch origin
git merge origin/master
# Resolve conflicts
git add .
git merge --continue
```

### Scenario 3: Clean Up Before PR
```bash
git fetch origin
git rebase origin/master
# Interactive rebase to squash commits
git rebase -i origin/master
# Force push cleaned history
git push --force-with-lease origin feature-branch
```

## Output Template

```
🔄 Syncing Worktree with Master
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Worktree: /path/to/worktree
🌿 Current Branch: feature/example
🎯 Target: origin/master

📊 Status:
   - Fetching latest changes... ✅
   - Analyzing differences... ✅
   - Found 5 new commits in master
   - Found 3 commits in feature branch

🔀 Sync Strategy: <Merge|Rebase>

[Progress of merge/rebase]

✅ Sync completed successfully!

📈 Summary:
   - Integrated 5 commits from master
   - No conflicts
   - Tests passing ✅
   - Ready to continue development

💡 Next: Continue working or push to remote
```

## Safety Notes

- **Always** stash uncommitted work before syncing
- **Fetch** before syncing to get latest remote state
- **Prefer merge** over rebase for shared branches
- **Test** after syncing to ensure nothing broke
- **Communicate** with team before force pushing after rebase
