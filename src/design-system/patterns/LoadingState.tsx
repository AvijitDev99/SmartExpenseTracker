import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { AppText } from '@design-system/components';
import { spacing } from '@/design-system/tokens/spacing';
import { useAppTheme } from '@/hooks/useAppTheme';

interface LoadingStateProps {
  label?: string;
}

export const LoadingState = ({
  label = 'Preparing workspace...',
}: LoadingStateProps) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
      <AppText style={styles.label} variant="bodyMedium">
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  label: {
    textAlign: 'center',
  },
});
