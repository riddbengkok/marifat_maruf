import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bulk Image Analysis Tool - Quality Assessment for Multiple Images',
  description:
    'Free bulk image analysis tool that evaluates image quality using advanced algorithms. Analyze brightness, contrast, sharpness, composition, noise levels, and more for multiple images at once. Perfect for photographers, content creators, and digital marketers.',
  keywords: [
    'bulk image analysis',
    'image quality assessment',
    'photo analysis tool',
    'image processing',
    'photography quality checker',
    'image composition analysis',
    'rule of thirds checker',
    'image sharpness analyzer',
    'contrast analysis tool',
    'brightness measurement',
    'noise level detection',
    'horizon tilt analysis',
    'subject centering tool',
    'image evaluation',
    'free image analysis',
    'batch image processing',
    'image quality metrics',
    'photography tools',
    'content creation tools',
    'digital marketing tools',
    'image optimization',
    'visual content analysis',
    'image assessment algorithm',
    'photo quality score',
    'image analysis software',
  ],
  openGraph: {
    title: 'Bulk Image Analysis Tool - Quality Assessment for Multiple Images',
    description:
      'Free bulk image analysis tool that evaluates image quality using advanced algorithms. Analyze brightness, contrast, sharpness, composition, noise levels, and more for multiple images at once.',
    type: 'website',
    url: 'https://marifat-maruf.vercel.app/bulk-image-analyze',
    siteName: 'Marifat - Image Analysis Tools',
    images: [
      {
        url: '/images/bulk-image-analysis-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bulk Image Analysis Tool - Quality Assessment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulk Image Analysis Tool - Quality Assessment',
    description:
      'Free tool to analyze image quality for multiple images using advanced algorithms.',
    images: ['/images/bulk-image-analysis-og.jpg'],
  },
  alternates: {
    canonical: 'https://marifat-maruf.vercel.app/bulk-image-analyze',
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

export default function ImageAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
