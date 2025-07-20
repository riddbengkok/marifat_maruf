'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import './PromptGenerator.css';
import ResetButton from './ResetButton';

interface GenerateButtonProps {
  onClick: () => void;
  onReset?: () => void;
}

export default function GenerateButton({
  onClick,
  onReset,
}: GenerateButtonProps) {
  const { user, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      try {
        setIsLoading(true);
        await signInWithGoogle();
      } catch (error) {
        console.error('Error signing in with Google:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      onClick();
    }
  };

  return (
    <div className="button-container">
      <div className="button-container-spacer"></div>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className="btn-primary"
      >
        {isLoading && <div className="loading-spinner"></div>}
        {user ? '🚀 Generate Prompt' : '🔐 Sign in Google to Generate Prompt'}
      </button>

      <div className="button-container-right">
        {onReset && <ResetButton onReset={onReset} />}
      </div>
    </div>
  );
}
