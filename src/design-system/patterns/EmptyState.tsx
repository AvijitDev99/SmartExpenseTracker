import { StyleSheet, View } from 'react-native';

import { AppButton, AppText } from '@design-system/components';
import { spacing } from '@/design-system/tokens/spacing';

interface EmptyStateProps {
  actionLabel?: string;
  description: string;
  onActionPress?: () => void;
  title: string;
}

export const EmptyState = ({
  actionLabel,
  description,
  onActionPress,
  title,
}: EmptyStateProps) => (
  <View style={styles.container}>
    <AppText variant="headlineSmall">{title}</AppText>
    <AppText style={styles.description} variant="bodyMedium">
      {description}
    </AppText>
    {actionLabel && onActionPress ? (
      <AppButton mode="contained" onPress={onActionPress}>
        {actionLabel}
      </AppButton>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
    justifyContent: 'center',
    minHeight: 240,
    padding: spacing.xl,
  },
  description: {
    textAlign: 'center',
  },
});
