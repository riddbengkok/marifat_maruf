'use client';

import './PromptGenerator.css';

interface FormFieldProps {
  label: string;
  icon?: string;
  type: 'text' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  required?: boolean;
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
  required = false,
}: FormFieldProps) {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="form-input"
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="form-select"
          >
            <option value="">{placeholder || 'Select...'}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="form-textarea"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      <label className="form-field-label">
        {icon && <span className="form-field-icon">{icon}</span>}
        {label} {required && <span className="form-field-required">*</span>}
      </label>
      {renderInput()}
    </div>
  );
}
