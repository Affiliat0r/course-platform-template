# TechTrain Visual Site Tour

**Local URL**: http://localhost:3000
**Server Status**: ✅ Running
**Last Updated**: 2025-10-21

---

## 🏠 Homepage (`/`)

**URL**: http://localhost:3000/

### What You'll See:

#### Hero Section
- **Large heading**: "Beheers IT-Vaardigheden" (Master IT Skills)
- **Subheading**: Professional IT training description in Dutch
- **Search bar**: Prominent search for courses
- **CTA Button**: "Bekijk Cursussen" (View Courses) in blue

#### Featured Courses Section
- **4 Course Cards** displayed in a grid
- Each card shows:
  - Course image
  - Category badge (Frontend, Backend, etc.)
  - Course title in Dutch
  - Short description
  - Price (€999 - €1.799)
  - Duration and format icons
  - "Bekijk Details" button

#### Course Categories
- **5 Category Cards**:
  - Frontend Development
  - Backend Development
  - DevOps & Cloud
  - AI & Machine Learning
  - Cybersecurity
- Each with icon, title, course count, and description

#### "How It Works" Section
- 3-step process explanation
- Icons for each step
- Professional layout

#### Footer
- Company information
- Course categories
- Support links
- Social media icons

---

## 📚 Course Catalog (`/courses`)

**URL**: http://localhost:3000/courses

### What You'll See:

#### Desktop Layout:

**Left Sidebar (FilterPanel)**:
- **Category Filter**:
  - All categories checkbox
  - Frontend, Backend, DevOps, Cloud, AI/ML, Cybersecurity, Data Science, Mobile
- **Training Format**:
  - Classroom
  - Virtual
  - Corporate
  - Private
- **Language**:
  - Dutch (NL)
  - English (EN)
- **Price Range** slider
- **Clear Filters** button at bottom

**Main Content Area**:
- **Search Bar**: "Zoek cursussen..." (Search courses)
- **Sort Bar**: Sort by date, price, popularity
- **Course Grid**:
  - 79 courses displayed in cards
  - 3-4 columns on desktop
  - Each card shows all course details
  - Hover effects

#### Mobile Layout:
- **FilterDrawer**: Bottom sheet that slides up
- **Floating "Filters" button** at bottom of screen
- **Course Grid**: 1-2 columns
- Touch-friendly cards

### Course Categories Visible:
- Frontend (React, Vue, Angular)
- Backend (Node.js, Python, Java)
- DevOps (Docker, Kubernetes, CI/CD)
- Cloud (AWS, Azure, Google Cloud)
- AI/ML (Machine Learning, Deep Learning)
- Cybersecurity (Ethical Hacking, Security)
- And more...

---

## 📖 Course Detail Page (`/courses/[slug]`)

**Example URL**: http://localhost:3000/courses/react-development

### What You'll See:

#### Course Header
- **Breadcrumbs**: Home > Cursussen > Course Name
- **Large Course Title**: e.g., "React Development"
- **Hero Image**: Course banner

#### Course Info Card (Right Sidebar)
- **Price**: e.g., €1.299
- **Duration**: e.g., "3 dagen"
- **Format**: Classroom / Virtual / Corporate
- **Language**: Nederlands
- **Rating**: 4.5/5 stars
- **Instructor Photo & Name**

#### Course Booking Form
- **Schedule Selection**:
  - 3 upcoming dates displayed
  - Date, location, availability
  - "Selecteer" button for each
- **Selected Date Highlight**: Blue border
- **Language Choice**: Dutch/English toggle
- **Price Display**: Updates based on selection
- **Enroll Button**:
  - If not logged in: "Inloggen om in te schrijven"
  - If logged in: "Nu inschrijven" (€1.299)
  - If already enrolled: "Al ingeschreven" (disabled)

#### Main Content Tabs
1. **Overview**:
   - Course description (in Dutch)
   - What you'll learn (bullet points)

2. **Syllabus**:
   - Day-by-day breakdown
   - Topics covered each day
   - Hands-on exercises mentioned

3. **Prerequisites**:
   - Required knowledge
   - Recommended experience

4. **Target Audience**:
   - Who should take this course
   - Career paths

5. **Instructor**:
   - Instructor bio
   - Qualifications
   - Photo

#### Related Courses Section
- 2-3 similar courses
- Same card design as homepage

---

## 🛒 Checkout Page (`/checkout`)

**URL**: http://localhost:3000/checkout?courseId=X&scheduleId=Y&amount=1299

### What You'll See:

#### Header
- "Betaling" (Payment) title
- Progress indicator (if multi-step)

#### Main Form Area
- **Payment Method Section**:
  - Stripe Elements form
  - Credit/Debit card option
  - iDEAL option (Dutch bank transfer)
  - Card number input
  - Expiry date input
  - CVC input
  - Postal code input

#### Order Summary Sidebar
- **Course Details**:
  - Course title
  - Start date
  - Location
- **Price Breakdown**:
  - Subtotal
  - Tax (if applicable)
  - Total in large text
