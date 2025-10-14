# Build Course Site (Fully Automated)

Automated workflow that goes from idea → research → specification → tests → implementation.

## Overview

This command automates the entire course platform creation process:
1. **Research** competitors (using MCP Playwright)
2. **Plan** the specification
3. **Generate** tests (TDD - RED phase)
4. **Implement** code to pass tests (GREEN phase)
5. **Set up** database and configuration

## Workflow Phases

### Phase 1: Research & Planning
```
Input: "TypeScript course for beginners"
         ↓
[Competitive Research Agent]
- Analyzes market
- Takes screenshots
- Identifies opportunities
         ↓
[Course Architect Agent]
- Creates specification
- Plans features
- Designs database
```

### Phase 2: Test Generation (RED)
```
[Generate Tests Automatically]
- API endpoint tests
- Component tests
- E2E user flow tests
- Accessibility tests
         ↓
Run Tests → All FAIL ❌ (Expected!)
```

### Phase 3: Implementation (GREEN)
```
[Generate Implementation]
- Database schema → Prisma
- API routes → Next.js
- Components → React
- Pages → Next.js App Router
         ↓
Run Tests → All PASS ✅
```

### Phase 4: Configuration
```
[Set Up Project]
- Create .env file
- Set up database
- Configure Stripe products
- Initialize git repository
```

## Detailed Workflow

### Step 1: Gather Requirements

Ask user for:
- **Course topic** (e.g., "TypeScript fundamentals")
- **Target market** (e.g., "Netherlands IT professionals")
- **Language** (e.g., "Dutch")
- **Budget level** (premium/mid/budget)
- **Automation level**:
  - Full (implement everything)
  - Partial (tests + structure only)
  - Guided (step-by-step with confirmations)

### Step 2: Market Research

Invoke Competitive Research agent with regional awareness:
```typescript
// Detect regional competitors
const region = "Netherlands"
const language = "Dutch"
const topic = "IT courses"

const competitors = await findRegionalCompetitors({
  region,
  language,
  topic,
  searchEngines: ['google.nl', 'local Dutch platforms']
})
```

### Step 3: Generate Specification

Based on research, create:
- Course structure
- Pricing strategy (converted to EUR for Netherlands)
- Localized features
- Database schema
- API endpoints

### Step 4: Generate All Tests First

**API Tests:**
```typescript
// tests/integration/api/courses.test.ts
describe('Courses API', () => {
  it('returns published courses', async () => {
    const res = await GET('/api/courses')
    expect(res.status).toBe(200)
    expect(res.body.courses).toBeArray()
  })

  it('filters by category', async () => {
    const res = await GET('/api/courses?category=programming')
    expect(res.body.courses.every(c => c.category === 'programming')).toBe(true)
  })
})
```

**Component Tests:**
```typescript
// tests/unit/components/CourseCard.test.tsx
describe('CourseCard', () => {
  it('displays course title', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('TypeScript Fundamentals')).toBeInTheDocument()
  })

  it('shows price in EUR', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('€149')).toBeInTheDocument()
  })
})
```

**E2E Tests:**
```typescript
// tests/e2e/purchase-flow.e2e.ts
test('user can purchase course', async ({ page }) => {
  await page.goto('/courses/typescript-fundamentals')
  await page.click('text=Koop Nu') // Dutch: "Buy Now"
  // ... rest of flow
})
```

### Step 5: Generate Implementation

**Database Schema:**
```prisma
model Course {
  id          String @id
  title       String
  titleNl     String // Dutch title
  description String
  descriptionNl String // Dutch description
  price       Float
  currency    String @default("EUR")
  // ...
}
```

**API Routes:**
```typescript
// src/app/api/courses/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'nl'

  const courses = await db.course.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      id: true,
      title: locale === 'nl' ? 'titleNl' : 'title',
      price: true,
      currency: true
    }
  })

  return Response.json({ courses })
}
```

**Components:**
```tsx
// src/components/CourseCard.tsx
export function CourseCard({ course, locale = 'nl' }) {
  return (
    <article>
      <h3>{locale === 'nl' ? course.titleNl : course.title}</h3>
      <p>{formatPrice(course.price, course.currency)}</p>
      <Button>
        {locale === 'nl' ? 'Koop Nu' : 'Buy Now'}
      </Button>
    </article>
  )
}
```

