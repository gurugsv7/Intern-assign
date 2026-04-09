import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MoreVertical,
  CreditCard,
  ChevronDown,
  Delete,
  Camera,
  RefreshCcw,
  AlertTriangle,
  Sparkles,
  Bell,
  Menu,
  ScanLine,
  HandCoins,
  ArrowLeftRight,
  ReceiptText,
  Smartphone,
  Grid2x2,
  ListChecks,
  BanknoteArrowDown,
  CalendarClock,
  BriefcaseBusiness,
  Filter,
  MessageCircleHeart,
  FileSearch,
  Shield,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  WalletCards,
  Settings,
  UserRound,
  Lock,
  LogOut,
  Gift,
  Send,
  House,
  ChartNoAxesColumn,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PageMode = 'overview' | 'analytics' | 'workflow';
type ThemeTone = 'emerald' | 'ocean' | 'sunset' | 'slate';

interface MobileMockPageProps {
  pageKey: string | null;
  onClose: () => void;
}

interface MockCardConfig {
  label: string;
  value: string;
}

interface MockPageConfig {
  title: string;
  subtitle: string;
  eyebrow: string;
  icon: React.ReactNode;
  cards: MockCardConfig[];
  checklist: string[];
  cta: string;
  mode: PageMode;
  tone: ThemeTone;
}

const TONE_STYLES: Record<ThemeTone, { shell: string; iconShell: string; chip: string; primaryButton: string; badge: string; }> = {
  emerald: {
    shell: 'bg-[radial-gradient(circle_at_12%_14%,rgba(16,185,129,0.20),transparent_44%),radial-gradient(circle_at_90%_8%,rgba(5,150,105,0.16),transparent_48%)]',
    iconShell: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    chip: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    primaryButton: 'from-emerald-700 to-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  ocean: {
    shell: 'bg-[radial-gradient(circle_at_14%_20%,rgba(14,165,233,0.22),transparent_44%),radial-gradient(circle_at_88%_10%,rgba(2,132,199,0.18),transparent_48%)]',
    iconShell: 'bg-sky-50 border-sky-200 text-sky-700',
    chip: 'bg-sky-50 border-sky-200 text-sky-800',
    primaryButton: 'from-sky-700 to-cyan-500',
    badge: 'bg-sky-100 text-sky-800',
  },
  sunset: {
    shell: 'bg-[radial-gradient(circle_at_15%_16%,rgba(251,146,60,0.25),transparent_44%),radial-gradient(circle_at_88%_8%,rgba(249,115,22,0.20),transparent_48%)]',
    iconShell: 'bg-orange-50 border-orange-200 text-orange-700',
    chip: 'bg-orange-50 border-orange-200 text-orange-800',
    primaryButton: 'from-orange-700 to-amber-500',
    badge: 'bg-orange-100 text-orange-800',
  },
  slate: {
    shell: 'bg-[radial-gradient(circle_at_12%_14%,rgba(100,116,139,0.22),transparent_44%),radial-gradient(circle_at_88%_8%,rgba(71,85,105,0.18),transparent_48%)]',
    iconShell: 'bg-slate-100 border-slate-200 text-slate-700',
    chip: 'bg-slate-100 border-slate-200 text-slate-800',
    primaryButton: 'from-slate-800 to-slate-600',
    badge: 'bg-slate-200 text-slate-800',
  },
};

