'use client';

import FormField from './FormField';
import './PromptGenerator.css';

interface NestedOptionsProps {
  title: string;
  icon: string;
  isVisible: boolean;
  fields: {
    label: string;
    fieldName: string;
    value: string;
    options: { value: string; label: string }[];
  }[];
  onFieldChange: (fieldName: string, value: string) => void;
}

export default function NestedOptions({
  title,
  icon,
  isVisible,
  fields,
  onFieldChange,
}: NestedOptionsProps) {
  if (!isVisible) return null;

  return (
    <div className="nested-options">
      <h4 className="nested-options-title">
        {icon} {title}
      </h4>
      <div className="nested-options-grid">
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            type="select"
            value={field.value}
            onChange={value => onFieldChange(field.fieldName, value)}
            options={field.options}
            placeholder={`Select ${field.label.toLowerCase()}...`}
          />
        ))}
      </div>
    </div>
  );
}
