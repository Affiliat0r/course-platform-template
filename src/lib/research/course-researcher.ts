/**
 * Course Platform Competitive Research
 *
 * Uses Playwright to research competitor course platforms
 * and gather market intelligence for informed planning.
 */

import { chromium, Browser, Page } from '@playwright/test'
import fs from 'fs/promises'
import path from 'path'

export interface CourseResearchData {
  platform: string
  url: string
  pricing: {
    model: 'one-time' | 'subscription' | 'tiered'
    prices: string[]
    currency: string
    discounts?: string[]
  }
  features: {
    hasVideo: boolean
    hasQuizzes: boolean
    hasCertificate: boolean
    hasDownloads: boolean
    hasMobile: boolean
    hasForums: boolean
    hasProjects: boolean
    hasLiveSupport: boolean
  }
  structure: {
    moduleCount: number
    averageLessonsPerModule: number
    totalDuration?: string
    contentTypes: string[]
  }
  screenshots: string[]
}

export class CourseResearcher {
  private browser: Browser | null = null
  private researchDir = 'research'

  async initialize() {
    // Create research directory
    await fs.mkdir(this.researchDir, { recursive: true })

    // Launch browser with MCP Playwright
    this.browser = await chromium.launch({
      headless: false, // Show browser for transparency
      viewport: { width: 1920, height: 1080 }
    })
  }

  async research(topic: string): Promise<CourseResearchData[]> {
    if (!this.browser) await this.initialize()

    const results: CourseResearchData[] = []

    // Define platforms to research based on topic
    const platforms = this.getPlatformsForTopic(topic)

    for (const platform of platforms) {
      try {
        const data = await this.researchPlatform(platform, topic)
        results.push(data)
      } catch (error) {
        console.error(`Failed to research ${platform.name}:`, error)
      }
    }

    return results
  }

  private getPlatformsForTopic(topic: string) {
    const programmingKeywords = ['typescript', 'javascript', 'react', 'python', 'code', 'programming']
    const isProgramming = programmingKeywords.some(keyword =>
      topic.toLowerCase().includes(keyword)
    )

    if (isProgramming) {
      return [
        { name: 'Udemy', searchUrl: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}` },
        { name: 'Coursera', searchUrl: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}` },
        { name: 'Pluralsight', searchUrl: `https://www.pluralsight.com/search?q=${encodeURIComponent(topic)}` }
      ]
    }

