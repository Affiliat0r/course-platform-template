# Miscellaneous Images

This directory contains other images used throughout the site that don't fit into specific categories.

## 📋 Common Miscellaneous Images

### Icons & Meta
- `favicon.ico` - Browser tab icon (16x16, 32x32)
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `og-image.jpg` - Open Graph image for social sharing (1200x630)
- `twitter-card.jpg` - Twitter card image (1200x675)

### UI Elements
- `placeholder.jpg` - Placeholder for missing course images
- `avatar-default.jpg` - Default avatar for users without photos
- `logo-dark.svg` - Company logo (dark version)
- `logo-light.svg` - Company logo (light version)
- `logo-icon.svg` - Company logo icon only (for mobile)

### Marketing
- `certificate-template.jpg` - Certificate preview
- `guarantee-badge.svg` - Money-back guarantee badge
- `payment-methods.svg` - Payment method icons
- `trust-badges.svg` - Trust/security badges

### Empty States
- `empty-cart.svg` - Empty shopping cart illustration
- `empty-wishlist.svg` - Empty wishlist illustration
- `no-results.svg` - No search results illustration
- `404.svg` - 404 error page illustration

## 🎨 Specifications by Type

### Favicons
- **Format**: ICO (multi-resolution) or PNG
- **Sizes**: 16x16, 32x32 (in one .ico file)
- **Transparency**: Yes
- **Color**: Brand colors

### App Icons (PWA)
- **Format**: PNG
- **Sizes**: 192x192, 512x512
- **Transparency**: No (solid background)
- **Safe area**: 10% padding from edges

### Social Media Images
**Open Graph (Facebook, LinkedIn)**
- **Dimensions**: 1200 x 630 pixels
- **Format**: JPG or PNG
- **File size**: < 200KB
- **Aspect ratio**: 1.91:1
- **Safe area**: Keep text within 1200x520 (avoid edge crop)

**Twitter Card**
- **Dimensions**: 1200 x 675 pixels (16:9)
- **Format**: JPG or PNG
- **File size**: < 200KB

### Placeholders
- **Dimensions**: Match expected content (e.g., 1200x675 for courses)
- **Format**: SVG (scalable) or JPG
- **Content**: Neutral design, low saturation

### Logos
- **Format**: SVG (preferred) for crisp scaling
- **Fallback**: PNG with transparency
- **Variants**: Light (for dark backgrounds), Dark (for light backgrounds)
- **Sizes**: Scalable, but test at 120px-200px width

## 📁 Recommended Structure

```
misc/
├── README.md (this file)
├── favicon.ico
├── apple-touch-icon.png
├── og-image.jpg
├── twitter-card.jpg
├── placeholder.jpg
├── avatar-default.jpg
├── logo-dark.svg
├── logo-light.svg
├── logo-icon.svg
├── certificate-template.jpg
├── guarantee-badge.svg
├── payment-methods.svg
├── trust-badges.svg
├── empty-cart.svg
├── empty-wishlist.svg
├── no-results.svg
└── 404.svg
```

## 🔧 Implementation Examples

### Favicon in layout.tsx
```tsx
export const metadata: Metadata = {
  title: 'TechTrain Courses',
  icons: {
    icon: '/images/misc/favicon.ico',
    apple: '/images/misc/apple-touch-icon.png',
  },
}
```

### Open Graph Tags
```tsx
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/images/misc/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechTrain - IT Training Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/misc/twitter-card.jpg'],
  },
}
```

### Placeholder Image
```tsx
import Image from 'next/image';

<Image
  src={course.imageUrl || '/images/misc/placeholder.jpg'}
  alt={course.title}
  width={800}
  height={450}
  placeholder="blur"
  blurDataURL="/images/misc/placeholder.jpg"
/>
```

### Empty State
```tsx
function EmptyWishlist() {
  return (
    <div className="text-center p-12">
      <Image
        src="/images/misc/empty-wishlist.svg"
        alt="Empty wishlist"
        width={200}
        height={200}
      />
      <h3>Je verlanglijst is leeg</h3>
      <p>Voeg cursussen toe aan je verlanglijst</p>
    </div>
  );
}
```

## 🎯 Priority Items

### Must Have:
1. ✅ **favicon.ico** - Basic browser icon
2. ✅ **og-image.jpg** - Social sharing preview
3. ✅ **placeholder.jpg** - Fallback for missing images

### Nice to Have:
4. **logo-dark.svg** & **logo-light.svg** - Brand identity
5. **empty-*.svg** - Better empty state UX
6. **apple-touch-icon.png** - iOS home screen
7. **trust-badges.svg** - Build credibility

### Future:
8. **certificate-template.jpg** - Show certificate preview
9. **payment-methods.svg** - Payment options
10. **404.svg** - Custom error page

## 🔍 Where to Find Resources

### Icons & Illustrations:
- [Heroicons](https://heroicons.com/) - UI icons (free)
- [unDraw](https://undraw.co/) - Empty state illustrations (free, SVG)
- [Storyset](https://storyset.com/) - Animated illustrations (free)
- [SVG Repo](https://www.svgrepo.com/) - SVG icons and graphics

### Favicon Generators:
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Generate all sizes
- [Favicon.io](https://favicon.io/) - Simple favicon creator

### OG Image Tools:
- [Open Graph Image Generator](https://www.opengraph.xyz/)
- [Social Sizes](https://socialsizes.io/) - Dimension reference

## ✅ Quick Start Checklist

- [ ] Create/generate favicon.ico
- [ ] Create Open Graph image (1200x630)
- [ ] Create placeholder image
- [ ] Add logos (light and dark versions)
- [ ] Update metadata in app/layout.tsx
- [ ] Test social sharing previews
- [ ] Add empty state illustrations
- [ ] Create 404 illustration
- [ ] Test all images display correctly

## 🎨 Design Tips

### Open Graph Images:
- Include site logo
- Add clear value proposition text
- Use brand colors
- Keep text large and readable
- Test on Facebook, LinkedIn, Twitter

### Placeholders:
- Low contrast, neutral colors
- Simple geometric patterns or shapes
- "Image coming soon" optional text
- Match aspect ratio of actual images

### Empty States:
- Friendly, not discouraging
- Clear call-to-action
- Subtle colors, not too bright
- Consistent illustration style

## 🚨 Important Notes

- **Favicon formats**: Modern browsers support PNG, but ICO ensures widest compatibility
- **Social images**: Always test before launch - use Facebook Debugger, Twitter Card Validator
- **Placeholder**: Should never be visible to real users (temporary during development)
- **Logos**: SVG ensures crisp display at any size
- **Accessibility**: Empty state illustrations should have meaningful alt text
- **File size**: Keep social images < 200KB for faster sharing
