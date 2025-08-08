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
        <li>
          <button
            onClick={() => handleScrollToSection('about')}
            className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollToSection('skills')}
            className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
          >
            Skills
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollToSection('experience')}
            className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
          >
            Experience
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollToSection('projects')}
            className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
          >
            Projects
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollToSection('education')}
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
        {/* AI Generator Links - Minimal, outline icons, no arrow, highlight active */}
        {[
          ...generatorLinks,
          {
            href: '/teleprompter',
            label: 'Teleprompter',
            icon: <GeneratorIcon type="teleprompter" />,
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
