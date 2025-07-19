'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image?: string
    technologies: string[]
    link: string
    category: string
    placeholderColor: string
  }
  onPreview: (project: any) => void
}

const ProjectCard = ({ project, onPreview }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="group relative overflow-hidden rounded-xl glass-effect hover:transform hover:scale-105 transition-all duration-300">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {project.image && !imageError ? (
          // Use actual image if available
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300"></div>
          </>
        ) : (
          // Use gradient background as fallback
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.placeholderColor} opacity-80`}></div>
            
            {/* Project Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/90 text-6xl font-bold opacity-20">
                {project.title.charAt(0)}
              </div>
            </div>
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-white font-bold text-lg drop-shadow-lg">
                {project.title}
              </h4>
            </div>
          </>
        )}
        
        {/* Preview Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onPreview(project)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 border border-white/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview Design</span>
          </button>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-wide">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onPreview(project)}
            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </button>
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in Figma →
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard 