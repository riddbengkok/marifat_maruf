'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import './PromptGenerator.css';
import ResetButton from './ResetButton';

interface GenerateButtonProps {
  onClick: () => void;
  onReset?: () => void;
  disabled?: boolean;
}

export default function GenerateButton({
  onClick,
  onReset,
  disabled = false,
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

      {user ? (
        <button
          onClick={handleClick}
          disabled={isLoading || disabled}
          className="btn-primary"
        >
          {isLoading && <div className="loading-spinner"></div>}
          {disabled
            ? '🚀 Subscribe to get unlimited access only IDR 6k'
            : '🚀 Generate Prompt'}
        </button>
      ) : (
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading && <div className="loading-spinner"></div>}
          {'🔐 Sign in Google to Generate Prompt'}
        </button>
      )}

      <div className="button-container-right">
        {onReset && <ResetButton onReset={onReset} />}
      </div>
    </div>
  );
}
