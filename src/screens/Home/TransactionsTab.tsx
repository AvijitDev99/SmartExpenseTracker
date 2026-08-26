import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import { ROUTES } from '@/navigation/routes';
import type { AppNavigation } from '@/navigation/types';
import { IconBox } from '@/components/IconBox';

import { MOCK_TRANSACTIONS } from '@/constants/mockData';

interface Props {
  navigation: AppNavigation;
}

export const TransactionsTab = ({ navigation }: Props) => {
  const [query, setQuery] = useState('');

  const filtered = MOCK_TRANSACTIONS.filter((t) =>
    t.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Transactions</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.iconBtnEmoji}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            onChangeText={setQuery}
            placeholder="Search transactions…"
            placeholderTextColor={colors.faint}
            style={styles.searchField}
            value={query}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text>⚡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.dateGroup}>TODAY</Text>
        {filtered.slice(0, 2).map((txn) => (
          <TouchableOpacity
            key={txn.id}
            onPress={() => navigation.navigate(ROUTES.transactionDetail, { id: txn.id })}
            style={styles.txnRow}
          >
            <IconBox emoji={txn.emoji} bg={txn.bg} size={42} borderRadius={12} />
            <View style={styles.txnMid}>
              <Text style={styles.txnLabel}>{txn.label}</Text>
              <Text style={styles.txnSub}>{txn.sub}</Text>
            </View>
            <Text style={[styles.txnAmt, txn.neg ? styles.txnNeg : styles.txnPos]}>
              {txn.amount}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.dateGroup}>YESTERDAY</Text>
        {filtered.slice(2, 4).map((txn) => (
          <TouchableOpacity
            key={txn.id}
            onPress={() => navigation.navigate(ROUTES.transactionDetail, { id: txn.id })}
            style={styles.txnRow}
          >
            <IconBox emoji={txn.emoji} bg={txn.bg} size={42} borderRadius={12} />
            <View style={styles.txnMid}>
              <Text style={styles.txnLabel}>{txn.label}</Text>
              <Text style={styles.txnSub}>{txn.sub}</Text>
            </View>
            <Text style={[styles.txnAmt, txn.neg ? styles.txnNeg : styles.txnPos]}>
              {txn.amount}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.dateGroup}>THIS WEEK</Text>
        {filtered.slice(4).map((txn) => (
          <TouchableOpacity
            key={txn.id}
            onPress={() => navigation.navigate(ROUTES.transactionDetail, { id: txn.id })}
            style={styles.txnRow}
          >
            <IconBox emoji={txn.emoji} bg={txn.bg} size={42} borderRadius={12} />
            <View style={styles.txnMid}>
              <Text style={styles.txnLabel}>{txn.label}</Text>
              <Text style={styles.txnSub}>{txn.sub}</Text>
            </View>
            <Text style={[styles.txnAmt, txn.neg ? styles.txnNeg : styles.txnPos]}>
              {txn.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bg, flex: 1 },
  dateGroup: {
    color: colors.muted,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(12),
    letterSpacing: 0.5,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  filterBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  iconBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
    ...shadows.sm,
  },
  iconBtnEmoji: { fontSize: 18 },
  scroll: { paddingBottom: 110 },
  searchField: {
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(14),
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: scale(12),
  },
  searchRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(22),
    letterSpacing: -0.4,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  txnAmt: {
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(14),
  },
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
    backgroundColor: colors.surface,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
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
