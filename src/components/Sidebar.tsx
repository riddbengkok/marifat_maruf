'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoogleLoginButton from './Auth/GoogleLoginButton';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'none' | null
  >(null);
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user?.uid) {
        setSubLoading(true);
        try {
          const res = await fetch(`/api/auth/register?firebaseUid=${user.uid}`);
          const data = await res.json();
          setSubscriptionStatus(data.status || 'none');
        } catch (e) {
          setSubscriptionStatus('none');
        } finally {
          setSubLoading(false);
        }
      } else {
        setSubscriptionStatus(null);
      }
    };
    fetchSubscription();
  }, [user]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const isFeaturesPage = pathname === '/features';
  const isPromptGeneratorPage = pathname === '/prompt-generator';
  const isVideoPromptGeneratorPage = pathname === '/ai-video-prompt-generator';
  const isAudioPromptGeneratorPage = pathname === '/ai-audio-prompt-generator';

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-md bg-black/20 backdrop-blur-sm border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <section
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 sidebar-bg backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-gradient">
              {isFeaturesPage
                ? 'Features'
                : isPromptGeneratorPage
                  ? 'Image Prompt Generator'
                  : isVideoPromptGeneratorPage
                    ? 'Video Prompt Generator'
                    : isAudioPromptGeneratorPage
                      ? 'Audio Prompt Generator'
                      : 'Portfolio'}
            </Link>
          </div>

          <nav className="flex-1">
            <ul className="space-y-4">
              {isFeaturesPage ? (
                // Features page navigation
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('intro')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Welcome
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('one')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Who we are
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('two')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      What we do
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('three')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Get in touch
                    </button>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      ← Back to Portfolio
                    </Link>
                  </li>
                </>
              ) : isPromptGeneratorPage ||
                isVideoPromptGeneratorPage ||
                isAudioPromptGeneratorPage ? (
                // Prompt Generator pages navigation
                <>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      ← Back to Portfolio
                    </Link>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/features"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      View Features →
                    </Link>
                  </li>
                  {isPromptGeneratorPage ? (
                    <>
                      <li>
                        <Link
                          href="/ai-video-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Video Prompt Generator →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ai-audio-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Audio Prompt Generator →
                        </Link>
                      </li>
                    </>
                  ) : isVideoPromptGeneratorPage ? (
                    <>
                      <li>
                        <Link
                          href="/prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Image Prompt Generator →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ai-audio-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Audio Prompt Generator →
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Image Prompt Generator →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ai-video-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Video Prompt Generator →
                        </Link>
                      </li>
                    </>
                  )}
                </>
              ) : (
                // Portfolio page navigation (root)
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('hero')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('about')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('skills')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Skills
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('experience')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Experience
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('education')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Education
                    </button>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/features"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      View Features →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prompt-generator"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Image Prompt Generator →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ai-video-prompt-generator"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Video Prompt Generator →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ai-audio-prompt-generator"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Audio Prompt Generator →
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Authentication Section */}
          <div className="pt-4 border-t border-white/20 mb-4">
            <div className="text-center">
              <GoogleLoginButton
                size="small"
                variant="outline"
                className="w-full"
              />
              {user && (
                <div className="mt-3 flex justify-center min-h-[32px]">
                  {subLoading ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-pulse"></span>
                      Checking subscription...
                    </span>
                  ) : subscriptionStatus === 'active' ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      Active Subscription
                    </span>
                  ) : subscriptionStatus === 'inactive' ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                      Inactive Subscription
                    </span>
                  ) : subscriptionStatus === 'none' ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                      No Subscription
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/20">
            <p className="text-sm text-gray-400">© 2024 Marifat Maruf</p>
          </div>
        </div>
      </section>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
