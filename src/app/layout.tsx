import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Course Platform | Learn and Grow',
    template: '%s | Course Platform',
  },
  description: 'Discover and enroll in courses to advance your skills',
  keywords: ['online courses', 'education', 'learning platform', 'skills development'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Course Platform',
    title: 'Course Platform | Learn and Grow',
    description: 'Discover and enroll in courses to advance your skills',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Course Platform | Learn and Grow',
    description: 'Discover and enroll in courses to advance your skills',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
