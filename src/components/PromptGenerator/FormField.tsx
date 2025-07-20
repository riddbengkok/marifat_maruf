'use client'


interface FormFieldProps {
  label: string
  icon?: string
  type: 'text' | 'select' | 'textarea'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options?: { value: string; label: string }[]
  rows?: number
  required?: boolean
}

export default function FormField({ 
  label, 
  icon, 
  type, 
  value, 
  onChange, 
  placeholder, 
  options = [], 
  rows = 4,
  required = false 
}: FormFieldProps) {
  const commonStyles = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px'
  }

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            style={commonStyles}
          />
        )
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={commonStyles}
          >
            <option value="">{placeholder || 'Select...'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            style={{
              ...commonStyles,
              resize: 'vertical'
            }}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
        {icon && `${icon} `}{label} {required && '*'}
      </label>
      {renderInput()}
    </div>
  )
} 