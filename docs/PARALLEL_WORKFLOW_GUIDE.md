# Parallel Instances Workflow - Practical Guide

This is a **step-by-step guide** showing exactly how to use parallel Claude Code instances with worktrees in practice.

## Real-World Scenario

You want to build 3 features simultaneously:
1. **User Authentication** (login, logout, sessions)
2. **Payment Integration** (Stripe checkout)
3. **Email Notifications** (welcome emails, receipts)

Instead of working on them sequentially (3-4 weeks), you'll work on them in parallel (1-2 weeks).

---

## Phase 1: Setup (15 minutes)

### Step 1.1: Create Worktrees

In your main repo (current Claude Code window):

```bash
# Create 3 worktrees
git worktree add -b feature/authentication ../worktrees/feature/authentication master
git worktree add -b feature/payments ../worktrees/feature/payments master
git worktree add -b feature/notifications ../worktrees/feature/notifications master

# Verify creation
git worktree list
```

**Output you'll see:**
```
/c/Users/you/project              abc1234 [master]
../worktrees/feature/authentication  def5678 [feature/authentication]
../worktrees/feature/payments        ghi9012 [feature/payments]
../worktrees/feature/notifications   jkl3456 [feature/notifications]
```

### Step 1.2: Copy TDD Workspace

```bash
# Copy TDD workflow to each worktree
cp -r .claude-workspace ../worktrees/feature/authentication/
cp -r .claude-workspace ../worktrees/feature/payments/
cp -r .claude-workspace ../worktrees/feature/notifications/

# Verify
ls ../worktrees/feature/authentication/.claude-workspace/
```

### Step 1.3: Open 9 Claude Code Windows

**Organize your screen:**
- **Monitor 1:** Authentication (3 windows side-by-side)
- **Monitor 2:** Payments (3 windows side-by-side)
- **Monitor 3:** Notifications (3 windows side-by-side)

Or use window groups/tabs if on single monitor.

**Open each window:**
```
File → New Window → Open Folder → Select worktree path
```

Repeat 9 times (3 per feature).

---

## Phase 2: Initialize Instances (5 minutes)

### Feature 1: Authentication

**Window 1 (RED):**
```
Open: ../worktrees/feature/authentication

First message to Claude:
"You are Instance RED for user authentication.

Read .claude-workspace/README.md to understand your role.

Your task: Write comprehensive failing tests for:
- User login (email/password)
- User logout
- Session management
- Password validation
- Token generation

Write tests to __tests__/auth/login.test.ts
Document specs in .claude-workspace/red-output.md
Mark RED_COMPLETE when tests fail as expected.

Start now."
```

**Window 2 (GREEN):**
```
Open: ../worktrees/feature/authentication

First message to Claude:
"You are Instance GREEN for user authentication.

Read .claude-workspace/README.md to understand your role.

Wait for Instance RED to complete tests.
Monitor .claude-workspace/red-output.md for RED_COMPLETE signal.

Then implement minimal code to make ALL tests pass.
Write to lib/auth.ts
Document in .claude-workspace/green-output.md

Do not start until RED_COMPLETE."
```

**Window 3 (REFACTOR):**
```
Open: ../worktrees/feature/authentication

First message to Claude:
"You are Instance REFACTOR for user authentication.

Read .claude-workspace/README.md to understand your role.

Wait for Instance GREEN to complete implementation.
Monitor .claude-workspace/green-output.md for GREEN_COMPLETE signal.

Then refactor for quality while keeping tests green.
Focus on: TypeScript types, error handling, code organization.
Document in .claude-workspace/refactor-output.md

Do not start until GREEN_COMPLETE."
```

### Feature 2: Payments

**Window 4 (RED):**
```
"You are Instance RED for payment integration.

Write failing tests for:
- Stripe checkout session creation
- Payment intent processing
- Webhook handling
- Error scenarios

Write to __tests__/payments/stripe.test.ts
Start now."
```

