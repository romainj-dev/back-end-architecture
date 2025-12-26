import type React from 'react'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Geist } from 'next/font/google'
import '@/styles/globals.css'
import { QueryProvider } from '@/components/providers/query-provider'
import { SessionProvider } from '@/components/providers/session-provider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

// <CHANGE> Updated metadata for ApplyMate
export const metadata: Metadata = {
  title: 'ApplyMate - Smarter Job Applications Powered by AI',
  description:
    'Generate tailored resumes and cover letters that pass AI recruiter filters. Track all your applications in one place.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        <SessionProvider>
          <Suspense fallback={null}>
            <QueryProvider>{children}</QueryProvider>
          </Suspense>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
