# RED Phase Output (Test Specification)

**Instance:** RED (Test Writer)
**Role:** Write failing tests that define specifications

---

## Status: 🟡 Waiting for Instructions

**Waiting for:** User to say "Check feature-requirements.md and write tests for F001"

---

## Completed Cycles

*No cycles completed yet*

---

## Instructions for User

When you're ready to start the RED phase:

1. Make sure feature is defined in [feature-requirements.md](feature-requirements.md)
2. Tell Instance RED: **"Check feature-requirements.md for F001 and write failing tests"**
3. Instance RED will:
   - Read the feature requirements
   - Write comprehensive failing tests
   - Run tests to verify they fail
   - Document specifications
   - Write output here with "RED_COMPLETE" status

4. Then switch to Instance GREEN (Window 2)

---

## Template for RED Output

```yaml
---
cycle_id: C001
feature_id: F001
phase: RED
timestamp: 2025-10-15T10:30:00Z
status: RED_COMPLETE

tests_written:
  - file: path/to/test/file.test.ts
    test_count: X
    coverage:
      - Function/component tested
      - Edge cases covered

test_status:
  - total: X
  - passing: 0
  - failing: X ✓ (Expected - tests should fail initially)

specifications:
  function_name:
    - "Test case 1 description"
    - "Test case 2 description"

next_instance: Instance GREEN
action_required: "Implement to make tests pass"

files_created:
  - List of test files created
---
```
