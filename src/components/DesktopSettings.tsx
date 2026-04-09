import React, { useState } from 'react';
import {
  LockOpen,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { MOCK_PLATFORM_METRICS, MOCK_USER } from '@/src/lib/mockData';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';
import { useAnalytics } from '@/src/hooks/useAnalytics';

export default function DesktopSettings() {
  const [biometricSentinel, setBiometricSentinel] = useState(true);
  const [aiFraudDetection, setAiFraudDetection] = useState(true);
  const [quantumEncryption, setQuantumEncryption] = useState(false);
  const [interfaceMode, setInterfaceMode] = useLocalStorage<'light' | 'dark'>('interface_mode', 'light');
  const { trackEvent } = useAnalytics();

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900">
      <main className="py-12 px-8 lg:px-10 max-w-7xl mx-auto">
        <header className="mb-14">
          <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase mb-4">Architecture Suite</p>
          <h1 className="text-[56px] leading-none tracking-[-0.02em] font-black text-slate-900">Settings Configuration</h1>
        </header>

        <div className="grid grid-cols-12 gap-8 items-start">
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-2xl border-[6px] border-slate-100 p-1.5 mb-4 overflow-hidden">
                  <img
                    src={MOCK_USER.avatar}
                    alt="Architect profile"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h3 className="text-[34px] font-black tracking-tight text-slate-900 leading-none">{MOCK_USER.name}</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">{MOCK_USER.role}</p>
              </div>

              <div className="space-y-4 pt-7 border-t border-slate-200">
                <MetaRow label="Architect Tier" value={MOCK_USER.tier} valueClass="bg-slate-900 text-white" />
                <MetaRow label="Sovereign Status" value={MOCK_USER.sovereignStatus} valueClass="bg-emerald-50 text-emerald-700" />
                <MetaRow label="Last Synced" value={MOCK_USER.lastSynced} valueClass="text-slate-900" plain />
              </div>

              <button className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-transform">
                Update Architecture
              </button>
            </div>

            <div className="bg-slate-100/70 p-7 rounded-2xl border border-slate-200/60">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Environment Analytics</h4>
              <div className="space-y-5">
                <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full" style={{ width: `${MOCK_PLATFORM_METRICS.environmentEfficiencyPercent}%` }}></div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  System performance is optimized at {MOCK_PLATFORM_METRICS.environmentEfficiencyPercent}% efficiency. Data silos are currently encrypted and synced with global vault nodes.
                </p>
              </div>
            </div>
          </section>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-8">
            <section className="col-span-2 bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-60"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <LockOpen className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-[36px] font-black tracking-tight text-slate-900 leading-none">Security Vault</h2>
                </div>

                <div className="space-y-8">
                  <ToggleRow
                    title="Biometric Sentinel"
                    description="Require ultra-high fidelity facial scanning for all vault deployments and architecture changes."
                    enabled={biometricSentinel}
                    onToggle={() => {
                      const next = !biometricSentinel;
                      setBiometricSentinel(next);
                      trackEvent('preferences_change', { key: 'biometric_sentinel', value: next });
                    }}
                  />
                  <ToggleRow
                    title="AI Fraud Detection"
                    description="Continuous neural-net monitoring for anomalous transaction patterns and adversarial attempts."
                    enabled={aiFraudDetection}
                    onToggle={() => {
                      const next = !aiFraudDetection;
                      setAiFraudDetection(next);
                      trackEvent('preferences_change', { key: 'ai_fraud_detection', value: next });
                    }}
                  />
                  <ToggleRow
                    title="Quantum Encryption"
                    description="Enable lattice-based cryptographic algorithms to future-proof against quantum computing threats."
                    enabled={quantumEncryption}
                    onToggle={() => {
                      const next = !quantumEncryption;
                      setQuantumEncryption(next);
                      trackEvent('preferences_change', { key: 'quantum_encryption', value: next });
                    }}
                  />
                </div>

                <div className="mt-10 flex gap-3">
                  <button className="px-5 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl hover:opacity-90">
                    Secure Vault Now
                  </button>
                  <button className="px-5 py-3 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-slate-50">
                    Audit Logs
                  </button>
                </div>
              </div>
            </section>

            <section className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-md p-7 rounded-2xl border border-slate-200/60 shadow-sm space-y-5">
              <h3 className="text-[32px] leading-none font-black tracking-tight text-slate-900">Regional Nodes</h3>
              <div className="space-y-3">
                <NodeRow label="Singapore Node 01" state="Active" />
                <NodeRow label="Zurich Vault Alpha" state="Active" />
              </div>
            </section>

            <section className="col-span-2 md:col-span-1 bg-slate-100/70 p-7 rounded-2xl border border-slate-200/60 space-y-5">
              <h3 className="text-[32px] leading-none font-black tracking-tight text-slate-900">Interface Mode</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setInterfaceMode('light');
                    trackEvent('preferences_change', { key: 'interface_mode', value: 'light' });
                  }}
                  className={[
                    'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors',
                    interfaceMode === 'light' ? 'bg-white border-emerald-500' : 'bg-white/70 border-slate-200',
                  ].join(' ')}
                >
                  <div className="w-full h-11 bg-slate-100 rounded-md"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Architect Light</span>
                </button>
                <button
                  onClick={() => {
                    setInterfaceMode('dark');
                    trackEvent('preferences_change', { key: 'interface_mode', value: 'dark' });
                  }}
                  className={[
                    'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors',
                    interfaceMode === 'dark' ? 'bg-slate-900 border-slate-900' : 'bg-slate-800/90 border-slate-700',
                  ].join(' ')}
                >
                  <div className="w-full h-11 bg-slate-800 rounded-md"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Sovereign Dark</span>
                </button>
              </div>
            </section>

            <section className="col-span-2 bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-[36px] leading-none font-black tracking-tight text-slate-900">Intelligence Alerts</h2>
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase">3 Active Rules</span>
              </div>

              <div className="divide-y divide-slate-100">
                <AlertRow
                  title="Market Volatility Pulse"
                  description="Receive alerts when portfolio variance exceeds 1.5% in 4 hours."
                  active={false}
                />
                <AlertRow
                  title="Large Deployment Warning"
                  description="Multi-sig verification required for any movement > 10,000 USDT."
                  active
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-10">
      <div className="space-y-1 max-w-[84%]">
        <h4 className="text-base font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors mt-1',
          enabled ? 'bg-emerald-500' : 'bg-slate-200',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
            enabled ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

function MetaRow({
  label,
  value,
  valueClass,
  plain,
}: {
  label: string;
  value: string;
  valueClass: string;
  plain?: boolean;
}) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{label}</span>
      {plain ? (
        <span className={['text-[10px] font-bold uppercase tracking-[0.12em]', valueClass].join(' ')}>{value}</span>
      ) : (
        <span className={['text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-md', valueClass].join(' ')}>{value}</span>
      )}
    </div>
  );
}

function NodeRow({ label, state }: { label: string; state: string }) {
  return (
    <div className="p-3 bg-white/70 rounded-xl border border-slate-200/50 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        <span className="text-xs font-bold text-slate-900">{label}</span>
      </div>
      <span className="text-[10px] text-slate-400 font-bold uppercase">{state}</span>
    </div>
  );
}

function AlertRow({
  title,
  description,
  active,
}: {
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div className="py-6 flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h5 className="text-sm font-bold text-slate-900">{title}</h5>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {active ? (
        <CheckCircle className="h-5 w-5 text-emerald-500" />
      ) : (
        <Circle className="h-5 w-5 text-slate-300" />
      )}
    </div>
  );
}