- **Pay Button**:
  - "Betaal €1.299" (Pay €1.299)
  - Disabled until form valid
  - Loading state when processing

#### Security Notice
- "Veilige betaling via Stripe" message
- SSL/encryption icons

---

## 🔐 Login Page (`/login`)

**URL**: http://localhost:3000/login

### What You'll See:

#### Centered Card
- **Title**: "Welkom Terug" (Welcome Back)
- **Subtitle**: "Log in op je TechTrain account"

#### Login Form
- **Email Input**: "jij@voorbeeld.nl" placeholder
- **Password Input**: Masked with ••••••••
- **Remember Me Checkbox**
- **Forgot Password Link**: Right-aligned
- **Login Button**: Full width, blue
  - Normal: "Inloggen"
  - Loading: "Bezig met inloggen..."
- **Register Link**: "Nog geen account? Registreren"

#### Error Display
- Red banner at top if login fails
- "Ongeldige inloggegevens" or other Dutch error

#### Success Message
- Green banner if coming from registration
- "Account aangemaakt! Controleer je e-mail."

---

## ✍️ Register Page (`/register`)

**URL**: http://localhost:3000/register

### What You'll See:

#### Centered Card
- **Title**: "Maak een Account" (Create an Account)
- **Subtitle**: Account creation message

#### Registration Form
- **Full Name Input**
- **Email Input**
- **Password Input**:
  - With strength indicator
  - Minimum 8 characters
- **Confirm Password Input**
- **Terms Checkbox**: Required
- **Register Button**: Full width, blue
  - Normal: "Registreren"
  - Loading: "Account aanmaken..."
- **Login Link**: "Al een account? Inloggen"

#### Validation
- Real-time validation
- Dutch error messages
- Red borders on invalid fields

---

## 👤 User Dashboard (`/dashboard`)

**URL**: http://localhost:3000/dashboard
**Access**: Requires login

### What You'll See:

#### Header
- **Title**: "Mijn Dashboard"
- **Welcome Message**: "Welkom terug, [Name]!"

#### Sidebar Navigation
- Overzicht (Overview) - Active
- Mijn Cursussen (My Courses)
- Verlanglijst (Wishlist)
- Profiel (Profile)

#### Overview Tab
- **Statistics Cards**:
  - Actieve Cursussen: Count
  - Voltooide Cursussen: Count
  - Certificaten: Count

#### Upcoming Courses Section
- List of enrolled courses
- Course title, start date, location
- Status badge (Active, Upcoming)

---

## 📋 My Enrollments (`/dashboard/enrollments`)

**URL**: http://localhost:3000/dashboard/enrollments

### What You'll See:

#### Page Header
- **Title**: "Mijn Cursussen"

#### Empty State (No Enrollments)
- Centered card with message
- "Je bent nog niet ingeschreven voor cursussen"
- "Bekijk Cursussen" button

#### With Enrollments:
- **Course Cards**:
  - Course title (clickable)
  - Start date with calendar icon
  - Location with map pin icon
  - Status badge (Actief, Voltooid, Geannuleerd)
  - **Actions**:
    - "Annuleren" button (if active)
    - Disabled if already started/completed

---

## ℹ️ Other Pages

### About Page (`/about`)
**URL**: http://localhost:3000/about
- Company mission
- Values
- Team information
- Statistics

### Contact Page (`/contact`)
**URL**: http://localhost:3000/contact
- Contact form
- Email: info@techtrain.nl
- Phone number
- Address in Amsterdam
- Business hours

### Corporate Training (`/corporate`)
**URL**: http://localhost:3000/corporate
- Corporate training packages
- Custom solutions
- Group pricing
- Contact form

### FAQ Page (`/faq`)
**URL**: http://localhost:3000/faq
- Common questions
- Accordion-style answers
- Categories: General, Payments, Courses, Certificates

### Privacy Policy (`/privacy`)
**URL**: http://localhost:3000/privacy
- GDPR-compliant privacy policy
- Data handling
- Cookie policy
- User rights

### Terms & Conditions (`/terms`)
**URL**: http://localhost:3000/terms
- Service terms
- Refund policy
- User responsibilities

### Admin Dashboard (`/admin`)
**URL**: http://localhost:3000/admin
**Access**: Admin only

- Course management
- Order overview
- User statistics
- Revenue charts

---

## 🎨 Design & UX

