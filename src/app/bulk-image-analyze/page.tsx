'use client';

import { BulkImageAnalysis } from '@/components/BulkImageAnalysis';
import Sidebar, { SidebarContext } from '@/components/Sidebar';
import { useContext, useEffect, useState } from 'react';

export default function ImageAnalysisPage() {
  const [mounted, setMounted] = useState(false);
  const { sidebarExpanded } = useContext(SidebarContext);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`min-h-screen lg:ml-64 ${mounted ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Hero Section */}
          {/* <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="fade-up visible transition-all duration-1000 ease-out">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Bulk
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {' '}
                    Image Analysis
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Analyze Bad or Good image quality using alogarithm
                </p>
              </div>
            </div>
          </section> */}

          {/* Analysis Section */}
          <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="fade-up visible transition-all duration-1000 ease-out">
                {/* SEO-friendly header */}
                <header className="text-center mb-12">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Bulk
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {' '}
                      Image Analysis
                    </span>
                  </h1>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      Free Tool
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      Batch Processing
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      Advanced Metrics
                    </span>
                  </div>
                </header>

                <BulkImageAnalysis />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
