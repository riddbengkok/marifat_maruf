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
    id: 0,
    title: 'Hookmatic',
    description:
      'AI-powered hook and script generator for TikTok creators in the Fashion and Sport niche.',
    technologies: ['React', 'Vite', 'Hono', 'Google Gemini', 'Vercel'],
    link: 'https://hookmatic.vercel.app',
    category: 'AI Tools',
    placeholderColor: 'from-violet-600 to-fuchsia-500',
  },
  {
    id: 1,
    title: 'BubbleGum Template UI',
    description:
      'Reusable website template built with Next.js, TypeScript, and Tailwind CSS, with responsive layouts and configurable components.',
    image: '/images/buble.png',
    technologies: ['Tailwind CSS', 'Next.js', 'TypeScript', 'Figma'],
    link: 'https://oska-bubblegum-template.vercel.app',
    category: 'UI Web Templates',
    placeholderColor: 'from-yellow-500 to-orange-500',
  },
  {
    id: 2,
    title: 'Nuxt Admin Dashboard',
    description:
      'Admin dashboard interface built with Nuxt.js and Vue, with responsive layouts and reusable UI components.',
    image: '/images/nuxt.png',
    technologies: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://riddbengkok.github.io/nuxt_dashdash/login',
    category: 'Admin Dashboard',
    placeholderColor: 'from-green-500 to-blue-500',
  },
  {
    id: 3,
    title: 'Bulk Image Analysis Tool',
    description:
      'Browser-based tool for reviewing multiple images using brightness, contrast, sharpness, composition, and noise metrics.',
    image: '/images/image-analyze.png',
    technologies: ['Next.js', 'TypeScript', 'Canvas API', 'Image Processing'],
    link: '/bulk-image-analyze',
    category: 'AI Tools',
    placeholderColor: 'from-orange-500 to-purple-500',
  },
  {
    id: 4,
    title: 'Mesiro Coffee Store',
    description:
      'WordPress and WooCommerce storefront for Mesiro Coffee, including product listings and a checkout flow.',
    image: '/images/mesiro-wp.png',
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'Tailwind CSS'],
    link: 'https://mesirocoffe.gt.tc/',
    category: 'E-commerce',
    placeholderColor: 'from-brown-500 to-amber-500',
  },
  {
    id: 5,
    title: 'User Transfer Report',
    description:
      'Financial reporting interface for reviewing user transfers and transaction data.',
    image: '/images/user-transfer.png',
    technologies: ['Vue.js', 'Laravel', 'Figma', 'MySQL'],
    link: 'https://www.figma.com/design/H9S7zoLuAu2A2zRJdtbGcK/user-transfer-report---vue-laravel?node-id=0-1&p=f&t=7lHb8MkXkTdsN6c4-0',
    category: 'Frontend Development',
    placeholderColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 6,
    title: 'Component Edit System',
    description:
      'Component editing interface designed to support a migration from Vue.js to Next.js.',
    image: '/images/component.png',
    technologies: ['Vue.js', 'Laravel', 'Next.js', 'TypeScript'],
    link: 'https://www.figma.com/design/UVAWI2hdWcewkIkBrzPXfG/component-edit---vue-laravel---migrate-to-next-js?node-id=0-1&p=f&t=kZ0EtWRCJzIjdBbM-0',
    category: 'Frontend Development',
    placeholderColor: 'from-purple-500 to-pink-500',
  },
  {
    id: 7,
    title: 'KoinBill Add Product',
    description:
      'Product management interface for adding digital products to the KoinBill platform.',
    image: '/images/koinbill.png',
    technologies: ['Vue.js', 'Laravel', 'Figma', 'REST API'],
    link: 'https://www.figma.com/design/PXZ0CzMlDkcz0e0MFsYcU5/koinbill-add-product---vue-laravel?node-id=0-1&p=f&t=PjjMGpQ76Cx02qYC-0',
    category: 'Frontend Development',
    placeholderColor: 'from-green-500 to-teal-500',
  },
  {
    id: 8,
    title: 'Incoming Cash',
    description:
      'Dashboard concept for tracking incoming cash flow and reviewing financial reports.',
    image: '/images/incoming.png',
    technologies: ['Vue.js', 'Laravel', 'Figma', 'Chart.js'],
    link: 'https://www.figma.com/design/Gqvd1cQ6Hx7CFdHOmPXnuT/porto-incoming-cash---vue-laravel?node-id=0-1&p=f&t=nh7GO9KtKUD80Dto-0',
    category: 'Frontend Development',
    placeholderColor: 'from-orange-500 to-red-500',
  },
  {
    id: 9,
    title: 'Coupon Campaign System',
    description:
      'Dashboard concept for creating and managing coupon campaigns for a mobile app.',
    image: '/images/coupon.png',
    technologies: ['Laravel', 'Next.js', 'Figma', 'MySQL'],
    link: 'https://www.figma.com/design/jGNmXrFO969siHWTZ0xTCv/Coupon-Campaign---Migrate-laravel-to-next-js?node-id=0-1&p=f&t=DTzg33eAhIPfNRex-0',
    category: 'Frontend Development',
    placeholderColor: 'from-indigo-500 to-purple-500',
  },
  {
    id: 10,
    title: 'KScore Dashboard',
    description:
      'Dashboard interface for reviewing credit scores and financial assessment data.',
    image: '/images/kscore.png',
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
    position: 'Frontend - Fullstack Web Developer',
    duration: 'May 2019 - May 2025 · 6 yrs 1 mo',
    location: 'Yogyakarta, Indonesia',
    description:
      'Worked across frontend and full-stack development, using Laravel and Ruby on Rails before focusing more on React, Next.js, Vue, and Nuxt applications.',
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
      'Worked on frontend and full-stack web application development over a six-year period.',
      'Collaborated with designers, developers, and product teams.',
      'Built interfaces with React, Next.js, Vue, and Nuxt using TypeScript and JavaScript.',
      'Contributed to backend integrations using Laravel, Prisma, and APIs.',
    ],
  },
  {
    company: 'Upwork',
    position: 'Freelance Web Developer',
    duration: 'Nov 2015 - May 2019 · 3 yrs 7 mos',
    location: 'Yogyakarta Area, Yogyakarta, Indonesia',
    description:
      'Delivered PHP and frontend web development work for clients through Upwork.',
    technologies: ['PHP', 'Frontend Development', 'Web Development'],
    achievements: [
      'Delivered web development work for multiple clients.',
      'Communicated with clients to clarify requirements and project scope.',
      'Built experience in PHP, frontend development, and remote project delivery.',
      'Managed project tasks and delivery remotely.',
    ],
  },
  {
    company: 'Printerous',
    position: 'Software Programmer',
    duration: 'Jan 2019 - Apr 2019 · 4 mos',
    location: 'Greater Jakarta Area, Indonesia',
    description:
      'Worked on backend development with Ruby on Rails and JavaScript.',
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
      'Developed frontend interfaces and worked with Laravel and WordPress using PHP and JavaScript, including converting design files into HTML and CSS.',
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
    institution: 'Qodr Academy',
    degree: 'Fullstack Developer',
    duration: '2013 - 2016',
    location: 'Yogyakarta, Indonesia',
    description: 'Studied software development and programming fundamentals.',
    relevantCourses: [
      'Frontend Development',
      'HTML&CSS',
      'Backend Development',
      'Database Systems',
      'Software Engineering',
      'Git',
      'PHP',
      'Laravel',
    ],
  },
];

// Shared certifications data (superset)
export const certifications = [
  {
    name: 'Qodr',
    issuer: 'Educational graduation Fullstack Developer certificate ',
    date: '2018',
    year: '2023',
    description: 'Certified educational graduation certificate',
  },
];

// Shared achievements data (superset)
export const achievements = [
  {
    title: 'Frontend Development',
    description:
      'More than six years at PT. Lunaria Annua Teknologi working across frontend and full-stack web development.',
  },
  {
    title: 'Framework Experience',
    description:
      'Projects include React, Next.js, Vue, Nuxt, Laravel, WordPress, and Ruby on Rails.',
  },
  {
    title: 'Cross-functional Collaboration',
    description:
      'Experience collaborating with designers, developers, and clients on web application work.',
  },
  'Frontend development with React, Next.js, Vue, and Nuxt',
  'Backend experience with PHP, Laravel, and Ruby on Rails',
  'Web application work across company and freelance roles',
  'Progressed from full-stack work to a stronger focus on frontend development',
];
