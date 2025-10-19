# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Course Platform Template** - a production-ready Next.js template for building Dutch IT course e-commerce platforms. The repository contains both:
1. **Root project** - Template infrastructure with TDD workflows, Claude agents, and GitHub automation
2. **techtrain-courses/** - An active Next.js 14 course platform implementation (MVP+ stage)

## Quick Start

```bash
# Navigate to the application directory (REQUIRED for all commands)
cd techtrain-courses

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

**IMPORTANT**: Always run commands from `techtrain-courses/` directory, not from the root.

## Current Development Branch

Branch: `feature/course-platform-setup`

Recent work includes:
- Homepage redesign with modern UX and conversion optimization
- Advanced filtering system (FilterPanel, FilterDrawer, SortBar)
- Search optimization for instant results
- Wishlist functionality (useWishlist hook)
- UI components (Badge)
- Dutch-only language enforcement

## Key Architecture Decisions

### Monorepo Structure
- Root level contains documentation, Claude automation, and GitHub workflows
- `techtrain-courses/` is the actual Next.js application
- **CRITICAL**: All development commands (npm, build, test, etc.) must be run from within `techtrain-courses/` directory
- Always `cd techtrain-courses` before running npm commands
- Root `package.json` does not exist - only `techtrain-courses/package.json`

### Language & Localization
**IMPORTANT**: The site is Dutch-only. All user-facing content, UI labels, and course information must be in Dutch.

### Tech Stack
- **Framework**: Next.js 14 with App Router (not Pages Router)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom configuration
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting and manipulation
- **AI/ML**: Hugging Face Inference API, Xenova Transformers (for AI features)
- **AI SDK**: Vercel AI SDK for AI integration
- **Data**: Mock/generated data in `lib/` directory (no database yet)

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
  about/              # About page
  admin/              # Admin dashboard
  api/                # API routes (Next.js API handlers)
  checkout/           # Checkout flow
  contact/            # Contact form
  corporate/          # Corporate training page
  courses/            # Course catalog and detail pages
    [slug]/           # Dynamic course pages
  faq/                # FAQ page
  forgot-password/    # Password reset page
  inschrijven/        # Enrollment/registration flow
  login/              # Authentication UI (demo mode)
  privacy/            # Privacy policy page
  register/           # User registration page
  terms/              # Terms & conditions page
  error.tsx           # Error boundary component
  globals.css         # Global styles and CSS variables
  layout.tsx          # Root layout with Header/Footer
  not-found.tsx       # 404 page
  page.tsx            # Homepage (Dutch language)

components/
  ui/                      # Reusable UI primitives (Button, Input, Card, Badge)
  ContactSidebar.tsx       # Contact information sidebar
  CourseBookingForm.tsx    # Course booking form component
  CourseCard.tsx           # Course card display
  CourseDetailContent.tsx  # Course detail page content
  CourseHeader.tsx         # Course page header
  CourseTabNavigation.tsx  # Tab navigation for course pages
  FilterDrawer.tsx         # Mobile filter drawer (bottom sheet)
  FilterPanel.tsx          # Desktop filter panel (sidebar)
  Footer.tsx               # Site footer
  Header.tsx               # Navigation header
  SearchBar.tsx            # Course search functionality
  SortBar.tsx              # Sort controls for course catalog
  TrainingFormatSelector.tsx # Training format selection

hooks/
  useWishlist.ts           # Wishlist state management hook

lib/
  course-data-raw.ts       # Raw course data structure
  course-descriptions.ts   # Detailed course descriptions (AI-generated)
  courses-generated.ts     # Generated course catalog
  data.ts                  # Main course data export
  utils.ts                 # Utility functions (cn, formatters)

types/
  index.ts                 # Core TypeScript type definitions
```

## Important Patterns

### Custom Hooks
The application uses React custom hooks for reusable logic:
- **useWishlist.ts**: Manages wishlist state (add, remove, check if item in wishlist)
- Located in `hooks/` directory
- Follow this pattern for other shared state logic

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
Currently using mock/generated data from `lib/` directory:
- `data.ts` - Main export point for course data
- `courses-generated.ts` - Generated course catalog
- `course-descriptions.ts` - AI-generated detailed course descriptions (large file ~177KB)
- `course-data-raw.ts` - Raw course data structure
- Multiple IT courses across categories (Frontend, Backend, DevOps, Cloud, AI/ML, etc.)
- Each course includes: slug, title, description, price, schedules, instructor info, and curriculum

### Styling Conventions
- Tailwind utility classes for styling
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Responsive breakpoints: mobile-first approach
- Color scheme: Blue primary (#2563EB), gray secondary
- Custom CSS variables defined in `globals.css`

### Error Handling
- Custom error boundary in `app/error.tsx`
- Custom 404 page in `app/not-found.tsx`
- Client-side form validation with React Hook Form + Zod
- Server-side validation in API routes (when implemented)

### Performance Considerations
- Server Components by default for better performance
- Client Components only when necessary (interactivity, hooks)
- Next.js Image component for optimized image loading
- Code splitting via dynamic imports (where applicable)
- Large course descriptions file (~177KB) - consider lazy loading for production

### Filtering and Search Architecture
The course catalog implements a sophisticated filtering system:
- **Desktop**: FilterPanel (sidebar) with category, format, language, and price filters
- **Mobile**: FilterDrawer (bottom sheet) with same filtering capabilities
- **Search**: SearchBar component provides instant search results
- **Sorting**: SortBar allows sorting by price, date, popularity
- **State Management**: Client-side filtering with URL query params (future enhancement)
- All filters work together and update results in real-time

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
- `test-first-guide.md` - Enforces TDD workflow and Red-Green-Refactor cycle
- `course-architect.md` - Plans course platform features and architecture
- `courses-ui-designer.md` - Course UI/UX design patterns and implementations
- `payment-flow-expert.md` - Stripe integration and payment flow guidance
- `accessibility-checker.md` - WCAG compliance and a11y best practices
- `seo-optimizer.md` - SEO optimization and search visibility
- `homepage-designer.md` - Homepage design and UX patterns
- `ux-analyzer.md` - User experience analysis and recommendations
- `ux-implementation-guide.md` - UX implementation and best practices
- `competitive-research.md` - Competitive analysis and market research
- `attack-plan-architect.md` - Feature planning and implementation strategy
- `git-protocol-commander.md` - Git workflow and branching strategy

## GitHub Workflow Commands

Use slash commands for streamlined git workflows:
- `/gh-feature-branch` - Create new feature branch following naming conventions
- `/gh-push` - Stage, commit, and push changes to GitHub
- `/gh-create-pr` - Create PR, auto-merge to master, sync back to feature branch
- `/gh-create-repo` - Initialize new GitHub repository
- `/gh-clone-repo` - Clone existing GitHub repository
- `/tdd-cycle` - Guide through complete Red-Green-Refactor cycle

### Git Protocol
- Main branch: `master` (not main)
- Feature branches kept alive after merge (not deleted)
- PRs are squash-merged automatically
- After merge: master is merged back into feature branch for continued work

## Current Implementation Status

### Completed (MVP+)
- **Core Pages**: Homepage, course catalog, course detail pages, checkout flow
- **Marketing Pages**: About, Contact, Corporate training, FAQ, Privacy, Terms
- **User Flow**: Login, Register, Forgot Password, Enrollment (Inschrijven)
- **Admin Dashboard**: Overview with mock data
- **Filtering & Search**:
  - Course catalog filtering (category, format, language)
  - Search bar with instant results
  - Desktop filter panel and mobile filter drawer
  - Sort controls (price, date, popularity)
- **Booking System**: Course booking forms and training format selector
- **Wishlist**: Custom hook for wishlist functionality
- **API Routes**: API directory with Next.js route handlers
- **Responsive Design**: Mobile-first approach across all pages
- **Dutch Language**: All content in Dutch as required

### Not Yet Implemented
- **Database integration** (currently mock data only)
- **Authentication** (UI exists, no backend)
- **Payment processing** (checkout UI only)
- **Testing infrastructure** (documented but not implemented - no test runner configured)
- **Email notifications**
- **User reviews/ratings**
- **Certificate generation**
- **Wishlist persistence** (hook exists but no backend storage)

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
1. Add course data to `techtrain-courses/lib/courses-generated.ts` or `course-data-raw.ts`
2. If needed, add AI-generated descriptions to `course-descriptions.ts`
3. Ensure the course is exported from `data.ts`
4. Include all required fields: slug, title, description, price, schedules, etc.
5. All content must be in Dutch

### Working with Course Data
- **Primary export**: Import from `lib/data.ts`
- **Generated courses**: Located in `courses-generated.ts`
- **Descriptions**: Large AI-generated content in `course-descriptions.ts` (~177KB)
- **Raw data**: Base structure in `course-data-raw.ts`

### Adding a New Page
1. Create directory in `app/`
2. Add `page.tsx` with Server Component
3. Follow existing patterns for layout and styling
4. Ensure mobile responsiveness
5. All content must be in Dutch

### Adding a New Component
1. For UI primitives, add to `components/ui/`
2. For feature components, add to `components/`
3. Use `'use client'` directive only if the component needs interactivity
4. Import using `@/components/...` path alias
5. Follow naming convention: PascalCase for components
6. Export as default or named export from the file

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

### Documentation
- **TDD Workflow**: [`docs/TDD_WORKFLOW.md`](docs/TDD_WORKFLOW.md) - Comprehensive TDD guide with examples
- **Usage Guide**: [`docs/USAGE.md`](docs/USAGE.md) - Detailed usage instructions and workflows
- **Deployment**: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) - Deployment strategies and configurations
- **TechTrain README**: [`techtrain-courses/README.md`](techtrain-courses/README.md) - Implementation status and tech stack
- **Codebase Review**: [`techtrain-courses/CODEBASE_REVIEW.md`](techtrain-courses/CODEBASE_REVIEW.md) - Detailed codebase analysis
- **Site Health Check**: [`techtrain-courses/SITE_HEALTH_CHECK.md`](techtrain-courses/SITE_HEALTH_CHECK.md) - Site health and performance metrics

### Configuration Files
- **TypeScript**: [`techtrain-courses/tsconfig.json`](techtrain-courses/tsconfig.json) - Strict mode enabled, path aliases configured
- **Tailwind**: [`techtrain-courses/tailwind.config.ts`](techtrain-courses/tailwind.config.ts) - Custom design system configuration
- **Next.js**: [`techtrain-courses/next.config.js`](techtrain-courses/next.config.js) - Next.js configuration
- **Claude Settings**: [`.claude/settings.local.json`](.claude/settings.local.json) - Claude Code settings
