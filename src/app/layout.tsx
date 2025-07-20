import type { Metadata } from 'next'
import { Source_Code_Pro, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

const sourceCode = Source_Code_Pro({ 
  subsets: ['latin'],
  variable: '--font-source-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hyperspace - Next.js',
  description: 'A modern Next.js implementation of the HTML5UP Hyperspace template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${sourceCode.variable}`}>
        {children}
      </body>
    </html>
  )
} 