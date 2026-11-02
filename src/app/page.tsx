'use client';

import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/sections/HeroSection';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  achievements,
  certifications,
  education,
  experience,
  projects,
} from '@/lib/projectsData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link: string;
  category: string;
  placeholderColor: string;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.add('loaded');
    }, 100);

    // Intersection Observer for fade-up animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
      observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`min-h-screen ${isLoaded ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Hero Section */}
          <HeroSection scrollToSection={scrollToSection} />

          {/* About Section */}
          <section
            id="about"
            className="relative py-24 border-t border-white/[0.08] bg-[#090d16]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  {t('about.title') || 'About Me'}
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  Bridging the gap between robust architectural engineering and
                  refined, responsive user experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left - Authentic Narrative */}
                <div className="lg:col-span-6 space-y-6 text-slate-300 leading-relaxed font-normal">
                  <p className="text-base sm:text-lg">
                    {t('about.intro1') ||
                      'Focused on web application development with over 6 years of hands-on production engineering.'}
                  </p>
                  <p className="text-base text-slate-400">
                    {t('about.intro2') ||
                      'I specialize in finding the sweet spot between high performance, clean state management, and elegant interfaces. Every system I build is tuned for speed, accessibility, and maintainability.'}
                  </p>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      ✓
                    </div>
                    <div className="text-xs text-slate-300">
                      <strong className="text-white block font-medium">
                        Production-Grade Standards
                      </strong>
                      Adheres to strict code quality gates, 100% type safety,
                      and zero unnecessary bundle overhead.
                    </div>
                  </div>
                </div>

                {/* Right - Core Pillars Cards */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      01 / ARCHITECTURE
                    </span>
                    <h3 className="text-base font-semibold text-white mb-1.5">
                      {t('about.frontendDev') || 'Frontend Engineering'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Next.js, React, Vue, and Nuxt single-page and
                      server-rendered web applications with optimized routing.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      02 / CRAFT
                    </span>
                    <h3 className="text-base font-semibold text-white mb-1.5">
                      {t('about.uiux') || 'UI & Design Systems'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tailwind CSS, design tokens, micro-interactions,
                      responsive typography, and design-to-code parity.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      03 / FULLSTACK
                    </span>
                    <h3 className="text-base font-semibold text-white mb-1.5">
                      {t('about.fullstack') || 'Backend & Integrations'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      REST & GraphQL APIs, Node.js, Laravel, Prisma ORM,
                      PostgreSQL, and secure payment integrations.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      04 / PERFORMANCE
                    </span>
                    <h3 className="text-base font-semibold text-white mb-1.5">
                      {t('about.optimization') || 'Optimization'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Bundle tree-shaking, sub-second TTFB, Lighthouse scores,
                      and accessible keyboard navigation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section - Domain Clustered Matrix (No Fake RPG Percentages) */}
          <section
            id="skills"
            className="relative py-24 border-t border-white/[0.08] bg-[#0c101a]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  {t('skills.title') || 'Technical Competence'}
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  Production-tested technologies and tooling applied across 6+
                  years of shipping web software.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Domain 1: Frontend Core */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-slate-400">
                        STACK / 01
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                        Core
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Frontend Frameworks
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Component architecture, SSR/SSG, and reactive state
                      management.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React.js',
                      'Next.js',
                      'Vue.js',
                      'Nuxt.js',
                      'TypeScript',
                      'JavaScript',
                    ].map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Domain 2: Styling & Design Systems */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-slate-400">
                        STACK / 02
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">
                        UI/UX
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Design Engineering
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Token systems, accessible primitives, and responsive
                      styling.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Tailwind CSS',
                      'CSS3 / Modules',
                      'Responsive Layout',
                      'Figma',
                      'UI/UX Specs',
                      'HTML5',
                    ].map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Domain 3: Fullstack & APIs */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-slate-400">
                        STACK / 03
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">
                        Services
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Backend & Data
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Data modeling, API services, database queries, and
                      middleware.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Laravel',
                      'PHP',
                      'Node.js',
                      'Prisma ORM',
                      'MySQL',
                      'REST APIs',
                      'Firebase',
                    ].map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Domain 4: Tooling & DevOps */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-slate-400">
                        STACK / 04
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">
                        Infra
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Tooling & Delivery
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Version control, deployment pipelines, containerization,
                      and builds.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Git / GitHub',
                      'Docker',
                      'Vercel',
                      'Vite / Webpack',
                      'CI/CD Workflows',
                      'Performance',
                    ].map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section - Minimalist Timeline Architecture */}
          <section
            id="experience"
            className="relative py-24 border-t border-white/[0.08] bg-[#090d16]"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  {t('experience.title') || 'Work Experience'}
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  {t('experience.subtitle') ||
                    'Career path and software engineering accomplishments.'}
                </p>
              </div>

              <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-16">
                {experience.map((job, index) => (
                  <div key={index} className="relative group">
                    {/* Architectural Timeline Pin */}
                    <span
                      className="w-3 h-3 rounded-full bg-white ring-4 ring-[#090d16] absolute -left-[31px] sm:-left-[47px] top-2"
                      aria-hidden="true"
                    />

                    {/* Job Card */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {job.position}
                          </h3>
                          <div className="text-base font-medium text-slate-300 mt-1">
                            {job.company}
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-slate-400">
                          {job.duration} • {job.location}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                        <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
                          {t('experience.keyAchievements') || 'Key Highlights'}
                        </h4>
                        <ul className="space-y-2 mt-2">
                          {job.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-sm text-slate-400 flex items-start gap-2.5"
                            >
                              <span className="text-slate-200 font-bold">
                                ›
                              </span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section - Curated Engineering Work */}
          <section
            id="projects"
            className="relative py-24 border-t border-white/[0.08] bg-[#0c101a]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  {t('portfolio.title') || 'Featured Projects'}
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  {t('portfolio.description') ||
                    'A selection of production web applications, design systems, and tools I have engineered.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="group rounded-2xl overflow-hidden bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.18] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Project Image Frame */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${project.image ?? '/images/pic01.jpg'})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded bg-slate-950/80 backdrop-blur-md text-slate-300 border border-white/[0.1]">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                          {t(`projects.${project.id}.title`, project.title)}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                          {t(
                            `projects.${project.id}.description`,
                            project.description
                          )}
                        </p>

                        {/* Technologies Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.04] border border-white/[0.06] text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-4">
                      {project.link.includes('figma.com') ? (
                        <button
                          type="button"
                          onClick={() => openModal(project)}
                          className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                        >
                          <svg
                            className="w-3.5 h-3.5 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>
                            {t('portfolio.previewDesign') || 'Preview Spec'}
                          </span>
                        </button>
                      ) : (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                        >
                          <span>Live Product</span>
                          <span className="ml-1">↗</span>
                        </a>
                      )}

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Inspect →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education & Certifications Section */}
          <section
            id="education"
            className="relative py-24 border-t border-white/[0.08] bg-[#090d16]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Education & Certifications
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  Academic foundation and verified professional technical
                  qualifications.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Education */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/[0.08]">
                    <span className="text-xs font-mono text-slate-400">
                      ACADEMICS
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Degrees & Programs
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]"
                      >
                        <h4 className="text-base font-bold text-white mb-1">
                          {edu.degree}
                        </h4>
                        <div className="text-sm font-medium text-slate-300 mb-2">
                          {edu.institution}
                        </div>
                        <div className="text-xs font-mono text-slate-400 mb-3">
                          {edu.duration} • {edu.location}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/[0.08]">
                    <span className="text-xs font-mono text-slate-400">
                      CREDENTIALS
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Professional Licenses
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]"
                      >
                        <h4 className="text-base font-bold text-white mb-1">
                          {cert.name}
                        </h4>
                        <div className="text-sm font-medium text-slate-300 mb-2">
                          {cert.issuer}
                        </div>
                        <div className="text-xs font-mono text-slate-400 mb-3">
                          {cert.date}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Achievements Section */}
          <section
            id="achievements"
            className="relative py-24 border-t border-white/[0.08] bg-[#0c101a]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Key Achievements
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  Highlights and verifiable milestones from my engineering
                  journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) =>
                  typeof achievement === 'string' ? (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex items-center justify-center text-center"
                    >
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between"
                    >
                      <h3 className="text-base font-bold text-white mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Contact Section - High-Craft Connection Hub */}
          <section
            id="contact"
            className="relative py-24 border-t border-white/[0.08] bg-[#090d16]"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Get In Touch
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                  Available for senior frontend roles, full-stack application
                  development, and technical consulting.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Contact Information & Channels */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/[0.08]">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Direct Communication
                    </h3>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                      Whether you have an upcoming project, architecture
                      questions, or a permanent role, reach out directly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Card */}
                      <a
                        href="mailto:riddtwo@gmail.com"
                        className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors block group"
                      >
                        <span className="text-xs font-mono text-slate-400 block mb-1">
                          EMAIL
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-slate-200">
                          riddtwo@gmail.com
                        </span>
                      </a>

                      {/* Location Card */}
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <span className="text-xs font-mono text-slate-400 block mb-1">
                          LOCATION
                        </span>
                        <span className="text-sm font-semibold text-white">
                          Yogyakarta, Indonesia
                        </span>
                      </div>

                      {/* LinkedIn Card */}
                      <a
                        href="https://www.linkedin.com/in/marifat-maruf-370714b5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors block group"
                      >
                        <span className="text-xs font-mono text-slate-400 block mb-1">
                          NETWORK
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-slate-200">
                          LinkedIn Profile ↗
                        </span>
                      </a>

                      {/* GitHub Card */}
                      <a
                        href="https://github.com/riddbengkok"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors block group"
                      >
                        <span className="text-xs font-mono text-slate-400 block mb-1">
                          CODE
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-slate-200">
                          github.com/riddbengkok ↗
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Action Resources */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Verified Documents
                      </h3>
                      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        Download my full engineering résumé or inspect the
                        comprehensive interactive portfolio.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <a
                        href="/marifat_maruf_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-between p-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium text-slate-200 transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <span>📄</span>
                          <span>Download Professional Résumé</span>
                        </span>
                        <span className="text-xs font-mono text-slate-400 group-hover:text-white">
                          PDF ↗
                        </span>
                      </a>

                      <Link
                        href="/portfolio"
                        className="w-full inline-flex items-center justify-between p-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium text-slate-200 transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <span>📁</span>
                          <span>Browse Interactive Showcase</span>
                        </span>
                        <span className="text-xs font-mono text-slate-400 group-hover:text-white">
                          View ↗
                        </span>
                      </Link>

                      <a
                        href="mailto:riddtwo@gmail.com"
                        className="w-full inline-flex items-center justify-center p-3.5 rounded-lg bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-colors shadow-sm mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        Send an Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </>
  );
}
