import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
}

/** Full-width action button. */
export const Button = ({ label, onPress, disabled, variant = 'primary' }: ButtonProps) => {
  const btnStyle =
    variant === 'outline'
      ? styles.btnOutline
      : variant === 'ghost'
        ? styles.btnGhost
        : variant === 'danger'
          ? styles.btnDanger
          : styles.btnPrimary;
  const textStyle =
    variant === 'outline'
      ? styles.btnOutlineText
      : variant === 'ghost'
        ? styles.btnGhostText
        : variant === 'danger'
          ? styles.btnDangerText
          : styles.btnPrimaryText;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, btnStyle, disabled ? styles.btnDisabled : null]}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    width: '100%',
  },
  btnDanger: { backgroundColor: colors.redLight },
  btnDangerText: {
    color: colors.red,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  btnDisabled: { opacity: 0.45 },
  btnGhost: { backgroundColor: 'transparent' },
  btnGhostText: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(15),
  },
  btnOutline: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1.5,
  },
  btnOutlineText: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    ...shadows.md,
  },
  btnPrimaryText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
});
