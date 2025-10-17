# TechTrain Course Platform - Comprehensive UI/UX & Logic Analysis Report

**Analysis Date:** October 16, 2025
**Platform Version:** MVP (Next.js 14)
**Analyst:** Claude Code UX Analyzer Agent

---

## Executive Summary

This report provides a thorough analysis of the TechTrain courses platform's user interface, user experience, application logic, and technical implementation. The platform demonstrates a solid technical foundation but has significant opportunities for improvement across usability, functionality, performance, accessibility, and user experience.

### Key Findings

- **Course Catalog:** 82 IT courses with robust data structure
- **Technical Foundation:** Next.js 14, TypeScript, Tailwind CSS, React Hook Form + Zod
- **Pages Implemented:** 22 pages across the application
- **Language:** Dutch-only (correctly implemented)
- **Overall UX Score:** 6.5/10 - Functional MVP with substantial room for enhancement

### Critical Statistics

- **15 Critical Issues** blocking core functionality
- **18 High-Priority Issues** degrading user experience
- **25+ Medium-Priority** polish opportunities
- **12 Accessibility Violations** (WCAG 2.1 compliance)

### Most Urgent Issues

1. ❌ Homepage category links broken (EN/NL name mismatch)
2. ❌ All 82 courses have identical generic descriptions and syllabi
3. ❌ Search bars non-functional across the site
4. ❌ No VAT calculation (Dutch legal requirement)
5. ❌ Admin dashboard has no authentication (security risk)
6. ❌ No payment processing implementation

---

## 1. Detailed UI/UX Analysis

### 1.1 Homepage Analysis

**File:** `app/page.tsx`

#### Strengths ✅

- Strong hero section with clear value proposition
- Featured courses prominently displayed
- "How it Works" section provides clear user journey
- Good visual hierarchy with gradient backgrounds
- Responsive grid layouts (1/2/4 columns)

#### Critical Issues ❌

| Issue | Location | Impact | Severity |
|-------|----------|--------|----------|
| Non-functional search bar | Lines 44-48 | Users expect search to navigate or filter | Critical |
| Hardcoded category counts | Lines 9-14 | Shows "15, 12, 10..." but doesn't match real data | High |
| Category link mismatch | Line 81 | Uses English names but courses use Dutch categories | Critical |
| Fixed hero height (600px) | Line 23 | Creates awkward spacing on mobile devices | Medium |
| Only 4 featured courses | Line 17 | Could show all 6 available courses | Low |

**Usability Friction Points:**

1. **Search Button Does Nothing:** Users click the search icon button expecting action, but nothing happens.
   - **Expected:** Navigate to `/courses?search={query}` or instant search results
   - **Actual:** Button is purely decorative

2. **"Ontdek Cursussen" Appears Twice:** Button appears in both hero and after search bar
   - Creates visual clutter and redundancy
   - Both link to same destination

3. **Category Name Mismatch Prevents Filtering:**
   ```typescript
   // Current (BROKEN):
   { name: 'Programming', icon: Code, count: 15 }
   // Links to: /courses?category=Programming

   // Actual categories in data:
   'Programmeren & Development', 'Data & Data Science', etc.

   // Result: Filter returns 0 courses
   ```

#### Recommendations

**Quick Fix (15 minutes):**
```typescript
// Import real categories
import { categories, courses } from '@/lib/data';

// Calculate real counts
const categoryIcons = {
  'Programmeren & Development': Code,
  'Data & Data Science': Database,
  'Cloud Computing': Cloud,
  'AI & Machine Learning': Cpu,
  'DevOps & Containers': Container,
};

const categoriesWithCounts = categories.map(cat => ({
  name: cat,
  icon: categoryIcons[cat] || Code,
  count: courses.filter(c => c.category === cat).length
}));
```

**Search Functionality (30 minutes):**
```typescript
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const [searchQuery, setSearchQuery] = useState('');
const router = useRouter();

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
  }
};
```

---

### 1.2 Course Catalog Analysis

**File:** `app/courses/page.tsx`

#### Strengths ✅

- Clean sidebar filter design with logical grouping
- Real-time filtering using `useMemo` optimization
- Good empty state with clear CTA ("Filters Wissen")
- Responsive grid layout (1/2/3 columns)
- Filter count displayed ("X cursussen gevonden")

#### Critical Issues ❌

| Issue | Location | Impact | Severity |
|-------|----------|--------|----------|
| Search button non-functional | Lines 73-75 | Wastes UI space, confuses users | High |
| Single-format limitation | Lines 127-150 | UI shows checkboxes but only allows ONE selection | Critical |
| Reset button mislabeled | Lines 78-90 | Says "Ontdek Cursussen" instead of "Reset Filters" | Medium |
| Sticky positioning broken | Line 99 | `top-20` but header is 64px (16rem needed) | Medium |
| No sort options | N/A | Can't sort by price, rating, date, popularity | High |
| No price range filter | N/A | Users can't filter by budget | High |
| No pagination | N/A | All 82 courses load at once | High |

#### Detailed Issue Analysis

**1. Format Filter Confusion:**
```typescript
// Current implementation (MISLEADING):
<input
  type="checkbox"  // ❌ Suggests multi-select
  checked={selectedFormat === format.value}
  onChange={() =>
    setSelectedFormat(selectedFormat === format.value ? '' : format.value)
  }
/>

// Should be:
<input
  type="radio"  // ✅ Correct for single-select
  name="format"
  checked={selectedFormat === format.value}
  onChange={() => setSelectedFormat(format.value)}
/>
```

**2. Missing Sort Functionality:**

Users cannot sort results by:
- Price (low to high / high to low)
- Rating (best rated first)
- Title (alphabetical)
- Date added (newest first)
- Popularity (most enrolled)

**Recommendation (3 hours):**
```typescript
type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'title' | 'newest';
const [sortBy, setSortBy] = useState<SortOption>('title');

const sortedCourses = useMemo(() => {
  const sorted = [...filteredCourses];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'nl'));
    default:
      return sorted;
  }
}, [filteredCourses, sortBy]);
```

**3. Price Range Filter Missing:**

Current price range: €550 - €3,595

**Recommendation (2 hours):**
```typescript
const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);

const matchesPrice =
  course.price >= priceRange[0] && course.price <= priceRange[1];

// UI with range slider
<div className="mb-6">
  <label className="block text-sm font-medium mb-2">
    Prijsbereik: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
  </label>
  <input
    type="range"
    min="0"
    max="4000"
    step="100"
    value={priceRange[1]}
    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
  />
</div>
```

#### Mobile UX Issues

1. **Sidebar appears before courses:** On mobile, users must scroll past all filters to see courses
   - **Fix:** Implement collapsible filter drawer/modal for mobile

2. **Hero search duplicates catalog search:** Confusing to have two search bars
   - **Fix:** Remove hero search on catalog page

3. **Filters take excessive vertical space:**
   - Categories: 8 radio buttons
   - Formats: 5 checkboxes
   - Languages: 3 radio buttons
   - **Total:** ~800px vertical space on mobile

---

### 1.3 Course Detail Page Analysis

**File:** `app/courses/[slug]/page.tsx`

#### Strengths ✅

- Comprehensive course information architecture
- Good content hierarchy (overview → objectives → syllabus → prerequisites)
- Instructor bio with photo adds credibility
- Related courses section increases discoverability
- Proper use of Server Components for performance

#### Critical Issues ❌

| Issue | Location | Impact | Severity |
|-------|----------|--------|----------|
| Wrong CTA button | Line 38 | Says "Ontdek Cursussen" instead of "Nu Inschrijven" | High |
| Generic descriptions | Via data.ts | All 82 courses use identical template text | Critical |
| Weak syllabus | Lines 102-119 | All courses have same "Fundamentals/Advanced" modules | Critical |
| No reviews shown | N/A | Rating displayed but no actual user reviews | High |
| No FAQ section | N/A | Common questions not addressed | Medium |
| Missing urgency | N/A | No "3 seats left" or "Starting soon" messaging | Medium |
| Only 2 related courses | Line 19 | Could show 3-4 for better discovery | Low |

#### Content Quality Issues

**Problem: All Courses Have Identical Generic Content**

**Source:** `lib/data.ts` lines 72-89

```typescript
const getCourseDescription = (name: string, category: string) => {
  const descriptions: Record<string, any> = {
    'default': {  // ❌ Only ONE template for ALL 82 courses
      description: `Professionele training in ${name}. Leer de essentiële vaardigheden...`,
      objectives: [
        'Begrijp de fundamentele concepten',  // Generic
        'Implementeer best practices',         // Generic
        'Los praktische problemen op',         // Generic
        'Bouw productie-klare oplossingen'    // Generic
      ],
      prerequisites: ['Basiskennis IT', 'Ervaring met gerelateerde technologieën'],
      targetAudience: ['Developers', 'IT Professionals', 'Technical Leads']
    }
  };
  return descriptions['default'];  // Always returns same template
};
```

**Impact:**
- **SEO:** Google penalizes duplicate content across pages
- **User Trust:** Looks unprofessional, suggests low-quality content
- **Conversion:** Users can't differentiate between courses
- **Search Rankings:** Generic descriptions don't rank for specific queries

