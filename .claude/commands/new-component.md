# Create New Component (TDD)

Scaffold a new React component with tests following test-driven development principles.

## Instructions

This command creates a new UI component using TDD methodology.

1. Ask for component details:
   - Component name (e.g., "CourseCard", "EnrollButton", "ProgressBar")
   - Component purpose
   - Expected props
   - Expected behavior

2. **WRITE TESTS FIRST**:
   - Create test file: `tests/unit/components/[ComponentName].test.tsx`
   - Write tests for:
     - Rendering with different props
     - User interactions (clicks, form submissions)
     - Conditional rendering
     - Accessibility requirements

3. **Run tests - they should fail** (RED phase)

4. **Create component file**: `src/components/[ComponentName].tsx`
   - Write minimal implementation to pass tests

5. **Run tests - they should pass** (GREEN phase)

6. **Refactor if needed** (REFACTOR phase)

## Example: Create CourseCard Component

### Step 1: Write Tests First

```typescript
// tests/unit/components/CourseCard.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CourseCard } from '@/components/CourseCard'

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'TypeScript Mastery',
    description: 'Learn TypeScript from scratch',
    price: 149,
    thumbnailUrl: '/course-thumbnail.jpg'
  }

  it('renders course title', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('TypeScript Mastery')).toBeInTheDocument()
  })

  it('renders course description', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('Learn TypeScript from scratch')).toBeInTheDocument()
  })

  it('renders price', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('$149')).toBeInTheDocument()
  })

  it('renders thumbnail image with alt text', () => {
    render(<CourseCard course={mockCourse} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/course-thumbnail.jpg')
    expect(img).toHaveAttribute('alt', expect.stringContaining('TypeScript Mastery'))
  })

  it('has accessible enroll button', () => {
    render(<CourseCard course={mockCourse} />)
    const button = screen.getByRole('button', { name: /enroll/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onEnroll when button clicked', async () => {
    const onEnroll = vi.fn()
    render(<CourseCard course={mockCourse} onEnroll={onEnroll} />)

    const button = screen.getByRole('button', { name: /enroll/i })
    await userEvent.click(button)

    expect(onEnroll).toHaveBeenCalledWith(mockCourse.id)
  })
})
```

### Step 2: Run Tests (Should Fail)

```bash
npm run test CourseCard
# Expected: FAIL - Component doesn't exist yet ✅
```

### Step 3: Create Component (Minimal Implementation)

```typescript
// src/components/CourseCard.tsx
import Image from 'next/image'

interface Course {
  id: string
  title: string
  description: string
  price: number
  thumbnailUrl: string
}

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <Image
        src={course.thumbnailUrl}
        alt={`${course.title} course thumbnail`}
        width={400}
        height={225}
        className="rounded-lg"
      />
      <h3 className="text-xl font-bold mt-4">{course.title}</h3>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <p className="text-2xl font-bold mt-4">${course.price}</p>
      <button
        onClick={() => onEnroll?.(course.id)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Enroll Now
      </button>
    </div>
  )
}
```

### Step 4: Run Tests (Should Pass)

```bash
npm run test CourseCard
# Expected: PASS ✅
```

### Step 5: Refactor (Optional)

Extract styling, add hover states, improve accessibility:

```typescript
// src/components/CourseCard.tsx
import Image from 'next/image'
import Link from 'next/link'

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <article className="group border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Link href={`/courses/${course.slug}`}>
        <Image
          src={course.thumbnailUrl}
          alt={`${course.title} course thumbnail`}
          width={400}
          height={225}
          className="rounded-lg group-hover:opacity-90 transition-opacity"
        />
        <h3 className="text-xl font-bold mt-4 group-hover:text-blue-600">
          {course.title}
        </h3>
      </Link>
      <p className="text-gray-600 mt-2 line-clamp-2">{course.description}</p>
      <div className="flex items-center justify-between mt-4">
        <p className="text-2xl font-bold">${course.price}</p>
        <button
          onClick={() => onEnroll?.(course.id)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          aria-label={`Enroll in ${course.title}`}
        >
          Enroll Now
        </button>
      </div>
    </article>
  )
}
```

Run tests again to ensure refactoring didn't break anything:
```bash
npm run test CourseCard
# Expected: Still PASS ✅
```

## Files Created

For a component named `CourseCard`:

```
src/components/
  └── CourseCard.tsx           # Component implementation

tests/unit/components/
  └── CourseCard.test.tsx      # Component tests
```

## Common Components to Create

For a course platform:
- `CourseCard` - Display course in catalog
- `EnrollButton` - Enrollment action button
- `ProgressBar` - Show course completion
- `LessonList` - Display course lessons
- `VideoPlayer` - Course video player
- `PriceTag` - Display formatted price
- `CourseFilters` - Filter course catalog
- `StudentDashboard` - Student overview

## Testing Best Practices

**Test behavior, not implementation:**
```typescript
// ✅ Good - Tests what user sees
expect(screen.getByText('TypeScript Mastery')).toBeInTheDocument()

// ❌ Bad - Tests implementation details
expect(wrapper.find('.title').text()).toBe('TypeScript Mastery')
```

**Test accessibility:**
```typescript
// Ensure buttons have accessible names
screen.getByRole('button', { name: /enroll/i })

// Ensure images have alt text
screen.getByRole('img', { name: /course thumbnail/i })
```

**Test user interactions:**
```typescript
import userEvent from '@testing-library/user-event'

// Simulate user clicking button
await userEvent.click(screen.getByRole('button'))

// Simulate typing
await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
```

## Verification

After creating a component:
- ✅ Test file exists and defines component behavior
- ✅ Tests initially failed (verified TDD)
- ✅ Component implementation passes all tests
- ✅ Component is accessible (proper ARIA, keyboard nav)
- ✅ Component is responsive (tested at different screen sizes)
- ✅ Component matches design system (if applicable)

## Next Steps

After creating the component:
1. Use it in a page or parent component
2. Add Storybook story (optional, for component showcase)
3. Test in browser at different screen sizes
4. Run accessibility audit with axe DevTools
