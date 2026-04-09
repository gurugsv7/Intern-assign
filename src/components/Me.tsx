import React from 'react';
import { Settings, ChevronRight, Users, Lock, Sliders, History, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { MOCK_USER, MOCK_SPENDING_DISTRIBUTION } from '@/src/lib/mockData';

interface MeProps {
  onClose?: () => void;
  isModal?: boolean;
  onOpenMockPage?: (page: string) => void;
}

export default function Me({ onClose, isModal = false, onOpenMockPage }: MeProps) {
  const spendingData = MOCK_SPENDING_DISTRIBUTION.map(item => ({
    label: item.name,
    amount: item.amount,
    color: item.color
  }));
  
  const totalBudget = MOCK_USER.budget;
  const totalSpent = spendingData.reduce((sum, item) => sum + item.amount, 0);
  const spentPercentage = (totalSpent / totalBudget) * 100;

  const menuItems = [
    { icon: <User className="h-5 w-5" />, label: 'My Account', description: 'View & edit profile', page: 'account-profile' },
    { icon: <History className="h-5 w-5" />, label: 'Transaction History', description: 'View all transactions', page: 'transaction-history' },
    { icon: <Lock className="h-5 w-5" />, label: 'Security Settings', description: 'Manage security', page: 'security-settings' },
    { icon: <Sliders className="h-5 w-5" />, label: 'General Settings', description: 'Preferences & more', page: 'general-settings' }
  ];

  return (
    <div className={isModal ? "bg-white min-h-auto text-on-surface px-6 pb-8" : "bg-white/50 min-h-screen text-on-surface"}>
      <div className={isModal ? "max-w-md mx-auto pt-8 space-y-6" : "max-w-lg mx-auto px-6 pt-8 space-y-6"}>
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-on-surface">My Account</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-emerald-50"
            aria-label="Settings"
            onClick={() => onOpenMockPage?.('account-settings')}
          >
            <Settings className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* User Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/5 to-primary-container/5 rounded-3xl p-8 text-center border border-emerald-100/50"
        >
          <div className="flex justify-center mb-4">
            <Avatar className="h-16 w-16 ring-4 ring-primary ring-opacity-20 shadow-lg">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback className="bg-primary text-white text-lg font-bold">
                {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-extrabold text-on-surface">{MOCK_USER.name}</h2>
          <p className="text-sm text-on-surface-variant mt-1">{MOCK_USER.email}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-primary">Premium Member</span>
          </div>
        </motion.div>

        {/* Spending Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 border border-emerald-100/50 shadow-sm space-y-6"
        >
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Spending Overview</h3>
              <span className="text-2xl font-black text-primary">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <p className="text-xs text-on-surface-variant">from ${totalBudget.toLocaleString('en-US')}.00</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${spentPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full premium-gradient shadow-lg shadow-primary/30 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>$0</span>
              <span>${totalBudget.toLocaleString('en-US')}</span>
            </div>
          </div>

          {/* Spending Breakdown */}
          <div className="space-y-3">
            {spendingData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-on-surface">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-on-surface">${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Invite Friends Card */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onOpenMockPage?.('invite-friends')}
          className="w-full bg-gradient-to-br from-primary to-primary-container rounded-3xl p-6 text-left text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Invite Friends</h3>
              <p className="text-sm text-white/90">Invite your friends to manage their finances and get $100 each</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 ml-4">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.button>

        {/* Account Menu */}
        <div className="space-y-2">
          {menuItems.map((item, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              onClick={() => onOpenMockPage?.(item.page)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-emerald-100/50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all active:scale-95"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-on-surface text-sm">{item.label}</p>
                <p className="text-xs text-on-surface-variant">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
            </motion.button>
          ))}
        </div>

        {/* Logout Button (if not modal) */}
        {!isModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={() => onOpenMockPage?.('logout-flow')}
              className="w-full py-4 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold rounded-2xl transition-all"
            >
              Logout
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