**Critical Recommendation (6-8 hours):**

Create unique, specific content for each course category:

```typescript
// Create lib/course-descriptions.ts
export const courseDescriptions = {
  'python-met-chatgpt': {
    description: 'Leer Python programmeren met de kracht van AI-assistentie. Deze cursus combineert traditionele Python-concepten met moderne ChatGPT-integratie voor rapid development en intelligent code generation.',
    shortDescription: 'Master Python met ChatGPT-powered development',
    objectives: [
      'Schrijf Python scripts met ChatGPT-assistentie voor 3x snellere development',
      'Integreer OpenAI API in je Python applicaties',
      'Debug complexe code met AI-powered analysis tools',
      'Bouw intelligente applicaties die natuurlijke taal verwerken'
    ],
    prerequisites: [
      'Basiskennis programmeren (variabelen, loops, functies)',
      'Bekend met command line / terminal',
      'Laptop met Python 3.10+ geïnstalleerd'
    ],
    targetAudience: [
      'Software developers die AI willen benutten',
      'Data scientists die Python willen leren',
      'Automation engineers die code willen genereren'
    ],
    syllabus: [
      {
        title: 'Python Fundamentals met AI',
        topics: [
          'Variables, data types en operators',
          'ChatGPT als learning companion gebruiken',
          'Control flow: if/else, loops',
          'Functions en modules schrijven met AI-assistentie'
        ]
      },
      {
        title: 'OpenAI API Integratie',
        topics: [
          'OpenAI Python library installeren en configureren',
          'Chat completions API gebruiken',
          'Prompt engineering voor code generation',
          'Token management en cost optimization'
        ]
      },
      {
        title: 'Advanced Topics',
        topics: [
          'Error handling en debugging met ChatGPT',
          'Code refactoring met AI suggestions',
          'Building intelligent CLI tools',
          'Best practices voor AI-assisted development'
        ]
      }
    ]
  },
  // ... 81 more unique course descriptions
};
```

**Alternative Approach (If Time Constrained):**

Generate AI-assisted descriptions using category-specific templates:

```typescript
const getCategoryTemplate = (category: string) => {
  const templates = {
    'AI & Machine Learning': {
      objectives: [
        'Begrijp machine learning algoritmes en hun toepassingen',
        'Implementeer ML modellen met industry-standard libraries',
        'Train en optimaliseer modellen voor productie',
        'Deploy ML oplossingen in cloud environments'
      ],
      prerequisites: ['Python programmeerkennis', 'Statistiek basis', 'Linear algebra fundamentals'],
    },
    'DevOps & Containers': {
      objectives: [
        'Begrijp containerization principles en best practices',
        'Implementeer CI/CD pipelines voor automated deployment',
        'Beheer infrastructure as code',
        'Monitor en optimaliseer container performance'
      ],
      prerequisites: ['Linux command line', 'Basiskennis netwerken', 'Git version control'],
    },
    // ... per category
  };
  return templates[category];
};
```

---

### 1.4 Checkout Flow Analysis

**File:** `app/checkout/page.tsx`

#### Strengths ✅

- Excellent form validation using Zod schema
- Clear multi-step indicator (visual design)
- Corporate/individual billing options
- Multiple payment methods (card, iDEAL, invoice)
- Clear order summary with pricing breakdown
- Good use of React Hook Form for state management
- Accessibility: proper label associations

#### Critical Issues ❌

| Issue | Location | Impact | Severity |
|-------|----------|--------|----------|
| Step indicator non-functional | Lines 80-94 | Shows 3 steps but form is single-page | Medium |
| Promo code field broken | Lines 266-269 | No validation or application logic | High |
| No quantity selection | N/A | Can't book multiple seats for teams | High |
| No VAT calculation | Lines 256-263 | Dutch law requires 21% BTW display | Critical |
| No payment processing | Line 61 | Just alerts "Demo mode" | Critical |
| Terms checkbox buried | Lines 224-238 | Should be more prominent | Medium |
| No confirmation page | N/A | Should redirect to /order-confirmation | High |

#### Legal Compliance Issues

**VAT (BTW) Calculation Missing**

Dutch law requires transparent VAT display for B2C transactions:

```typescript
// Current (WRONG):
<div className="flex justify-between font-bold text-lg pt-4 border-t">
  <span>Totaal</span>
  <span className="text-primary-600">{formatPrice(course.price)}</span>
</div>

// Should be (CORRECT):
const VAT_RATE = 0.21;
const subtotal = course.price;
const vat = subtotal * VAT_RATE;
const total = subtotal + vat;

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-secondary-600">Subtotaal (excl. BTW)</span>
    <span className="font-medium">{formatPrice(subtotal)}</span>
  </div>
  <div className="flex justify-between text-sm">
    <span className="text-secondary-600">BTW (21%)</span>
    <span className="font-medium">{formatPrice(vat)}</span>
  </div>
  <div className="flex justify-between font-bold text-lg pt-4 border-t">
    <span>Totaal (incl. BTW)</span>
    <span className="text-primary-600">{formatPrice(total)}</span>
  </div>
</div>
```

**Recommendation: Implement Immediately (20 minutes)**

#### Security & Trust Issues

1. **No SSL/Security Badges:** Missing trust indicators
   - Add: "Veilige betaling met SSL encryptie"
   - Add: Payment provider logos (Stripe, iDEAL, Visa, Mastercard)

2. **No Money-Back Guarantee:**
   - Add: "14 dagen niet-goed-geld-terug garantie"

3. **No GDPR Compliance Notice:**
   ```html
   <p className="text-xs text-secondary-600 mt-4">
     Door je in te schrijven ga je akkoord met onze
     <a href="/privacy">Privacyverklaring</a> en
     <a href="/terms">Algemene Voorwaarden</a>.
     We verwerken je gegevens conform AVG/GDPR.
   </p>
   ```

#### Missing Features

**1. Quantity Selection (2 hours to implement):**
```typescript
const [quantity, setQuantity] = useState(1);

<div className="mb-4">
  <label className="block text-sm font-medium mb-2">
    Aantal deelnemers
  </label>
  <div className="flex items-center gap-3">
    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
    <input type="number" value={quantity} min="1" max="20" />
    <button onClick={() => setQuantity(quantity + 1)}>+</button>
  </div>
  {quantity >= 5 && (
    <p className="text-sm text-green-600 mt-1">
      10% groepskorting automatisch toegepast!
    </p>
  )}
</div>

// Update total calculation
const subtotal = course.price * quantity;
const discount = quantity >= 5 ? subtotal * 0.10 : 0;
const afterDiscount = subtotal - discount;
const vat = afterDiscount * 0.21;
const total = afterDiscount + vat;
```

**2. Promo Code System (4 hours):**
```typescript
const promoCodes: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
  'WELCOME10': { discount: 0.10, type: 'percentage' },
  'EARLYBIRD': { discount: 50, type: 'fixed' },
  'STUDENT20': { discount: 0.20, type: 'percentage' },
};

const [promoCode, setPromoCode] = useState('');
const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
const [promoError, setPromoError] = useState('');

const applyPromoCode = () => {
  const code = promoCode.toUpperCase();
  const promo = promoCodes[code];

  if (promo) {
    setAppliedPromo(code);
    setPromoError('');
    // Show success message
  } else {
    setPromoError('Ongeldige promocode');
    setAppliedPromo(null);
  }
};

// Calculate discount in price breakdown
const promoDiscount = appliedPromo
  ? promoCodes[appliedPromo].type === 'percentage'
    ? subtotal * promoCodes[appliedPromo].discount
    : promoCodes[appliedPromo].discount
  : 0;
```

---

### 1.5 Admin Dashboard Analysis

**File:** `app/admin/page.tsx`

#### Strengths ✅

- Clean dashboard layout with KPI cards
- Tab-based navigation for different sections
- Table view for courses and orders
- Mock data demonstrates intended functionality
- Responsive stats cards

#### Critical Security Issues 🚨

**NO AUTHENTICATION PROTECTION**

```typescript
// Current (CRITICAL SECURITY RISK):
export default function AdminDashboard() {
  // Anyone can access this page!
  return <div>...</div>
}

// Required (Immediate fix needed):
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin');
  }

  return <div>...</div>
}
```

**Recommendation: Implement Authentication IMMEDIATELY (6 hours)**

Use NextAuth.js with role-based access:

```typescript
// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"]
};

// lib/auth.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials against database
        const user = await verifyUser(credentials);
        if (user && user.role === 'admin') {
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        role: token.role,
      }
    })
  }
};
```

#### Functional Issues

| Issue | Location | Impact | Severity |
|-------|----------|--------|----------|
| No authentication | Entire file | Anyone can access admin panel | Critical |
| All actions non-functional | Lines 111-163 | Edit/Delete/Add buttons do nothing | High |
| Mock order data | Lines 11-17 | Not connected to real bookings | High |
| No search/filter | N/A | Can't search through 82 courses | Medium |
| Only 6 courses shown | Line 129 | Needs pagination | Medium |
| Schedules/Users tabs empty | Lines 217-226 | Just placeholder content | Low |

