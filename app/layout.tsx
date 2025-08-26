import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'flowstacks.dev - Premium Mobile App Development | Cape Town',
  description: 'We Build Apps That Convert. Premium mobile app development, web platforms, and digital solutions for startups and enterprises in Cape Town, South Africa.',
  keywords: 'mobile app development, web development, Cape Town, South Africa, React Native, Flutter, startup, fintech, healthtech',
  authors: [{ name: 'flowstacks.dev' }],
  creator: 'flowstacks.dev',
  publisher: 'flowstacks.dev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flowstacks.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'flowstacks.dev - We Build Apps That Convert',
    description: 'Premium mobile app development studio in Cape Town. Specializing in React Native, Flutter, and conversion-optimized digital solutions.',
    url: 'https://flowstacks.dev',
    siteName: 'flowstacks.dev',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'flowstacks.dev - Mobile App Development',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'flowstacks.dev - We Build Apps That Convert',
    description: 'Premium mobile app development studio in Cape Town.',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00d4ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="flowstacks.dev" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#00d4ff" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  )
}
