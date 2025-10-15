# TDD Multi-Instance Workflow

This workspace enables **Test-Driven Development (TDD)** using multiple Claude Code instances working in parallel following the Red-Green-Refactor cycle.

## TDD Principles

```
RED → GREEN → REFACTOR
 ↓      ↓         ↓
Test  Make it   Make it
Fails  Pass     Better
```

## Instance Roles for TDD

### Instance RED (Test Writer) - Window 1
**Role:** Write failing tests first, define specifications

**Instructions for Instance RED:**
```
You are Instance RED - The Test Specification Writer.

READ FROM: feature-requirements.md, green-output.md, refactor-output.md
WRITE TO: red-output.md

Your sacred responsibilities:
1. ALWAYS write tests BEFORE any implementation
2. Write tests that FAIL initially (prove they test something)
3. Define clear specifications through test cases
4. NEVER write implementation code
5. NEVER modify tests to make them pass

Red-Green-Refactor Protocol:
- Read feature-requirements.md for new features
- Write comprehensive failing tests
- Document expected behavior in test descriptions
- Write results to red-output.md with test file paths
- Mark cycle as "RED_COMPLETE" when tests written and failing

Your mantra: "Tests are specifications, not afterthoughts"
```

### Instance GREEN (Implementation) - Window 2
**Role:** Make tests pass with minimal code

**Instructions for Instance GREEN:**
```
You are Instance GREEN - The Implementation Engineer.

READ FROM: red-output.md, refactor-output.md
WRITE TO: green-output.md

Your sacred responsibilities:
1. ONLY write code after Instance RED has failing tests
2. Write MINIMAL code to make tests pass
3. Focus on functionality, not elegance
4. NEVER modify tests (they are the specification)
5. Run tests and verify they all pass

Red-Green-Refactor Protocol:
- Wait for "RED_COMPLETE" signal in red-output.md
- Read the failing tests and understand requirements
- Write minimal implementation to pass ALL tests
- Run tests and verify green status
- Write results to green-output.md
- Mark cycle as "GREEN_COMPLETE"

Your mantra: "Make it work first, make it pretty later"
```

### Instance REFACTOR (Code Quality) - Window 3
**Role:** Improve code quality while keeping tests green

**Instructions for Instance REFACTOR:**
```
You are Instance REFACTOR - The Code Quality Expert.

READ FROM: green-output.md, red-output.md
WRITE TO: refactor-output.md

Your sacred responsibilities:
1. ONLY refactor after Instance GREEN has passing tests
2. Improve code quality WITHOUT changing behavior
3. Keep ALL tests passing (green)
4. NEVER modify test logic (only improve test code quality)
5. Focus on: readability, performance, patterns, DRY

Red-Green-Refactor Protocol:
- Wait for "GREEN_COMPLETE" signal in green-output.md
- Read the implementation and tests
- Refactor for better quality (naming, structure, patterns)
- Re-run tests to ensure they still pass
- Write results to refactor-output.md
- Mark cycle as "REFACTOR_COMPLETE"

Your mantra: "Clean code is not written, it's refactored"
```

## File Structure

```
.claude-workspace/
├── README.md                    # This file
├── feature-requirements.md      # User stories / features to implement
├── tdd-cycle-status.md         # Current cycle status tracker
├── red-output.md               # Test writer outputs
├── green-output.md             # Implementation outputs
└── refactor-output.md          # Refactor outputs
```

## Communication Protocol

### Feature Request Format (in feature-requirements.md)

```yaml
---
feature_id: F001
created: 2025-10-15T10:00:00Z
status: pending
priority: high

title: Add testing infrastructure to TechTrain

user_story: |
  As a developer
  I want a complete testing setup with Vitest
  So that I can write and run tests for my code

acceptance_criteria:
  - Vitest installed and configured
  - Test runner scripts in package.json
  - Sample tests for lib/utils.ts
  - All tests passing
  - Documentation for running tests

estimated_cycles: 3

notes: |
  Currently 0% test coverage. Need foundation before
  adding more features.
---
```

### RED Phase Output (in red-output.md)

```yaml
---
cycle_id: C001
feature_id: F001
phase: RED
timestamp: 2025-10-15T10:30:00Z
status: RED_COMPLETE

tests_written:
  - file: techtrain-courses/__tests__/unit/utils.test.ts
    test_count: 12
    coverage:
      - formatPrice function (5 test cases)
      - formatDate function (4 test cases)
      - cn function (3 test cases)

test_status:
  - total: 12
  - passing: 0
  - failing: 12 ✓ (Expected - no implementation yet)

specifications:
  formatPrice:
    - "should format euros with Dutch locale"
    - "should handle negative numbers"
    - "should round to 2 decimals"
    - "should handle zero"
    - "should support different currencies"

  formatDate:
    - "should format dates in Dutch"
    - "should handle different locales"
    - "should work server-side (no window)"
    - "should format consistently"

  cn:
    - "should merge class names"
    - "should handle conditional classes"
    - "should filter falsy values"

next_instance: Instance GREEN
action_required: "Implement functions to make tests pass"

files_created:
  - techtrain-courses/__tests__/unit/utils.test.ts
  - techtrain-courses/vitest.config.ts
---
```

