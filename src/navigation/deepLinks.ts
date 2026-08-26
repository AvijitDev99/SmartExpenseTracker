import type { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from '@/navigation/types';

/** Deep links use the `scheme` declared in app.json. */
export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ['smartexpensetracker://'],
  config: {
    screens: {
      ExpenseMain: 'home',
      AddExpense: 'add',
      Scanner: 'scan',
      TransactionDetail: 'transaction/:id',
    },
  },
};
