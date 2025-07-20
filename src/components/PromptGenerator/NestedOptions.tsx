'use client'

import FormField from './FormField'

interface NestedOptionsProps {
  title: string
  icon: string
  isVisible: boolean
  fields: {
    label: string
    fieldName: string
    value: string
    options: { value: string; label: string }[]
  }[]
  onFieldChange: (fieldName: string, value: string) => void
  colorTheme?: 'core' | 'visual' | 'atmosphere' | 'environment' | 'sensory' | 'action' | 'details'
}

export default function NestedOptions({ title, icon, isVisible, fields, onFieldChange, colorTheme = 'core' }: NestedOptionsProps) {
  if (!isVisible) return null

  // Get nested background color (slightly lighter than parent)
  const getNestedBackgroundColor = () => {
    switch (colorTheme) {
      case 'core':
        return '#1a1a1a' // Consistent lighter background
      case 'visual':
        return '#1a1a1a' // Same as core
      case 'atmosphere':
        return '#1a1a1a' // Same as core
      case 'environment':
        return '#1a1a1a' // Same as core
      case 'sensory':
        return '#1a1a1a' // Same as core
      case 'action':
        return '#1a1a1a' // Same as core
      case 'details':
        return '#1a1a1a' // Same as core
      default:
        return '#1a1a1a'
    }
  }

  // Get nested border color (matching parent theme)
  const getNestedBorderColor = () => {
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

  return (
    <div style={{ 
      backgroundColor: getNestedBackgroundColor(), 
      padding: '20px', 
      borderRadius: '8px',
      border: `1px solid ${getNestedBorderColor()}`,
      marginTop: '24px',
      marginBottom: '0'
    }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#00ffff', fontSize: '16px' }}>
        {icon} {title}
      </h4>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px'
      }}>
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            type="select"
            value={field.value}
            onChange={(value) => onFieldChange(field.fieldName, value)}
            options={field.options}
            placeholder={`Select ${field.label.toLowerCase()}...`}
          />
        ))}
      </div>
    </div>
  )
} 