'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import './PromptGenerator.css';
import ResetButton from './ResetButton';

interface GenerateButtonProps {
  onGenerate: () => void;
  onEnhance?: () => void;
  onReset?: () => void;
  disabled?: boolean;
  hasGeneratedPrompt?: boolean;
  isEnhancing?: boolean;
}

export default function GenerateButton({
  onGenerate,
  onEnhance,
  onReset,
  disabled = false,
  hasGeneratedPrompt = false,
  isEnhancing = false,
}: GenerateButtonProps) {
  const { user, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateClick = async () => {
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
      onGenerate();
    }
  };

  const handleEnhanceClick = async () => {
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
      onEnhance?.();
    }
  };

  return (
    <div className="button-container">
      <div className="button-container-spacer"></div>

      {user ? (
        <div className="button-container__actions">
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || disabled}
            className="btn-primary"
          >
            {isLoading && <div className="loading-spinner"></div>}
            {disabled
              ? 'Subscribe for unlimited access · IDR 6k'
              : 'Generate prompt'}
          </button>

          {hasGeneratedPrompt && onEnhance && (
            <button
              onClick={handleEnhanceClick}
              disabled={isLoading || disabled || isEnhancing}
              className="btn-secondary"
            >
              {isEnhancing && <div className="loading-spinner"></div>}
              Enhance with AI
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleGenerateClick}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading && <div className="loading-spinner"></div>}
          Sign in with Google to generate
        </button>
      )}

      <div className="button-container-right">
        {onReset && <ResetButton onReset={onReset} />}
      </div>
    </div>
  );
}
