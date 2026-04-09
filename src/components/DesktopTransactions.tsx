import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Car,
  MapPin,
  Plane,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Utensils,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_PLATFORM_METRICS, MOCK_TRANSACTION_STORY, MOCK_USER } from '@/src/lib/mockData';
import { useDebounce } from '@/src/hooks/useDebounce';
import { useAnalytics } from '@/src/hooks/useAnalytics';

export default function DesktopTransactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { trackEvent } = useAnalytics();

  const filteredNarrative = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return MOCK_TRANSACTION_STORY.narrative;
    }

    return MOCK_TRANSACTION_STORY.narrative
      .map((day) => ({
        ...day,
        entries: day.entries.filter((entry) =>
          [entry.title, entry.tag, entry.note].some((value) =>
            value.toLowerCase().includes(query)
          )
        ),
      }))
      .filter((day) => day.entries.length > 0);
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      trackEvent('search_usage', {
        page: 'transactions',
        query_length: debouncedSearch.trim().length,
        results_days: filteredNarrative.length,
      });
    }
  }, [debouncedSearch, filteredNarrative.length, trackEvent]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-zinc-200/80">
        <div className="px-8 lg:px-12 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <h2 className="text-lg font-bold tracking-tight">Transactions</h2>
            <div className="relative">
              <Search className="h-4 w-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search your financial story..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 rounded-full bg-zinc-100 border border-zinc-200 pl-10 pr-4 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors" aria-label="Notifications">
              <Bell className="h-4 w-4 text-zinc-600" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500"></span>
            </button>
            <Avatar className="h-8 w-8 border border-zinc-200">
              <AvatarImage src={MOCK_USER.avatar} />
              <AvatarFallback>{MOCK_USER.name.split(' ').map((part) => part[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="px-8 lg:px-12 pb-12 pt-8 max-w-7xl mx-auto">
        <section className="mb-16">
          <div className="flex items-baseline gap-3 mb-8">
            <h3 className="text-5xl font-black tracking-tighter leading-none text-slate-900">Large Activity</h3>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">This Month</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 relative rounded-[2rem] overflow-hidden shadow-xl border border-zinc-200 h-[390px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL__i4QmMCBTCSn4rAscE7KBBXnCGOdUt49x_GTGcYuYxdv3Yl2HLZ5QND1mw80fOTJe5w2Xyjvb8rxJjFROYKLgZIWQg0WtO9OPJoTg6oMu21nzRudVF88B4Jz9B27LT0Iowkj-uRbQIk2s5TqZV3uW7kv5iAlEy5ar6daoNeqP4qtkWQQ_KzWBETEVHO-OiSSa4rV9y8A1bnpEDJvw5Yx8kYfzKf4FbuD6o7c-FJkhH_ZtyFwB3xS4PX01eObm-wCxVu2qpzB3qA"
                alt="Investment activity"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

              <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-6">
                <div className="text-white max-w-sm">
                  <span className="inline-block mb-4 px-3 py-1 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">{MOCK_TRANSACTION_STORY.featured.tag}</span>
                  <h4 className="text-4xl font-black leading-tight mb-2">{MOCK_TRANSACTION_STORY.featured.title}</h4>
                  <p className="text-sm text-white/75">{MOCK_TRANSACTION_STORY.featured.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-black tracking-tighter text-emerald-400">{formatSignedCurrency(MOCK_TRANSACTION_STORY.featured.amount)}</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-[0.18em] font-bold mt-1">{MOCK_TRANSACTION_STORY.featured.dateLabel}</p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 flex flex-col gap-6">
              <div className="rounded-[2rem] border border-zinc-200 bg-white/70 backdrop-blur-md p-8 h-[186px] flex flex-col justify-between">
                <div>
                  <Plane className="h-8 w-8 text-slate-800 mb-4" />
                  <h4 className="text-3xl font-black tracking-tight text-slate-900">{MOCK_TRANSACTION_STORY.luxury.title}</h4>
                  <p className="text-sm text-zinc-600 mt-1">{MOCK_TRANSACTION_STORY.luxury.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-[1.9rem] lg:text-[2.15rem] leading-none font-black tracking-tight text-slate-900">{formatSignedCurrency(MOCK_TRANSACTION_STORY.luxury.amount)}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.18em] font-bold mt-1">{MOCK_TRANSACTION_STORY.luxury.dateLabel}</p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-950 p-8 text-white h-[186px] relative overflow-hidden">
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <Sparkles className="h-8 w-8 text-emerald-400" />
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-400">Growth</p>
                    <p className="text-3xl font-black">+{MOCK_PLATFORM_METRICS.quarterlyGrowthPercent}%</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed relative z-10">
                  Your recurring contributions are outperforming targets by <span className="text-emerald-400 font-bold">${MOCK_PLATFORM_METRICS.monthlySavingsProjection.toLocaleString()}</span> this quarter.
                </p>
                <div className="absolute -right-10 -bottom-12 h-36 w-36 rounded-full bg-white/5 blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8 relative">
            <h3 className="text-4xl font-black tracking-tight text-slate-900 mb-10">Daily Narrative</h3>
            <div className="absolute left-[22px] top-24 bottom-2 w-px bg-gradient-to-b from-zinc-300 via-zinc-200/40 to-transparent"></div>

            <div className="space-y-16">
              {filteredNarrative.length === 0 && (
                <div className="pl-14">
                  <div className="rounded-3xl bg-white p-8 border border-zinc-200 text-zinc-500 text-sm">
                    No transactions matched "{debouncedSearch}".
                  </div>
                </div>
              )}

              {filteredNarrative.map((day) => (
                <div key={`${day.dayNumber}-${day.dayLabel}`}>
                  <div className="flex items-center gap-5 mb-8">
                    <div className="h-11 w-11 rounded-full border border-zinc-300 bg-white text-[10px] font-black flex items-center justify-center">{day.dayNumber}</div>
                    <p className="text-[11px] uppercase tracking-[0.24em] font-bold text-zinc-500">{day.dayLabel}</p>
                  </div>

                  <div className="pl-14 space-y-8">
                    {day.entries.map((entry) => {
                      const isPositive = entry.amount >= 0;
                      return (
                        <NarrativeCard
                          key={`${day.dayNumber}-${entry.title}-${entry.time}`}
                          icon={getNarrativeIcon(entry.tag, isPositive)}
                          iconClass={isPositive ? 'bg-emerald-100 text-emerald-700' : getIconClass(entry.tag)}
                          tag={entry.tag}
                          title={entry.title}
                          amount={formatSignedCurrency(entry.amount)}
                          amountClass={isPositive ? 'text-emerald-600' : 'text-slate-900'}
                          time={entry.time}
                          note={entry.note}
                          markerClass={isPositive ? 'border-emerald-500' : 'border-slate-900'}
                          tagClass={isPositive ? 'bg-emerald-100 text-emerald-700' : undefined}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-4 space-y-7">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center mb-7">Category Flow</h4>

              <div className="relative h-48 w-48 mx-auto mb-7">
                <svg className="h-48 w-48 -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-zinc-100" />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="502"
                    strokeDashoffset="120"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[2.1rem] leading-none font-black tracking-tight text-slate-900 whitespace-nowrap">${MOCK_PLATFORM_METRICS.categoryFlowTotal.toLocaleString()}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-black text-zinc-500">Lifestyle</p>
                </div>
              </div>

              <div className="space-y-3">
                {MOCK_PLATFORM_METRICS.categoryFlow.map((item) => (
                  <LegendRow
                    key={item.name}
                    label={item.name}
                    value={`${item.value}%`}
                    dotClass=""
                    dotColor={item.color}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 text-white p-8 shadow-xl relative overflow-hidden">
              <Sparkles className="h-7 w-7 text-emerald-400 mb-5" />
              <h4 className="text-2xl font-black tracking-tight mb-4">Spending Insight</h4>
              <p className="text-sm text-white/75 leading-relaxed mb-7">
                Your discretionary spending is <span className="text-emerald-400 font-bold">12% lower</span> than your average. This surplus could be moved to your 'High-Yield Opportunities' bucket.
              </p>
              <button className="w-full py-3.5 rounded-xl bg-emerald-500 text-white text-[10px] uppercase tracking-[0.18em] font-black">Optimize Assets</button>
              <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-7">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-[10px] uppercase tracking-[0.18em] font-black text-zinc-500">Activity Map</h4>
                <MapPin className="h-4 w-4 text-slate-900" />
              </div>

              <div className="relative h-40 rounded-2xl overflow-hidden border border-zinc-200 grayscale">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzpv_a03Zee_r-2iczIjlv-66QMoCmQUJ8GIutCI422h_nK9rLc-q-mfvzfSYMtpoCr3zvhitoIx46RKehaMSI99gjW9L0rfTFHhcWWYrzWK0dmuoVuI_VCUeJbyRu_G4cSsKyTYavF1dNS4aY8CkLi59-6Q8fsns9DdrTgR9yhBVlyj2Y89jdr8neYoKCEeWo3t2vIsQXw0xGPWvQzF8oj750aClRfe23rNxMWAXH8P521PBQq0SnciLnzc_E812_DxGK3F0d21N9"
                  alt="Map activity"
                  className="h-full w-full object-cover opacity-70"
                />
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] font-black text-zinc-500 text-center mt-4">Most activity in Tokyo, JP</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function NarrativeCard({
  icon,
  iconClass,
  tag,
  title,
  amount,
  amountClass,
  time,
  note,
  markerClass,
  tagClass,
}: {
  icon: React.ReactNode;
  iconClass: string;
  tag: string;
  title: string;
  amount: string;
  amountClass: string;
  time: string;
  note: string;
  markerClass: string;
  tagClass?: string;
}) {
  return (
    <div className="relative">
      <div className={['absolute -left-[43px] top-6 w-3 h-3 rounded-full border-2 bg-white', markerClass].join(' ')}></div>

      <div className="rounded-3xl bg-white/80 backdrop-blur-md p-8 shadow-sm border border-zinc-200/70">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={['h-12 w-12 rounded-2xl flex items-center justify-center', iconClass].join(' ')}>{icon}</div>
            <div>
              <span className={[
                'inline-block mb-1 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.16em]',
                tagClass ? tagClass : 'bg-zinc-100 text-zinc-600',
              ].join(' ')}>
                {tag}
              </span>
              <h5 className="text-3xl font-black tracking-tight text-slate-900">{title}</h5>
            </div>
          </div>

          <div className="text-right">
            <p className={['text-4xl font-black tracking-tighter', amountClass].join(' ')}>{amount}</p>
            <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-zinc-500 mt-1">{time}</p>
          </div>
        </div>

        <p className="text-sm italic text-zinc-600 border-l-2 border-emerald-200 pl-4">{note}</p>
      </div>
    </div>
  );
}

function LegendRow({
  label,
  value,
  dotClass,
  dotColor,
}: {
  label: string;
  value: string;
  dotClass: string;
  dotColor?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-xs font-bold text-zinc-600">
        <span className={['h-2 w-2 rounded-full', dotClass].join(' ')} style={dotColor ? { backgroundColor: dotColor } : undefined}></span>
        {label}
      </span>
      <span className="text-xs font-black text-slate-900">{value}</span>
    </div>
  );
}

function formatSignedCurrency(value: number) {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getNarrativeIcon(tag: string, isPositive: boolean) {
  if (isPositive) {
    return <TrendingUp className="h-5 w-5" />;
  }

  const lowercaseTag = tag.toLowerCase();
  if (lowercaseTag.includes('dining')) {
    return <Utensils className="h-5 w-5" />;
  }
  if (lowercaseTag.includes('utility') || lowercaseTag.includes('transport')) {
    return <Car className="h-5 w-5" />;
  }
  return <ShoppingBag className="h-5 w-5" />;
}

function getIconClass(tag: string) {
  const lowercaseTag = tag.toLowerCase();
  if (lowercaseTag.includes('utility') || lowercaseTag.includes('transport')) {
    return 'bg-zinc-100 text-slate-900';
  }
  return 'bg-slate-900 text-white';
}