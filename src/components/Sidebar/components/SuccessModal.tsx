import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative border border-gray-200 dark:border-gray-700">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-gray-700 dark:text-gray-200 mx-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4-4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Payment Success
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            Your payment was successful and your subscription is now{' '}
            <span className="font-semibold">active</span>.
          </p>
          <button
            className="mt-2 px-5 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded transition hover:bg-gray-800 dark:hover:bg-gray-200 text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
