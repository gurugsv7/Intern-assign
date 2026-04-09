export const MOCK_USER = {
  name: "Julian Vane",
  email: "julian.vane@luminouswealth.ai",
  role: "Chief Investment Architect",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuABHKHa1TRiiU9sWczMdLoBystDi1CdQMu0RrnCr3XKz78kd2QmWlyUixILxLbaALmkyKBxKPYnM8oMcb91i_NUvs6SilGDkiUFYg9L9vaYB83EyNCkP8FUzNXFXpzMc9D1kMBtobN-6sU9D2jC7uaH-R4XkW1OV5VNwpM1WBEyEGXqOjXWpZJC0HOJyqK3rKrlvCrkUsjZ_9FJPZgicc6hGc5mi0CX66Y9fWLu5J5Vs80jx3n96gf68_dMkiVggXmRMHOvT9crA9zE",
  balance: 247856.40,
  monthlyIncome: 12500,
  monthlySpending: 6845,
  budget: 7500,
  savingsRate: 45,
  premiumMember: true,
  tier: "Level 09",
  sovereignStatus: "Verified Alpha",
  lastSynced: "2m ago",
};

export const MOCK_PLATFORM_METRICS = {
  budgetDeltaPercent: 2.1,
  spendingVsBudgetPercent: 91.3,
  monthlySavingsProjection: 491,
  quarterlyGrowthPercent: 12.4,
  categoryFlowTotal: 4280,
  categoryFlow: [
    { name: 'Investment', value: 64, color: '#0f172a', amount: 2739.2 },
    { name: 'Lifestyle', value: 22, color: '#10b981', amount: 941.6 },
    { name: 'Essentials', value: 14, color: '#d4d4d8', amount: 599.2 },
  ],
  protectionValue: 12400,
  taxHarvestingOpportunity: 4200,
  projectedNetWorth: 4200000,
  passiveIncomeMonthly: 18000,
  riskProjection: 'Low-Stable',
  lifestyleAlignmentIndex: 94,
  monthlyOutflowDeltaPercent: 4.2,
  environmentEfficiencyPercent: 84,
};

export const MOCK_STRATEGY_INSIGHTS = [
  {
    title: 'Food & Dining',
    savings: 242,
    description: 'Optimization potential based on historical averages.',
  },
  {
    title: 'Transportation',
    savings: 125,
    description: 'Carpool and off-peak route optimization identified.',
  },
  {
    title: 'Retail & Shopping',
    savings: 124,
    description: 'Discretionary limit exceeded by 18% this cycle.',
  },
];

export const MOCK_BUDGET_ALLOCATION = [
  { label: 'Housing', value: 31, color: '#1e40af' },
  { label: 'Emergency Fund', value: 19, color: '#475569' },
  { label: 'Investments', value: 25, color: '#34d399' },
  { label: 'Lifestyle', value: 25, color: '#93c5fd' },
];

export const MOCK_SPENDING_ARCHITECTURE = [
  { name: 'Mortgage & Living', amount: 4200 },
  { name: 'Lifestyle', amount: 1250 },
  { name: 'Transport', amount: 700 },
  { name: 'Utilities', amount: 420 },
  { name: 'Health', amount: 275 },
];

export const MOCK_MERCHANT_AFFINITY = [
  { badge: 'AM', label: 'Amazon Prime', amount: 248.5, badgeClass: 'bg-slate-900 text-white' },
  { badge: 'WF', label: 'Whole Foods', amount: 842.1, badgeClass: 'bg-emerald-500 text-white' },
  { badge: 'TS', label: 'Tesla Charge', amount: 124, badgeClass: 'bg-slate-200 text-slate-700' },
];

