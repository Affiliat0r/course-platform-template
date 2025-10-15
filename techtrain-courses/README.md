# TechTrain - IT Courses Platform MVP

A modern, full-featured IT training courses e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### User-Facing Features
- **Homepage** - Hero section, featured courses, categories, and "How it Works"
- **Course Catalog** - Browse courses with advanced filtering (category, format, language)
- **Course Details** - Comprehensive course information with booking functionality
- **Checkout Flow** - Multi-step checkout with billing and payment options
- **About Us** - Company information and values
- **Contact** - Contact form and business information
- **Login** - User authentication interface

### Admin Features
- **Dashboard** - Overview with key metrics and analytics
- **Course Management** - Add, edit, and manage courses
- **Order Management** - View and manage customer orders
- **User Management** - (Placeholder for future development)

### Technical Features
- ✅ Responsive design (mobile-first)
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Form validation with React Hook Form + Zod
- ✅ Image optimization with Next.js Image
- ✅ SEO-friendly with Next.js metadata
- ✅ Component-based architecture
- ✅ Mock data for demonstration

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Utils:** clsx for conditional classes

## 📁 Project Structure

```
techtrain-courses/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── checkout/          # Checkout flow
│   ├── contact/           # Contact page
│   ├── courses/           # Course catalog and details
│   │   └── [slug]/       # Dynamic course pages
│   ├── login/             # Login page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI primitives (Button, Input, Card)
│   ├── CourseCard.tsx    # Course card component
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Footer
├── lib/                   # Utility functions
│   ├── data.ts           # Mock course data
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
│   └── index.ts          # Core types
└── public/               # Static assets

```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd techtrain-courses
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📄 Available Pages

- **/** - Homepage
- **/courses** - Course catalog with filters
- **/courses/[slug]** - Individual course details
- **/checkout** - Checkout and payment
- **/admin** - Admin dashboard
- **/about** - About us
- **/contact** - Contact form
- **/login** - Login page

## 🎨 Design System

### Colors
- **Primary:** Blue (#2563EB) - CTA buttons, links, highlights
- **Secondary:** Gray shades - Text and backgrounds
- **Success:** Green - Confirmations
- **Error:** Red - Validation errors

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold, large sizes
- **Body:** Regular, readable sizes

### Components
- **Button:** Primary, Secondary, Outline variants
- **Input:** With label, error states, and validation
- **Card:** Container with shadow and border
- **CourseCard:** Specialized card for course display

## 🔐 Authentication & Payment

Currently, the authentication and payment features are in **demo mode**:
- Login form validates but doesn't authenticate
- Checkout processes but doesn't charge

### To implement real functionality:
1. **Authentication:** Integrate NextAuth.js or similar
2. **Payment:** Integrate Stripe or Mollie payment gateway
3. **Database:** Connect PostgreSQL or similar database

## 📊 Mock Data

The application includes mock data for:
- 6 sample IT courses across different categories
- Course schedules with multiple dates
- Instructor information
- Sample orders for admin dashboard

## 🌐 Multi-language Support (Future)

The application is designed for Dutch/English bilingual support:
- Language switcher in header (UI only)
- Course language filtering
- Ready for i18n integration

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🧪 Testing

To add testing:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- **AWS:** Use AWS Amplify or EC2
- **Azure:** Use Azure App Service
- **Docker:** Create Dockerfile for containerization

## 📝 Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=your_api_url
STRIPE_PUBLIC_KEY=your_stripe_key
DATABASE_URL=your_database_url
```

## 🔄 Future Enhancements (Phase 2+)

- [ ] User authentication with NextAuth.js
- [ ] Real payment integration (Stripe/Mollie)
- [ ] Database integration (PostgreSQL)
- [ ] User reviews and ratings
- [ ] Course comparison tool
- [ ] Email notifications (SendGrid/Resend)
- [ ] Advanced analytics
- [ ] Certificate generation
- [ ] Learning Management System features
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the TechTrain team

## 📞 Support

For support, email support@techtrain.com or visit our contact page.

---

**Note:** This is an MVP (Minimum Viable Product) demonstrating core functionality. Authentication, payment processing, and data persistence require additional implementation for production use.
