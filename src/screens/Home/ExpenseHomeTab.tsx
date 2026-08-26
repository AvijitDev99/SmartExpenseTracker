import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import { ROUTES } from '@/navigation/routes';
import type { AppNavigation } from '@/navigation/types';
import { Card } from '@/components/Card';
import { IconBox } from '@/components/IconBox';
import { ProgressBar } from '@/components/ProgressBar';
import { SectionHeader } from '@/components/SectionHeader';
import { MOCK_BALANCE, MOCK_CATEGORIES, MOCK_TRANSACTIONS, MOCK_USER } from '@/constants/mockData';

interface Props {
  navigation: AppNavigation;
  /** Switches the bottom-nav tab shown by ExpenseMainScreen. */
  onOpenTab: (tab: 'transactions' | 'invest') => void;
}

export const ExpenseHomeTab = ({ navigation, onOpenTab }: Props) => (
  <SafeAreaView edges={['top']} style={styles.container}>
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* Greeting */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetName}>Good morning, {MOCK_USER.name} 👋</Text>
          <Text style={styles.greetSub}>Thursday, 14 August</Text>
        </View>
        <TouchableOpacity accessibilityLabel="Notifications" style={styles.notifBtn}>
          <Ionicons color={colors.ink} name="notifications-outline" size={20} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <LinearGradient
        colors={[colors.primaryDark, colors.primary, colors.primaryMid]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceWatermark}>₹</Text>
        <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
        <Text style={styles.balanceAmt}>{MOCK_BALANCE.total}</Text>
        <View style={styles.balanceSplit}>
          <View style={styles.bsItem}>
            <Text style={styles.bsLabel}>↓ Income</Text>
            <Text style={styles.bsValue}>{MOCK_BALANCE.income}</Text>
          </View>
          <View style={styles.bsItem}>
            <Text style={styles.bsLabel}>↑ Expenses</Text>
            <Text style={styles.bsValue}>{MOCK_BALANCE.expense}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Monthly budget */}
      <View style={styles.section}>
        <Card style={styles.budgetCard}>
          <Text style={styles.budgetTitle}>August Budget</Text>
          <Text style={styles.budgetNums}>
            ₹23,420 <Text style={styles.budgetTotal}>/ ₹40,000</Text>
          </Text>
          <ProgressBar progress={0.58} />
          <Text style={styles.budgetRemain}>₹16,580 remaining</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.budgets)}
            style={styles.budgetButton}
          >
            <Text style={styles.budgetButtonText}>View Budget</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Spending by category */}
      <View style={styles.section}>
        <SectionHeader title="Spending Overview" />
      </View>
      <ScrollView contentContainerStyle={styles.catScroll} horizontal showsHorizontalScrollIndicator={false}>
        {MOCK_CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.catCard}>
            <View style={[styles.catIco, { backgroundColor: cat.bg }]}>
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
            </View>
            <Text numberOfLines={1} style={styles.catLabel}>
              {cat.label}
            </Text>
            <Text style={styles.catAmt}>{cat.amount}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ad slot */}
      <View style={styles.adBanner}>
        <View style={styles.adTag}>
          <Text style={styles.adTagText}>Ad</Text>
        </View>
        <View style={styles.adIcon}>
          <Text style={styles.adEmoji}>🎮</Text>
        </View>
        <View style={styles.adCopy}>
          <Text numberOfLines={1} style={styles.adTitle}>
            Puzzle Quest — Play Free
          </Text>
          <Text numberOfLines={1} style={styles.adSub}>
            Top rated puzzle game · Install now
          </Text>
        </View>
        <View style={styles.adCta}>
          <Text style={styles.adCtaText}>Install</Text>
        </View>
      </View>
      <Text style={styles.removeAd}>
        Bothered by ads? <Text style={styles.removeAdLink}>Remove them with Pro</Text>
      </Text>

      {/* Recent transactions */}
      <View style={styles.section}>
        <SectionHeader
          linkLabel="See All"
          onLinkPress={() => onOpenTab('transactions')}
          title="Recent Transactions"
        />
        <Card style={styles.transactionCard}>
          {MOCK_TRANSACTIONS.slice(0, 4).map((txn, index) => (
            <TouchableOpacity
              key={txn.id}
              onPress={() => navigation.navigate(ROUTES.transactionDetail, { id: txn.id })}
              style={[styles.txnRow, index > 0 && styles.txnBorder]}
            >
              <IconBox bg={txn.bg} borderRadius={12} emoji={txn.emoji} size={42} />
              <View style={styles.txnMid}>
                <Text style={styles.txnLabel}>{txn.label}</Text>
                <Text style={styles.txnSub}>{txn.sub}</Text>
              </View>
              <Text style={[styles.txnAmt, txn.neg ? styles.txnNeg : styles.txnPos]}>
                {txn.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      {/* Smart insight */}
      <View style={styles.section}>
        <LinearGradient
          colors={[colors.purpleLight, colors.blueLight]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.insightCard}
        >
          <Text style={styles.insightTag}>💡 SMART INSIGHT</Text>
          <Text style={styles.insightText}>
            You spent 18% more on food this week than your usual average.
          </Text>
          <TouchableOpacity onPress={() => onOpenTab('invest')} style={styles.insightButton}>
            <Text style={styles.insightButtonText}>View Insights</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  adBanner: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: spacing.lg,
    position: 'relative',
    ...shadows.sm,
  },
  adCopy: { flex: 1, minWidth: 0 },
  adCta: {
    backgroundColor: colors.blue,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  adCtaText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(12),
  },
  adEmoji: { fontSize: 20 },
  adIcon: {
    alignItems: 'center',
    backgroundColor: colors.blueLight,
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  adSub: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(11),
  },
  adTag: {
    backgroundColor: 'rgba(20,24,18,0.55)',
    borderRadius: radius.pill,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: 'absolute',
    top: 9,
  },
  adTagText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(9),
  },
  adTitle: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13),
  },
  balanceAmt: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(36),
    letterSpacing: -0.5,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  balanceCard: {
    borderRadius: radius.xl,
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    overflow: 'hidden',
    padding: spacing.xxl,
    ...shadows.md,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
    letterSpacing: 0.5,
  },
  balanceSplit: { flexDirection: 'row', gap: spacing.md, zIndex: 1 },
  balanceWatermark: {
    bottom: -58,
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: 190,
    opacity: 0.09,
    position: 'absolute',
    right: -20,
  },
  bsItem: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 14,
    flex: 1,
    padding: spacing.md,
  },
  bsLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: fonts.interBold,
    fontSize: fontSize(11),
  },
  bsValue: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(16),
    marginTop: 3,
  },
  budgetButton: {
    alignItems: 'center',
    borderColor: colors.line,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    marginTop: spacing.md,
    paddingVertical: 10,
  },
  budgetButtonText: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13),
  },
  budgetCard: { padding: spacing.xl },
  budgetNums: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(14),
    marginBottom: spacing.sm,
  },
  budgetRemain: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
    marginTop: 10,
  },
  budgetTitle: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
    marginBottom: spacing.md,
  },
  budgetTotal: { color: colors.muted },
  catAmt: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13),
  },
  catCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.lg,
    width: 104,
    ...shadows.sm,
  },
  catEmoji: { fontSize: 16 },
  catIco: {
    alignItems: 'center',
    borderRadius: 10,
    height: 34,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 34,
  },
  catLabel: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
    marginBottom: 2,
  },
  catScroll: { gap: spacing.md, paddingHorizontal: spacing.xl, paddingVertical: 2 },
  container: { backgroundColor: colors.bg, flex: 1 },
  greetName: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(19),
  },
  greetSub: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
    marginTop: 2,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  insightButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  insightButtonText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13),
  },
  insightCard: {
    borderColor: '#e4e1fb',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
  },
  insightTag: {
    color: colors.purple,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(12),
    marginBottom: spacing.sm,
  },
  insightText: {
    color: colors.ink,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(14),
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  notifBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    width: 40,
    ...shadows.sm,
  },
  notifDot: {
    backgroundColor: colors.red,
    borderColor: colors.surface,
    borderRadius: 4,
    borderWidth: 2,
    height: 8,
    position: 'absolute',
    right: 7,
    top: 7,
    width: 8,
  },
  removeAd: {
    alignSelf: 'center',
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(11.5),
    marginTop: 8,
  },
  removeAdLink: { color: colors.primary, fontFamily: fonts.interExtraBold },
  scroll: { paddingBottom: 110 },
  section: { marginTop: spacing.xxl, paddingHorizontal: spacing.xl },
  transactionCard: { overflow: 'hidden' },
  txnAmt: { fontFamily: fonts.interExtraBold, fontSize: fontSize(14) },
  txnBorder: { borderTopColor: colors.line, borderTopWidth: 1 },
  txnLabel: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  txnMid: { flex: 1, gap: 2 },
  txnNeg: { color: colors.ink },
  txnPos: { color: colors.green },
  txnRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: scale(13),
  },
  txnSub: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
  },
});
