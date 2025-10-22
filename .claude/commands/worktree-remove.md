# Remove Git Worktree

Safely remove a git worktree after feature completion, cleaning up the parallel development environment.

## Instructions

1. List available worktrees to remove
2. Verify the worktree can be safely removed
3. Handle uncommitted changes appropriately
4. Remove the worktree and clean up references
5. Optionally delete the feature branch

## Safety-First Removal Process

```bash
# 1. List worktrees to help user choose
git worktree list

# 2. Get user confirmation for which worktree to remove
WORKTREE_PATH="<user-specified-path-or-branch>"

# 3. Check for uncommitted changes
cd "$WORKTREE_PATH"
git status

# 4. Check if branch has been merged
BRANCH=$(git branch --show-current)
git branch --merged master | grep "$BRANCH"
```

## Removal Scenarios

### Scenario 1: Clean Removal (No uncommitted changes)
```bash
# Safe to remove
git worktree remove "$WORKTREE_PATH"

echo "✅ Worktree removed: $WORKTREE_PATH"
echo "🌿 Branch '$BRANCH' still exists - delete separately if needed"
```

### Scenario 2: Uncommitted Changes Present

**Ask user what to do:**
```
⚠️ Uncommitted changes detected in worktree:
<show changed files>

Options:
1. Commit changes first (recommended)
2. Stash changes (preserves work)
3. Force remove (⚠️ LOSES uncommitted work)
4. Cancel removal

What would you like to do?
```

**Based on choice:**

**Option 1: Commit first**
```bash
cd "$WORKTREE_PATH"
git add .
git commit -m "Save work before removing worktree"
git push -u origin "$BRANCH"
cd -
git worktree remove "$WORKTREE_PATH"
```

**Option 2: Stash changes**
```bash
cd "$WORKTREE_PATH"
git stash push -m "Stashed before worktree removal"
cd -
git worktree remove "$WORKTREE_PATH"
echo "💾 Changes stashed - recover with: git stash pop"
```

**Option 3: Force remove**
```bash
git worktree remove --force "$WORKTREE_PATH"
echo "⚠️ Worktree removed with uncommitted changes (lost)"
```

### Scenario 3: Branch Already Merged

```bash
# Check if merged to master
if git branch --merged master | grep -q "$BRANCH"; then
  echo "✅ Branch '$BRANCH' already merged to master"
  echo ""
  echo "Safe to remove worktree and delete branch?"
  echo "1. Remove worktree only"
  echo "2. Remove worktree AND delete branch (cleanup)"
  echo "3. Cancel"
fi
```

**If user chooses full cleanup:**
```bash
# Remove worktree
git worktree remove "$WORKTREE_PATH"

# Delete local branch
git branch -d "$BRANCH"

# Delete remote branch (if exists)
git push origin --delete "$BRANCH" 2>/dev/null || true

echo "✅ Full cleanup complete"
echo "   - Worktree removed"
echo "   - Local branch deleted"
echo "   - Remote branch deleted"
```

## Post-Removal Cleanup

After removing worktree:

```bash
# 1. Verify removal
git worktree list

# 2. Prune any stale references
git worktree prune -v

# 3. Clean up empty directories
WORKTREES_DIR="../worktrees"
if [ -d "$WORKTREES_DIR" ] && [ -z "$(ls -A $WORKTREES_DIR)" ]; then
  echo "📁 Worktrees directory is empty - remove it? (y/n)"
  # If yes: rmdir "$WORKTREES_DIR"
fi

# 4. Show remaining worktrees
echo ""
echo "Remaining worktrees:"
git worktree list
```

## Special Cases

### Directory Manually Deleted

If worktree directory was deleted outside git:

```bash
# Git still has reference but directory is gone
git worktree prune -v
echo "✅ Pruned orphaned worktree references"
```

### Locked Worktree

If worktree is locked (admin lock):

```bash
# Unlock first
git worktree unlock "$WORKTREE_PATH"

# Then remove
git worktree remove "$WORKTREE_PATH"
```

### Worktree in Use

If worktree is currently open in another window:

```
⚠️ Warning: This worktree may be open in another editor window.

Close all editor instances using this worktree before removal.

Proceed anyway? (y/n)
```

## Integration with TDD Workflow

If removing a worktree with TDD workspace:

```bash
# Check for TDD workspace
if [ -d "$WORKTREE_PATH/.claude-workspace" ]; then
  echo "🧪 TDD Workspace detected"
  echo ""
  echo "Archive TDD workspace before removal?"
  echo "This preserves test specifications and implementation notes."
  echo ""
  echo "1. Archive to main repo (recommended)"
  echo "2. Skip archival"

  # If archive chosen:
  ARCHIVE_DIR=".claude-workspace/archives/$(basename $WORKTREE_PATH)-$(date +%Y%m%d)"
  mkdir -p "$ARCHIVE_DIR"
  cp -r "$WORKTREE_PATH/.claude-workspace/"* "$ARCHIVE_DIR/"
  echo "✅ TDD workspace archived to: $ARCHIVE_DIR"
fi
```

## Verification Steps

After removal, verify:

1. ✅ Worktree no longer in `git worktree list`
2. ✅ Directory removed from filesystem
3. ✅ Branch still exists (if intended)
4. ✅ No git references to removed worktree (`git worktree prune`)

## Output Template

```
🗑️ Removing Worktree
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Worktree: /path/to/worktree
🌿 Branch: feature/example
📊 Status: <clean|uncommitted changes|merged>

[Handle uncommitted changes if present]
[Show removal progress]

✅ Worktree removed successfully

Next steps:
- Branch 'feature/example' still exists locally
- Use `git branch -d feature/example` to delete if no longer needed
- Or keep for future use in another worktree

Remaining worktrees: X
```

## Safety Reminders

- **NEVER** force remove without user confirmation
- **ALWAYS** check for uncommitted work first
- **WARN** if branch is not merged to master
- **SUGGEST** archiving TDD workspace if present
- **VERIFY** cleanup completed successfully