#### Missing Admin Features

1. **Course Management:**
   - ❌ Create new course
   - ❌ Edit course details
   - ❌ Delete/archive course
   - ❌ Duplicate course
   - ❌ Bulk operations

2. **Order Management:**
   - ❌ View order details
   - ❌ Update order status
   - ❌ Refund processing
   - ❌ Export to CSV
   - ❌ Filter by date range

3. **User Management:**
   - ❌ View registered users
   - ❌ Manage permissions
   - ❌ Send notifications
   - ❌ View enrollment history

4. **Analytics:**
   - ❌ Revenue charts
   - ❌ Popular courses
   - ❌ Conversion funnel
   - ❌ User demographics

---

## 2. Component Analysis

### 2.1 CourseCard Component

**File:** `components/CourseCard.tsx`

#### Current Implementation

```typescript
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full">
            {course.format}  {/* ❌ Shows "virtual" instead of "Virtueel" */}
          </span>
          <Image src={course.imageUrl} alt={course.title} fill />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
            {course.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(course.price)}
            </span>
            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{course.rating}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

#### Issues

1. **Format badge not translated** (Lines 17-19)
   - Shows: "virtual", "classroom", "corporate", "private"
   - Should show: "Virtueel", "Klassikaal", "Bedrijf", "Privé"

2. **Missing duration display**
   - Course has `duration` field but not shown on card
   - Important for users to see "2 dagen" at a glance

3. **Missing category badge**
   - Users can't see which category without clicking

4. **No visual "clickable" indication**
   - Card changes shadow on hover but cursor doesn't indicate it's a link
   - No arrow icon or "Bekijk details" text

5. **Hover state could be better**
   - Only shadow changes
   - Could add scale transform or border highlight

#### Improved Implementation

```typescript
const formatLabels: Record<TrainingFormat, string> = {
  virtual: 'Virtueel',
  classroom: 'Klassikaal',
  corporate: 'Bedrijf',
  private: 'Privé'
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
        {/* Image with badges */}
        <div className="relative h-48 w-full">
          <Image
            src={course.imageUrl}
            alt={`${course.title} cursus`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Format badge */}
          <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {formatLabels[course.format]}
          </span>
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-secondary-600 mb-3 line-clamp-2 flex-1">
            {course.shortDescription}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-3 text-sm text-secondary-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.format === 'classroom' ? 'Max 12' : 'Online'}
            </span>
          </div>

          {/* Price and rating */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t">
            <div>
              <div className="text-xs text-secondary-500">Vanaf</div>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(course.price)}
              </span>
            </div>

            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-xs text-secondary-500">(24)</span>
              </div>
            )}
          </div>

          {/* CTA hint */}
          <div className="flex items-center gap-2 mt-2 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Bekijk details
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

---

### 2.2 CourseBookingForm Component

**File:** `components/CourseBookingForm.tsx`

#### Critical Issue: Useless Language Selector

**Current Implementation (Lines 48-62):**
```typescript
<div className="mb-6">
  <label htmlFor="language-select">Taal</label>
  <select
    id="language-select"
    value={selectedLanguage}
    onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'nl')}
  >
    <option value="en">Engels</option>
    <option value="nl">Nederlands</option>
  </select>
</div>
```

**Problem:**
- ALL courses are Dutch-only (per CLAUDE.md requirements)
- Language selector serves no purpose
- Confuses users ("Can I get this in English?" - No.)

**Solution: Remove Entirely (5 minutes)**

```typescript
// Remove these lines:
const [selectedLanguage, setSelectedLanguage] = useState(course.language);

// Remove the entire language selection div
```

#### Other Issues

1. **Disabled state unclear**
   - Button says "Selecteer een datum om in te schrijven" when disabled
   - Should have visual disabled styling (opacity, cursor)

2. **No date descriptions**
   - Shows "15 november 2025" but not "Maandag 15 nov" or time
   - Users don't know if it's weekday/weekend

3. **No availability info**
   - No "5 seats remaining" messaging
   - No "Laatste plekken!" urgency

#### Improved Implementation

```typescript
export default function CourseBookingForm({ course }: CourseBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Card className="p-6 sticky top-20">
      <h3 className="text-xl font-bold mb-4">
        Eerstvolgende Beschikbare Data
      </h3>

      {/* Dates with availability */}
      <div className="mb-6">
        <div className="text-sm font-medium text-secondary-700 mb-2">
          Selecteer een datum
        </div>
        <div className="space-y-2">
          {course.dates.map((date, index) => {
            const availability = getAvailability(course.id, date); // Mock for now
            const isSelected = selectedDate?.getTime() === date.getTime();
            const isFull = availability.remaining === 0;

            return (
              <button
                key={index}
                onClick={() => !isFull && setSelectedDate(date)}
                disabled={isFull}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg border-2 transition-colors',
                  isSelected && 'border-primary-600 bg-primary-50',
                  !isSelected && !isFull && 'border-secondary-200 hover:border-primary-300',
                  isFull && 'border-secondary-200 opacity-50 cursor-not-allowed'
                )}
                aria-label={`Selecteer datum ${formatDateDetailed(date)}`}
                aria-pressed={isSelected}
                aria-disabled={isFull}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <div className="font-medium">
                        {formatDateDetailed(date)} {/* "Maandag 15 november 2025" */}
                      </div>
                      <div className="text-xs text-secondary-600">
                        09:00 - 17:00
                      </div>
                    </div>
                  </div>

                  {/* Availability badge */}
                  {!isFull && availability.remaining <= 5 && (
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      {availability.remaining} plekken over
                    </span>
                  )}
                  {isFull && (
                    <span className="text-xs font-medium text-red-600">
                      Volgeboekt
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price with VAT */}
      <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-sm text-secondary-600">Cursusprijs</span>
          <span className="text-lg font-semibold">{formatPrice(course.price)}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-secondary-500">Incl. 21% BTW</span>
          <span className="text-xs text-secondary-500">
            {formatPrice(course.price * 0.21)} BTW
          </span>
        </div>
        <div className="text-xs text-secondary-600 mt-2">
          Per deelnemer • Inclusief materialen & certificaat
        </div>
      </div>

      {/* Enroll Button */}
      <Button
        size="lg"
        className="w-full mb-3"
        disabled={!selectedDate}
        asChild={selectedDate !== null}
      >
        {selectedDate ? (
          <Link href={`/checkout?course=${course.id}&date=${selectedDate.toISOString()}`}>
            Nu Inschrijven
          </Link>
        ) : (
          <span className="cursor-not-allowed">
            Selecteer eerst een datum
          </span>
        )}
      </Button>

      {/* Trust indicators */}
      <div className="space-y-2 text-xs text-secondary-600">
        <p className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          Veilige betaling • Directe bevestiging
        </p>
        <p className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          14 dagen niet-goed-geld-terug garantie
        </p>
        <p className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          Inclusief certificaat bij succesvolle afronding
        </p>
      </div>
    </Card>
  );
}

// Helper function
function formatDateDetailed(date: Date): string {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
```

---

### 2.3 Header Component

**File:** `components/Header.tsx`

#### Strengths ✅

- Good mobile menu implementation with accessibility attributes
- Sticky positioning for persistent navigation
- Clean logo design with icon
- Proper ARIA labels and roles

#### Issues

1. **"Nu Inschrijven" destination unclear**
   - Goes to `/courses` but should maybe go to most popular course
   - Or show dropdown with featured courses

2. **No active link highlighting**
   - Can't tell which page user is currently on
   - Should highlight current route

3. **Missing critical links**
   - No link to FAQ
   - No link to Blog/Resources
   - No link to Testimonials

4. **No search in header**
   - Common e-commerce pattern
   - Users expect global search

#### Improved Implementation

```typescript
'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: '/courses', label: 'Cursusaanbod' },
    { href: '/corporate', label: 'Bedrijfstraining' },
    { href: '/about', label: 'Over Ons' },
    { href: '/faq', label: 'FAQ' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <ChevronUp className="w-6 h-6 text-primary-600" />
              <ChevronUp className="w-6 h-6 text-primary-600 -mt-3" />
            </div>
            <span className="text-xl font-bold text-secondary-900">TECHTRAIN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-medium transition-colors relative',
                  isActive(link.href)
                    ? 'text-primary-600'
                    : 'text-secondary-700 hover:text-primary-600'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              aria-label="Zoeken"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/login" className="text-primary-600 font-medium">
              Inloggen
            </Link>

            <Button asChild>
              <Link href="/courses">Nu Inschrijven</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Sluit menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search bar (shown when searchOpen) */}
        {searchOpen && (
          <div className="py-4 border-t border-secondary-200">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Zoek cursussen, onderwerpen, technologieën..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            {/* ... existing mobile menu ... */}
          </div>
        )}
      </nav>
    </header>
  );
}
```

---

### 2.4 Footer Component

**File:** `components/Footer.tsx`

#### Issues

1. **Newsletter form non-functional**
   - Form has no submit handler
   - No validation
   - No API endpoint

