import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, FileText, ShieldCheck, LineChart, Database, ArrowUpRight, Sparkles, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getFinancialInsights, AIInsight } from '@/src/services/geminiService';
import { MOCK_USER } from '@/src/lib/mockData';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Wallet() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      const data = await getFinancialInsights(MOCK_USER);
      setInsights(data);
      setLoading(false);
    }
    loadInsights();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-emerald-900/5">
        <div className="flex items-center justify-between px-6 py-5 w-full">
          <Button variant="ghost" size="icon" className="text-emerald-900 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-emerald-900 font-semibold tracking-tight text-base uppercase tracking-[0.1em]">Fiscal AI Advisor</h1>
          <Button variant="ghost" size="icon" className="text-emerald-900 rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="pt-24">
        {/* Hero Area */}
        <section className="relative px-8 pt-8 pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-transparent -z-10"></div>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col space-y-2">
              <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase">BrightMoney AI</span>
              <h2 className="text-on-background text-4xl md:text-5xl font-black tracking-tighter leading-none">
                Hi, Alex. <br/>I'm <span className="text-primary">Fiscal</span>
              </h2>
              <p className="text-secondary/80 text-base font-normal tracking-tight">Your bespoke financial strategist.</p>
            </div>
            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary to-primary-container rounded-full opacity-60"></div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="px-6 max-w-2xl mx-auto space-y-8">
          <div className="flex items-baseline justify-between">
            <h3 className="font-extrabold text-lg tracking-tight text-on-surface">Suggestions for You</h3>
            <div className="flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-900/5 px-4 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Smart Actions</span>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Main Insight Card */}
            <button className="col-span-2 group relative overflow-hidden bg-white border border-emerald-900/10 rounded-4xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-emerald-900/5 text-left">
              <div className="absolute -right-4 -top-4 w-32 h-32 pattern-dots opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-primary tracking-[0.2em] uppercase">Portfolio Insight</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-on-surface tracking-tighter">Summarize my load</h4>
                    <p className="text-sm text-secondary/70 mt-1 max-w-[240px]">Get a high-fidelity snapshot of your entire asset distribution instantly.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest pt-2">
                    View Report
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative bg-white shadow-xl shadow-emerald-900/10 p-5 rounded-3xl border border-emerald-900/5 group-hover:-translate-x-2 transition-transform">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
              </div>
            </button>

            {/* Small Cards */}
            <InsightCard 
              icon={<ShieldCheck className="h-6 w-6" />} 
              title="Emergency Fund" 
              description="Bespoke savings path for your safety net." 
            />
            <InsightCard 
              icon={<LineChart className="h-6 w-6" />} 
              title="Reduce Spending" 
              description="Intelligent expense pruning & analysis." 
            />

            {/* Growth Engine Card */}
            <button className="col-span-2 group relative flex items-center justify-between bg-primary-container p-1 rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 text-left overflow-hidden">
              <div className="flex items-center gap-4 pl-6">
                <div className="bg-white/90 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-extrabold text-on-primary-container text-sm">Micro-investing strategies</p>
                  <p className="text-[10px] text-on-primary-container/60 uppercase font-bold tracking-widest">Growth Engine</p>
                </div>
              </div>
              <div className="bg-on-primary-container text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:bg-primary transition-colors">
                Explore
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Weekly Clarity Visualization */}
          <div className="p-8 bg-surface-container-low/40 border border-white/60 rounded-4xl relative overflow-hidden group premium-blur shadow-sm">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h4 className="font-bold text-[15px] tracking-tight text-on-surface uppercase tracking-widest opacity-80">Weekly Clarity</h4>
                </div>
                <span className="text-[10px] font-bold text-primary tracking-widest">LIVE DATA</span>
              </div>
              <div className="flex items-end gap-3 h-20">
                <div className="flex-1 bg-emerald-900/5 rounded-full h-[40%]"></div>
                <div className="flex-1 bg-emerald-900/10 rounded-full h-[65%]"></div>
                <div className="flex-1 bg-primary/90 rounded-full h-[95%] shadow-lg shadow-primary/20"></div>
                <div className="flex-1 bg-emerald-900/5 rounded-full h-[50%]"></div>
                <div className="flex-1 bg-emerald-900/10 rounded-full h-[75%]"></div>
              </div>
              <div className="pt-4 border-t border-emerald-900/5">
                <p className="text-[15px] text-secondary leading-relaxed font-normal">
                  Alex, your net savings grew by <span className="text-primary font-bold">12.4%</span> this week. <br/>
                  <span className="text-xs opacity-60">Should we optimize your next paycheck allocation?</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-10 pt-6 bg-white/80 backdrop-blur-2xl border-t border-emerald-900/5">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex-1 relative">
            <Input 
              className="w-full bg-surface-container-low/50 border-none rounded-full pl-6 pr-14 py-4 h-auto text-on-surface placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all text-sm font-medium" 
              placeholder="Ask your advisor anything..." 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <Button className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-full shadow-2xl shadow-primary/30 active:scale-90 transition-all duration-300 p-0">
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <button className="col-span-1 group relative bg-white border border-emerald-900/10 rounded-4xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-emerald-900/5 text-left flex flex-col justify-between min-h-[220px]">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <ShieldCheck className="h-16 w-16 font-thin" />
      </div>
      <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center -mt-8 mb-4 border-4 border-background group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-black text-lg text-on-surface tracking-tight leading-tight">{title}</h4>
        <p className="text-xs text-secondary/60 leading-normal">{description}</p>
      </div>
      <div className="w-8 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500"></div>
    </button>
  );
}

function ArrowRight(props: any) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
