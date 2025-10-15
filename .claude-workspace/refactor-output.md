# REFACTOR Phase Output (Code Quality)

**Instance:** REFACTOR (Code Quality Expert)
**Role:** Improve code quality while keeping tests green

---

## Status: ⏸️ Waiting for GREEN Phase

**Waiting for:** Instance GREEN to complete and mark "GREEN_COMPLETE" in [green-output.md](green-output.md)

---

## Completed Cycles

*No cycles completed yet*

---

## Instructions for User

When GREEN phase is complete:

1. Check [green-output.md](green-output.md) for "GREEN_COMPLETE" status
2. Switch to Window 3 (Instance REFACTOR)
3. Tell Instance REFACTOR: **"Check green-output.md and refactor for quality"**
4. Instance REFACTOR will:
   - Read the implementation
   - Refactor for better quality
   - Re-run tests (must stay green)
   - Document improvements
   - Write output here with "REFACTOR_COMPLETE" status

5. Cycle complete! Start next feature or next cycle.

---

## Template for REFACTOR Output

```yaml
---
cycle_id: C001
feature_id: F001
phase: REFACTOR
timestamp: 2025-10-15T11:30:00Z
status: REFACTOR_COMPLETE

refactoring_done:
  - category: "Category name"
    changes:
      - "Specific change 1"
      - "Specific change 2"

test_status_after_refactor:
  - total: X
  - passing: X ✓
  - failing: 0
  - duration: Xms

quality_improvements:
  - readability: "What improved"
  - maintainability: "What improved"
  - performance: "What improved"
  - documentation: "What improved"

next_steps: |
  Recommendations for next cycle or feature

files_modified:
  - List of files refactored
---
```