### GREEN Phase Output (in green-output.md)

```yaml
---
cycle_id: C001
feature_id: F001
phase: GREEN
timestamp: 2025-10-15T11:00:00Z
status: GREEN_COMPLETE

implementation_files:
  - file: techtrain-courses/lib/utils.ts
    changes: "Added minimal implementation"
    lines_added: 0  # Already exists, just verified

  - file: techtrain-courses/package.json
    changes: "Added vitest scripts"
    lines_added: 3

test_status:
  - total: 12
  - passing: 12 ✓
  - failing: 0

test_run_output: |
  ✓ formatPrice function (5)
  ✓ formatDate function (4)
  ✓ cn function (3)

  Test Files  1 passed (1)
  Tests  12 passed (12)
  Duration  234ms

implementation_notes: |
  Functions already implemented correctly in utils.ts.
  Added Vitest config and npm scripts.
  All tests passing with existing implementation.

next_instance: Instance REFACTOR
action_required: "Review code quality and improve if needed"

files_modified:
  - techtrain-courses/package.json
  - techtrain-courses/vitest.config.ts (created)
---
```

### REFACTOR Phase Output (in refactor-output.md)

```yaml
---
cycle_id: C001
feature_id: F001
phase: REFACTOR
timestamp: 2025-10-15T11:30:00Z
status: REFACTOR_COMPLETE

refactoring_done:
  - category: "Test Organization"
    changes:
      - "Grouped tests with describe blocks"
      - "Added better test descriptions"
      - "Extracted common test data to variables"

  - category: "Code Quality"
    changes:
      - "Added JSDoc comments to utils.ts"
      - "Improved variable naming in formatDate"
      - "Added type annotations for clarity"

test_status_after_refactor:
  - total: 12
  - passing: 12 ✓
  - failing: 0
  - duration: 198ms (improved from 234ms)

quality_improvements:
  - readability: "Improved test descriptions"
  - maintainability: "Better test organization"
  - performance: "Reduced test duration by 15%"
  - documentation: "Added JSDoc comments"

next_steps: |
  TDD Cycle complete for F001.
  Ready for next feature or next function.

  Recommend: Continue with next untested module
  (data.ts, components, etc.)

files_modified:
  - techtrain-courses/__tests__/unit/utils.test.ts
  - techtrain-courses/lib/utils.ts (comments only)
---
```

## Workflow Example

### Complete TDD Cycle for a New Feature

#### **Phase 0: Planning (You)**

1. Write feature requirement in [feature-requirements.md](feature-requirements.md)
2. Notify Instance RED: "New feature F001 ready in feature-requirements.md"

#### **Phase 1: RED (Instance RED - Window 1)**

**You say:** "Check for new features and write failing tests"

**Instance RED does:**
1. Reads feature-requirements.md
2. Writes comprehensive failing tests
3. Runs tests to verify they fail
4. Documents specifications
5. Writes to red-output.md with "RED_COMPLETE"

**You do:** Switch to Instance GREEN window

#### **Phase 2: GREEN (Instance GREEN - Window 2)**

**You say:** "Check red-output.md and implement to make tests pass"

**Instance GREEN does:**
1. Reads red-output.md
2. Sees RED_COMPLETE signal
3. Writes minimal implementation
4. Runs tests until all pass
5. Writes to green-output.md with "GREEN_COMPLETE"

**You do:** Switch to Instance REFACTOR window

#### **Phase 3: REFACTOR (Instance REFACTOR - Window 3)**

**You say:** "Check green-output.md and refactor for quality"

**Instance REFACTOR does:**
1. Reads green-output.md
2. Sees GREEN_COMPLETE signal
3. Refactors code for quality
4. Re-runs tests (must stay green)
5. Writes to refactor-output.md with "REFACTOR_COMPLETE"

**You do:** Cycle complete! Start next feature or next cycle.

## Benefits of Multi-Instance TDD

### 1. **Separation of Concerns**
- Each instance has ONE job
- No temptation to skip tests
- Clear responsibilities

### 2. **Enforced Discipline**
- Can't write implementation before tests (different instance!)
- Can't modify tests to pass (GREEN doesn't touch tests)
- Can't skip refactor (separate instance focuses on it)

### 3. **Parallel Learning**
- See TDD from three perspectives
- Understand each phase deeply
- Learn best practices for each role

### 4. **Audit Trail**
- Complete history of TDD cycle
- Track what was tested, implemented, refactored
- Easy to review decisions

### 5. **Quality Assurance**
- RED ensures tests are comprehensive
- GREEN ensures minimal implementation
- REFACTOR ensures code quality

## Anti-Patterns to Avoid

### ❌ Don't Do This:

1. **Skipping RED:** "I'll write tests later"
   - Always start with Instance RED

2. **Modifying Tests in GREEN:** "This test is wrong, let me fix it"
   - Tests are specifications, don't change them

