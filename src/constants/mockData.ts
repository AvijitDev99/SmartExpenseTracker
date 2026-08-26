import type {
  Budget,
  CategorySpend,
  DonutSlice,
  Goal,
  MonthlyBar,
  Transaction,
} from '@/types/expense';

/** Static mock data — replace with real data from @/store or @/services later. */

export const MOCK_USER = {
  name: 'Avijit',
  email: 'avijit@example.com',
  initials: 'AB',
};

export const MOCK_BALANCE = {
  total: '₹1,24,580',
  income: '₹48,000',
  expense: '₹23,420',
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', emoji: '🛒', label: 'Groceries', sub: 'BigBasket · Today', amount: '-₹1,240', neg: true, bg: '#E1F2E8' },
  { id: '2', emoji: '🍕', label: 'Zomato', sub: 'Food · Today', amount: '-₹380', neg: true, bg: '#FBE7E7' },
  { id: '3', emoji: '💼', label: 'Salary', sub: 'Income · Yesterday', amount: '+₹48,000', neg: false, bg: '#E1F2E8' },
  { id: '4', emoji: '⚡', label: 'Electricity', sub: 'Utilities · 2 days ago', amount: '-₹1,850', neg: true, bg: '#FCEFD8' },
  { id: '5', emoji: '🚗', label: 'Uber', sub: 'Transport · 3 days ago', amount: '-₹220', neg: true, bg: '#E7ECFC' },
  { id: '6', emoji: '🎬', label: 'Netflix', sub: 'Entertainment · 5 days ago', amount: '-₹649', neg: true, bg: '#EFE9FD' },
  { id: '7', emoji: '💊', label: 'Pharmacy', sub: 'Health · 6 days ago', amount: '-₹560', neg: true, bg: '#FBE7E7' },
  { id: '8', emoji: '📱', label: 'Recharge', sub: 'Telecom · 7 days ago', amount: '-₹299', neg: true, bg: '#E7ECFC' },
];

export const MOCK_BUDGETS: Budget[] = [
  { id: '1', emoji: '🛒', label: 'Groceries', spent: 3200, total: 5000, progress: 0.64, variant: 'default' },
  { id: '2', emoji: '🍕', label: 'Food & Dining', spent: 4800, total: 4000, progress: 1.2, variant: 'over' },
  { id: '3', emoji: '🚗', label: 'Transport', spent: 1200, total: 2000, progress: 0.6, variant: 'default' },
  { id: '4', emoji: '🎬', label: 'Entertainment', spent: 1800, total: 2000, progress: 0.9, variant: 'warn' },
  { id: '5', emoji: '💊', label: 'Health', spent: 560, total: 3000, progress: 0.19, variant: 'default' },
];

export const MOCK_GOALS: Goal[] = [
  { id: '1', emoji: '🏠', label: 'Home Down Payment', target: 500000, saved: 185000, deadline: 'Dec 2025' },
  { id: '2', emoji: '✈️', label: 'Europe Trip', target: 150000, saved: 62000, deadline: 'Jun 2025' },
  { id: '3', emoji: '📱', label: 'New iPhone', target: 80000, saved: 45000, deadline: 'Mar 2025' },
];

export const MOCK_CATEGORIES: CategorySpend[] = [
  { id: '1', emoji: '🛒', label: 'Groceries', amount: '₹3,200', bg: '#E1F2E8' },
  { id: '2', emoji: '🍕', label: 'Food', amount: '₹4,800', bg: '#FBE7E7' },
  { id: '3', emoji: '🚗', label: 'Transport', amount: '₹1,200', bg: '#E7ECFC' },
  { id: '4', emoji: '🎬', label: 'Fun', amount: '₹1,800', bg: '#EFE9FD' },
  { id: '5', emoji: '💊', label: 'Health', amount: '₹560', bg: '#FCEFD8' },
];

export const MOCK_INSIGHTS_BARS: MonthlyBar[] = [
  { label: 'Jul', height: 60 },
  { label: 'Aug', height: 90 },
  { label: 'Sep', height: 75 },
  { label: 'Oct', height: 110 },
  { label: 'Nov', height: 85 },
  { label: 'Dec', height: 100 },
];

export const MOCK_DONUT: DonutSlice[] = [
  { label: 'Food', pct: '32%', color: '#D8484A' },
  { label: 'Transport', pct: '18%', color: '#3E63E0' },
  { label: 'Groceries', pct: '24%', color: '#0E6E52' },
  { label: 'Fun', pct: '14%', color: '#8B6EF0' },
  { label: 'Other', pct: '12%', color: '#DA8A15' },
];
