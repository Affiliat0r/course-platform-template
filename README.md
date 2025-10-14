# Course Platform Template

A production-ready Next.js template for building course-selling e-commerce platforms with built-in TDD infrastructure, accessibility support, and Claude Code integration.

## Features

✅ **Next.js 14** - App Router with React Server Components
✅ **TypeScript** - Full type safety
✅ **Tailwind CSS** - Utility-first styling with shadcn/ui components
✅ **Stripe Integration** - Payment processing ready
✅ **NextAuth.js** - Authentication built-in
✅ **Prisma + PostgreSQL** - Type-safe database access
✅ **TDD Infrastructure** - Vitest + Playwright + Testing Library
✅ **Accessibility** - WCAG 2.1 AA compliance built-in
✅ **SEO Optimized** - Meta tags, structured data, sitemaps
✅ **CI/CD Ready** - GitHub Actions workflows included
✅ **Claude Code Agents** - Specialized agents for course platform development

## Prerequisites

- Node.js 18.18.0 or higher
- npm 9.0.0 or higher
- PostgreSQL database (local or hosted)
- Stripe account (for payments)
- GitHub CLI (optional, for `/gh-*` commands)

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy the example environment file:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and fill in your actual values:

\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/courseplatform"
NEXTAUTH_SECRET="your-generated-secret"  # Generate with: openssl rand -base64 32
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
\`\`\`

### 3. Set Up Database

\`\`\`bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with example data (optional)
npm run db:seed
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
course-platform-template/
├── .claude/                    # Claude Code configuration
│   ├── agents/                 # Specialized AI agents
│   │   ├── test-first-guide.md
│   │   ├── course-architect.md
│   │   ├── payment-flow-expert.md
│   │   ├── accessibility-checker.md
│   │   └── seo-optimizer.md
│   └── commands/               # Custom slash commands
│       ├── gh-*.md             # GitHub workflow commands
│       ├── plan-course-site.md
│       ├── new-course.md
│       ├── new-component.md
│       └── tdd-cycle.md
│
├── .github/workflows/          # CI/CD pipelines
│   ├── test.yml
│   ├── e2e-test.yml
│   ├── preview-deploy.yml
│   └── production-deploy.yml
│
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── lib/                    # Utilities and helpers
│   └── types/                  # TypeScript types
│
├── tests/
│   ├── unit/                   # Vitest unit tests
│   ├── integration/            # API integration tests
│   ├── e2e/                    # Playwright E2E tests
│   ├── a11y/                   # Accessibility tests
│   └── setup.ts                # Test configuration
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seed data
│
└── docs/                       # Documentation
    ├── USAGE.md
    ├── TDD_WORKFLOW.md
    └── DEPLOYMENT.md
\`\`\`

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Testing
- `npm test` - Run all Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:unit` - Run unit tests with coverage
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run test:a11y` - Run accessibility tests

### Database
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio

### Stripe
- `npm run stripe:listen` - Listen to Stripe webhooks locally

## Claude Code Commands

This template includes custom slash commands for Claude Code:

### GitHub Workflows
- `/gh-clone-repo` - Clone a GitHub repository
- `/gh-create-repo` - Create GitHub repo from local project
- `/gh-feature-branch` - Create a new feature branch
- `/gh-push` - Push changes to GitHub
- `/gh-create-pr` - Create a pull request

### Course Platform Development
- `/plan-course-site` - Convert course idea into technical specification
- `/new-course` - Add a new course (TDD approach)
- `/new-component` - Create a component with tests
- `/tdd-cycle` - Guide through Red-Green-Refactor

## Test-Driven Development Workflow

This template enforces TDD best practices:

1. **RED** - Write failing tests first
2. **GREEN** - Write minimal code to pass tests
3. **REFACTOR** - Improve code while tests pass

See [docs/TDD_WORKFLOW.md](docs/TDD_WORKFLOW.md) for detailed guide.

## MCP Playwright Compatibility

This template is compatible with both:
- **Standard Playwright** (installed locally via npm)
- **MCP Playwright** (globally installed)

For local development with global MCP Playwright:
\`\`\`bash
npx playwright test
\`\`\`

For CI/CD with project-local Playwright:
\`\`\`bash
npm run test:e2e
\`\`\`

Both will use the same `playwright.config.ts` configuration.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## Environment Variables

Required variables in production:

\`\`\`env
DATABASE_URL              # PostgreSQL connection string
NEXTAUTH_SECRET           # Auth secret (generate new for production)
NEXTAUTH_URL              # Your production URL
STRIPE_SECRET_KEY         # Stripe live secret key
STRIPE_PUBLISHABLE_KEY    # Stripe live publishable key
STRIPE_WEBHOOK_SECRET     # Stripe webhook secret
\`\`\`

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Testing:** Vitest, React Testing Library, Playwright
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## Contributing

This is a template repository. To use it:

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Follow the Getting Started guide above

## License

MIT

## Support

For issues or questions:
- Check [docs/](docs/) folder
- Review Claude Code agents in `.claude/agents/`
- Use Claude Code commands for development guidance
