import React from 'react';
import { ArrowDownLeft, Scan, Send, ArrowLeftRight, Receipt, Smartphone, Grid, ChevronRight, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USER, MOCK_TRANSACTIONS } from '@/src/lib/mockData';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface HomeProps {
  onOpenSend?: () => void;
}

export default function Home({ onOpenSend }: HomeProps) {
  return (
    <div className="bg-white/50 min-h-screen text-on-surface">
      <div className="px-6 space-y-6 max-w-lg mx-auto">
      {/* Balance Section */}
      <section className="text-center space-y-1 py-4 mt-4">
        <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase">Available Balance</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          ${MOCK_USER.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h1>
      </section>

      {/* Primary Actions */}
      <section className="grid grid-cols-3 gap-3">
        <ActionButton icon={<ArrowDownLeft className="h-5 w-5" />} label="Receive" />
        <ActionButton icon={<Scan className="h-5 w-5" />} label="Scan" primary />
        <ActionButton icon={<Send className="h-5 w-5" />} label="Send" onClick={onOpenSend} />
      </section>

      {/* Quick Services */}
      <section className="bg-surface-container-low/50 rounded-[32px] p-6 space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-extrabold text-on-surface uppercase tracking-widest">Quick Services</h2>
          <Button variant="ghost" className="text-xs text-primary font-bold px-2 py-1 bg-emerald-50 rounded-lg h-auto">View All</Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <ServiceItem icon={<ArrowLeftRight className="h-6 w-6" />} label="Transfer" />
          <ServiceItem icon={<Receipt className="h-6 w-6" />} label="Bills" />
          <ServiceItem icon={<Smartphone className="h-6 w-6" />} label="Data" />
          <ServiceItem icon={<Grid className="h-6 w-6" />} label="More" />
        </div>
      </section>

      {/* Monthly Summary Card */}
      <Card className="rounded-[32px] border-emerald-50 shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Efficiency Score</p>
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                Monthly Summary <br/><span className="text-emerald-600">April</span>
              </h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-tight border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                On Track
              </span>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">{MOCK_USER.savingsRate}%</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${MOCK_USER.savingsRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full premium-gradient rounded-full shadow-[0_0_8px_rgba(0,109,51,0.2)]" 
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>$0.00 Spent</span>
              <span>Budget: ${MOCK_USER.budget.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-extrabold text-on-surface uppercase tracking-widest">Recent Activity</h2>
          <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-primary h-auto p-0">See All</Button>
        </div>
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((tx) => (
            <motion.div 
              key={tx.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 bg-white/60 border border-white rounded-[24px] shadow-sm hover:shadow-md hover:bg-white transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-2 ring-white">
                  <AvatarImage src={tx.avatar} />
                  <AvatarFallback>{tx.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-slate-900">{tx.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{tx.category} • {formatTimeAgo(new Date(tx.date))}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className={cn(
                  "text-sm font-black",
                  tx.type === 'income' ? "text-emerald-600" : "text-slate-900"
                )}>
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}

function ActionButton({ icon, label, primary, onClick }: { icon: React.ReactNode, label: string, primary?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
      "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 group",
      primary ? "premium-gradient shadow-lg shadow-emerald-900/10" : "bg-white/60 backdrop-blur-sm border border-white shadow-sm hover:bg-emerald-50"
    )}>
      <div className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full transition-colors",
        primary ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[11px] font-bold uppercase tracking-tight",
        primary ? "text-white" : "text-slate-600"
      )}>{label}</span>
    </button>
  );
}

function ServiceItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 hover:bg-white/80 p-3 rounded-2xl transition-all cursor-pointer group">
      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:shadow text-slate-600 group-hover:text-emerald-600 transition-colors">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
