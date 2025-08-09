'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { handleSubscribePayment } from '../Auth/handleSubscribePayment';
import { SidebarContext } from './SidebarContext';
import { AuthenticationSection } from './components/AuthenticationSection';
import { NavigationLinks } from './components/NavigationLinks';
import { SuccessModal } from './components/SuccessModal';
import { usePayment } from './hooks/usePayment';
import { useSubscription } from './hooks/useSubscription';
import { PAGE_TITLES, loadSnapJs } from './utils';

const Sidebar = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [anonLeft, setAnonLeft] = useState(10);

  // Hooks
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { subscriptionStatus, subLoading } = useSubscription(
    user?.email || undefined
  );
  const { pendingOrderToken, pendingOrderId } = usePayment(user || undefined);

  // Environment
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
  const isProduction =
    process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true';

  // Load Snap.js
  useEffect(() => {
    loadSnapJs(clientKey, isProduction);
  }, [clientKey, isProduction]);

  // Page context
  const isFeaturesPage = pathname === '/features';
  const isGeneratorPage =
    pathname.startsWith('/ai-') || pathname === '/teleprompter';

  const handleSubscribe = () => {
    if (user) {
      handleSubscribePayment({ email: user.email });
    }
  };

  useEffect(() => {
    const used =
      parseInt(localStorage.getItem('anonImageAnalysisCount') || '0', 10) || 0;
    setAnonLeft(Math.max(0, 10 - used));
  }, [user]); // resets when user logs in

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        sidebarExpanded,
        setSidebarContext: setSidebarExpanded,
      }}
    >
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-md bg-black/20 backdrop-blur-sm border border-white/20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open sidebar menu"
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
        className={`fixed inset-y-0 left-0 z-40 w-64 sidebar-bg backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:block
        `}
        style={{ touchAction: isOpen ? 'none' : undefined }}
        aria-hidden={
          !isOpen && typeof window !== 'undefined' && window.innerWidth < 1024
        }
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-gradient">
              {PAGE_TITLES[pathname] || 'Portfolio'}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <NavigationLinks
                pathname={pathname}
                setIsOpen={setIsOpen}
                isFeaturesPage={false}
                isGeneratorPage={false}
              />
            </ul>
          </nav>

          {/* Authentication Section */}
          <AuthenticationSection
            user={user}
            subscriptionStatus={subscriptionStatus}
            subLoading={subLoading}
            onSubscribe={handleSubscribe}
          />

          {/* Non-login free quota notice */}
          {!user && (
            <div className="mt-3 p-2 text-xs rounded bg-gray-800/60 border border-gray-700/60 text-gray-300">
              Free image analyses left:{' '}
              <span className="font-semibold">{anonLeft}/10</span>. Sign in for
              unlimited usage.
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-white/20">
            <p className="text-sm text-gray-400">{t('footer.copyright')}</p>
          </div>

          {/* Subscribe Button */}
          <li className="pt-4 border-t border-white/20 flex justify-center">
            <button
              className="mt-4 px-4 py-2 text-sm font-semibold rounded-md shadow bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all border border-cyan-500"
              style={{ letterSpacing: '0.04em' }}
              onClick={handleSubscribe}
            >
              {t('btn.subscribe')}
            </button>
          </li>
        </div>
      </section>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
    </SidebarContext.Provider>
  );
};

export default Sidebar;