2. **Social links broken**
   - All use `href="#"`
   - Should link to actual social profiles or be removed

3. **Missing important links**
   - No sitemap
   - No careers page
   - No press/media page
   - No partner/affiliate program

#### Improved Implementation

```typescript
'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email.includes('@')) {
      alert('Voer een geldig e-mailadres in');
      return;
    }

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      alert('Er ging iets mis. Probeer het later opnieuw.');
    }
  };

  return (
    <footer className="bg-secondary-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Blijf op de Hoogte</h3>
            {subscribed ? (
              <div className="bg-green-600 text-white p-4 rounded-lg">
                ✓ Bedankt voor je inschrijving!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white"
                />
                <Button type="submit">Abonneren</Button>
              </form>
            )}
            <p className="text-sm text-secondary-400 mt-2">
              Ontvang updates over nieuwe cursussen en exclusieve aanbiedingen.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-secondary-300 hover:text-white">Over Ons</Link></li>
              <li><Link href="/contact" className="text-secondary-300 hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="text-secondary-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/careers" className="text-secondary-300 hover:text-white">Carrières</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Juridisch</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-secondary-300 hover:text-white">Algemene Voorwaarden</Link></li>
              <li><Link href="/privacy" className="text-secondary-300 hover:text-white">Privacybeleid</Link></li>
              <li><Link href="/cookies" className="text-secondary-300 hover:text-white">Cookiebeleid</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-400 text-sm">
            © 2025 TechTrain. Alle rechten voorbehouden. KvK: 12345678
          </p>

          {/* Only include if you have real social profiles */}
          {process.env.NEXT_PUBLIC_TWITTER_URL && (
            <div className="flex gap-4">
              <a
                href={process.env.NEXT_PUBLIC_TWITTER_URL}
                className="text-secondary-400 hover:text-white"
                aria-label="Volg ons op Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                className="text-secondary-400 hover:text-white"
                aria-label="Volg ons op LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
```

**Newsletter API Endpoint (app/api/newsletter/subscribe/route.ts):**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    // TODO: Add to your email service (Mailchimp, SendGrid, etc.)
    // For now, just log it
    console.log('Newsletter subscription:', email);

    // In production, add to database/email service:
    // await addToMailchimp(email);
    // await db.newsletterSubscriber.create({ data: { email } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}
```

---

## 3. Data Structure & Logic Analysis

### 3.1 Course Data Generation

**File:** `lib/data.ts`

#### Current Architecture

**Strengths:**
- Clean separation: raw data → transformation → Course objects
- Deterministic rating generation (consistent across page loads)
- Dynamic date generation (always shows future dates)
- Type-safe with TypeScript interfaces

**Critical Data Quality Issues:**

#### Issue 1: Generic Descriptions for All Courses

**Problem:**
```typescript
const getCourseDescription = (name: string, category: string) => {
  const descriptions: Record<string, any> = {
    'default': {  // ❌ ONLY ONE TEMPLATE FOR ALL 82 COURSES
      description: `Professionele training in ${name}. Leer de essentiële vaardigheden...`,
      shortDescription: `Master ${name} met praktische hands-on training`,
      objectives: [
        'Begrijp de fundamentele concepten',      // Too generic
        'Implementeer best practices',             // Too generic
        'Los praktische problemen op',             // Too generic
        'Bouw productie-klare oplossingen'        // Too generic
      ],
      prerequisites: ['Basiskennis IT', 'Ervaring met gerelateerde technologieën'],
      targetAudience: ['Developers', 'IT Professionals', 'Technical Leads']
    }
  };
  return descriptions['default'];  // Always returns same template
};
```

**Impact:**
- **SEO Disaster:** Google penalizes duplicate content
- **User Trust:** Looks unprofessional
- **Conversion Rate:** Can't differentiate courses
- **Search Rankings:** Generic text doesn't rank for specific queries

**Example of the problem:**

Compare these two courses:
1. "Python (met ChatGPT)" - €1,575
2. "Apache Kafka voor Python" - €1,750

**Current (WRONG):**
- Both have: "Professionele training in [name]. Leer de essentiële vaardigheden..."
- Both have: "Begrijp de fundamentele concepten"
- Both have: "Basiskennis IT" as prerequisite

**Should be (CORRECT):**

**Python (met ChatGPT):**
- Description: "Leer Python programmeren met AI-assistentie. Gebruik ChatGPT om 3x sneller te coderen, bugs op te lossen, en intelligente applicaties te bouwen. Perfect voor beginners die de kracht van AI willen benutten."
- Objectives:
  - "Schrijf Python scripts met ChatGPT code generation"
  - "Integreer OpenAI API in je applicaties"
  - "Debug complexe code met AI-powered analysis"
- Prerequisites: "Geen programmeerervaring vereist - wel laptop met internet"

**Apache Kafka voor Python:**
- Description: "Master event streaming met Apache Kafka en Python. Bouw schaalbare data pipelines, real-time analytics systemen, en microservices architecturen. Hands-on met Confluent Cloud en Python Kafka clients."
- Objectives:
  - "Ontwerp en implementeer Kafka topics en partitioning strategieën"
  - "Bouw producers en consumers met Python"
  - "Implementeer stream processing met Kafka Streams"
- Prerequisites: "Python ervaring vereist, Linux command line, basis distributed systems"

#### Issue 2: Instructor Assignment Arbitrary

**Problem (Lines 61-63):**
```typescript
const getInstructor = (index: number) => {
  return instructorPool[index % instructorPool.length];
};

// In transformation:
instructor: getInstructor(index),  // ❌ Course 0 gets instructor 0, course 8 gets instructor 0 again
```

**Result:**
- "Python (met ChatGPT)" taught by Jan de Vries
- "Apache Kafka voor Python" taught by same Jan de Vries
- "Python Deep Learning" taught by Lisa Bakker
- "Python voor Data Science" taught by Mohammed El Amrani

**Problem:** No logical connection between instructor expertise and course topic

**Better Approach:**
```typescript
const instructorSpecialties = {
  'Jan de Vries': ['Python', 'Programmeren', 'Development'],
  'Sophie Chen': ['AI', 'Machine Learning', 'Data Science'],
  'Mohammed El Amrani': ['Cloud', 'DevOps', 'Containers'],
  'Mark van der Berg': ['Databases', 'SQL', 'Performance'],
  'Emma de Jong': ['Security', 'Beveiliging'],
};

function assignInstructor(courseName: string, category: string): Instructor {
  // Match by course name keywords
  for (const [name, specialties] of Object.entries(instructorSpecialties)) {
    if (specialties.some(specialty =>
      courseName.includes(specialty) || category.includes(specialty)
    )) {
      return instructorPool.find(i => i.name === name);
    }
  }
  // Fallback
  return instructorPool[0];
}
```

#### Issue 3: Duration Calculated from Price

**Problem (Lines 17-23):**
```typescript
const getDuration = (price: number): string => {
  if (price < 800) return '1 dag';
  if (price < 1500) return '2 dagen';
  if (price < 2500) return '3 dagen';
  if (price < 3500) return '4 dagen';
  return '5 dagen';
};
```

**Why this is wrong:**
- "Google Data Studio" (€550) → "1 dag" ✓ (reasonable)
- "Python Deep Learning" (€3,195) → "4 dagen" ✓ (reasonable)
- BUT: "Oracle BPM Suite" (€3,475) → "5 dagen" (might be wrong)

**Problem:** Duration should come from actual course design, not price interpolation

**Real-world example:**
- Intensive bootcamp: €2,500 for 2 days (€1,250/day)
- Comprehensive program: €2,500 for 5 days (€500/day)
- These have SAME price, DIFFERENT duration

**Better approach:**

Add duration to raw course data CSV or create mapping:
```typescript
const courseDurations: Record<string, string> = {
  'basisprincipes-programmeren': '3 dagen',
  'python-met-chatgpt': '2 dagen',
  'python-deep-learning': '5 dagen',
  // ... for all courses
};

// Or add to CSV:
// name,price,category,duration
// "Python (met ChatGPT)",1575,"Programmeren & Development","2 dagen"
```

#### Issue 4: Format Assignment Random

**Problem (Line 105):**
```typescript
format: index % 3 === 0 ? 'virtual' : 'classroom',
```

**Result:**
- Course 0: virtual
- Course 1: classroom
- Course 2: classroom
- Course 3: virtual
- ...

**Why wrong:**
- Some courses SHOULD be virtual (e.g., "Azure Cloud" courses)
- Some courses NEED classroom (e.g., hands-on hardware courses)
- Pattern is completely arbitrary

**Better approach:**
```typescript
function determineFormat(courseName: string, category: string): TrainingFormat {
  // Cloud courses -> often virtual
  if (category === 'Cloud Computing' || courseName.includes('Azure') || courseName.includes('AWS')) {
    return 'virtual';
  }

  // Security courses -> classroom for hands-on
  if (category === 'Beveiliging') {
    return 'classroom';
  }

  // Default: classroom
  return 'classroom';
}
```

#### Issue 5: All Ratings 4.5-4.9

**Problem (Lines 66-70):**
```typescript
const getDeterministicRating = (index: number): number => {
  const hash = (index * 2654435761) % 40;
  return 4.5 + (hash / 100);  // Results: 4.5 to 4.9
};
```

**Why unrealistic:**
- ALL courses rated 4.5+ (no course below 4.5)
- No natural variation (some courses should be 3.8, some 4.9)
- Looks fake to users ("all perfect scores")

**Better approach:**
```typescript
const courseRatings: Record<string, number> = {
  'python-met-chatgpt': 4.8,      // Very popular
  'azure-logic-apps': 4.2,         // Niche course
  'google-data-studio': 4.6,       // Good course
  // ... realistic ratings based on course popularity/quality
};

