# UX Analyzer Agent

A comprehensive UI/UX and logic analysis agent for investigating web application pages and identifying improvement opportunities.

## Arguments

**$TARGET_FOLDER** (required) - The folder/page to analyze
- Examples: `courses`, `checkout`, `faq`, `admin`, `login`, `register`
- The agent will automatically discover and analyze all related files in `app/$TARGET_FOLDER/`

## Purpose

This agent performs deep analysis of user interface components, user experience flows, and application logic to identify:
- Usability issues and friction points
- Missing features and capabilities
- Performance bottlenecks
- Accessibility gaps
- Visual design improvements
- Mobile optimization opportunities

## When to Use

Use this agent when you need to:
- Evaluate a page or component for UX quality
- Identify areas of improvement in an existing feature
- Get actionable recommendations for enhancement
- Audit accessibility compliance
- Analyze performance characteristics
- Plan refactoring or redesign efforts

## What It Provides

### 1. Comprehensive Analysis Report

**UI/UX Analysis:**
- Layout and visual hierarchy evaluation
- Responsive design assessment
- Color scheme and typography review
- User flow and navigation patterns
- Accessibility features audit
- Component usability analysis
- Loading and error state review
- Mobile vs desktop experience comparison

**Logic & Functionality Analysis:**
- Data flow and state management review
- Filter, search, and sort logic evaluation
- Performance considerations
- Data structure efficiency
- Caching and optimization opportunities

### 2. Categorized Issues

Issues identified and categorized by:
- **Usability Issues** - Friction points and confusion
- **Missing Features** - Gaps in functionality
- **Performance Bottlenecks** - Speed and efficiency problems
- **Accessibility Gaps** - WCAG compliance issues
- **Visual Design** - Aesthetic and hierarchy improvements
- **Mobile Optimization** - Touch and small screen issues

### 3. Prioritized Recommendations

Three-tier priority system:
- **Quick Wins** - Low effort, high impact (< 1 hour each)
- **Medium-Term** - Moderate effort, significant value (1-8 hours)
- **Long-Term** - Major initiatives (1+ weeks)

Each recommendation includes:
- Specific file locations and line numbers
- Estimated effort and impact
- Implementation guidance
- Code examples where applicable

## Usage Example

**Basic Usage:**
```
$TARGET_FOLDER=courses
```

This will analyze:
- `app/courses/page.tsx`
- `app/courses/[slug]/page.tsx`
- `app/courses/loading.tsx`
- `app/courses/error.tsx`
- Related components (CourseCard, filters, etc.)
- Data files used by the pages

**Other Examples:**
```
$TARGET_FOLDER=checkout
$TARGET_FOLDER=faq
$TARGET_FOLDER=admin
$TARGET_FOLDER=login
```

**Advanced Usage with Specific Focus:**
```
$TARGET_FOLDER=courses
Focus: Mobile experience and accessibility
```

## Output Format

The agent provides:

1. **Executive Summary** - Key findings overview
2. **Detailed Analysis** - Deep dive into each aspect
3. **Issue Inventory** - Complete list with severity
4. **Action Plan** - Prioritized recommendations
5. **Implementation Guide** - Code examples and next steps

## Best Practices

- Always specify `$TARGET_FOLDER` argument
- The agent will automatically discover all related files
- Mention specific concerns if any (e.g., "focus on mobile", "prioritize accessibility")
- The agent works from code files, not live site
- Results include file paths and line numbers for easy navigation
- Use findings to create a focused improvement roadmap

## Files Automatically Analyzed

When you specify `$TARGET_FOLDER`, the agent will examine:

1. **Page Files:**
   - `app/$TARGET_FOLDER/page.tsx` (main page)
   - `app/$TARGET_FOLDER/[slug]/page.tsx` (dynamic routes)
   - `app/$TARGET_FOLDER/loading.tsx` (loading state)
   - `app/$TARGET_FOLDER/error.tsx` (error state)
   - `app/$TARGET_FOLDER/layout.tsx` (layout if exists)

2. **Related Components:**
   - Components imported by the page
   - Shared UI components (Button, Input, Card, etc.)
   - Page-specific components

3. **Data & Logic:**
   - Data fetching files (`lib/data.ts`)
   - Type definitions (`types/`)
   - Utility functions
   - Mock data or API integrations

4. **Configuration:**
   - Tailwind config (for styling analysis)
   - Next.js config (for performance analysis)

## Example Output Sections

### Quick Wins (High Impact, Low Effort)
- Fix filter UX inconsistency (15 min)
- Add sort functionality (30 min)
- Implement search debouncing (20 min)
- Add accessibility focus indicators (10 min)

### Medium-Term Improvements
- Implement pagination (2-3 hours)
- Add URL state synchronization (3-4 hours)
- Create mobile filter drawer (4-5 hours)
- Pre-generate data at build time (3-4 hours)

### Long-Term Enhancements
- Advanced search with facets (2-3 weeks)
- Personalized recommendations (3-4 weeks)
- Multi-language support (4-6 weeks)

## Complementary Agents

Pairs well with:
- **code-reviewer** - For implementation review after fixes
- **test-runner** - To validate improvements
- **accessibility-auditor** - For deeper WCAG analysis

## Notes

- Analysis is thorough and comprehensive
- Findings are actionable with clear next steps
- Recommendations consider both user value and technical feasibility
- Reports include statistics and metrics
- Agent examines related components and data structures
