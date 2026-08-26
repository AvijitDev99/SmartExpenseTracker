export interface Transaction {
  id: string;
  emoji: string;
  label: string;
  sub: string;
  amount: string;
  neg: boolean;
  bg: string;
}

export type BudgetVariant = 'default' | 'warn' | 'over';

export interface Budget {
  id: string;
  emoji: string;
  label: string;
  spent: number;
  total: number;
  progress: number;
  variant: BudgetVariant;
}

export interface Goal {
  id: string;
  emoji: string;
  label: string;
  target: number;
  saved: number;
  deadline: string;
}

export interface CategorySpend {
  id: string;
  emoji: string;
  label: string;
  amount: string;
  bg: string;
}

export interface MonthlyBar {
  label: string;
  height: number;
}

export interface DonutSlice {
  label: string;
  pct: string;
  color: string;
}