// Or generate more realistic distribution:
const getDeterministicRating = (index: number): number => {
  const hash = (index * 2654435761) % 100;
  // Bell curve around 4.3, ranging from 3.5 to 4.9
  if (hash < 10) return 3.5 + (hash / 20);     // 10%: 3.5-4.0
  if (hash < 40) return 4.0 + (hash / 50);     // 30%: 4.0-4.5
  if (hash < 80) return 4.3 + (hash / 33);     // 40%: 4.3-4.8
  return 4.5 + (hash / 25);                     // 20%: 4.5-4.9
};
```

---

### 3.2 Data Transformation Pipeline

**Current Flow:**

```
CSV Data (course-data-raw.ts)
  ↓
courses array (data.ts transformation)
  ↓
Helper functions (getCourseBySlug, getCoursesByCategory, etc.)
  ↓
React Components
```

**Issues:**

1. **No caching:** Every page load transforms all 82 courses
2. **No validation:** Raw data not validated before transformation
3. **No error handling:** Malformed data would crash the app

**Improved Architecture:**

```typescript
// lib/data.ts

import { Course } from '@/types';
import { rawCourseData } from './course-data-raw';
import { courseDescriptions } from './course-descriptions'; // ← NEW: Unique content
import { instructorAssignments } from './instructor-assignments'; // ← NEW: Expert matching

// Validation schema
import { z } from 'zod';

const rawCourseSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  duration: z.string().optional(),
  format: z.enum(['classroom', 'virtual', 'corporate', 'private']).optional(),
});

// Validate raw data on load (fail fast if data is corrupted)
const validatedRawData = rawCourseData.map((raw, index) => {
  try {
    return rawCourseSchema.parse(raw);
  } catch (error) {
    console.error(`Invalid course data at index ${index}:`, error);
    throw new Error(`Course data validation failed at index ${index}`);
  }
});

// Transform with enhanced data
export const courses: Course[] = validatedRawData.map((raw, index) => {
  const slug = createSlug(raw.name);

  // Get unique content (not generic template)
  const description = courseDescriptions[slug] || getDefaultDescription(raw.name);

  // Get expert instructor (not arbitrary)
  const instructor = instructorAssignments[slug] || getInstructorByExpertise(raw.category);

  // Get actual duration (not price-based)
  const duration = raw.duration || courseDurations[slug] || '2 dagen';

  // Get logical format (not index-based)
  const format = raw.format || determineFormat(raw.name, raw.category);

  return {
    id: String(index + 1),
    title: raw.name,
    slug,
    description: description.description,
    shortDescription: description.shortDescription,
    price: raw.price,
    duration,
    language: 'nl' as const,
    format,
    category: raw.category,
    rating: getCourseRating(slug),
    imageUrl: getImageForCategory(raw.category),
    objectives: description.objectives,
    prerequisites: description.prerequisites,
    targetAudience: description.targetAudience,
    syllabus: description.syllabus,
    instructor,
    dates: getCourseDates(index),
  };
});

// Memoize expensive operations
let coursesCache: Course[] | null = null;

export function getCourses(): Course[] {
  if (!coursesCache) {
    coursesCache = courses;
  }
  return coursesCache;
}

// Add search functionality
export function searchCourses(query: string): Course[] {
  const lowerQuery = query.toLowerCase();
  return courses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery)
  );
}

// Add advanced filtering
export function filterCourses(filters: {
  categories?: string[];
  formats?: TrainingFormat[];
  priceRange?: [number, number];
  minRating?: number;
}): Course[] {
  return courses.filter(course => {
    if (filters.categories && !filters.categories.includes(course.category)) {
      return false;
    }
    if (filters.formats && !filters.formats.includes(course.format)) {
      return false;
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (course.price < min || course.price > max) return false;
    }
    if (filters.minRating && course.rating && course.rating < filters.minRating) {
      return false;
    }
    return true;
  });
}
```

---

## 4. Complete Issue Inventory

### 4.1 Critical Issues (Block Core Functionality)

| # | Issue | File | Lines | Impact | Effort |
|---|-------|------|-------|--------|--------|
| C1 | Homepage search non-functional | app/page.tsx | 44-48 | Users can't search from homepage | 30 min |
| C2 | Category name mismatch (EN/NL) | app/page.tsx | 8-14, 81 | Breaks category filtering completely | 15 min |
| C3 | Catalog search button does nothing | app/courses/page.tsx | 73-75 | Confusing, wastes UI space | 5 min |
| C4 | All course descriptions identical | lib/data.ts | 72-89 | SEO penalty, no differentiation | 6 hours |
| C5 | All syllabi identical | lib/data.ts | 112-121 | Users can't see what they'll learn | 6 hours |
| C6 | No VAT calculation (Dutch law) | app/checkout/page.tsx | 256-263 | Legal non-compliance | 20 min |
| C7 | Admin dashboard no auth | app/admin/page.tsx | All | Security vulnerability | 6 hours |
| C8 | Newsletter form non-functional | components/Footer.tsx | 14-21 | Broken feature | 2 hours |
| C9 | No payment processing | app/checkout/page.tsx | 58-62 | Can't actually sell courses | 2 weeks |
| C10 | Promo code broken | app/checkout/page.tsx | 266-269 | Feature incomplete | 4 hours |
| C11 | Single-format filter (checkbox UI) | app/courses/page.tsx | 127-150 | Misleading interface | 15 min |
| C12 | Duration from price (wrong logic) | lib/data.ts | 17-23 | Incorrect course durations | 2 hours |
| C13 | Format assigned arbitrarily | lib/data.ts | 105 | Wrong training formats | 2 hours |
| C14 | Instructor assignment random | lib/data.ts | 61-63, 122 | No expertise matching | 3 hours |
| C15 | Hardcoded category counts | app/page.tsx | 9-14 | Shows wrong numbers | 15 min |

**Total Critical Issues: 15**
**Total Effort to Fix: ~43 hours (≈ 1 week)**

---

### 4.2 High-Priority Issues (Degrade Experience)

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| H1 | No sort options on catalog | Can't sort by price/rating/date | 3 hours |
| H2 | No price range filter | Can't filter by budget | 2 hours |
| H3 | No pagination (82 courses) | Performance issue, poor UX | 4 hours |
| H4 | Mobile sidebar not collapsible | Takes too much space on mobile | 4 hours |
| H5 | No reviews/testimonials shown | Lacks social proof | 8 hours |
| H6 | No urgency messaging | Missing conversion tactics | 2 hours |
| H7 | No quantity selection checkout | Can't book team seats | 2 hours |
| H8 | Step indicator non-functional | Misleading UI in checkout | 1 hour |
| H9 | No order confirmation page | Incomplete checkout flow | 3 hours |
| H10 | Admin actions non-functional | Can't manage courses | 8 hours |
| H11 | Admin shows only 6 courses | Needs pagination | 2 hours |
| H12 | No loading states | Poor perceived performance | 2 hours |
| H13 | No error boundaries | Crashes show white screen | 3 hours |
| H14 | Generic 404 page | Uses default Next.js page | 1 hour |
| H15 | Missing meta descriptions | Poor SEO | 4 hours |
| H16 | No structured data (Schema.org) | Missing rich snippets | 3 hours |
| H17 | Images not optimized | All from Unsplash full-size | 2 hours |
| H18 | Language selector useless | All courses Dutch-only | 5 min |

**Total High-Priority: 18 issues**
**Total Effort: ~54 hours (≈ 1.5 weeks)**

---

### 4.3 Medium-Priority Issues (Polish & Enhancement)

| # | Issue | Impact |
|---|-------|--------|
| M1 | Weak CTA copy ("Ontdek Cursussen") | Generic, not compelling |
| M2 | No course preview/samples | Can't see before buying |
| M3 | No FAQ on course pages | Questions not answered |
| M4 | No instructor profiles | Can't learn about teachers |
| M5 | No corporate inquiry form | Hard to contact for B2B |
| M6 | No course comparison | Can't compare side-by-side |
| M7 | No wishlist/favorites | Can't save for later |
| M8 | No calendar view | Hard to see all dates |
| M9 | No filter by date | Can't find "this month" |
| M10 | No filter by instructor | Can't follow favorite teacher |
| M11 | Missing trust badges | No SSL/security indicators |
| M12 | No testimonials page | Social proof buried |
| M13 | No blog/resources | No content marketing |
| M14 | No referral program | Missing viral growth |
| M15 | No email notifications | No automated follow-ups |
| M16 | Social links broken (href="#") | Look unprofessional |
| M17 | Missing breadcrumbs | Poor navigation cues |
| M18 | No back-to-top button | Hard to navigate long pages |
| M19 | Poor focus states | Keyboard nav unclear |
| M20 | No skip-to-content link | Accessibility issue |
| M21 | Cookie consent missing | GDPR non-compliance |
| M22 | Privacy policy incomplete | Legal risk |
| M23 | No print stylesheet | Pages print badly |
| M24 | No dark mode | Modern expectation |
| M25 | Missing PWA features | No offline support |

**Total Medium-Priority: 25+ issues**

---

### 4.4 Accessibility Issues (WCAG 2.1)

| # | Issue | WCAG | Level | Fix Effort |
|---|-------|------|-------|------------|
| A1 | Search button no aria-label | 4.1.2 | A | 5 min |
| A2 | Color contrast in hero | 1.4.3 | AA | 30 min |
| A3 | Format badges no semantic | 1.3.1 | A | 15 min |
| A4 | No skip navigation link | 2.4.1 | A | 10 min |
| A5 | Form errors not announced | 3.3.1 | A | 30 min |
| A6 | Radio buttons lack fieldset | 1.3.1 | A | 20 min |
| A7 | Focus indicators weak | 2.4.7 | AA | 1 hour |
| A8 | Heading hierarchy skips | 1.3.1 | A | 30 min |
| A9 | Images missing alt text | 1.1.1 | A | 1 hour |
| A10 | Link purpose unclear | 2.4.4 | A | 2 hours |
| A11 | No ARIA landmarks | 1.3.1 | A | 30 min |
| A12 | Table headers not linked | 1.3.1 | A | 20 min |

**Total Accessibility: 12 violations**
**Total Effort: ~7 hours**

---

## 5. Prioritized Action Plan

### 5.1 Week 1: Critical Quick Fixes

**Priority: Foundation Fixes (All Quick Wins)**

**Day 1-2: Navigation & Search**
- [ ] Fix category links (EN→NL mapping) - 15 min
- [ ] Make homepage search functional - 30 min
- [ ] Remove catalog search button - 5 min
- [ ] Add VAT calculation to checkout - 20 min
- [ ] Remove useless language selector - 5 min

**Day 3: UI Corrections**
- [ ] Fix format filter (checkbox → radio) - 15 min
- [ ] Translate format badges to Dutch - 10 min
- [ ] Fix "Ontdek Cursussen" → "Reset Filters" - 5 min
- [ ] Add skip-to-content link - 10 min
- [ ] Fix wrong CTA on course detail page - 5 min

**Day 4-5: Loading & Polish**
- [ ] Add loading states with Suspense - 45 min
- [ ] Add basic aria-labels - 30 min
- [ ] Fix admin pagination - 30 min
- [ ] Calculate real category counts - 15 min
- [ ] Fix sticky sidebar positioning - 10 min

**Week 1 Total: ~4 hours of fixes**
**Impact: Removes all broken features, fixes misleading UI**

---

### 5.2 Week 2-3: Enhanced Filtering & Sorting

**Priority: Core User Experience**

**Multi-Format Filtering (2 hours)**
```typescript
const [selectedFormats, setSelectedFormats] = useState<TrainingFormat[]>([]);

