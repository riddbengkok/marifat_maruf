'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const Intro = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="wrapper style1 fullscreen fade-up min-h-screen flex items-center justify-center relative overflow-hidden"
    >
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
          Hyperspace
        </h1>
        <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Just another fine responsive site template designed by{' '}
          <a 
            href="http://html5up.net" 
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTML5 UP
          </a>
          <br />
          and released for free under the{' '}
          <a 
            href="http://html5up.net/license" 
            className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons
          </a>
          .
        </p>
        <div className="actions space-x-4">
          <button
            onClick={() => scrollToSection('one')}
            className="button scrolly bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Learn more
          </button>
          <Link
            href="/portfolio"
            className="button bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View Portfolio
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
  )
}

export default Intro 