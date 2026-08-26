import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { TypeToggle } from '@/components/TypeToggle';

import { MOCK_DONUT, MOCK_INSIGHTS_BARS } from '@/constants/mockData';

const MAX_BAR_H = 100;
const MAX_VAL = Math.max(...MOCK_INSIGHTS_BARS.map((b) => b.height));

export const InsightsTab = () => {
  const [period, setPeriod] = useState(0);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Insights</Text>
      </View>

      <TypeToggle
        options={['Week', 'Month', 'Year']}
        selected={period}
        onSelect={setPeriod}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Spending bar chart */}
        <View style={styles.section}>
          <SectionHeader title="Monthly Spending" />
          <Card style={styles.chartCard}>
            <View style={styles.bars}>
              {MOCK_INSIGHTS_BARS.map((b) => (
                <View key={b.label} style={styles.barCol}>
                  <View
                    style={[
                      styles.bar,
                      { height: (b.height / MAX_VAL) * MAX_BAR_H },
                    ]}
                  />
                  <Text style={styles.barLbl}>{b.label}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Donut / category breakdown */}
        <View style={styles.section}>
          <SectionHeader title="By Category" />
          <Card style={styles.donutCard}>
            {/* Simplified donut placeholder */}
            <View style={styles.donutCircle}>
              <Text style={styles.donutCenter}>₹23,420</Text>
              <Text style={styles.donutSub}>Total spent</Text>
            </View>
            <View style={styles.legend}>
              {MOCK_DONUT.map((d) => (
                <View key={d.label} style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: d.color }]} />
                  <Text style={styles.legendLabel}>{d.label}</Text>
                  <Text style={styles.legendPct}>{d.pct}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Insight chips */}
        <View style={styles.section}>
          <SectionHeader title="Smart Tips" />
          {[
            { emoji: '🍕', text: 'Food spending is 20% above your average. Try meal prepping to save ₹1,200.' },
            { emoji: '🚗', text: 'Transport costs dropped 15% this month. Great job!' },
            { emoji: '💡', text: 'You could save ₹3,500 by switching to annual subscriptions.' },
          ].map((chip) => (
            <View key={chip.emoji} style={styles.insightChip}>
              <Text style={styles.chipEmoji}>{chip.emoji}</Text>
              <Text style={styles.chipText}>{chip.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    maxWidth: 26,
    width: '100%',
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
    justifyContent: 'flex-end',
  },
  barLbl: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(10),
  },
  bars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.md,
    height: MAX_BAR_H + 30,
    padding: spacing.lg,
  },
  chartCard: { marginTop: 0 },
  chipEmoji: { fontSize: 20 },
  chipText: {
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.interBold,
    fontSize: fontSize(13),
    lineHeight: 19,
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  donutCard: { padding: spacing.lg },
  donutCenter: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(18),
  },
  donutCircle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 60,
    height: 120,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: 120,
  },
  donutSub: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(11),
  },
  insightChip: {
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
    ...shadows.sm,
  },
  legend: { gap: spacing.md },
  legendDot: {
    borderRadius: 5,
    height: 9,
    width: 9,
  },
  legendLabel: {
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
  },
  legendPct: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
  },
  legendRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  scroll: { paddingBottom: 110 },
  section: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(22),
    letterSpacing: -0.4,
  },
  topBar: {
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
});
