import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ComplianceProvider } from '@compliance';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { store } from '@/store/store';
import { GlobalApiLoader } from '@/shared/ui/GlobalApiLoader';

interface AppProvidersProps {
  children: ReactNode;
}

const ProviderBridge = ({ children }: AppProvidersProps) => {
  const theme = useResolvedTheme();

  return (
    <ComplianceProvider>
      <PaperProvider theme={theme}>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
        <View style={styles.content}>
          {children}
          <GlobalApiLoader />
        </View>
      </PaperProvider>
    </ComplianceProvider>
  );
};

export const AppProviders = ({ children }: AppProvidersProps) => (
  <GestureHandlerRootView style={styles.root}>
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <ProviderBridge>{children}</ProviderBridge>
      </SafeAreaProvider>
    </ReduxProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
});