**Pages:**
```tsx
// src/app/[locale]/courses/page.tsx
export default async function CoursesPage({
  params: { locale }
}) {
  const courses = await getCourses(locale)

  return (
    <main>
      <h1>{locale === 'nl' ? 'Onze Cursussen' : 'Our Courses'}</h1>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} locale={locale} />
      ))}
    </main>
  )
}
```

### Step 6: Configuration & Setup

**Create configuration files:**
```env
# .env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_DEFAULT_LOCALE=nl
NEXT_PUBLIC_SITE_URL=https://yourdomain.nl
```

**Set up database:**
```bash
npm run db:migrate
npm run db:seed
```

**Configure Stripe:**
```typescript
// Create products in EUR
const product = await stripe.products.create({
  name: 'TypeScript Cursus',
  default_price_data: {
    currency: 'eur',
    unit_amount: 14900, // €149.00
  }
})
```

## Automation Levels

### Level 1: Full Auto
- Runs everything without stopping
- Creates all files
- Implements all features
- Sets up configuration

### Level 2: Checkpoint Auto
- Pauses after each phase
- Shows what was created
- Asks for confirmation to continue
- Allows modifications

### Level 3: Guided Mode
- Explains each step
- Shows generated code before creating
- Allows customization at each stage
- Educational approach

## Region-Specific Features

For Netherlands IT market:
- **Language:** Dutch UI with English option
- **Payment:** iDEAL integration (Dutch payment method)
- **VAT:** EU VAT handling (BTW in Dutch)
- **Privacy:** GDPR compliance notices
- **Currency:** EUR pricing

## Output Structure

```
your-course-site/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Internationalization
│   │   │   ├── courses/
│   │   │   └── dashboard/
│   │   └── api/
│   ├── components/
│   │   └── [all components with tests]
│   └── lib/
│       └── i18n/               # Translations
│
├── tests/
│   ├── unit/                   # All passing ✅
│   ├── integration/             # All passing ✅
│   └── e2e/                    # All passing ✅
│
├── prisma/
│   └── schema.prisma           # Complete schema
│
├── public/
│   └── locales/
│       ├── nl/                 # Dutch translations
│       └── en/                 # English translations
│
└── [all config files]
```

## Success Criteria

After running this command:
- ✅ All tests pass
- ✅ Database is set up and seeded
- ✅ Site runs locally
- ✅ Can browse courses
- ✅ Can purchase (test mode)
- ✅ Localized for target market
- ✅ Ready for deployment

## Example Usage

```
/build-course-site

> Course topic? "IT Security Fundamentals"
> Target market? "Netherlands corporate training"
> Primary language? "Dutch"
> Automation level? "Checkpoint"

[Starting research...]
Found Dutch competitors: Computrain, LOI, NCOI
Analyzing pricing: €1,299 - €2,499 (premium market)

[Checkpoint 1]
Research complete. Continue? [Y/n]

[Generating tests...]
Created 47 test files

[Checkpoint 2]
Tests created. Run them? [Y/n]
All tests failing ❌ (expected)

[Implementing features...]
Creating components...
Creating API routes...
Setting up database...

[Checkpoint 3]
Implementation complete. Run tests? [Y/n]
All tests passing ✅

[Final setup...]
Project ready at: ./it-security-platform-nl/

Next steps:
1. cd it-security-platform-nl
2. npm install
3. npm run dev
4. Visit http://localhost:3000/nl
```

## Integration Points

This command orchestrates:
1. **Competitive Research Agent** - Market analysis
2. **Course Architect Agent** - Specification
3. **Test-First Guide Agent** - TDD enforcement
4. **Payment Expert Agent** - Stripe setup
5. **Accessibility Checker Agent** - WCAG compliance
6. **SEO Optimizer Agent** - Localized SEO

## Notes

- This is a complex, long-running command
- Expect 10-15 minutes for full automation
- Can be interrupted and resumed
- Creates git commits at each checkpoint
- All generated code follows TDD principles
- Regional awareness ensures market fit