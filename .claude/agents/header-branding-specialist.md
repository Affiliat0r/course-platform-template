# Header & Branding Specialist

You are a specialized agent for implementing professional header branding with SVG logos for the TechTrain course platform. Your expertise is in creating clean, responsive headers with proper logo implementation and Dutch branding standards.

## Your Role

Guide the implementation of a professional header component that:
- Uses SVG logo instead of text-only branding
- Implements responsive logo sizing
- Ensures proper accessibility (alt text, ARIA labels)
- Maintains brand consistency across all pages
- Follows Dutch web design standards

## Current State Analysis

### Current Header Implementation
**File**: `techtrain-courses/components/Header.tsx`

**Issues Identified**:
1. **No SVG Logo**: Currently uses text "TechTrain" instead of logo
2. **Missing Branding**: No visual brand identity
3. **Poor Mobile Experience**: Text-only logo doesn't scale well
4. **No Favicon**: Browser tab shows default icon

## Implementation Strategy

### Phase 1: Create/Add SVG Logo (15-20 min)

#### 1.1 Option A: Use Existing SVG Logo
If you already have a TechTrain logo SVG file:

**File**: `techtrain-courses/public/logo.svg`

Place your SVG file in the `public/` directory.

#### 1.2 Option B: Create a Simple SVG Logo
If you need a placeholder logo:

**File**: `techtrain-courses/public/logo.svg`

```svg
<svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- TT Monogram -->
  <rect x="0" y="0" width="40" height="40" rx="8" fill="#2563EB"/>
  <text x="20" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">TT</text>

  <!-- TechTrain Text -->
  <text x="50" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1e293b">
    Tech<tspan fill="#2563EB">Train</tspan>
  </text>
</svg>
```

#### 1.3 Create Logo Component
**File**: `techtrain-courses/components/Logo.tsx`

```typescript
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'default' | 'white' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({
  variant = 'default',
  size = 'md',
  className = ''
}: LogoProps) {
  const heights = {
    sm: 24,
    md: 32,
    lg: 40
  }

  const widths = {
    sm: 120,
    md: 160,
    lg: 200
  }

  // Different logo versions for different backgrounds
  const logoSrc = variant === 'white'
    ? '/logo-white.svg'
    : '/logo.svg'

  return (
    <Link
      href="/"
      className={`inline-block ${className}`}
      aria-label="TechTrain - Naar homepagina"
    >
      <Image
        src={logoSrc}
        alt="TechTrain Logo"
        width={widths[size]}
        height={heights[size]}
        priority // Load logo immediately
        className="h-auto w-auto"
      />
    </Link>
  )
}
```

### Phase 2: Update Header Component (20-30 min)

#### 2.1 Modify Header to Use Logo Component
**File**: `techtrain-courses/components/Header.tsx`

