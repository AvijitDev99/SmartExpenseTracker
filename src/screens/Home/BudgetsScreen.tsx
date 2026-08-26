import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { formatCurrency } from '@/utils/currency';
import { fontSize } from '@/utils/scale';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { SectionHeader } from '@/components/SectionHeader';
import type { RootStackParamList } from '@/navigation/types';

import { MOCK_BUDGETS } from '@/constants/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Budgets'>;

export const BudgetsScreen = ({ navigation }: Props) => (
  <SafeAreaView edges={['top']} style={styles.container}>
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons color={colors.ink} name="arrow-back" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>Budgets</Text>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add</Text>
      </TouchableOpacity>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {/* Monthly summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>December Budget</Text>
        <Text style={styles.summaryAmt}>₹16,000 / ₹20,000</Text>
        <ProgressBar progress={0.8} variant="warn" />
        <Text style={styles.summaryRemain}>₹4,000 remaining · 16 days left</Text>
      </View>

      {/* Budget list */}
      <View style={styles.section}>
        <SectionHeader title="By Category" />
        <Card>
          {MOCK_BUDGETS.map((b) => (
            <View key={b.id} style={styles.budgetItem}>
              <View style={styles.biTop}>
                <Text style={styles.biLabel}>{b.emoji} {b.label}</Text>
                {b.variant === 'over' ? (
                  <Text style={styles.overFlag}>⚠️ Over budget</Text>
                ) : null}
              </View>
              <Text style={styles.biNums}>
                {formatCurrency(b.spent)} of {formatCurrency(b.total)}
              </Text>
              <ProgressBar progress={b.progress} variant={b.variant} />
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  addBtnText: {
    color: colors.primary,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13),
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
  biLabel: {
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  biNums: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
  },
  biTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  budgetItem: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  overFlag: {
    color: colors.red,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(11),
  },
  scroll: { paddingBottom: 40 },
  section: { marginTop: spacing.xxl, paddingHorizontal: spacing.xl },
  summaryAmt: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(20),
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    padding: spacing.xl,
    ...shadows.sm,
  },
  summaryLabel: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
    letterSpacing: 0.3,
  },
  summaryRemain: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
    marginTop: spacing.xs,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(19),
    letterSpacing: -0.4,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
});
