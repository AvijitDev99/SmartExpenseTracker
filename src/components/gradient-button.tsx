import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppFonts } from '@/assets/fonts';
import { BrandColors } from '@/constants/theme';
import { fontSize, radius, spacing } from '@/utils/scale';

interface GradientButtonProps {
  label: string;
  disabled?: boolean;
  labelColor?: string;
  loading?: boolean;
  arrowColor?: string;
  onPress?: (() => void) | undefined;
}

export const GradientButton = ({
  arrowColor = '#FFFFFF',
  disabled = false,
  label,
  labelColor = '#FFFFFF',
  loading = false,
  onPress,
}: GradientButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable disabled={isDisabled} onPress={onPress} style={styles.buttonWrap}>
      <LinearGradient
        colors={[BrandColors.finalWish.pinkPrimary400, BrandColors.finalWish.pinkPrimary300]}
        end={{ x: 0.5, y: 1 }}
        start={{ x: 0.5, y: 0 }}
        style={[styles.gradientButton, isDisabled ? styles.gradientButtonDisabled : undefined]}
      >
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
              <Text style={[styles.arrow, { color: arrowColor }]}>→</Text>
            </>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  arrow: {
    color: '#FFFFFF',
    fontFamily: AppFonts.interMedium,
    fontSize: fontSize(18),
    lineHeight: spacing(22),
  },
  buttonWrap: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing(10),
    justifyContent: 'center',
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: radius(100),
    height: spacing(62),
    justifyContent: 'center',
    width: '100%',
  },
  gradientButtonDisabled: {
    opacity: 0.78,
  },
  label: {
    color: '#FFFFFF',
    fontFamily: AppFonts.interMedium,
    fontSize: fontSize(18),
    lineHeight: spacing(22),
    textAlign: 'center',
  },
});