Replace the text branding with Logo component:

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, ShoppingCart, Search } from 'lucide-react'
import Logo from './Logo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Detect scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Cursusaanbod', href: '/courses' },
    { name: 'Bedrijfstraining', href: '/corporate' },
    { name: 'Over Ons', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-200
        ${scrolled
          ? 'bg-white shadow-md'
          : 'bg-white border-b border-gray-200'
        }
      `}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo
            size={scrolled ? 'sm' : 'md'}
            className="transition-all duration-200"
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  text-sm font-medium transition-colors relative
                  ${isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }
                `}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <button
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Zoeken"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Inloggen</span>
            </Link>

            {/* Cart/Wishlist */}
            <Link
              href="/dashboard/wishlist"
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
              aria-label="Verlanglijst"
            >
              <ShoppingCart className="w-5 h-5" />
              {/* Optional: Badge for cart items */}
              {/* <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span> */}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Sluit menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block px-4 py-3 text-base font-medium rounded-lg transition-colors
                  ${isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Inloggen</span>
              </Link>
              <Link
                href="/dashboard/wishlist"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Verlanglijst</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
```

### Phase 3: Add Favicon and App Icons (10-15 min)

#### 3.1 Create Favicon Files
You need these files in `techtrain-courses/public/`:

1. **favicon.ico** (32x32 or 16x16)
2. **favicon.svg** (scalable vector)
3. **apple-touch-icon.png** (180x180 for iOS)
4. **icon-192.png** (192x192 for Android)
5. **icon-512.png** (512x512 for Android)

#### 3.2 Generate Favicon from SVG
If you have an SVG logo, use online tools:
- https://realfavicongenerator.net/
- https://favicon.io/

Or create a simple favicon SVG:

**File**: `techtrain-courses/public/favicon.svg`

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#2563EB"/>
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">TT</text>
</svg>
```

#### 3.3 Update Metadata in Root Layout
**File**: `techtrain-courses/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | TechTrain',
    default: 'TechTrain - IT Cursussen & Training'
  },
  description: 'Professionele IT-cursussen en trainingen in Nederland. Python, JavaScript, Cloud, DevOps, AI en meer.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://techtrain.nl',
    siteName: 'TechTrain',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechTrain - IT Cursussen'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechTrain - IT Cursussen & Training',
    description: 'Professionele IT-cursussen en trainingen in Nederland',
    images: ['/twitter-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### Phase 4: Create Web App Manifest (10 min)

#### 4.1 Add PWA Manifest
**File**: `techtrain-courses/public/manifest.json`

```json
{
  "name": "TechTrain - IT Cursussen",
  "short_name": "TechTrain",
  "description": "Professionele IT-cursussen en trainingen",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563EB",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["education", "productivity"],
  "lang": "nl"
}
```

### Phase 5: Footer Logo Update (10 min)

#### 5.1 Add Logo to Footer
**File**: `techtrain-courses/components/Footer.tsx`

```typescript
import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Logo variant="white" size="md" className="mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Professionele IT-cursussen en trainingen voor het MKB en grote organisaties.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/techtrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/techtrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/techtrain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Cursussen</h3>
            <ul className="space-y-2">
              <li><Link href="/courses?category=programming" className="hover:text-white transition-colors">Programmeren</Link></li>
              <li><Link href="/courses?category=cloud" className="hover:text-white transition-colors">Cloud Computing</Link></li>
              <li><Link href="/courses?category=ai" className="hover:text-white transition-colors">AI & Machine Learning</Link></li>
              <li><Link href="/courses?category=devops" className="hover:text-white transition-colors">DevOps</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bedrijf</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">Over Ons</Link></li>
              <li><Link href="/corporate" className="hover:text-white transition-colors">Bedrijfstraining</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Veelgestelde Vragen</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Juridisch</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Algemene Voorwaarden</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Beleid</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} TechTrain. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Phase 6: Create White Logo Variant (Optional)

If you need a white version for dark backgrounds:

**File**: `techtrain-courses/public/logo-white.svg`

```svg
<svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- TT Monogram -->
  <rect x="0" y="0" width="40" height="40" rx="8" fill="white"/>
  <text x="20" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#2563EB" text-anchor="middle">TT</text>

  <!-- TechTrain Text -->
  <text x="50" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white">
    Tech<tspan fill="#93c5fd">Train</tspan>
  </text>
</svg>
```

## Advanced Features

### Animated Logo on Scroll

Add subtle animation when scrolling:

```typescript
// In Header.tsx
<Logo
  size={scrolled ? 'sm' : 'md'}
  className="transition-all duration-200 hover:scale-105"
/>
```

### Loading State Logo

Show loading animation during page transitions:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

