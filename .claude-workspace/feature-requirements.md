# Feature Requirements Queue

**Project:** TechTrain Courses
**Last Updated:** 2025-10-15T10:00:00Z

---

## Pending Features

### F001: Testing Infrastructure Setup
```yaml
---
feature_id: F001
created: 2025-10-15T10:00:00Z
status: ready_for_red
priority: critical
assigned_to: Instance RED

title: Setup Vitest Testing Infrastructure

user_story: |
  As a developer
  I want a complete testing setup with Vitest
  So that I can write and run unit tests for my code

acceptance_criteria:
  - Vitest installed and configured
  - vitest.config.ts properly set up
  - npm test scripts added to package.json
  - Sample tests for lib/utils.ts (formatPrice, formatDate, cn)
  - All tests passing
  - Test coverage reporting configured
  - README updated with testing instructions

test_scope:
  - formatPrice: 5 test cases minimum
  - formatDate: 4 test cases minimum
  - cn: 3 test cases minimum

estimated_cycles: 1 (simple utilities)

technical_notes: |
  - Use Vitest (not Jest) for Next.js 14 compatibility
  - Configure for TypeScript
  - Test server-side functions (formatDate has window check)
  - Use @testing-library for component tests (future)

dependencies: none

blocks: F002, F003 (all future features need tests)
---
```

### F002: Data Layer Testing
```yaml
---
feature_id: F002
created: 2025-10-15T10:00:00Z
status: blocked
priority: high
blocked_by: F001

title: Test Coverage for Data Layer

user_story: |
  As a developer
  I want comprehensive tests for lib/data.ts
  So that I can safely refactor data access logic

acceptance_criteria:
  - Tests for getCourseBySlug
  - Tests for getCoursesByCategory
  - Tests for getFeaturedCourses
  - Tests for helper functions (createSlug, getDuration, etc.)
  - Edge case coverage (invalid slugs, empty categories)
  - Mock data handling

test_scope:
  - getCourseBySlug: 3 test cases
  - getCoursesByCategory: 3 test cases
  - getFeaturedCourses: 2 test cases
  - createSlug: 5 test cases (handles special chars, Dutch characters)
  - getDuration: 4 test cases
  - getCourseDates: 2 test cases

estimated_cycles: 2

technical_notes: |
  - Mock rawCourseData for predictable tests
  - Test Dutch character handling in slugs (ë, ï, etc.)
  - Verify date generation logic

dependencies: F001
---
```

### F003: Component Testing (CourseCard)
```yaml
---
feature_id: F003
created: 2025-10-15T10:00:00Z
status: blocked
priority: medium
blocked_by: F001

title: Component Tests for CourseCard

user_story: |
  As a developer
  I want tests for the CourseCard component
  So that UI changes don't break existing functionality

acceptance_criteria:
  - Renders course title, price, rating
  - Displays correct format badge
  - Links to correct course slug
  - Handles missing optional fields (rating)
  - Responsive image loading
  - Proper accessibility attributes

test_scope:
  - Rendering: 4 test cases
  - User interaction: 2 test cases
  - Edge cases: 2 test cases

estimated_cycles: 1

technical_notes: |
  - Use @testing-library/react
  - Mock Next.js Image component
  - Mock Next.js Link component
  - Test accessibility (ARIA labels)

dependencies: F001
---
```

---

## In Progress

*No features currently in progress*

---

## Completed Features

*No completed features yet*

---

## Backlog (Lower Priority)

### F004: Form Validation Testing (Checkout)
- Test Zod schemas
- Test React Hook Form integration
- Test error messages in Dutch

### F005: API Route Testing
- (When backend added)

### F006: E2E Testing with Playwright
- User enrollment flow
- Checkout flow
- Course browsing

---

## Feature Request Template

```yaml
---
feature_id: F###
created: YYYY-MM-DDTHH:MM:SSZ
status: pending | ready_for_red | in_progress | blocked | completed
priority: critical | high | medium | low
blocked_by: F### (if blocked)

title: Short descriptive title

user_story: |
  As a [role]
  I want [feature]
  So that [benefit]

acceptance_criteria:
  - Criterion 1
  - Criterion 2
  - Criterion 3

test_scope:
  - Function/Component 1: X test cases
  - Function/Component 2: Y test cases

estimated_cycles: N (how many RED-GREEN-REFACTOR cycles)

technical_notes: |
  Implementation details, gotchas, dependencies, etc.

dependencies: F### (must complete first)
blocks: F### (blocks this feature)
---
```

---

## Notes

- Keep features small (1-3 cycles maximum)
- Write clear acceptance criteria
- Define test scope explicitly
- Update status as cycles progress
- Mark dependencies and blocking relationships
