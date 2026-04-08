import React from 'react';
import { Bell, Menu, Home, PieChart, Wallet, User, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MOCK_USER } from '@/src/lib/mockData';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-panel h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-primary" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-50 rounded-lg">
              <PieChart className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-emerald-950">Flowin</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-50">
            <Bell className="h-5 w-5 text-slate-500" />
          </Button>
          <Avatar className="h-9 w-9 ring-2 ring-emerald-50 shadow-sm cursor-pointer">
            <AvatarImage src={MOCK_USER.avatar} />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 flex-1">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-t border-emerald-500/10 pt-3 pb-8 px-8 flex justify-between items-center">
        <NavItem 
          icon={<Home className="h-6 w-6" />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={<PieChart className="h-6 w-6" />} 
          label="Stats" 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')} 
        />
        <NavItem 
          icon={<Wallet className="h-6 w-6" />} 
          label="Wallet" 
          active={activeTab === 'wallet'} 
          onClick={() => setActiveTab('wallet')} 
        />
        <NavItem 
          icon={<User className="h-6 w-6" />} 
          label="Me" 
          active={activeTab === 'me'} 
          onClick={() => setActiveTab('me')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300",
        active ? "text-emerald-700 bg-emerald-50 rounded-2xl px-6 py-2 scale-110" : "text-slate-400 px-5 py-2 hover:text-emerald-600"
      )}
    >
      {icon}
      <span className="text-[10px] font-black tracking-widest uppercase mt-1">{label}</span>
    </button>
  );
}
