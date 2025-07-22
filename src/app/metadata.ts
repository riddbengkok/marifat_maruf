import { Metadata } from 'next';

// Base metadata for the site
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://marifat-maruf.vercel.app'),
  title: {
    default: 'Marifat - Frontend Web Developer & AI Tools',
    template: '%s | Marifat',
  },
  description:
    'Professional portfolio and AI prompt generator tools for creating high-quality prompts for AI image and video generation.',
  keywords: [
    'AI prompt generator',
    'text to image',
    'text to video',
    'AI art',
    'portfolio',
    'web developer',
    'frontend developer',
    'React',
    'Next.js',
    'Vue.js',
    'TypeScript',
  ],
  authors: [{ name: 'Marifat Maruf' }],
  creator: 'Marifat Maruf',
  publisher: 'Marifat Maruf',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marifat-maruf.vercel.app',
    siteName: 'Marifat',
    title: 'Marifat - Frontend Web Developer & AI Tools',
    description:
      'Professional portfolio and AI prompt generator tools for creating high-quality prompts for AI image and video generation.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marifat - Frontend Web Developer & AI Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marifat - Frontend Web Developer & AI Tools',
    description:
      'Professional portfolio and AI prompt generator tools for creating high-quality prompts for AI image and video generation.',
    images: ['/images/og-image.jpg'],
    creator: '@marifatmaruf',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// Home page metadata
export const homeMetadata: Metadata = {
  ...baseMetadata,
  title: 'Marifat - Frontend Web Developer & AI Tools',
  description:
    'Welcome to my professional portfolio showcasing web development projects, AI prompt generators, and creative solutions. Expert in React, Vue.js, and modern web technologies.',
  keywords: [
    'portfolio',
    'web developer',
    'frontend developer',
    'React developer',
    'Vue.js developer',
    'TypeScript',
    'Next.js',
    'professional portfolio',
    'web development',
    'UI/UX design',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Marifat - Frontend Web Developer & AI Tools',
    description:
      'Welcome to my professional portfolio showcasing web development projects, AI prompt generators, and creative solutions.',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'Marifat - Frontend Web Developer & AI Tools',
    description:
      'Welcome to my professional portfolio showcasing web development projects, AI prompt generators, and creative solutions.',
  },
};

// AI Video Prompt Generator metadata
export const aiVideoPromptGeneratorMetadata: Metadata = {
  ...baseMetadata,
  title: 'AI Video Prompt Generator - Create Professional Video Prompts',
  description:
    'Generate high-quality AI video prompts with our advanced tool. Create cinematic, commercial, and artistic video prompts for Runway, Pika Labs, Sora, and other AI video generators.',
  keywords: [
    'AI video prompt generator',
    'text to video',
    'video prompt',
    'AI video generation',
    'Runway ML',
    'Pika Labs',
    'Sora',
    'cinematic prompts',
    'video creation',
    'AI art',
    'prompt engineering',
    'video generation',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'AI Video Prompt Generator - Create Professional Video Prompts',
    description:
      'Generate high-quality AI video prompts with our advanced tool. Create cinematic, commercial, and artistic video prompts for Runway, Pika Labs, Sora, and other AI video generators.',
    url: 'https://marifat-maruf.vercel.app/ai-video-prompt-generator',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'AI Video Prompt Generator - Create Professional Video Prompts',
    description:
      'Generate high-quality AI video prompts with our advanced tool. Create cinematic, commercial, and artistic video prompts for Runway, Pika Labs, Sora, and other AI video generators.',
  },
  alternates: {
    canonical: 'https://marifat-maruf.vercel.app/ai-video-prompt-generator',
  },
};

// Image Prompt Generator metadata
export const imagePromptGeneratorMetadata: Metadata = {
  ...baseMetadata,
  title: 'AI Image Prompt Generator - Create Stunning Image Prompts',
  description:
    'Generate professional AI image prompts with our comprehensive tool. Create artistic, realistic, and creative image prompts for DALL-E, Midjourney, Stable Diffusion, and other AI image generators.',
  keywords: [
    'AI image prompt generator',
    'text to image',
    'image prompt',
    'AI image generation',
    'DALL-E',
    'Midjourney',
    'Stable Diffusion',
    'artistic prompts',
    'image creation',
    'AI art',
    'prompt engineering',
    'image generation',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'AI Image Prompt Generator - Create Stunning Image Prompts',
    description:
      'Generate professional AI image prompts with our comprehensive tool. Create artistic, realistic, and creative image prompts for DALL-E, Midjourney, Stable Diffusion, and other AI image generators.',
    url: 'https://marifat-maruf.vercel.app/ai-image-prompt-generator',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'AI Image Prompt Generator - Create Stunning Image Prompts',
    description:
      'Generate professional AI image prompts with our comprehensive tool. Create artistic, realistic, and creative image prompts for DALL-E, Midjourney, Stable Diffusion, and other AI image generators.',
  },
  alternates: {
    canonical: 'https://marifat-maruf.vercel.app/ai-image-prompt-generator',
  },
};

// Portfolio page metadata
export const portfolioMetadata: Metadata = {
  ...baseMetadata,
  title: 'Portfolio - Web Development Projects & Skills',
  description:
    'Explore my portfolio of web development projects, technical skills, and professional experience. Specialized in React, Vue.js, TypeScript, and modern web technologies.',
  keywords: [
    'portfolio',
    'web development projects',
    'React projects',
    'Vue.js projects',
    'TypeScript',
    'frontend development',
    'web developer portfolio',
    'UI/UX design',
    'professional experience',
    'technical skills',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Portfolio - Web Development Projects & Skills',
    description:
      'Explore my portfolio of web development projects, technical skills, and professional experience.',
    url: 'https://marifat-maruf.vercel.app/portfolio',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'Portfolio - Web Development Projects & Skills',
    description:
      'Explore my portfolio of web development projects, technical skills, and professional experience.',
  },
  alternates: {
    canonical: 'https://marifat-maruf.vercel.app/portfolio',
  },
};

// Features page metadata
export const featuresMetadata: Metadata = {
  ...baseMetadata,
  title: 'Features - AI Tools & Web Development Services',
  description:
    'Discover our AI prompt generators, web development services, and creative tools. Professional solutions for AI art generation, web development, and digital innovation.',
  keywords: [
    'AI tools',
    'prompt generators',
    'web development services',
    'AI art tools',
    'creative tools',
    'digital innovation',
    'web solutions',
    'AI services',
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Features - AI Tools & Web Development Services',
    description:
      'Discover our AI prompt generators, web development services, and creative tools.',
    url: 'https://marifat-maruf.vercel.app/features',
  },
  twitter: {
    ...baseMetadata.twitter,
    title: 'Features - AI Tools & Web Development Services',
    description:
      'Discover our AI prompt generators, web development services, and creative tools.',
  },
  alternates: {
    canonical: 'https://marifat-maruf.vercel.app/features',
  },
};
