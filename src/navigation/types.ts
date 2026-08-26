import type { NavigationProp } from '@react-navigation/native';

/** Every route in the app plus the params it accepts. */
export type RootStackParamList = {
  ExpenseSplash: undefined;
  ExpenseOnboarding: undefined;
  ExpenseSetup: undefined;
  ExpenseMain: undefined;
  TransactionDetail: { id: string };
  AddExpense: { type?: 'expense' | 'income' } | undefined;
  Scanner: undefined;
  ProfileSettings: { title: string };
  Budgets: undefined;
  Goals: undefined;
};

/** Shorthand for the `navigation` prop passed down to tab components. */
export type AppNavigation = NavigationProp<RootStackParamList>;
