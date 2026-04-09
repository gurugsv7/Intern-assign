import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Settings,
  LayoutDashboard,
  ReceiptText,
  Bot,
  CircleHelp,
  X,
  SendHorizontal,
  LoaderCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface DesktopLayoutProps {
  children: React.ReactNode;
  activePage?: string;
  onNavigate?: (page: string) => void;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function DesktopLayout({ children, activePage = 'home', onNavigate }: DesktopLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Hi, I am Fiscal. I can help you summarize spending, optimize transfers, and suggest next financial actions.',
      time: getTimeLabel(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'stats', label: 'Spending', icon: ReceiptText },
    { id: 'insights', label: 'AI Insights', icon: Bot },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate?.(pageId);
  };

  useEffect(() => {
    if (!isChatOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping, isChatOpen]);

  const quickPrompts = useMemo(
    () => [
      'Summarize this month',
      'How can I reduce expenses?',
      'Suggest transfer strategy',
      'Show high impact savings',
    ],
    []
  );

  const handleSend = (rawPrompt?: string) => {
    const prompt = (rawPrompt ?? input).trim();

    if (!prompt || isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: prompt,
      time: getTimeLabel(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: getAssistantReply(prompt),
        time: getTimeLabel(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 700);
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

      <AnimatePresence>
        {isChatOpen && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="fixed right-8 bottom-28 z-[60] w-[360px] max-w-[calc(100vw-2rem)] h-[520px] rounded-[1.65rem] border border-slate-200 bg-white shadow-[0_22px_56px_rgba(0,0,0,0.14)] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-200 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] font-black text-slate-400">Assistant</p>
                    <h3 className="text-lg font-black tracking-tight text-slate-900">Financial Assistant</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-slate-500">Online</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  aria-label="Close chatbot"
                >
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fbfcff]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn('flex', message.sender === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[86%] px-3.5 py-3 rounded-xl shadow-sm border',
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white border-emerald-600 rounded-br-sm'
                        : 'bg-white text-slate-800 border-slate-200 rounded-bl-md'
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={cn(
                        'text-[10px] mt-2 font-medium',
                        message.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                      )}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[86%] px-3.5 py-3 rounded-xl rounded-bl-sm bg-white text-slate-700 border border-slate-200 shadow-sm flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin text-emerald-600" />
                    <span className="text-sm">Fiscal is preparing your answer...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pt-3 pb-3 border-t border-slate-200 bg-white">
              <div className="mb-2.5 flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask Fiscal about your finances..."
                  className="flex-1 h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-emerald-600 text-white shadow-[0_16px_32px_rgba(6,95,70,0.28)] flex items-center justify-center hover:scale-105 transition-transform z-[61]"
        aria-label={isChatOpen ? 'Close AI chatbot' : 'Open AI chatbot'}
      >
        <Bot className="h-6 w-6" />
      </button>
    </div>
  );
}

function getTimeLabel() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getAssistantReply(prompt: string) {
  const text = prompt.toLowerCase();

  if (text.includes('summar') || text.includes('month')) {
    return 'This month your spending is concentrated in subscriptions, food, and transfers. You are tracking 8% below your previous 30-day baseline.';
  }

  if (text.includes('reduce') || text.includes('expense') || text.includes('save')) {
    return 'Top optimization: cap discretionary food orders to 3 per week and pause two low-use subscriptions. Estimated monthly savings: around $180 to $240.';
  }

  if (text.includes('transfer')) {
    return 'Transfer strategy: route routine transfers through low-fee rails and batch non-urgent payouts once daily. This improves predictability and reduces transaction overhead.';
  }

  if (text.includes('invest') || text.includes('portfolio')) {
    return 'Your current profile can support a moderate allocation. Consider a monthly auto-invest split with a safety buffer and rebalance cadence every 30 days.';
  }

  return 'I can break down spending trends, suggest budget moves, and prioritize high-impact actions. Tell me your goal and I will produce a tailored plan.';
}
