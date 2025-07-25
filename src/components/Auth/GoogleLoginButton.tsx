'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface GoogleLoginButtonProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function GoogleLoginButton({
  className = '',
  size = 'medium',
  variant = 'primary',
}: GoogleLoginButtonProps) {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (user) {
      try {
        setIsLoading(true);
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await signInWithGoogle();
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600';
      case 'outline':
        return 'bg-transparent hover:bg-gray-800 text-white border border-gray-600 hover:border-gray-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border border-transparent';
    }
  };

  if (loading) {
    return (
      <button
        disabled
        className={`${getSizeClasses()} ${getVariantClasses()} rounded-lg font-medium transition-all duration-300 opacity-50 cursor-not-allowed ${className}`}
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </button>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={handleAuth}
        disabled={isLoading}
        className={`${getSizeClasses()} ${getVariantClasses()} rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full`}
      >
        <div className="flex items-center justify-center space-x-3">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          <span>{user ? 'Sign Out' : 'Sign in with Google'}</span>
        </div>
      </button>
      {user && user.email && (
        <div
          className="text-xs text-gray-500 text-center mt-2 truncate"
          title={user.email}
        >
          {user.email}
        </div>
      )}
    </div>
  );
}
