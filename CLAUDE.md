# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Course Platform Template** - a production-ready Next.js template for building Dutch IT course e-commerce platforms. The repository contains both:
1. **Root project** - Template infrastructure with TDD workflows, Claude agents, and GitHub automation
2. **techtrain-courses/** - An active Next.js 14 course platform implementation

### Production Readiness: 95% Complete ✅

**What's Fully Operational**:
- ✅ Complete UI/UX (Homepage, Courses, Dashboard, Admin)
- ✅ Supabase PostgreSQL database (79 courses, 237 schedules)
- ✅ Authentication system (Supabase Auth)
- ✅ Enrollment system (create, view, cancel)
- ✅ Email notifications (Resend + React Email)
- ✅ Testing infrastructure (Vitest + Playwright)
- ✅ Security (sanitization, RLS)
- ✅ Dutch-only content throughout

**What's Remaining**:
- 🟡 Invoice/receipt generation (enrollment works, invoice generation needed)
- 🟡 Reviews & ratings UI (database ready)
- 🟡 Admin CRUD operations (dashboard ready)
- ❌ Certificate generation
- ❌ Advanced analytics

**Payment Model**: Invoice-based - Users enroll and receive invoices via email, payment processed offline

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
- **Database**: Supabase (PostgreSQL) - Fully integrated with authentication and data storage
- **Authentication**: Supabase Auth with Row Level Security (RLS)
- **Payment**: Invoice/receipt-based (no payment gateway integration)
- **Email**: Resend with React Email templates
- **Rate Limiting**: Upstash Redis for API protection (optional)
- **Testing**: Vitest (unit tests) + Playwright (E2E)
- **Data**: Migrated from mock data to Supabase (79 courses, 237 schedules)

## Development Commands

### Running the Application
```bash
cd techtrain-courses
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
cd techtrain-courses
npm test             # Run unit tests with Vitest
npm run test:ui      # Open Vitest UI
npm run test:coverage # Generate coverage report
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Open Playwright UI
```

### Database & Migration
```bash
cd techtrain-courses
npx tsx scripts/migrate-to-supabase.ts  # Migrate course data to Supabase
```

**IMPORTANT**: Ensure `.env.local` is configured with Supabase credentials before running migrations. See `.env.local.example` for required variables.

### Email Development
```bash
cd techtrain-courses
npm run email:dev    # Start React Email dev server on localhost:3000
```

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
  actions/            # Server Actions for Supabase
    auth.ts           # Authentication actions (signup, login, logout, password reset)
    enrollments.ts    # Enrollment management actions (create, get, cancel)
    invoices.ts       # Invoice generation actions (if implemented)
    wishlist.ts       # Wishlist management actions
  admin/              # Admin dashboard with real-time statistics
  api/                # API routes (Next.js API handlers)
  checkout/           # Enrollment checkout flow (invoice-based)
    success/          # Enrollment success page
  contact/            # Contact form
  corporate/          # Corporate training page
  courses/            # Course catalog and detail pages
    [slug]/           # Dynamic course pages
  dashboard/          # User dashboard (protected route)
    enrollments/      # User enrollments page with cancel functionality
    wishlist/         # User wishlist page
  faq/                # FAQ page
  forgot-password/    # Password reset page
  inschrijven/        # Enrollment/registration flow
  login/              # Authentication UI (fully integrated with Supabase)
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
  emails/                  # React Email templates (Dutch)
    EnrollmentConfirmation.tsx  # Enrollment confirmation email
    InvoiceEmail.tsx            # Invoice email (if implemented)
    PasswordReset.tsx           # Password reset email
    Welcome.tsx                 # Welcome email
  EnrollmentForm.tsx       # Course enrollment form
  ContactSidebar.tsx       # Contact information sidebar
  CourseBookingForm.tsx    # Course booking form (integrated with enrollments)
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
  useWishlist.ts           # Wishlist state management hook (Supabase-backed)

lib/
  supabase/                # Supabase client utilities
    client.ts              # Browser client for client components
    server.ts              # Server client for server components
    middleware.ts          # Auth middleware utilities
  course-data-raw.ts       # Raw course data structure (legacy)
  course-descriptions.ts   # Detailed course descriptions (AI-generated)
  courses-generated.ts     # Generated course catalog (legacy)
  data.ts                  # Main course data export (legacy - now in Supabase)
  email.ts                 # Email sending utilities (Resend)
  invoice.ts               # Invoice generation utilities (if implemented)
  rate-limit.ts            # Upstash Redis rate limiting (optional)
  sanitize.ts              # Input sanitization and validation utilities
  translate-error.ts       # Error message translation helper
  utils.ts                 # Utility functions (cn, formatters)

scripts/
  migrate-to-supabase.ts   # Migration script for moving data to Supabase

supabase/
  schema.sql               # Database schema with RLS policies
  verify-migration.sql     # SQL queries for migration verification

test/                      # Unit tests (Vitest)
  lib/
    utils.test.ts          # Utility functions tests (17 tests)
    sanitize.test.ts       # Sanitization & validation tests (82 tests)

e2e/                       # End-to-end tests (Playwright)
  registration.spec.ts     # Registration flow tests (8 tests)
  login.spec.ts            # Login & forgot password tests (16 tests)

types/
  database.types.ts        # Supabase database TypeScript types
  index.ts                 # Core TypeScript type definitions

middleware.ts              # Root middleware for session management
vitest.config.ts           # Vitest configuration for unit tests
playwright.config.ts       # Playwright configuration for E2E tests
```

## Important Patterns

### Supabase Integration
The application uses Supabase for database and authentication:

#### Client Types
- **Browser Client** (`lib/supabase/client.ts`): Use in Client Components with `'use client'` directive
- **Server Client** (`lib/supabase/server.ts`): Use in Server Components, Server Actions, and API routes
- **Middleware** (`lib/supabase/middleware.ts`): Session management utilities

#### Server Actions
Server Actions provide type-safe database operations:
- **Authentication** (`app/actions/auth.ts`): `signUp`, `signIn`, `signOut`, `resetPassword`
- **Enrollments** (`app/actions/enrollments.ts`): `createEnrollment`, `getUserEnrollments`, `cancelEnrollment`
- **Invoices** (`app/actions/invoices.ts`): `generateInvoice`, `sendInvoice` (if implemented)
- **Wishlist** (`app/actions/wishlist.ts`): `addToWishlist`, `removeFromWishlist`, `getWishlist`
- Call from Client Components using `useTransition` or `useFormStatus`

#### Database Access Pattern
```typescript
// Server Component
import { createClient } from '@/lib/supabase/server'

const supabase = createClient()
const { data: courses } = await supabase
  .from('courses')
  .select('*')
  .eq('published', true)

// Client Component
'use client'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
// Use for real-time subscriptions or client-side queries
```

#### Row Level Security (RLS)
All Supabase tables have RLS policies enabled:
- Users can only view/edit their own data
- Public can view published courses
- Enrolled users can create reviews
- See `supabase/schema.sql` for policy definitions

### Invoice-Based Payment System
The application uses an invoice/receipt-based payment model (no payment gateway):

**Payment Flow**:
1. User selects course and enrolls (no payment required upfront)
2. `createEnrollment` server action creates enrollment record
3. System generates invoice/receipt with course and payment details
4. Invoice sent to user via email (Resend)
5. Payment processed offline (bank transfer, check, etc.)
6. Admin manually marks enrollment as paid in dashboard

**Key Considerations**:
- **No Stripe/Mollie integration needed**: Simpler architecture, no payment gateway fees
- **Invoice generation**: Can use PDF generation library like `react-pdf` or `jsPDF`
- **Payment tracking**: Track payment status in `enrollments` table (pending, paid, cancelled)
- **Common for B2B**: Many Dutch training companies use this model for corporate clients
- **Email invoices**: Includes course details, price, payment instructions, bank details

### Email System
The application uses Resend with React Email for transactional emails:

**Templates** (`components/emails/`):
- **EnrollmentConfirmation.tsx**: Sent after successful enrollment (with invoice)
- **InvoiceEmail.tsx**: Invoice email with payment instructions (if implemented)
- **PasswordReset.tsx**: Sent for password reset requests
- **Welcome.tsx**: Sent after user registration

**Email Utilities** (`lib/email.ts`):
- `sendEnrollmentConfirmation()`: Send enrollment email with invoice
- `sendInvoice()`: Send invoice separately (if needed)
- All emails in Dutch with proper formatting

### Security & Sanitization
The application includes comprehensive input sanitization and validation:

**Sanitization Functions** (`lib/sanitize.ts`):
- `sanitizeString()`: XSS protection for text inputs
- `sanitizeEmail()`: Email normalization and validation
- `sanitizePhoneNumber()`: Dutch phone number formatting
- `sanitizePostalCode()`: Dutch postal code validation
- `sanitizeUrl()`: URL validation and sanitization
- `validatePassword()`: Password strength validation
- `sanitizeHtml()`: Safe HTML rendering with DOMPurify

**Rate Limiting** (`lib/rate-limit.ts`) - Optional:
- Upstash Redis-based rate limiting (optional dependency)
- Protects authentication endpoints
- Protects enrollment endpoints
- Configurable limits per endpoint
- Can be disabled if not using Upstash Redis

### Custom Hooks
The application uses React custom hooks for reusable logic:
- **useWishlist.ts**: Manages wishlist state with Supabase persistence (add, remove, check if item in wishlist)
- Located in `hooks/` directory
- Follow this pattern for other shared state logic

### Path Aliases
Use `@/*` to import from root of techtrain-courses:
```typescript
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import type { Course } from '@/types'
import type { Database } from '@/types/database.types'
```

### Component Structure
Components follow this pattern:
- UI primitives in `components/ui/`
- Feature components in `components/`
- Server Components by default (App Router)
- Client Components marked with `'use client'`

### Data Flow
**Current Architecture**: Supabase Database (migrated from mock data)

#### Database Tables
- **courses** (79 records): Main course catalog with full details
- **course_schedules** (237 records): 3 schedules per course with dates and locations
- **profiles**: User profiles (auto-created on signup)
- **enrollments**: User course enrollments
- **payments**: Payment transactions
- **wishlists**: User wishlist items
- **reviews**: Course reviews and ratings

#### Legacy Mock Data (Still Available)
The following files contain the original mock data, now migrated to Supabase:
- `lib/data.ts` - Original export point (legacy)
- `lib/courses-generated.ts` - Generated course catalog (legacy)
- `lib/course-descriptions.ts` - AI-generated detailed descriptions (~177KB)
- `lib/course-data-raw.ts` - Raw course structure (legacy)

**IMPORTANT**: For new development, fetch data from Supabase using Server Components or Server Actions, not from these legacy files.

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

This project enforces TDD practices with comprehensive testing infrastructure:

### Testing Infrastructure
**Status**: ✅ Fully implemented and operational

#### Unit Testing (Vitest)
- **Framework**: Vitest 3.2.4 with jsdom environment
- **Test Files**: 2 test suites with 99 passing tests
  - `test/lib/utils.test.ts` - 17 tests for utility functions
  - `test/lib/sanitize.test.ts` - 82 tests for sanitization and validation
- **Coverage**: v8 provider with HTML, JSON, and text reporters
- **Run Tests**: `npm test` or `npm run test:ui`

#### E2E Testing (Playwright)
- **Framework**: Playwright 1.56.1
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Test Files**: 2 E2E test suites with 24 tests
  - `e2e/registration.spec.ts` - 8 tests for registration flow
  - `e2e/login.spec.ts` - 16 tests for login and password reset
- **Run Tests**: `npm run test:e2e` or `npm run test:e2e:ui`

#### CI/CD Integration
- **GitHub Actions**: Automated testing on push and pull requests
- **Coverage Reporting**: Codecov integration for coverage tracking
- **Test Status**: All tests passing (99 unit + 24 E2E)

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
- `supabase-integration-expert.md` - Supabase setup, migration, and best practices
- `production-db-migration-specialist.md` - Production database migration guide and safety protocols
- `auth-integration-specialist.md` - Authentication UI integration with Supabase backend
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

### ✅ Completed (Production Ready)
- **Core Pages**: Homepage, course catalog, course detail pages, checkout flow
- **Marketing Pages**: About, Contact, Corporate training, FAQ, Privacy, Terms
- **User Flow**: Login, Register, Forgot Password, Enrollment (fully integrated)
- **User Dashboard**: Overview, My Courses, Wishlist, Profile (protected routes)
- **Admin Dashboard**: Real-time statistics and metrics from Supabase
- **Filtering & Search**:
  - Course catalog filtering (category, format, language)
  - Search bar with instant results
  - Desktop filter panel and mobile filter drawer
  - Sort controls (price, date, popularity)
- **Booking System**: Course booking forms integrated with enrollment system
- **Wishlist**: Supabase-backed persistence with full CRUD operations
- **Authentication**: Fully integrated Supabase Auth with UI and Server Actions
- **Enrollments**: Complete enrollment system with creation, viewing, and cancellation
- **Payment Model**: Invoice-based (no payment gateway - payments processed offline)
- **Email Notifications**: Resend integration with React Email templates (Dutch)
- **Testing Infrastructure**: Vitest unit tests + Playwright E2E tests configured
- **Security**: Input sanitization, XSS protection, CSRF protection
- **API Routes**: Webhook handlers and Next.js route handlers
- **Responsive Design**: Mobile-first approach across all pages
- **Dutch Language**: All content in Dutch as required
- **Database**: Supabase PostgreSQL with 7 tables and RLS policies
- **Data Migration**: 79 courses and 237 schedules successfully migrated
- **Session Management**: Middleware for auth session handling

### 🟡 Partially Implemented
- **Reviews & Ratings**: Database table and RLS policies ready, UI not implemented
- **Admin CRUD Operations**: Dashboard with real-time stats exists, course/user management actions needed

### ❌ Not Yet Implemented
- **Certificate generation**: PDF generation for course completion
- **Advanced analytics**: Detailed reporting and insights

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
**Current Method** (Using Supabase):
1. Insert course data directly into Supabase `courses` table via SQL or Supabase dashboard
2. Add corresponding schedules to `course_schedules` table
3. Ensure all required fields are included: slug, title, description, price, category, etc.
4. Set `published` to `true` to make the course visible
5. All content must be in Dutch

**Legacy Method** (Mock Data - Deprecated):
1. ~~Add course data to `lib/courses-generated.ts` or `course-data-raw.ts`~~
2. ~~Run migration script: `npx tsx scripts/migrate-to-supabase.ts`~~

### Working with Course Data
**Current Architecture**:
- **Primary source**: Supabase `courses` table (fetch via Server Components)
- **Server Actions**: Use `app/actions/` for mutations
- **TypeScript types**: Import from `types/database.types.ts`

**Example: Fetching Courses**
```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = createClient()
const { data: courses, error } = await supabase
  .from('courses')
  .select(`
    *,
    course_schedules(*)
  `)
  .eq('published', true)
```

**Legacy Files** (Still available but deprecated for new features):
- `lib/data.ts` - Original mock export
- `lib/courses-generated.ts` - Generated catalog
- `lib/course-descriptions.ts` - AI descriptions (~177KB)
- `lib/course-data-raw.ts` - Raw structure

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

### Supabase Database Integration
**Status**: ✅ Fully integrated and operational

- **Database**: PostgreSQL via Supabase
- **Tables**: 7 tables with Row Level Security (RLS) enabled
- **Data**: 79 courses and 237 schedules migrated
- **Environment**: Requires `.env.local` configuration (see `.env.local.example`)
- **Migration**: Use `npx tsx scripts/migrate-to-supabase.ts` if re-migration needed
- **Schema**: Located in `supabase/schema.sql`

### Authentication
**Status**: ✅ Fully integrated and operational

- **Backend**: Supabase Auth with Server Actions (`app/actions/auth.ts`)
- **Available Actions**: `signUp`, `signIn`, `signOut`, `resetPassword`
- **Session Management**: Middleware configured (`middleware.ts`)
- **UI Integration**: Login/register pages fully connected to backend
- **Email**: Supabase handles email verification and password resets
- **Protected Routes**: Dashboard pages require authentication
- **User Profile**: User data accessible via `getUser()` server action

### Payment System
**Status**: ✅ Invoice-based model (no payment gateway)

- **Payment Model**: Invoice/receipt-based, payments processed offline
- **Enrollment Flow**: Users can enroll without upfront payment
- **Invoice Generation**: To be implemented with PDF generation library
- **Payment Tracking**: Payment status tracked in `enrollments` table (pending, paid, cancelled)
- **Admin Management**: Admins mark enrollments as paid after receiving payment
- **Email Invoices**: Enrollment confirmation emails include payment instructions
- **Bank Transfer**: Primary payment method (Dutch standard for B2B)
- **No Gateway Fees**: Simpler architecture, lower costs

### Environment Variables
**Required** (`.env.local`):
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend Email (Required for notifications)
RESEND_API_KEY=re_...

# App Configuration (Required)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Rate Limiting (only if using Upstash Redis)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**Never commit** `.env.local` to git - it's already in `.gitignore`.

**Note**: Stripe/payment gateway variables not needed - using invoice-based payment model.

**See**: `.env.local.example` for complete template with descriptions.

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
- Database operations (Supabase Integration Expert)
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

**Root Documentation**:
- **TDD Workflow**: [`docs/TDD_WORKFLOW.md`](docs/TDD_WORKFLOW.md) - Comprehensive TDD guide with examples
- **Usage Guide**: [`docs/USAGE.md`](docs/USAGE.md) - Detailed usage instructions and workflows
- **Deployment**: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) - Deployment strategies and configurations
- **Production Roadmap**: [`PRODUCTION_ROADMAP.md`](PRODUCTION_ROADMAP.md) - Complete production deployment checklist

**TechTrain Documentation**:
- **README**: [`techtrain-courses/README.md`](techtrain-courses/README.md) - Implementation status and tech stack
- **Docs Index**: [`techtrain-courses/docs/README.md`](techtrain-courses/docs/README.md) - Documentation navigation

**Status Reports** (`techtrain-courses/docs/status/`):
- **Codebase Review**: [`CODEBASE_REVIEW.md`](techtrain-courses/docs/status/CODEBASE_REVIEW.md) - Detailed codebase analysis
- **Site Health Check**: [`SITE_HEALTH_CHECK.md`](techtrain-courses/docs/status/SITE_HEALTH_CHECK.md) - Site health and performance metrics
- **Supabase Integration**: [`SUPABASE_INTEGRATION_COMPLETE.md`](techtrain-courses/docs/status/SUPABASE_INTEGRATION_COMPLETE.md) - Integration status
- **Stripe Integration**: [`STRIPE_INTEGRATION_COMPLETE.md`](techtrain-courses/docs/status/STRIPE_INTEGRATION_COMPLETE.md) - Payment integration status
- **Email Integration**: [`EMAIL_IMPLEMENTATION_COMPLETE.md`](techtrain-courses/docs/status/EMAIL_IMPLEMENTATION_COMPLETE.md) - Email system status
- **Enrollment Integration**: [`ENROLLMENT_INTEGRATION_COMPLETE.md`](techtrain-courses/docs/status/ENROLLMENT_INTEGRATION_COMPLETE.md) - Enrollment system status
- **Testing Setup**: [`TESTING_SETUP_COMPLETE.md`](techtrain-courses/docs/status/TESTING_SETUP_COMPLETE.md) - Testing infrastructure status
- **Security Implementation**: [`SECURITY_IMPLEMENTATION_SUMMARY.md`](techtrain-courses/docs/status/SECURITY_IMPLEMENTATION_SUMMARY.md) - Security status

**Setup Guides** (`techtrain-courses/docs/setup/`):
- **Supabase Setup**: [`SUPABASE_SETUP.md`](techtrain-courses/docs/setup/SUPABASE_SETUP.md) - Database setup guide
- **Stripe Setup**: [`STRIPE_SETUP.md`](techtrain-courses/docs/setup/STRIPE_SETUP.md) - Payment setup guide
- **Email Setup**: [`EMAIL_SETUP.md`](techtrain-courses/docs/setup/EMAIL_SETUP.md) - Email service setup guide

**Implementation Guides** (`techtrain-courses/docs/guides/`):
- **Production Migration**: [`PRODUCTION_MIGRATION_GUIDE.md`](techtrain-courses/docs/guides/PRODUCTION_MIGRATION_GUIDE.md) - Database migration guide
- **Production Checklist**: [`PRODUCTION_CHECKLIST.md`](techtrain-courses/docs/guides/PRODUCTION_CHECKLIST.md) - Pre-launch checklist
- **Deployment Checklist**: [`DEPLOYMENT_CHECKLIST.md`](techtrain-courses/docs/guides/DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
- **Vercel Deployment**: [`VERCEL_DEPLOYMENT_GUIDE.md`](techtrain-courses/docs/guides/VERCEL_DEPLOYMENT_GUIDE.md) - Vercel deployment steps
- **Security Guide**: [`SECURITY.md`](techtrain-courses/docs/guides/SECURITY.md) - Security best practices
- **Stripe Quick Start**: [`STRIPE_QUICK_START.md`](techtrain-courses/docs/guides/STRIPE_QUICK_START.md) - Quick Stripe reference
- **Email Quick Reference**: [`QUICK_EMAIL_REFERENCE.md`](techtrain-courses/docs/guides/QUICK_EMAIL_REFERENCE.md) - Quick email reference

### Configuration Files
- **TypeScript**: [`techtrain-courses/tsconfig.json`](techtrain-courses/tsconfig.json) - Strict mode enabled, path aliases configured
- **Tailwind**: [`techtrain-courses/tailwind.config.ts`](techtrain-courses/tailwind.config.ts) - Custom design system configuration
- **Next.js**: [`techtrain-courses/next.config.js`](techtrain-courses/next.config.js) - Next.js configuration
- **Environment**: [`techtrain-courses/.env.local.example`](techtrain-courses/.env.local.example) - Environment variables template
- **Database Schema**: [`techtrain-courses/supabase/schema.sql`](techtrain-courses/supabase/schema.sql) - Complete database schema with RLS
- **Middleware**: [`techtrain-courses/middleware.ts`](techtrain-courses/middleware.ts) - Session management middleware
- **Claude Settings**: [`.claude/settings.local.json`](.claude/settings.local.json) - Claude Code settings

### Claude Agents
- **Agents Directory**: [`.claude/agents/`](.claude/agents/) - Specialized agents for production deployment
- **Agents Guide**: [`.claude/AGENTS_README.md`](.claude/AGENTS_README.md) - How to use the agents
