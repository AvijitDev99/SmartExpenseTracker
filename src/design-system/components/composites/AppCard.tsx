import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import { radius } from '@design-system/tokens/radius';
import { spacing } from '@design-system/tokens/spacing';

interface AppCardContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface AppCardProps {
  accessibilityLabel?: string;
  children: ReactNode;
  mode?: 'contained' | 'elevated' | 'outlined';
  style?: StyleProp<ViewStyle>;
}

export const AppCard = ({
  accessibilityLabel,
  children,
  mode = 'contained',
  style,
}: AppCardProps) => (
  <Card accessibilityLabel={accessibilityLabel} mode={mode} style={[styles.card, style]}>
    {children}
  </Card>
);

export const AppCardContent = ({
  children,
  style,
}: AppCardContentProps) => (
  <Card.Content style={[styles.content, style]}>{children}</Card.Content>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
  },
  content: {
    gap: spacing.sm,
  },
});
