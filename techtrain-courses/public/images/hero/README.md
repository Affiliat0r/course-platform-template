# Hero Section Backgrounds

This directory contains large background images for hero sections across the site.

## 📋 Required Images

### Current Pages with Hero Sections:

1. **Homepage** → `homepage-hero.jpg`
   - Large hero with headline and search
   - Currently: gradient overlay with illustration

2. **Course Catalog** → `courses-hero.jpg`
   - Hero with search bar
   - Currently: Unsplash team photo with blue overlay

3. **Course Detail** → (uses course-specific image)
   - Individual course background
   - Currently: course category image with gradient

4. **About Page** → `about-hero.jpg`
   - Team/office background

5. **Contact Page** → `contact-hero.jpg`
   - Office or support imagery

## 🎨 Image Specifications

- **Format**: JPG or WebP (WebP preferred)
- **Dimensions**: 1920 x 600 pixels minimum (wider is better)
- **File size**: < 300KB (optimized, since these are large images)
- **Quality**: 80-85% JPG quality
- **Aspect ratio**: Wide (approximately 3:1 or wider)
- **Color space**: sRGB
- **Naming**: descriptive-hero.jpg

## 📐 Usage Context

Hero images are displayed full-width with overlays:

```tsx
<section
  className="relative bg-cover bg-center h-80 flex items-center"
  style={{
    backgroundImage: 'url(/images/hero/courses-hero.jpg)',
    backgroundBlendMode: 'overlay',
    backgroundColor: 'rgba(37, 99, 235, 0.7)', // Blue overlay
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70" />
  {/* Content here */}
</section>
```

### Display Characteristics:
- **Overlays**: Dark blue gradient (60-80% opacity)
- **Height**: 320px (20rem) on most pages
- **Text overlay**: White text will be placed on top
- **Responsive**: Full width at all screen sizes

## 🖼️ Content Guidelines

### Good Hero Images:
✅ **Wide landscape** orientation
✅ **Not too busy** - simple backgrounds work best with overlays
✅ **Medium-dark tones** - easier to overlay text
✅ **Professional** IT/tech workspace imagery
✅ **High quality** - sharp, well-exposed
✅ **Horizontal lines** - avoid strong diagonals

### Subject Matter by Page:
- **Homepage**: Modern office, collaboration, technology
- **Courses**: Team learning, classroom, laptops
- **About**: Team photo, office space, culture
- **Contact**: Office, support desk, friendly staff
- **Corporate**: Boardroom, professional meeting

### Avoid:
❌ Overly bright or high-contrast images
❌ Busy patterns that distract from text
❌ Vertical orientation or portrait photos
❌ Low resolution or pixelated images
❌ Images with prominent text already embedded

## 🔍 Where to Find Images

### Free Stock Photo Sites:
- [Unsplash](https://unsplash.com/) - Search: "office", "team", "technology"
- [Pexels](https://www.pexels.com/) - Search: "business meeting", "workspace"
- [Pixabay](https://pixabay.com/) - Good for tech backgrounds

### Recommended Searches:
- "modern office workspace"
- "team collaboration technology"
- "business meeting laptop"
- "IT professionals working"
- "tech company office"

### Current Setup:
Course catalog page uses:
```typescript
backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920)'
```

## 📏 Size Optimization

Since hero images are large and critical for LCP (Largest Contentful Paint):

1. **Resize** to exactly 1920px wide (or 2560px for retina displays)
2. **Compress** aggressively (80% quality is fine with gradient overlay)
3. **Use WebP** - 30-40% smaller than JPG
4. **Lazy load** - Not needed, these are above fold
5. **Preload** - Consider preloading critical hero images:

```html
<link rel="preload" as="image" href="/images/hero/homepage-hero.webp" />
```

## 🔄 Implementation

### Next.js Background Image:

**Option 1: Inline Style (Current)**
```tsx
<section
  style={{
    backgroundImage: 'url(/images/hero/courses-hero.jpg)',
  }}
>
```

**Option 2: Next.js Image with fill (Better)**
```tsx
<section className="relative h-80">
  <Image
    src="/images/hero/courses-hero.jpg"
    alt="Course catalog background"
    fill
    className="object-cover"
    priority // Above fold, load immediately
    quality={80}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90..." />
  {/* Content */}
</section>
```

### Tailwind Config (Optional):
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'hero-home': "url('/images/hero/homepage-hero.jpg')",
        'hero-courses': "url('/images/hero/courses-hero.jpg')",
      }
    }
  }
}

// Usage
<section className="bg-hero-courses">
```

## ✅ Checklist

- [ ] Find/download 5 hero background images
- [ ] Resize to 1920x600px (or larger)
- [ ] Optimize images (< 300KB each)
- [ ] Convert to WebP format
- [ ] Name descriptively (*-hero.jpg)
- [ ] Place in this directory
- [ ] Update page components to use local paths
- [ ] Test with gradient overlays
- [ ] Verify text readability
- [ ] Check mobile responsiveness
- [ ] Measure LCP performance

## 📁 Example Final Structure

```
hero/
├── README.md (this file)
├── homepage-hero.jpg (or .webp)
├── courses-hero.jpg
├── about-hero.jpg
├── contact-hero.jpg
└── corporate-hero.jpg
```

## 🎯 Performance Tips

### Critical Rendering Path:
1. Hero images load first (above fold)
2. Use `priority` prop on Next.js Image
3. Preload hero images in `<head>`
4. Optimize file size aggressively

### Responsive Images:
```tsx
<Image
  src="/images/hero/homepage-hero.jpg"
  alt="Homepage background"
  fill
  sizes="100vw" // Full viewport width
  quality={80}
  priority
/>
```

## 🚨 Important Notes

- **Copyright**: Use royalty-free or licensed images
- **Brand consistency**: Choose images that match your brand tone
- **Color consideration**: Images will have blue overlay - check compatibility
- **Text placement**: Leave space for headline text (usually left-aligned)
- **Accessibility**: Alt text should describe the scene, not "hero image"
- **Performance**: These images affect LCP - optimize heavily!
