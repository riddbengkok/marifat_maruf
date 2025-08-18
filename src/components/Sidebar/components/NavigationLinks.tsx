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
        <>
          <li>
            <button
              onClick={() => handleScrollToSection('intro')}
              className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
            >
              Welcome
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection('one')}
              className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
            >
              Who we are
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection('two')}
              className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
            >
              What we do
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection('three')}
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
      );
    }

    if (isGeneratorPage) {
      return (
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
          {generatorLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-start gap-2 px-3 py-2 rounded border transition-colors text-base ${
                  pathname === link.href
                    ? 'border-cyan-400 bg-cyan-900/10 text-cyan-200 font-semibold'
                    : 'border-transparent text-gray-300 hover:border-cyan-700 hover:bg-cyan-900/10 hover:text-cyan-100'
                }`}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <span className="inline-block mt-0.5" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="leading-tight text-sm text-left">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </>
      );
    }

    // Portfolio page navigation (root)
    return (
      <>
        <li>
          <button
            onClick={() => handleScrollToSection('hero')}
            className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
          >
            Home
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
        {/* AI Generator Links - Minimal, outline icons, no arrow, highlight active */}
        {[
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
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5-4 4-7 7" />
                <path d="M9 9h.01" />
              </svg>
            ),
          },
          {
            href: '/bulk-image-analyze',
            label: 'Bulk Image Analysis',
            icon: (
              <svg
                width="20"
                height="20"
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
                <path d="M21 15l-5-5-4 4-7 7" />
              </svg>
            ),
          },
        ].map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-start gap-2 px-3 py-2 rounded border transition-colors text-base ${
                pathname === link.href
                  ? 'border-cyan-400 bg-cyan-900/10 text-cyan-200 font-semibold'
                  : 'border-transparent text-gray-300 hover:border-cyan-700 hover:bg-cyan-900/10 hover:text-cyan-100'
              }`}
              onClick={() => setIsOpen(false)}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              <span className="inline-block mt-0.5" aria-hidden="true">
                {link.icon}
              </span>
              <span className="leading-tight text-sm text-left">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </>
    );
  }
);

NavigationLinks.displayName = 'NavigationLinks';
