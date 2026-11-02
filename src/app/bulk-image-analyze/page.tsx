'use client';

import { BulkImageAnalysis } from '@/components/BulkImageAnalysis';
import { useEffect, useState } from 'react';

export default function ImageAnalysisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    } as IntersectionObserverInit;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
      observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Bulk Image Analysis Tool',
      description:
        'Free bulk image analysis tool that evaluates image quality using advanced algorithms. Analyze brightness, contrast, sharpness, composition, noise levels, and more for multiple images at once.',
      url: 'https://marifat-maruf.vercel.app/bulk-image-analyze',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Bulk image processing',
        'Image quality assessment',
        'Composition analysis',
        'Brightness and contrast measurement',
        'Sharpness analysis',
        'Noise level detection',
        'Horizon tilt analysis',
        'Subject centering evaluation',
        'Context-aware analysis',
        '3-tier quality classification',
      ],
      author: {
        '@type': 'Person',
        name: 'Marifat Maruf',
      },
      creator: {
        '@type': 'Person',
        name: 'Marifat Maruf',
      },
      publisher: {
        '@type': 'Person',
        name: 'Marifat Maruf',
      },
      potentialAction: {
        '@type': 'UseAction',
        target: 'https://marifat-maruf.vercel.app/bulk-image-analyze',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Main Content (global ClientShell applies sidebar margin) */}
      <div className={`ui-page ${mounted ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          <section className="px-4 pb-20 pt-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <header className="ui-page-header">
                <span className="ui-eyebrow">IMAGE TOOLS / 02</span>
                <h1>Bulk Image Analysis</h1>
                <p>
                  Compare image quality across a batch with consistent metrics
                  and exportable results.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {['Free tool', 'Batch processing', 'Exportable results'].map(
                    label => (
                      <span
                        key={label}
                        className="ui-card-muted px-3 py-1 text-xs text-slate-300"
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>
              </header>
              <div className="fade-up visible">
                <BulkImageAnalysis />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
