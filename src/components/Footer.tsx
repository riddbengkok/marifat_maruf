'use client';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="wrapper style1-alt py-8 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800"
    >
      <div className="inner max-w-6xl mx-auto px-4 lg:px-8">
        <ul className="menu flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-400">
          <li>
            &copy; {new Date().getFullYear()} Marifat. All rights reserved.
          </li>
          <li className="flex items-center">
            Design:{' '}
            <a
              href="http://html5up.net"
              className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              HTML5 UP
            </a>
          </li>
          <li className="flex items-center">
            Built with:{' '}
            <a
              href="https://nextjs.org"
              className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
