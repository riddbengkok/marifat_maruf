// Project data shared between Home and Portfolio pages
export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link: string;
  category: string;
  placeholderColor: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'User Transfer Report',
    description:
      'Comprehensive user transfer reporting system with detailed analytics and data visualization for financial transactions.',
    image: '/images/rifat.jpg',
    technologies: ['Vue.js', 'Laravel', 'Figma', 'MySQL'],
    link: 'https://www.figma.com/design/H9S7zoLuAu2A2zRJdtbGcK/user-transfer-report---vue-laravel?node-id=0-1&p=f&t=7lHb8MkXkTdsN6c4-0',
    category: 'Full Stack',
    placeholderColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Component Edit System',
    description:
      'Advanced component editing interface with real-time updates and seamless integration for Vue.js to Next.js migration.',
    image: '/images/pic02.jpg',
    technologies: ['Vue.js', 'Laravel', 'Next.js', 'TypeScript'],
    link: 'https://www.figma.com/design/UVAWI2hdWcewkIkBrzPXfG/component-edit---vue-laravel---migrate-to-next-js?node-id=0-1&p=f&t=kZ0EtWRCJzIjdBbM-0',
    category: 'Frontend Development',
    placeholderColor: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'KoinBill Add Product',
    description:
      'Product management system for KoinBill platform with intuitive interface for adding and managing digital products.',
    image: '/images/pic03.jpg',
    technologies: ['Vue.js', 'Laravel', 'Figma', 'REST API'],
    link: 'https://www.figma.com/design/PXZ0CzMlDkcz0e0MFsYcU5/koinbill-add-product---vue-laravel?node-id=0-1&p=f&t=PjjMGpQ76Cx02qYC-0',
    category: 'Web Development',
    placeholderColor: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'Porto Incoming Cash',
    description:
      'Financial management system for tracking incoming cash flows with comprehensive reporting and analytics dashboard.',
    image: '/images/pic04.jpg',
    technologies: ['Vue.js', 'Laravel', 'Figma', 'Chart.js'],
    link: 'https://www.figma.com/design/Gqvd1cQ6Hx7CFdHOmPXnuT/porto-incoming-cash---vue-laravel?node-id=0-1&p=f&t=nh7GO9KtKUD80Dto-0',
    category: 'Full Stack',
    placeholderColor: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    title: 'Coupon Campaign System',
    description:
      'Dynamic coupon campaign management platform with automated distribution and tracking capabilities.',
    image: '/images/pic05.jpg',
    technologies: ['Laravel', 'Next.js', 'Figma', 'MySQL'],
    link: 'https://www.figma.com/design/jGNmXrFO969siHWTZ0xTCv/Coupon-Campaign---Migrate-laravel-to-next-js?node-id=0-1&p=f&t=DTzg33eAhIPfNRex-0',
    category: 'Backend Development',
    placeholderColor: 'from-indigo-500 to-purple-500',
  },
  {
    id: 6,
    title: 'KScore Dashboard',
    description:
      'Credit scoring and financial assessment dashboard with real-time data processing and user-friendly interface.',
    image: '/images/pic06.jpg',
    technologies: ['React.js', 'Figma', 'JavaScript', 'CSS3'],
    link: 'https://www.figma.com/design/Vk6voJBCWH0jANJLwaFYvx/Kscore--react-js?node-id=0-1&p=f&t=IQ8537kVuc7ajgBw-0',
    category: 'Frontend Development',
    placeholderColor: 'from-yellow-500 to-orange-500',
  },
];

