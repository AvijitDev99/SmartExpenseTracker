import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import type { RootStackParamList } from '@/navigation/types';
import { Button } from '@/components/Button';
import { TypeToggle } from '@/components/TypeToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

const CATEGORIES = [
  { emoji: '🛒', label: 'Groceries', bg: '#E1F2E8' },
  { emoji: '🍕', label: 'Food', bg: '#FBE7E7' },
  { emoji: '🚗', label: 'Transport', bg: '#E7ECFC' },
  { emoji: '🎬', label: 'Fun', bg: '#EFE9FD' },
  { emoji: '💊', label: 'Health', bg: '#FCEFD8' },
  { emoji: '💡', label: 'Utilities', bg: '#FCEFD8' },
];

const INCOME_SOURCES = [
  { emoji: '💼', label: 'Salary', bg: colors.primaryLight },
  { emoji: '💸', label: 'Freelance', bg: colors.blueLight },
  { emoji: '🎁', label: 'Other', bg: colors.purpleLight },
];

export const AddExpenseScreen = ({ navigation, route }: Props) => {
  const isIncome = route.params?.type === 'income';
  const [amount, setAmount] = useState('');
  const [selectedCat, setSelectedCat] = useState(0);
  const [note, setNote] = useState('');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isIncome ? 'Add Income' : 'Add Expense'}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Type toggle */}
        <TypeToggle
          options={isIncome ? ['Income'] : ['Expense']}
          selected={0}
          onSelect={() => undefined}
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* Amount input */}
          <View style={styles.amtWrap}>
            <Text style={styles.rupeeSign}>₹</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor={colors.line}
              style={styles.amtInput}
              value={amount}
            />
          </View>

          {/* Category/source picker */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{isIncome ? 'INCOME SOURCE' : 'CATEGORY'}</Text>
            <View style={styles.catGrid}>
              {(isIncome ? INCOME_SOURCES : CATEGORIES).map((cat, i) => (
                <TouchableOpacity
                  key={cat.label}
                  onPress={() => setSelectedCat(i)}
                  style={[
                    styles.catTile,
                    i === selectedCat ? styles.catTileSelected : null,
                  ]}
                >
                  <View style={[styles.catTileIco, { backgroundColor: cat.bg }]}>
                    <Text style={styles.catTileEmoji}>{cat.emoji}</Text>
                  </View>
                  <Text style={styles.catTileLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date & Payment row */}
          <View style={styles.selectRow}>
            <Text style={styles.selectLabel}>Date</Text>
            <View style={styles.selectValue}>
              <Text style={styles.selectValueText}>Today, Dec 15</Text>
              <Text style={styles.chev}>›</Text>
            </View>
          </View>
          <View style={styles.selectRow}>
            <Text style={styles.selectLabel}>Payment</Text>
            <View style={styles.selectValue}>
              <Text style={styles.selectValueText}>UPI · HDFC Bank</Text>
              <Text style={styles.chev}>›</Text>
            </View>
          </View>

          {/* Note */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>NOTE</Text>
            <TextInput
              multiline
              numberOfLines={3}
              onChangeText={setNote}
              placeholder="Add a note…"
              placeholderTextColor={colors.faint}
              style={styles.noteInput}
              value={note}
            />
          </View>
        </ScrollView>

        {/* Save button */}
        <View style={styles.footer}>
          <Button
            label={isIncome ? 'Save Income' : 'Save Expense'}
            onPress={() => navigation.goBack()}
            disabled={!amount}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  amtInput: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(44),
    textAlign: 'center',
    width: 220,
  },
  amtWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: scale(26),
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  catTile: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1.5,
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
    width: '30%',
  },
  catTileEmoji: { fontSize: 18 },
  catTileIco: {
    alignItems: 'center',
    borderRadius: 11,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  catTileLabel: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
    textAlign: 'center',
  },
  catTileSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chev: {
    color: colors.faint,
    fontFamily: fonts.interBold,
    fontSize: fontSize(20),
  },
  closeBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderRadius: radius.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  closeText: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(16),
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  fieldGroup: { gap: spacing.sm, marginBottom: spacing.xl },
  fieldLabel: {
    color: colors.muted,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(12),
    letterSpacing: 0.5,
  },
  flex: { flex: 1 },
  footer: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(17),
  },
  noteInput: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1.5,
    color: colors.ink,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(14),
    minHeight: 70,
    padding: spacing.lg,
    textAlignVertical: 'top',
  },
  rupeeSign: {
    color: colors.faint,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(30),
  },
  scroll: {
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  selectLabel: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
  },
  selectRow: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(15),
  },
  selectValue: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  selectValueText: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
});
