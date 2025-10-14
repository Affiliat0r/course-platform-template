# Plan Course Website

Convert a course idea into a structured, implementable specification using the Course Architect agent, with optional competitive research.

## Instructions

This command transforms your course idea into a complete technical specification, optionally enhanced with market research.

### Workflow Options

1. **Quick Planning (No Research)**
   - Direct to Course Architect agent
   - Based on AI knowledge and best practices
   - Faster but less market-informed

2. **Enhanced Planning (With Research)** 🔬
   - First invokes Competitive Research agent
   - Uses MCP Playwright to analyze competitors
   - Gathers real market data (pricing, features, UI)
   - Then Course Architect uses research to create specification

### Step-by-Step Process

1. **Ask the user:**
   - Describe their course idea
   - "Do you want competitive research? (yes/no)"
   - If yes: "Which platforms to research?" (or use defaults)

2. **If Research Requested:**
   - Invoke Competitive Research agent
   - Agent uses MCP Playwright to:
     * Visit competitor sites (Udemy, Coursera, etc.)
     * Take screenshots
     * Extract pricing data
     * Analyze features and course structures
   - Creates research report with screenshots

3. **Invoke Course Architect agent** with:
   - Original course idea
   - Research findings (if available)
   - Agent produces specification including:
     * Course overview and learning outcomes
     * Content structure (modules and lessons)
     * Database schema for course data
     * Required API endpoints
     * Page structure and user flows
     * Feature prioritization (MVP vs future)
     * **Competitive positioning** (if research done)
     * **Differentiation strategy** (if research done)

4. **Once complete, ask if user wants to:**
   - View research screenshots (if taken)
   - Proceed with TDD planning (write tests first)
   - Start implementation
   - Modify the specification

## Example Usage

**User input:**
> I want to sell a TypeScript course with 5 modules covering basics to advanced topics. It should have video lessons and code exercises.

**Agent output:**
A detailed specification document covering all technical requirements.

## What to Provide

Give the agent as much detail as possible:
- **Topic** - What is the course about?
- **Target audience** - Who is this for? (beginners, intermediate, advanced)
- **Content type** - Videos, text, interactive exercises, projects?
- **Course structure** - How many modules? Rough lesson count?
- **Pricing model** - One-time purchase, subscription, tiered pricing?
- **Special features** - Certificates, live sessions, community access?

## After Planning

Once you have the specification, use these commands:
- `/tdd-cycle` - Start test-driven development for features
- `/new-course` - Set up the course structure in the codebase