    // Default platforms for other topics
    return [
      { name: 'Udemy', searchUrl: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}` },
      { name: 'Skillshare', searchUrl: `https://www.skillshare.com/search?query=${encodeURIComponent(topic)}` },
      { name: 'Coursera', searchUrl: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}` }
    ]
  }

  private async researchPlatform(
    platform: { name: string; searchUrl: string },
    topic: string
  ): Promise<CourseResearchData> {
    const page = await this.browser!.newPage()
    const screenshots: string[] = []

    try {
      // Navigate to search results
      await page.goto(platform.searchUrl, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000) // Allow dynamic content to load

      // Take screenshot of search results
      const searchScreenshot = `${this.researchDir}/${platform.name}-${topic}-search.png`
      await page.screenshot({ path: searchScreenshot, fullPage: false })
      screenshots.push(searchScreenshot)

      // Extract data based on platform
      const data = await this.extractPlatformData(page, platform.name)

      // Try to navigate to a specific course for more details
      const courseLinks = await page.$$('[class*="course"] a, [class*="Course"] a')
      if (courseLinks.length > 0) {
        await courseLinks[0].click()
        await page.waitForTimeout(3000)

        const detailScreenshot = `${this.researchDir}/${platform.name}-${topic}-detail.png`
        await page.screenshot({ path: detailScreenshot, fullPage: false })
        screenshots.push(detailScreenshot)

        // Extract additional details
        const details = await this.extractCourseDetails(page, platform.name)
        Object.assign(data, details)
      }

      return {
        platform: platform.name,
        url: platform.searchUrl,
        pricing: data.pricing || { model: 'one-time', prices: [], currency: 'USD' },
        features: data.features || this.getDefaultFeatures(),
        structure: data.structure || this.getDefaultStructure(),
        screenshots
      }
    } finally {
      await page.close()
    }
  }

  private async extractPlatformData(page: Page, platformName: string) {
    // Platform-specific selectors
    const selectors = this.getSelectorsForPlatform(platformName)

    const pricing = await this.extractPricing(page, selectors.price)
    const features = await this.extractFeatures(page, selectors)
    const structure = await this.extractStructure(page, selectors)

    return { pricing, features, structure }
  }

  private async extractPricing(page: Page, priceSelectors: string[]) {
    const prices: string[] = []

    for (const selector of priceSelectors) {
      try {
        const priceElements = await page.$$(selector)
        for (const element of priceElements.slice(0, 5)) {
          const text = await element.textContent()
          if (text) prices.push(text.trim())
        }
      } catch (error) {
        // Selector might not exist on this platform
      }
    }

    return {
      model: this.detectPricingModel(prices),
      prices,
      currency: this.detectCurrency(prices)
    }
  }

  private async extractFeatures(page: Page, selectors: any) {
    return {
      hasVideo: await this.hasFeature(page, ['video', 'player', 'watch']),
      hasQuizzes: await this.hasFeature(page, ['quiz', 'test', 'assessment']),
      hasCertificate: await this.hasFeature(page, ['certificate', 'certification', 'completion']),
      hasDownloads: await this.hasFeature(page, ['download', 'resource', 'material']),
      hasMobile: await this.hasFeature(page, ['mobile', 'app', 'ios', 'android']),
      hasForums: await this.hasFeature(page, ['forum', 'discussion', 'community']),
      hasProjects: await this.hasFeature(page, ['project', 'assignment', 'hands-on']),
      hasLiveSupport: await this.hasFeature(page, ['live', 'support', 'mentor', 'Q&A'])
    }
  }

  private async extractStructure(page: Page, selectors: any) {
    try {
      // Try to find curriculum information
      const moduleElements = await page.$$('[class*="module"], [class*="section"], [class*="chapter"]')
      const lessonElements = await page.$$('[class*="lesson"], [class*="lecture"], [class*="video"]')

      return {
        moduleCount: Math.min(moduleElements.length, 20), // Cap at reasonable number
        averageLessonsPerModule: moduleElements.length > 0
          ? Math.round(lessonElements.length / moduleElements.length)
          : 5,
        contentTypes: ['video', 'text', 'quiz'], // Default assumption
        totalDuration: await this.extractDuration(page)
      }
    } catch (error) {
      return this.getDefaultStructure()
    }
  }

  private async extractCourseDetails(page: Page, platformName: string) {
    // Extract more detailed information from course page
    // This would be customized per platform
    return {}
  }

  private async extractDuration(page: Page): Promise<string | undefined> {
    const durationSelectors = [
      '[class*="duration"]',
      '[class*="length"]',
      '[class*="hours"]',
      'text=/\\d+\\s*(hours?|hrs?)/i'
    ]

    for (const selector of durationSelectors) {
      try {
        const element = await page.$(selector)
        if (element) {
          const text = await element.textContent()
          if (text) return text.trim()
        }
      } catch (error) {
        // Continue to next selector
      }
    }

    return undefined
  }

  private async hasFeature(page: Page, keywords: string[]): Promise<boolean> {
    for (const keyword of keywords) {
      const count = await page.locator(`text=/${keyword}/i`).count()
      if (count > 0) return true
    }
    return false
  }

  private getSelectorsForPlatform(platformName: string) {
    const platformSelectors: Record<string, any> = {
      Udemy: {
        price: ['[data-purpose="price-text"]', '.price-text', '.course-price'],
        curriculum: '[data-purpose="curriculum"]',
        modules: '.section--section-title',
        lessons: '.lecture-title'
      },
      Coursera: {
        price: ['.product-price', '.price', '[class*="ProductPrice"]'],
        curriculum: '[class*="syllabus"]',
        modules: '[class*="week"], [class*="module"]',
        lessons: '[class*="lesson"], [class*="item"]'
      },
      default: {
        price: ['[class*="price"]', '[data-price]', '.cost'],
        curriculum: '[class*="curriculum"], [class*="syllabus"], [class*="outline"]',
        modules: '[class*="module"], [class*="section"], [class*="chapter"]',
        lessons: '[class*="lesson"], [class*="lecture"], [class*="video"]'
      }
    }

    return platformSelectors[platformName] || platformSelectors.default
  }

  private detectPricingModel(prices: string[]): 'one-time' | 'subscription' | 'tiered' {
    const subscriptionKeywords = ['/month', '/year', 'monthly', 'yearly', 'subscription']
    const hasSubscription = prices.some(price =>
      subscriptionKeywords.some(keyword => price.toLowerCase().includes(keyword))
    )

    if (hasSubscription) return 'subscription'
    if (prices.length > 2) return 'tiered'
    return 'one-time'
  }

  private detectCurrency(prices: string[]): string {
    if (prices.some(p => p.includes('$'))) return 'USD'
    if (prices.some(p => p.includes('€'))) return 'EUR'
    if (prices.some(p => p.includes('£'))) return 'GBP'
    return 'USD' // Default
  }

  private getDefaultFeatures() {
    return {
      hasVideo: true,
      hasQuizzes: false,
      hasCertificate: false,
      hasDownloads: false,
      hasMobile: false,
      hasForums: false,
      hasProjects: false,
      hasLiveSupport: false
    }
  }

  private getDefaultStructure() {
    return {
      moduleCount: 6,
      averageLessonsPerModule: 5,
      contentTypes: ['video', 'text']
    }
  }

  async generateReport(data: CourseResearchData[]): Promise<string> {
    const report = `# Competitive Research Report

## Platforms Analyzed: ${data.length}

${data.map(platform => `
### ${platform.platform}

**URL:** ${platform.url}

**Pricing:**
- Model: ${platform.pricing.model}
- Prices: ${platform.pricing.prices.join(', ') || 'Not found'}

**Features:**
${Object.entries(platform.features)
  .filter(([_, value]) => value)
  .map(([feature, _]) => `- ✅ ${feature.replace(/^has/, '')}`)
  .join('\n')}

**Course Structure:**
- Modules: ${platform.structure.moduleCount}
- Lessons per module: ${platform.structure.averageLessonsPerModule}
${platform.structure.totalDuration ? `- Duration: ${platform.structure.totalDuration}` : ''}

**Screenshots:**
${platform.screenshots.map(s => `- ${s}`).join('\n')}
`).join('\n---\n')}

## Summary & Recommendations

Based on the research:
- **Average module count:** ${Math.round(data.reduce((sum, p) => sum + p.structure.moduleCount, 0) / data.length)}
- **Common features:** ${this.getCommonFeatures(data).join(', ')}
- **Pricing range:** ${this.getPriceRange(data)}

## Differentiation Opportunities

${this.getOpportunities(data).map(o => `- ${o}`).join('\n')}
`

    // Save report
    await fs.writeFile(`${this.researchDir}/research-report.md`, report)
    return report
  }

  private getCommonFeatures(data: CourseResearchData[]): string[] {
    const features: string[] = []
    const featureKeys = Object.keys(data[0]?.features || {})

    for (const key of featureKeys) {
      const hasFeature = data.every(p => p.features[key as keyof typeof p.features])
      if (hasFeature) features.push(key.replace(/^has/, ''))
    }

    return features
  }

  private getPriceRange(data: CourseResearchData[]): string {
    const allPrices = data.flatMap(p => p.pricing.prices)
    // Parse numeric values from price strings
    const numericPrices = allPrices
      .map(p => parseFloat(p.replace(/[^0-9.]/g, '')))
      .filter(n => !isNaN(n))

    if (numericPrices.length === 0) return 'Unable to determine'

    const min = Math.min(...numericPrices)
    const max = Math.max(...numericPrices)
    return `$${min} - $${max}`
  }

  private getOpportunities(data: CourseResearchData[]): string[] {
    const opportunities: string[] = []

    // Find features that few platforms have
    const rareFeatures = ['hasLiveSupport', 'hasProjects', 'hasForums']
    for (const feature of rareFeatures) {
      const count = data.filter(p => p.features[feature as keyof typeof p.features]).length
      if (count < data.length / 2) {
        opportunities.push(`Offer ${feature.replace(/^has/, '').toLowerCase()} (only ${count}/${data.length} platforms have this)`)
      }
    }

    return opportunities
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
    }
  }
}

// Example usage
export async function researchCourses(topic: string) {
  const researcher = new CourseResearcher()
  try {
    const data = await researcher.research(topic)
    const report = await researcher.generateReport(data)
    console.log('Research complete! Report saved to research/research-report.md')
    return { data, report }
  } finally {
    await researcher.cleanup()
  }
}