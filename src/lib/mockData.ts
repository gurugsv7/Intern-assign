export const MOCK_USER = {
  name: "Alex Sterling",
  email: "alex.sterling@example.com",
  avatar: "https://picsum.photos/seed/alex/200",
  balance: 120983.30,
  monthlyIncome: 8500,
  monthlySpending: 3450,
  budget: 5000,
  savingsRate: 68,
};

export const MOCK_TRANSACTIONS = [
  {
    id: "1",
    name: "Sophia Martine",
    category: "Returns",
    amount: 2450.00,
    date: "2024-05-20T10:00:00Z",
    type: "income",
    avatar: "https://picsum.photos/seed/sophia/100"
  },
  {
    id: "2",
    name: "Groceries Store",
    category: "Food & Dining",
    amount: -45.20,
    date: "2024-05-20T08:45:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/grocery/100"
  },
  {
    id: "3",
    name: "Willson Max",
    category: "Expenses",
    amount: -120.50,
    date: "2024-05-19T15:00:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/willson/100"
  },
  {
    id: "4",
    name: "Rachel Anne",
    category: "Payment",
    amount: 8900.00,
    date: "2024-05-18T09:00:00Z",
    type: "income",
    avatar: "https://picsum.photos/seed/rachel/100"
  },
  {
    id: "5",
    name: "Netflix",
    category: "Entertainment",
    amount: -15.99,
    date: "2024-05-17T12:00:00Z",
    type: "expense",
    avatar: "https://picsum.photos/seed/netflix/100"
  }
];

export const MOCK_SPENDING_DISTRIBUTION = [
  { name: 'Eating Out', value: 30, color: '#047857', amount: 2483.40 },
  { name: 'Dividends', value: 25, color: '#34d399', amount: 2069.50 },
  { name: 'Entertainment', value: 15, color: '#84cc16', amount: 1241.70 },
  { name: 'Cash Out', value: 15, color: '#0d9488', amount: 1241.70 },
  { name: 'Income', value: 10, color: '#86efac', amount: 827.80 },
  { name: 'Interest', value: 5, color: '#e2e8f0', amount: 413.90 },
];
