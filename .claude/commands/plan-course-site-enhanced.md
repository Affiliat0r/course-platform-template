# Plan Course Website with Competitive Analysis

Convert a course idea into a structured specification with competitive research using MCP Playwright.

## Enhanced Workflow

This command uses MCP Playwright to research existing course platforms before creating your specification.

### Phase 1: Research & Analysis

1. **Identify competitors based on course topic:**
   - For "TypeScript course" → Research: Udemy, Coursera, Pluralsight TypeScript courses
   - For "Cooking course" → Research: MasterClass, Skillshare cooking courses

2. **Use MCP Playwright to gather intel:**
   ```javascript
   // Example research automation
   const page = await browser.newPage()

   // Visit competitor sites
   const competitors = [
     'https://www.udemy.com/topic/typescript/',
     'https://www.pluralsight.com/courses/typescript',
     'https://www.coursera.org/search?query=typescript'
   ]

   for (const url of competitors) {
     await page.goto(url)

     // Take screenshots of course pages
     await page.screenshot({ path: `research/${siteName}-layout.png` })

     // Extract pricing information
     const pricing = await page.$$eval('.price', elements =>
       elements.map(el => el.textContent)
     )

     // Extract course structure
     const modules = await page.$$eval('.curriculum-item', elements =>
       elements.map(el => el.textContent)
     )

     // Analyze features
     const features = {
       hasVideo: await page.$('video') !== null,
       hasQuizzes: await page.$('.quiz') !== null,
       hasCertificate: await page.$('.certificate') !== null,
       hasForums: await page.$('.discussion') !== null
     }
   }
   ```

3. **Analyze gathered data:**
   - Common pricing ranges ($49-$199)
   - Typical course structure (5-10 modules)
   - Standard features (video, quizzes, certificates)
   - UI/UX patterns (course cards, progress bars)

### Phase 2: Generate Enhanced Specification

Use the research to create a MORE INFORMED specification:

```markdown
## Competitive Analysis Summary

Based on analysis of 5 similar TypeScript courses:

### Pricing Insights
- Udemy: $89.99 (frequently discounted to $19.99)
- Pluralsight: $29/month subscription
- Coursera: $49/month subscription
→ **Recommendation:** One-time $149 with launch discount option

### Content Structure Patterns
- Average: 7 modules, 42 lessons
- Video-first approach (average 5 hours content)
- Hands-on projects in 80% of courses
→ **Recommendation:** 6 modules with project-based learning

### Common Features
✅ All competitors have:
- Video lessons
- Downloadable resources
- Mobile access
- Completion certificates

⭐ Differentiation opportunities:
- Live Q&A sessions (only 20% offer this)
- AI-powered code review (none have this)
- Lifetime updates (only 40% offer this)

### UI/UX Best Practices Observed
[Screenshots attached]
- Clean course cards with progress indicators
- Sidebar navigation for lessons
- Video player with speed controls
- Dark mode for code examples
```

### Phase 3: AI-Enhanced Planning

The Course Architect agent now uses this research to create a specification that:
- **Matches market expectations** (pricing, features)
- **Identifies gaps** you can fill
- **Follows proven UI patterns** that work
- **Avoids common pitfalls** seen in competitors

## Example Usage

**Input:**
```
/plan-course-site-enhanced

Course idea: TypeScript for React developers
Research competitors: Yes
Take screenshots: Yes
Analyze pricing: Yes
```

**Process:**
1. MCP Playwright visits Udemy, Coursera, Pluralsight
2. Takes screenshots of TypeScript+React courses
3. Extracts pricing, curriculum, features
4. Analyzes what works and what's missing

**Output:**
- Competitive analysis document
- Screenshots folder with UI examples
- Enhanced specification based on market research
- Differentiation strategy

## Implementation Code

```typescript
// src/lib/course-research.ts
import { chromium } from 'playwright'

export async function researchCompetitors(topic: string) {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const insights = {
    pricing: [],
    features: [],
    structure: [],
    screenshots: []
  }

  // Research Udemy
  await page.goto(`https://udemy.com/topic/${topic}`)
  const udemyData = await page.evaluate(() => {
    return {
      prices: [...document.querySelectorAll('[data-purpose="price-text"]')]
        .map(el => el.textContent),
      courseCount: document.querySelectorAll('.course-card').length,
      ratings: [...document.querySelectorAll('.star-rating')]
        .map(el => el.getAttribute('aria-label'))
    }
  })

  await page.screenshot({
    path: `research/udemy-${topic}.png`,
    fullPage: true
  })

  insights.pricing.push(...udemyData.prices)
  insights.screenshots.push(`research/udemy-${topic}.png`)

  // Continue with other platforms...

  await browser.close()
  return insights
}
```

## Benefits of This Approach

1. **Data-driven decisions** - Base your course on what actually works
2. **Competitive pricing** - Know what the market will bear
3. **Feature parity** - Don't miss expected features
4. **Differentiation** - Find gaps to make your course unique
5. **UI inspiration** - See what interfaces users are familiar with

## Privacy & Ethics Note

When researching competitors:
- Only gather publicly available information
- Respect robots.txt and terms of service
- Don't scrape personal data or copyrighted content
- Use insights for structure/features, not to copy content

## Commands This Enhances

- `/plan-course-site` - Now includes competitive research
- `/new-course` - Can reference competitor analysis
- `/tdd-cycle` - Tests based on competitor features