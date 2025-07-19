'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const Spotlights = () => {
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

  const spotlights = [
    {
      id: 1,
      title: "Sed ipsum dolor",
      description: "Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus.",
      image: "/images/pic01.jpg",
      position: "center center"
    },
    {
      id: 2,
      title: "Feugiat consequat",
      description: "Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus.",
      image: "/images/pic02.jpg",
      position: "top center"
    },
    {
      id: 3,
      title: "Ultricies aliquam",
      description: "Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus.",
      image: "/images/pic03.jpg",
      position: "25% 25%"
    }
  ]

  return (
    <section
      id="one"
      ref={sectionRef}
      className="wrapper style2 spotlights fade-up py-20"
    >
      {spotlights.map((spotlight) => (
        <section key={spotlight.id} className="flex flex-col lg:flex-row min-h-screen">
          {/* Image */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <div className="relative h-64 lg:h-full">
              <Image
                src={spotlight.image}
                alt={spotlight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 flex items-center p-8 lg:p-16 bg-gradient-to-br from-gray-900 to-black">
            <div className="inner max-w-lg">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
                {spotlight.title}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {spotlight.description}
              </p>
              <div className="actions">
                <button className="button bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </section>
  )
}

export default Spotlights 