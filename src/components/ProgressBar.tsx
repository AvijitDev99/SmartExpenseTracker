import { StyleSheet, View } from 'react-native';

import { colors } from '@/styles/colors';

interface ProgressBarProps {
  /** 0–1. Values above 1 are clamped to a full bar. */
  progress: number;
  variant?: 'default' | 'warn' | 'over';
}

export const ProgressBar = ({ progress, variant = 'default' }: ProgressBarProps) => {
  const fillColor =
    variant === 'over' ? colors.red : variant === 'warn' ? colors.amber : colors.primary;

  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${Math.min(progress * 100, 100)}%`, backgroundColor: fillColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressFill: {
    borderRadius: 99,
    height: '100%',
  },
  progressTrack: {
    backgroundColor: colors.surface2,
    borderRadius: 99,
    height: 9,
    overflow: 'hidden',
  },
});
