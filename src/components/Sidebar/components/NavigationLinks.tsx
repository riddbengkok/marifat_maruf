'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import React, { memo } from 'react';
import { GENERATOR_LINKS_CONFIG, scrollToSection } from '../utils';
import { GeneratorIcon } from './GeneratorIcons';

interface NavigationLinksProps {
  pathname: string;
  setIsOpen: (open: boolean) => void;
  isFeaturesPage: boolean;
  isGeneratorPage: boolean;
}

export const NavigationLinks = memo<NavigationLinksProps>(
  ({ pathname, setIsOpen, isFeaturesPage, isGeneratorPage }) => {
    const { t } = useLanguage();
    const generatorLinks = React.useMemo(
      () =>
        GENERATOR_LINKS_CONFIG.map(config => ({
          href: config.href,
          label: t(config.labelKey),
          icon: <GeneratorIcon type={config.iconType} />,
        })),
      [t]
    );

    const handleScrollToSection = React.useCallback(
      (sectionId: string) => scrollToSection(sectionId, setIsOpen),
      [setIsOpen]
    );

    if (isFeaturesPage) {
      return (
        <div className="space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3">
            Features Page
          </div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleScrollToSection('intro')}
                className="w-full text-left text-slate-300 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
              >
                Welcome
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollToSection('one')}
                className="w-full text-left text-slate-300 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
              >
                Who we are
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollToSection('two')}
                className="w-full text-left text-slate-300 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
              >
                What we do
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollToSection('three')}
                className="w-full text-left text-slate-300 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
              >
                Get in touch
              </button>
            </li>
            <li className="pt-3 border-t border-white/[0.08]">
              <Link
                href="/"
                className="w-full text-left text-slate-400 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium block"
                onClick={() => setIsOpen(false)}
              >
                ← Back to Portfolio
              </Link>
            </li>
          </ul>
        </div>
      );
    }

    if (isGeneratorPage) {
      return (
        <div className="space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3">
            AI Tools
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="w-full text-left text-slate-400 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium block"
                onClick={() => setIsOpen(false)}
              >
                ← Back to Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="w-full text-left text-slate-400 hover:text-white hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-colors text-sm font-medium block"
                onClick={() => setIsOpen(false)}
              >
                View Features Suite →
              </Link>
            </li>
            <li className="pt-2 border-t border-white/[0.08]" />
            {generatorLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg border transition-colors text-sm ${
                    pathname === link.href
                      ? 'border-white/[0.2] bg-white/[0.08] text-white font-medium'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  <span
                    className="inline-block mt-0.5 text-slate-400"
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                  <span className="leading-tight text-xs font-normal">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Portfolio page navigation (root & /portfolio)
    // The featured portfolio page uses its own section IDs. Keep the sidebar
    // destinations aligned with those anchors when it is open on /portfolio.
    const portfolioSectionIds: Record<string, string> = {
      hero: 'intro',
      about: 'showcase-skills',
      skills: 'showcase-skills',
      experience: 'showcase-experience',
      projects: 'showcase-projects',
      education: 'showcase-credentials',
      achievements: 'showcase-credentials',
      contact: 'showcase-contact',
    };
    const sectionIds =
      pathname === '/portfolio' ? portfolioSectionIds : undefined;
    const sections = [
      { id: 'hero', label: 'Overview' },
      { id: 'about', label: 'Architecture & Craft' },
      { id: 'skills', label: 'Technical Stack' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Featured Projects' },
      { id: 'education', label: 'Education & Certs' },
      { id: 'achievements', label: 'Milestones' },
      { id: 'contact', label: 'Get In Touch' },
    ];

    const aiTools = [
      ...generatorLinks,
      {
        href: '/teleprompter',
        label: 'Teleprompter',
        icon: <GeneratorIcon type="teleprompter" />,
      },
      {
        href: '/image-analysis',
        label: 'Image Analysis',
        icon: (
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5-4 4-7 7" />
          </svg>
        ),
      },
      {
        href: '/bulk-image-analyze',
        label: 'Bulk Analysis',
        icon: (
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="9" y="9" width="3" height="3" />
            <rect x="14" y="9" width="3" height="3" />
            <rect x="9" y="14" width="3" height="3" />
            <rect x="14" y="14" width="3" height="3" />
          </svg>
        ),
      },
    ];

    return (
      <div className="space-y-6">
        {/* Sections on Page */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 mb-2">
            Sections
          </div>
          <ul className="space-y-0.5">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() =>
                    handleScrollToSection(sectionIds?.[section.id] ?? section.id)
                  }
                  className="w-full text-left text-slate-300 hover:text-white hover:bg-white/[0.05] px-3 py-1.5 rounded-lg transition-colors text-xs font-normal flex items-center justify-between group"
                >
                  <span>{section.label}</span>
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    #{section.id}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Studio & Apps */}
        <div className="pt-4 border-t border-white/[0.08]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>Studio Tools</span>
            <Link
              href="/features"
              onClick={() => setIsOpen(false)}
              className="hover:text-slate-200 transition-colors"
            >
              All →
            </Link>
          </div>
          <ul className="space-y-1">
            {aiTools.map(tool => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-colors text-xs ${
                    pathname === tool.href
                      ? 'border-white/[0.2] bg-white/[0.08] text-white font-medium'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === tool.href ? 'page' : undefined}
                >
                  <span
                    className="inline-block text-slate-400"
                    aria-hidden="true"
                  >
                    {tool.icon}
                  </span>
                  <span className="truncate">{tool.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

NavigationLinks.displayName = 'NavigationLinks';
