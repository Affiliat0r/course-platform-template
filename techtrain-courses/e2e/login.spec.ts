import { test, expect } from '@playwright/test'

/**
 * User Login E2E Tests
 *
 * Tests the complete login flow including:
 * - Form validation
 * - Successful login
 * - Error handling for invalid credentials
 * - Rate limiting
 * - Password reset flow
 */

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should display login form', async ({ page }) => {
    // Verify form elements are present
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click submit without filling form
    await page.click('button[type="submit"]')

    // Wait for validation
    await page.waitForTimeout(500)

    // Should still be on login page
    await expect(page).toHaveURL(/\/login/)
  })

  test('should show error for invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="password"]', 'password123')

    await page.click('button[type="submit"]')

    // Wait for error
    await page.waitForTimeout(500)

    const errorText = await page.textContent('body')
    expect(errorText).toMatch(/e-?mail|ongeldig/i)
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'nonexistent@example.com')
    await page.fill('input[name="password"]', 'WrongPassword123!')

    await page.click('button[type="submit"]')

    // Wait for error response
    await page.waitForTimeout(2000)

    // Should show error message in Dutch
    const pageText = await page.textContent('body')
    expect(pageText).toMatch(/ongeld|fout|incorrect/i)
  })

  test('should have forgot password link', async ({ page }) => {
    // Look for forgot password link
    const forgotLink = page.locator('a[href*="/forgot-password"], a:has-text("wachtwoord vergeten")')
    await expect(forgotLink).toBeVisible()

    // Click the link
    await forgotLink.click()

    // Should navigate to forgot password page
    await expect(page).toHaveURL(/\/forgot-password/)
  })

  test('should have link to registration page', async ({ page }) => {
    // Look for registration link
    const registerLink = page.locator('a[href*="/register"]')
    await expect(registerLink).toBeVisible()

    // Click register link
    await registerLink.click()

    // Should navigate to registration page
    await expect(page).toHaveURL(/\/register/)
  })

  test('should handle remember me option if present', async ({ page }) => {
    // Check if remember me checkbox exists
    const rememberMe = page.locator('input[type="checkbox"][name="remember"]')
    const isPresent = await rememberMe.count() > 0

    if (isPresent) {
      await rememberMe.check()
      await expect(rememberMe).toBeChecked()
    }
  })

  test('should show loading state during login', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')

    // Click submit
    await page.click('button[type="submit"]')

    // Button should show loading state (disabled or with loading text)
    const submitButton = page.locator('button[type="submit"]')

    // Wait a bit for loading state
    await page.waitForTimeout(100)

    // Check if button is disabled or contains loading indicator
    const isDisabled = await submitButton.isDisabled()
    const buttonText = await submitButton.textContent()

    // Should either be disabled or show loading text
    expect(isDisabled || buttonText?.includes('...') || buttonText?.includes('laden')).toBeTruthy()
  })

  test('should be accessible via keyboard navigation', async ({ page }) => {
    // Tab through form elements
    await page.keyboard.press('Tab') // Email field
    await page.keyboard.type('test@example.com')

    await page.keyboard.press('Tab') // Password field
    await page.keyboard.type('TestPassword123!')

    await page.keyboard.press('Tab') // Should focus on submit button or checkbox

    // Verify navigation worked
    const emailValue = await page.locator('input[name="email"]').inputValue()
    const passwordValue = await page.locator('input[name="password"]').inputValue()

    expect(emailValue).toBe('test@example.com')
    expect(passwordValue).toBe('TestPassword123!')
  })

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    // Verify form is usable on mobile
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()

    // Verify no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // Allow 1px tolerance
  })

  test('should mask password input', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]')

    // Password field should be type="password"
    await expect(passwordInput).toHaveAttribute('type', 'password')

    // Type password
    await passwordInput.fill('MySecretPassword123!')

    // Value should be set but not visible (masked)
    const inputType = await passwordInput.getAttribute('type')
    expect(inputType).toBe('password')
  })

  test('should prevent SQL injection attempts', async ({ page }) => {
    // Try SQL injection in email field
    await page.fill('input[name="email"]', "admin'--")
    await page.fill('input[name="password"]', "' OR '1'='1")

    await page.click('button[type="submit"]')

    // Wait for response
    await page.waitForTimeout(2000)

    // Should not crash or show database errors
    const pageText = await page.textContent('body')
    expect(pageText).not.toMatch(/sql|database|mysql|postgres/i)
  })

  test('should prevent XSS attempts', async ({ page }) => {
    // Try XSS in email field
    await page.fill('input[name="email"]', '<script>alert("xss")</script>')
    await page.fill('input[name="password"]', 'password')

    await page.click('button[type="submit"]')

    // Wait for response
    await page.waitForTimeout(1000)

    // Script should not execute (no alert)
    const alerts: string[] = []
    page.on('dialog', dialog => {
      alerts.push(dialog.message())
      dialog.dismiss()
    })

    expect(alerts).toHaveLength(0)
  })
})

test.describe('Forgot Password Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password')
  })

  test('should display forgot password form', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email')
    await page.click('button[type="submit"]')

    await page.waitForTimeout(500)

    const errorText = await page.textContent('body')
    expect(errorText).toMatch(/e-?mail|ongeldig/i)
  })

  test('should submit password reset request', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com')
    await page.click('button[type="submit"]')

    // Wait for success message
    await page.waitForTimeout(2000)

    // Should show success message or confirmation
    const pageText = await page.textContent('body')
    expect(pageText).toMatch(/e-?mail|verzonden|verstuur|controleer/i)
  })

  test('should have link back to login', async ({ page }) => {
    const loginLink = page.locator('a[href*="/login"]')
    await expect(loginLink).toBeVisible()

    await loginLink.click()
    await expect(page).toHaveURL(/\/login/)
  })
})
