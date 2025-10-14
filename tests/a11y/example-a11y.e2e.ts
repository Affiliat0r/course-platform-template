import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Example accessibility test using axe-core.
 *
 * These tests ensure WCAG 2.1 Level AA compliance.
 */

test.describe('Accessibility Tests', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('course page should not have accessibility violations', async ({ page }) => {
    // Adjust URL to match your course page structure
    await page.goto('/courses/example-course')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation works on course catalog', async ({ page }) => {
    await page.goto('/courses')

    // Tab to first course card
    await page.keyboard.press('Tab')

    // Verify focus is visible
    const focusedElement = await page.locator(':focus')
    await expect(focusedElement).toBeVisible()

    // Press Enter to navigate
    await page.keyboard.press('Enter')

    // Verify navigation occurred (adjust as needed)
    await expect(page).toHaveURL(/.*courses\/.*/)
  })

  test('form inputs have proper labels', async ({ page }) => {
    // Adjust to your login/signup page
    await page.goto('/login')

    // Check for email input with label
    const emailInput = page.locator('input[type="email"]')
    const emailLabel = page.locator('label[for]').filter({ hasText: /email/i })

    await expect(emailInput).toBeVisible()
    await expect(emailLabel).toBeVisible()

    // Check for password input with label
    const passwordInput = page.locator('input[type="password"]')
    const passwordLabel = page.locator('label[for]').filter({ hasText: /password/i })

    await expect(passwordInput).toBeVisible()
    await expect(passwordLabel).toBeVisible()
  })
})

/**
 * Common accessibility checks for course platform:
 *
 * 1. Semantic HTML:
 *    - Proper heading hierarchy (h1 -> h2 -> h3)
 *    - Use of landmarks (main, nav, footer, etc.)
 *
 * 2. Keyboard Navigation:
 *    - All interactive elements accessible via Tab
 *    - Enter/Space activate buttons
 *    - Escape closes modals
 *
 * 3. Color Contrast:
 *    - Text meets WCAG AA (4.5:1 for normal, 3:1 for large)
 *    - UI components meet 3:1
 *
 * 4. Form Accessibility:
 *    - All inputs have labels
 *    - Error messages are announced
 *    - Required fields are indicated
 *
 * 5. Images:
 *    - All images have alt text
 *    - Decorative images use alt=""
 *
 * 6. Video Content:
 *    - Course videos have captions
 *    - Transcripts are available
 */
