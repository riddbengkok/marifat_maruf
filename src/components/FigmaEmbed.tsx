'use client'

import { useState } from 'react'

interface FigmaEmbedProps {
  figmaUrl: string
  title: string
  className?: string
}

const FigmaEmbed = ({ figmaUrl, title, className = '' }: FigmaEmbedProps) => {
  const [embedError, setEmbedError] = useState(false)

  // Convert Figma design URL to embed URL
  const getEmbedUrl = (url: string) => {
    // For Figma design URLs, we'll use a direct embed approach
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
  }

  const embedUrl = getEmbedUrl(figmaUrl)

  if (embedError) {
    return (
      <div className={`flex items-center justify-center ${className} bg-gray-800 rounded-lg`}>
        <div className="text-center p-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">Design Preview Unavailable</h3>
          <p className="text-gray-400 text-sm mb-4">
            The Figma design couldn't be embedded. This might be due to privacy settings.
          </p>
          <a
            href={figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in Figma
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full border-0 rounded-lg"
        allowFullScreen
        loading="lazy"
        style={{ 
          minHeight: '600px',
          height: '100%',
          width: '100%'
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        onError={() => setEmbedError(true)}
      />
    </div>
  )
}

export default FigmaEmbed 