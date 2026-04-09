import React from 'react';
import {
  Home,
  Utensils,
  Car,
  Zap,
  HeartPulse,
  Clock3,
  ShoppingBag,
  Repeat,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';
import {
  MOCK_MERCHANT_AFFINITY,
  MOCK_PLATFORM_METRICS,
  MOCK_SPENDING_ARCHITECTURE,
  MOCK_USER,
} from '@/src/lib/mockData';

export default function DesktopSpending() {
  const [housing, lifestyle, transport, utilities, health] = MOCK_SPENDING_ARCHITECTURE;

  return (
    <div className="max-w-7xl mx-auto space-y-16 text-slate-700">
      <section className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-[#e3e8f6] text-slate-500 font-bold text-[11px] tracking-widest uppercase rounded-full mb-6 border border-white">
            Atmospheric Analysis
          </span>
          <h1 className="text-[3.5rem] font-black leading-tight tracking-tight text-slate-900 mb-4">
            Spending <span className="text-slate-400 italic font-light">Architect</span>
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-xl">
            Your capital flow reimagined. We analyze the architectural integrity of your
            monthly expenditures against the blueprint of your future wealth.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm font-bold tracking-tight text-slate-500 uppercase mb-2">Monthly Outflow</div>
          <div className="text-5xl font-black text-slate-900">${MOCK_USER.monthlySpending.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="flex items-center gap-2 mt-4 text-emerald-600 font-bold text-sm">
            <TrendingDown className="h-4 w-4" />
            <span>{MOCK_PLATFORM_METRICS.monthlyOutflowDeltaPercent}% lower than last month</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-xl p-8 shadow-sm border border-slate-200/50">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Categorical Architecture</h3>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors">By Volume</button>
              <button className="px-4 py-2 text-slate-500 font-bold text-xs rounded-lg border border-slate-200 hover:bg-[#f0f3ff] transition-colors">By Frequency</button>
            </div>
          </div>

          <div className="grid grid-cols-10 grid-rows-6 h-[500px] gap-3">
            <div className="col-span-6 row-span-4 bg-gradient-to-br from-slate-900 to-[#1e293b] rounded-xl p-6 text-white relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Home className="h-5 w-5 mb-4" />
              <div className="text-xs uppercase font-bold tracking-widest opacity-70 mb-1">{housing.name}</div>
              <div className="text-5xl font-black">${housing.amount.toLocaleString()}</div>
            </div>

            <div className="col-span-4 row-span-3 bg-slate-500 text-white rounded-xl p-6 relative overflow-hidden shadow-md">
              <Utensils className="h-5 w-5 mb-4" />
              <div className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">{lifestyle.name}</div>
              <div className="text-4xl font-black">${lifestyle.amount.toLocaleString()}</div>
            </div>

            <div className="col-span-4 row-span-3 bg-slate-100 rounded-xl p-6 text-slate-900 border border-slate-200/50">
              <Car className="h-5 w-5 mb-4" />
              <div className="text-xs uppercase font-bold tracking-widest opacity-60 mb-1">{transport.name}</div>
              <div className="text-4xl font-black">${transport.amount.toLocaleString()}</div>
            </div>

            <div className="col-span-3 row-span-2 bg-emerald-500 rounded-xl p-4 text-white shadow-md">
              <div className="text-[0.6rem] uppercase font-black tracking-widest mb-1">{utilities.name}</div>
              <div className="text-2xl font-black">${utilities.amount.toLocaleString()}</div>
            </div>

            <div className="col-span-3 row-span-2 bg-[#1e293b] rounded-xl p-4 text-white">
              <div className="text-[0.6rem] uppercase font-black tracking-widest mb-1">{health.name}</div>
              <div className="text-2xl font-black">${health.amount.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white rounded-xl p-8 flex-1 shadow-sm border border-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e3e8f6] opacity-70 blur-3xl rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-black tracking-tight mb-8 text-slate-900">Outflow Velocity</h3>
            <div className="space-y-8">
              <VelocityRow icon={<Clock3 className="h-5 w-5" />} title="Peak Spending" subtitle="Thursdays, 7PM - 9PM" />
              <VelocityRow icon={<ShoppingBag className="h-5 w-5" />} title="Average Transaction" subtitle="$84.50 (↑ 12% MoM)" />
              <VelocityRow icon={<Repeat className="h-5 w-5" />} title="Fixed Obligations" subtitle="52% of total volume" />
            </div>
            <div className="mt-12 pt-8 border-t border-slate-200/60">
              <div className="p-6 rounded-xl bg-[#e3e8f6]/60 border border-slate-200/40">
                <p className="text-xs leading-relaxed text-slate-500 italic">
                  "Your velocity is optimizing. Large transactions are shifting towards earlier in the week, aligning with your wealth retention strategy."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] overflow-hidden p-[1px] bg-slate-200/70">
        <div className="bg-white p-12 md:p-24 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-8xl font-black text-slate-900 tracking-tighter">94%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Alignment Index</span>
            </div>
            <div className="h-1.5 w-24 bg-slate-900 mb-10"></div>
            <h2 className="text-6xl font-black tracking-tight mb-8 text-slate-900 leading-[1.05]">Lifestyle Audit</h2>
            <p className="text-slate-500 text-2xl font-light mb-12 leading-relaxed max-w-lg">
              Your current lifestyle choices are 94% aligned with your 'Architect' wealth tier.
              Precision adjustments in discretionary luxury retail could accelerate your 2025 goals by three months.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-900 pb-1">On Track</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Optimizing</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Precision Grade</span>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-8 w-full">
            <MetricBox label="Essential" value="$5.6k" border="border-slate-900" bar="bg-slate-900" width="82%" />
            <MetricBox label="Discretionary" value="$1.3k" border="border-emerald-500" bar="bg-emerald-500" width="45%" />
            <MetricBox label="Investment" value="$3.9k" border="border-slate-400" bar="bg-slate-400" width="95%" />
            <MetricBox label="Leakage" value="$120" border="border-red-500" bar="bg-red-500" width="12%" error />
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
          <h3 className="text-4xl font-black tracking-tight mb-4 text-slate-900">Merchant Affinity</h3>
          <p className="text-slate-500 mb-8 text-xl">
            A look at your top 5 financial partners and the value they architecturally bring to your ecosystem.
          </p>
          <div className="space-y-3">
            {MOCK_MERCHANT_AFFINITY.map((merchant) => (
              <MerchantRow
                key={merchant.label}
                badge={merchant.badge}
                label={merchant.label}
                amount={`$${merchant.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                badgeClass={merchant.badgeClass}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-2/3 h-[450px] relative bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm">
          <Bubble className="top-1/2 left-1/4 -translate-y-1/2 w-52 h-52 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl" label="Groceries" value="$1.2k" />
          <Bubble className="top-1/4 right-1/4 w-36 h-36 bg-slate-500 text-white shadow-xl" label="Subscriptions" value="$420" small />
          <Bubble className="bottom-16 right-1/3 w-28 h-28 bg-slate-400 text-white shadow-lg" label="Tech" value="$290" tiny />
          <Bubble className="top-12 left-1/3 w-20 h-20 bg-emerald-500 text-white shadow-md" label="Dining" value="$180" tiny />
          <Bubble className="top-1/2 right-12 w-24 h-24 bg-[#e3e8f6] text-slate-900 shadow-md" label="Travel" value="$340" tiny />

          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>
      </section>
    </div>
  );
}

function VelocityRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-200 transition-colors">
          {icon}
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">{subtitle}</div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
    </div>
  );
}

function MetricBox({
  label,
  value,
  border,
  bar,
  width,
  error,
}: {
  label: string;
  value: string;
  border: string;
  bar: string;
  width: string;
  error?: boolean;
}) {
  return (
    <div className={["bg-slate-50 p-8 border-l-4 shadow-sm", border].join(' ')}>
      <div className="text-[0.6rem] font-black tracking-widest uppercase text-slate-500 mb-2">{label}</div>
      <div className={["text-5xl font-black", error ? 'text-red-500' : 'text-slate-900'].join(' ')}>{value}</div>
      <div className="w-full h-[3px] bg-slate-200 mt-6">
        <div className={["h-full", bar].join(' ')} style={{ width }}></div>
      </div>
    </div>
  );
}

function MerchantRow({
  badge,
  label,
  amount,
  badgeClass,
}: {
  badge: string;
  label: string;
  amount: string;
  badgeClass: string;
}) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-slate-200/60 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className={["w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs", badgeClass].join(' ')}>{badge}</div>
        <span className="font-bold text-slate-900">{label}</span>
      </div>
      <span className="text-slate-900 font-black">{amount}</span>
    </div>
  );
}

function Bubble({
  className,
  label,
  value,
  small,
  tiny,
}: {
  className: string;
  label: string;
  value: string;
  small?: boolean;
  tiny?: boolean;
}) {
  return (
    <div className={["absolute rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer", className].join(' ')}>
      <div className="text-center">
        <div className={["font-bold uppercase tracking-widest opacity-80 mb-1", tiny ? 'text-[0.4rem]' : small ? 'text-[0.5rem]' : 'text-[0.6rem]'].join(' ')}>{label}</div>
        <div className={["font-black", tiny ? 'text-xl' : small ? 'text-4xl' : 'text-5xl'].join(' ')}>{value}</div>
      </div>
    </div>
  );
}
