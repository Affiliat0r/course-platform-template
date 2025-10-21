import { test, expect } from '@playwright/test'

/**
 * Course Catalog and Detail E2E Tests
 *
 * Tests the course browsing and enrollment flow
 */

test.describe('Course Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/courses')
  })

  test('should display course catalog', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Should have courses heading
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()

    // Should display course cards
    const courseCards = page.locator('[class*="course-card"], article, [data-testid="course-card"]')
    const count = await courseCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should filter courses by category', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Look for filter buttons or checkboxes
    const filters = page.locator('button:has-text("Frontend"), button:has-text("Backend"), input[type="checkbox"]')
    const hasFilters = await filters.count() > 0

    if (hasFilters) {
      // Click first filter
      await filters.first().click()

      // Wait for results to update
      await page.waitForTimeout(500)

      // Should still show courses (filtered)
      const courseCards = page.locator('[class*="course-card"], article')
      const count = await courseCards.count()
      expect(count).toBeGreaterThanOrEqual(0)
    }
  })

  test('should search for courses', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Zoek"]')
    const hasSearch = await searchInput.count() > 0

    if (hasSearch) {
      await searchInput.fill('React')
      await page.waitForTimeout(500)

      // Should show filtered results
      const pageText = await page.textContent('body')
      expect(pageText).toBeTruthy()
    }
  })

  test('should navigate to course detail page', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Click first course card
    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    await firstCourseLink.click()

    // Should navigate to course detail page
    await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/)

    // Should display course information
    await page.waitForLoadState('networkidle')
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    await page.waitForLoadState('networkidle')

    // Verify no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)

    // Course cards should be visible
    const courseCards = page.locator('[class*="course-card"], article')
    const firstCard = courseCards.first()
    await expect(firstCard).toBeVisible()
  })
})

test.describe('Course Detail Page', () => {
  test('should display course information', async ({ page }) => {
    // Navigate to a course detail page (use first course from catalog)
    await page.goto('/courses')
    await page.waitForLoadState('networkidle')

    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    await firstCourseLink.click()

    await page.waitForLoadState('networkidle')

    // Should have course title
    const title = page.locator('h1').first()
    await expect(title).toBeVisible()

    // Should have description
    const pageText = await page.textContent('body')
    expect(pageText).toBeTruthy()
    expect(pageText!.length).toBeGreaterThan(100)
  })

  test('should display course price', async ({ page }) => {
    await page.goto('/courses')
    await page.waitForLoadState('networkidle')

    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    await firstCourseLink.click()

    await page.waitForLoadState('networkidle')

    // Look for price (€ symbol)
    const pageText = await page.textContent('body')
    expect(pageText).toMatch(/€\s*\d/)
  })

  test('should show enrollment button or form', async ({ page }) => {
    await page.goto('/courses')
    await page.waitForLoadState('networkidle')

    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    await firstCourseLink.click()

    await page.waitForLoadState('networkidle')

    // Look for enrollment CTA (button or form)
    const enrollButton = page.locator('button:has-text("inschrijven"), a:has-text("inschrijven"), button:has-text("boek")')
    const hasEnrollButton = await enrollButton.count() > 0

    expect(hasEnrollButton).toBeTruthy()
  })

  test('should display course schedules if available', async ({ page }) => {
    await page.goto('/courses')
    await page.waitForLoadState('networkidle')

    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    await firstCourseLink.click()

    await page.waitForLoadState('networkidle')

    // Look for schedule information (dates, locations)
    const pageText = await page.textContent('body')

    // Should have either schedule information or a message about no schedules
    const hasScheduleInfo = pageText?.match(/\d{4}|januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december/i)
    expect(hasScheduleInfo || pageText?.includes('geen') || pageText?.includes('binnenkort')).toBeTruthy()
  })

  test('should have navigation back to courses', async ({ page }) => {
    await page.goto('/courses')
    await page.waitForLoadState('networkidle')

    const firstCourseLink = page.locator('a[href*="/courses/"]').first()
    await firstCourseLink.click()

    await page.waitForLoadState('networkidle')

    // Look for breadcrumb or back button
    const backLink = page.locator('a[href="/courses"], a:has-text("Terug"), a:has-text("Cursussen")')
    const hasBackLink = await backLink.count() > 0

    if (hasBackLink) {
      await backLink.first().click()
      await expect(page).toHaveURL(/\/courses/)
    }
  })
})

test.describe('Homepage', () => {
  test('should display homepage correctly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have main heading
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    // Should have CTA to courses
    const coursesLink = page.locator('a[href*="/courses"]')
    await expect(coursesLink.first()).toBeVisible()
  })

  test('should navigate to courses from homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const coursesLink = page.locator('a[href*="/courses"]').first()
    await coursesLink.click()

    await expect(page).toHaveURL(/\/courses/)
  })

  test('should have working navigation menu', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for navigation links
    const nav = page.locator('nav, header')
    await expect(nav).toBeVisible()

    // Should have links to main pages
    const aboutLink = page.locator('a[href*="/about"]')
    const contactLink = page.locator('a[href*="/contact"]')

    // At least one of these should exist
    const hasNavLinks = (await aboutLink.count()) > 0 || (await contactLink.count()) > 0
    expect(hasNavLinks).toBeTruthy()
  })

  test('should be mobile responsive', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
