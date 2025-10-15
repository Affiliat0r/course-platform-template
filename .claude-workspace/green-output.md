# GREEN Phase Output (Implementation)

**Instance:** GREEN (Implementation Engineer)
**Role:** Make tests pass with minimal code

---

## Status: ⏸️ Waiting for RED Phase

**Waiting for:** Instance RED to complete and mark "RED_COMPLETE" in [red-output.md](red-output.md)

---

## Completed Cycles

*No cycles completed yet*

---

## Instructions for User

When RED phase is complete:

1. Check [red-output.md](red-output.md) for "RED_COMPLETE" status
2. Switch to Window 2 (Instance GREEN)
3. Tell Instance GREEN: **"Check red-output.md and implement to make tests pass"**
4. Instance GREEN will:
   - Read the failing tests
   - Write minimal implementation
   - Run tests until all pass
   - Document changes
   - Write output here with "GREEN_COMPLETE" status

5. Then switch to Instance REFACTOR (Window 3)

---

## Template for GREEN Output

```yaml
---
cycle_id: C001
feature_id: F001
phase: GREEN
timestamp: 2025-10-15T11:00:00Z
status: GREEN_COMPLETE

implementation_files:
  - file: path/to/implementation/file.ts
    changes: "Description of changes"
    lines_added: X

test_status:
  - total: X
  - passing: X ✓
  - failing: 0

test_run_output: |
  Test suite output showing all green

implementation_notes: |
  Notes about the implementation approach

next_instance: Instance REFACTOR
action_required: "Review and improve code quality"

files_modified:
  - List of files changed
---
```