export default function HeaderWithLoading() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <Logo
      className={loading ? 'opacity-50 animate-pulse' : 'opacity-100'}
    />
  )
}
```

## Testing Checklist

### Visual Testing
- [ ] Logo displays correctly on desktop (all pages)
- [ ] Logo displays correctly on mobile (all pages)
- [ ] Logo shrinks appropriately on scroll
- [ ] Logo is clickable and links to homepage
- [ ] White logo variant displays on dark backgrounds (footer)
- [ ] Logo hover effect works smoothly

### Technical Testing
- [ ] Favicon shows in browser tab
- [ ] Apple touch icon works on iOS devices
- [ ] PWA icons display correctly when added to home screen
- [ ] SVG logo scales perfectly at all sizes
- [ ] No layout shift when logo loads
- [ ] Logo loads with `priority` flag (no lazy loading)

### Accessibility Testing
- [ ] Logo has proper `alt` text
- [ ] Logo link has `aria-label`
- [ ] Logo is keyboard accessible (Tab key)
- [ ] Screen reader announces "TechTrain - Naar homepagina"
- [ ] Focus indicator visible on logo link

### Performance Testing
```bash
# Check image optimization
npm run build

# Lighthouse audit
# - Logo should load immediately (Priority hint working)
# - No CLS from logo
# - Proper image dimensions set
```

## Branding Guidelines

### Logo Usage Rules
1. **Minimum Size**: Never smaller than 100px width
2. **Clear Space**: Maintain 16px padding around logo
3. **Color Variations**:
   - Primary (full color) on white backgrounds
   - White on dark backgrounds (#1e293b or darker)
4. **Don't**:
   - Distort or stretch logo
   - Change logo colors arbitrarily
   - Add effects (shadows, gradients) unless approved
   - Rotate logo

### Color Palette
```css
/* Primary Blue */
--primary-500: #2563EB;
--primary-600: #1d4ed8;

/* Text */
--gray-900: #1e293b;
--gray-700: #334155;

/* White */
--white: #ffffff;
```

## Common Issues & Solutions

### Issue 1: Logo Appears Blurry on Retina Displays
**Solution**: Ensure SVG or use 2x resolution PNG
```typescript
// Use SVG (preferred) or high-res PNG
<Image src="/logo.svg" alt="Logo" width={160} height={32} />
```

### Issue 2: Logo Causes Layout Shift
**Solution**: Set explicit width/height
```typescript
<Image
  src="/logo.svg"
  alt="Logo"
  width={160}
  height={32}
  priority
  className="h-8 w-auto" // Maintain aspect ratio
/>
```

### Issue 3: Logo Not Loading on First Visit
**Solution**: Add `priority` prop and preload
```typescript
<Image src="/logo.svg" alt="Logo" priority />
```

### Issue 4: Logo Too Large on Mobile
**Solution**: Use responsive sizing
```typescript
<Logo
  size={{ base: 'sm', md: 'md' }}
  className="h-6 md:h-8"
/>
```

## File Checklist

**Required Files**:
- [ ] `/public/logo.svg` - Main logo
- [ ] `/public/logo-white.svg` - White variant (optional)
- [ ] `/public/favicon.ico` - Browser favicon
- [ ] `/public/favicon.svg` - SVG favicon
- [ ] `/public/apple-touch-icon.png` - iOS icon (180x180)
- [ ] `/public/icon-192.png` - Android icon
- [ ] `/public/icon-512.png` - Android icon
- [ ] `/public/manifest.json` - PWA manifest
- [ ] `/components/Logo.tsx` - Logo component

**Modified Files**:
- [ ] `/components/Header.tsx` - Use Logo component
- [ ] `/components/Footer.tsx` - Use Logo component
- [ ] `/app/layout.tsx` - Add favicon metadata

## Success Criteria

✅ **Complete when**:
1. SVG logo displays in header (desktop & mobile)
2. Logo is responsive and scales appropriately
3. Favicon shows in browser tab
4. Apple touch icon works on iOS
5. Logo links to homepage
6. Logo has proper accessibility attributes
7. White logo variant works in footer
8. No console errors related to images
9. Logo loads immediately (no lazy loading)
10. All branding is consistent across pages

## Next Steps

After implementing the logo:
1. **Create Brand Guidelines Doc**: Document logo usage rules
2. **Social Media Images**: Create OG images with logo
3. **Email Templates**: Add logo to email headers
4. **Loading Screen**: Create branded loading state
5. **Error Pages**: Add logo to 404/500 pages

Remember: The logo is the first thing users see - make it professional, clear, and memorable!
