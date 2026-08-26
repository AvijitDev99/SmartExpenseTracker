import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';

interface TypeToggleProps {
  options: string[];
  selected: number;
  onSelect: (index: number) => void;
}

/** Segmented pill control, e.g. Expense / Income. */
export const TypeToggle = ({ options, selected, onSelect }: TypeToggleProps) => (
  <View style={styles.typeToggle}>
    {options.map((opt, i) => (
      <TouchableOpacity
        key={opt}
        onPress={() => onSelect(i)}
        style={[styles.typeToggleBtn, i === selected ? styles.typeToggleBtnActive : null]}
      >
        <Text style={[styles.typeToggleTxt, i === selected ? styles.typeToggleTxtActive : null]}>
          {opt}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  typeToggle: {
    backgroundColor: colors.surface2,
    borderRadius: radius.pill,
    flexDirection: 'row',
    gap: spacing.xs,
    marginHorizontal: spacing.xl,
    marginVertical: spacing.xs,
    padding: spacing.xs,
  },
  typeToggleBtn: {
    borderRadius: radius.pill,
    flex: 1,
    paddingVertical: 11,
  },
  typeToggleBtnActive: {
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  typeToggleTxt: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(13),
    textAlign: 'center',
  },
  typeToggleTxtActive: { color: colors.ink },
});
