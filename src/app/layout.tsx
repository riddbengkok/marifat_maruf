import type { Metadata } from 'next';
import { Source_Code_Pro, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { homeMetadata } from './metadata';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

const sourceCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code',
  display: 'swap',
});

export const metadata: Metadata = homeMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="google-site-verification"
          content="XInmL2TthX8e4l9fRcn16-tjUSkfA7PxDggMi_XC6y0"
        />
      </head>
      <body className={`${sourceSans.variable} ${sourceCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
