'use client';

import ProjectModal from '@/components/ProjectModal';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import {
  certifications,
  education,
  experience,
  projects,
} from '@/lib/projectsData';
import Image from 'next/image';
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

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Sidebar />

      <div className={`min-h-screen ${isLoaded ? 'loaded' : ''}`}>
        {/* Showcase Header */}
        <section
          id="intro"
          className="relative min-h-[75vh] flex items-center justify-center border-b border-white/[0.08] bg-[#070a12] px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-slate-300">
                Interactive Engineering Showcase
              </span>
            </div>

            {/* Profile Avatar Frame */}
            <div className="flex justify-center mb-8">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl bg-slate-900">
                <Image
                  src="/images/rifat2.JPG"
                  alt="Marifat Maruf"
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              Marifat Maruf
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium mb-6">
              Frontend & Full-Stack Systems Engineer
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Specialized in production-grade React, Next.js, and TypeScript
              architectures. Designed with zero synthetic fluff, high-contrast
              dark surfaces, and strict performance metrics.
            </p>

            {/* Tactile Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('showcase-projects')}
                className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Inspect Projects
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('showcase-experience')}
                className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Career Timeline
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Domain Matrix */}
        <section
          id="showcase-skills"
          className="py-24 border-b border-white/[0.08] bg-[#090d16]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Technical Stack & Domain Competence
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-normal">
                Verifiable stack capabilities applied across 6+ years of
                shipping software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  01 / CORE
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  Frontend
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Component architecture, server rendering, reactive state.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'React.js',
                    'Next.js',
                    'Vue.js',
                    'Nuxt.js',
                    'TypeScript',
                  ].map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  02 / CRAFT
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  UI & Tokens
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Design token systems, accessible layout, responsive
                  typography.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Tailwind CSS',
                    'CSS Modules',
                    'Figma',
                    'UI Specs',
                    'HTML5',
                  ].map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  03 / BACKEND
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  Services & Data
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  REST APIs, database queries, and robust auth integrations.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Laravel',
                    'PHP',
                    'Node.js',
                    'Prisma ORM',
                    'MySQL',
                    'REST',
                  ].map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  04 / INFRA
                </span>
                <h3 className="text-base font-bold text-white mb-2">Tooling</h3>
                <p className="text-xs text-slate-400 mb-6">
                  CI/CD workflows, build optimizations, and deployment.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Git / GitHub', 'Docker', 'Vercel', 'Vite', 'CI/CD'].map(
                    item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-200"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="showcase-experience"
          className="py-24 border-b border-white/[0.08] bg-[#0c101a]"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Career Timeline
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-normal">
                Engineering roles and key deliverables across fintech and SaaS
                platforms.
              </p>
            </div>

            <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
              {experience.map((job, index) => (
                <div key={index} className="relative group">
                  <span
                    className="w-3 h-3 rounded-full bg-white ring-4 ring-[#0c101a] absolute -left-[31px] sm:-left-[47px] top-2"
                    aria-hidden="true"
                  />
                  <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.16] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {job.position}
                        </h3>
                        <div className="text-base font-medium text-slate-300 mt-0.5">
                          {job.company}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {job.duration} • {job.location}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {job.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                      <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                        Key Highlights
                      </div>
                      <ul className="space-y-1.5 mt-2">
                        {job.achievements.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-400 flex items-start gap-2"
                          >
                            <span className="text-slate-200 font-bold">›</span>
                            <span>{item}</span>
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

        {/* Featured Projects Section */}
        <section
          id="showcase-projects"
          className="py-24 border-b border-white/[0.08] bg-[#090d16]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Featured Engineering Work
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-normal">
                Curated production web applications and design engineering
                specs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden bg-slate-900/60 border border-white/[0.08] hover:border-white/[0.18] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${project.image ?? '/images/pic01.jpg'})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded bg-slate-950/80 backdrop-blur-md text-slate-300 border border-white/[0.1]">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>
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

                  <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-4">
                    {project.link.includes('figma.com') ? (
                      <button
                        type="button"
                        onClick={() => openModal(project)}
                        className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-white transition-colors"
                      >
                        <span>Preview Spec</span>
                      </button>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-white transition-colors"
                      >
                        <span>Live Product ↗</span>
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

        {/* Education & Achievements */}
        <section
          id="showcase-credentials"
          className="py-24 border-b border-white/[0.08] bg-[#0c101a]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">
                    ACADEMICS
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Degrees & Programs
                  </h3>
                </div>
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]"
                  >
                    <h4 className="text-base font-bold text-white mb-1">
                      {edu.degree}
                    </h4>
                    <div className="text-sm font-medium text-slate-300 mb-1">
                      {edu.institution}
                    </div>
                    <div className="text-xs font-mono text-slate-400 mb-3">
                      {edu.duration} • {edu.location}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">
                    CREDENTIALS
                  </span>
                  <h3 className="text-lg font-bold text-white">Licenses</h3>
                </div>
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08]"
                  >
                    <h4 className="text-base font-bold text-white mb-1">
                      {cert.name}
                    </h4>
                    <div className="text-sm font-medium text-slate-300 mb-1">
                      {cert.issuer}
                    </div>
                    <div className="text-xs font-mono text-slate-400 mb-3">
                      {cert.date}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="showcase-contact" className="py-24 bg-[#070a12]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Direct Engineering Consultation
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto mb-10 font-normal">
              Available for senior frontend contract architecture, UI
              engineering, and fullstack Next.js applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:riddtwo@gmail.com"
                className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-colors shadow-sm"
              >
                Send Email (riddtwo@gmail.com)
              </a>
              <a
                href="/marifat_maruf_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm transition-colors"
              >
                Download PDF Résumé ↗
              </a>
              <a
                href="https://github.com/riddbengkok"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                GitHub Profile ↗
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
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