const toggleFormat = (format: TrainingFormat) => {
  setSelectedFormats(prev =>
    prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
  );
};
```

**Sort Functionality (3 hours)**
- Price: low to high, high to low
- Rating: best first
- Title: alphabetical
- Date: newest courses first

**Price Range Filter (2 hours)**
- Slider component
- Min/max inputs
- Real-time filtering

**Pagination (4 hours)**
- 12 courses per page
- Page number navigation
- "Load more" button option
- URL state preservation (/courses?page=2)

**Mobile Filter Drawer (4 hours)**
- Slide-in modal on mobile
- Filter button with active count badge
- Apply/Clear actions

**Week 2-3 Total: ~15 hours**
**Impact: Professional filtering experience**

---

### 5.3 Week 4-5: Content Quality (CRITICAL)

**Priority: SEO & User Trust**

**Unique Course Descriptions (6-8 hours per batch)**

This is the MOST IMPORTANT task for SEO and user trust.

**Approach:**

1. **Create template system by category:**
   ```typescript
   // lib/course-descriptions.ts
   export const courseDescriptions = {
     // AI & ML courses
     'python-deep-learning': {
       description: 'Duik diep in neural networks en deep learning met Python...',
       objectives: [
         'Bouw en train convolutional neural networks (CNNs) voor beeldherkenning',
         'Implementeer recurrent neural networks (RNNs) voor sequence modeling',
         // ... specific to THIS course
       ],
       // ...
     },

     // Cloud courses
     'aws-essentials': {
       description: 'Master Amazon Web Services met deze hands-on cursus...',
       // ...
     }
   };
   ```

2. **Batch by category:**
   - Day 1-2: AI & Machine Learning courses (15 courses)
   - Day 3-4: Cloud Computing courses (12 courses)
   - Day 5: DevOps & Containers (10 courses)
   - Week 5: Remaining categories

3. **AI-assisted generation:**
   - Use ChatGPT to generate initial drafts
   - Review and customize each one
   - Ensure factual accuracy

**Add Structured Data (3 hours)**
- Schema.org Course markup
- Aggregate ratings
- Instructor information
- Price offers

**Meta Descriptions (4 hours)**
- Unique description per page
- 150-160 characters
- Include target keywords

**Week 4-5 Total: ~40 hours**
**Impact: 10x improvement in SEO, user trust**

---

### 5.4 Week 6-7: Mobile & Security

**Admin Authentication (6 hours)**
- Install NextAuth.js
- Create admin role system
- Protect /admin routes
- Add middleware

**Mobile Improvements (8 hours)**
- Responsive filter drawer
- Touch-optimized interactions
- Mobile-first hero sections
- Collapsible sections

**Promo Code System (4 hours)**
- Validation logic
- Discount calculation
- UI for applying codes
- Success/error states

**Week 6-7 Total: ~18 hours**
**Impact: Security + Mobile UX**

---

### 5.5 Month 3-4: Backend Integration

**Database with Prisma (2-3 weeks)**

**Week 1: Schema & Migration**
```prisma
// prisma/schema.prisma
model Course {
  id            String   @id @default(cuid())
  slug          String   @unique
  title         String
  description   String   @db.Text
  price         Decimal  @db.Decimal(10, 2)
  category      String
  instructor    User     @relation(fields: [instructorId], references: [id])
  instructorId  String
  enrollments   Enrollment[]
  reviews       Review[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  role          Role     @default(USER)
  enrollments   Enrollment[]
  reviews       Review[]
}

model Enrollment {
  id         String   @id @default(cuid())
  user       User     @relation(fields: [userId], references: [id])
  userId     String
  course     Course   @relation(fields: [courseId], references: [id])
  courseId   String
  date       DateTime
  status     EnrollmentStatus
  paidAmount Decimal  @db.Decimal(10, 2)
  createdAt  DateTime @default(now())
}

model Review {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  course    Course   @relation(fields: [courseId], references: [id])
  courseId  String
  rating    Int      // 1-5
  comment   String   @db.Text
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())
}

enum Role {
  USER
  INSTRUCTOR
  ADMIN
}

enum EnrollmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}
```

**Week 2: Data Migration**
- Seed database with current courses
- Create admin user
- Migrate mock data

**Week 3: API Routes**
- GET /api/courses
- POST /api/enrollments
- GET /api/admin/courses
- PATCH /api/admin/courses/[id]

**Payment Integration - Stripe (2 weeks)**

**Week 1: Setup**
```typescript
// app/api/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { courseId, dateId, email } = await req.json();

  const course = await getCourseById(courseId);
  const subtotal = course.price;
  const vat = subtotal * 0.21;
  const total = subtotal + vat;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'ideal'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: course.title,
          description: course.shortDescription,
          images: [course.imageUrl],
        },
        unit_amount: Math.round(total * 100), // cents, including VAT
      },
      quantity: 1,
    }],
    mode: 'payment',
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?cancelled=true`,
    metadata: {
      courseId,
      dateId,
    },
  });

  return Response.json({ sessionId: session.id });
}
```

