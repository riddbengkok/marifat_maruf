'use client'

import Contact from '@/components/Contact'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Intro from '@/components/Intro'
import Sidebar from '@/components/Sidebar'
import Spotlights from '@/components/Spotlights'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
      document.body.classList.add('loaded')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`min-h-screen lg:ml-64 ${isLoaded ? 'loaded' : ''}`}>
        <div id="wrapper" className="relative">
          {/* Intro Section */}
          <Intro />

          {/* Spotlights Section */}
          <Spotlights />

          {/* Features Section */}
          <Features />

          {/* Contact Section */}
          <Contact />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
} 