# Usage Guide

Complete guide to using this course platform template.

## Table of Contents

- [Initial Setup](#initial-setup)
- [Database Setup](#database-setup)
- [Stripe Configuration](#stripe-configuration)
- [Creating Your First Course](#creating-your-first-course)
- [Claude Code Workflow](#claude-code-workflow)
- [Development Workflow](#development-workflow)
- [Testing](#testing)

## Initial Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Copy the example file:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your values:

\`\`\`env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/courseplatform"

# NextAuth.js
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..." # Get from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Get after setting up webhooks

# Optional: Email, Video Hosting, etc.
\`\`\`

**Generate NEXTAUTH_SECRET:**
\`\`\`bash
openssl rand -base64 32
\`\`\`

## Database Setup

### Using PostgreSQL

**Option 1: Local PostgreSQL**

\`\`\`bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb courseplatform
\`\`\`

**Option 2: Docker**

\`\`\`bash
docker run -d \\
  --name courseplatform-postgres \\
  -e POSTGRES_PASSWORD=yourpassword \\
  -e POSTGRES_DB=courseplatform \\
  -p 5432:5432 \\
  postgres:15-alpine
\`\`\`

**Option 3: Hosted Database**

Use a hosted PostgreSQL service:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)
- [Railway](https://railway.app/)

### Run Migrations

\`\`\`bash
# Generate Prisma Client
npm run db:generate

# Create tables
npm run db:migrate

# Seed with example data
npm run db:seed
\`\`\`

### Prisma Studio (Database GUI)

\`\`\`bash
npm run db:studio
\`\`\`

Opens at `http://localhost:5555`

## Stripe Configuration

### 1. Create Stripe Account

Sign up at [https://stripe.com](https://stripe.com)

### 2. Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`

### 3. Set Up Webhooks

**For Local Development:**

\`\`\`bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
npm run stripe:listen
\`\`\`

This will output a webhook secret starting with `whsec_...` → Use for `STRIPE_WEBHOOK_SECRET`

**For Production:**

1. Go to [Webhooks Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Add endpoint: `https://yourdomain.com/api/payments/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 4. Create Products in Stripe

\`\`\`bash
# Option 1: Manually in Stripe Dashboard
# Products → Add Product

# Option 2: Programmatically (recommended)
# See: src/lib/stripe/create-products.ts
\`\`\`

## Creating Your First Course

### Method 1: Using Claude Code (Recommended)

1. **Plan your course:**
   \`\`\`
   /plan-course-site
   \`\`\`
   Describe your course idea, and the Course Architect agent will create a detailed specification.

2. **Add the course with TDD:**
   \`\`\`
   /new-course
   \`\`\`
   This creates:
   - Database entry
   - API routes with tests
   - Course page with tests
   - Tests run first (RED), then implementation (GREEN)

3. **Add components as needed:**
   \`\`\`
   /new-component
   \`\`\`

### Method 2: Manual Creation

1. **Create database entry:**

\`\`\`typescript
// prisma/seed.ts or use Prisma Studio
const course = await prisma.course.create({
  data: {
    slug: 'my-course',
    title: 'My Amazing Course',
    description: 'Learn amazing things',
    price: 99,
    status: 'PUBLISHED',
    modules: {
      create: [
        {
          title: 'Module 1',
          order: 1,
          lessons: {
            create: [
              {
                title: 'Lesson 1',
                slug: 'lesson-1',
                order: 1,
                lessonType: 'VIDEO',
              },
            ],
          },
        },
      ],
    },
  },
})
\`\`\`

2. **Create course page:**

\`\`\`typescript
// src/app/courses/[slug]/page.tsx
import { db } from '@/lib/db'

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: { modules: { include: { lessons: true } } },
  })

  return (
    <main>
      <h1>{course.title}</h1>
      {/* Course content */}
    </main>
  )
}
\`\`\`

## Claude Code Workflow

### Planning Phase

Use `/plan-course-site` to convert ideas into technical specs:

\`\`\`
Me: I want to create a course platform selling cooking courses

Claude: [Uses Course Architect agent]
        Creates detailed specification including:
        - Database schema
        - API endpoints
        - User flows
        - Feature prioritization
\`\`\`

### Development Phase

Use TDD commands:

\`\`\`
/tdd-cycle       # Guide through Red-Green-Refactor
/new-component   # Create component with tests
/new-course      # Add new course with tests
\`\`\`

### Git Workflow

\`\`\`
/gh-feature-branch    # Create feature branch
/gh-push              # Push changes
/gh-create-pr         # Create pull request
\`\`\`

## Development Workflow

### Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Opens at `http://localhost:3000`

### Code Quality Checks

\`\`\`bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# All checks
npm run type-check && npm run lint && npm test
\`\`\`

### Hot Reload

- **Pages/components:** Auto-reload on save
- **Server actions:** Auto-reload on save
- **Database schema:** Run `npm run db:push` to sync changes

## Testing

### Run All Tests

\`\`\`bash
npm test
\`\`\`

### Unit Tests (Vitest)

\`\`\`bash
# Run once
npm run test:unit

# Watch mode
npm run test:watch

# With coverage
npm run test:unit
\`\`\`

Coverage report: `coverage/index.html`

### E2E Tests (Playwright)

\`\`\`bash
# Headless
npm run test:e2e

# With UI
npm run test:e2e:ui

# Headed (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
\`\`\`

### Accessibility Tests

\`\`\`bash
npm run test:a11y
\`\`\`

### Write Tests First (TDD)

Always follow Red-Green-Refactor:

1. **Write test** (fails)
2. **Run test** → RED ❌
3. **Implement feature** → GREEN ✅
4. **Refactor** → Still GREEN ✅

See [TDD_WORKFLOW.md](TDD_WORKFLOW.md) for details.

## Project Structure

\`\`\`
src/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth routes
│   ├── (marketing)/          # Public pages
│   ├── courses/              # Course pages
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── dashboard/            # Student dashboard
│   ├── api/                  # API routes
│   │   ├── courses/
│   │   ├── payments/
│   │   └── auth/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   └── ...
│   ├── CourseCard.tsx
│   └── ...
│
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── stripe/               # Stripe utilities
│   ├── auth/                 # Auth utilities
│   └── utils.ts              # Helper functions
│
└── types/
    ├── course.ts             # Course types
    └── ...
\`\`\`

## Common Tasks

### Add a New Course

\`\`\`bash
# Using Claude Code
/new-course

# Or manually
npm run db:studio  # Add via Prisma Studio
\`\`\`

### Add a New Component

\`\`\`bash
# Using Claude Code (with tests)
/new-component

# Or manually
# 1. Create component file
# 2. Create test file
# 3. Follow TDD cycle
\`\`\`

### Update Database Schema

\`\`\`bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npm run db:migrate

# Or push changes without migration (dev only)
npm run db:push
\`\`\`

### Add Environment Variable

\`\`\`bash
# 1. Add to .env.example
# 2. Add to .env (your local copy)
# 3. Add to Vercel (production)
# 4. Document in README.md
\`\`\`

## Tips & Best Practices

### 1. Always Use TDD

Write tests before implementation:
- Use `/tdd-cycle` command
- Follow Red-Green-Refactor
- Tests are documentation

### 2. Use Claude Code Agents

Specialized agents provide expert guidance:
- **Course Architect:** Plan courses
- **Test-First Guide:** TDD workflow
- **Payment Expert:** Stripe integration
- **Accessibility Checker:** WCAG compliance
- **SEO Optimizer:** Search optimization

### 3. Commit Often

Small, focused commits:
\`\`\`bash
git add .
git commit -m "feat: add course filtering"
git push
\`\`\`

### 4. Run Tests Before Pushing

\`\`\`bash
npm run type-check && npm run lint && npm test
\`\`\`

CI/CD will run these automatically, but catch errors early.

### 5. Use Semantic Commit Messages

\`\`\`
feat: add course catalog
fix: resolve checkout bug
docs: update README
test: add enrollment tests
refactor: extract payment logic
\`\`\`

## Troubleshooting

### Database Connection Error

\`\`\`
Error: Can't reach database server
\`\`\`

**Solution:**
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Test connection: `psql $DATABASE_URL`

### Stripe Webhook Not Working Locally

\`\`\`
Error: No signatures found matching the expected signature
\`\`\`

**Solution:**
- Ensure Stripe CLI is running: `npm run stripe:listen`
- Copy webhook secret to `.env`
- Restart dev server

### Tests Failing

\`\`\`
Tests failed: Module not found
\`\`\`

**Solution:**
- Install dependencies: `npm install`
- Generate Prisma Client: `npm run db:generate`
- Check import paths use `@/` alias

### Next.js Build Error

\`\`\`
Type error: Property does not exist
\`\`\`

**Solution:**
- Run type check: `npm run type-check`
- Fix TypeScript errors
- Ensure types are up to date

## Next Steps

1. ✅ Complete initial setup
2. ✅ Create your first course
3. ✅ Set up Stripe products
4. ✅ Implement course pages
5. ✅ Add enrollment flow
6. ✅ Test payment integration
7. ✅ Deploy to production

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide.

## Getting Help

- Review Claude Code agents in `.claude/agents/`
- Use Claude Code commands: `/tdd-cycle`, `/new-course`, etc.
- Check [TDD_WORKFLOW.md](TDD_WORKFLOW.md) for testing guidance
- Review example components in `src/components/`
