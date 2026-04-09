/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import { useAnalytics } from '@/src/hooks/useAnalytics';

const DesktopLayout = lazy(() => import('./components/DesktopLayout'));
const Layout = lazy(() => import('./components/Layout'));
const DesktopHome = lazy(() => import('./components/DesktopHome'));
const DesktopTransactions = lazy(() => import('./components/DesktopTransactions'));
const DesktopSpending = lazy(() => import('./components/DesktopSpending'));
const DesktopInsights = lazy(() => import('./components/DesktopInsights'));
const DesktopSettings = lazy(() => import('./components/DesktopSettings'));
const Home = lazy(() => import('./components/Home'));
const Stats = lazy(() => import('./components/Stats'));
const Wallet = lazy(() => import('./components/Wallet'));
const Me = lazy(() => import('./components/Me'));
const Onboarding = lazy(() => import('./components/Onboarding'));

export default function App() {
  const [activeTab, setActiveTab] = useLocalStorage<string>('active_tab', 'home');
  const [showAssistant, setShowAssistant] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [completedOnboarding, setCompletedOnboarding] = useLocalStorage<boolean>('completed_onboarding', false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const mainRef = useRef<HTMLElement>(null);
  const { trackEvent } = useAnalytics();

  const handleCompleteOnboarding = () => {
    setCompletedOnboarding(true);
  };

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mobileTabs = ['home', 'stats', 'wallet', 'me'];
    if (!isDesktop && !mobileTabs.includes(activeTab)) {
      setActiveTab('home');
    }
  }, [activeTab, isDesktop, setActiveTab]);

  // Scroll to top when tab changes
  useEffect(() => {
    // Primary: scroll the main ref (the scrollable container)
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    // Secondary: scroll window as fallback
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  useEffect(() => {
    trackEvent('page_load', {
      viewport: isDesktop ? 'desktop' : 'mobile',
      section: activeTab,
    });
  }, []);

  useEffect(() => {
    trackEvent('navigation_tab_change', {
      tab: activeTab,
      viewport: isDesktop ? 'desktop' : 'mobile',
    });
  }, [activeTab, isDesktop, trackEvent]);

  const renderDesktopContent = () => {
    switch (activeTab) {
      case 'home': return <DesktopHome />;
      case 'transactions': return <DesktopTransactions />;
      case 'stats': return <DesktopSpending />;
      case 'insights': return <DesktopInsights />;
      case 'settings': return <DesktopSettings />;
      case 'wallet': return <Wallet />;
      case 'me': return <Me />;
      default: return <DesktopHome />;
    }
  };

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'home': return <Home onOpenSend={() => setShowSendModal(true)} />;
      case 'stats': return <Stats />;
      case 'wallet': return <Wallet />;
      case 'me': return <Me />;
      default: return <Home onOpenSend={() => setShowSendModal(true)} />;
    }
  };

  if (!completedOnboarding && !isDesktop) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Onboarding onComplete={handleCompleteOnboarding} />
      </Suspense>
    );
  }

  // Desktop Layout
  if (isDesktop) {
    return (
      <Suspense fallback={<PageFallback />}>
        <DesktopLayout activePage={activeTab} onNavigate={setActiveTab}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderDesktopContent()}
            </motion.div>
          </AnimatePresence>
        </DesktopLayout>
      </Suspense>
    );
  }

  // Mobile Layout
  return (
    <Suspense fallback={<PageFallback />}>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} mainRef={mainRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderMobileContent()}
          </motion.div>
        </AnimatePresence>

        {/* Floating Action Button for AI Assistant */}
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[70]">
          <Button
            onClick={() => {
              trackEvent('assistant_open_click', { source: 'mobile_fab' });
              setShowAssistant(true);
            }}
            className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(0,212,106,0.4)] active:scale-90 transition-transform p-0 hover:shadow-[0_16px_32px_rgba(0,212,106,0.5)]"
          >
            <Sparkles className="h-6 w-6 text-on-primary-container" />
          </Button>
        </div>

      {/* AI Assistant Overlay */}
        <AnimatePresence>
          {showAssistant && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-on-surface/20 backdrop-blur-sm px-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-sm bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
              >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full"
                onClick={() => setShowAssistant(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative mb-8">
                <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center z-10 relative">
                  <BrainIcon className="h-10 w-10 text-on-primary-container" />
                </div>
                <svg
                  className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] opacity-20 pointer-events-none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M50 0 L50 20 M50 80 L50 100 M0 50 L20 50 M80 50 L100 50"
                    stroke="#006d33"
                    strokeWidth="2"
                  ></path>
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="#00d46a"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  ></circle>
                </svg>
              </div>

              <h2 className="text-2xl font-extrabold text-primary mb-4 leading-tight">
                Press and hold for Voice Assistant
              </h2>
              <p className="text-on-surface-variant text-base leading-relaxed mb-10">
                Press and hold for the AI Voice Assistant feature and enjoy the ease of managing your finances.
              </p>

              <div className="w-full space-y-4">
                <Button
                  className="w-full py-7 bg-primary-container hover:opacity-90 active:scale-[0.98] transition-all rounded-full text-on-primary-container font-bold text-lg shadow-lg shadow-primary-container/20"
                  onClick={() => setShowAssistant(false)}
                >
                  Let's try
                </Button>
                <Button
                  variant="ghost"
                  className="w-full py-7 text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors rounded-full"
                  onClick={() => setShowAssistant(false)}
                >
                  Skip
                </Button>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Send Money Modal */}
        <AnimatePresence>
          {showSendModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-end bg-on-surface/20 backdrop-blur-sm"
              onClick={() => setShowSendModal(false)}
            >
              <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                exit={{ y: 500 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-full bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
              <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-100/50">
                <h2 className="text-lg font-bold text-on-surface">Send Money</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSendModal(false)}
                  className="rounded-full"
                  aria-label="Close send modal"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
                <div className="overflow-y-auto max-h-[80vh]">
                  <Me onClose={() => setShowSendModal(false)} isModal={true} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </Suspense>
  );
}

function PageFallback() {
  return <div className="min-h-screen bg-[#fcfcfc]" aria-busy="true" />;
}

function BrainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 4.512a9.1 9.1 0 0 0-3.39 1.627L4 7.5" />
      <path d="M12 3v2" />
      <path d="M15 4.512a9.1 9.1 0 0 1 3.39 1.627L20 7.5" />
      <path d="m3.4 10.5 2 1" />
      <path d="m20.6 10.5-2 1" />
      <path d="M9 22.074V10a3 3 0 0 1 6 0v12.074" />
      <path d="M2 13.12h2.23" />
      <path d="M20 13.12h1.77" />
      <path d="m3.4 15.5 2-1" />
      <path d="m20.6 15.5-2-1" />
      <path d="M15 19.488a9.1 9.1 0 0 1 3.39-1.627L20 16.5" />
      <path d="M12 21v-2" />
      <path d="M9 19.488a9.1 9.1 0 0 0-3.39-1.627L4 16.5" />
    </svg>
  );
}

