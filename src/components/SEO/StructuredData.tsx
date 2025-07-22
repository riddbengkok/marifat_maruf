import Script from 'next/script';

interface StructuredDataProps {
  type:
    | 'video-generator'
    | 'image-generator'
    | 'audio-generator'
    | 'portfolio'
    | 'home';
  title: string;
  description: string;
  url: string;
}

export default function StructuredData({
  type,
  title,
  description,
  url,
}: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      description: description,
      url: url,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web Browser',
      author: {
        '@type': 'Person',
        name: 'Marifat Maruf',
        url: 'https://marifat-maruf.vercel.app',
      },
      creator: {
        '@type': 'Person',
        name: 'Marifat Maruf',
        url: 'https://marifat-maruf.vercel.app',
      },
      publisher: {
        '@type': 'Person',
        name: 'Marifat Maruf',
        url: 'https://marifat-maruf.vercel.app',
      },
      dateCreated: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      inLanguage: 'en-US',
      isAccessibleForFree: true,
    };

    switch (type) {
      case 'video-generator':
        return {
          ...baseData,
          '@type': 'WebApplication',
          name: 'AI Video Prompt Generator',
          description:
            'Generate high-quality AI video prompts for Runway, Pika Labs, Sora, and other AI video generators.',
          applicationCategory: 'MultimediaApplication',
          featureList: [
            'Video prompt generation',
            'Cinematic style options',
            'Camera movement settings',
            'Video duration control',
            'Frame rate selection',
            'Transition effects',
            'Professional prompt templates',
          ],
          screenshot:
            'https://marifat-maruf.vercel.app/images/video-generator-screenshot.jpg',
          softwareVersion: '1.0.0',
        };

      case 'image-generator':
        return {
          ...baseData,
          '@type': 'WebApplication',
          name: 'AI Image Prompt Generator',
          description:
            'Generate professional AI image prompts for DALL-E, Midjourney, Stable Diffusion, and other AI image generators.',
          applicationCategory: 'MultimediaApplication',
          featureList: [
            'Image prompt generation',
            'Artistic style options',
            'Lighting and composition settings',
            'Color palette selection',
            'Texture and material options',
            'Professional prompt templates',
            'Multiple AI model support',
          ],
          screenshot:
            'https://marifat-maruf.vercel.app/images/image-generator-screenshot.jpg',
          softwareVersion: '1.0.0',
        };

      case 'audio-generator':
        return {
          ...baseData,
          '@type': 'WebApplication',
          name: 'AI Audio Prompt Generator',
          description:
            'Generate high-quality AI audio prompts for Suno, Udio, Mubert, and other AI audio generators.',
          applicationCategory: 'MultimediaApplication',
          featureList: [
            'Audio prompt generation',
            'Musical genre selection',
            'Instrument and effects options',
            'Tempo and key settings',
            'Sound design elements',
            'Professional prompt templates',
            'Multiple AI model support',
          ],
          screenshot:
            'https://marifat-maruf.vercel.app/images/audio-generator-screenshot.jpg',
          softwareVersion: '1.0.0',
        };

      case 'portfolio':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Marifat Maruf',
          jobTitle: 'Frontend Web Developer',
          description:
            'Professional web developer specializing in React, Vue.js, TypeScript, and modern web technologies.',
          url: 'https://marifat-maruf.vercel.app',
          sameAs: [
            'https://github.com/marifatmaruf',
            'https://linkedin.com/in/marifatmaruf',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'PT. Lunaria Annua Teknologi',
          },
          knowsAbout: [
            'React.js',
            'Vue.js',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'HTML',
            'CSS',
            'Laravel',
            'Web Development',
            'Frontend Development',
            'UI/UX Design',
          ],
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Frontend Web Developer',
            description:
              'Specialized in frontend development with React and Vue.js',
          },
        };

      case 'home':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Marifat - Frontend Web Developer & AI Tools',
          description:
            'Professional portfolio and AI prompt generator tools for creating high-quality prompts for AI image and video generation.',
          url: 'https://marifat-maruf.vercel.app',
          author: {
            '@type': 'Person',
            name: 'Marifat Maruf',
            jobTitle: 'Frontend Web Developer',
            url: 'https://marifat-maruf.vercel.app',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate:
                'https://marifat-maruf.vercel.app/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        };

      default:
        return baseData;
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