**Window 5 (GREEN):**
```
"You are Instance GREEN for payment integration.

Wait for RED_COMPLETE.
Then implement Stripe integration to pass tests.
Write to lib/payments/stripe.ts"
```

**Window 6 (REFACTOR):**
```
"You are Instance REFACTOR for payment integration.

Wait for GREEN_COMPLETE.
Then refactor for security and error handling."
```

### Feature 3: Notifications

**Window 7 (RED):**
```
"You are Instance RED for email notifications.

Write failing tests for:
- Welcome email sending
- Receipt email generation
- Email template rendering
- Send failures

Write to __tests__/notifications/email.test.ts
Start now."
```

**Window 8 (GREEN):**
```
"You are Instance GREEN for email notifications.

Wait for RED_COMPLETE.
Implement email service with Resend/SendGrid.
Write to lib/notifications/email.ts"
```

**Window 9 (REFACTOR):**
```
"You are Instance REFACTOR for email notifications.

Wait for GREEN_COMPLETE.
Refactor for template reusability and error handling."
```

---

## Phase 3: The TDD Cycle (Parallel Execution)

Now all 9 instances are running. Here's what happens:

### Minute 0-15: RED Phase (All 3 features)

**What's happening:**
- Window 1: Writing auth tests
- Window 4: Writing payment tests
- Window 7: Writing email tests

**Windows 2, 3, 5, 6, 8, 9:** Waiting

**You do:** Monitor the RED instances. Check their output occasionally.

**Example RED output (Window 1):**
```yaml
---
phase: RED
timestamp: 2025-10-15T14:30:00Z
status: RED_COMPLETE

tests_written:
  - file: __tests__/auth/login.test.ts
    test_count: 15

specifications:
  - "should authenticate valid user credentials"
  - "should reject invalid passwords"
  - "should generate JWT tokens"
  - "should handle session expiry"
  - ... (11 more)

test_status:
  - total: 15
  - passing: 0
  - failing: 15 ✓ (Expected!)

next_instance: Instance GREEN
---
```

### Minute 15-45: GREEN Phase (All 3 features)

**What's happening:**
- Window 2: Implementing auth code (tests from Window 1)
- Window 5: Implementing payment code (tests from Window 4)
- Window 8: Implementing email code (tests from Window 7)

**Windows 1, 4, 7:** Completed RED, idle
**Windows 3, 6, 9:** Still waiting

**You do:** Monitor GREEN instances. They'll implement until all tests pass.

**Example GREEN output (Window 2):**
```yaml
---
phase: GREEN
timestamp: 2025-10-15T15:00:00Z
status: GREEN_COMPLETE

implementation_files:
  - file: lib/auth.ts
    lines_added: 145

test_status:
  - total: 15
  - passing: 15 ✓
  - failing: 0

test_run_output: |
  ✓ should authenticate valid user credentials
  ✓ should reject invalid passwords
  ✓ should generate JWT tokens
  ... (all 15 passing)

next_instance: Instance REFACTOR
---
```

### Minute 45-60: REFACTOR Phase (All 3 features)

**What's happening:**
- Window 3: Refactoring auth code (keeping tests green)
- Window 6: Refactoring payment code
- Window 9: Refactoring email code

**Windows 1, 2, 4, 5, 7, 8:** Completed, idle

**You do:** Monitor REFACTOR instances. They improve code quality.

**Example REFACTOR output (Window 3):**
```yaml
---
phase: REFACTOR
timestamp: 2025-10-15T15:30:00Z
status: REFACTOR_COMPLETE

refactoring_done:
  - "Extracted validation logic to separate functions"
  - "Added comprehensive TypeScript types"
  - "Improved error messages"
  - "Added JSDoc comments"
  - "Organized imports"

test_status_after_refactor:
  - total: 15
  - passing: 15 ✓
  - failing: 0

quality_improvements:
  - "Better separation of concerns"
  - "More readable code"
  - "Stronger type safety"
---
```

