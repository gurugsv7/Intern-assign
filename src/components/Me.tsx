import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, CreditCard, Send, Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function Me() {
  const [amount, setAmount] = useState("840.00");

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.slice(0, -1) || "0");
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => (prev === "0" ? key : prev + key));
    }
  };

  return (
    <div className="bg-emerald-50/30 min-h-screen text-on-surface pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 w-full bg-transparent sticky top-0 z-50">
        <Button variant="ghost" size="icon" className="text-emerald-900 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg text-emerald-900">Send Money</h1>
        <Button variant="ghost" size="icon" className="text-emerald-900 rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      <main className="max-w-md mx-auto px-6 pt-8 space-y-10">
        {/* Amount Input Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <span className="text-on-background/40 text-4xl font-light mr-2">$</span>
            <span className="text-6xl md:text-7xl font-bold tracking-tight text-primary">{amount}</span>
            <div className="w-[3px] h-14 md:h-16 bg-primary-container ml-2 animate-pulse"></div>
          </div>
        </div>

        {/* Transaction Flow Cards */}
        <div className="space-y-4">
          {/* Recipient Card */}
          <div className="bg-white rounded-[2rem] p-5 flex items-center justify-between shadow-sm border border-emerald-100/50">
            <div className="flex items-center gap-4">
              <div className="text-on-surface-variant font-medium text-sm">To:</div>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-emerald-50">
                  <AvatarImage src="https://picsum.photos/seed/annette/100" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-on-surface">Annette</span>
              </div>
            </div>
            <Button variant="link" className="text-primary text-sm font-bold tracking-wide p-0 h-auto">Change</Button>
          </div>

          {/* Source Card */}
          <div className="bg-white rounded-[2rem] p-5 flex items-center justify-between shadow-sm border border-emerald-100/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-on-surface font-semibold">Your balance $2,024.8</div>
                <div className="text-on-surface-variant text-xs">Main Mastercard • 4492</div>
              </div>
            </div>
            <MoreVertical className="h-5 w-5 text-on-surface-variant rotate-90" />
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full premium-gradient text-white font-bold py-7 rounded-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg">
          Send ${amount}
          <Send className="h-5 w-5" />
        </Button>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-y-4 text-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'backspace'].map((key) => (
            <button 
              key={key}
              onClick={() => handleKeyPress(key.toString())}
              className="py-4 text-2xl font-semibold text-on-surface active:bg-emerald-50 rounded-2xl transition-colors flex items-center justify-center"
            >
              {key === 'backspace' ? <Delete className="h-6 w-6" /> : key}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
