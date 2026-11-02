'use client';

import { ImageAnalysisDemo } from '@/components/ImageAnalysisDemo';
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

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Main Content (global ClientShell applies sidebar margin) */}
      <div className={`ui-page ${mounted ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          <section className="px-4 pb-12 pt-16 sm:px-6 lg:px-8">
            <header className="ui-page-header">
              <span className="ui-eyebrow">IMAGE TOOLS / 01</span>
              <h1>Technical Image Analysis</h1>
              <p>
                Review image quality, composition, and visual balance with
                practical metrics and clear recommendations.
              </p>
            </header>
          </section>

          <section className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="fade-up visible">
                <ImageAnalysisDemo />
              </div>
            </div>
          </section>

          <section className="border-t border-white/[0.08] bg-[#0c101a] px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <header className="ui-page-header">
                <span className="ui-eyebrow">WHAT IT MEASURES</span>
                <h2>Analysis features</h2>
                <p>
                  A focused set of image checks to help you understand what is
                  working and where to improve.
                </p>
              </header>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Basic Quality */}
                <article className="ui-card p-6">
                  <span className="ui-eyebrow">01 / QUALITY</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    Basic Quality Metrics
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Analyze brightness, contrast, sharpness, and color balance
                    using advanced algorithms.
                  </p>
                </article>

                {/* Composition Analysis */}
                <article className="ui-card p-6">
                  <span className="ui-eyebrow">02 / COMPOSITION</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    Composition Analysis
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Rule of Thirds, Golden Ratio, symmetry, leading lines, and
                    horizon placement.
                  </p>
                </article>

                {/* Professional Tips */}
                <article className="ui-card p-6">
                  <span className="ui-eyebrow">03 / GUIDANCE</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    Professional Tips
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Get actionable feedback and suggestions to improve your
                    photography skills.
                  </p>
                </article>

                {/* Local Analysis */}
                <article className="ui-card p-6">
                  <span className="ui-eyebrow">04 / LOCAL</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    Fast Local Analysis
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Free, instant analysis using your browser. No API keys
                    required.
                  </p>
                </article>

                {/* Vision API */}
                <article className="ui-card p-6">
                  <span className="ui-eyebrow">05 / VISION API</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    AI-Powered Analysis
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Google Vision API for advanced features like object
                    detection and safe search.
                  </p>
                </article>

                {/* Real-time Processing */}
                <article className="ui-card p-6">
                  <span className="ui-eyebrow">06 / FEEDBACK</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    Real-time Processing
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Instant results with detailed breakdowns and professional
                    insights.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
