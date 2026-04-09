import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, FileText, ShieldCheck, LineChart, Database, ArrowUpRight, Sparkles, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getFinancialInsights, AIInsight } from '@/src/services/geminiService';
import { MOCK_USER } from '@/src/lib/mockData';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useFetch } from '@/src/hooks/useFetch';
import { useAnalytics } from '@/src/hooks/useAnalytics';

export default function Wallet() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'ai' }[]>([]);
  const { trackEvent } = useAnalytics();
  const {
    data: insightsData,
    loading,
    error,
    refetch,
  } = useFetch<AIInsight[]>(() => getFinancialInsights());
  const insights = insightsData ?? [];

  const handleSendMessage = () => {
    if (message.trim()) {
      trackEvent('assistant_message_send', {
        length: message.trim().length,
        page: 'assistant',
      });

      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user' as const,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: "I'm analyzing your financial data...",
          sender: 'ai' as const,
        }]);
      }, 500);
    }
  };

  return (
    <div className="bg-white/50 min-h-screen text-on-surface" role="main" aria-label="AI Financial Assistant">
      <div className="mt-4">
        {/* Hero Area */}
        <section className="relative px-8 pt-8 pb-8 overflow-hidden" aria-labelledby="assistant-title">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-transparent -z-10" aria-hidden="true"></div>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col space-y-2">
              <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase" aria-hidden="true">AI Financial Assistant</span>
              <h2 id="assistant-title" className="text-on-background text-4xl md:text-5xl font-black tracking-tighter leading-none">
                Meet <span className="text-primary">Fiscal</span><br/>Your AI Strategist
              </h2>
              <p className="text-secondary/80 text-base font-normal tracking-tight">Get personalized financial insights powered by AI.</p>
            </div>
            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary to-primary-container rounded-full opacity-60" aria-hidden="true"></div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="px-6 max-w-2xl mx-auto space-y-8" aria-labelledby="suggestions-title">
          <div className="flex items-baseline justify-between">
            <h3 id="suggestions-title" className="font-extrabold text-lg tracking-tight text-on-surface">Suggestions for You</h3>
            <div className="flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-900/5 px-4 py-1.5 rounded-full" aria-label="Live suggestions available">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></div>
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
              icon={<ShieldCheck className="h-6 w-6" aria-hidden="true" />} 
              title="Emergency Fund" 
              description="Bespoke savings path for your safety net."
              ariaLabel="Suggestion: Emergency Fund - Get a bespoke savings path for your safety net"
            />
            <InsightCard 
              icon={<LineChart className="h-6 w-6" aria-hidden="true" />} 
              title="Reduce Spending" 
              description="Intelligent expense pruning & analysis."
              ariaLabel="Suggestion: Reduce Spending - Get intelligent expense pruning and analysis"
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
                <span className="text-[10px] font-bold text-emerald-700 tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full">LIVE DATA</span>
              </div>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-center gap-2 h-32 px-4">
                <div className="w-14 h-14 bg-emerald-50/60 rounded-3xl border border-emerald-200/40 hover:bg-emerald-100/40 transition-colors"></div>
                <div className="w-14 h-20 bg-emerald-100/70 rounded-3xl border border-emerald-200/50 hover:bg-emerald-100 transition-colors"></div>
                <div className="w-16 h-32 bg-gradient-to-t from-primary to-primary/90 rounded-3xl border border-primary/20 shadow-xl shadow-primary/20 hover:shadow-2xl transition-all"></div>
                <div className="w-14 h-16 bg-emerald-50/60 rounded-3xl border border-emerald-200/40 hover:bg-emerald-100/40 transition-colors"></div>
                <div className="w-14 h-24 bg-emerald-100/70 rounded-3xl border border-emerald-200/50 hover:bg-emerald-100 transition-colors"></div>
              </div>

              {/* Insight Text */}
              <div className="pt-4 border-t border-emerald-900/5 space-y-2">
                <p className="text-[15px] text-on-surface leading-relaxed font-medium">
                  {MOCK_USER.name}, your net savings grew by <span className="text-primary font-black">12.4%</span> this week.
                </p>
                <p className="text-sm text-secondary/70 font-normal">Should we optimize your next paycheck allocation?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data States: AI Insight Feed */}
        <section className="px-6 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg tracking-tight text-on-surface">AI Insight Feed</h3>
            {!loading && !error && insights.length > 0 && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                {insights.length} insights active
              </span>
            )}
          </div>

          {loading && (
            <div className="space-y-3">
              <div className="h-20 rounded-2xl bg-slate-100 animate-pulse"></div>
              <div className="h-20 rounded-2xl bg-slate-100 animate-pulse"></div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700 font-semibold mb-3">Failed to load AI insights.</p>
              <Button
                onClick={() => refetch()}
                className="h-auto py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-widest"
              >
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && insights.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              No insights available right now. Try refreshing in a moment.
            </div>
          )}

          {!loading && !error && insights.length > 0 && (
            <div className="space-y-3">
              {insights.slice(0, 3).map((insight) => (
                <div key={insight.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">{insight.title}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{insight.description}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
                      {insight.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-24 left-0 w-full z-40 px-6 py-4 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-xl">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Messages Display */}
          {messages.length > 0 && (
            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    "max-w-xs px-6 py-3 rounded-3xl text-sm font-medium",
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-emerald-50 text-on-surface rounded-bl-none'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Input Area */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full bg-surface-container-low/60 border border-emerald-900/10 rounded-full pl-8 pr-16 py-4 h-auto text-on-surface placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all text-base font-medium" 
                placeholder="Ask Fiscal anything..."
                aria-label="Chat message input"
                role="textbox"
                aria-multiline="false"
              />
              <button 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
                aria-label="Attach file"
              >
                <Paperclip className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Button 
              onClick={handleSendMessage}
              className="w-14 h-14 flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/40 active:scale-95 transition-all duration-300 p-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Send message"
            >
              <Send className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ 
  icon, 
  title, 
  description,
  ariaLabel
}: { 
  icon: React.ReactNode
  title: string
  description: string
  ariaLabel?: string
}) {
  return (
    <button 
      className="col-span-1 group relative bg-white border border-emerald-900/10 rounded-4xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-emerald-900/5 text-left flex flex-col justify-between min-h-[220px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={ariaLabel || `${title}: ${description}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden="true">
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
