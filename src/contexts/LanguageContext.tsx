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
    'portfolio.subtitle': 'Selected web development projects',
    'portfolio.description':
      'A selection of web applications and interface work, with project details and technologies.',
    'portfolio.viewProject': 'View Project',
    'portfolio.preview': 'Preview',
    'portfolio.openInFigma': 'Open URL→',
    'portfolio.technologies': 'Technologies',
    'portfolio.previewDesign': 'Preview Design',
    'portfolio.category.webApp': 'Web Application',
    'portfolio.category.mobileApp': 'Mobile Application',
    'portfolio.category.uiux': 'UI/UX Design',
    // Hero Section
    'hero.name': 'Marifat Maruf',
    'hero.title': 'Frontend & Full-Stack Developer | Mid-to-Senior Level',
    'hero.description':
      'Frontend and full-stack web developer with more than six years of professional experience. I build web applications with React, Next.js, Vue, and TypeScript, and have worked with backend frameworks including Laravel and Ruby on Rails.',

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
      'Frontend and full-stack web developer with experience in modern web technologies.',
    'about.intro1':
      'I have more than six years of professional experience in web development, working across frontend and full-stack roles. My background includes PHP and Laravel as well as React, Next.js, Vue, and Nuxt.',
    'about.intro2':
      'My work includes responsive interfaces, business websites, dashboards, and financial application features. I focus on frontend development and also contribute to APIs and backend integrations when needed.',
    'about.whatIDo': 'What I Do',
    'about.frontendDev': 'Frontend Engineering',
    'about.uiux': 'UI & Design Systems',
    'about.fullstack': 'Backend & Integrations',
    'about.optimization': 'Performance & Accessibility',

    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.description':
      'My core experience is in frontend development with React, Next.js, Vue, and Nuxt, alongside TypeScript, JavaScript, and CSS. I also have experience with PHP, Laravel, databases, and API integration.',

    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.subtitle':
      'A summary of my web development roles, responsibilities, and technology experience.',
    'experience.keyAchievements': 'Responsibilities & Contributions',

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
    'ui.contactMe': 'Contact Me',
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
    'portfolio.subtitle': 'Pilihan proyek pengembangan web',
    'portfolio.description':
      'Pilihan aplikasi web dan pekerjaan antarmuka, beserta detail proyek dan teknologi yang digunakan.',
    'portfolio.viewProject': 'Lihat Proyek',
    'portfolio.preview': 'Pratinjau',
    'portfolio.openInFigma': 'Buka di Figma →',
    'portfolio.technologies': 'Teknologi',
    'portfolio.previewDesign': 'Pratinjau Desain',
    'portfolio.category.webApp': 'Aplikasi Web',
    'portfolio.category.mobileApp': 'Aplikasi Mobile',
    'portfolio.category.uiux': 'Desain UI/UX',

    // Hero Section
    'hero.name': 'Marifat Maruf',
    'hero.title': 'Developer Frontend & Full-Stack | Level Menengah ke Senior',
    'hero.description':
      'Developer frontend dan full-stack dengan pengalaman profesional lebih dari enam tahun. Saya membangun aplikasi web menggunakan React, Next.js, Vue, dan TypeScript, serta pernah bekerja dengan Laravel dan Ruby on Rails.',

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
      'Developer frontend dan full-stack dengan pengalaman menggunakan teknologi web modern.',
    'about.intro1':
      'Saya memiliki pengalaman profesional lebih dari enam tahun dalam pengembangan web, baik di bidang frontend maupun full-stack. Latar belakang saya mencakup PHP dan Laravel, serta React, Next.js, Vue, dan Nuxt.',
    'about.intro2':
      'Pekerjaan saya mencakup antarmuka responsif, situs bisnis, dashboard, dan fitur aplikasi keuangan. Fokus utama saya adalah frontend, dengan pengalaman berkontribusi pada API dan integrasi backend.',
    'about.whatIDo': 'Apa yang Saya Lakukan',
    'about.frontendDev': 'Pengembangan Frontend',
    'about.uiux': 'UI & Sistem Desain',
    'about.fullstack': 'Backend & Integrasi',
    'about.optimization': 'Performa & Aksesibilitas',

    // Skills Section
    'skills.title': 'Keterampilan Teknis',
    'skills.description':
      'Pengalaman utama saya adalah pengembangan frontend dengan React, Next.js, Vue, dan Nuxt, serta TypeScript, JavaScript, dan CSS. Saya juga memiliki pengalaman dengan PHP, Laravel, database, dan integrasi API.',

    // Experience Section
    'experience.title': 'Pengalaman Profesional',
    'experience.subtitle':
      'Ringkasan peran, tanggung jawab, dan pengalaman teknologi saya dalam pengembangan web.',
    'experience.keyAchievements': 'Tanggung Jawab & Kontribusi',

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
    'ui.contactMe': 'Hubungi Saya',
  },
};
