# Add New Course to Platform

Scaffold a new course with all necessary files, database entries, and tests following TDD principles.

## Instructions

This command helps you add a new course to your existing course platform.

1. Ask the user for basic course information:
   - Course title
   - Course slug (URL-friendly, e.g., "typescript-mastery")
   - Short description
   - Price
   - Number of modules (optional, can add later)

2. **WRITE TESTS FIRST** (TDD principle):
   - Create test file for course API route
   - Create test file for course page component
   - Write tests that define expected behavior
   - Run tests to verify they fail (RED phase)

3. Create the following files/entries:
   - Database seed data for the course
   - Course page: `src/app/courses/[slug]/page.tsx`
   - Course API route: `src/app/api/courses/[id]/route.ts`
   - Course component tests: `tests/unit/courses/[slug].test.tsx`
   - Course API tests: `tests/integration/api/courses.test.ts`

4. Run tests again - they should still fail

5. Implement minimal code to make tests pass (GREEN phase)

6. Optionally refactor (REFACTOR phase)

## Example Test-First Flow

**Step 1: Write tests**
```typescript
// tests/integration/api/courses/typescript-mastery.test.ts
describe('GET /api/courses/typescript-mastery', () => {
  it('should return course details', async () => {
    const response = await fetch('/api/courses/typescript-mastery')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.course.title).toBe('TypeScript Mastery')
    expect(data.course.price).toBe(149)
  })
})
```

**Step 2: Run tests (should fail)**
```bash
npm run test
# Expected: FAIL - Route not implemented yet
```

**Step 3: Implement**
```typescript
// src/app/api/courses/typescript-mastery/route.ts
export async function GET() {
  const course = await db.course.findUnique({
    where: { slug: 'typescript-mastery' }
  })
  return Response.json({ course })
}
```

**Step 4: Run tests (should pass)**
```bash
npm run test
# Expected: PASS
```

## Files Created

For a course with slug `typescript-mastery`:

```
src/app/courses/typescript-mastery/
  └── page.tsx                    # Course landing page

src/app/api/courses/
  └── typescript-mastery/
      └── route.ts                # Course API endpoint

tests/unit/courses/
  └── typescript-mastery.test.tsx # Component tests

tests/integration/api/
  └── courses-typescript-mastery.test.ts # API tests

prisma/seed.ts                    # Add course to seed data
```

## Database Entry

Add course to database (development):
```typescript
// prisma/seed.ts
const typescriptCourse = await prisma.course.create({
  data: {
    slug: 'typescript-mastery',
    title: 'TypeScript Mastery',
    description: 'Learn TypeScript from beginner to advanced',
    price: 149,
    currency: 'USD',
    status: 'published',
    // Add modules and lessons as needed
  }
})
```

## Verification

After running this command:
- ✅ Tests exist and define course behavior
- ✅ Tests initially failed (verified TDD)
- ✅ Implementation makes tests pass
- ✅ Course page is accessible at `/courses/typescript-mastery`
- ✅ Course API responds at `/api/courses/typescript-mastery`
- ✅ Database contains course entry

## Next Steps

After adding the course:
1. Add course modules and lessons
2. Add course thumbnail image
3. Write detailed course description
4. Set up Stripe product for payment
5. Test enrollment flow
