# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Course Platform Template** - a production-ready Next.js template for building Dutch IT course e-commerce platforms. The repository contains both:
1. **Root project** - Template infrastructure with TDD workflows, Claude agents, and GitHub automation
2. **techtrain-courses/** - An active Next.js 14 course platform implementation (MVP stage)

## Key Architecture Decisions

### Monorepo Structure
- Root level contains documentation, Claude automation, and GitHub workflows
- `techtrain-courses/` is the actual Next.js application
- All development commands must be run from within `techtrain-courses/` directory

### Language & Localization
**IMPORTANT**: The site is Dutch-only. All user-facing content, UI labels, and course information must be in Dutch.

### Tech Stack
- **Framework**: Next.js 14 with App Router (not Pages Router)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Data**: Mock data in `lib/data.ts` (no database yet)

## Development Commands

### Running the Application
```bash
cd techtrain-courses
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing (Not Yet Implemented)
The template includes TDD infrastructure documentation, but tests are not yet implemented in techtrain-courses. When adding tests:
- Use Vitest for unit tests
- Use Playwright for E2E tests
- Follow the Red-Green-Refactor cycle documented in `docs/TDD_WORKFLOW.md`

## Project Structure

### Root Level
```
.claude/
  agents/           # Specialized Claude agents for different tasks
  commands/         # Custom slash commands for workflows
docs/              # Comprehensive documentation
techtrain-courses/ # The actual Next.js application
```

### Application Structure (techtrain-courses/)
```
app/
  [locale]/        # Locale-specific routes (Dutch only)
  about/           # About page
  admin/           # Admin dashboard
  checkout/        # Checkout flow
  contact/         # Contact form
  courses/         # Course catalog and detail pages
    [slug]/        # Dynamic course pages
  login/           # Authentication UI (demo mode)
  layout.tsx       # Root layout with Header/Footer
  page.tsx         # Homepage

components/
  ui/              # Reusable UI primitives (Button, Input, Card)
  CourseCard.tsx   # Course display component
  Header.tsx       # Navigation with language switcher
  Footer.tsx       # Site footer

lib/
  data.ts          # Mock course data (6 IT courses)
  utils.ts         # Utility functions (cn for classNames)

types/
  index.ts         # TypeScript type definitions
```

## Important Patterns

### Path Aliases
Use `@/*` to import from root of techtrain-courses:
```typescript
import { Button } from '@/components/ui/Button'
import { mockCourses } from '@/lib/data'
import type { Course } from '@/types'
```

### Component Structure
Components follow this pattern:
- UI primitives in `components/ui/`
- Feature components in `components/`
- Server Components by default (App Router)
- Client Components marked with `'use client'`

### Data Flow
Currently using mock data from `lib/data.ts`. Structure:
- 6 IT courses with full details
- Categories: Frontend, Backend, DevOps, etc.
- Each course has schedules, instructor info, and curriculum

### Styling Conventions
- Tailwind utility classes for styling
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Responsive breakpoints: mobile-first approach
- Color scheme: Blue primary (#2563EB), gray secondary

## Test-Driven Development (TDD)

This project enforces TDD practices:

### The Red-Green-Refactor Cycle
1. **RED**: Write failing tests first - clearly define expected behavior
2. **GREEN**: Write minimal code to pass tests - focus on functionality
3. **REFACTOR**: Improve code quality while tests remain green

### Critical TDD Rules
- ALWAYS write tests before implementation code
- NEVER modify tests to make them pass (tests are specifications)
- RUN tests after writing them to verify they fail (proves they test something)
- Tests are documentation of expected behavior

### Claude Agents for TDD
Use specialized agents in `.claude/agents/`:
- `test-first-guide.md` - Enforces TDD workflow
- `course-architect.md` - Plans course platform features
- `payment-flow-expert.md` - Stripe integration guidance
- `accessibility-checker.md` - WCAG compliance
- `seo-optimizer.md` - SEO best practices

## GitHub Workflow Commands

Use slash commands for streamlined git workflows:
- `/gh-feature-branch` - Create new feature branch
- `/gh-push` - Push changes to GitHub
- `/gh-create-pr` - Create PR, auto-merge to master, sync back to feature branch
- `/tdd-cycle` - Guide through Red-Green-Refactor cycle

### Git Protocol
- Main branch: `master` (not main)
- Feature branches kept alive after merge (not deleted)
- PRs are squash-merged automatically
- After merge: master is merged back into feature branch for continued work

## Current Implementation Status

### Completed (MVP)
- Homepage with hero, featured courses, categories
- Course catalog with filtering (category, format, language)
- Individual course detail pages
- Checkout flow (UI only, no payment processing)
- Admin dashboard (mock data)
- Responsive design (mobile-first)
- All pages in Dutch

### Not Yet Implemented
- Database integration (currently mock data only)
- Authentication (UI exists, no backend)
- Payment processing (checkout UI only)
- Testing infrastructure (documented but not implemented)
- Email notifications
- User reviews/ratings
- Certificate generation

## Adding New Features

### Follow This Pattern
1. Start with `/tdd-cycle` command if adding complex functionality
2. Write tests first (RED phase)
3. Run tests to verify they fail
4. Implement minimal code (GREEN phase)
5. Refactor for quality (REFACTOR phase)
6. Commit with semantic message: `feat:`, `fix:`, `test:`, `refactor:`

### Example: Adding a New Course Feature
```bash
# 1. Use Claude agent to plan
/plan-course-site

# 2. Follow TDD cycle
/tdd-cycle

# 3. Create components with tests
/new-component

# 4. Push when ready
/gh-push
/gh-create-pr
```

## Common Tasks

### Adding a New Course
1. Edit `techtrain-courses/lib/data.ts`
2. Add new course object to `mockCourses` array
3. Include all required fields: slug, title, description, price, etc.
4. Add Dutch translations for all content

### Adding a New Page
1. Create directory in `app/`
2. Add `page.tsx` with Server Component
3. Follow existing patterns for layout and styling
4. Ensure mobile responsiveness

### Updating Styles
- Modify Tailwind classes directly in components
- Global styles in `app/globals.css`
- Tailwind config in `tailwind.config.ts`

### TypeScript Types
- Add shared types to `types/index.ts`
- Use strict TypeScript (enabled in tsconfig)
- Prefer interfaces for object shapes

## Important Notes

### Dutch Language Requirement
All user-facing content MUST be in Dutch:
- Page titles and headings
- Button labels and CTAs
- Form labels and validation messages
- Course content and descriptions
- Error messages

### No Database Yet
Current implementation uses mock data from `lib/data.ts`. When implementing database:
- The README mentions Prisma + PostgreSQL in template docs
- Migration strategy needed for mock data
- Consider using Prisma schema from template documentation

### Authentication is Demo Mode
Login page exists but doesn't authenticate. To implement:
- NextAuth.js recommended (mentioned in template docs)
- Update login page to integrate with auth provider
- Add session management

### Payment is Demo Mode
Checkout flow exists but doesn't process payments. To implement:
- Stripe integration recommended (mentioned in template docs)
- Update checkout page with Stripe SDK
- Add webhook handling for payment events

## Development Philosophy

### Test-First Always
This project strongly emphasizes TDD. Before writing any feature:
1. Understand the requirement
2. Write tests that define expected behavior
3. Verify tests fail
4. Implement feature
5. Verify tests pass
6. Refactor

### Claude Code Integration
Leverage specialized agents for:
- Complex feature planning (Course Architect)
- TDD guidance (Test-First Guide)
- Payment flows (Payment Expert)
- Accessibility (A11y Checker)
- SEO optimization (SEO Optimizer)

### Commit Standards
Use semantic commit messages:
- `feat: add course filtering`
- `fix: resolve checkout validation`
- `test: add enrollment tests`
- `docs: update README`
- `refactor: extract payment logic`

## Resources

- Main README: `README.md` (template overview)
- TDD Workflow: `docs/TDD_WORKFLOW.md` (comprehensive TDD guide)
- Usage Guide: `docs/USAGE.md` (detailed usage instructions)
- Deployment: `docs/DEPLOYMENT.md` (deployment strategies)
- TechTrain README: `techtrain-courses/README.md` (implementation status)
