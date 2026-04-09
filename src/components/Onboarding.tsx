import React from 'react';
import { ArrowRight, Wallet, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden z-[999]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-50 rounded-lg">
            <Wallet className="h-5 w-5 text-emerald-600" />
          </div>
          <span className="text-xl font-black text-on-surface uppercase tracking-wider">GSV AI Finance</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 overflow-y-auto">
        {/* Hero Visual - Credit Card Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-sm aspect-[4/5] flex items-center justify-center mb-8"
        >
          {/* Background Decoration */}
          <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-[80px] -top-10 -left-10"></div>
          <div className="absolute w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -bottom-10 -right-10"></div>

          {/* Back Card - AI Suggestion */}
          <motion.div 
            initial={{ rotate: 3, translateY: -20, translateX: 10 }}
            animate={{ rotate: 3, translateY: -20, translateX: 10 }}
            className="absolute w-[85%] h-[180px] bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/80 z-10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <p className="text-[10px] text-on-surface/50 uppercase tracking-widest font-semibold">Spend Analysis</p>
                <p className="text-base font-bold text-secondary">Monthly Budget</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-xl">
                <Zap className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xl font-black tracking-tight text-secondary">$3,500 <span className="text-xs font-normal text-on-surface/40">/ $5,000</span></span>
                <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">70%</span>
              </div>
              <div className="h-2 w-full bg-surface-variant/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Front Card - Premium Card */}
          <motion.div 
            initial={{ rotate: -2, scale: 0.95 }}
            animate={{ rotate: -2, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-[1.58/1] bg-gradient-to-br from-slate-900 to-black rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 flex flex-col justify-between z-20"
          >
            {/* Chip and Contactless */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">World Elite</p>
                <div className="h-10 w-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-inner flex items-center justify-center overflow-hidden border border-yellow-700/30">
                  <div className="w-full h-full flex flex-wrap p-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex-1 border border-black/10"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center text-white/20 text-xs font-bold">✓</div>
            </div>

            {/* Card Number */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl font-mono tracking-[0.2em] text-white/90">••••</span>
                <span className="text-2xl font-mono tracking-[0.2em] text-white/90">••••</span>
                <span className="text-2xl font-mono tracking-[0.2em] text-white/90">••••</span>
                <span className="text-2xl font-mono tracking-[0.2em] text-white/90">8824</span>
              </div>

              {/* Cardholder Name and Logo */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] text-white/20 uppercase tracking-widest font-medium">Cardholder</p>
                  <p className="text-sm font-semibold tracking-wide text-white">Alex Sterling</p>
                </div>
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-500 shadow-lg"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 shadow-lg"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center max-w-sm mx-auto space-y-4"
        >
          <h1 className="text-4xl font-black text-on-surface leading-tight tracking-tight">
            Track your cash flow for better decisions.
          </h1>
          <p className="text-on-surface/60 text-base leading-relaxed">
            Track your spending, cut unnecessary costs, and make smarter decisions to grow your wealth efficiently.
          </p>
        </motion.div>
      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 left-0 w-full z-50 px-6 py-6 bg-gradient-to-t from-background to-transparent">
        <Button
          onClick={onComplete}
          className="w-full bg-primary text-on-primary font-bold py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,212,106,0.15)] active:scale-95 transition-all h-auto flex items-center justify-center gap-2 group hover:shadow-[0_15px_40px_rgba(0,212,106,0.25)]"
        >
          <span className="text-base font-semibold">Get Started</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </footer>
    </div>
  );
}
