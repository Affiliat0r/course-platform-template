# Git Worktree Workflow for Parallel Development

This guide explains how to use git worktrees to enable true parallel development with multiple Claude Code instances.

## Table of Contents

1. [What are Git Worktrees?](#what-are-git-worktrees)
2. [Why Use Worktrees?](#why-use-worktrees)
3. [Quick Start](#quick-start)
4. [Slash Commands](#slash-commands)
5. [Integration with TDD Workflow](#integration-with-tdd-workflow)
6. [Common Scenarios](#common-scenarios)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## What are Git Worktrees?

Git worktrees allow you to have **multiple working directories** attached to the same git repository. Each worktree can have a different branch checked out, enabling you to work on multiple branches simultaneously without switching.

### Traditional Git (One Working Tree)

```
my-project/
├── .git/
├── src/
└── package.json

# To switch branches: git checkout other-branch
# Problem: Loses current work state
```

### With Worktrees (Multiple Working Trees)

```
my-project/              # Main worktree (master)
├── .git/                # Shared git directory
├── src/
└── package.json

worktrees/
├── feature-auth/        # Worktree 1 (feature/auth branch)
│   ├── src/
│   └── package.json
├── feature-payments/    # Worktree 2 (feature/payments branch)
│   ├── src/
│   └── package.json
└── hotfix-bug/         # Worktree 3 (hotfix/bug branch)
    ├── src/
    └── package.json

# All share the same .git/ directory (efficient!)
# Each can have its own Claude Code window
# Work on all simultaneously without conflicts
```

## Why Use Worktrees?

### Traditional Problems

❌ **Context switching is expensive**
- `git checkout` changes files, breaking dev server
- Need to commit or stash work-in-progress
- Lose mental context when switching

❌ **Can't work on multiple features simultaneously**
- Blocked on code review? Can't start new work
- Need hotfix? Must stop current feature

❌ **Testing across branches is painful**
- Switch branch, restart server, test, switch back
- Lose current state each time

### Worktree Solutions

✅ **Zero-cost context switching**
- Open new window, start working
- All branches available simultaneously
- Each has independent state

✅ **True parallel development**
- Work on 3 features at once
- Handle hotfixes without stopping current work
- Test multiple branches side-by-side

✅ **Perfect for Claude Code multi-instance workflows**
- TDD: RED, GREEN, REFACTOR in separate windows
- Multiple features: Each with its own TDD cycle
- Code review + development simultaneously

## Quick Start

### Create Your First Worktree

```bash
# Using slash command (recommended)
/worktree-create

# You'll be prompted for:
# - Branch name: feature/new-feature
# - Base branch: master (default)

# Worktree created at: ../worktrees/feature/new-feature
```

### Open Worktree in New Window

```bash
# In VS Code
File → Open Folder → ../worktrees/feature/new-feature

# In Claude Code
Open new window → Select worktree folder
```

### Work Independently

```bash
# In worktree
git status           # Shows feature/new-feature branch
npm install          # Independent node_modules
git commit           # Commits to feature branch
git push            # Pushes feature branch
```

### List All Worktrees

```bash
/worktree-list

# Shows:
# - All active worktrees
# - Current branch in each
# - Status of each worktree
# - TDD cycle status (if applicable)
```

### Remove When Done

```bash
/worktree-remove

# Safely removes worktree
# Handles uncommitted changes
# Optionally deletes branch
```

## Slash Commands

### `/worktree-create`

Creates a new git worktree for parallel development.

**Use when:**
- Starting a new feature
- Need to handle hotfix while working on feature
- Want to experiment without affecting current work
- Setting up TDD multi-instance workflow

**Example:**
```
User: /worktree-create
Claude: What branch name? (e.g., feature/user-authentication)
User: feature/user-auth
Claude: ✅ Worktree created at ../worktrees/feature/user-auth
```

### `/worktree-list`

Shows all active worktrees with status and health checks.

**Use when:**
- Need overview of all parallel work
- Want to check worktree health
- Looking for stale worktrees to clean up
- Checking TDD cycle status across features

**Example:**
```
User: /worktree-list
Claude:
📁 Main Worktree (master)
   Status: Clean

📁 feature/auth (../worktrees/feature/auth)
   Status: 2 modified files
   🧪 TDD: RED complete, GREEN in progress

📁 feature/payments (../worktrees/feature/payments)
   Status: ⚠️ 10 commits behind master
   Action: Run /worktree-sync
```

### `/worktree-remove`

Safely removes a worktree after feature completion.

**Use when:**
- Feature is complete and merged
- Experiment is finished
- Want to clean up stale worktrees
- Need to free up disk space

**Example:**
```
User: /worktree-remove
Claude: Which worktree to remove?
User: feature/old-feature
Claude: ⚠️ Uncommitted changes found. Options:
   1. Commit changes first
   2. Stash changes
   3. Force remove (loses work)
User: 1
Claude: ✅ Changes committed and worktree removed
```

### `/worktree-sync`

Syncs a worktree's feature branch with latest master.

**Use when:**
- Master has new changes you need
- Feature branch is falling behind
- Preparing to create pull request
- Daily maintenance (long-running features)

**Example:**
```
User: /worktree-sync
Claude: Sync strategy?
   1. Merge master into feature (safer)
   2. Rebase feature onto master (cleaner)
User: 1
Claude: ✅ Synced successfully. 5 new commits from master integrated.
```

## Integration with TDD Workflow

The worktree workflow integrates seamlessly with the TDD multi-instance setup in `.claude-workspace/`.

### Single Feature TDD (3 Windows)

**Setup:**
```bash
# 1. Create worktree for feature
/worktree-create
# Branch: feature/user-authentication

# 2. Copy TDD workspace
cp -r .claude-workspace ../worktrees/feature/user-authentication/

# 3. Open 3 Claude Code windows at worktree path
```

**Window Layout:**
```
🔴 Window 1 - Instance RED
   Path: ../worktrees/feature/user-authentication
   Role: Write failing tests
   Reads: feature-requirements.md
   Writes: red-output.md

🟢 Window 2 - Instance GREEN
   Path: ../worktrees/feature/user-authentication
   Role: Implement to make tests pass
   Reads: red-output.md
   Writes: green-output.md

🔵 Window 3 - Instance REFACTOR
   Path: ../worktrees/feature/user-authentication
   Role: Refactor for quality
   Reads: green-output.md
   Writes: refactor-output.md
```

**Workflow:**
1. RED writes tests → marks "RED_COMPLETE"
2. GREEN implements → marks "GREEN_COMPLETE"
3. REFACTOR improves → marks "REFACTOR_COMPLETE"
4. Repeat cycle for next requirement

### Multiple Features TDD (9+ Windows)

**Setup:**
```bash
# Create 3 worktrees
/worktree-create  # feature/authentication
/worktree-create  # feature/payments
/worktree-create  # feature/notifications

# Copy TDD workspace to each
for worktree in ../worktrees/feature/*; do
  cp -r .claude-workspace "$worktree/"
done

# Open 3 windows per worktree (9 total)
```

**Window Layout:**
```
Feature 1: Authentication
├─ 🔴 Window 1: RED (write auth tests)
├─ 🟢 Window 2: GREEN (implement auth)
└─ 🔵 Window 3: REFACTOR (clean auth)

Feature 2: Payments
├─ 🔴 Window 4: RED (write payment tests)
├─ 🟢 Window 5: GREEN (implement payments)
└─ 🔵 Window 6: REFACTOR (clean payments)

Feature 3: Notifications
├─ 🔴 Window 7: RED (write email tests)
├─ 🟢 Window 8: GREEN (implement email)
└─ 🔵 Window 9: REFACTOR (clean email)
```

**Benefits:**
- Each feature progresses independently
- No context switching between features
- TDD discipline enforced per feature
- Easy to track progress across all features

### Worktree + TDD Agent

Use the specialized agent for orchestration:

```
User: "I want to work on 3 features using TDD in parallel"
Agent: [Creates 3 worktrees, sets up TDD workspace, provides window layout]

User: "How's my TDD progress across worktrees?"
Agent: [Shows TDD cycle status for each worktree]

User: "Sync all worktrees with master"
Agent: [Syncs each worktree, handles conflicts]
```

## Common Scenarios

### Scenario 1: Feature Development + Hotfix

**Problem:** Critical bug found while developing feature

**Solution:**
```bash
# Current state: Working on feature/new-dashboard

# Create hotfix worktree
/worktree-create
# Branch: hotfix/critical-security-bug
# Base: master

# Work on hotfix in new window
cd ../worktrees/hotfix/critical-security-bug
# Fix bug, test, commit

# Create PR and merge
gh pr create
# After merge, remove hotfix worktree
/worktree-remove

# Return to feature work - untouched!
```

### Scenario 2: Parallel Feature Development

**Problem:** Want to work on 3 features simultaneously

**Solution:**
```bash
# Create 3 worktrees
/worktree-create  # feature/user-profile
/worktree-create  # feature/search
/worktree-create  # feature/analytics

# Open 3 Claude Code windows
# Work on each independently
# Commit and push from each worktree
# Create PRs independently
```

### Scenario 3: Experimental Feature

**Problem:** Want to try risky refactor without affecting main work

**Solution:**
```bash
# Create experiment worktree
/worktree-create
# Branch: experiment/new-architecture

# Try the experiment
# If successful: merge it
# If failed: remove worktree (no harm done)
/worktree-remove
```

### Scenario 4: Code Review + Development

**Problem:** Need to review PR but don't want to stop current work

**Solution:**
```bash
# Create review worktree
/worktree-create
# Branch: review/teammate-pr

# Review code in new window
# Leave comments, test locally
# Remove worktree when done
/worktree-remove

# Main work untouched
```

### Scenario 5: Long-Running Feature (Needs Sync)

**Problem:** Feature branch is 10 commits behind master

**Solution:**
```bash
# In feature worktree
/worktree-sync

# Choose merge or rebase
# Resolve conflicts if any
# Tests pass ✅
# Continue development with latest master changes
```

## Best Practices

### Worktree Organization

**Recommended directory structure:**
```
my-project/                  # Main repo (master)
├── .git/                    # Shared git directory
├── src/
└── package.json

worktrees/                   # All worktrees in one place
├── feature/
│   ├── authentication/
│   ├── payments/
│   └── notifications/
├── hotfix/
│   └── critical-bug/
└── experiment/
    └── new-architecture/
```

**Benefits:**
- Easy to find all worktrees
- Grouped by type (feature/hotfix/experiment)
- Outside main repo (clean structure)

### Naming Conventions

**Branch names:**
- `feature/<feature-name>` - New features
- `hotfix/<bug-description>` - Critical fixes
- `experiment/<experiment-name>` - Experiments
- `review/<pr-number>` - Code reviews

**Worktree paths:**
- `../worktrees/feature/<feature-name>` - Match branch name
- Keep paths short and readable

### Sync Strategy

**When to sync:**
- ✅ Daily for long-running features
- ✅ Before creating pull request
- ✅ When master has changes you need
- ✅ After major master updates

**Merge vs Rebase:**
- **Use MERGE** when:
  - Branch is shared with others
  - Want to preserve exact history
  - Branch already pushed to remote
- **Use REBASE** when:
  - Solo development
  - Want clean, linear history
  - Preparing for PR (squash commits)

### Cleanup Strategy

**When to remove:**
- ✅ Feature merged to master
- ✅ Experiment complete (success or failure)
- ✅ Hotfix merged
- ✅ Stale branches (no activity >2 weeks)

**Before removing:**
1. Check for uncommitted changes
2. Verify branch is merged (or don't need it)
3. Archive TDD workspace if valuable
4. Remove worktree
5. Optionally delete branch

### Resource Management

**Each worktree:**
- Has its own `node_modules/` (if you run npm install)
- Has its own `.env` file (if needed)
- Has its own dev server (different port)
- Shares `.git/` directory (efficient)

**Tips:**
- Don't run `npm install` in all worktrees (uses disk space)
- Use shared `node_modules` symlink if possible
- Clean up old worktrees regularly
- Monitor disk usage

## Troubleshooting

### Problem: Can't Create Worktree (Branch exists)

**Error:**
```
fatal: 'feature/auth' is already checked out at '../worktrees/feature/auth'
```

**Solution:**
```bash
# List existing worktrees
/worktree-list

# Either:
# 1. Use the existing worktree
# 2. Remove old worktree first, then create new
/worktree-remove
/worktree-create
```

### Problem: Directory Deleted, Git Still Has Reference

**Error:**
```
Worktree path missing but git worktree list shows it
```

**Solution:**
```bash
# Prune orphaned worktree references
git worktree prune -v

# Verify cleanup
/worktree-list
```

### Problem: Uncommitted Changes Blocking Operations

**Error:**
```
Cannot remove worktree: uncommitted changes
```

**Solution:**
```bash
# Option 1: Commit changes
git add .
git commit -m "Save work"

# Option 2: Stash changes
git stash push -m "Work in progress"

# Option 3: Force remove (⚠️ loses work)
git worktree remove --force <path>
```

### Problem: Merge Conflicts During Sync

**Error:**
```
CONFLICT (content): Merge conflict in src/utils.ts
```

**Solution:**
```bash
# See conflicted files
git status

# Edit files to resolve conflicts
# Remove <<<<<<, =======, >>>>>>> markers

# Mark as resolved
git add <resolved-file>

# Continue merge
git merge --continue

# Or abort if needed
git merge --abort
```

### Problem: Worktree Out of Sync (Behind Master)

**Warning:**
```
⚠️ Worktree 'feature/payments' is 15 commits behind master
```

**Solution:**
```bash
# In worktree
/worktree-sync

# Choose strategy
# Resolve conflicts if any
# Run tests to verify
# Continue development
```

### Problem: Can't Delete Worktree Directory

**Error:**
```
Permission denied or directory in use
```

**Solution:**
```bash
# Close all editor windows using that worktree
# Close terminal sessions in that directory
# Stop any dev servers running there

# Then remove
/worktree-remove

# If still stuck, force unlock
git worktree unlock <path>
git worktree remove <path>
```

## Advanced Usage

### Worktree with Different Node Versions

```bash
# In worktree-1 (Node 18)
nvm use 18
npm install

# In worktree-2 (Node 20)
nvm use 20
npm install

# Test compatibility across versions
```

### Shared Dependencies (Symlink)

```bash
# In main repo
npm install

# In worktrees (instead of npm install)
ln -s ../../node_modules node_modules

# Saves disk space, uses shared dependencies
```

### Worktree for Different Build Targets

```bash
# Worktree 1: Development build
npm run dev

# Worktree 2: Production build
npm run build

# Worktree 3: Testing build
npm run test:e2e

# All running simultaneously!
```

## Summary

### Key Takeaways

✅ **Worktrees enable true parallel development**
- Multiple branches checked out simultaneously
- Independent working directories
- Shared .git for efficiency

✅ **Perfect for Claude Code multi-instance workflows**
- TDD: RED, GREEN, REFACTOR in separate windows
- Multiple features: Each with own TDD cycle
- Zero context switching cost

✅ **Simple workflow with slash commands**
- `/worktree-create` - Start new parallel work
- `/worktree-list` - Monitor all worktrees
- `/worktree-sync` - Stay up-to-date
- `/worktree-remove` - Clean up when done

✅ **Integrates with existing workflows**
- TDD multi-instance setup
- GitHub PR workflow
- Development tools and servers

### When to Use Worktrees

**Perfect for:**
- 👍 Multiple features in parallel
- 👍 Hotfix during feature development
- 👍 TDD multi-instance workflow
- 👍 Experiments without risk
- 👍 Code reviews without context switch

**Not needed for:**
- 👎 Single linear feature development
- 👎 Quick branch checkouts
- 👎 Temporary experiments (use stash)

### Resources

- **Worktree Commands:** `.claude/commands/worktree-*.md`
- **Worktree Agent:** `.claude/agents/worktree-orchestrator.md`
- **TDD Integration:** `.claude-workspace/README.md`
- **Git Worktree Docs:** https://git-scm.com/docs/git-worktree

---

**Start using worktrees today for true parallel development!**

Use `/worktree-create` to get started.
