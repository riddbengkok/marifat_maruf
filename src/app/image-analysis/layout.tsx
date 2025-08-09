import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Analysis - Professional Quality Assessment Tool',
  description:
    'Analyze image quality using advanced algorithms including Rule of Thirds, Golden Ratio, symmetry, and composition analysis. Get detailed metrics and professional insights about your images.',
  keywords:
    'image analysis, quality assessment, composition analysis, rule of thirds, golden ratio, photography, image processing',
  openGraph: {
    title: 'Image Analysis - Professional Quality Assessment Tool',
    description:
      'Analyze image quality using advanced algorithms including Rule of Thirds, Golden Ratio, symmetry, and composition analysis.',
    type: 'website',
  },
};

export default function ImageAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
