'use client';

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

          {/* Get in Touch Section */}
          <section className="mb-12">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                I&apos;m always interested in new opportunities and exciting
                projects. Let&apos;s discuss how we can bring your ideas to
                life.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-hyperspace-h2 font-bold text-white mb-6">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Whether you have a project in mind, want to discuss
                      collaboration opportunities, or just want to say hello,
                      I&apos;d love to hear from you.
                    </p>

                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Email</h4>
                          <a
                            href="mailto:riddbengkok@gmail.com"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                          >
                            riddbengkok@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Location</h4>
                          <p className="text-gray-300">Yogyakarta, Indonesia</p>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            Availability
                          </h4>
                          <p className="text-gray-300">
                            Available for new projects
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links & Quick Actions */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-hyperspace-h2 font-bold text-white mb-6">
                      Connect With Me
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Follow me on social media to stay updated with my latest
                      work and insights.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/marifat-maruf-370714b5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            LinkedIn
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Professional Network
                          </p>
                        </div>
                      </a>

                      {/* GitHub */}
                      <a
                        href="https://github.com/riddbengkok"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            GitHub
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Code Repository
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-hyperspace-h2 font-bold text-white mb-6">
                      Quick Actions
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="/marifat_maruf_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            Download Resume
                          </h4>
                          <p className="text-gray-400 text-sm">
                            View my professional experience
                          </p>
                        </div>
                      </a>

                      <Link
                        href="/portfolio"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            View Portfolio
                          </h4>
                          <p className="text-gray-400 text-sm">
                            See my detailed work
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <p className="text-xl text-gray-300 mb-8">
                  Ready to start a project together?
                </p>
                <a
                  href="mailto:riddbengkok@gmail.com"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send Me a Message
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
