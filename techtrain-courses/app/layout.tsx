import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserContext";
import { validateEnv } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

// Validate environment variables on server startup (skip during build)
if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
  validateEnv();
}

export const metadata: Metadata = {
  title: {
    template: '%s | TechTrain',
    default: 'TechTrain - IT Cursussen & Training'
  },
  description: 'Professionele IT-cursussen en trainingen in Nederland. Python, JavaScript, Cloud, DevOps, AI en meer.',
  icons: {
    icon: [
      { url: '/images/branding/favicon.svg', type: 'image/svg+xml' }
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <UserProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Spring naar hoofdinhoud
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
