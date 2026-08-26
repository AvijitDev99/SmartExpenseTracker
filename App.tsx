import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { fontSources } from '@assets/fonts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppNavigator } from '@/navigation/AppNavigator';
import { linkingConfig } from '@/navigation/deepLinks';

export default function App() {
  const [fontsLoaded] = useFonts(fontSources);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <NavigationContainer linking={linkingConfig}>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
