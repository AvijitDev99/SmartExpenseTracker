import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Scanner'>;

const OPTIONS = [
  { label: 'Upload Screenshot', icon: 'image-outline' as const },
  { label: 'Take Photo', icon: 'camera-outline' as const },
  { label: 'Upload Receipt', icon: 'document-text-outline' as const },
];

const DETECTED_FIELDS = [
  ['Amount', '₹780'],
  ['Merchant', 'Blinkit'],
  ['Date', '14 Aug 2026'],
  ['Payment', 'UPI'],
  ['Suggested Category', '🛒 Groceries'],
];

export const ScannerScreen = ({ navigation }: Props) => {
  const [detected, setDetected] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close}>
          <Ionicons color={colors.ink} name="arrow-back" size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>Scan Payment</Text>
        <View style={styles.space} />
      </View>

      {!detected ? (
        <View style={styles.body}>
          {OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.label}
              onPress={() => setDetected(true)}
              style={styles.option}
            >
              <View style={styles.optionIcon}>
                <Ionicons color={colors.primary} name={option.icon} size={21} />
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.body}>
          <View style={styles.frame}>
            <Ionicons color="rgba(79,227,161,.9)" name="scan-outline" size={106} />
            <View style={styles.scanLine} />
          </View>

          <Text style={styles.status}>Reading payment details…</Text>

          <View style={styles.result}>
            <Text style={styles.resultHead}>✓  Payment Detected</Text>
            {DETECTED_FIELDS.map(([label, value]) => (
              <View key={label} style={styles.row}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.save}>
            <Text style={styles.saveText}>Save Expense</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: { gap: 16, padding: 20 },
  close: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 99,
    height: 40,
    justifyContent: 'center',
    width: 40,
    ...shadows.sm,
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  frame: {
    alignItems: 'center',
    backgroundColor: '#12181c',
    borderRadius: 24,
    height: 340,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  option: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    padding: 18,
    ...shadows.sm,
  },
  optionIcon: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 13,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  optionText: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  result: {
    backgroundColor: colors.primaryLight,
    borderColor: '#cdead9',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 20,
  },
  resultHead: {
    color: colors.primary,
    fontFamily: fonts.interExtraBold,
    marginBottom: 8,
  },
  row: {
    borderTopColor: '#cdead9',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  rowLabel: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
  },
  rowValue: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
  },
  save: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: 16,
  },
  saveText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  scanLine: {
    backgroundColor: '#4fe3a1',
    height: 3,
    left: 28,
    position: 'absolute',
    right: 28,
    top: 164,
  },
  space: { width: 40 },
  status: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(13),
    textAlign: 'center',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(19),
  },
});
