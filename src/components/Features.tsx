'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Features = () => {
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

  const features = [
    {
      id: 1,
      title: 'AI Image Prompt Generator',
      description:
        'Create detailed, professional prompts for AI image generation tools like DALL-E, Midjourney, and Stable Diffusion. Generate stunning visuals with our comprehensive form-based interface.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/prompt-generator',
      image: '/images/prompt-generator-screenshot.jpg',
      technologies: ['React', 'Next.js', 'AI Integration', 'Form Design'],
    },
    {
      id: 2,
      title: 'AI Video Prompt Generator',
      description:
        'Generate comprehensive prompts for AI video generation platforms. Create detailed scene descriptions, camera movements, and visual effects for stunning video content.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
            clipRule="evenodd"
          />
          <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      link: '/ai-video-prompt-generator',
      image: '/images/video-prompt-generator-screenshot.jpg',
      technologies: ['Vue.js', 'Laravel', 'Video AI', 'Advanced Forms'],
    },
    {
      id: 3,
      title: 'Professional Portfolio',
      description:
        'Showcase your work with a modern, responsive portfolio website. Features project galleries, skills visualization, and professional contact forms.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/portfolio',
      image: '/images/portfolio-screenshot.jpg',
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Responsive Design',
      ],
    },
    {
      id: 4,
      title: 'Modern Web Development',
      description:
        'Full-stack web development services using modern technologies. From frontend frameworks to backend APIs, we build scalable and performant applications.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/',
      image: '/images/web-development-screenshot.jpg',
      technologies: ['React', 'Vue.js', 'Laravel', 'Node.js'],
    },
    {
      id: 5,
      title: 'UI/UX Design',
      description:
        'Create beautiful and intuitive user interfaces with modern design principles. From wireframes to high-fidelity prototypes, we design for the best user experience.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/',
      image: '/images/ui-ux-design-screenshot.jpg',
      technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    },
    {
      id: 6,
      title: 'Performance Optimization',
      description:
        'Optimize your web applications for speed and efficiency. From code splitting to image optimization, we ensure your sites load fast and perform well.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      link: '/',
      image: '/images/performance-optimization-screenshot.jpg',
      technologies: ['Webpack', 'Lighthouse', 'Core Web Vitals', 'Caching'],
    },
  ];

  return (
    <section
      id="two"
      ref={sectionRef}
      className="wrapper style3 fade-up py-20 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
        <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
          Our Services & Tools
        </h2>
        <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
          Discover our comprehensive suite of AI-powered tools and professional
          web development services. From prompt generators to full-stack
          applications, we help bring your ideas to life.
        </p>

        <div className="features grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {features.map(feature => (
            <section
              key={feature.id}
              className="glass-effect rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
            >
              {/* Screenshot Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/90 text-6xl font-bold opacity-20">
                    {feature.title.charAt(0)}
                  </div>
                </div>
                {/* Placeholder for actual screenshot */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="icon major text-cyan-400">{feature.icon}</div>
                  <Link
                    href={feature.link}
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 text-sm"
                  >
                    Try it →
                  </Link>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {feature.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
                >
                  <span>Explore {feature.title}</span>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </section>
          ))}
        </div>

        <div className="actions text-center">
          <Link
            href="/contact"
            className="button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