### Cycle Complete! (60 minutes)

**All 3 features have completed one TDD cycle:**
- ✅ Authentication: Tests written → Implementation → Refactored
- ✅ Payments: Tests written → Implementation → Refactored
- ✅ Notifications: Tests written → Implementation → Refactored

**In parallel, in 1 hour!**

Sequentially would take 3 hours minimum.

---

## Phase 4: Commit and Push (Per Feature)

Now commit each feature independently:

### In Authentication Worktree (Window 1, 2, or 3)

```bash
# Check status
git status

# Add files
git add __tests__/auth/ lib/auth.ts

# Commit
git commit -m "feat: Add user authentication with tests

- Implement login/logout functionality
- Add JWT token generation
- Handle session management
- 15 tests, all passing

TDD cycle complete: RED → GREEN → REFACTOR"

# Push to remote
git push -u origin feature/authentication
```

### Repeat for Payments and Notifications

Each feature can be pushed independently!

---

## Phase 5: Create PRs (Independently)

### From Authentication Worktree

```bash
gh pr create --title "feat: User Authentication" --body "
## Summary
- User login/logout with email/password
- JWT-based session management
- Password validation
- 15 tests covering all scenarios

## TDD Workflow
✅ RED: Tests written first
✅ GREEN: Minimal implementation
✅ REFACTOR: Code quality improved

## Test Coverage
100% coverage for auth module
All tests passing ✓
"
```

### Benefits

Each feature:
- ✅ Has its own PR
- ✅ Can be reviewed independently
- ✅ Can be merged independently
- ✅ No conflicts (different files/areas)

**All 3 PRs created within 2 minutes!**

---

## Phase 6: Continue Development (Next Cycle)

If features need more work:

### Option 1: Next TDD Cycle (Same Features)

**Add new requirements to each worktree:**

In authentication worktree:
```
.claude-workspace/feature-requirements.md:

---
feature_id: F002
title: Add OAuth integration (Google, GitHub)
status: pending
---
```

**Restart cycle:**
- Window 1 (RED): Write OAuth tests
- Window 2 (GREEN): Implement OAuth
- Window 3 (REFACTOR): Clean up OAuth code

### Option 2: Switch Features

Maybe authentication is done, but you want to add:
- Feature 4: User profiles
- Feature 5: File uploads

**Reuse existing worktrees:**

```bash
# In authentication worktree (now complete)
git checkout -b feature/user-profiles

# Update TDD requirements
# Restart RED → GREEN → REFACTOR cycle for profiles
```

Or create new worktrees:

```bash
git worktree add -b feature/user-profiles ../worktrees/feature/user-profiles
cp -r .claude-workspace ../worktrees/feature/user-profiles/
# Open 3 new windows, repeat process
```

---

## Phase 7: Cleanup (After Merge)

Once PRs are merged:

### Remove Completed Worktrees

```bash
# Go back to main repo
cd /c/Users/you/project

# List worktrees
git worktree list

# Remove authentication (merged)
git worktree remove ../worktrees/feature/authentication
git branch -d feature/authentication  # Delete local branch

# Remove payments (merged)
git worktree remove ../worktrees/feature/payments
git branch -d feature/payments

# Keep notifications (still in review)
# Keep that worktree active
```

**Result:**
- Disk space freed
- Clean worktree list
- Only active work remains

---

## Real-World Timeline Comparison

### Sequential Development (Old Way)

```
Week 1: Authentication
  - Day 1-2: Write tests
  - Day 3-4: Implement
  - Day 5: Refactor

Week 2: Payments
  - Day 1-2: Write tests
  - Day 3-4: Implement
  - Day 5: Refactor

Week 3: Notifications
  - Day 1-2: Write tests
  - Day 3-4: Implement
  - Day 5: Refactor

Total: 3 weeks
```

### Parallel Development (New Way)

