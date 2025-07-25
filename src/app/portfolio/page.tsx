'use client';

import ProjectModal from '@/components/ProjectModal';
import Sidebar from '@/components/Sidebar';
import {
  achievements,
  certifications,
  education,
  experience,
  projects,
  skills,
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

const Portfolio = () => {
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
      <Sidebar />
      <div className={`min-h-screen lg:ml-64 ${isLoaded ? 'loaded' : ''}`}>
        {/* Hero Section */}
        <section
          id="intro"
          className="wrapper style1 fullscreen fade-up min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>

          <div className="inner relative z-10 text-center px-4 lg:px-8">
            <h1 className="text-hyperspace-h1 font-bold mb-6 text-gradient">
              Marifat Maruf
            </h1>

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/images/rifat.jpg"
                  alt="Marifat Maruf"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority
                />
              </div>
            </div>

            <h2 className="text-hyperspace-h2 font-semibold mb-4">
              Frontend Web Developer
            </h2>
            <p className="text-hyperspace-intro text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Obsessed with finding the sweet spot between beauty, performance,
              and efficiency. I design solutions that are powerful without
              wasting unnecessary energy. Focused on web application
              development, I specialize in React.js, Vue.js, and modern frontend
              technologies with 6+ years of experience.
            </p>
            <div className="actions space-x-4">
              <button
                onClick={() => scrollToSection('experience')}
                className="button scrolly bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="button scrolly bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Projects
              </button>
              <Link
                href="/"
                className="button bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Back Home
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="wrapper style2 fade-up py-20 bg-gradient-to-br from-gray-900 to-black"
        >
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              My technical skills and expertise across various domains of
              software development and design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map(skill => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">
                      {skill.name}
                    </h3>
                    <span className="text-cyan-400 font-medium">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900"
        >
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              My journey in software development, from freelance work to leading
              teams at fintech companies.
            </p>

            <div className="space-y-12">
              {experience.map((job, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
                  )}

                  <div className="flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                        />
                      </svg>
                    </div>

                    {/* Job details */}
                    <div className="flex-1 glass-effect rounded-xl p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {job.position}
                          </h3>
                          <p className="text-xl text-cyan-400 font-semibold">
                            {job.company}
                          </p>
                        </div>
                        <div className="text-right mt-2 lg:mt-0">
                          <p className="text-gray-300 font-medium">
                            {job.duration}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {job.location}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {job.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="text-gray-300 text-sm flex items-start"
                            >
                              <span className="text-cyan-400 mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="wrapper style3 fade-up py-20">
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              A collection of my best work showcasing creativity, technical
              skills, and problem-solving abilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl glass-effect hover:transform hover:scale-105 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.placeholderColor} opacity-80`}
                    ></div>

                    {/* Project Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/90 text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                      </div>
                    </div>

                    {/* Project Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold text-lg drop-shadow-lg">
                        {project.title}
                      </h4>
                    </div>

                    {/* Preview Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => openModal(project)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 border border-white/30"
                      >
                        <svg
                          className="w-4 h-4"
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
                        <span>Preview Design</span>
                      </button>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-cyan-400 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => openModal(project)}
                        className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200 inline-flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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
                        Preview
                      </button>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200 inline-flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Open in Figma →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications Section */}
        <section
          id="education"
          className="wrapper style2 fade-up py-20 bg-gradient-to-br from-gray-900 to-black"
        >
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
              Education & Certifications
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              My academic background and professional certifications that
              validate my expertise.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Education */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">
                  Education
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="glass-effect rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">
                            {edu.degree}
                          </h4>
                          <p className="text-lg text-cyan-400 font-semibold mb-2">
                            {edu.institution}
                          </p>
                          <p className="text-gray-300 text-sm mb-2">
                            {edu.duration} • {edu.location}
                          </p>
                          <p className="text-gray-300 mb-3">
                            {edu.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {edu.relevantCourses.map((course, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">
                  Certifications
                </h3>
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="glass-effect rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">
                            {cert.name}
                          </h4>
                          <p className="text-lg text-cyan-400 font-semibold mb-2">
                            {cert.issuer}
                          </p>
                          <p className="text-gray-300 text-sm mb-2">
                            {cert.year}
                          </p>
                          <p className="text-gray-300">{cert.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="wrapper style3 fade-up py-20">
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
              Key Achievements
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              Notable accomplishments and milestones throughout my professional
              journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) =>
                typeof achievement === 'string' ? (
                  <div
                    key={index}
                    className="glass-effect rounded-xl p-6 text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {achievement}
                    </p>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="glass-effect rounded-xl p-6 text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300">{achievement.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900"
        >
          <div className="inner max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-hyperspace-h1 font-bold mb-6 text-gradient">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              I&apos;m always interested in new opportunities and exciting
              projects. Let&apos;s discuss how we can bring your ideas to life.
            </p>

            {/* Professional Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://www.linkedin.com/in/marifat-maruf-370714b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href="mailto:riddbengkok@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Email
              </a>
              <a
                href="https://github.com/riddbengkok"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View GitHub
              </a>
            </div>

            <div className="actions space-x-4">
              <Link
                href="/#three"
                className="button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </Link>
              <a
                href="/marifat_maruf_resume.pdf"
                className="button bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default Portfolio;
