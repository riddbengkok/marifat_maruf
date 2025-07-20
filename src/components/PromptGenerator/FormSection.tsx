'use client'

import React from 'react'

interface FormSectionProps {
  title: string
  icon: string
  children: React.ReactNode
  isHighlighted?: boolean
  colorTheme?: 'core' | 'visual' | 'atmosphere' | 'environment' | 'sensory' | 'action' | 'details'
}

export default function FormSection({ title, icon, children, isHighlighted = false, colorTheme = 'core' }: FormSectionProps) {
  // Color themes for different focus contexts - Simplified to 5 soft colors
  const getBackgroundColor = () => {
    switch (colorTheme) {
      case 'core':
        return '#0f0f0f' // Primary - Core elements (most important)
      case 'visual':
        return '#0f0f0f' // Same as core - Visual & technical
      case 'atmosphere':
        return '#0f0f0f' // Same as core - Atmosphere & mood
      case 'environment':
        return '#0f0f0f' // Same as core - Environment & context
      case 'sensory':
        return '#0f0f0f' // Same as core - Sensory & material
      case 'action':
        return '#0f0f0f' // Same as core - Action & details
      case 'details':
        return '#0f0f0f' // Same as core - Specific details
      default:
        return '#0f0f0f'
    }
  }

  const getBorderColor = () => {
    switch (colorTheme) {
      case 'core':
        return '#1a6666' // Soft cyan (1st)
      case 'visual':
        return '#1a3366' // Soft blue (2nd)
      case 'atmosphere':
        return '#1a6666' // Soft cyan (3rd)
      case 'environment':
        return '#1a3366' // Soft blue (4th)
      case 'sensory':
        return '#1a6666' // Soft cyan (5th)
      case 'action':
        return '#1a3366' // Soft blue (6th)
      case 'details':
        return '#1a6666' // Soft cyan (7th)
      default:
        return '#1a6666'
    }
  }

  const getTitleColor = () => {
    switch (colorTheme) {
      case 'core':
        return '#66cccc' // Soft cyan (1st)
      case 'visual':
        return '#6699cc' // Soft blue (2nd)
      case 'atmosphere':
        return '#66cccc' // Soft cyan (3rd)
      case 'environment':
        return '#6699cc' // Soft blue (4th)
      case 'sensory':
        return '#66cccc' // Soft cyan (5th)
      case 'action':
        return '#6699cc' // Soft blue (6th)
      case 'details':
        return '#66cccc' // Soft cyan (7th)
      default:
        return '#66cccc'
    }
  }

  return (
    <div style={{
      backgroundColor: getBackgroundColor(),
      padding: '24px',
      borderRadius: '12px',
      border: `2px solid ${getBorderColor()}`,
      marginBottom: '24px',
      boxShadow: isHighlighted ? '0 0 20px rgba(0, 255, 255, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: getTitleColor(), 
        fontSize: '20px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  )
} 