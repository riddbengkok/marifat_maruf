'use client';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="py-12 bg-[#080b12] border-t border-white/[0.08]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-slate-400">
        <div>
          &copy; {new Date().getFullYear()} Marifat Maruf. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/riddbengkok"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/marifat-maruf-370714b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:riddtwo@gmail.com"
            className="hover:text-slate-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
