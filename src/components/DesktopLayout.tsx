import React from 'react';
import {
  Settings,
  LayoutDashboard,
  ReceiptText,
  Bot,
  CircleHelp,
} from 'lucide-react';

interface DesktopLayoutProps {
  children: React.ReactNode;
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export default function DesktopLayout({ children, activePage = 'home', onNavigate }: DesktopLayoutProps) {
  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'stats', label: 'Spending', icon: ReceiptText },
    { id: 'insights', label: 'AI Insights', icon: Bot },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate?.(pageId);
  };

  return (
    <div className={activePage === 'transactions' || activePage === 'settings' ? 'min-h-screen bg-[#fcfcfc] text-slate-700' : 'min-h-screen bg-[#f0f3ff] text-slate-700'}>
      <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-white/70 border-r border-slate-200/60 flex flex-col py-8 overflow-y-auto backdrop-blur-md">
        <div className="px-8 mb-10">
          <h1 className="text-2xl font-black text-slate-900 leading-none">GSV AI Finance</h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-bold mt-1">
            AI FINANCE
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={[
                  'w-full flex items-center gap-3 py-3 px-8 rounded-lg transition-all text-left',
                  isActive
                    ? 'text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 shadow-sm'
                    : 'text-slate-500 hover:bg-white/80',
                ].join(' ')}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs tracking-[0.04em] uppercase font-bold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 mt-6">
          <div className="bg-slate-900 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-400 opacity-10 rounded-full group-hover:scale-110 transition-transform"></div>
            <p className="text-white text-xs font-semibold mb-2">Need Support?</p>
            <p className="text-white/70 text-[11px] leading-relaxed mb-4">Our advisors are available 24/7 for wealth strategy.</p>
            <button className="w-full bg-blue-600 text-white text-[10px] font-bold py-2 rounded-lg tracking-wide uppercase">
              Contact Expert
            </button>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-200/60 space-y-1">
          <button
            onClick={() => handleNavClick('settings')}
            className={[
              'w-full flex items-center gap-3 py-3 px-8 transition-all text-left rounded-lg',
              activePage === 'settings'
                ? 'text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 shadow-sm'
                : 'text-slate-500 hover:bg-white/80',
            ].join(' ')}
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs tracking-[0.04em] uppercase font-bold">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 text-slate-500 py-3 px-8 hover:bg-white/80 transition-all text-left rounded-lg">
            <CircleHelp className="h-4 w-4" />
            <span className="text-xs tracking-[0.04em] uppercase font-bold">Support</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <div className={activePage === 'insights' ? 'px-12 pb-12 pt-8' : activePage === 'transactions' || activePage === 'settings' ? 'p-0' : activePage === 'stats' ? 'pt-8 pb-12 px-6 md:px-12 bg-[#f0f3ff]' : 'p-12 space-y-8 max-w-[1600px] mx-auto'}>
          {children}
        </div>
      </main>

      <button className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform z-50" aria-label="Open AI chatbot">
        <Bot className="h-8 w-8" />
      </button>
    </div>
  );
}
