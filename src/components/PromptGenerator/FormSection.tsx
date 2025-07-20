'use client';

import React from 'react';
import './PromptGenerator.css';

interface FormSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  isHighlighted?: boolean;
}

export default function FormSection({
  title,
  icon,
  children,
  isHighlighted = false,
}: FormSectionProps) {
  return (
    <div
      className={`form-section ${isHighlighted ? 'form-section-highlighted' : ''}`}
    >
      <div className="form-section-header">
        <span className="form-section-icon">{icon}</span>
        <h3 className="form-section-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}
