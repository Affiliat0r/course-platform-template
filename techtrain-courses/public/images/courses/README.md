# Course Images

This directory contains images used for course cards and detail pages.

## 📋 Required Images

### By Category

You need one representative image for each course category:

1. **Programmeren & Development** → `programming.jpg`
2. **Data & Data Science** → `data-science.jpg`
3. **AI & Machine Learning** → `ai-ml.jpg`
4. **Cloud Computing** → `cloud.jpg`
5. **DevOps & Containers** → `devops.jpg`
6. **Databases** → `databases.jpg`
7. **Beveiliging** → `security.jpg`
8. **APIs & Scripting** → `apis.jpg`

### Optional: Course-Specific Images

For individual courses, use the course slug as filename:
- `react-development.jpg`
- `python-fundamentals.jpg`
- `docker-kubernetes.jpg`
- etc.

## 🎨 Image Specifications

- **Format**: JPG or WebP (WebP preferred for smaller file size)
- **Dimensions**: 1200 x 675 pixels (16:9 aspect ratio)
- **File size**: < 200KB (optimized)
- **Quality**: 85% JPG quality or equivalent
- **Color space**: sRGB
- **Naming**: kebab-case (lowercase, hyphens)

## 📐 Aspect Ratio Guidelines

Course cards display images at various sizes:
- **Desktop (Grid)**: 350-400px wide
- **Desktop (List)**: 200px wide
- **Mobile**: Full width (up to 600px)

The 16:9 aspect ratio (1200x675) ensures images look good at all sizes.

## 🖼️ Content Guidelines

### Good Course Images:
✅ Clear, high-quality professional photography or illustrations
✅ Relevant to the course topic (code, data, servers, etc.)
✅ Not too busy or cluttered
✅ Good contrast (text overlays will be added)
✅ Consistent style across all course images

### Avoid:
❌ Stock photos with watermarks
❌ Low resolution or blurry images
❌ Overly dark images (hard to add text overlays)
❌ Images with text already embedded
❌ Inconsistent styles (mixing photos and illustrations)

## 🔍 Where to Find Images

### Free Stock Photo Sites:
- [Unsplash](https://unsplash.com/) - Search: "programming", "data", "technology"
- [Pexels](https://www.pexels.com/) - Good for tech and workspace images
- [Pixabay](https://pixabay.com/) - Large library, completely free

### Tech-Specific:
- [unDraw](https://undraw.co/) - Tech illustrations (SVG)
- [Storyset](https://storyset.com/) - Animated illustrations (can export static)

### Current Setup:
Currently using Unsplash URLs from `lib/data.ts`. To migrate to local images, download the images from the URLs and place them here with appropriate names.

## 📥 Download Current Images

Run this to see the current Unsplash URLs:
```bash
grep "images.unsplash.com" lib/data.ts
```

Example URLs currently in use:
- Programming: `photo-1461749280684-dccba630e2f6`
- Data Science: `photo-1551288049-bebda4e38f71`
- AI/ML: `photo-1677442136019-21780ecad995`
- etc.

## 🔄 Migration Steps

1. **Download images** from current Unsplash URLs
2. **Rename** to category-based names (see "Required Images" above)
3. **Optimize** using Squoosh or TinyPNG
4. **Place here** in this directory
5. **Update** `lib/data.ts` to use local paths:

```typescript
// Before
const getImageForCategory = (category: string): string => {
  const imageMap: Record<string, string> = {
    'Programmeren & Development': 'https://images.unsplash.com/photo-...',
  };
};

// After
const getImageForCategory = (category: string): string => {
  const imageMap: Record<string, string> = {
    'Programmeren & Development': '/images/courses/programming.jpg',
  };
};
```

## 🎯 Testing

After adding images, test with:

```tsx
import Image from 'next/image';

<Image
  src="/images/courses/programming.jpg"
  alt="Programming course"
  width={1200}
  height={675}
  quality={85}
/>
```

## ✅ Checklist

- [ ] Download/create 8 category images
- [ ] Optimize all images (< 200KB each)
- [ ] Rename to match category names
- [ ] Test images display correctly
- [ ] Update `lib/data.ts` to use local paths
- [ ] Remove Unsplash dependency
- [ ] Verify Next.js Image optimization works
- [ ] Check mobile and desktop layouts

## 📁 Example Final Structure

```
courses/
├── README.md (this file)
├── programming.jpg
├── data-science.jpg
├── ai-ml.jpg
├── cloud.jpg
├── devops.jpg
├── databases.jpg
├── security.jpg
└── apis.jpg
```

## 🚨 Important Notes

- **Copyright**: Ensure you have the right to use all images
- **Consistency**: Keep a consistent style across all course images
- **Optimization**: Always optimize before adding to project
- **Accessibility**: Course titles will serve as alt text
- **Performance**: WebP format recommended for 30-40% smaller file sizes
