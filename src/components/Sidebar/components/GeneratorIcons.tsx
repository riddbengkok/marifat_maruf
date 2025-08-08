import React from 'react';

interface GeneratorIconProps {
  type: 'image' | 'video' | 'audio' | 'story' | 'teleprompter';
}

export const GeneratorIcon: React.FC<GeneratorIconProps> = ({ type }) => {
  const icons = {
    image: (
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
      </svg>
    ),
    video: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="5" width="15" height="14" rx="2" />
        <polygon points="16 7 22 12 16 17 16 7" />
      </svg>
    ),
    audio: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="11" width="4" height="10" rx="1" />
        <rect x="9" y="7" width="4" height="14" rx="1" />
        <rect x="15" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    story: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    ),
    teleprompter: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="7" width="18" height="10" rx="2" />
        <rect x="6" y="10" width="12" height="4" rx="1" />
        <path d="M9 16v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2" />
      </svg>
    ),
  };

  return icons[type] || null;
};
