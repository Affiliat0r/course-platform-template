import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Example component for demonstration
function ExampleComponent({ message }: { message: string }) {
  return (
    <div>
      <h1>Example Component</h1>
      <p>{message}</p>
    </div>
  )
}

describe('Example Unit Test', () => {
  it('renders component with message', () => {
    render(<ExampleComponent message="Hello, TDD!" />)

    expect(screen.getByText('Example Component')).toBeInTheDocument()
    expect(screen.getByText('Hello, TDD!')).toBeInTheDocument()
  })

  it('renders heading with correct role', () => {
    render(<ExampleComponent message="Test" />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Example Component')
  })
})

/**
 * This is an example test file to demonstrate TDD structure.
 *
 * Replace this with your actual component tests following the pattern:
 *
 * 1. Write test (RED phase)
 * 2. Run test - it fails
 * 3. Write component code (GREEN phase)
 * 4. Run test - it passes
 * 5. Refactor (REFACTOR phase)
 * 6. Run test - still passes
 *
 * Use the /new-component command to scaffold components with tests.
 */
