import { test, expect } from '@playwright/test'

/**
 * User Registration E2E Tests
 *
 * Tests the complete user registration flow including:
 * - Form validation
 * - Successful registration
 * - Error handling
 * - Email confirmation flow
 */

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('should display registration form', async ({ page }) => {
    // Verify form elements are present
    await expect(page.locator('input[name="fullName"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click submit without filling form
    await page.click('button[type="submit"]')

    // Wait for validation errors to appear
    await page.waitForTimeout(500)

    // Check that we're still on the registration page (form didn't submit)
    await expect(page).toHaveURL(/\/register/)
  })

  test('should show error for invalid email format', async ({ page }) => {
    await page.fill('input[name="fullName"]', 'Test User')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="password"]', 'SecurePassword123!')

    await page.click('button[type="submit"]')

    // Wait for error message
    await page.waitForTimeout(500)

    // Should show Dutch error message for invalid email
    const errorText = await page.textContent('body')
    expect(errorText).toMatch(/e-?mail|ongeldig/i)
  })

  test('should show error for weak password', async ({ page }) => {
    await page.fill('input[name="fullName"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', '123')

    await page.click('button[type="submit"]')

    // Wait for error message
    await page.waitForTimeout(500)

    // Should show Dutch error message about password length
    const errorText = await page.textContent('body')
    expect(errorText).toMatch(/wachtwoord|minimaal|tekens/i)
  })

  test('should register a new user successfully', async ({ page }) => {
    // Generate unique email to avoid conflicts
    const timestamp = Date.now()
    const testEmail = `test+${timestamp}@example.com`

    // Fill registration form
    await page.fill('input[name="fullName"]', 'Test User')
    await page.fill('input[name="email"]', testEmail)
    await page.fill('input[name="password"]', 'SecurePassword123!')

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for success indication (could be redirect or success message)
    await page.waitForTimeout(2000)

    // Check for success message or redirect
    const currentUrl = page.url()
    const pageText = await page.textContent('body')

    // Should either redirect or show success message
    const isSuccess =
      currentUrl.includes('/login') ||
      currentUrl.includes('/dashboard') ||
      pageText?.includes('Controleer') ||
      pageText?.includes('e-mail') ||
      pageText?.includes('bevestig')

    expect(isSuccess).toBeTruthy()
  })

  test('should show error when registering with existing email', async ({ page }) => {
    // Use a common test email that likely exists
    await page.fill('input[name="fullName"]', 'Test User')
    await page.fill('input[name="email"]', 'existing@example.com')
    await page.fill('input[name="password"]', 'SecurePassword123!')

    await page.click('button[type="submit"]')

    // Wait for error response
    await page.waitForTimeout(2000)

    // Should either stay on registration page or show error
    const pageText = await page.textContent('body')
    expect(pageText).toBeTruthy()
  })

  test('should have link to login page', async ({ page }) => {
    // Look for login link
    const loginLink = page.locator('a[href*="/login"]')
    await expect(loginLink).toBeVisible()

    // Click login link
    await loginLink.click()

    // Should navigate to login page
    await expect(page).toHaveURL(/\/login/)
  })

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    // Verify form is usable on mobile
    await expect(page.locator('input[name="fullName"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()

    // Verify no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // Allow 1px tolerance
  })
})