### Color Scheme
- **Primary**: Blue (#2563EB) - Buttons, links, accents
- **Secondary**: Gray shades - Text, backgrounds
- **Success**: Green - Confirmations
- **Error**: Red - Validation errors
- **Warning**: Yellow - Alerts

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes
- **Body**: Regular, readable sizes (16px-18px)
- **All text in Dutch**

### Components Used
- **Cards**: White background, subtle shadow, rounded corners
- **Buttons**:
  - Primary: Blue background, white text
  - Secondary: White background, blue border
  - Outline: Transparent with border
- **Inputs**: Border, focus state, error state
- **Badges**: Small, rounded, colored by category
- **Icons**: Lucide React icons throughout

### Responsive Design
- **Desktop**: Full layout with sidebars
- **Tablet**: Adjusted grid (2 columns)
- **Mobile**:
  - Single column
  - Hamburger menu
  - Bottom filter drawer
  - Touch-friendly buttons

### Loading States
- Skeleton loaders on initial page load
- Spinner on button actions
- "Laden..." (Loading) text
- Pulse animation on placeholders

### Error Handling
- Red banners for errors
- Inline field validation
- "404 Not Found" page for invalid routes
- Error boundary for crashes

---

## 🚀 Interactive Features

### Working Features:
1. **Search**:
   - Real-time course search
   - Filters by title and description
   - Instant results

2. **Filtering**:
   - Multiple filters work together
   - Updates course count
   - Clear filters button

3. **Sorting**:
   - By date (newest/oldest)
   - By price (low/high, high/low)
   - By popularity

4. **Authentication**:
   - Login/logout
   - Session persistence
   - Protected routes

5. **Enrollment**:
   - Check enrollment status
   - Create enrollment
   - View in dashboard
   - Cancel enrollment

6. **Payment**:
   - Stripe checkout
   - iDEAL and cards
   - Payment confirmation

### Visual Feedback:
- Hover effects on cards and buttons
- Active states on filters
- Selected state on dates
- Loading spinners
- Success/error messages
- Toast notifications (if implemented)

---

## 📱 Mobile Experience

### Tested On:
- Mobile Chrome (responsive mode)
- 375px width (iPhone SE)
- 768px width (iPad)

### Mobile-Specific Features:
- **Hamburger Menu**:
  - Top right corner
  - Slides in from right
  - Overlay background

- **Filter Drawer**:
  - Bottom sheet
  - Swipe to open/close
  - Fixed "Filters" button

- **Touch Targets**:
  - Minimum 44px height
  - Adequate spacing
  - Easy to tap

- **Typography**:
  - Scales down appropriately
  - Still readable at small sizes

---

## 🎭 User Flows

### 1. Browse and Enroll Flow:
```
Homepage →
  Click "Bekijk Cursussen" →
    Course Catalog (filter/search) →
      Click course card →
        Course Detail Page →
          Select date →
            Click "Nu inschrijven" →
              (If not logged in) Login →
                Back to course →
                  Select date again →
                    Redirect to Checkout →
                      Enter payment →
                        Success page →
                          Dashboard
```

### 2. Register Flow:
```
Any page →
  Click "Registreren" →
    Fill form →
      Submit →
        Email sent →
          Check email →
            Click confirmation link →
              Login →
                Dashboard
```

### 3. View Enrollments Flow:
```
Login →
  Dashboard →
    Click "Mijn Cursussen" →
      View list →
        Click course title →
          Course detail page
```

---

## 🔍 What to Test

### Visual Testing:
- [ ] All images load correctly
- [ ] No layout shifts
- [ ] Consistent spacing
- [ ] Colors match design
- [ ] Typography looks good
- [ ] Icons render correctly

### Functional Testing:
- [ ] Search works
- [ ] Filters work
- [ ] Sorting works
- [ ] Login works
- [ ] Registration works
- [ ] Enrollment works
- [ ] Payment form loads
- [ ] Dashboard shows data
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] Filter drawer works (mobile)

### Dutch Language:
- [ ] All UI text in Dutch
- [ ] All error messages in Dutch
- [ ] All validation messages in Dutch
- [ ] All email subjects in Dutch
- [ ] Date formatting (nl-NL)
- [ ] Currency formatting (€)

---

## 🖼️ Screenshots Checklist

To document the site, take screenshots of:

1. **Homepage**:
   - [ ] Full page scroll
   - [ ] Hero section
   - [ ] Featured courses
   - [ ] Categories

2. **Course Catalog**:
   - [ ] Desktop with sidebar
   - [ ] Mobile with filter drawer
   - [ ] Search results
   - [ ] Filtered results

3. **Course Detail**:
   - [ ] Full page
   - [ ] Booking form
   - [ ] Selected date state
   - [ ] Already enrolled state

4. **Checkout**:
   - [ ] Payment form
   - [ ] Order summary
   - [ ] Stripe Elements

5. **Dashboard**:
   - [ ] Overview
   - [ ] Enrollments list
   - [ ] Empty state

6. **Auth Pages**:
   - [ ] Login form
   - [ ] Register form
   - [ ] Error states

---

## 🎯 Next Steps

After viewing the site:

1. **Test all flows** on localhost
2. **Take screenshots** for documentation
3. **Note any visual issues**
4. **Test mobile responsiveness**
5. **Verify all Dutch text**
6. **Check console for errors**
7. **Test with real data** (create test account)

---

**🌐 Ready to view?** Open http://localhost:3000 in your browser!

**Server running**: Check background process or restart with `npm run dev`

**Having issues?** Check:
- `.env.local` file exists
- All dependencies installed (`npm install`)
- Port 3000 not in use
- No TypeScript errors (`npm run build`)

---

**Last Updated**: 2025-10-21
**Server Status**: ✅ Running on http://localhost:3000