**Week 2: Webhooks & Confirmation**
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Create enrollment in database
    await createEnrollment({
      courseId: session.metadata.courseId,
      dateId: session.metadata.dateId,
      userEmail: session.customer_email,
      paidAmount: session.amount_total / 100,
      status: 'CONFIRMED',
    });

    // Send confirmation email
    await sendEnrollmentEmail(session.customer_email);
  }

  return Response.json({ received: true });
}
```

**Email Notifications (1 week)**

Using Resend:
```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEnrollmentEmail(enrollment: Enrollment) {
  await resend.emails.send({
    from: 'TechTrain <cursussen@techtrain.nl>',
    to: enrollment.user.email,
    subject: `Bevestiging: ${enrollment.course.title}`,
    react: EnrollmentConfirmationEmail({
      userName: enrollment.user.name,
      courseName: enrollment.course.title,
      courseDate: enrollment.date,
      totalPaid: enrollment.paidAmount,
    }),
  });
}
```

**Month 3-4 Total: ~6 weeks**
**Impact: Full e-commerce functionality**

---

### 5.6 Month 5+: Advanced Features

**Course Comparison (1 week)**
- Add to comparison from course cards
- Side-by-side table view
- Compare up to 3 courses
- Highlight differences

**Reviews System (1 week)**
- Review submission form
- Star ratings
- Verified purchase badges
- Moderation dashboard
- Display on course pages

**Advanced Search - Algolia (2 weeks)**
- Index all courses
- Instant search results
- Faceted filtering
- Typo tolerance
- Search analytics

**Learning Management System (8-12 weeks)**
- Student dashboard
- Course materials section
- Progress tracking
- Assignment submission
- Certificate generation
- Discussion forums

---

## 6. Performance Optimization

### 6.1 Current Performance Issues

**Images:**
- All from Unsplash at full resolution
- No blur placeholders
- No lazy loading for below-fold

**Bundle Size:**
- react-hook-form: ~50kb
- lucide-react: importing all icons
- No code splitting for admin

**Rendering:**
- All 82 courses render at once
- No virtualization
- Client-side filtering (could be server-side)

### 6.2 Optimization Checklist

**Images (2 hours)**
```typescript
// Optimize Unsplash URLs
const optimizedUrl = `${course.imageUrl}&w=800&q=80&fm=webp`;

// Add blur placeholders
<Image
  src={course.imageUrl}
  alt={course.title}
  fill
  className="object-cover"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate
/>

// Lazy load below-fold
<Image
  src={course.imageUrl}
  alt={course.title}
  fill
  loading="lazy"
/>
```

**Code Splitting (1 hour)**
```typescript
// Dynamic import for admin
const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  loading: () => <DashboardSkeleton />,
  ssr: false,
});

// Dynamic import for heavy forms
const CourseBookingForm = dynamic(() => import('@/components/CourseBookingForm'));
```

**Icon Tree-Shaking (30 min)**
```typescript
// Instead of:
import { Search, Clock, User, ... } from 'lucide-react';

// Do:
import Search from 'lucide-react/dist/esm/icons/search';
import Clock from 'lucide-react/dist/esm/icons/clock';
```

**Bundle Analysis (15 min)**
```bash
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run
ANALYZE=true npm run build
```

**Caching Strategy**
```typescript
// app/courses/page.tsx
export const revalidate = 3600; // Revalidate every hour

