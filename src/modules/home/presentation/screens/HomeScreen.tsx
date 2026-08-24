import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppButton,
  AppCard,
  AppCardContent,
  AppText,
} from '@design-system/components';
import { ScreenScaffold } from '@/design-system/patterns/ScreenScaffold';
import { spacing } from '@/design-system/tokens/spacing';
import { ROUTES, type RootStackParamList } from '@/navigation/route-types';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import { useAppSelector } from '@/store/hooks';
import { useScreenTelemetry } from '@services/observability/performance/useScreenTelemetry';
import { observabilityEvents } from '@services/observability/events';

import { useHomeScreenModel } from '../hooks/useHomeScreenModel';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { insightCards, signOut, user } = useHomeScreenModel();
  useScreenTelemetry('Home', observabilityEvents.screenHomeViewed);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace(ROUTES.signIn);
    }
  }, [isAuthenticated, navigation]);

  return (
    <ScreenScaffold scrollable>
      <View style={styles.container}>
        <AppText variant="headlineMedium">
          {user ? `Welcome, ${user.displayName}` : 'Operational home'}
        </AppText>
        <AppText variant="bodyLarge">
          This starter keeps secure session handling, design tokens, navigation,
          and module boundaries ready for feature delivery at scale.
        </AppText>

        {insightCards.map((card) => (
          <AppCard
            accessibilityLabel={card.accessibilityLabel}
            key={card.id}
            mode="contained"
          >
            <AppCardContent style={styles.cardContent}>
              <AppText variant="titleMedium">{card.title}</AppText>
              <AppText variant="bodyMedium">{card.body}</AppText>
            </AppCardContent>
          </AppCard>
        ))}

        <View style={styles.actions}>
          <AppButton mode="outlined" onPress={() => void signOut()}>
            Sign out
          </AppButton>
        </View>
      </View>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
  },
  cardContent: {
    gap: spacing.sm,
  },
  container: {
    gap: spacing.lg,
    padding: spacing.xl,
  },
});
