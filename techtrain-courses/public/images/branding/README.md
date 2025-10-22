# Branding Assets

This folder contains the core brand identity assets for TechTrain.

## Files

### Logo Files
- **logo.svg** - Main horizontal logo (icon + text) used in the header
  - Dimensions: 1792x576px (scalable SVG)
  - Used in: Header component (light backgrounds)
  - Path reference: `/images/branding/logo.svg`

- **logo-white.svg** - White variant for dark backgrounds
  - Dimensions: 200x40px (scalable SVG)
  - Used in: Footer component, dark theme sections
  - Path reference: `/images/branding/logo-white.svg`

- **favicon.svg** - Browser tab icon
  - Dimensions: 32x32px
  - Used in: Browser tabs, bookmarks
  - Path reference: `/images/branding/favicon.svg`
  - Features: TT monogram on blue background

### Usage Guidelines

**Header Logo:**
- Use the full horizontal logo (logo.svg) in the main navigation header
- Maintains consistent brand identity across all pages
- Automatically scales with responsive design
- Shrinks on scroll for better UX

**Footer Logo:**
- Use the white variant (logo-white.svg) for dark backgrounds
- Ensures visibility and brand consistency in footer sections

**Favicon:**
- Automatically loaded via app metadata
- Simple TT monogram for recognition at small sizes

**Color Specifications:**
- Primary Blue: #2563EB
- Deep Navy: #1E3A8A
- Light Blue: #93c5fd (accents in white variant)
- White: #FFFFFF

### Component Usage

The `Logo` component (`components/Logo.tsx`) handles all logo variants:
- Accepts `variant` prop: 'default' | 'white'
- Accepts `size` prop: 'sm' | 'md' | 'lg'
- Responsive and accessible
- Links to homepage automatically

### File Organization Benefits

This dedicated `branding/` folder:
- Keeps brand assets separate from content images
- Makes it easy to find and update logo files
- Provides clear organization for designers and developers
- Centralized location for all brand identity assets
- Supports future additions (social media graphics, email signatures, etc.)
