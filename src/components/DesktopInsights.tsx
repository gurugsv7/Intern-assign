import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Bot,
} from 'lucide-react';
import { MOCK_PLATFORM_METRICS } from '@/src/lib/mockData';
import { useAnalytics } from '@/src/hooks/useAnalytics';

export default function DesktopInsights() {
  const { trackEvent } = useAnalytics();

  return (
    <div className="space-y-16">
      <section className="max-w-4xl">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-6">
          Luminous Intelligence
        </span>
        <h2 className="text-[56px] leading-[1.1] tracking-[-0.02em] font-black text-slate-900 mb-6">
          Your capital is breathing. Let's optimize its rhythm.
        </h2>
        <p className="text-base leading-[1.7] text-slate-500 max-w-2xl">
          The AI has processed over 14 million global data points relative to your portfolio. We've
          identified three architectural shifts to elevate your net worth by{' '}
          <span className="text-emerald-500 font-bold">{MOCK_PLATFORM_METRICS.quarterlyGrowthPercent}%</span> this quarter.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8 bg-white border border-slate-200/50 rounded-xl p-10 relative overflow-hidden flex flex-col justify-between group shadow-sm">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-slate-500 font-bold tracking-wider uppercase text-[10px] mb-2">Priority Shift</p>
                <h3 className="text-4xl font-black text-slate-900 mb-4">
                  The Emerging <br />Green Corridor
                </h3>
              </div>
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <div className="space-y-6 max-w-lg">
              <p className="text-base leading-[1.7] text-slate-500">
                AI analysis detects a structural undervaluation in decentralized energy grids.
                Reallocating 8% of your current 'Cash Equivalents' could yield a projected{' '}
                <span className="text-emerald-500 font-bold">22% IRR</span>.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => trackEvent('execute_strategy_click', { source: 'insights_priority_shift' })}
                  className="px-8 py-3.5 rounded-lg bg-slate-900 text-white font-bold text-sm transition-all hover:bg-slate-800 active:scale-95 shadow-sm"
                >
                  Execute Strategy
                </button>
                <button className="px-8 py-3.5 rounded-lg border border-slate-200/70 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <img
              className="w-full h-full object-cover"
              alt="abstract digital circuit patterns"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwSU4f8H6yrAOlKn7zqpDceFegLDhyY8GpbClzqNcPSqhr8PV3sVJGCjpDQOI7sbLhoN3WuXu7rJ09YhyDmmOY4Z-L0MZE3V4FWNEX61e-6RBAEpMvUvBEz5TQbfH89jHs-og0A1xDLtZDdyZ26iLpKuD9XHNGLcFlQt4FPGK1Ifo2hSlXzzjWE5nL3mHUoUQ-7sEwZu_QGmYUCUGqLkSeIK9xRpd0KDiBRWYz_FkVcv9i4lycQ3JC99EBCrnIaizJg143Pc3O_CMB"
            />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 bg-white border border-slate-200/50 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="relative mb-8">
            <div className="w-48 h-48 rounded-full border-[8px] border-slate-100 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full absolute rotate-45 border-[8px] border-emerald-500 border-t-transparent border-l-transparent"></div>
              <div className="text-center">
                <p className="text-5xl font-black text-slate-900">88%</p>
                <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Efficiency</p>
              </div>
            </div>
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Portfolio Wellness</h4>
          <p className="text-sm text-slate-500 mb-6">
            Asset distribution is in 'High Harmony' with global trends.
          </p>
          <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-tight">
            ON TRACK
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white border border-slate-200/50 rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-slate-900" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Risk Shield Active</h4>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Automatically hedged your tech exposure against volatility in Asian markets using predictive models.
          </p>
          <div className="mt-6 pt-6 border-t border-slate-200/60">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Protection Value</span>
              <span className="text-lg font-black text-emerald-500">${MOCK_PLATFORM_METRICS.protectionValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden group shadow-sm">
          <div className="relative z-10">
            <h4 className="text-2xl font-black mb-4">Tax Optimization <br />Harvesting</h4>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              AI detected ${MOCK_PLATFORM_METRICS.taxHarvestingOpportunity.toLocaleString()} in harvestable losses to offset your capital gains. Recommended within 48 hours.
            </p>
            <button className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              Begin Harvesting
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
        </div>

        <div className="col-span-12 md:col-span-3 bg-white border border-slate-200/50 rounded-xl p-8 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.1em] text-slate-500 uppercase mb-4">Global Signal</h4>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Commodities
            </div>
          </div>
          <div className="mt-8">
            <div className="h-20 w-full bg-slate-100 rounded-lg overflow-hidden flex items-end gap-1 px-2 pb-2">
              <div className="flex-1 bg-slate-900/10 h-1/2 rounded-t-[2px]"></div>
              <div className="flex-1 bg-slate-900/10 h-2/3 rounded-t-[2px]"></div>
              <div className="flex-1 bg-slate-900/10 h-1/3 rounded-t-[2px]"></div>
              <div className="flex-1 bg-emerald-500/40 h-3/4 rounded-t-[2px]"></div>
              <div className="flex-1 bg-emerald-500 h-full rounded-t-[2px]"></div>
            </div>
            <p className="text-[9px] text-center mt-3 font-bold text-slate-500 tracking-tight uppercase">AI Momentum Indicator</p>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden aspect-video relative group border border-slate-200/50 shadow-lg">
          <img
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            alt="modern glass skyscraper"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXXdJHY4DeB2l214ValFa9IVBJgzgJ_Cpwdd0Rm_4hNYb_Bub9ZT_joguXdeTQSIpjsbKJywOxLpZaVSQ_wdk0SRrE-0-3TCR753MHfpzicU3rWivOfZ8XX52jZtd6tAXzuLNAQN7_Y9T4ptSubz7dYboqO0jq15iIBg1QJUcYUpmTrAEwjI49k-RutFGAq1NXmS46KNbd7gYKjaO-2XftIx4Kd6aBI9wT6ZtcG3ZCNEPf5jFsK1nW7oIea57CZqXpDHI7mMmfX8fG"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <p className="text-white text-2xl font-black">The Next Horizon</p>
            <p className="text-white/60 text-xs font-medium tracking-wide uppercase">Real Estate AI Predictions 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-5xl font-black text-slate-900 leading-tight">Visualizing your wealth in five years.</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200/50 rounded-xl shadow-sm">
              <span className="text-slate-500 font-medium text-sm">Projected Net Worth</span>
              <span className="text-slate-900 font-black text-xl">${(MOCK_PLATFORM_METRICS.projectedNetWorth / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200/50 rounded-xl shadow-sm">
              <span className="text-slate-500 font-medium text-sm">Passive Income Stream</span>
              <span className="text-emerald-500 font-black text-xl">${Math.round(MOCK_PLATFORM_METRICS.passiveIncomeMonthly / 1000)}k / mo</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200/50 rounded-xl shadow-sm">
              <span className="text-slate-500 font-medium text-sm">Risk Score Projection</span>
              <span className="text-slate-900 font-black text-lg">{MOCK_PLATFORM_METRICS.riskProjection}</span>
            </div>
          </div>
          <button
            onClick={() => trackEvent('execute_strategy_click', { source: 'insights_roadmap' })}
            className="w-full py-4 rounded-xl border-2 border-slate-900 text-slate-900 font-black text-xs tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all"
          >
            Explore 2030 Roadmap
          </button>
        </div>
      </section>
    </div>
  );
}
