'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import GoogleLoginButton from './Auth/GoogleLoginButton';

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

// Snap.js loader utility
function loadSnapJs(clientKey: string, isProduction: boolean) {
  if (typeof window !== 'undefined' && !window.snap) {
    const script = document.createElement('script');
    script.src = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    document.body.appendChild(script);
  }
}

const Sidebar = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'active' | 'inactive' | 'none' | null
  >(null);
  const [subLoading, setSubLoading] = useState(false);
  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingOrderToken, setPendingOrderToken] = useState<string>('');
  const [pendingOrderId, setPendingOrderId] = useState<string>('');
  const snapShownRef = useRef(false);

  // Function to re-fetch subscription status
  const refetchSubscriptionStatus = async () => {
    if (user?.email) {
      setSubLoading(true);
      try {
        const res = await fetch(
          `/api/auth/register?email=${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
        setSubscriptionStatus(
          (data.status as 'active' | 'inactive' | 'none') || 'none'
        );
      } catch (e) {
        setSubscriptionStatus('none');
      } finally {
        setSubLoading(false);
      }
    }
  };

  // Helper to get/set Snap token in localStorage
  const getStoredSnapToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('snap_token') || null;
    }
    return null;
  };
  const setStoredSnapToken = (token: string | null) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('snap_token', token);
      } else {
        localStorage.removeItem('snap_token');
      }
    }
  };

  // Get subscribe price from env
  const subscribePrice =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE
      ? parseInt(process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE, 10)
      : 10000;

  async function handleSubscribePayment(
    user: { email?: string | null } | null
  ) {
    try {
      const email = user?.email ?? undefined;
      if (!email) {
        alert('User email not found or not registered.');
        return;
      }
      // Check for existing order_id in localStorage
      let orderId: string = localStorage.getItem('snap_order_id') || '';
      let snapToken: string = getStoredSnapToken() || '';
      if (!orderId) {
        // No order_id, create new Snap transaction
        const res = await fetch('/api/subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            customer_details: {
              first_name: 'John',
              last_name: 'Doe',
              email: email,
              phone: '08123456789',
            },
            item_details: [
              {
                id: 'sub001',
                price: subscribePrice,
                quantity: 1,
                name: 'Subscription',
              },
            ],
          }),
        });
        const data = await res.json();
        if (data.token && data.order_id) {
          snapToken = data.token;
          orderId = data.order_id;
          setStoredSnapToken(snapToken);
          localStorage.setItem('snap_order_id', orderId);
        } else {
          alert(
            'Failed to get payment token: ' + (data.error || 'Unknown error')
          );
          return;
        }
        // Show Snap
        if (window.snap && window.snap.pay) {
          window.snap.pay(snapToken, {
            onSuccess: async function (result: unknown) {
              setShowSuccessModal(true);
              console.log('Success:', result);
              try {
                const orderId =
                  typeof result === 'object' && result && 'order_id' in result
                    ? (result as { order_id: string }).order_id
                    : '';
                if (orderId) {
                  await fetch('/api/subscription', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      order_id: orderId,
                      transaction_status: 'paid',
                      plan: 'pro',
                    }),
                  });
                }
              } catch (e) {
                console.error(
                  'Failed to update order/subscription after payment:',
                  e
                );
              }
              await refetchSubscriptionStatus();
              setStoredSnapToken('');
              localStorage.removeItem('snap_order_id');
            },
            onPending: function (result: unknown) {
              alert('Payment Pending!');
              console.log('Pending:', result);
            },
            onError: function (result: unknown) {
              alert('Payment Error!');
              console.log('Error:', result);
            },
            onClose: function () {
              alert('Payment popup closed without finishing the payment');
            },
          });
        } else {
          alert('Midtrans Snap.js is not loaded.');
        }
        return;
      }
      // If order_id exists, check its status
      const orderIdNum = orderId.replace('order-', '');
      const orderRes = await fetch(`/api/order-status?id=${orderIdNum}`);
      const orderData = await orderRes.json();
      if (orderData.status === 'pending') {
        // Show Snap with stored token
        if (!snapToken) {
          alert('No Snap token available. Please try again.');
          return;
        }
        if (window.snap && window.snap.pay) {
          window.snap.pay(snapToken, {
            onSuccess: async function (result: unknown) {
              setShowSuccessModal(true);
              console.log('Success:', result);
              try {
                const orderId =
                  typeof result === 'object' && result && 'order_id' in result
                    ? (result as { order_id: string }).order_id
                    : '';
                if (orderId) {
                  await fetch('/api/subscription', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      order_id: orderId,
                      transaction_status: 'paid',
                      plan: 'pro',
                    }),
                  });
                }
              } catch (e) {
                console.error(
                  'Failed to update order/subscription after payment:',
                  e
                );
              }
              await refetchSubscriptionStatus();
              setStoredSnapToken('');
              localStorage.removeItem('snap_order_id');
            },
            onPending: function (result: unknown) {
              alert('Payment Pending!');
              console.log('Pending:', result);
            },
            onError: function (result: unknown) {
              alert('Payment Error!');
              console.log('Error:', result);
            },
            onClose: function () {
              alert('Payment popup closed without finishing the payment');
            },
          });
        } else {
          alert('Midtrans Snap.js is not loaded.');
        }
      } else {
        // Not pending, clear and create new Snap transaction
        setStoredSnapToken('');
        localStorage.removeItem('snap_order_id');
        await handleSubscribePayment(user); // Recursively call to create new transaction
      }
    } catch (err) {
      let message = 'Unknown error';
      if (err instanceof Error) message = err.message;
      else if (typeof err === 'string') message = err;
      alert('Error: ' + message);
    }
  }

  // Fetch latest pending order and token for the user
  const fetchPendingOrderToken = async () => {
    if (user?.email) {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          customer_details: {
            first_name: 'John',
            last_name: 'Doe',
            email: user.email,
            phone: '08123456789',
          },
          item_details: [
            {
              id: 'sub001',
              price: subscribePrice,
              quantity: 1,
              name: 'Subscription',
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.token && data.order_id) {
        // Check order status
        const orderIdNum = data.order_id.replace('order-', '');
        const orderRes = await fetch(`/api/order-status?id=${orderIdNum}`);
        const orderData = await orderRes.json();
        if (orderData.status === 'pending') {
          setPendingOrderToken(data.token);
          setPendingOrderId(data.order_id);
        } else {
          setPendingOrderToken('');
          setPendingOrderId('');
        }
      }
    }
  };

  // On mount or user change, check for pending order
  useEffect(() => {
    snapShownRef.current = false;
    fetchPendingOrderToken();
  }, [user]);

  // Remove the useEffect that triggers Snap automatically for pending orders
  // Only call handleSubscribePayment when the user clicks the Subscribe button

  // Environment
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
  const isProduction =
    process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true';

  // Fetch subscription status
  useEffect(() => {
    refetchSubscriptionStatus();
  }, [user]);

  // Load Snap.js
  useEffect(() => {
    loadSnapJs(clientKey, isProduction);
  }, [clientKey, isProduction]);

  // Navigation helpers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Page context
  const isFeaturesPage = pathname === '/features';
  const isPromptGeneratorPage = pathname === '/prompt-generator';
  const isVideoPromptGeneratorPage = pathname === '/ai-video-prompt-generator';
  const isAudioPromptGeneratorPage = pathname === '/ai-audio-prompt-generator';

  // Render
  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative border border-gray-200 dark:border-gray-700">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowSuccessModal(false)}
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
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-md bg-black/20 backdrop-blur-sm border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <section
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 sidebar-bg backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-gradient">
              {isFeaturesPage
                ? 'Features'
                : isPromptGeneratorPage
                  ? 'Image Prompt Generator'
                  : isVideoPromptGeneratorPage
                    ? 'Video Prompt Generator'
                    : isAudioPromptGeneratorPage
                      ? 'Audio Prompt Generator'
                      : 'Portfolio'}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-4">
              {isFeaturesPage ? (
                // Features page navigation
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('intro')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Welcome
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('one')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Who we are
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('two')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      What we do
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('three')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Get in touch
                    </button>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      ← Back to Portfolio
                    </Link>
                  </li>
                </>
              ) : isPromptGeneratorPage ||
                isVideoPromptGeneratorPage ||
                isAudioPromptGeneratorPage ? (
                // Prompt Generator pages navigation
                <>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      ← Back to Portfolio
                    </Link>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/features"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      View Features →
                    </Link>
                  </li>
                  {isPromptGeneratorPage ? (
                    <>
                      <li>
                        <Link
                          href="/ai-video-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Video Prompt Generator →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ai-audio-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Audio Prompt Generator →
                        </Link>
                      </li>
                    </>
                  ) : isVideoPromptGeneratorPage ? (
                    <>
                      <li>
                        <Link
                          href="/prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Image Prompt Generator →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ai-audio-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Audio Prompt Generator →
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Image Prompt Generator →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ai-video-prompt-generator"
                          className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                          onClick={() => setIsOpen(false)}
                        >
                          Video Prompt Generator →
                        </Link>
                      </li>
                    </>
                  )}
                </>
              ) : (
                // Portfolio page navigation (root)
                <>
                  <li>
                    <button
                      onClick={() => scrollToSection('hero')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('about')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('skills')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Skills
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('experience')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Experience
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('education')}
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium"
                    >
                      Education
                    </button>
                  </li>
                  <li className="pt-4 border-t border-white/20">
                    <Link
                      href="/features"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      View Features →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/prompt-generator"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Image Prompt Generator →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ai-video-prompt-generator"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Video Prompt Generator →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ai-audio-prompt-generator"
                      className="w-full text-left text-white hover:text-cyan-300 transition-colors duration-200 text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Audio Prompt Generator →
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Authentication Section */}
          <div className="pt-4 border-t border-white/20 mb-4">
            <div className="text-center">
              <GoogleLoginButton
                size="small"
                variant="outline"
                className="w-full"
              />
              {user && (
                <div className="mt-3 flex justify-center min-h-[32px]">
                  {subLoading ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-pulse"></span>
                      Checking subscription...
                    </span>
                  ) : subscriptionStatus === 'active' ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      Active Subscription
                    </span>
                  ) : subscriptionStatus === 'inactive' ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                      Inactive Subscription
                    </span>
                  ) : subscriptionStatus === 'none' ? (
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                      No Subscription
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/20">
            <p className="text-sm text-gray-400">© 2025 Marifat Maruf</p>
          </div>

          {/* Subscribe Button */}
          <li className="pt-4 border-t border-white/20 flex justify-center">
            <button
              className="mt-4 px-4 py-2 text-sm font-semibold rounded-md shadow bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all border border-cyan-500"
              style={{ letterSpacing: '0.04em' }}
              onClick={() => handleSubscribePayment(user)}
            >
              Subscribe
            </button>
          </li>
        </div>
      </section>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
