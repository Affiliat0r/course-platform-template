# Public Assets Directory

This directory contains all static assets served directly by Next.js.

## 📁 Directory Structure

```
public/
├── images/
│   ├── courses/       # Course card and detail page images
│   ├── instructors/   # Instructor profile photos
│   ├── hero/          # Hero section background images
│   └── misc/          # Other miscellaneous images
├── logos/             # Company and partner logos
└── icons/             # App icons and favicons
```

## 🎯 How to Use

### Referencing Images in Code

Images in `public/` are referenced from the root `/`:

```tsx
import Image from 'next/image';

// ✅ Correct
<Image src="/images/courses/react.jpg" alt="React course" width={800} height={450} />
<Image src="/logos/ing.svg" alt="ING" width={100} height={40} />

// ❌ Wrong - do not include "public" in the path
<Image src="/public/images/courses/react.jpg" ... />
```

### Using in CSS/Backgrounds

```tsx
// Inline styles
<div style={{ backgroundImage: 'url(/images/hero/homepage.jpg)' }} />

// Tailwind
<div className="bg-[url('/images/hero/homepage.jpg')]" />
```

## 📐 Image Specifications

### Course Images (`images/courses/`)
- **Format**: JPG or WebP
- **Dimensions**: 1200x675px (16:9 aspect ratio)
- **File size**: < 200KB (optimized)
- **Naming**: kebab-case (e.g., `react-development.jpg`)

### Instructor Photos (`images/instructors/`)
- **Format**: JPG or WebP
- **Dimensions**: 400x400px (square, 1:1)
- **File size**: < 100KB
- **Naming**: kebab-case (e.g., `jan-de-vries.jpg`)

### Hero Images (`images/hero/`)
- **Format**: JPG or WebP
- **Dimensions**: 1920x600px (minimum)
- **File size**: < 300KB
- **Naming**: descriptive (e.g., `courses-hero.jpg`)

### Logos (`logos/`)
- **Format**: SVG (preferred) or PNG with transparency
- **Dimensions**: Varies (maintain aspect ratio)
- **File size**: < 50KB
- **Naming**: company name (e.g., `ing.svg`)

### Icons (`icons/`)
- **Format**: PNG or ICO for favicons, SVG for UI icons
- **Dimensions**: Standard sizes (16x16, 32x32, 192x192, 512x512)
- **Naming**: descriptive (e.g., `favicon.ico`, `icon-192.png`)

## 🔧 Next.js Image Optimization

Next.js automatically optimizes images when using the `Image` component:
- Converts to modern formats (WebP, AVIF)
- Generates responsive sizes
- Lazy loads by default
- Prevents Cumulative Layout Shift (CLS)

### Example Usage

```tsx
import Image from 'next/image';

export function CourseCard({ course }) {
  return (
    <Image
      src={course.imageUrl}
      alt={course.title}
      width={800}
      height={450}
      quality={85}
      placeholder="blur"
      blurDataURL="/images/placeholder.jpg"
    />
  );
}
```

## 📦 Migration from External Images

If you're currently using external URLs (e.g., Unsplash), follow these steps:

1. **Download images** to appropriate subdirectories
2. **Rename files** following the naming conventions above
3. **Optimize images** (use tools like ImageOptim, Squoosh, or Sharp)
4. **Update code** to reference local paths:
   ```typescript
   // Before
   imageUrl: 'https://images.unsplash.com/photo-123...'

   // After
   imageUrl: '/images/courses/programming.jpg'
   ```

## 🚀 Best Practices

1. **Always optimize images** before adding them to the project
2. **Use descriptive file names** (improves SEO)
3. **Maintain consistent aspect ratios** for each category
4. **Test with Next.js Image component** for best performance
5. **Add alt text** for accessibility
6. **Use WebP format** when possible for better compression
7. **Keep file sizes small** to improve page load times

## 🔗 Useful Tools

- **Image Optimization**: [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/)
- **Format Conversion**: [CloudConvert](https://cloudconvert.com/)
- **Bulk Resize**: [Bulk Resize Photos](https://bulkresizephotos.com/)
- **SVG Optimization**: [SVGOMG](https://jakearchibald.github.io/svgomg/)

## 📝 Current Status

### ✅ Completed
- Directory structure created
- Company logos added (ASML, Coolblue, Exact, ING, KPN, Philips)

### 🔄 Pending
- Course category images (currently using Unsplash)
- Instructor photos (currently using Unsplash)
- Hero backgrounds (currently using Unsplash)
- Favicon and app icons

## 📖 Related Documentation

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Next.js Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving)
