import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen, SignInScreen } from '@modules/auth';
import { HomeScreen } from '@modules/home';
import { ROUTES } from '@/navigation/route-types';

import type { RootStackParamList } from '@/navigation/route-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.splash} screenOptions={{ headerShown: false }}>
    <Stack.Screen component={SplashScreen} name={ROUTES.splash} />
    <Stack.Screen component={SignInScreen} name={ROUTES.signIn} />
    <Stack.Screen component={HomeScreen} name={ROUTES.home} />
  </Stack.Navigator>
);
