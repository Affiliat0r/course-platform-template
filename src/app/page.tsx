export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Course Platform Template
        </h1>

        <div className="bg-card border rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Set up your environment variables in <code className="bg-muted px-2 py-1 rounded">.env</code></li>
              <li>Run database migrations: <code className="bg-muted px-2 py-1 rounded">npm run db:migrate</code></li>
              <li>Seed the database: <code className="bg-muted px-2 py-1 rounded">npm run db:seed</code></li>
              <li>Use Claude Code commands to plan your course site: <code className="bg-muted px-2 py-1 rounded">/plan-course-site</code></li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Next.js 14 with App Router',
                'TypeScript for type safety',
                'Tailwind CSS styling',
                'Stripe payment integration',
                'NextAuth.js authentication',
                'Prisma + PostgreSQL',
                'TDD infrastructure (Vitest + Playwright)',
                'Accessibility built-in (WCAG 2.1 AA)',
                'SEO optimized',
                'CI/CD with GitHub Actions',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Use the following Claude Code commands to build your course platform:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><code className="bg-muted px-2 py-1 rounded">/plan-course-site</code> - Plan your course website</li>
                <li><code className="bg-muted px-2 py-1 rounded">/new-course</code> - Add a new course</li>
                <li><code className="bg-muted px-2 py-1 rounded">/new-component</code> - Create components with tests</li>
                <li><code className="bg-muted px-2 py-1 rounded">/tdd-cycle</code> - Follow TDD workflow</li>
              </ul>
            </div>
          </section>
        </div>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </main>
  )
}
