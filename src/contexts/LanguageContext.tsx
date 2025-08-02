'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Set English as the default language and clear any existing preference
  useEffect(() => {
    // Clear any existing language preference
    localStorage.removeItem('language');
    // Set default language to English
    setLanguage('en');
    // Update document lang attribute
    document.documentElement.lang = 'en';
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function with fallback support
  const t = (key: string, fallback?: string): string => {
    return translations[language][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.portfolio': 'Portfolio',

    // Portfolio Section
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'A collection of my best work',
    'portfolio.description':
      'Showcasing creativity, technical skills, and problem-solving abilities through various projects.',
    'portfolio.viewProject': 'View Project',
    'portfolio.preview': 'Preview',
    'portfolio.openInFigma': 'Open in Figma →',
    'portfolio.technologies': 'Technologies',
    'portfolio.previewDesign': 'Preview Design',
    'portfolio.category.webApp': 'Web Application',
    'portfolio.category.mobileApp': 'Mobile Application',
    'portfolio.category.uiux': 'UI/UX Design',

    // Projects
    'projects.1.title': 'User Transfer Report',
    'projects.1.description':
      'A web dashboard to show data user transfer report',
    'projects.2.title': 'Component edit feature',
    'projects.2.description':
      'Dashboard for setting component that show in mobile application',
    'projects.3.title': 'Product management for apps',
    'projects.3.description':
      'Dashboard product management create edit delete for apps',

    // Hero Section
    'hero.name': 'Marifat Maruf',
    'hero.title': 'Frontend Web Developer',
    'hero.description':
      'Obsessed with finding the sweet spot between beauty, performance, and efficiency. I design solutions that are powerful without wasting unnecessary energy. Focused on web application development, I specialize in React.js, Vue.js, and modern frontend technologies with 6+ years of experience.',

    // Buttons
    'btn.about': 'About',
    'btn.experience': 'Experience',
    'btn.projects': 'Projects',
    'btn.contact': 'Contact',
    'btn.downloadResume': 'Download Resume',
    'btn.viewPortfolio': 'View Portfolio',
    'btn.sendMessage': 'Send Me a Message',
    'btn.subscribe': 'Subscribe',

    // About Section
    'about.title': 'About Me',
    'about.description':
      'I am a passionate frontend developer with expertise in modern web technologies.',
    'about.intro1':
      "I'm a passionate Frontend Web Developer with over 6 years of experience creating beautiful and functional web applications. My journey in web development started with PHP and has evolved to include modern frameworks like React.js, Vue.js, and Next.js.",
    'about.intro2':
      'I specialize in building responsive, user-friendly interfaces and have worked on projects ranging from small business websites to complex financial applications. My expertise includes both frontend and backend development, giving me a holistic understanding of web application architecture.',
    'about.whatIDo': 'What I Do',
    'about.frontendDev':
      'Frontend Development with React.js & Vue.js and other frontend frameworks',
    'about.uiux': 'Implement UI/UX into real project',
    'about.fullstack': 'Sometimes I can be a Full Stack Developer',
    'about.optimization': 'Performance Optimization and SEO Optimization',

    // Skills Section
    'skills.title': 'Skills & Expertise',
    'skills.description':
      'My technical skills span across frontend and backend technologies, with a focus on modern Frontend web development frameworks. I have a strong understanding of the entire Frontend web development process, debugging and optimizing the code.',

    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.subtitle':
      'My journey in software development, from freelance work to leading teams at fintech companies.',
    'experience.keyAchievements': 'Key Achievements',

    // Projects Section
    'projects.title': 'Projects',
    'projects.viewDetails': 'View Details',

    // Contact Section
    'contact.title': 'Contact',
    'contact.ready': 'Ready to start a project together?',

    // AI Tools
    'ai.imageGenerator': 'AI Image Prompt Generator',
    'ai.videoGenerator': 'AI Video Prompt Generator',
    'ai.audioGenerator': 'AI Audio Prompt Generator',
    'ai.storyGenerator': 'AI Story Prompt Generator',
    'ai.scriptGenerator': 'AI Script Prompt Generator',

    // Footer
    'footer.copyright': '© 2025 Marifat Maruf',

    // Resume
    'resume.viewExperience': 'View my professional experience',
    'portfolio.detailedWork': 'See my detailed work',

    // Authentication
    'auth.login': 'Login with Google',
    'auth.logout': 'Logout',
    'subscription.active': 'Active Subscription',
    'subscription.inactive': 'Inactive Subscription',
    'subscription.none': 'No Subscription',
    'subscription.checking': 'Checking subscription...',

    // UI Elements
    'ui.viewFeatures': 'View Features',
    'ui.downloadResume': 'Download Resume',
    'ui.skills': 'Skills',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.experience': 'Pengalaman',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',
    'nav.portfolio': 'Portofolio',

    // Portfolio Section
    'portfolio.title': 'Portofolio',
    'portfolio.subtitle': 'Kumpulan karya terbaik saya',
    'portfolio.description':
      'Menampilkan kreativitas, keterampilan teknis, dan kemampuan pemecahan masalah melalui berbagai proyek.',
    'portfolio.viewProject': 'Lihat Proyek',
    'portfolio.preview': 'Pratinjau',
    'portfolio.openInFigma': 'Buka di Figma →',
    'portfolio.technologies': 'Teknologi',
    'portfolio.previewDesign': 'Pratinjau Desain',
    'portfolio.category.webApp': 'Aplikasi Web',
    'portfolio.category.mobileApp': 'Aplikasi Mobile',
    'portfolio.category.uiux': 'Desain UI/UX',

    // Projects
    'projects.1.title': 'Generator Prompt Berbasis AI',
    'projects.1.description':
      'Aplikasi web yang menghasilkan prompt penulisan kreatif menggunakan AI. Dibangun dengan Next.js dan OpenAI API.',
    'projects.2.title': 'Platform E-commerce',
    'projects.2.description':
      'Platform e-commerce lengkap dengan katalog produk, keranjang, dan fungsionalitas pembayaran.',
    'projects.3.title': 'Website Portofolio',
    'projects.3.description':
      'Website portofolio modern dan responsif yang dibangun dengan Next.js dan Tailwind CSS.',

    // Hero Section
    'hero.name': 'Marifat Maruf',
    'hero.title': 'Pengembang Web Frontend',
    'hero.description':
      'Terobsesi untuk menemukan titik manis antara keindahan, performa, dan efisiensi. Saya merancang solusi yang kuat tanpa membuang energi yang tidak perlu. Fokus pada pengembangan aplikasi web, saya mengkhususkan diri dalam React.js, Vue.js, dan teknologi frontend modern dengan pengalaman 6+ tahun.',

    // Buttons
    'btn.about': 'Tentang',
    'btn.experience': 'Pengalaman',
    'btn.projects': 'Proyek',
    'btn.contact': 'Kontak',
    'btn.downloadResume': 'Unduh Resume',
    'btn.viewPortfolio': 'Lihat Portofolio',
    'btn.sendMessage': 'Kirim Pesan',
    'btn.subscribe': 'Berlangganan',

    // About Section
    'about.title': 'Tentang Saya',
    'about.description':
      'Saya adalah pengembang frontend yang bersemangat dengan keahlian dalam teknologi web modern.',
    'about.intro1':
      'Saya seorang Pengembang Web Frontend yang bersemangat dengan pengalaman lebih dari 6 tahun dalam menciptakan aplikasi web yang indah dan fungsional. Perjalanan saya dalam pengembangan web dimulai dengan PHP dan telah berkembang untuk mencakup framework modern seperti React.js, Vue.js, dan Next.js.',
    'about.intro2':
      'Saya berspesialisasi dalam membangun antarmuka yang responsif dan ramah pengguna, dan telah mengerjakan proyek mulai dari website bisnis kecil hingga aplikasi keuangan yang kompleks. Keahlian saya mencakup pengembangan frontend dan backend, memberikan saya pemahaman holistik tentang arsitektur aplikasi web.',
    'about.whatIDo': 'Apa yang Saya Lakukan',
    'about.frontendDev':
      'Pengembangan Frontend dengan React.js & Vue.js dan framework frontend lainnya',
    'about.uiux': 'Mengimplementasikan UI/UX ke dalam proyek nyata',
    'about.fullstack': 'Terkadang saya bisa menjadi Full Stack Developer',
    'about.optimization': 'Optimalisasi Kinerja dan SEO',

    // Skills Section
    'skills.title': 'Keahlian & Keterampilan',
    'skills.description':
      'Keterampilan teknis saya mencakup teknologi frontend dan backend, dengan fokus pada framework pengembangan web Frontend modern. Saya memiliki pemahaman yang kuat tentang seluruh proses pengembangan web Frontend, termasuk debugging dan pengoptimalan kode.',

    // Experience Section
    'experience.title': 'Pengalaman Profesional',
    'experience.subtitle':
      'Perjalanan saya dalam pengembangan perangkat lunak, mulai dari pekerjaan lepas hingga memimpin tim di perusahaan fintech.',
    'experience.keyAchievements': 'Pencapaian Utama',

    // Projects Section
    'projects.title': 'Proyek',
    'projects.viewDetails': 'Lihat Detail',

    // Contact Section
    'contact.title': 'Kontak',
    'contact.ready': 'Siap memulai proyek bersama?',

    // AI Tools
    'ai.imageGenerator': 'Generator Prompt Gambar AI',
    'ai.videoGenerator': 'Generator Prompt Video AI',
    'ai.audioGenerator': 'Generator Prompt Audio AI',
    'ai.storyGenerator': 'Generator Prompt Cerita AI',
    'ai.scriptGenerator': 'Generator Prompt Skrip AI',

    // Footer
    'footer.copyright': '© 2025 Marifat Maruf',

    // Resume
    'resume.viewExperience': 'Lihat pengalaman profesional saya',
    'portfolio.detailedWork': 'Lihat karya detail saya',

    // Authentication
    'auth.login': 'Masuk dengan Google',
    'auth.logout': 'Keluar',
    'subscription.active': 'Langganan Aktif',
    'subscription.inactive': 'Langganan Tidak Aktif',
    'subscription.none': 'Tidak Ada Langganan',
    'subscription.checking': 'Memeriksa langganan...',

    // UI Elements
    'ui.viewFeatures': 'Lihat Fitur',
    'ui.downloadResume': 'Unduh Resume',
    'ui.skills': 'Keterampilan',
  },
};
