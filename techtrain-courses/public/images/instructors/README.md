# Instructor Photos

This directory contains profile photos for course instructors.

## 👤 Current Instructors

According to `lib/data.ts`, you have these instructors:

1. **Jan de Vries** → `jan-de-vries.jpg`
2. **Lisa Bakker** → `lisa-bakker.jpg`
3. **Mohammed El Amrani** → `mohammed-el-amrani.jpg`
4. **Sophie Chen** → `sophie-chen.jpg`
5. **David van Dam** → `david-van-dam.jpg`
6. **Ayşe Yılmaz** → `ayse-yilmaz.jpg`
7. **Raj Patel** → `raj-patel.jpg`
8. **Emma Jansen** → `emma-jansen.jpg`

## 🎨 Photo Specifications

- **Format**: JPG or WebP
- **Dimensions**: 400 x 400 pixels (square, 1:1 aspect ratio)
- **File size**: < 100KB per photo
- **Quality**: 85% JPG quality
- **Background**: Clean, professional (solid color or blurred)
- **Naming**: kebab-case matching instructor name

## 📸 Photography Guidelines

### Professional Standards:
✅ **Headshot style** - shoulders up, facing camera
✅ **Neutral background** - solid color or subtly blurred
✅ **Good lighting** - front-lit, no harsh shadows
✅ **Friendly expression** - approachable, professional
✅ **High resolution** - sharp, clear image
✅ **Consistent style** - all photos similar quality/style

### Avoid:
❌ Casual vacation photos
❌ Group photos (crop to individual)
❌ Low resolution or blurry images
❌ Busy backgrounds that distract
❌ Extreme poses or expressions
❌ Heavily filtered or edited photos

## 🔍 Where to Find Photos

### Stock Photo Options:
Since these are fictional instructors, you can use:

1. **Unsplash** - [Search: "professional headshot"](https://unsplash.com/s/photos/professional-headshot)
2. **Pexels** - [Search: "business portrait"](https://www.pexels.com/search/business%20portrait/)
3. **Generated Faces** - [This Person Does Not Exist](https://thispersondoesnotexist.com/) (AI-generated)
4. **UI Faces** - [UI Faces](https://uifaces.co/) (free avatars)

### Current Setup:
Currently using Unsplash URLs from `lib/data.ts`:

```typescript
const instructorPool = [
  {
    name: 'Jan de Vries',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'
  },
  {
    name: 'Lisa Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
  },
  // ... etc
];
```

## 📐 Display Sizes

Instructor photos appear at various sizes:
- **Course cards**: 48px circle
- **Course detail hero**: 48px circle
- **About page** (future): 200px circle
- **Profile modal** (future): 400px

All use CSS `border-radius: 50%` to create circular display.

## 🔄 Migration Steps

1. **Download** current Unsplash images or find new professional headshots
2. **Crop/resize** to 400x400px square
3. **Optimize** using image compression tools
4. **Rename** to match instructor names (kebab-case)
5. **Place here** in this directory
6. **Update** `lib/data.ts`:

```typescript
const instructorPool = [
  {
    name: 'Jan de Vries',
    bio: 'Senior IT trainer met 15+ jaar ervaring...',
    imageUrl: '/images/instructors/jan-de-vries.jpg'  // Updated
  },
  // ... etc
];
```

## 🎯 Testing

Test photos display correctly:

```tsx
import Image from 'next/image';

<div className="relative w-12 h-12 rounded-full overflow-hidden">
  <Image
    src="/images/instructors/jan-de-vries.jpg"
    alt="Jan de Vries"
    fill
    className="object-cover"
  />
</div>
```

## 💡 Tips

### Consistency Tips:
- Use similar background colors across all photos
- Ensure similar lighting/exposure
- Crop all to same framing (shoulders up)
- Keep facial expressions professional but friendly

### Diversity Considerations:
- Reflect diverse backgrounds (already done in names)
- Mix of ages, genders, ethnicities
- Professional attire appropriate for IT industry

### File Naming:
```
✅ jan-de-vries.jpg
✅ lisa-bakker.jpg
✅ mohammed-el-amrani.jpg
✅ sophie-chen.jpg

❌ Jan De Vries.jpg (capitalized)
❌ jan_de_vries.jpg (underscores)
❌ instructor-1.jpg (not descriptive)
```

## ✅ Checklist

- [ ] Find/create 8 professional headshot photos
- [ ] Crop to 400x400px square
- [ ] Optimize all photos (< 100KB each)
- [ ] Rename to match instructor names
- [ ] Ensure consistent style/quality
- [ ] Place in this directory
- [ ] Update `lib/data.ts` to use local paths
- [ ] Test circular display on course cards
- [ ] Test on course detail pages
- [ ] Verify Next.js Image optimization

## 📁 Example Final Structure

```
instructors/
├── README.md (this file)
├── jan-de-vries.jpg
├── lisa-bakker.jpg
├── mohammed-el-amrani.jpg
├── sophie-chen.jpg
├── david-van-dam.jpg
├── ayse-yilmaz.jpg
├── raj-patel.jpg
└── emma-jansen.jpg
```

## 🚨 Important Notes

- **Copyright**: Use royalty-free or properly licensed images
- **Privacy**: These are fictional instructors, so stock photos are appropriate
- **Accessibility**: Always include alt text with instructor name
- **Format**: WebP recommended for smaller file sizes (Next.js will convert)
- **Circular Display**: Images will be cropped to circles, so center faces appropriately
