'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import GoogleLoginButton from './GoogleLoginButton';

export default function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-400 mb-4">Sign in to access your profile</p>
        <GoogleLoginButton size="medium" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-4 mb-4">
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName || 'User'}
            width={48}
            height={48}
            className="rounded-full border-2 border-cyan-400"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">
            {user.displayName || 'User'}
          </h3>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Account Status:</span>
          <span className="text-green-400 font-medium">Active</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Email Verified:</span>
          <span
            className={
              user.emailVerified ? 'text-green-400' : 'text-yellow-400'
            }
          >
            {user.emailVerified ? '✓ Verified' : '⚠ Not Verified'}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Provider:</span>
          <span className="text-cyan-400 font-medium">
            {user.providerData[0]?.providerId === 'google.com'
              ? 'Google'
              : 'Unknown'}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <GoogleLoginButton size="small" variant="outline" className="w-full" />
      </div>
    </div>
  );
}
