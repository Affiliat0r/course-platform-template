# TDD Cycle: Red-Green-Refactor

Guide you through one complete Test-Driven Development cycle following Anthropic's best practices.

## Instructions

This command helps you implement a feature using the Red-Green-Refactor methodology.

### Phase 1: RED - Write Failing Tests

1. **Understand the requirement**
   - Ask: What feature/behavior are we implementing?
   - Example: "User can filter course catalog by price range"

2. **Write tests that describe expected behavior**
   - Focus on input/output pairs
   - Be specific about assertions
   - **DO NOT write implementation code yet**

3. **Run tests to confirm they fail**
   - This validates the tests are actually testing something
   - Show the failure output
   - Confirm the failure is expected

**Example:**
```typescript
// tests/integration/course-filter.test.ts
describe('Course filtering', () => {
  it('should filter courses by price range', async () => {
    const response = await fetch('/api/courses?minPrice=50&maxPrice=100')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.courses).toBeInstanceOf(Array)
    expect(data.courses.every(c => c.price >= 50 && c.price <= 100)).toBe(true)
  })
})
```

```bash
npm run test
# Expected: FAIL - Filtering not implemented yet ✅
```

### Phase 2: GREEN - Make Tests Pass

1. **Write minimal implementation code** to make tests pass
   - Focus on making it work, not making it perfect
   - **DO NOT modify the tests** - they are the specification
   - Run tests frequently

2. **Iterate until all tests pass**
   - Make small changes
   - Run tests after each change
   - Avoid over-engineering

**Example:**
```typescript
// src/app/api/courses/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  const courses = await db.course.findMany({
    where: {
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      }
    }
  })

  return Response.json({ courses })
}
```

```bash
npm run test
# Expected: PASS ✅
```

### Phase 3: REFACTOR - Improve Code Quality

1. **Improve code structure** while keeping tests passing
   - Apply DRY principles (Don't Repeat Yourself)
   - Enhance readability
   - Extract functions/components
   - Improve naming

2. **Run tests after each refactor** to ensure nothing broke

**Example:**
```typescript
// src/lib/course-filters.ts
export function buildPriceFilter(minPrice?: string, maxPrice?: string) {
  return {
    gte: minPrice ? Number(minPrice) : undefined,
    lte: maxPrice ? Number(maxPrice) : undefined,
  }
}

// src/app/api/courses/route.ts
import { buildPriceFilter } from '@/lib/course-filters'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const courses = await db.course.findMany({
    where: {
      price: buildPriceFilter(
        searchParams.get('minPrice'),
        searchParams.get('maxPrice')
      )
    }
  })

  return Response.json({ courses })
}
```

```bash
npm run test
# Expected: Still PASS ✅
```

## Key Principles

✅ **DO:**
- Write tests BEFORE implementation
- Verify tests fail before implementing
- Keep tests unchanged during implementation
- Make small, incremental changes
- Run tests frequently
- Refactor with confidence (tests protect you)

❌ **DON'T:**
- Write implementation before tests
- Skip the "verify it fails" step
- Modify tests to make them pass
- Write vague tests without clear assertions
- Make large changes without running tests

## When to Use This Command

Use `/tdd-cycle` when:
- Adding a new feature
- Fixing a bug (write test that reproduces bug first)
- Refactoring existing code (write tests for current behavior first)
- Implementing an API endpoint
- Building a UI component

## Integration with Course Platform

Common TDD cycles for course platform:

**Example 1: Course Enrollment**
- RED: Write test for enrollment API
- GREEN: Implement enrollment creation
- REFACTOR: Extract enrollment logic to service

**Example 2: Payment Processing**
- RED: Write test for Stripe checkout session creation
- GREEN: Implement Stripe integration
- REFACTOR: Extract payment logic to payment service

**Example 3: Progress Tracking**
- RED: Write test for marking lesson as complete
- GREEN: Implement progress update
- REFACTOR: Optimize database queries

## Verification

After completing a TDD cycle:
- ✅ Tests exist for the feature
- ✅ Tests initially failed (verified)
- ✅ All tests now pass
- ✅ Code is refactored and clean
- ✅ No tests were modified during implementation

## Resources

- [Anthropic's TDD Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- Test-First Guide Agent (`.claude/agents/test-first-guide.md`)
