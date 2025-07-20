'use client';

import './PromptGenerator.css';

interface ResetButtonProps {
  onReset: () => void;
  disabled?: boolean;
}

export default function ResetButton({
  onReset,
  disabled = false,
}: ResetButtonProps) {
  return (
    <button onClick={onReset} disabled={disabled} className="btn-secondary">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
      Reset Form
    </button>
  );
}
