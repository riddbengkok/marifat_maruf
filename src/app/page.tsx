'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProjectModal from '@/components/ProjectModal';
import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
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
      <div className={`min-h-screen lg:ml-64 ${isLoaded ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Hero Section - Enhanced with Icons8 icons */}
          <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900  overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Blurred code background on the right */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-800/50"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-30 blur-sm"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-4 lg:px-8 py-20">
              {/* Language Switcher - Top Right */}
              <div className="absolute top-6 right-6 z-20">
                <LanguageSwitcher />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                {/* Left Column - Profile and Content */}
                <div className="text-center lg:text-left space-y-8 animate-fade-in-left">
                  {/* Profile Picture - Circular */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/10 hover:border-cyan-400/30 transition-all duration-500 transform hover:scale-105 animate-scale-in">
                      <Image
                        src="/images/rifat2.JPG"
                        alt="Marifat Maruf"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 128px, 160px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                      {t('hero.name')}
                    </h1>

                    <div className="relative inline-block">
                      <p className="text-2xl md:text-3xl font-medium text-cyan-300 inline-block relative">
                        {t('hero.title')}
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent" />
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Crafting performant, elegant, and efficient web
                      experiences.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      Obsessed with finding the sweet spot between beauty,
                      performance, and efficiency. I design solutions that are
                      powerful without wasting unnecessary energy. Focused on
                      web application development, I specialize in React.js,
                      Vue.js, and modern frontend technologies with 6+ years of
                      experience.
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                    <button
                      onClick={() => scrollToSection('about')}
                      className="relative group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 overflow-hidden"
                    >
                      <span className="relative z-10">{t('btn.about')}</span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                    <button
                      onClick={() => scrollToSection('skills')}
                      className="relative group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 overflow-hidden"
                    >
                      <span className="relative z-10">{t('ui.skills')}</span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>

                  {/* Bottom CTA */}
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-between items-center lg:items-start pt-8 border-t border-white/10">
                    <div className="text-gray-300 mb-4 sm:mb-0 text-center lg:text-left">
                      <p className="text-lg">
                        Let&apos;s build something amazing together 🚀
                      </p>
                      <p className="text-sm text-gray-400">
                        — Open for opportunities.
                      </p>
                    </div>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Contact
                    </button>
                  </div>
                </div>

                {/* Right Column - Skills Cards */}
                <div className="space-y-8 animate-fade-in-right">
                  <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Skills
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* React Skill Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animate-stagger-1">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12  bg-slate-700  rounded-lg flex items-center justify-center">
                          {/* Official React.js Atom Logo from Icons8 */}
                          <svg
                            className="w-8 h-8 text-white"
                            viewBox="0 0 30 30"
                            fill="currentColor"
                          >
                            <path d="M 10.679688 4.1816406 C 10.068687 4.1816406 9.502 4.3184219 9 4.6074219 C 7.4311297 5.5132122 6.8339651 7.7205462 7.1503906 10.46875 C 4.6127006 11.568833 3 13.188667 3 15 C 3 16.811333 4.6127006 18.431167 7.1503906 19.53125 C 6.8341285 22.279346 7.4311297 24.486788 9 25.392578 C 9.501 25.681578 10.067687 25.818359 10.679688 25.818359 C 11.982314 25.818359 13.48785 25.164589 15 24.042969 C 16.512282 25.164589 18.01964 25.818359 19.322266 25.818359 C 19.933266 25.818359 20.499953 25.681578 21.001953 25.392578 C 22.570814 24.486793 23.167976 22.279432 22.851562 19.53125 C 25.388297 18.431178 27 16.81094 27 15 C 27 13.188667 25.387299 11.568833 22.849609 10.46875 C 23.165872 7.7206538 22.56887 5.5132122 21 4.6074219 C 20.499 4.3174219 19.932312 4.1816406 19.320312 4.1816406 C 18.017686 4.1816406 16.51215 4.8354109 15 5.9570312 C 13.487763 4.8354109 11.981863 4.1816406 10.679688 4.1816406 z M 10.679688 5.9316406 C 11.461321 5.9316406 12.49496 6.3472486 13.617188 7.1171875 C 12.95737 7.7398717 12.311153 8.4479321 11.689453 9.2363281 C 10.681079 9.3809166 9.7303472 9.5916908 8.8496094 9.8554688 C 8.8448793 9.7943902 8.8336776 9.7303008 8.8300781 9.6699219 C 8.7230781 7.8899219 9.114 6.5630469 9.875 6.1230469 C 10.1 5.9930469 10.362688 5.9316406 10.679688 5.9316406 z M 19.320312 5.9316406 C 19.636312 5.9316406 19.9 5.9930469 20.125 6.1230469 C 20.886 6.5620469 21.276922 7.8899219 21.169922 9.6699219 C 21.166295 9.7303008 21.155145 9.7943902 21.150391 9.8554688 C 20.2691 9.5915252 19.317669 9.3809265 18.308594 9.2363281 C 17.686902 8.4480417 17.042616 7.7397993 16.382812 7.1171875 C 17.504962 6.3473772 18.539083 5.9316406 19.320312 5.9316406 z M 15 8.2285156 C 15.27108 8.4752506 15.540266 8.7360345 15.8125 9.0214844 C 15.542718 9.012422 15.274373 9 15 9 C 14.726286 9 14.458598 9.0124652 14.189453 9.0214844 C 14.461446 8.7363308 14.729174 8.4750167 15 8.2285156 z M 15 10.75 C 15.828688 10.75 16.614128 10.796321 17.359375 10.876953 C 17.813861 11.494697 18.261774 12.147811 18.681641 12.875 C 19.084074 13.572033 19.439938 14.285488 19.753906 15 C 19.439896 15.714942 19.084316 16.429502 18.681641 17.126953 C 18.263078 17.852044 17.816279 18.500949 17.363281 19.117188 C 16.591711 19.201607 15.800219 19.25 15 19.25 C 14.171312 19.25 13.385872 19.203679 12.640625 19.123047 C 12.186139 18.505303 11.738226 17.854142 11.318359 17.126953 C 10.915684 16.429502 10.560194 15.714942 10.246094 15 C 10.559972 14.285488 10.915926 13.572033 11.318359 12.875 C 11.737083 12.149909 12.183612 11.499051 12.636719 10.882812 C 13.408289 10.798393 14.199781 10.75 15 10.75 z M 19.746094 11.291016 C 20.142841 11.386804 20.524253 11.490209 20.882812 11.605469 C 20.801579 11.97252 20.702235 12.346608 20.589844 12.724609 C 20.461164 12.483141 20.336375 12.240903 20.197266 12 C 20.054139 11.752196 19.895244 11.529558 19.746094 11.291016 z M 10.251953 11.292969 C 10.103305 11.530776 9.9454023 11.752991 9.8027344 12 C 9.6636666 12.240944 9.5387971 12.483106 9.4101562 12.724609 C 9.29751 12.345829 9.1965499 11.971295 9.1152344 11.603516 C 9.4803698 11.48815 9.86083 11.385986 10.251953 11.292969 z M 7.46875 12.246094 C 7.6794464 13.135714 7.9717297 14.057918 8.3476562 14.998047 C 7.9725263 15.935943 7.6814729 16.856453 7.4707031 17.744141 C 5.7292327 16.903203 4.75 15.856373 4.75 15 C 4.75 14.121 5.701875 13.119266 7.296875 12.322266 C 7.3513169 12.295031 7.4131225 12.272692 7.46875 12.246094 z M 22.529297 12.255859 C 24.270767 13.096797 25.25 14.143627 25.25 15 C 25.25 15.879 24.298125 16.880734 22.703125 17.677734 C 22.648683 17.704969 22.586877 17.727308 22.53125 17.753906 C 22.32043 16.863764 22.030541 15.940699 21.654297 15 C 22.028977 14.062913 22.318703 13.142804 22.529297 12.255859 z M 15 13 C 13.895 13 13 13.895 13 15 C 13 16.105 13.895 17 15 17 C 16.105 17 17 16.105 17 15 C 17 13.895 16.105 13 15 13 z M 9.4101562 17.275391 C 9.5388794 17.516948 9.6655262 17.759008 9.8046875 18 C 9.9476585 18.247625 10.104915 18.470608 10.253906 18.708984 C 9.857159 18.613196 9.4757466 18.509791 9.1171875 18.394531 C 9.1984813 18.02725 9.2976676 17.653633 9.4101562 17.275391 z M 20.589844 17.277344 C 20.702364 17.655759 20.803517 18.02905 20.884766 18.396484 C 20.51963 18.51185 20.13917 18.614014 19.748047 18.707031 C 19.896695 18.469224 20.054598 18.247009 20.197266 18 C 20.336044 17.759557 20.461449 17.518344 20.589844 17.277344 z M 8.8496094 20.144531 C 9.7309004 20.408475 10.682331 20.619073 11.691406 20.763672 C 12.313288 21.552345 12.957085 22.261935 13.617188 22.884766 C 12.495042 23.654481 11.461272 24.070312 10.679688 24.070312 C 10.363687 24.070312 10.1 24.006953 9.875 23.876953 C 9.114 23.437953 8.7230781 22.112031 8.8300781 20.332031 C 8.8337424 20.271023 8.8447938 20.206253 8.8496094 20.144531 z M 21.150391 20.144531 C 21.155182 20.206253 21.166285 20.271023 21.169922 20.332031 C 21.276922 22.112031 20.886 23.436953 20.125 23.876953 C 19.9 24.006953 19.637312 24.070313 19.320312 24.070312 C 18.538728 24.070312 17.504958 23.654609 16.382812 22.884766 C 17.042964 22.261863 17.688542 21.552454 18.310547 20.763672 C 19.318921 20.619083 20.269653 20.408309 21.150391 20.144531 z M 14.1875 20.978516 C 14.457282 20.987578 14.725627 21 15 21 C 15.274373 21 15.542718 20.987578 15.8125 20.978516 C 15.540266 21.263964 15.27108 21.524765 15 21.771484 C 14.72892 21.524749 14.459734 21.263966 14.1875 20.978516 z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white text-center mb-3">
                        React Js
                      </h3>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                      <p className="text-white text-center font-medium">90%</p>
                    </div>

                    {/* Vue.js Skill Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animate-stagger-2">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          {/* Vue.js Icon from Icons8 */}
                          <svg
                            className="w-8 h-8 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78L24 1.61zM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43L12 14.08z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white text-center mb-3">
                        Vue.js
                      </h3>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                      <p className="text-white text-center font-medium">85%</p>
                    </div>

                    {/* Next.js Skill Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animate-stagger-3">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          {/* Official Next.js Logo from Icons8 */}
                          <svg
                            className="w-8 h-8 text-white"
                            viewBox="0 0 48 48"
                            fill="currentColor"
                          >
                            <path d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white text-center mb-3">
                        Next Js
                      </h3>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                          style={{ width: '80%' }}
                        ></div>
                      </div>
                      <p className="text-white text-center font-medium">80%</p>
                    </div>

                    {/* Tailwind CSS Skill Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animate-stagger-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          {/* Tailwind CSS Icon from Icons8 */}
                          <svg
                            className="w-8 h-8 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white text-center mb-3">
                        Tailwind CSS
                      </h3>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                          style={{ width: '80%' }}
                        ></div>
                      </div>
                      <p className="text-white text-center font-medium">80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="wrapper style2 fade-up py-20">
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
                {t('about.title')}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {t('about.intro1')}
                  </p>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {t('about.intro2')}
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t('about.whatIDo')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">
                          {t('about.frontendDev')}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">{t('about.uiux')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">
                          {t('about.fullstack')}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">
                          {t('about.optimization')}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900"
          >
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
                {t('skills.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                {t('skills.description')}
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
                {t('experience.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                {t('experience.subtitle')}
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
                            {t('experience.keyAchievements')}:
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
                {t('portfolio.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                {t('portfolio.description')}
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
                          <span>{t('portfolio.previewDesign')}</span>
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
                        {t(`projects.${project.id}.title`, project.title)}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {t(
                          `projects.${project.id}.description`,
                          project.description
                        )}
                      </p>

                      {/* Technologies */}
                      <div className="mb-2">
                        <p className="text-xs text-cyan-400 mb-2">
                          {t('portfolio.technologies')}
                        </p>
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
                          <span>{t('portfolio.previewDesign')}</span>
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
                          <span>{t('portfolio.openInFigma')}</span>
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
            className="wrapper style2 fade-up py-20 bg-gradient-to-br from-black to-gray-900"
          >
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
                Education
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                My educational background and professional certifications that
                support my expertise.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    Education
                  </h3>
                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <div key={index} className="glass-effect rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {edu.degree}
                        </h4>
                        <p className="text-cyan-400 font-semibold mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-gray-300 mb-2">
                          {edu.duration} • {edu.location}
                        </p>
                        <p className="text-gray-400">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    Certifications
                  </h3>
                  <div className="space-y-8">
                    {certifications.map((cert, index) => (
                      <div key={index} className="glass-effect rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {cert.name}
                        </h4>
                        <p className="text-cyan-400 font-semibold mb-2">
                          {cert.issuer}
                        </p>
                        <p className="text-gray-300 mb-2">{cert.date}</p>
                        <p className="text-gray-400">{cert.description}</p>
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
                Highlights of my professional journey and accomplishments.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) =>
                  typeof achievement === 'string' ? (
                    <div
                      key={index}
                      className="glass-effect rounded-xl p-8 text-center"
                    >
                      <p className="text-gray-300">{achievement}</p>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="glass-effect rounded-xl p-8 text-center"
                    >
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
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-hyperspace-h1 font-bold mb-6 text-center text-gradient">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                I&apos;m always interested in new opportunities and exciting
                projects. Let&apos;s discuss how we can bring your ideas to
                life.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-hyperspace-h2 font-bold text-white mb-6">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Whether you have a project in mind, want to discuss
                      collaboration opportunities, or just want to say hello,
                      I&apos;d love to hear from you.
                    </p>

                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
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
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Email</h4>
                          <a
                            href="mailto:riddbengkok@gmail.com"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                          >
                            riddbengkok@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Location</h4>
                          <p className="text-gray-300">Yogyakarta, Indonesia</p>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            Availability
                          </h4>
                          <p className="text-gray-300">
                            Available for new projects
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links & Quick Actions */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-hyperspace-h2 font-bold text-white mb-6">
                      Connect With Me
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Follow me on social media to stay updated with my latest
                      work and insights.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/marifat-maruf-370714b5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            LinkedIn
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Professional Network
                          </p>
                        </div>
                      </a>

                      {/* GitHub */}
                      <a
                        href="https://github.com/riddbengkok"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            GitHub
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Code Repository
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-hyperspace-h2 font-bold text-white mb-6">
                      Quick Actions
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="/marifat_maruf_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            Download Resume
                          </h4>
                          <p className="text-gray-400 text-sm">
                            View my professional experience
                          </p>
                        </div>
                      </a>

                      <Link
                        href="/portfolio"
                        className="flex items-center space-x-3 p-4 glass-effect rounded-lg hover:transform hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-200">
                            View Portfolio
                          </h4>
                          <p className="text-gray-400 text-sm">
                            See my detailed work
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <p className="text-xl text-gray-300 mb-8">
                  Ready to start a project together?
                </p>
                <a
                  href="mailto:riddbengkok@gmail.com"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                  Send Me a Message
                </a>
              </div>
            </div>
          </section>
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
