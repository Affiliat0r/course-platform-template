# Company & Partner Logos

This directory contains logos for companies and partners featured on the site.

## 📋 Current Logos

✅ **Already included:**
1. `asml.svg` - ASML (semiconductor equipment)
2. `coolblue.svg` - Coolblue (e-commerce)
3. `exact.svg` - Exact (business software)
4. `ing.svg` - ING (banking)
5. `kpn.svg` - KPN (telecommunications)
6. `philips.svg` - Philips (technology)

## 🎨 Logo Specifications

- **Format**: SVG (preferred) or PNG with transparency
- **Color**: Original brand colors or monochrome versions
- **Background**: Transparent
- **Size**: Scalable (SVG) or at least 300px width (PNG)
- **File size**: < 50KB
- **Naming**: company-name.svg (lowercase, kebab-case)

## 📐 Usage Context

### Where Logos Appear:

1. **Homepage "Vertrouwd door" Section**
   - Gray scale or low opacity
   - Display size: 100-120px width
   - Horizontal row layout

2. **Corporate Training Page**
   - Full color
   - Display size: 120-150px width
   - Grid layout with company names

3. **Course Detail Page** (Optional)
   - Show which companies use this course
   - Small icons (60-80px)

4. **Footer** (Optional)
   - Partner section
   - Gray scale

## 🎯 Logo Variants

### Recommended Variants per Logo:
- **full-color** - Original brand colors (default)
- **monochrome** - Single color (gray or black)
- **white** - For dark backgrounds

Example naming:
```
ing.svg           (full color)
ing-mono.svg      (monochrome)
ing-white.svg     (white version)
```

## 🔧 Implementation

### Current Usage (Homepage):
```tsx
<div className="flex items-center justify-center gap-8">
  <Image
    src="/logos/ing.svg"
    alt="ING"
    width={100}
    height={40}
    className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
  />
  {/* More logos... */}
</div>
```

### Best Practice (Next.js Image):
```tsx
import Image from 'next/image';

const companies = [
  { name: 'ING', logo: '/logos/ing.svg' },
  { name: 'KPN', logo: '/logos/kpn.svg' },
  // ...
];

<div className="grid grid-cols-3 md:grid-cols-6 gap-8">
  {companies.map((company) => (
    <div key={company.name} className="flex items-center justify-center">
      <Image
        src={company.logo}
        alt={company.name}
        width={120}
        height={48}
        className="opacity-70 hover:opacity-100 transition-opacity"
      />
    </div>
  ))}
</div>
```

## 📥 Adding New Logos

### Steps to Add a Logo:

1. **Obtain Logo**
   - Official brand assets from company website
   - Or use [Brandfetch](https://brandfetch.com/)
   - Or [Clearbit Logo API](https://clearbit.com/logo)

2. **Prepare SVG**
   - Remove unnecessary elements
   - Optimize with [SVGOMG](https://jakearchibald.github.io/svgomg/)
   - Ensure transparent background
   - Set viewBox for proper scaling

3. **Name File**
   - Use company name (lowercase, kebab-case)
   - Example: `rabobank.svg`, `abn-amro.svg`

4. **Add to Directory**
   - Place in `public/logos/`

5. **Update Code**
   - Add to company list in component
   - Include alt text (company name)

## 🎨 Design Guidelines

### Color Treatment:
For "Vertrouwd door" (Trusted by) sections:
```css
/* Subtle, not competing with content */
.company-logo {
  opacity: 0.6;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.company-logo:hover {
  opacity: 1;
  filter: grayscale(0%);
}
```

### Sizing:
- **Small**: 60-80px (footer, course detail)
- **Medium**: 100-120px (homepage, about page)
- **Large**: 150-180px (corporate page, case studies)

### Spacing:
- Minimum 40px between logos (mobile)
- 60-80px between logos (desktop)
- Equal vertical alignment (use flexbox)

## 🏢 Logo Categories

### Current Companies (Dutch Market):
- **Finance**: ING, Rabobank, ABN AMRO
- **Tech**: ASML, Philips, TomTom
- **Telecom**: KPN, Vodafone, T-Mobile
- **Retail**: Coolblue, Bol.com, Albert Heijn
- **Software**: Exact, Adyen, Booking.com
- **Energy**: Shell, Eneco, Vattenfall

### Suggested Additions:
- Gemeente Amsterdam
- NS (Nederlandse Spoorwegen)
- Schiphol
- Heineken
- Unilever

## ✅ Checklist for New Logos

- [ ] Logo obtained from official source
- [ ] SVG format (or high-res PNG with transparency)
- [ ] Optimized file size (< 50KB)
- [ ] Named correctly (kebab-case)
- [ ] Transparent background
- [ ] Proper viewBox set (for SVG)
- [ ] Tested at multiple sizes
- [ ] Added to company list in code
- [ ] Alt text included

## 📁 Example Structure

```
logos/
├── README.md (this file)
├── asml.svg ✅
├── coolblue.svg ✅
├── exact.svg ✅
├── ing.svg ✅
├── kpn.svg ✅
├── philips.svg ✅
├── rabobank.svg (suggested)
├── abn-amro.svg (suggested)
├── booking-com.svg (suggested)
├── adyen.svg (suggested)
└── tomtom.svg (suggested)
```

## 🔍 Where to Find Logos

### Official Sources (Best):
1. Company website - usually in "Press" or "Brand" section
2. Company media kits
3. Direct contact with marketing department

### Logo Databases (Alternative):
1. [Brandfetch](https://brandfetch.com/) - API and downloads
2. [Clearbit Logo](https://clearbit.com/logo) - `logo.clearbit.com/ing.com`
3. [Wikimedia Commons](https://commons.wikimedia.org/) - Many company logos
4. [Brands of the World](https://www.brandsoftheworld.com/) - Vector logos

### SVG Optimization:
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Clean and optimize SVG
- [SVG Cleaner](https://github.com/RazrFalcon/svgcleaner) - CLI tool

## 🚨 Important Legal Notes

- **Copyright**: Logos are trademarked - use only with permission or under fair use
- **Usage Rights**: For "Vertrouwd door" sections, verify you have permission
- **Accuracy**: Ensure logos are current (companies rebrand)
- **Representation**: Don't imply endorsement unless you have explicit permission
- **Alternative**: Use company names as text if uncertain about logo rights

## 💡 Best Practices

### Performance:
- Use SVG when possible (smallest file size, crisp at any size)
- Lazy load logos below the fold
- Consider CSS sprites for multiple PNG logos

### Accessibility:
```tsx
<Image
  src="/logos/ing.svg"
  alt="ING Bank - Training Partner"  // Descriptive, not just "ING"
  width={120}
  height={48}
/>
```

### SEO:
- Include company names in alt text
- Consider structured data (Organization schema)
- Link logos to case studies or testimonials (if applicable)

## 🎯 Current Implementation

Check homepage for current logo implementation:
- Location: `app/page.tsx`
- Search for: "Vertrouwd door" or company logos section
- Update imports to use logos from this directory
