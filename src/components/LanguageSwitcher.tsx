'use client';

import { Language, useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'sidebar';
}

export default function LanguageSwitcher({
  className = '',
  variant = 'default',
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  if (variant === 'sidebar') {
    return (
      <div className={`relative ${className}`}>
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
          aria-label="Change language"
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button> */}

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-white/5 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    language === lang.code
                      ? 'bg-cyan-900/20 text-cyan-300'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-medium">{lang.name}</div>
                    <div className="text-xs text-gray-400">
                      {lang.code.toUpperCase()}
                    </div>
                  </div>
                  {language === lang.code && (
                    <svg
                      className="w-4 h-4 ml-auto text-cyan-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Default variant for header/navbar
  return (
    <div className={`relative ${className}`}>
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-200 text-white hover:text-cyan-300"
        aria-label="Change language"
      >
        <span className="text-sm">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
      </button> */}

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-50">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-white/5 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  language === lang.code
                    ? 'bg-cyan-900/20 text-cyan-300'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div>
                  <div className="text-sm font-medium">{lang.name}</div>
                  <div className="text-xs text-gray-400">
                    {lang.code.toUpperCase()}
                  </div>
                </div>
                {language === lang.code && (
                  <svg
                    className="w-4 h-4 ml-auto text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
