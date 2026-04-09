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
  mainRef?: React.RefObject<HTMLElement>;
}

export default function Layout({ children, activeTab, setActiveTab, mainRef }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-panel h-16 px-6 flex items-center justify-between" role="banner">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            aria-label="Menu"
            aria-expanded="false"
          >
            <Menu className="h-5 w-5 text-primary" aria-hidden="true" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-50 rounded-lg" aria-hidden="true">
              <PieChart className="h-5 w-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-emerald-950">GSV AI Finance</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-emerald-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-500" aria-hidden="true" />
          </Button>
          <Avatar 
            className="h-9 w-9 ring-2 ring-emerald-50 shadow-sm cursor-pointer"
            aria-label={`User profile: ${MOCK_USER.name}`}
          >
            <AvatarImage src={MOCK_USER.avatar} alt={`${MOCK_USER.name}'s avatar`} />
            <AvatarFallback>{MOCK_USER.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 flex-1 overflow-y-auto overflow-x-hidden" role="main" aria-label="Main content" ref={mainRef}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-t border-emerald-500/10 pt-3 pb-8 px-8 flex justify-center items-center gap-4" 
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center" role="tablist">
          <NavItem 
            icon={<Home className="h-5 w-5" />} 
            label="Home" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
            role="tab"
            ariaSelected={activeTab === 'home'}
          />
          <div className="ml-2">
            <NavItem 
              icon={<PieChart className="h-5 w-5" />} 
              label="Spending" 
              active={activeTab === 'stats'} 
              onClick={() => setActiveTab('stats')}
              role="tab"
              ariaSelected={activeTab === 'stats'}
            />
          </div>
        </div>

        {/* Spacer for center FAB */}
        <div className="w-14" aria-hidden="true" />

        <div className="flex gap-6 items-center" role="tablist">
          <NavItem 
            icon={<Wallet className="h-5 w-5" />} 
            label="Assistant" 
            active={activeTab === 'wallet'} 
            onClick={() => setActiveTab('wallet')}
            role="tab"
            ariaSelected={activeTab === 'wallet'}
          />
          <NavItem 
            icon={<User className="h-5 w-5" />} 
            label="Me" 
            active={activeTab === 'me'} 
            onClick={() => setActiveTab('me')}
            role="tab"
            ariaSelected={activeTab === 'me'}
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  active, 
  onClick,
  role,
  ariaSelected
}: { 
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  role?: string
  ariaSelected?: boolean
}) {
  return (
    <button 
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role={role}
      aria-selected={ariaSelected}
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-2xl",
        active ? "text-emerald-700 bg-emerald-50 rounded-2xl px-6 py-2 scale-110" : "text-slate-400 px-5 py-2 hover:text-emerald-600"
      )}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="text-[10px] font-black tracking-widest uppercase mt-1">{label}</span>
    </button>
  );
}
