'use client';

import { ImageAnalysisDemo } from '@/components/ImageAnalysisDemo';
import Sidebar, { SidebarContext } from '@/components/Sidebar';
import { useContext, useEffect, useState } from 'react';

export default function ImageAnalysisPage() {
  const [mounted, setMounted] = useState(false);
  const { isOpen, sidebarExpanded } = useContext(SidebarContext);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`min-h-screen lg:ml-64 ${mounted ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="fade-up visible transition-all duration-1000 ease-out">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Technical
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {' '}
                    Image Analysis
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Analyze image quality using advanced algorithms including Rule
                  of Thirds, Golden Ratio, symmetry, and composition analysis.
                  Get detailed metrics and professional insights about your
                  images.
                </p>
              </div>
            </div>
          </section>

          {/* Analysis Section */}
          <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="fade-up visible transition-all duration-1000 ease-out">
                <ImageAnalysisDemo />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="fade-up visible transition-all duration-1000 ease-out">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Advanced Analysis Features
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Professional-grade image quality assessment with
                    comprehensive metrics
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Basic Quality */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="text-cyan-400 text-2xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Basic Quality Metrics
                    </h3>
                    <p className="text-gray-300">
                      Analyze brightness, contrast, sharpness, and color balance
                      using advanced algorithms.
                    </p>
                  </div>

                  {/* Composition Analysis */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="text-purple-400 text-2xl mb-4">🎨</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Composition Analysis
                    </h3>
                    <p className="text-gray-300">
                      Rule of Thirds, Golden Ratio, symmetry, leading lines, and
                      horizon placement.
                    </p>
                  </div>

                  {/* Professional Tips */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300">
                    <div className="text-pink-400 text-2xl mb-4">💡</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Professional Tips
                    </h3>
                    <p className="text-gray-300">
                      Get actionable feedback and suggestions to improve your
                      photography skills.
                    </p>
                  </div>

                  {/* Local Analysis */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                    <div className="text-green-400 text-2xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Fast Local Analysis
                    </h3>
                    <p className="text-gray-300">
                      Free, instant analysis using your browser. No API keys
                      required.
                    </p>
                  </div>

                  {/* Vision API */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <div className="text-blue-400 text-2xl mb-4">🤖</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      AI-Powered Analysis
                    </h3>
                    <p className="text-gray-300">
                      Google Vision API for advanced features like object
                      detection and safe search.
                    </p>
                  </div>

                  {/* Real-time Processing */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="text-yellow-400 text-2xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Real-time Processing
                    </h3>
                    <p className="text-gray-300">
                      Instant results with detailed breakdowns and professional
                      insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
