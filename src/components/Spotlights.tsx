'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Spotlights = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const spotlights = [
    {
      id: 1,
      title: 'AI Video Prompt Generator',
      description:
        'Enables you to generate cinematic, commercial, or artistic video prompts for AI video tools (like Runway, Pika Labs, or Sora).',
      image: '/images/ai-prompt-image-coffe.png', // Replace with a relevant image if available
      position: 'center center',
      link: '/ai-video-prompt-generator',
    },
    {
      id: 2,
      title: 'AI Image Prompt Generator',
      description:
        'Helps you craft detailed, creative prompts for AI image generation tools (like DALL-E, Midjourney, or Stable Diffusion).',
      image: '/images/ai-prompt-image-crocodile.png', // Replace with a relevant image if available
      position: 'top center',
      link: '/ai-image-prompt-generator',
    },
    {
      id: 3,
      title: 'AI Audio Prompt Generator',
      description:
        'Lets you create prompts for AI audio/music generation, including soundscapes, voiceovers, and music tracks.',
      image: '/images/ai-prompt-image-sound.png', // Replace with a relevant image if available
      position: 'center center',
      link: '/ai-audio-prompt-generator',
    },
    {
      id: 4, // Changed from 3 to 4 to ensure uniqueness
      title: 'AI Script/Story Prompt Generator (Coming Soon)',
      description:
        'Assists in generating story or script prompts for AI writing tools.',
      image: '/images/ai-prompt-video-story.png', // Replace with a relevant image if available
      position: 'center center',
      link: '/ai-script-prompt-generator',
    },
  ];

  return (
    <section
      id="one"
      ref={sectionRef}
      className="wrapper style2 spotlights fade-up"
    >
      {spotlights.map(spotlight => (
        <section
          key={spotlight.id}
          className="flex flex-col lg:flex-row min-h-screen"
        >
          {/* Image */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <div className="relative h-64 lg:h-full">
              <Image
                src={spotlight.image}
                alt={spotlight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 flex items-center p-8 lg:p-16 bg-gradient-to-br from-gray-900 to-black">
            <div className="inner max-w-lg">
              <h2 className="text-hyperspace-h1 font-bold mb-6 text-gradient">
                {spotlight.title}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {spotlight.description}
              </p>
              <div className="actions">
                <Link
                  href={spotlight.link}
                  className="button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
};

export default Spotlights;