// app/api/courses/route.ts
export async function GET() {
  const courses = await getCourses();

  return Response.json(courses, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

---

## 7. SEO Optimization Strategy

### 7.1 Critical Missing Elements

**Meta Tags (4 hours)**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://techtrain.nl'),
  title: {
    default: 'TechTrain - Professionele IT Cursussen in Nederland',
    template: '%s | TechTrain'
  },
  description: 'Hoogwaardige IT training voor professionals. 80+ cursussen in AI, Cloud, DevOps, Data Science en meer. Klassikaal en virtueel. Plan je cursus vandaag.',
  keywords: ['IT cursussen', 'IT training', 'programmeren cursus', 'cloud computing', 'Nederland'],
  authors: [{ name: 'TechTrain' }],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://techtrain.nl',
    siteName: 'TechTrain',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechTrain IT Cursussen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechTrain - IT Cursussen',
    description: 'Professionele IT training in Nederland',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// app/courses/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const course = getCourseBySlug(params.slug);

  return {
    title: course.title,
    description: course.description.slice(0, 160),
    keywords: [course.title, course.category, 'cursus', 'training', 'Nederland'],
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      type: 'website',
      images: [
        {
          url: course.imageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    alternates: {
      canonical: `https://techtrain.nl/courses/${params.slug}`,
    },
  };
}
```

**Structured Data (3 hours)**

```typescript
// app/courses/[slug]/page.tsx
export default function CourseDetailPage({ params }) {
  const course = getCourseBySlug(params.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'TechTrain',
      sameAs: 'https://techtrain.nl',
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://techtrain.nl/courses/${course.slug}`,
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      ratingCount: 42, // Replace with real count
      bestRating: 5,
      worstRating: 1,
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor.name,
      description: course.instructor.bio,
    },
    educationalLevel: 'Professional',
    inLanguage: 'nl-NL',
    coursePrerequisites: course.prerequisites.join(', '),
    hasCourseInstance: course.dates.map(date => ({
      '@type': 'CourseInstance',
      courseMode: course.format === 'virtual' ? 'online' : 'onsite',
      startDate: date.toISOString(),
      endDate: new Date(date.getTime() + 86400000).toISOString(), // +1 day
      location: course.format === 'classroom' ? {
        '@type': 'Place',
        name: 'TechTrain Training Center',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Tech Street',
          addressLocality: 'Amsterdam',
          postalCode: '1012 AB',
          addressCountry: 'NL',
        },
      } : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* ... rest of page ... */}
    </>
  );
}
```

**XML Sitemap (1 hour)**

```typescript
// app/sitemap.ts
import { courses } from '@/lib/data';

export default function sitemap() {
  const baseUrl = 'https://techtrain.nl';

  const courseUrls = courses.map(course => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...courseUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // ... other pages
  ];
}
```

**robots.txt (5 min)**

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://techtrain.nl/sitemap.xml',
  };
}
```

---

## 8. Conversion Rate Optimization

### 8.1 Urgency & Scarcity Tactics

**Seat Availability (2 hours)**
```typescript
// Mock for now, replace with real data from DB
function getAvailability(courseId: string, date: Date) {
  const total = 12;
  const booked = Math.floor(Math.random() * 10); // Replace with real data
  return {
    total,
    booked,
    remaining: total - booked,
  };
}

// On course detail page
{availability.remaining <= 5 && (
  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
    <div className="flex items-center gap-2 text-orange-800">
      <AlertCircle className="w-5 h-5" />
      <strong>Bijna vol!</strong> Nog maar {availability.remaining} plekken beschikbaar.
    </div>
  </div>
)}
```

**Recent Enrollments (2 hours)**
```typescript
// Show social proof
const recentEnrollments = [
  { name: 'Jan uit Amsterdam', course: 'Python', time: '2 uur geleden' },
  // ... from database
];

<div className="bg-blue-50 rounded-lg p-4">
  <div className="text-sm text-blue-800">
    <User className="w-4 h-4 inline mr-1" />
    {recentEnrollments[0].name} schreef zich {recentEnrollments[0].time} in
  </div>
</div>
```

**Countdown Timer (3 hours)**
```typescript
// For early-bird pricing
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
  <div className="text-red-800 font-semibold mb-2">
    Vroegboekerkorting eindigt over:
  </div>
  <CountdownTimer targetDate={earlyBirdEndDate} />
  <div className="text-sm text-red-700 mt-2">
    Bespaar €{discount} - Schrijf je nu in!
  </div>
</div>
```

### 8.2 Trust Signals

**Payment Logos (30 min)**
```typescript
<div className="flex items-center gap-4 justify-center mt-6">
  <Image src="/logos/stripe.svg" alt="Stripe" width={60} height={24} />
  <Image src="/logos/ideal.svg" alt="iDEAL" width={60} height={24} />
  <Image src="/logos/visa.svg" alt="Visa" width={40} height={24} />
  <Image src="/logos/mastercard.svg" alt="Mastercard" width={40} height={24} />
</div>
```

**Money-Back Guarantee (15 min)**
```typescript
<div className="bg-green-50 rounded-lg p-4 text-center">
  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
  <div className="font-semibold text-green-800">
    14 Dagen Niet-Goed-Geld-Terug Garantie
  </div>
  <div className="text-sm text-green-700 mt-1">
    Niet tevreden? Volledige restitutie, geen vragen gesteld.
  </div>
</div>
```

**Security Badge (10 min)**
```typescript
<div className="flex items-center gap-2 text-sm text-secondary-600">
  <Lock className="w-4 h-4" />
  <span>Veilige betaling met SSL encryptie</span>
</div>
```

**Client Logos (1 hour)**
```typescript
// On homepage
<section className="py-12 bg-secondary-50">
  <div className="max-w-7xl mx-auto px-4">
    <h3 className="text-center text-secondary-600 mb-8">
      Vertrouwd door toonaangevende bedrijven
    </h3>
    <div className="grid grid-cols-4 md:grid-cols-6 gap-8 opacity-60">
      <Image src="/logos/client-1.svg" alt="Client 1" width={120} height={60} />
      {/* ... more logos ... */}
    </div>
  </div>
</section>
```

### 8.3 Friction Reduction

**Guest Checkout (2 hours)**
```typescript
<div className="mb-4">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={checkoutAsGuest}
      onChange={(e) => setCheckoutAsGuest(e.target.checked)}
    />
    <span>Doorgaan als gast (geen account aanmaken)</span>
  </label>
</div>
```

**Save Progress (3 hours)**
```typescript
// Auto-save form data to localStorage
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('checkout-form', JSON.stringify(formData));
  }, 1000);
  return () => clearTimeout(timer);
}, [formData]);

// Restore on mount
useEffect(() => {
  const saved = localStorage.getItem('checkout-form');
  if (saved) {
    setFormData(JSON.parse(saved));
    // Show notification
    toast.info('Je vorige gegevens zijn hersteld');
  }
}, []);
```

**Progress Indicator (1 hour)**
```typescript
<div className="mb-8">
  <div className="flex items-center justify-between text-sm mb-2">
    <span>Voortgang</span>
    <span>{completedFields}/8 velden ingevuld</span>
  </div>
  <div className="w-full bg-secondary-200 rounded-full h-2">
    <div
      className="bg-primary-600 h-2 rounded-full transition-all"
      style={{ width: `${(completedFields / 8) * 100}%` }}
    />
  </div>
</div>
```

---

## 9. Testing & Quality Assurance

### 9.1 Accessibility Testing Checklist

**Automated Testing**
```bash
# Install axe
npm install --save-dev @axe-core/react

# In app
if (process.env.NODE_ENV === 'development') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

**Manual Testing Checklist**

- [ ] Keyboard navigation works on all pages
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Skip-to-content link functional
- [ ] All images have meaningful alt text
- [ ] All form inputs have labels
- [ ] Error messages announced to screen readers
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Content readable at 200% zoom
- [ ] No keyboard traps
- [ ] ARIA attributes correct
- [ ] Landmark regions defined

**Screen Reader Testing**

Test with:
- NVDA (Windows) - Free
- JAWS (Windows) - Industry standard
- VoiceOver (Mac) - Built-in

**Checklist:**
- [ ] Page title announced
- [ ] Headings navigable
- [ ] Forms understandable
- [ ] Buttons clearly labeled
- [ ] Links descriptive
- [ ] Dynamic content announced

### 9.2 Performance Testing

**Lighthouse Audit**
```bash
# CLI
npm install -g lighthouse
lighthouse https://techtrain.nl --view

# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 95+
```

**Web Vitals**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Target Metrics:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s
- **TTFB (Time to First Byte):** < 600ms

### 9.3 Cross-Browser Testing

**Required Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

**Test Checklist:**
- [ ] Layout renders correctly
- [ ] Forms submit properly
- [ ] Images load
- [ ] Animations smooth
- [ ] Payment flow works
- [ ] No console errors

### 9.4 Security Testing

**Checklist:**
- [ ] Admin routes require authentication
- [ ] CSRF protection enabled
- [ ] SQL injection prevention (using Prisma)
- [ ] XSS prevention (React escapes by default)
- [ ] Secure headers configured
- [ ] HTTPS enforced
- [ ] Sensitive data encrypted
- [ ] Rate limiting on API routes
- [ ] Environment variables secured

**Security Headers (next.config.js):**
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

---

## 10. Deployment Checklist

### 10.1 Pre-Launch Checklist

**Content:**
- [ ] All 82 courses have unique descriptions
- [ ] All images optimized
- [ ] All links tested (no 404s)
- [ ] All forms functional
- [ ] Error pages styled
- [ ] Legal pages complete (Privacy, Terms)

**Technical:**
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Payment provider configured (Stripe)
- [ ] Email service configured (Resend)
- [ ] Analytics installed (Google Analytics)
- [ ] Error tracking (Sentry)
- [ ] Sitemap generated
- [ ] Robots.txt configured

**SEO:**
- [ ] Meta tags on all pages
- [ ] Structured data implemented
- [ ] Canonical URLs set
- [ ] Open Graph images
- [ ] Google Search Console verified
- [ ] Google Analytics connected

**Security:**
- [ ] SSL certificate installed
- [ ] Security headers configured
- [ ] Admin authentication enabled
- [ ] API rate limiting
- [ ] GDPR compliance verified

**Performance:**
- [ ] Images optimized
- [ ] Code split
- [ ] Bundle analyzed
- [ ] Caching configured
- [ ] CDN enabled

### 10.2 Post-Launch Monitoring

**Week 1:**
- [ ] Monitor error rates (Sentry)
- [ ] Check server performance
- [ ] Verify payment flow
- [ ] Test email deliverability
- [ ] Monitor page load times

**Week 2-4:**
- [ ] Analyze user behavior (Hotjar/analytics)
- [ ] Review conversion funnel
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] A/B test CTAs

**Month 2-3:**
- [ ] SEO performance review
- [ ] Keyword ranking check
- [ ] Content performance analysis
- [ ] User satisfaction survey
- [ ] Feature prioritization

---

## 11. Summary & Next Steps

### 11.1 Executive Summary

**Current State:**
- Solid MVP with Next.js 14, TypeScript, Tailwind
- 82 courses with comprehensive data structure
- 22 pages implemented
- Dutch-only (correctly implemented)
- **Major gaps:** Broken navigation, identical content, no payment processing

**Overall Assessment: 6.5/10**
- Technical foundation: 8/10
- Content quality: 3/10 (critical issue)
- User experience: 6/10
- Accessibility: 5/10
- Security: 4/10 (no admin auth)
- Performance: 7/10

### 11.2 Critical Path Forward

**Immediate (Week 1) - 4 hours**
1. Fix broken category navigation (15 min)
2. Make search functional (30 min)
3. Add VAT calculation (20 min)
4. Fix UI mismatches (45 min)
5. Add basic accessibility (30 min)

**Short-term (Month 1) - 60 hours**
1. **Create unique course content** (40 hours) - MOST CRITICAL
2. Add sort/filter improvements (15 hours)
3. Implement admin authentication (6 hours)

**Medium-term (Month 2-3) - 120 hours**
1. Database integration with Prisma (80 hours)
2. Payment processing with Stripe (40 hours)

**Long-term (Month 4+)**
1. Reviews system
2. Advanced search
3. LMS features

### 11.3 Biggest Impact Quick Wins

**Top 5 Priorities (Total: ~2 hours)**

1. **Fix category navigation** (15 min)
   - Immediate unlock of catalog discovery
   - Files: `app/page.tsx`

2. **Make search functional** (30 min)
   - Core user flow enablement
   - Files: `app/page.tsx`, `app/courses/page.tsx`

3. **Add VAT calculation** (20 min)
   - Legal compliance
   - Files: `app/checkout/page.tsx`

4. **Remove language selector** (5 min)
   - Reduces confusion
   - Files: `components/CourseBookingForm.tsx`

5. **Translate format badges** (10 min)
   - Dutch consistency
   - Files: `components/CourseCard.tsx`

### 11.4 Biggest Long-Term Impact

**Top 3 Priorities:**

1. **Unique Course Descriptions** (40 hours)
   - 10x SEO improvement
   - User trust and differentiation
   - Critical for organic growth

2. **Payment Integration** (40 hours)
   - Enable revenue
   - Complete the business model
   - Must-have for launch

3. **Database Integration** (80 hours)
   - Scalability
   - Real user data
   - Foundation for all features

### 11.5 Recommended Immediate Actions

**Today:**
1. Fix category navigation (prevent user frustration)
2. Add VAT calculation (legal requirement)

**This Week:**
1. Make search functional
2. Fix all UI mismatches
3. Add loading states
4. Implement skip-to-content

**This Month:**
1. Start unique content creation (highest priority)
2. Add admin authentication (security)
3. Implement sort/filter improvements (UX)

**This Quarter:**
1. Complete unique content for all courses
2. Database integration
3. Payment processing
4. Launch! 🚀

---

## Appendix A: File Reference Guide

### Critical Files to Update

**Homepage:**
- `app/page.tsx` - Fix search, categories, counts

**Course Catalog:**
- `app/courses/page.tsx` - Add sort, fix filters, pagination

**Course Detail:**
- `app/courses/[slug]/page.tsx` - Fix CTA, add reviews section

**Checkout:**
- `app/checkout/page.tsx` - Add VAT, promo codes, quantity

**Admin:**
- `app/admin/page.tsx` - Add authentication wrapper

**Components:**
- `components/CourseCard.tsx` - Translate badges, add duration
- `components/CourseBookingForm.tsx` - Remove language selector
- `components/Header.tsx` - Add search, active states
- `components/Footer.tsx` - Fix newsletter form

**Data:**
- `lib/data.ts` - Fix all transformation logic
- `lib/course-descriptions.ts` - **CREATE THIS** (most important)

---

## Appendix B: Technology Stack Reference

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation

**Recommended Additions:**
- Prisma (ORM)
- PostgreSQL (Database)
- NextAuth.js (Authentication)
- Stripe (Payments)
- Resend (Email)
- Vercel (Hosting)
- Sentry (Error tracking)
- Posthog (Analytics)

---

## Document End

**Report Generated:** October 16, 2025
**Pages Analyzed:** 22
**Components Reviewed:** 7
**Issues Identified:** 70+
**Recommendations Provided:** 100+

**Next Steps:** Implement Week 1 quick wins, then prioritize unique content creation.

For questions or clarifications, refer to specific section numbers and file locations throughout this report.
