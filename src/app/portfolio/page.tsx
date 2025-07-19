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

const Portfolio = () => {
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
    // {
    //   company: "Remote",
    //   position: "Frontend Web Developer",
    //   duration: "May 2025 - Present",
    //   location: "Daerah Istimewa Yogyakarta, Indonesia · Hybrid",
    //   description: "Currently working as a Frontend Web Developer with expertise in React.js, Next.js, Vue.js, WordPress, and Laravel. Specializing in modern frontend development and creating responsive web applications.",
    //   technologies: ["React.js", "Next.js", "Vue.js", "WordPress", "Laravel"],
    //   achievements: [
    //     "Developing modern frontend applications using React.js and Next.js",
    //     "Creating responsive and user-friendly web interfaces",
    //     "Working with WordPress and Laravel for full-stack solutions",
    //     "Collaborating in a hybrid work environment"
    //   ]
    // },
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
      location: "Yogyakarta Area, Yogyakarta, Indonesia",
      description: "Worked as a frontend developer, Laravel developer, WordPress developer. Specialized in PHP, JavaScript, PSD to HTML conversion, and other frontend technologies.",
      technologies: ["Laravel", "WordPress", "PHP", "JavaScript", "PSD to HTML"],
      achievements: [
        "Developed frontend applications using multiple technologies",
        "Worked with Laravel framework for web applications",
        "Created WordPress themes and plugins",
        "Converted PSD designs to functional HTML/CSS"
      ]
    },
    {
      company: "8villages",
      position: "Frontend Developer",
      duration: "May 2016 - Nov 2016 · 7 mos",
      location: "Greater Jakarta Area, Indonesia",
      description: "Worked as a frontend developer using CodeIgniter, Yii, Firebase, PHP, Laravel, Bootstrap, and other frontend technologies.",
      technologies: ["CodeIgniter", "Yii", "Firebase", "PHP", "Laravel", "Bootstrap"],
      achievements: [
        "Developed web applications using CodeIgniter and Yii frameworks",
        "Integrated Firebase for real-time functionality",
        "Worked with PHP and Laravel for backend integration",
        "Used Bootstrap for responsive design"
      ]
    },
    {
      company: "Airbinder",
      position: "Web Programmer",
      duration: "Feb 2015 - Oct 2016 · 1 yr 9 mos",
      location: "Remote",
      description: "Worked as a web programmer developing web applications and solutions.",
      technologies: ["Web Programming", "Web Development"],
      achievements: [
        "Developed web applications and solutions",
        "Gained experience in web programming",
        "Worked on various web development projects"
      ]
    },
    {
      company: "Freelancer",
      position: "Programmer",
      duration: "Aug 2013 - May 2016 · 2 yrs 10 mos",
      location: "Yogyakarta Province, Indonesia",
      description: "Started career as a freelance programmer, gaining foundational experience in programming and software development.",
      technologies: ["Programming", "Software Development"],
      achievements: [
        "Started professional programming career",
        "Gained foundational programming experience",
        "Developed skills in software development",
        "Built initial client base and projects"
      ]
    }
  ]

  const education = [
    {
      institution: "Universitas Bina Bangsa",
      degree: "Bachelor of Computer Science",
      duration: "2018 - 2022",
      location: "Serang, Indonesia",
      description: "Focused on software engineering, web development, and database management systems.",
      relevantCourses: ["Web Development", "Database Systems", "Software Engineering", "Data Structures"]
    }
  ]

  const certifications = [
    {
      name: "Vue.js Developer Certification",
      issuer: "Vue.js Official",
      year: "2023",
      description: "Advanced Vue.js development and best practices"
    },
    {
      name: "Laravel Framework Certification",
      issuer: "Laravel Official",
      year: "2022",
      description: "Laravel framework mastery and advanced features"
    },
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2022",
      description: "Cloud development and deployment on AWS platform"
    }
  ]

  const achievements = [
    "12+ years of experience in web development and programming",
    "Specialized in frontend development with React.js and Vue.js",
    "Worked with multiple frameworks including Laravel, Ruby on Rails, and WordPress",
    "Successfully transitioned from fullstack to specialized frontend development"
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen lg:ml-64 ${isLoaded ? 'loaded' : ''}`}>
        {/* Hero Section */}
        <section id="intro" className="wrapper style1 fullscreen fade-up min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>

          <div className="inner relative z-10 text-center px-4 lg:px-8">
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 text-gradient">
              Marifat Maruf
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-cyan-400">
              Frontend Web Developer
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experienced frontend developer with 12+ years of expertise specializing in React.js, Vue.js, and modern web technologies. 
              Currently working remotely as a Frontend Web Developer, creating responsive and user-friendly web applications.
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
        <section id="skills" className="wrapper style2 fade-up py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              My technical skills and expertise across various domains of software development and design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
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
        <section id="education" className="wrapper style2 fade-up py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
              Education & Certifications
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              My academic background and professional certifications that validate my expertise.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Education */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Education</h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="glass-effect rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                          <p className="text-lg text-cyan-400 font-semibold mb-2">{edu.institution}</p>
                          <p className="text-gray-300 text-sm mb-2">{edu.duration} • {edu.location}</p>
                          <p className="text-gray-300 mb-3">{edu.description}</p>
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
                <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Certifications</h3>
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="glass-effect rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">{cert.name}</h4>
                          <p className="text-lg text-cyan-400 font-semibold mb-2">{cert.issuer}</p>
                          <p className="text-gray-300 text-sm mb-2">{cert.year}</p>
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
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient">
              Key Achievements
            </h2>
            <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto leading-relaxed">
              Notable accomplishments and milestones throughout my professional journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="glass-effect rounded-xl p-6 text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="wrapper style1 fade-up py-20 bg-gradient-to-br from-black to-gray-900">
          <div className="inner max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              I&apos;m always interested in new opportunities and exciting projects. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
            
            {/* Professional Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://www.linkedin.com/in/marifat-maruf-370714b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href="mailto:riddbengkok@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>
              <a
                href="https://github.com/riddbengkok"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
  )
}

export default Portfolio 