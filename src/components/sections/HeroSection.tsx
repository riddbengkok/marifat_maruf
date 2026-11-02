'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type HeroSectionProps = {
  scrollToSection: (sectionId: string) => void;
};

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#090d16] text-slate-100 overflow-hidden pt-20 pb-16"
    >
      {/* Architectural subtle background grid - no blurred gradient blobs */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Top right language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Column - Core Identity & Proposition (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left">
            {/* Live Availability Pill */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for new projects & engineering roles</span>
              </div>
            </div>

            {/* Avatar & Headline */}
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white/[0.06] border border-white/[0.12] shadow-2xl flex-shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/images/rifat2.JPG"
                      alt="Marifat Maruf"
                      fill
                      className="object-cover"
                      sizes="96px"
                      priority
                    />
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none">
                    {t('hero.name') || 'Marifat Maruf'}
                  </h1>
                  <p className="text-lg sm:text-xl font-medium text-slate-300 mt-2 tracking-tight">
                    {t('hero.title') ||
                      'Senior Frontend & Web Application Engineer'}
                  </p>
                </div>
              </div>

              {/* Punchy, high-signal value statement */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Crafting performant, resilient, and beautifully engineered web
                applications. 6+ years of production experience specializing in
                React, Next.js, Vue, and TypeScript architecture.
              </p>
            </div>

            {/* Tactile Hallmark-standard Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-slate-950 hover:bg-slate-100 active:scale-[0.98] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-sm"
              >
                <span>{t('portfolio.title') || 'View Projects'}</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.1] active:scale-[0.98] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <span>{t('contact.title') || 'Get in Touch'}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                <span>About Me</span>
              </button>
            </div>

            {/* Key Fact Line */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-semibold text-sm">6+</span>
                <span>Years Production Experience</span>
              </div>
              <span className="text-white/[0.15]">•</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-semibold text-sm">
                  10+
                </span>
                <span>Shipped Applications</span>
              </div>
              <span className="text-white/[0.15]">•</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-200 font-semibold text-sm">
                  100%
                </span>
                <span>Type-Safe & Scalable</span>
              </div>
            </div>
          </div>

          {/* Right Column - Signature Engineering Dossier (5 cols) */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto">
            <div className="relative rounded-2xl bg-slate-900/70 border border-white/[0.1] p-6 shadow-2xl backdrop-blur-xl">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-white/[0.15]" />
                  <span className="w-3 h-3 rounded-full bg-white/[0.15]" />
                  <span className="w-3 h-3 rounded-full bg-white/[0.15]" />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  marifat.engineer.json
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  active
                </span>
              </div>

              {/* Engineering Profile Matrix */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400">
                    {'// Primary Capabilities'}
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-slate-200">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">
                        CORE
                      </span>
                      <span className="font-semibold text-slate-100">
                        React & Next.js
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">
                        ECOSYSTEM
                      </span>
                      <span className="font-semibold text-slate-100">
                        Vue & Nuxt.js
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">
                        LANGUAGES
                      </span>
                      <span className="font-semibold text-slate-100">
                        TypeScript / ES6+
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px]">
                        STYLING & ARCH
                      </span>
                      <span className="font-semibold text-slate-100">
                        Tailwind & CSS
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <span className="text-slate-400">
                    {'// Recent Shipped Work'}
                  </span>
                  <div className="mt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-medium text-slate-200 group-hover:text-white">
                          BubbleGum Template UI
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Design system & component library
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-medium text-slate-200 group-hover:text-white">
                          Nuxt Admin Dashboard
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Full-featured management platform
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-medium text-slate-200 group-hover:text-white">
                          Bulk Image Analysis Tool
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Algorithmic quality assessment
                        </div>
                      </div>
                      <span className="text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