const DESTINATION_CONFIG: Record<string, MockPageConfig> = {
  'menu-hub': page('Command Center', 'Quick launcher for finance workflows, alerts, and smart shortcuts.', 'Navigation', <Menu className="h-5 w-5" />, ['12 widgets', '3 pinned'], ['Switch dashboard modes in one tap', 'Pin most-used actions to the top rail', 'Jump to assistant, analytics, or account instantly'], 'Customize shortcuts', 'overview', 'emerald'),
  'notification-center': page('Signal Center', 'A feed of approvals, bill reminders, and risk notifications.', 'Notifications', <Bell className="h-5 w-5" />, ['8 alerts', '2 urgent'], ['Auto-categorized by urgency and account', 'Batch actions for approve, snooze, archive', 'Inline AI summary for each alert'], 'Review all alerts', 'workflow', 'sunset'),
  'receive-money': page('Receive Money', 'Generate a smart payment request link with note, due date, and split options.', 'Incoming', <HandCoins className="h-5 w-5" />, ['4 methods', '< 5 sec'], ['UPI, bank transfer, and wallet QR support', 'Auto-reminder if request is not paid', 'Request templates for rent, salary, and reimbursements'], 'Create request', 'workflow', 'emerald'),
  'send-money': page('Send Money', 'Fast transfer composer with beneficiary shortcuts and fee preview.', 'Outgoing', <Send className="h-5 w-5" />, ['1 tap beneficiary', 'Live fee'], ['Recent contacts pinned on top', 'Fee and ETA shown before confirm', 'Optional note and receipt share at send'], 'Continue transfer', 'workflow', 'ocean'),
  'scan-and-pay': page('Scan and Pay', 'Camera-first payment flow with anti-fraud checks and merchant enrichment.', 'Scan', <ScanLine className="h-5 w-5" />, ['0.6 sec detect', '99.8% match'], ['Merchant confidence score before pay', 'Auto-fill amount from invoice QR', 'One-swipe receipt save and export'], 'Start scanner', 'workflow', 'ocean'),
  'quick-services': page('Service Galaxy', 'A curated panel of top actions based on your spending behavior.', 'Quick Services', <Grid2x2 className="h-5 w-5" />, ['16 actions', 'AI ranked'], ['Promotes frequent and high-impact services', 'Seasonal bundles for tax and travel', 'One-touch setup for recurring payments'], 'Open all services', 'overview', 'emerald'),
  'transfer-hub': page('Transfer Hub', 'Move funds across accounts with fees, ETA, and risk all previewed.', 'Transfer', <ArrowLeftRight className="h-5 w-5" />, ['0 fees tier', 'Instant ETA'], ['Compares transfer rails before sending', 'Smart routing to reduce delay', 'Fraud guard verification on high value'], 'Preview transfer', 'workflow', 'ocean'),
  'bill-pay': page('Bills Control', 'Manage utilities, cards, and subscriptions from a single timeline.', 'Bills', <ReceiptText className="h-5 w-5" />, ['11 bills', '4 due soon'], ['Auto-detect recurring services', 'One-tap pay-all for selected bills', 'Late fee warning with alternatives'], 'Pay due bills', 'workflow', 'sunset'),
  'data-topup': page('Data Top-up', 'Recharge flow with plan recommendation from recent usage.', 'Recharge', <Smartphone className="h-5 w-5" />, ['3 plans', 'Best fit'], ['Suggests plan by last 30 days usage', 'Family bundle comparison included', 'Expiry reminders with auto-renew option'], 'Select plan', 'overview', 'ocean'),
  'service-marketplace': page('More Services', 'Discover insurance, travel vaults, and investment automations.', 'Marketplace', <Grid2x2 className="h-5 w-5" />, ['27 modules', 'New weekly'], ['Premium add-ons with ROI estimates', 'Verified providers with trust badges', 'One-click trial for eligible modules'], 'Browse modules', 'overview', 'sunset'),
  'activity-timeline': page('Activity Timeline', 'A searchable ledger of transfers, payouts, and card usage.', 'History', <ListChecks className="h-5 w-5" />, ['218 records', 'Realtime'], ['Smart filters by purpose and channel', 'Dispute-ready record snapshots', 'Export as PDF or CSV in one tap'], 'View complete history', 'analytics', 'slate'),
  'transaction-detail': page('Transaction Spotlight', 'Detail page with metadata, proof, and follow-up actions.', 'Transaction', <BanknoteArrowDown className="h-5 w-5" />, ['6 metadata fields', 'Verified'], ['Counterparty and channel fingerprint', 'Full timeline from initiation to settlement', 'Retry, share receipt, and raise dispute'], 'Open full receipt', 'workflow', 'slate'),
  'period-selector': page('Period Studio', 'Switch monthly, weekly, or custom windows with forecasting overlays.', 'Analytics', <CalendarClock className="h-5 w-5" />, ['9 presets', 'Forecast on'], ['Live recalculation of spending deltas', 'Compare against previous period instantly', 'Projection confidence score per category'], 'Apply period', 'analytics', 'ocean'),
  'portfolio-options': page('Portfolio Options', 'Allocation panel for safer and growth-focused strategies.', 'Investment', <BriefcaseBusiness className="h-5 w-5" />, ['3 strategies', 'Risk mapped'], ['Balanced, growth, and income templates', 'Projected outcome with confidence bands', 'Auto-rebalance suggestion every payday'], 'Compare strategies', 'analytics', 'emerald'),
  'allocation-filter': page('Filter Lab', 'Advanced controls for category, value, merchant, and anomaly.', 'Filters', <Filter className="h-5 w-5" />, ['14 filters', 'Live'], ['Multi-select chips with quick presets', 'Anomaly view for unusual spikes', 'Save filter sets for repeat audits'], 'Apply filters', 'workflow', 'slate'),
  'advisor-chat': page('Advisor Chat', 'Secure chat workspace with your assigned wealth advisor.', 'Human Advisor', <MessageCircleHeart className="h-5 w-5" />, ['2 min SLA', 'Encrypted'], ['File share for statements and notes', 'Priority queue for premium users', 'Meeting scheduler with one tap'], 'Start secure chat', 'overview', 'sunset'),
  'portfolio-report': page('Portfolio Summary', 'Deep report of inflow, outflow, and cash efficiency opportunities.', 'AI Report', <FileSearch className="h-5 w-5" />, ['14 insights', 'Auto-updated'], ['Highlights inefficient recurring spends', 'Suggests reallocation per goal timeline', 'Produces executive summary for export'], 'Generate report', 'analytics', 'emerald'),
  'emergency-plan': page('Emergency Plan', 'Build a resilient reserve strategy tailored to your risk tolerance.', 'Safety', <Shield className="h-5 w-5" />, ['6-month plan', 'Adaptive'], ['Tracks coverage against monthly burn', 'Recommends safe parking instruments', 'Auto-adjust target when expenses shift'], 'Create safety plan', 'workflow', 'slate'),
  'spending-optimizer': page('Spending Optimizer', 'Simulator to reduce waste while preserving your lifestyle.', 'Optimization', <TrendingDown className="h-5 w-5" />, ['12% cut target', 'Behavior based'], ['Finds low-pain categories to trim first', 'Shows impact before you commit changes', 'Weekly nudges for sustained improvement'], 'Run optimization', 'analytics', 'sunset'),
  'micro-investing': page('Micro-Investing', 'Round-up and drip investing flow with risk and tax awareness.', 'Growth', <PiggyBank className="h-5 w-5" />, ['Auto round-up', 'Tax aware'], ['Spare-change investing from every spend', 'Portfolio drift guardrails included', 'Tax season export support built in'], 'Activate auto-invest', 'overview', 'ocean'),
  'insight-drilldown': page('Insight Drilldown', 'Detailed explanation of each insight with confidence and actions.', 'Insight Feed', <TrendingUp className="h-5 w-5" />, ['Confidence 91%', 'Actionable'], ['Breaks down assumptions behind each advice', 'Estimates upside and downside outcomes', 'Lets you mark adopted recommendations'], 'View evidence', 'analytics', 'ocean'),
  'attachment-center': page('Attachment Center', 'Upload bills, slips, and PDFs for richer assistant context.', 'Files', <WalletCards className="h-5 w-5" />, ['8 formats', 'OCR enabled'], ['Auto-read key values from receipts', 'Sensitive fields masked by default', 'Attach directly to an assistant prompt'], 'Upload file', 'workflow', 'slate'),
  'account-settings': page('Account Settings', 'Control profile, theme, limits, and app personalization.', 'Profile', <Settings className="h-5 w-5" />, ['22 settings', 'Synced'], ['Profile and preference management', 'Security-aware session settings', 'Device and notification controls'], 'Open settings', 'overview', 'slate'),
  'invite-friends': page('Referral Studio', 'Campaign dashboard for invites, rewards, and status tracking.', 'Referral', <Gift className="h-5 w-5" />, ['$100 reward', 'Tracked'], ['Share links with attribution tags', 'Real-time invite conversion tracking', 'Reward unlock milestones preview'], 'Send invite', 'overview', 'sunset'),
  'account-profile': page('My Profile', 'Edit personal info, linked accounts, and account identity details.', 'Identity', <UserRound className="h-5 w-5" />, ['3 accounts', 'Verified'], ['Manage profile and verification artifacts', 'Linked account health diagnostics', 'Preferred payout account selector'], 'Edit profile', 'workflow', 'slate'),
  'transaction-history': page('Transaction Archive', 'Complete archive view grouped by source and settlement state.', 'Archive', <ListChecks className="h-5 w-5" />, ['2 years', 'Indexed'], ['Filter by status, tags, and channels', 'Bulk export options for accounting', 'One-tap share for reconciliation'], 'Browse archive', 'analytics', 'slate'),
  'security-settings': page('Security Vault', 'Manage passkeys, biometric access, and transfer approvals.', 'Security', <Lock className="h-5 w-5" />, ['5 controls', 'Hardened'], ['Passkey and device trust policy', 'High-value transfer approval rules', 'Session and login anomaly monitor'], 'Strengthen security', 'workflow', 'slate'),
  'general-settings': page('General Preferences', 'Tune language, reminders, goals, and accessibility options.', 'Preferences', <Settings className="h-5 w-5" />, ['18 toggles', 'Cloud sync'], ['Localization and display options', 'Habit reminders with custom cadence', 'Accessibility-first interaction tuning'], 'Save preferences', 'overview', 'ocean'),
  'logout-flow': page('Secure Logout', 'Confirmation flow with session checks and trusted-device options.', 'Exit', <LogOut className="h-5 w-5" />, ['2-step', 'Safe'], ['Shows active devices before logout', 'Keep trusted devices if you choose', 'Optional quick relogin passkey setup'], 'Confirm logout', 'workflow', 'slate'),
};