export const MOCK_TRANSACTION_STORY = {
  featured: {
    tag: 'Investment',
    title: 'Private Equity Acquisition',
    description: 'Strategically increased position in Sustainable Energy Ventures.',
    amount: 42000,
    dateLabel: 'Oct 24, 2023',
  },
  luxury: {
    title: 'Luxury Travel',
    subtitle: 'Aman Resort Kyoto',
    amount: -12450,
    dateLabel: 'Oct 21, 2023',
  },
  narrative: [
    {
      dayNumber: '28',
      dayLabel: 'October Twenty-Eight',
      entries: [
        {
          tag: 'Interior',
          title: 'Nordic Design Collective',
          amount: -842.1,
          time: '14:20 PM',
          note: 'Curating the minimalist aesthetic for your workspace.',
          tone: 'default',
        },
        {
          tag: 'Growth Asset',
          title: 'Dividend Reinvestment',
          amount: 1240,
          time: '09:00 AM',
          note: 'Compound interest at work within your Tech Portfolio.',
          tone: 'positive',
        },
      ],
    },
    {
      dayNumber: '27',
      dayLabel: 'October Twenty-Seven',
      entries: [
        {
          tag: 'Fine Dining',
          title: 'Mirazur Gastronomy',
          amount: -620,
          time: '21:45 PM',
          note: 'A refined evening of culinary storytelling at Mirazur.',
          tone: 'default',
        },
        {
          tag: 'Utility',
          title: 'Tesla Supercharge',
          amount: -42.15,
          time: '11:12 AM',
          note: 'Sustaining your commute with Tesla clean energy.',
          tone: 'default',
        },
      ],
    },
  ],
};

export const MOCK_TRANSACTIONS = [
  {
    id: "1",
    name: "Monthly Salary",
    category: "Income",
    amount: 12500.00,
    date: "2026-04-08T10:00:00Z",
    type: "income",
    avatar: "https://picsum.photos/seed/salary/100"
  },
  {
    id: "2",
    name: "Nordic Design Collective",
    category: "Interior",
    amount: -842.10,
    date: "2026-04-08T14:20:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/nordic/100"
  },
  {
    id: "3",
    name: "Dividend Reinvestment",
    category: "Growth Asset",
    amount: 1240.00,
    date: "2026-04-08T09:00:00Z",
    type: "income",
    avatar: "https://picsum.photos/seed/dividend/100"
  },
  {
    id: "4",
    name: "Mirazur Gastronomy",
    category: "Fine Dining",
    amount: -620.00,
    date: "2026-04-07T21:45:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/mirazur/100"
  },
  {
    id: "5",
    name: "Tesla Supercharge",
    category: "Utility",
    amount: -42.15,
    date: "2026-04-07T11:12:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/tesla/100"
  },
  {
    id: "6",
    name: "Aman Resort Kyoto",
    category: "Travel",
    amount: -12450.00,
    date: "2026-04-06T13:10:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/aman/100"
  },
  {
    id: "7",
    name: "Private Equity Acquisition",
    category: "Investment",
    amount: 42000.00,
    date: "2026-04-05T16:30:00Z",
    type: "income",
    avatar: "https://picsum.photos/seed/private-equity/100"
  },
  {
    id: "8",
    name: "Whole Foods",
    category: "Lifestyle",
    amount: -248.50,
    date: "2026-04-05T09:10:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/wholefoods/100"
  },
  {
    id: "9",
    name: "Amazon Prime",
    category: "Subscriptions",
    amount: -124.00,
    date: "2026-04-04T20:00:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/amazon/100"
  },
  {
    id: "10",
    name: "Coffee Atelier",
    category: "Dining",
    amount: -96.40,
    date: "2026-04-04T11:45:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/coffee/100"
  },
  {
    id: "11",
    name: "Zurich Vault Fee",
    category: "Infrastructure",
    amount: -312.85,
    date: "2026-04-03T10:00:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/zurich/100"
  },
  {
    id: "12",
    name: "Capital Reserve Transfer",
    category: "Investment",
    amount: 1840.00,
    date: "2026-04-02T16:00:00Z",
    type: "income",
    avatar: "https://picsum.photos/seed/reserve/100"
  },
  {
    id: "13",
    name: "Cloud Security Audit",
    category: "Infrastructure",
    amount: -154.50,
    date: "2026-04-02T08:30:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/audit/100"
  }
];

export const MOCK_SPENDING_DISTRIBUTION = [
  { name: 'Housing', value: 31, color: '#1e40af', amount: 2121.95 },
  { name: 'Investments', value: 25, color: '#34d399', amount: 1711.25 },
  { name: 'Lifestyle', value: 24, color: '#93c5fd', amount: 1642.80 },
  { name: 'Transportation', value: 12, color: '#0d9488', amount: 821.40 },
  { name: 'Utilities', value: 8, color: '#86efac', amount: 547.60 },
];