// Shared skills data
export const skills = [
  {
    name: 'Vue.js & Nuxt.js',
    level: 95,
    color: 'from-green-400 to-emerald-500',
  },
  {
    name: 'React.js & Next.js',
    level: 95,
    color: 'from-orange-400 to-blue-500',
  },
  { name: 'HTML & CSS', level: 95, color: 'from-blue-400 to-emerald-500' },
  {
    name: 'TypeScript & JavaScript',
    level: 90,
    color: 'from-yellow-400 to-orange-500',
  },
  { name: 'Laravel & PHP', level: 75, color: 'from-red-400 to-pink-500' },
  {
    name: 'MySQL & Database',
    level: 70,
    color: 'from-purple-400 to-indigo-500',
  },
  {
    name: 'UI/UX',
    level: 70,
    color: 'from-pink-400 to-rose-500',
  },
  { name: 'Git', level: 72, color: 'from-orange-400 to-red-500' },
  { name: 'Docker', level: 65, color: 'from-indigo-400 to-purple-500' },
];

// Shared experience data (superset of both files)
export const experience = [
  {
    company: 'PT. Lunaria Annua Teknologi',
    position: 'Frontend Web Developer',
    duration: 'May 2019 - May 2025 · 6 yrs 1 mo',
    location: 'Yogyakarta, Indonesia',
    description:
      'Started as a fullstack developer working with Laravel and Ruby on Rails. Transitioned to focus on frontend development, becoming an expert in HTML, CSS, React.js, Next.js, Vue.js and Nuxt.js. Enjoyed the specialization and continued to develop skills in frontend technologies.',
    technologies: [
      'HTML',
      'CSS',
      'React.js',
      'Next.js',
      'Vue.js',
      'Nuxt.js',
      'Laravel',
      'Ruby on Rails',
    ],
    achievements: [
      'Gained 6+ years of experience in web development specializing in frontend development',
      'very familiar working together in a team',
      'Developed expertise in React.js, Next.js, Vue.js, Nuxt.js frameworks and other frontend technologies ,with tools like Git, Cursor, Docker, Vercel, Confluence, Jira, and other tools',
      'familiar with Laravel,prisma,Next.js for backend integration',
    ],
  },
  {
    company: 'Upwork',
    position: 'Professional Freelancer',
    duration: 'Nov 2015 - May 2019 · 3 yrs 7 mos',
    location: 'Yogyakarta Area, Yogyakarta, Indonesia',
    description:
      'Worked as a professional freelancer providing PHP and frontend web development services to various clients through the Upwork platform.',
    technologies: ['PHP', 'Frontend Development', 'Web Development'],
    achievements: [
      'Successfully completed multiple freelance projects',
      'Built client relationships and maintained high satisfaction',
      'Developed skills in PHP and frontend technologies',
      'Gained experience in remote work and project management',
    ],
  },
  {
    company: 'Printerous',
    position: 'Software Programmer',
    duration: 'Jan 2019 - Apr 2019 · 4 mos',
    location: 'Greater Jakarta Area, Indonesia',
    description:
      'Worked as a backend developer using Ruby on Rails and JavaScript. Gained experience in backend development and software programming.',
    technologies: ['Ruby on Rails', 'JavaScript', 'Backend Development'],
    achievements: [
      'Developed backend solutions using Ruby on Rails',
      'Worked with JavaScript for dynamic functionality',
      'Gained experience in backend development practices',
      'Contributed to software development projects',
    ],
  },
  {
    company: 'PT. Mediatechindo (PT. Media Digitech Indonesia)',
    position: 'Frontend Developer',
    duration: 'Jun 2017 - Jan 2019 · 1 yr 8 mos',
    location: 'Yogyakarta Area, Yogyakarta, Indonesia',
    description:
      'Worked as a frontend developer, Laravel developer, WordPress developer. Specialized in PHP, JavaScript, PSD to HTML conversion, and other frontend technologies.',
    technologies: ['Laravel', 'WordPress', 'PHP', 'JavaScript', 'PSD to HTML'],
    achievements: [
      'Developed frontend applications using multiple technologies',
      'Worked with Laravel framework for web applications',
      'Created WordPress themes and plugins',
      'Converted PSD designs to functional HTML/CSS',
    ],
  },
  {
    company: '8villages',
    position: 'Frontend Developer',
    duration: 'May 2016 - Nov 2016 · 7 mos',
    location: 'Greater Jakarta Area, Indonesia',
    description:
      'Worked as a frontend developer using CodeIgniter, Yii, Firebase, PHP, Laravel, Bootstrap, and other frontend technologies.',
    technologies: [
      'CodeIgniter',
      'Yii',
      'Firebase',
      'PHP',
      'Laravel',
      'Bootstrap',
    ],
    achievements: [
      'Developed web applications using CodeIgniter and Yii frameworks',
      'Integrated Firebase for real-time functionality',
      'Worked with PHP and Laravel for backend integration',
      'Used Bootstrap for responsive design',
    ],
  },
  {
    company: 'Airbinder',
    position: 'Web Programmer',
    duration: 'Feb 2015 - Oct 2016 · 1 yr 9 mos',
    location: 'Remote',
    description:
      'Worked as a web programmer developing web applications and solutions.',
    technologies: ['Web Programming', 'Web Development'],
    achievements: [
      'Developed web applications and solutions',
      'Gained experience in web programming',
      'Worked on various web development projects',
    ],
  },
  {
    company: 'Freelancer',
    position: 'Programmer',
    duration: 'Aug 2013 - May 2016 · 2 yrs 10 mos',
    location: 'Yogyakarta Province, Indonesia',
    description:
      'Started career as a freelance programmer, gaining foundational experience in programming and software development.',
    technologies: ['Programming', 'Software Development'],
    achievements: [
      'Started professional programming career',
      'Gained foundational programming experience',
      'Developed skills in software development',
      'Built initial client base and projects',
    ],
  },
];

