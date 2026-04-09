import React from 'react';
import {
  Wallet,
  CreditCard,
  PiggyBank,
  MoreHorizontal,
  ChevronDown,
  Utensils,
  Car,
  ShoppingBag,
  TrendingDown,
  Compass,
  Coffee,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import {
  MOCK_BUDGET_ALLOCATION,
  MOCK_PLATFORM_METRICS,
  MOCK_STRATEGY_INSIGHTS,
  MOCK_USER,
} from '@/src/lib/mockData';

export default function DesktopHome() {
  const spendingRatioLabel = `${MOCK_PLATFORM_METRICS.spendingVsBudgetPercent.toFixed(1)}% of budget`;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/50 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Monthly Budget</span>
              </div>
              <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-[10px] font-black">+{MOCK_PLATFORM_METRICS.budgetDeltaPercent}%</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900">${MOCK_USER.budget.toLocaleString()}</h2>
          </div>
          <div className="mt-6 h-12 flex items-end gap-1.5">
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[18%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[42%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[28%]"></div>
            <div className="w-full bg-emerald-500 rounded-t-sm h-full shadow-[0px_4px_12px_rgba(16,185,129,0.2)]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[55%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[22%]"></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/50 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Actual Spending</span>
              </div>
              <span className="text-slate-400 text-[10px] font-bold uppercase">{spendingRatioLabel}</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900">${MOCK_USER.monthlySpending.toLocaleString()}</h2>
          </div>
          <div className="mt-6 h-12 flex items-end gap-1.5">
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[18%]"></div>
            <div className="w-full bg-blue-500 rounded-t-sm h-[64%] shadow-[0px_4px_12px_rgba(59,130,246,0.2)]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[92%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[26%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[78%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[38%]"></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/50 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4 text-slate-400" />
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Savings Rate</span>
              </div>
              <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[10px] font-black uppercase">On Track</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900">{MOCK_USER.savingsRate}%</h2>
          </div>
          <div className="mt-6 h-12 flex items-end gap-1.5">
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[16%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[22%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[54%]"></div>
            <div className="w-full bg-emerald-500 rounded-t-sm h-[80%]"></div>
            <div className="w-full bg-slate-200/80 rounded-t-sm h-[96%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white p-10 rounded-xl shadow-sm border border-slate-200/50">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Financial Overview</h3>
            <div className="flex items-center gap-8">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-[10px] text-slate-900 font-bold uppercase tracking-wider">Actual</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-900 flex items-center gap-1 border border-slate-200/50">
                  Date <ChevronDown className="h-3 w-3" />
                </button>
                <button className="p-1.5 text-slate-400">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] w-full mt-4">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <line x1="0" x2="1000" y1="0" y2="0" stroke="rgba(51,65,85,0.05)" strokeWidth="1" />
              <line x1="0" x2="1000" y1="75" y2="75" stroke="rgba(51,65,85,0.05)" strokeWidth="1" />
              <line x1="0" x2="1000" y1="150" y2="150" stroke="rgba(51,65,85,0.05)" strokeWidth="1" />
              <line x1="0" x2="1000" y1="225" y2="225" stroke="rgba(51,65,85,0.05)" strokeWidth="1" />
              <line x1="0" x2="1000" y1="300" y2="300" stroke="rgba(51,65,85,0.05)" strokeWidth="1" />
              <text x="5" y="15" fontSize="10" fontWeight="600" fill="rgba(51,65,85,0.4)">$40k</text>
              <text x="5" y="90" fontSize="10" fontWeight="600" fill="rgba(51,65,85,0.4)">$30k</text>
              <text x="5" y="165" fontSize="10" fontWeight="600" fill="rgba(51,65,85,0.4)">$20k</text>
              <text x="5" y="240" fontSize="10" fontWeight="600" fill="rgba(51,65,85,0.4)">$10k</text>
              <text x="5" y="295" fontSize="10" fontWeight="600" fill="rgba(51,65,85,0.4)">$0k</text>
            </svg>

            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="budgetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8"></stop>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="actualGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15"></stop>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,220 C100,210 200,250 300,240 C400,230 500,200 600,210 C700,220 800,180 900,190 C1000,200 1000,300 0,300 Z" fill="url(#budgetGrad)"></path>
              <path d="M0,220 C100,210 200,250 300,240 C400,230 500,200 600,210 C700,220 800,180 900,190" fill="none" stroke="#e2e8f0" strokeWidth="2"></path>
              <path d="M0,260 C100,250 200,200 300,220 C400,240 500,140 600,130 C700,120 800,160 900,100 C1000,80 1000,300 0,300 Z" fill="url(#actualGrad)"></path>
              <path d="M0,260 C100,250 200,200 300,220 C400,240 500,140 600,130 C700,120 800,160 900,100" fill="none" stroke="#3b82f6" strokeWidth="3"></path>
              <circle cx="600" cy="130" fill="#3b82f6" r="6"></circle>
              <circle cx="600" cy="130" fill="#3b82f6" opacity="0.1" r="12"></circle>
              <line stroke="#3b82f6" strokeDasharray="4" strokeWidth="1" x1="600" x2="600" y1="130" y2="300"></line>
            </svg>

            <div className="absolute top-[80px] left-[550px] bg-white p-5 rounded-xl shadow-xl border border-slate-200/50 min-w-[160px]">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">June Overview</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <span className="text-[10px] text-slate-500 font-bold">Budget</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">${MOCK_USER.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="text-[10px] text-slate-500 font-bold">Actual</span>
                  </div>
                  <span className="text-sm font-black text-blue-600">${MOCK_USER.monthlySpending.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-10 px-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month) => (
              <span
                key={month}
                className={[
                  'text-[10px] font-bold uppercase tracking-[0.2em]',
                  month === 'Jun' ? 'text-slate-900' : 'text-slate-400',
                ].join(' ')}
              >
                {month}
              </span>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-[#e3e8f6] p-10 rounded-xl relative border border-white flex flex-col h-full">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Strategy Insights</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Architected Recommendations</p>
            </div>
            <button className="text-slate-400 hover:text-slate-900 transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {MOCK_STRATEGY_INSIGHTS.map((insight, index) => (
              <InsightRow
                key={insight.title}
                icon={index === 0 ? <Utensils className="h-7 w-7" /> : index === 1 ? <Car className="h-7 w-7" /> : <ShoppingBag className="h-7 w-7" />}
                title={insight.title}
                savings={`$${insight.savings.toLocaleString()}`}
                description={insight.description}
              />
            ))}
          </div>

          <div className="mt-10 p-6 bg-slate-900 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Total Savings Projection</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white text-4xl font-black tracking-tighter">${MOCK_PLATFORM_METRICS.monthlySavingsProjection.toLocaleString()}</span>
                  <span className="text-blue-400 text-xs font-bold">/ MONTH</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600 transition-colors">
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200/50">
          <div className="w-full flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-900">Zero-Based Budget Builder</h3>
            <button className="text-slate-400">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-12">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#f1f5f9" strokeWidth="5"></circle>
                <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#93c5fd" strokeDasharray="25 75" strokeDashoffset="0" strokeWidth="5"></circle>
                <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#34d399" strokeDasharray="25 75" strokeDashoffset="-25" strokeWidth="5"></circle>
                <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#475569" strokeDasharray="19 81" strokeDashoffset="-50" strokeWidth="5"></circle>
                <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#1e40af" strokeDasharray="31 69" strokeDashoffset="-69" strokeWidth="5"></circle>
              </svg>
              <div className="absolute text-center">
                <p className="text-4xl font-black text-slate-900">100%</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Allocated</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {MOCK_BUDGET_ALLOCATION.map((allocation) => (
                <LegendRow
                  key={allocation.label}
                  color=""
                  label={allocation.label}
                  value={`${allocation.value}%`}
                  dotColor={allocation.color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#e3e8f6] p-10 rounded-xl border border-white overflow-hidden relative">
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Architectural Insights</h3>
              <p className="text-[10px] font-bold text-emerald-700 tracking-widest uppercase mt-1">Strategic Audit • Active Now</p>
            </div>
            <button className="text-slate-400 hover:text-slate-900 transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pb-20">
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-900/5 to-emerald-400/5 p-8 rounded-3xl border border-white/40 shadow-xl shadow-slate-200/50 flex gap-8 items-center backdrop-blur-[20px]">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-700/20">
                <Compass className="h-9 w-9" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-emerald-800 text-white text-[9px] font-black uppercase tracking-widest rounded-full">High Priority</span>
                  <h4 className="text-xl font-black text-slate-900">Weekend Spending Peak</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">Your discretionary spending increases by <span className="text-emerald-700 font-bold">42% on Saturdays</span>. Consider a "No-Spend" weekend once a month to reset your capital flow.</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-[20px] p-6 rounded-3xl border border-white/40 shadow-lg shadow-slate-200/40 md:mt-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="px-4 py-2 bg-slate-900/5 rounded-full backdrop-blur-md flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-slate-900" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Trend</span>
                </div>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-3 leading-tight">Coffee Spending Up</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">External coffee purchases are <span className="text-emerald-700 font-bold">15% higher</span> this month. This trend could impact your "Lifestyle" allocation by year-end.</p>
              <div className="flex gap-1">
                <div className="h-1 w-12 bg-emerald-700 rounded-full"></div>
                <div className="h-1 w-4 bg-slate-200 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-[20px] p-6 rounded-3xl border border-white/40 shadow-lg shadow-slate-200/40">
              <div className="flex items-center gap-4 mb-5">
                <div className="px-4 py-2 bg-emerald-700/10 rounded-full backdrop-blur-md flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Wellness</span>
                </div>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-3 leading-tight">Dining Savings</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">Excellent work! You've saved <span className="text-emerald-700 font-bold">$180</span> compared to last month by prioritizing home-prepared nutrition.</p>
              <div className="flex gap-1">
                <div className="h-1 w-12 bg-emerald-700 rounded-full"></div>
                <div className="h-1 w-12 bg-emerald-700 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 z-20">
            <button className="w-full h-14 bg-gradient-to-r from-emerald-800 to-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-700/30 flex items-center justify-center gap-3 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <span className="text-xs font-black uppercase tracking-[0.25em]">View Detailed Audit</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightRow({
  icon,
  title,
  savings,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  savings: string;
  description: string;
}) {
  return (
    <div className="bg-gradient-to-br from-emerald-100/40 to-emerald-200/20 backdrop-blur-[8px] border border-white/60 p-5 rounded-xl flex items-center gap-5 transition-transform hover:scale-[1.02] cursor-default group">
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:shadow-md transition-shadow">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline gap-3">
          <h4 className="text-sm font-black text-slate-900">{title}</h4>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Monthly Savings</p>
            <p className="text-lg font-black text-emerald-600 leading-tight">{savings}</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-tight mt-1">{description}</p>
      </div>
    </div>
  );
}

function LegendRow({
  color,
  label,
  value,
  dotColor,
}: {
  color: string;
  label: string;
  value: string;
  dotColor?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={["w-2 h-2 rounded-full", color].join(' ')} style={dotColor ? { backgroundColor: dotColor } : undefined}></span>
        <span className="text-xs font-bold text-slate-500">{label}</span>
      </div>
      <span className="text-xs font-black text-slate-900">{value}</span>
    </div>
  );
}
