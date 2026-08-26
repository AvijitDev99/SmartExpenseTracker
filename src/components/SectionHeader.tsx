import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { fontSize } from '@/utils/scale';

interface SectionHeaderProps {
  title: string;
  linkLabel?: string;
  onLinkPress?: () => void;
}

/** Section title with an optional right-aligned text action. */
export const SectionHeader = ({ title, linkLabel, onLinkPress }: SectionHeaderProps) => (
  <View style={styles.sectionHead}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {linkLabel ? (
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={styles.linkBtn}>{linkLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  linkBtn: {
    color: colors.primary,
    fontFamily: fonts.interBold,
    fontSize: fontSize(13),
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  sectionHead: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(16),
  },
});