```
Week 1: All 3 features simultaneously
  - Day 1-2: Write tests for all 3 (parallel)
  - Day 3-4: Implement all 3 (parallel)
  - Day 5: Refactor all 3 (parallel)

Week 2: Code reviews and minor fixes
  - All 3 PRs in review
  - Quick fixes in parallel
  - All merged by end of week

Total: 1-2 weeks (2-3x faster!)
```

---

## Advanced: Syncing with Master

If master gets updates while you're working:

### Sync All Worktrees

```bash
# In authentication worktree
git fetch origin
git merge origin/master
# Resolve conflicts if any

# In payments worktree
git fetch origin
git merge origin/master

# In notifications worktree
git fetch origin
git merge origin/master
```

Or use the slash command:
```
# In each worktree window
/worktree-sync
```

---

## Tips for Success

### 1. Monitor Progress

Keep a checklist:
```
Authentication:
  [x] RED complete (15 tests failing)
  [x] GREEN complete (15 tests passing)
  [x] REFACTOR complete
  [x] Committed and pushed
  [x] PR created
  [ ] PR reviewed
  [ ] Merged

Payments:
  [x] RED complete (12 tests failing)
  [x] GREEN complete (12 tests passing)
  [ ] REFACTOR in progress...

Notifications:
  [x] RED complete (8 tests failing)
  [ ] GREEN in progress...
```

### 2. Start Simple

First time? Try with just 1 feature (3 windows):
- Master the RED → GREEN → REFACTOR cycle
- Then scale to multiple features

### 3. Use Different Screen Layouts

**Single monitor:**
```
Use VS Code tabs/groups:
- Tab Group 1: Auth (RED, GREEN, REFACTOR)
- Tab Group 2: Payments (RED, GREEN, REFACTOR)
- Tab Group 3: Notifications (RED, GREEN, REFACTOR)
```

**Multi-monitor:**
```
Monitor 1: Auth (3 windows)
Monitor 2: Payments (3 windows)
Monitor 3: Notifications (3 windows)
```

### 4. Take Breaks Between Phases

After all RED instances complete:
- ✅ Review all tests
- ✅ Take 5-minute break
- ✅ Start GREEN phase fresh

### 5. Archive TDD Workspace

After completion:
```bash
# Save TDD cycle documentation
mkdir -p docs/tdd-archives/
cp -r .claude-workspace/ docs/tdd-archives/authentication-$(date +%Y%m%d)/

# Great for future reference!
```

---

## Troubleshooting

### Problem: Lost track of which instance is which

**Solution:** Add labels to your windows
```
Window title: "AUTH-RED"
Window title: "AUTH-GREEN"
Window title: "AUTH-REFACTOR"
```

### Problem: Instances getting confused about roles

**Solution:** Re-prompt with clear role
```
"STOP. You are Instance RED.
Your ONLY job is writing tests.
Do NOT implement code.
Do NOT refactor.
ONLY write failing tests.
Continue."
```

### Problem: Features interfering with each other

**Solution:** This shouldn't happen (separate worktrees!)
- Verify you're in correct worktree: `pwd`
- Check branch: `git branch --show-current`
- Each worktree is completely isolated

---

## Summary

**Parallel instances with worktrees let you:**

✅ Work on 3+ features simultaneously
✅ Each feature follows TDD (RED → GREEN → REFACTOR)
✅ Zero context switching
✅ 2-3x faster development
✅ Independent PRs and merges
✅ No conflicts between features

**The workflow:**
1. Create worktrees (one per feature)
2. Copy TDD workspace to each
3. Open 3 windows per feature (RED, GREEN, REFACTOR)
4. Run TDD cycles in parallel
5. Commit, push, create PRs independently
6. Clean up after merge

**Start small, scale up!**

Try with 1 feature first (3 windows).
Then 2 features (6 windows).
Then 3+ features (9+ windows).

You'll never go back to sequential development!
