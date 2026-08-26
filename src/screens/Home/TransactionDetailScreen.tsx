import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import type { RootStackParamList } from '@/navigation/types';
import { Button } from '@/components/Button';

import { MOCK_TRANSACTIONS } from '@/constants/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetailScreen = ({ navigation, route }: Props) => {
  const txn = MOCK_TRANSACTIONS.find((t) => t.id === route.params.id) ?? MOCK_TRANSACTIONS[0];

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {/* Back row */}
      <View style={styles.backRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.backTitle}>Transaction</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIco, { backgroundColor: txn.bg }]}>
            <Text style={styles.heroEmoji}>{txn.emoji}</Text>
          </View>
          <Text style={styles.heroAmt}>{txn.amount}</Text>
          <Text style={styles.heroMerchant}>{txn.label}</Text>
        </View>

        {/* Detail rows */}
        <View style={styles.detailCard}>
          {[
            { label: 'Category', value: 'Food & Dining' },
            { label: 'Date', value: 'Dec 15, 2024' },
            { label: 'Time', value: '7:42 PM' },
            { label: 'Payment', value: 'UPI · HDFC Bank' },
            { label: 'Status', value: '✅ Completed' },
            { label: 'Note', value: 'Dinner with family' },
          ].map((row) => (
            <View key={row.label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button label="Edit Transaction" variant="outline" />
          <Button label="Delete" variant="danger" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    padding: spacing.xxl,
  },
  backArrow: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(20),
  },
  backBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
    ...shadows.sm,
  },
  backRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  backTitle: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(19),
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  detailCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
    ...shadows.sm,
  },
  detailLabel: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(14),
  },
  detailRow: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: scale(14),
  },
  detailValue: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  hero: {
    alignItems: 'center',
    paddingBottom: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  heroAmt: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(32),
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  heroEmoji: { fontSize: 28 },
  heroIco: {
    alignItems: 'center',
    borderRadius: 18,
    height: 64,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: 64,
  },
  heroMerchant: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(14),
  },
});
