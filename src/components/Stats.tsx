import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Filter, ChevronDown, Sparkles, ArrowRight, Utensils, Ticket, Wallet, TrendingUp, Landmark, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_SPENDING_DISTRIBUTION } from '@/src/lib/mockData';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/src/hooks/useAnalytics';

export default function Stats() {
  const totalCapital = MOCK_SPENDING_DISTRIBUTION.reduce((acc, curr) => acc + curr.amount, 0);
  const { trackEvent } = useAnalytics();

  return (
    <div className="bg-white/50 min-h-screen text-on-surface">
      <div className="px-6 space-y-12 max-w-4xl mx-auto mt-4">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-on-surface">Spending Analysis</h1>
          <Button variant="outline" className="rounded-full bg-emerald-50 text-primary font-semibold text-sm tracking-tight border-emerald-100/50 h-auto py-1.5 px-4">
            April 2026 <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <p className="text-slate-400 font-medium tracking-wide text-xs uppercase">Spending Report • April 2026</p>

        {/* Donut Chart Section */}
        <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-64 h-64 flex-shrink-0" style={{ minWidth: 256, minHeight: 256 }}>
          <ResponsiveContainer width={256} height={256}>
            <RePieChart>
              <Pie
                data={MOCK_SPENDING_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {MOCK_SPENDING_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Total Capital</span>
            <span className="text-3xl font-black text-on-surface">${totalCapital.toLocaleString()}</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-8 gap-y-6">
          {MOCK_SPENDING_DISTRIBUTION.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: item.color }}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
              <span className="text-lg font-black text-on-surface">{item.value}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Suggestion Card */}
      <section className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <Card className="relative bg-white border-emerald-50 p-6 rounded-3xl overflow-hidden">
          <CardContent className="p-0 flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">AI Suggestion</span>
                <h3 className="text-lg font-bold text-on-surface mt-1">Optimize Interest Yield</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                Your current yield is underperforming market averages by 2.4%. We've identified three high-yield alternatives tailored to your risk profile.
              </p>
              <Button variant="link" className="text-sm font-bold text-primary p-0 h-auto flex items-center gap-1 group/btn">
                Explore Portfolio Options
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Allocation Details */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Allocation Details</h2>
            <p className="text-xs text-slate-400 font-medium">April 1 - April 30, 2026</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => trackEvent('filter_click', { page: 'spending', type: 'allocation_filter' })}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto p-0"
          >
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        <div className="space-y-1">
          {MOCK_SPENDING_DISTRIBUTION.slice(0, 3).map((item, idx) => (
            <AllocationItem
              key={item.name}
              icon={idx === 0 ? <Landmark className="h-5 w-5" /> : idx === 1 ? <TrendingUp className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
              title={item.name}
              subtitle={idx === 0 ? 'Primary Asset Allocation' : idx === 1 ? 'Growth Contributions' : 'Lifestyle Optimization'}
              amount={item.amount}
              percentage={item.value}
              color={idx === 0 ? 'emerald' : idx === 1 ? 'lime' : 'teal'}
            />
          ))}
        </div>
      </section>

      {/* Advisor Chat Section */}
      <section className="pt-6 pb-4">
        <div className="flex items-center justify-between p-5 bg-slate-900 rounded-[2.5rem] text-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12 rounded-2xl ring-2 ring-emerald-500/20">
                <AvatarImage src="https://picsum.photos/seed/sarah/100" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <p className="text-sm font-bold">Sarah Williams</p>
              <p className="text-[10px] text-slate-400 font-medium">Wealth Advisor • Online</p>
            </div>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-xs rounded-full px-5 py-2 h-auto">
            CHAT NOW
          </Button>
        </div>
      </section>
      </div>
    </div>
  );
}

function AllocationItem({ icon, title, subtitle, amount, percentage, color }: { icon: React.ReactNode, title: string, subtitle: string, amount: number, percentage: number, color: string }) {
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-100/50 text-emerald-700",
    lime: "bg-lime-100/50 text-lime-700",
    teal: "bg-teal-100/50 text-teal-700",
  };

  const textColorClasses: Record<string, string> = {
    emerald: "text-emerald-600",
    lime: "text-lime-600",
    teal: "text-teal-600",
  };

  return (
    <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-50/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", colorClasses[color])}>
          {icon}
        </div>
        <div>
          <p className="font-bold text-on-surface">{title}</p>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tighter">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-on-surface text-lg">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <p className={cn("text-xs font-bold", textColorClasses[color])}>{percentage}% Distribution</p>
      </div>
    </div>
  );
}