function page(
  title: string,
  subtitle: string,
  eyebrow: string,
  icon: React.ReactNode,
  cards: [string, string],
  checklist: string[],
  cta: string,
  mode: PageMode,
  tone: ThemeTone
): MockPageConfig {
  return {
    title,
    subtitle,
    eyebrow,
    icon,
    cards: [
      { label: 'Key Metric', value: cards[0] },
      { label: 'Execution', value: cards[1] },
    ],
    checklist,
    cta,
    mode,
    tone,
  };
}

export default function MobileMockPage({ pageKey, onClose }: MobileMockPageProps) {
  if (pageKey === 'scan-and-pay') {
    return <ScanCameraDestination onClose={onClose} />;
  }

  if (pageKey === 'send-money') {
    return <SendMoneyDestination onClose={onClose} />;
  }

  const config = pageKey ? DESTINATION_CONFIG[pageKey] : undefined;

  if (!config) {
    return null;
  }

  const tone = TONE_STYLES[config.tone];

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] bg-white/75 backdrop-blur-md"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className={cn('h-full overflow-y-auto', tone.shell)}
        >
          <div className="sticky top-0 z-10 px-5 pt-6 pb-3 bg-gradient-to-b from-white/90 to-white/40 backdrop-blur-md border-b border-slate-200/70">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-slate-100"
                aria-label="Back to previous screen"
              >
                <ArrowLeft className="h-5 w-5 text-slate-700" />
              </Button>
              <span className="text-[10px] tracking-[0.24em] uppercase font-black text-slate-500">Destination Page</span>
              <div className="w-9" aria-hidden="true" />
            </div>
          </div>

          <div className="px-6 pb-10 pt-6 max-w-xl mx-auto space-y-6">
            <div className="rounded-[2rem] border border-slate-200/70 shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-6 overflow-hidden relative bg-white/80">
              <div className={cn('absolute right-4 top-4 w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm', tone.iconShell)}>
                {config.icon}
              </div>
              <div className={cn('inline-flex items-center gap-2 border rounded-full px-3 py-1 mb-4', tone.chip)}>
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black tracking-[0.22em] uppercase">{config.eyebrow}</span>
              </div>
              <h2 className="text-3xl font-black leading-tight text-slate-900 tracking-tight pr-12">{config.title}</h2>
              <p className="text-sm text-slate-600 mt-3 max-w-[36ch] leading-relaxed">{config.subtitle}</p>
            </div>

            {config.mode === 'overview' && (
              <OverviewSection config={config} tone={tone} />
            )}

            {config.mode === 'analytics' && (
              <AnalyticsSection config={config} tone={tone} />
            )}

            {config.mode === 'workflow' && (
              <WorkflowSection config={config} tone={tone} />
            )}

            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={onClose}
                className={cn('h-auto py-4 rounded-2xl text-white font-black tracking-wide bg-gradient-to-r', tone.primaryButton)}
              >
                {config.cta}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="h-auto py-4 rounded-2xl border-slate-300 text-slate-800 font-bold bg-white/80 hover:bg-slate-100"
              >
                Back To Mobile App
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}

