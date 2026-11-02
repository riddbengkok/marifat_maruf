'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { handleSubscribePayment } from '../Auth/handleSubscribePayment';
import { SidebarContext } from './SidebarContext';
import { AuthenticationSection } from './components/AuthenticationSection';
import { NavigationLinks } from './components/NavigationLinks';
import { SuccessModal } from './components/SuccessModal';
import { useSubscription } from './hooks/useSubscription';
import { PAGE_TITLES } from './utils';

const Sidebar = () => {
  // State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isOpen, setIsOpen, sidebarExpanded, setSidebarContext } =
    useContext(SidebarContext);
  const [anonLeft, setAnonLeft] = useState(10);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // Hooks
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { subscriptionStatus, subLoading } = useSubscription(
    user?.email || undefined
  );

  // Persisting handled by SidebarProvider

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarContext(!sidebarExpanded);
  };

  // Page context (unused; removed)

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 p-2 rounded-xl bg-slate-900 border border-white/[0.1] text-slate-300 hover:text-white hover:bg-slate-800 shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
          sidebarExpanded ? 'left-68' : 'left-4'
        }`}
        aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-controls="sidebar"
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-200 ${
            !sidebarExpanded && 'rotate-180'
          }`}
        />
      </button>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-xl bg-slate-900/90 backdrop-blur-sm border border-white/[0.1] text-slate-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open sidebar menu"
      >
        <svg
          className="w-5 h-5"
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#090d16]/95 backdrop-blur-xl border-r border-white/[0.08] transform transition-transform duration-200 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${sidebarExpanded ? 'lg:translate-x-0' : 'lg:-translate-x-full'}
          lg:block
        `}
        style={{ touchAction: isOpen ? 'none' : undefined }}
        aria-hidden={!isOpen && isMobileViewport}
        role="complementary"
        aria-label="Primary sidebar"
      >
        <div className="flex flex-col h-full p-5">
          {/* Logo/Brand */}
          <div className="mb-6 flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <Link
              href="/"
              className="text-base font-bold text-white tracking-tight"
            >
              {PAGE_TITLES[pathname] || 'Marifat Maruf'}
            </Link>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
              v2.4
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto pr-1">
            <NavigationLinks
              pathname={pathname}
              setIsOpen={setIsOpen}
              isFeaturesPage={false}
              isGeneratorPage={false}
            />
          </nav>

          {/* Authentication Section */}
          <div className="pt-4 border-t border-white/[0.06]">
            <AuthenticationSection
              user={user}
              subscriptionStatus={subscriptionStatus}
              subLoading={subLoading}
              onSubscribe={handleSubscribe}
            />
          </div>

          {/* Non-login free quota notice */}
          {!user && (
            <div className="mt-3 p-2.5 text-[11px] rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400">
              Analyses quota:{' '}
              <span className="font-semibold text-slate-200">
                {anonLeft}/10
              </span>
            </div>
          )}

          {/* Footer & Subscribe */}
          <div className="pt-4 mt-2 border-t border-white/[0.06]">
            <button
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-white text-slate-950 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white shadow-sm"
              onClick={handleSubscribe}
            >
              {t('btn.subscribe') || 'Upgrade to Pro'}
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2 font-mono">
              &copy; {new Date().getFullYear()} Marifat Maruf
            </p>
          </div>
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
    </>
  );
};

export default Sidebar;
