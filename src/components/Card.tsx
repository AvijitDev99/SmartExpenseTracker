import type { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/styles/colors';
import { radius } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

/** White rounded surface. Becomes tappable when `onPress` is given. */
export const Card = ({ children, style, onPress }: CardProps) => {
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.card, style]}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    ...shadows.sm,
  },
});