// Shared education data (superset)
export const education = [
  {
    institution: 'Universitas Gadjah Mada',
    degree: 'Bachelor of Computer Science',
    duration: '2011 - 2015',
    location: 'Yogyakarta, Indonesia',
    description:
      'Studied Computer Science with focus on software development and programming fundamentals.',
    relevantCourses: [
      'Web Development',
      'Database Systems',
      'Software Engineering',
      'Data Structures',
    ],
  },
  {
    institution: 'Universitas Bina Bangsa',
    degree: 'Bachelor of Computer Science',
    duration: '2018 - 2022',
    location: 'Serang, Indonesia',
    description:
      'Focused on software engineering, web development, and database management systems.',
    relevantCourses: [
      'Web Development',
      'Database Systems',
      'Software Engineering',
      'Data Structures',
    ],
  },
];

// Shared certifications data (superset)
export const certifications = [
  {
    name: 'Vue.js Certification',
    issuer: 'Vue.js Official',
    date: '2023',
    year: '2023',
    description:
      'Certified Vue.js developer with expertise in Vue 3 and Composition API.',
  },
  {
    name: 'React.js Certification',
    issuer: 'Meta',
    date: '2023',
    year: '2023',
    description:
      'Certified React.js developer with experience in modern React patterns and hooks.',
  },
  {
    name: 'Laravel Framework Certification',
    issuer: 'Laravel Official',
    date: '2022',
    year: '2022',
    description: 'Laravel framework mastery and advanced features',
  },
  {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2022',
    year: '2022',
    description: 'Cloud development and deployment on AWS platform',
  },
];

// Shared achievements data (superset)
export const achievements = [
  {
    title: '6+ Years of Experience',
    description:
      'Extensive experience in frontend development with modern frameworks and technologies.',
  },
  {
    title: '50+ Projects Completed',
    description:
      'Successfully delivered numerous projects across various industries and technologies.',
  },
  {
    title: 'Full Stack Expertise',
    description:
      'Proficient in both frontend and backend development with modern tech stacks.',
  },
  '12+ years of experience in web development and programming',
  'Specialized in frontend development with React.js and Vue.js',
  'Worked with multiple frameworks including Laravel, Ruby on Rails, and WordPress',
  'Successfully transitioned from fullstack to specialized frontend development',
];
