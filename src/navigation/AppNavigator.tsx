import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import { ExpenseSplashScreen } from '@/screens/Auth/ExpenseSplashScreen';
import { OnboardingScreen } from '@/screens/Auth/OnboardingScreen';
import { SetupScreen } from '@/screens/Auth/SetupScreen';
import { AddExpenseScreen } from '@/screens/Home/AddExpenseScreen';
import { BudgetsScreen } from '@/screens/Home/BudgetsScreen';
import { ExpenseMainScreen } from '@/screens/Home/ExpenseMainScreen';
import { GoalsScreen } from '@/screens/Home/GoalsScreen';
import { ProfileSettingsScreen } from '@/screens/Home/ProfileSettingsScreen';
import { ScannerScreen } from '@/screens/Home/ScannerScreen';
import { TransactionDetailScreen } from '@/screens/Home/TransactionDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.expenseSplash}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen component={ExpenseSplashScreen} name={ROUTES.expenseSplash} />
    <Stack.Screen component={OnboardingScreen} name={ROUTES.expenseOnboarding} />
    <Stack.Screen component={SetupScreen} name={ROUTES.expenseSetup} />
    <Stack.Screen component={ExpenseMainScreen} name={ROUTES.expenseMain} />
    <Stack.Screen component={TransactionDetailScreen} name={ROUTES.transactionDetail} />
    <Stack.Screen
      component={AddExpenseScreen}
      name={ROUTES.addExpense}
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen component={ScannerScreen} name={ROUTES.scanner} />
    <Stack.Screen component={ProfileSettingsScreen} name={ROUTES.profileSettings} />
    <Stack.Screen component={BudgetsScreen} name={ROUTES.budgets} />
    <Stack.Screen component={GoalsScreen} name={ROUTES.goals} />
  </Stack.Navigator>
);
