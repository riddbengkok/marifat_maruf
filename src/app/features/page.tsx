'use client';

import Contact from '@/components/Contact';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';
import Sidebar from '@/components/Sidebar';
import Spotlights from '@/components/Spotlights';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeaturesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.add('loaded');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`min-h-screen lg:ml-64 ${isLoaded ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Intro Section */}
          <section className="mb-12">
            <Intro />
          </section>

          {/* Spotlights Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gradient mb-8">
              AI Prompt Generator Suite
            </h2>
            <Spotlights />
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center text-cyan-400 mb-6">
              Platform Features
            </h2>
            <Features />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-white mb-2">
                  AI Image Prompt Generator
                </h3>
                <p className="text-gray-300 mb-2">
                  Craft detailed prompts for DALL-E, Midjourney, Stable
                  Diffusion, and more.
                </p>
                <Link
                  href="/ai-image-prompt-generator"
                  className="text-cyan-400 hover:underline text-sm"
                >
                  Try Image Prompt Generator →
                </Link>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-white mb-2">
                  AI Video Prompt Generator
                </h3>
                <p className="text-gray-300 mb-2">
                  Generate cinematic or creative video prompts for Runway, Pika
                  Labs, and more.
                </p>
                <Link
                  href="/ai-video-prompt-generator"
                  className="text-cyan-400 hover:underline text-sm"
                >
                  Try Video Prompt Generator →
                </Link>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-white mb-2">
                  AI Audio Prompt Generator
                </h3>
                <p className="text-gray-300 mb-2">
                  Create music, soundscapes, or voiceover prompts for AI audio
                  tools.
                </p>
                <Link
                  href="/ai-audio-prompt-generator"
                  className="text-cyan-400 hover:underline text-sm"
                >
                  Try Audio Prompt Generator →
                </Link>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-white mb-2">
                  AI Script/Story Prompt Generator
                </h3>
                <p className="text-gray-300 mb-2">
                  Build story and script prompts for AI writing and
                  storytelling. (Coming Soon)
                </p>
                <Link
                  href="/ai-script-prompt-generator"
                  className="text-cyan-400 hover:underline text-sm opacity-60 cursor-not-allowed"
                >
                  Script Prompt Generator
                </Link>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center text-cyan-400 mb-6">
              Contact & Support
            </h2>
            <Contact />
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