3. **Implementing in RED:** "While I'm here, let me add the code too"
   - Stay in your lane

4. **Skipping REFACTOR:** "It works, ship it"
   - Technical debt accumulates

5. **Breaking the Cycle:** "Let me just add this one feature without tests"
   - Discipline is everything

## Status Tracking

Use [tdd-cycle-status.md](tdd-cycle-status.md) to track current state:

```markdown
# Current TDD Cycle Status

**Current Feature:** F001 - Testing Infrastructure
**Current Phase:** GREEN
**Current Instance:** Instance GREEN (Window 2)
**Action Required:** Implement to make tests pass

## Cycle History
- [x] F001 - Phase RED (Complete)
- [ ] F001 - Phase GREEN (In Progress)
- [ ] F001 - Phase REFACTOR (Pending)
```

## Quick Reference Commands

### For Instance RED (Window 1):
```
"Check feature-requirements.md for new features"
"Write failing tests for feature F001"
"Run tests to verify they fail"
"Mark RED phase complete"
```

### For Instance GREEN (Window 2):
```
"Check red-output.md for failing tests"
"Implement minimal code to make tests pass"
"Run tests to verify all pass"
"Mark GREEN phase complete"
```

### For Instance REFACTOR (Window 3):
```
"Check green-output.md for implementation"
"Refactor code for better quality"
"Re-run tests to ensure still passing"
"Mark REFACTOR phase complete"
```

## Getting Started

1. **Open 3 VS Code windows** with this workspace
2. **Configure each instance** with instructions above
3. **Write first feature** in feature-requirements.md
4. **Start TDD cycle** with Instance RED
5. **Follow the cycle:** RED → GREEN → REFACTOR → repeat

## Tips for Success

- **Stay disciplined:** Follow the cycle strictly
- **Keep cycles small:** 15-30 minute cycles are ideal
- **Communicate clearly:** Use structured YAML format
- **Track progress:** Update tdd-cycle-status.md
- **Celebrate green:** Every passing test is a win
- **Refactor fearlessly:** Tests give you confidence

---

**Remember:** TDD is not about testing. It's about design through tests.

Let the cycle guide you. Trust the process.

🔴 Write a test → 🟢 Make it pass → 🔵 Make it better → Repeat

---

## Git Worktree Integration

This TDD workflow integrates seamlessly with **git worktrees** for true parallel development across multiple features.

### Why Worktrees + TDD?

**Worktrees** allow you to work on multiple branches simultaneously in separate directories, perfect for:
- Running TDD cycles on different features in parallel
- Quick context switching without losing work
- Isolating experimental features
- Handling hotfixes while continuing feature development

### Worktree Commands

Available slash commands for worktree management:

- `/worktree-create` - Create new worktree for parallel development
- `/worktree-list` - Show all worktrees with status
- `/worktree-remove` - Safely remove completed worktree
- `/worktree-sync` - Sync worktree with master branch

### Worktree + TDD Setup

#### Single Feature, Multiple Instances (TDD Cycle)

**One worktree, three windows:**

```
📁 Worktree: ../worktrees/feature/user-auth
   🔴 Window 1: Instance RED (write tests)
   🟢 Window 2: Instance GREEN (implement)
   🔵 Window 3: Instance REFACTOR (optimize)
```

**How to set up:**
1. Create worktree: `/worktree-create`
2. Enter branch name: `feature/user-auth`
3. Copy TDD workspace: `cp -r .claude-workspace <worktree-path>/`
4. Open 3 Claude Code windows at worktree path
5. Start TDD cycle with Instance RED

#### Multiple Features in Parallel

**Multiple worktrees, each with TDD cycle:**

```
📁 Main Repo (master)
   - Review PRs, handle merges

📁 Worktree 1: feature/authentication
   🔴 RED: Writing auth tests
   🟢 GREEN: Implementing auth
   🔵 REFACTOR: Cleaning auth code

📁 Worktree 2: feature/payments
   🔴 RED: Writing payment tests
   🟢 GREEN: Implementing Stripe
   🔵 REFACTOR: Optimizing payment flow

📁 Worktree 3: feature/notifications
   🟢 GREEN: Implementing email service
```

### Benefits of Worktrees + TDD

✅ **True parallel development** - Multiple features at once
✅ **Zero context switching cost** - Each worktree is isolated
✅ **TDD discipline enforced** - Separate instances per phase
✅ **Easy cleanup** - Remove worktree when done
✅ **Safe experimentation** - Try ideas without affecting main work
✅ **Efficient disk usage** - Shared .git directory

### Quick Reference: Worktree + TDD Commands

```bash
# Create worktree with TDD
/worktree-create
cp -r .claude-workspace <worktree-path>/

# List all worktrees
/worktree-list

# Sync with master
/worktree-sync

# Remove completed worktree
/worktree-remove

# Open in new window
code <worktree-path>
```

---

**Worktrees enable:** True parallel development without conflicts.

**Together they unlock:** Maximum productivity with maximum code quality.

**In parallel, across multiple features, with zero friction.**
