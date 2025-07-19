'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const isFeaturesPage = pathname === '/features'

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-md bg-black/20 backdrop-blur-sm border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <section
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/80 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-gradient">
              {isFeaturesPage ? 'Features' : 'Portfolio'}
            </Link>
          </div>

          <nav className="flex-1">
            <ul className="space-y-4">
              {isFeaturesPage ? (
                // Features page navigation
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('intro')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Welcome
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('one')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Who we are
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('two')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      What we do
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('three')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Get in touch
                    </button>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      ← Back to Portfolio
                    </Link>
                  </li>
                </>
              ) : (
                // Portfolio page navigation (root)
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('hero')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('about')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('skills')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Skills
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('experience')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Experience
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('education')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Education
                    </button>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/features"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      View Features →
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-white/20">
            <p className="text-sm text-gray-400">
              © 2024 Marifat Maruf
            </p>
          </div>
        </div>
      </section>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar 