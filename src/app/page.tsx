'use client'

import ProjectModal from '@/components/ProjectModal'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
  link: string
  category: string
  placeholderColor: string
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      document.body.classList.add('loaded')
    }, 100)

    // Intersection Observer for fade-up animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
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
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: "User Transfer Report",
      description: "Comprehensive user transfer reporting system with detailed analytics and data visualization for financial transactions.",
      image: "/images/pic01.jpg",
      technologies: ["Vue.js", "Laravel", "Figma", "MySQL"],
      link: "https://www.figma.com/design/H9S7zoLuAu2A2zRJdtbGcK/user-transfer-report---vue-laravel?node-id=0-1&p=f&t=7lHb8MkXkTdsN6c4-0",
      category: "Full Stack",
      placeholderColor: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Component Edit System",
      description: "Advanced component editing interface with real-time updates and seamless integration for Vue.js to Next.js migration.",
      image: "/images/pic02.jpg",
      technologies: ["Vue.js", "Laravel", "Next.js", "TypeScript"],
      link: "https://www.figma.com/design/UVAWI2hdWcewkIkBrzPXfG/component-edit---vue-laravel---migrate-to-next-js?node-id=0-1&p=f&t=kZ0EtWRCJzIjdBbM-0",
      category: "Frontend Development",
      placeholderColor: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "KoinBill Add Product",
      description: "Product management system for KoinBill platform with intuitive interface for adding and managing digital products.",
      image: "/images/pic03.jpg",
      technologies: ["Vue.js", "Laravel", "Figma", "REST API"],
      link: "https://www.figma.com/design/PXZ0CzMlDkcz0e0MFsYcU5/koinbill-add-product---vue-laravel?node-id=0-1&p=f&t=PjjMGpQ76Cx02qYC-0",
      category: "Web Development",
      placeholderColor: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Porto Incoming Cash",
      description: "Financial management system for tracking incoming cash flows with comprehensive reporting and analytics dashboard.",
      image: "/images/pic04.jpg",
      technologies: ["Vue.js", "Laravel", "Figma", "Chart.js"],
      link: "https://www.figma.com/design/Gqvd1cQ6Hx7CFdHOmPXnuT/porto-incoming-cash---vue-laravel?node-id=0-1&p=f&t=nh7GO9KtKUD80Dto-0",
      category: "Full Stack",
      placeholderColor: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Coupon Campaign System",
      description: "Dynamic coupon campaign management platform with automated distribution and tracking capabilities.",
      image: "/images/pic05.jpg",
      technologies: ["Laravel", "Next.js", "Figma", "MySQL"],
      link: "https://www.figma.com/design/jGNmXrFO969siHWTZ0xTCv/Coupon-Campaign---Migrate-laravel-to-next-js?node-id=0-1&p=f&t=DTzg33eAhIPfNRex-0",
      category: "Backend Development",
      placeholderColor: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "KScore Dashboard",
      description: "Credit scoring and financial assessment dashboard with real-time data processing and user-friendly interface.",
      image: "/images/pic06.jpg",
      technologies: ["React.js", "Figma", "JavaScript", "CSS3"],
      link: "https://www.figma.com/design/Vk6voJBCWH0jANJLwaFYvx/Kscore--react-js?node-id=0-1&p=f&t=IQ8537kVuc7ajgBw-0",
      category: "Frontend Development",
      placeholderColor: "from-yellow-500 to-orange-500"
    }
  ]

  const skills = [
    { name: "Vue.js & Nuxt.js", level: 95, color: "from-green-400 to-emerald-500" },
    { name: "React.js & Next.js", level: 95, color: "from-orange-400 to-blue-500" },
    { name: "HTML & CSS", level: 95, color: "from-blue-400 to-emerald-500" },
    { name: "TypeScript & JavaScript", level: 90, color: "from-yellow-400 to-orange-500" },
    { name: "Laravel & PHP", level: 75, color: "from-red-400 to-pink-500" },
    { name: "MySQL & Database", level: 70, color: "from-purple-400 to-indigo-500" },
    { name: "UI/UX Design & Figma", level: 65, color: "from-pink-400 to-rose-500" },
    { name: "Git", level: 75, color: "from-orange-400 to-red-500" },
    { name: "Docker", level: 65, color: "from-indigo-400 to-purple-500" },
  ]

  const experience = [
    {
      company: "PT. Lunaria Annua Teknologi",
      position: "Frontend Web Developer",
      duration: "May 2019 - May 2025 · 6 yrs 1 mo",
      location: "Yogyakarta, Indonesia",
      description: "Started as a fullstack developer working with Laravel and Ruby on Rails. Transitioned to focus on frontend development, becoming an expert in HTML, CSS, React.js, and Vue.js. Enjoyed the specialization and continued to develop skills in frontend technologies.",
      technologies: ["HTML", "CSS", "React.js", "Vue.js", "Laravel", "Ruby on Rails"],
      achievements: [
        "Transitioned from fullstack to specialized frontend development",
        "Developed expertise in React.js and Vue.js frameworks",
        "Worked with Laravel for backend integration",
        "Gained 6+ years of experience in web development"
      ]
    },
    {
      company: "Upwork",
      position: "Professional Freelancer",
      duration: "Nov 2015 - May 2019 · 3 yrs 7 mos",
      location: "Yogyakarta Area, Yogyakarta, Indonesia",
      description: "Worked as a professional freelancer providing PHP and frontend web development services to various clients through the Upwork platform.",
      technologies: ["PHP", "Frontend Development", "Web Development"],
      achievements: [
        "Successfully completed multiple freelance projects",
        "Built client relationships and maintained high satisfaction",
        "Developed skills in PHP and frontend technologies",
        "Gained experience in remote work and project management"
      ]
    },
    {
      company: "Printerous",
      position: "Software Programmer",
      duration: "Jan 2019 - Apr 2019 · 4 mos",
      location: "Greater Jakarta Area, Indonesia",
      description: "Worked as a backend developer using Ruby on Rails and JavaScript. Gained experience in backend development and software programming.",
      technologies: ["Ruby on Rails", "JavaScript", "Backend Development"],
      achievements: [
        "Developed backend solutions using Ruby on Rails",
        "Worked with JavaScript for dynamic functionality",
        "Gained experience in backend development practices",
        "Contributed to software development projects"
      ]
    },
    {
      company: "PT. Mediatechindo (PT. Media Digitech Indonesia)",
      position: "Frontend Developer",
      duration: "Jun 2017 - Jan 2019 · 1 yr 8 mos",
      location: "Greater Jakarta Area, Indonesia",
      description: "Worked as a frontend developer focusing on creating user interfaces and frontend functionality for web applications.",
      technologies: ["Frontend Development", "Web Development", "UI/UX"],
      achievements: [
        "Developed user-friendly frontend interfaces",
        "Worked on web application development",
        "Gained experience in UI/UX design principles",
        "Contributed to frontend development projects"
      ]
    }
  ]

  const education = [
    {
      institution: "Universitas Gadjah Mada",
      degree: "Bachelor of Computer Science",
      duration: "2011 - 2015",
      location: "Yogyakarta, Indonesia",
      description: "Studied Computer Science with focus on software development and programming fundamentals."
    }
  ]

  const certifications = [
    {
      name: "Vue.js Certification",
      issuer: "Vue.js Official",
      date: "2023",
      description: "Certified Vue.js developer with expertise in Vue 3 and Composition API."
    },
    {
      name: "React.js Certification",
      issuer: "Meta",
      date: "2023",
      description: "Certified React.js developer with experience in modern React patterns and hooks."
    }
  ]

  const achievements = [
    {
      title: "6+ Years of Experience",
      description: "Extensive experience in frontend development with modern frameworks and technologies."
    },
    {
      title: "50+ Projects Completed",
      description: "Successfully delivered numerous projects across various industries and technologies."
    },
    {
      title: "Full Stack Expertise",
      description: "Proficient in both frontend and backend development with modern tech stacks."
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`min-h-screen lg:ml-64 ${isLoaded ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Hero Section */}
          <section id="hero" className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900">
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <div className="text-center">
                <h1 className="text-6xl lg:text-8xl font-bold mb-6 text-gradient">
                  Marifat Maruf
                </h1>
                <p className="text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed">
                  Frontend Web Developer & UI/UX Designer
                </p>
                <p className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Passionate about creating beautiful, functional, and user-friendly web applications. 
                  Specialized in React.js, Vue.js, and modern frontend technologies with 6+ years of experience.
                </p>
                
                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    About Me
                  </button>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Projects
                  </button>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-6">
                  <Link 
                    href="/features"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    View Features
                  </Link>
                  <a 
                    href="/public/marifat_maruf_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="wrapper style2 fade-up py-20">
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
                About Me
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    I&apos;m a passionate Frontend Web Developer with over 6 years of experience creating 
                    beautiful and functional web applications. My journey in web development started 
                    with PHP and has evolved to include modern frameworks like React.js, Vue.js, and Next.js.
                  </p>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    I specialize in building responsive, user-friendly interfaces and have worked on 
                    projects ranging from small business websites to complex financial applications. 
                    My expertise includes both frontend and backend development, giving me a holistic 
                    understanding of web application architecture.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                    open-source projects, or sharing knowledge with the developer community.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">Frontend Development with React.js & Vue.js</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">UI/UX Design & Prototyping</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">Full Stack Development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">Performance Optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900">
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
                Skills & Expertise
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                My technical skills span across frontend and backend technologies, with a focus on 
                modern web development frameworks and tools.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                      <span className="text-cyan-400 font-medium">{skill.level}%</span>
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
          <section id="experience" className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900">
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
                Professional Experience
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                My journey in software development, from freelance work to leading teams at fintech companies.
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
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      
                      {/* Job details */}
                      <div className="flex-1 glass-effect rounded-xl p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{job.position}</h3>
                            <p className="text-xl text-cyan-400 font-semibold">{job.company}</p>
                          </div>
                          <div className="text-right mt-2 lg:mt-0">
                            <p className="text-gray-300 font-medium">{job.duration}</p>
                            <p className="text-gray-400 text-sm">{job.location}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {job.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.technologies.map((tech) => (
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
                          <h4 className="text-white font-semibold">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {job.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-gray-300 text-sm flex items-start">
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
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                A collection of my best work showcasing creativity, technical skills, and problem-solving abilities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="group relative overflow-hidden rounded-xl glass-effect hover:transform hover:scale-105 transition-all duration-300">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.placeholderColor} opacity-80`}></div>
                      
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                        {project.technologies.map((tech) => (
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
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </button>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200 inline-flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
          <section id="education" className="wrapper style2 fade-up py-20 bg-gradient-to-br from-black to-gray-900">
            <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
                Education & Certifications
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                My educational background and professional certifications that support my expertise.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Education</h3>
                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <div key={index} className="glass-effect rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                        <p className="text-cyan-400 font-semibold mb-2">{edu.institution}</p>
                        <p className="text-gray-300 mb-2">{edu.duration} • {edu.location}</p>
                        <p className="text-gray-400">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Certifications</h3>
                  <div className="space-y-8">
                    {certifications.map((cert, index) => (
                      <div key={index} className="glass-effect rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">{cert.name}</h4>
                        <p className="text-cyan-400 font-semibold mb-2">{cert.issuer}</p>
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
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
                Key Achievements
              </h2>
              <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
                Highlights of my professional journey and accomplishments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="glass-effect rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{achievement.title}</h3>
                    <p className="text-gray-300">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal isOpen={isModalOpen} project={selectedProject} onClose={closeModal} />
      )}
    </>
  )
} 