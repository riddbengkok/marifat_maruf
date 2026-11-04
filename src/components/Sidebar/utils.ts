// Helper to get/set Snap token in localStorage
export const getStoredSnapToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('snap_token') || null;
  }
  return null;
};

export const setStoredSnapToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('snap_token', token);
    } else {
      localStorage.removeItem('snap_token');
    }
  }
};

// Get subscribe price from env
export const getSubscribePrice = () => {
  return typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE
    ? parseInt(process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE, 10)
    : 10000;
};

// Navigation helpers
export const scrollToSection = (
  sectionId: string,
  setIsOpen: (open: boolean) => void
) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Section links are also shown on standalone tool pages, where the
    // portfolio anchors are not mounted. Return to the portfolio and let the
    // browser resolve the selected section from the URL hash.
    window.location.href = `/#${sectionId}`;
  }
  setIsOpen(false);
};

// Generator links configuration (without JSX)
export const GENERATOR_LINKS_CONFIG: Array<{
  href: string;
  labelKey: string;
  iconType: 'image' | 'video' | 'audio' | 'story';
}> = [
  {
    href: '/ai-image-prompt-generator',
    labelKey: 'ai.imageGenerator',
    iconType: 'image',
  },
  {
    href: '/ai-video-prompt-generator',
    labelKey: 'ai.videoGenerator',
    iconType: 'video',
  },
  {
    href: '/ai-audio-prompt-generator',
    labelKey: 'ai.audioGenerator',
    iconType: 'audio',
  },
  {
    href: '/ai-story-prompt-generator',
    labelKey: 'ai.storyGenerator',
    iconType: 'story',
  },
];

// Brand/title lookup for cleaner logic
export const PAGE_TITLES: Record<string, string> = {
  '/features': 'Features',
  '/ai-image-prompt-generator': 'Image Prompt Generator',
  '/ai-video-prompt-generator': 'Video Prompt Generator',
  '/ai-audio-prompt-generator': 'Audio Prompt Generator',
  '/ai-story-prompt-generator': 'Story Prompt Generator',
  '/image-analysis': 'Image Analysis',
};
