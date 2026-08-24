export const ROUTES = {
  home: 'Home',
  signIn: 'SignIn',
  splash: 'Splash',
} as const;

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  Splash: undefined;
};