function ScanCameraDestination({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<'requesting' | 'live' | 'error' | 'unsupported'>('requesting');
  const [errorMessage, setErrorMessage] = useState('');
  const [detected, setDetected] = useState(false);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    setDetected(false);
    setErrorMessage('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('unsupported');
      setErrorMessage('Camera API is not supported on this browser.');
      return;
    }

    setCameraState('requesting');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }

      setCameraState('live');
    } catch (error) {
      setCameraState('error');
      setErrorMessage('Unable to access camera. Please allow camera permission and retry.');
    }
  };

  const closeScanner = () => {
    stopCamera();
    onClose();
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (cameraState !== 'live') {
      return;
    }

    const timer = window.setTimeout(() => {
      setDetected(true);
    }, 2800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [cameraState]);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] bg-black"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            cameraState === 'live' ? 'opacity-100' : 'opacity-15'
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/65" />

        <header className="absolute top-0 left-0 right-0 z-10 px-6 py-5 flex items-center justify-between">
          <button
            type="button"
            onClick={closeScanner}
            className="text-white hover:bg-white/15 transition-colors p-2 rounded-full active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <h2 className="text-white font-semibold text-lg tracking-wide">Scan to Pay</h2>

          <button
            type="button"
            onClick={startCamera}
            className="text-white hover:bg-white/15 transition-colors p-2 rounded-full active:scale-95"
            aria-label="Restart camera"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </header>

        <div className="absolute inset-0 flex items-center justify-center px-8 pb-28">
          {cameraState === 'live' && (
            <div className="relative w-full max-w-sm aspect-square rounded-3xl border-2 border-white/85 shadow-[0_0_0_200vmax_rgba(0,0,0,0.18)] overflow-hidden">
              <motion.div
                initial={{ y: -120 }}
                animate={{ y: 320 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-[#00D46A] shadow-[0_0_18px_rgba(0,212,106,0.9)]"
              />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/85 font-bold">
                <span>Align QR inside frame</span>
                <span className="text-[#00D46A]">Live</span>
              </div>

              <div className="absolute inset-0 m-auto w-24 h-24 border border-dashed border-white/45 rounded-2xl" />
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 pb-7">
          {(cameraState === 'requesting' || cameraState === 'live') && !detected && (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 p-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">{cameraState === 'requesting' ? 'Requesting camera access...' : 'Scanning for merchant QR...'}</p>
                  <p className="text-xs text-slate-500">Keep the code centered for instant detection.</p>
                </div>
              </div>
            </div>
          )}

          {cameraState === 'live' && detected && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 font-black">Detected</p>
                  <h3 className="text-slate-900 font-black text-xl">Annette Groceries</h3>
                </div>
                <div className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Verified</div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-4">
                <div className="flex justify-between text-sm text-slate-500 mb-1">
                  <span>Suggested amount</span>
                  <span>Invoice</span>
                </div>
                <p className="text-3xl font-black text-slate-900">$84.00</p>
              </div>

              <Button
                onClick={closeScanner}
                className="w-full h-auto py-4 rounded-2xl text-white font-black bg-gradient-to-r from-[#006d33] to-[#00D46A]"
              >
                Continue to Payment
              </Button>
            </motion.div>
          )}

          {(cameraState === 'error' || cameraState === 'unsupported') && (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 p-5 shadow-2xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-orange-700" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Camera unavailable</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{errorMessage || 'Please grant camera permission to scan and pay.'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={closeScanner}
                  className="h-auto py-3 rounded-2xl"
                >
                  Go Back
                </Button>
                <Button
                  onClick={startCamera}
                  className="h-auto py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800"
                >
                  Retry Camera
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}

function SendMoneyDestination({ onClose }: { onClose: () => void }) {
  const [amountRaw, setAmountRaw] = useState('840.00');

  const amountValue = useMemo(() => {
    const parsed = Number.parseFloat(amountRaw);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, [amountRaw]);

  const displayAmount = useMemo(() => {
    return amountValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [amountValue]);

  const pressKey = (key: string) => {
    if (key === 'back') {
      setAmountRaw((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
      return;
    }

    if (key === '.') {
      setAmountRaw((prev) => (prev.includes('.') ? prev : `${prev}.`));
      return;
    }

    setAmountRaw((prev) => {
      if (prev === '0') {
        return key;
      }

      const next = `${prev}${key}`;
      const [, decimals = ''] = next.split('.');
      if (decimals.length > 2) {
        return prev;
      }
      return next;
    });
  };

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95]"
      >
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 45, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="h-full overflow-y-auto bg-[linear-gradient(180deg,#d1e5d4_0%,#f9f9ff_100%)]"
        >
          <header className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between bg-transparent">
            <button
              type="button"
              onClick={onClose}
              className="text-emerald-900 hover:bg-emerald-50 transition-colors p-2 rounded-full active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <h2 className="font-semibold text-lg text-emerald-950">Send Money</h2>

            <button
              type="button"
              className="text-emerald-900 hover:bg-emerald-50 transition-colors p-2 rounded-full active:scale-95"
              aria-label="More options"
            >
              <MoreVertical className="h-6 w-6" />
            </button>
          </header>

          <main className="max-w-md mx-auto px-6 pt-7">
            <section className="flex flex-col items-center justify-center mb-10">
              <div className="flex items-center">
                <span className="text-on-background/45 text-4xl font-light mr-2">$</span>
                <span className="text-6xl md:text-7xl font-bold tracking-tight text-primary">{displayAmount}</span>
                <span className="w-[3px] h-14 md:h-16 bg-primary-container ml-2 animate-pulse rounded-full" aria-hidden="true"></span>
              </div>
            </section>

            <section className="space-y-4 mb-10">
              <div className="bg-surface-container-lowest rounded-[2rem] p-5 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-transform hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="text-on-surface-variant font-medium text-sm">To:</div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-50">
                      <img
                        className="w-full h-full object-cover"
                        alt="Recipient"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCro--aOAaUHVRwgdrJ4WZWY2wVKVge7SjXr_VZs1auiIXAYYJ8VrZcptnGFDsXXa6vRfHshX3QmOb1_BNsvzTqvQRj8TZg3GgSxMUSdJJjWSChL2nt6tD5_ZwDT-8FGstt4diH_TZ3Qjkla1pDgjF9LeIU9CpnEl2wszltLMF6haU7lZlubrDXVsoTSJFFpPHDuf8Me68Mke_AF1IGphO-OfgqerYPHlqTce0OPput879Kpi16014DOMAkWsA6Euz2Cj80BIEQ8w0"
                      />
                    </div>
                    <span className="font-semibold text-on-surface text-[22px]">Annette</span>
                  </div>
                </div>
                <button className="text-primary text-sm font-bold tracking-wide hover:underline">Change</button>
              </div>

              <div className="bg-surface-container-lowest rounded-[2rem] p-5 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-transform hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-on-surface font-semibold text-[20px]">Your balance $2,024.8</div>
                    <div className="text-on-surface-variant text-xs">Main Mastercard • 4492</div>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-on-surface-variant" />
              </div>
            </section>

            <div className="mb-8">
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-5 rounded-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg">
                Send ${displayAmount}
                <Send className="h-5 w-5" />
              </button>
            </div>

            <section className="pb-32">
              <div className="grid grid-cols-3 gap-y-4 text-center">
                <KeyButton label="1" onPress={pressKey} />
                <KeyButton label="2" onPress={pressKey} />
                <KeyButton label="3" onPress={pressKey} />
                <KeyButton label="4" onPress={pressKey} />
                <KeyButton label="5" onPress={pressKey} />
                <KeyButton label="6" onPress={pressKey} />
                <KeyButton label="7" onPress={pressKey} />
                <KeyButton label="8" onPress={pressKey} />
                <KeyButton label="9" onPress={pressKey} />
                <KeyButton label="." onPress={pressKey} />
                <KeyButton label="0" onPress={pressKey} />
                <button
                  type="button"
                  onClick={() => pressKey('back')}
                  className="py-4 flex items-center justify-center text-on-surface active:bg-emerald-50 rounded-2xl transition-colors"
                  aria-label="Delete"
                >
                  <Delete className="h-8 w-8" />
                </button>
              </div>
            </section>
          </main>

          <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-white/70 backdrop-blur-2xl z-[96] border-t border-emerald-900/5 rounded-t-[2rem] shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
            <BottomNavItem icon={<House className="h-6 w-6" />} label="HOME" />
            <BottomNavItem icon={<ChartNoAxesColumn className="h-6 w-6" />} label="INSIGHTS" />
            <div className="flex flex-col items-center justify-center bg-[#00D46A] text-[#002B14] rounded-full px-5 py-2 transition-all duration-500 ease-out">
              <Wallet className="h-6 w-6 mb-1" />
              <span className="text-[11px] font-medium tracking-wide uppercase">WALLET</span>
            </div>
            <BottomNavItem icon={<ReceiptText className="h-6 w-6" />} label="ACTIVITY" />
            <BottomNavItem icon={<UserRound className="h-6 w-6" />} label="PROFILE" />
          </nav>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}

function KeyButton({ label, onPress }: { label: string; onPress: (key: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(label)}
      className="py-4 text-2xl font-semibold text-on-surface active:bg-emerald-50 rounded-2xl transition-colors"
    >
      {label}
    </button>
  );
}

function BottomNavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center text-emerald-900/60 px-5 py-2 hover:scale-110 transition-transform active:scale-95 duration-200">
      <span className="mb-1">{icon}</span>
      <span className="text-[11px] font-medium tracking-wide uppercase">{label}</span>
    </button>
  );
}

function OverviewSection({ config, tone }: { config: MockPageConfig; tone: { badge: string } }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {config.cards.map((card) => (
          <div key={card.label} className="rounded-3xl bg-white/90 border border-slate-200/80 p-4 shadow-sm">
            <p className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-500">{card.label}</p>
            <p className="text-lg font-black text-slate-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white/90 border border-slate-200/80 p-5 space-y-4">
        <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-600">Highlights</p>
        <div className="space-y-2">
          {config.checklist.map((item, index) => (
            <div key={item} className="flex gap-3 items-start">
              <div className={cn('w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-black', tone.badge)}>
                {index + 1}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AnalyticsSection({ config, tone }: { config: MockPageConfig; tone: { chip: string } }) {
  const bars = [72, 48, 90, 63];

  return (
    <>
      <div className="rounded-3xl bg-white/90 border border-slate-200/80 p-5 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-600">Performance Bands</p>
          <span className={cn('text-[10px] font-black uppercase tracking-[0.16em] rounded-full px-3 py-1 border', tone.chip)}>Live Analysis</span>
        </div>
        <div className="space-y-3">
          {bars.map((value, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                <span>Signal {idx + 1}</span>
                <span>{value}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white/90 border border-slate-200/80 p-5 space-y-3">
        <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-600">Signal Notes</p>
        {config.checklist.map((item) => (
          <div key={item} className="text-sm text-slate-700 leading-relaxed border-l-2 border-slate-300 pl-3 py-1">
            {item}
          </div>
        ))}
      </div>
    </>
  );
}

function WorkflowSection({ config, tone }: { config: MockPageConfig; tone: { badge: string; chip: string } }) {
  return (
    <>
      <div className="rounded-3xl bg-white/90 border border-slate-200/80 p-5 space-y-3">
        <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-600">Execution Flow</p>
        <div className="space-y-2">
          {config.checklist.map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-start gap-3">
              <div className={cn('w-6 h-6 rounded-full text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5', tone.badge)}>
                {index + 1}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white/90 border border-slate-200/80 p-5">
        <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-600 mb-3">Readiness</p>
        <div className="flex flex-wrap gap-2">
          <span className={cn('text-[10px] font-black uppercase tracking-[0.16em] rounded-full px-3 py-1 border', tone.chip)}>Identity ready</span>
          <span className={cn('text-[10px] font-black uppercase tracking-[0.16em] rounded-full px-3 py-1 border', tone.chip)}>Risk checks active</span>
          <span className={cn('text-[10px] font-black uppercase tracking-[0.16em] rounded-full px-3 py-1 border', tone.chip)}>ETA live</span>
        </div>
      </div>
    </>
  );
}
