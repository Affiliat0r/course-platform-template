# Test-Driven Development (TDD) Workflow

This document explains how to use TDD practices with this course platform template, following Anthropic's Claude Code best practices.

## TDD Philosophy

**Write tests first, then implement code to make them pass.**

This approach:
- Ensures code meets requirements
- Provides a clear target for implementation
- Catches bugs early
- Documents expected behavior
- Makes refactoring safer

## The Red-Green-Refactor Cycle

### 🔴 RED Phase: Write Failing Tests

1. **Understand the requirement**
   - What feature are you building?
   - What behavior should it have?

2. **Write specific tests**
   - Focus on input/output pairs
   - Use clear assertions
   - **DO NOT write implementation code yet**

3. **Run tests and verify they fail**
   - Failing tests prove they're actually testing something
   - Expected failure validates test logic

**Example:**

\`\`\`typescript
// tests/unit/components/EnrollButton.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EnrollButton } from '@/components/EnrollButton'

describe('EnrollButton', () => {
  it('renders with course title in aria-label', () => {
    render(<EnrollButton courseTitle="TypeScript Mastery" />)
    const button = screen.getByRole('button', { name: /enroll in typescript mastery/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onEnroll when clicked', async () => {
    const handleEnroll = vi.fn()
    render(<EnrollButton onEnroll={handleEnroll} courseTitle="React Basics" />)

    await userEvent.click(screen.getByRole('button'))
    expect(handleEnroll).toHaveBeenCalledTimes(1)
  })

  it('shows loading state when processing', () => {
    render(<EnrollButton isLoading courseTitle="Node.js" />)
    expect(screen.getByText(/enrolling/i)).toBeInTheDocument()
  })
})
\`\`\`

Run tests:
\`\`\`bash
npm run test:watch
# Expected: FAIL - Component doesn't exist yet ✅
\`\`\`

### 🟢 GREEN Phase: Make Tests Pass

1. **Write minimal implementation**
   - Just enough code to pass tests
   - Don't over-engineer
   - **DO NOT modify tests** - they are the specification

2. **Run tests frequently**
   - After small changes
   - Iterate until all tests pass

**Example:**

\`\`\`typescript
// src/components/EnrollButton.tsx
import { Button } from '@/components/ui/Button'

interface EnrollButtonProps {
  courseTitle: string
  onEnroll?: () => void
  isLoading?: boolean
}

export function EnrollButton({ courseTitle, onEnroll, isLoading }: EnrollButtonProps) {
  return (
    <Button
      onClick={onEnroll}
      disabled={isLoading}
      aria-label={\`Enroll in \${courseTitle}\`}
    >
      {isLoading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  )
}
\`\`\`

Run tests:
\`\`\`bash
npm run test:watch
# Expected: PASS ✅
\`\`\`

### ♻️ REFACTOR Phase: Improve Code Quality

1. **Improve structure while tests pass**
   - Apply DRY (Don't Repeat Yourself)
   - Better naming
   - Extract functions/components
   - Optimize performance

2. **Run tests after each refactor**
   - Ensure nothing broke
   - Tests protect against regressions

**Example:**

\`\`\`typescript
// src/components/EnrollButton.tsx (refactored)
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

interface EnrollButtonProps {
  courseTitle: string
  onEnroll?: () => void
  isLoading?: boolean
  variant?: 'default' | 'outline'
}

export function EnrollButton({
  courseTitle,
  onEnroll,
  isLoading = false,
  variant = 'default',
}: EnrollButtonProps) {
  return (
    <Button
      onClick={onEnroll}
      disabled={isLoading}
      variant={variant}
      aria-label={\`Enroll in \${courseTitle}\`}
      className="gap-2"
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {isLoading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  )
}
\`\`\`

Run tests:
\`\`\`bash
npm run test:watch
# Expected: Still PASS ✅
\`\`\`

## Claude Code TDD Commands

Use these slash commands to guide your TDD workflow:

### `/tdd-cycle`

Walks you through a complete Red-Green-Refactor cycle.

**Usage:**
1. Type `/tdd-cycle` in Claude Code
2. Describe the feature you want to implement
3. Claude guides you through writing tests first
4. Verify tests fail
5. Implement code
6. Verify tests pass
7. Refactor

### `/new-component`

Creates a new component with tests following TDD.

**Usage:**
1. Type `/new-component`
2. Provide component name and purpose
3. Claude writes tests first
4. Tests fail (RED)
5. Minimal implementation created (GREEN)
6. Optional refactoring (REFACTOR)

### `/new-course`

Adds a new course with TDD approach.

**Usage:**
1. Type `/new-course`
2. Provide course details
3. Tests are written for API routes and pages
4. Implementation follows

## TDD Best Practices

### ✅ DO:

- **Write tests before code** - Always start with RED
- **Verify tests fail** - Proves tests work
- **Keep tests unchanged during implementation** - Tests are the spec
- **Test behavior, not implementation** - Focus on what, not how
- **Use descriptive test names** - Clear intent
- **Test one thing per test** - Focused assertions

### ❌ DON'T:

- **Skip the "verify it fails" step** - Crucial validation
- **Modify tests to make them pass** - Defeats the purpose
- **Write vague tests** - Be specific
- **Over-mock everything** - Use real integrations when practical
- **Write implementation before tests** - Not TDD!

## Testing Layers

### 1. Unit Tests (Vitest)

Test individual components and functions in isolation.

**Location:** `tests/unit/`

**Example:**
\`\`\`typescript
// tests/unit/lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice, slugify } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats USD price correctly', () => {
    expect(formatPrice(149, 'USD')).toBe('$149.00')
  })

  it('formats EUR price correctly', () => {
    expect(formatPrice(99.99, 'EUR')).toBe('€99.99')
  })
})

describe('slugify', () => {
  it('converts text to URL-friendly slug', () => {
    expect(slugify('TypeScript Mastery')).toBe('typescript-mastery')
  })

  it('removes special characters', () => {
    expect(slugify('React & Next.js!')).toBe('react-nextjs')
  })
})
\`\`\`

**Run:**
\`\`\`bash
npm run test:unit
\`\`\`

### 2. Integration Tests (Vitest)

Test how components/modules work together.

**Location:** `tests/integration/`

**Example:**
\`\`\`typescript
// tests/integration/api/courses.test.ts
import { describe, it, expect } from 'vitest'
import { GET } from '@/app/api/courses/route'

describe('GET /api/courses', () => {
  it('returns list of published courses', async () => {
    const request = new Request('http://localhost:3000/api/courses')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.courses).toBeInstanceOf(Array)
    expect(data.courses.every(c => c.status === 'PUBLISHED')).toBe(true)
  })

  it('filters courses by price range', async () => {
    const request = new Request('http://localhost:3000/api/courses?minPrice=50&maxPrice=100')
    const response = await GET(request)
    const data = await response.json()

    expect(data.courses.every(c => c.price >= 50 && c.price <= 100)).toBe(true)
  })
})
\`\`\`

### 3. E2E Tests (Playwright)

Test complete user flows from browser perspective.

**Location:** `tests/e2e/`

**Example:**
\`\`\`typescript
// tests/e2e/enrollment-flow.e2e.ts
import { test, expect } from '@playwright/test'

test.describe('Course Enrollment Flow', () => {
  test('user can enroll in a course', async ({ page }) => {
    // Navigate to course page
    await page.goto('/courses/typescript-mastery')

    // Click enroll button
    await page.click('button:has-text("Enroll Now")')

    // Should redirect to login (if not authenticated)
    await expect(page).toHaveURL(/.*login/)

    // Login
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    // Should redirect to checkout
    await expect(page).toHaveURL(/.*checkout/)

    // Complete payment (using Stripe test mode)
    // ... payment flow ...

    // Verify enrollment
    await expect(page).toHaveURL(/.*dashboard/)
    await expect(page.locator('text=TypeScript Mastery')).toBeVisible()
  })
})
\`\`\`

**Run:**
\`\`\`bash
npm run test:e2e
\`\`\`

### 4. Accessibility Tests (Playwright + axe)

Ensure WCAG 2.1 AA compliance.

**Location:** `tests/a11y/`

**Example:**
\`\`\`typescript
// tests/a11y/course-page.e2e.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('course page has no accessibility violations', async ({ page }) => {
  await page.goto('/courses/typescript-mastery')

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})
\`\`\`

**Run:**
\`\`\`bash
npm run test:a11y
\`\`\`

## Example TDD Session

### Scenario: Add filtering to course catalog

**Step 1: Write tests (RED)**

\`\`\`typescript
// tests/integration/api/courses.test.ts
describe('Course filtering', () => {
  it('filters courses by category', async () => {
    const response = await fetch('/api/courses?category=programming')
    const data = await response.json()

    expect(data.courses.every(c => c.category === 'programming')).toBe(true)
  })

  it('filters courses by price range', async () => {
    const response = await fetch('/api/courses?minPrice=50&maxPrice=150')
    const data = await response.json()

    expect(data.courses.every(c => c.price >= 50 && c.price <= 150)).toBe(true)
  })
})
\`\`\`

Run: `npm test` → **FAIL** ✅ (Expected - feature doesn't exist)

**Step 2: Implement (GREEN)**

\`\`\`typescript
// src/app/api/courses/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  const courses = await db.course.findMany({
    where: {
      status: 'PUBLISHED',
      category: category || undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      },
    },
  })

  return Response.json({ courses })
}
\`\`\`

Run: `npm test` → **PASS** ✅

**Step 3: Refactor (REFACTOR)**

\`\`\`typescript
// src/lib/course-filters.ts
export function buildCourseFilters(searchParams: URLSearchParams) {
  return {
    status: 'PUBLISHED' as const,
    category: searchParams.get('category') || undefined,
    price: {
      gte: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      lte: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    },
  }
}

// src/app/api/courses/route.ts
import { buildCourseFilters } from '@/lib/course-filters'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filters = buildCourseFilters(searchParams)

  const courses = await db.course.findMany({ where: filters })
  return Response.json({ courses })
}
\`\`\`

Run: `npm test` → **Still PASS** ✅

## Resources

- [Anthropic's Claude Code TDD Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)

## Getting Help

Use Claude Code agents for TDD guidance:
- `.claude/agents/test-first-guide.md` - Enforces TDD workflow
- Ask Claude: "Help me write tests for [feature] following TDD"
- Use `/tdd-cycle` command for guided workflow
