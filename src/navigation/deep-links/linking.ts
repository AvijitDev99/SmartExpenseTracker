import type { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from '@/navigation/route-types';

export const linkingConfig: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      Home: 'home',
      SignIn: 'sign-in',
      Splash: 'splash',
    },
  },
  prefixes: ['finalwish://'],
};
