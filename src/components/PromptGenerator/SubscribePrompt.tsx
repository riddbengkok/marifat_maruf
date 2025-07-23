import React from 'react';

interface SubscribePromptProps {
  user: { email?: string | null } | null;
  subscriptionStatus: 'active' | 'inactive' | 'none' | null;
  genCount: number;
  onSubscribe: () => void;
}

const SubscribePrompt: React.FC<SubscribePromptProps> = ({
  user,
  subscriptionStatus,
  genCount,
  onSubscribe,
}) => {
  if (!user || subscriptionStatus === 'active' || genCount > 0) return null;
  return (
    <button
      className="mt-4 px-4 py-2 text-sm font-semibold rounded-md shadow bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all border border-cyan-500 w-full"
      style={{ letterSpacing: '0.04em' }}
      onClick={onSubscribe}
    >
      Subscribe to get unlimited access for only $0.5 or IDR 6k
    </button>
  );
};

export default SubscribePrompt;
