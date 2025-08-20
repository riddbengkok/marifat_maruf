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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || disabled}
            className="btn-primary"
          >
            {isLoading && <div className="loading-spinner"></div>}
            {disabled
              ? '🚀 Subscribe to get unlimited access only IDR 6k'
              : '🚀 Generate Prompt'}
          </button>

          {hasGeneratedPrompt && onEnhance && (
            <button
              onClick={handleEnhanceClick}
              disabled={isLoading || disabled || isEnhancing}
              className="btn-secondary"
              style={{
                background: 'linear-gradient(135deg, #7dd8e0, #6b9ac4)',
                color: '#000',
                border: 'none',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(125, 216, 224, 0.3)',
              }}
            >
              {isEnhancing && <div className="loading-spinner"></div>}
              🤖 Enhance with AI
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
          {'🔐 Sign in Google to Generate Prompt'}
        </button>
      )}

      <div className="button-container-right">
        {onReset && <ResetButton onReset={onReset} />}
      </div>
    </div>
  );
}
