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

import { MOCK_GOALS } from '@/constants/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Goals'>;

export const GoalsScreen = ({ navigation }: Props) => (
  <SafeAreaView edges={['top']} style={styles.container}>
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons color={colors.ink} name="arrow-back" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>Goals</Text>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ New Goal</Text>
      </TouchableOpacity>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.section}>
        <SectionHeader title="Savings Goals" />
        <Card>
          {MOCK_GOALS.map((goal) => {
            const progress = goal.saved / goal.target;
            return (
              <View key={goal.id} style={styles.goalItem}>
                <View style={styles.giTop}>
                  <View style={styles.giIco}>
                    <Text style={styles.giEmoji}>{goal.emoji}</Text>
                  </View>
                  <View style={styles.giInfo}>
                    <Text style={styles.giLabel}>{goal.label}</Text>
                    <Text style={styles.giDeadline}>Target: {goal.deadline}</Text>
                  </View>
                </View>
                <View style={styles.giNums}>
                  <Text style={styles.giSaved}>{formatCurrency(goal.saved)} saved</Text>
                  <Text style={styles.giTarget}>of {formatCurrency(goal.target)}</Text>
                </View>
                <ProgressBar progress={progress} variant={progress >= 0.9 ? 'warn' : 'default'} />
                <Text style={styles.giPct}>{Math.round(progress * 100)}% complete</Text>
              </View>
            );
          })}
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
  container: { backgroundColor: colors.bg, flex: 1 },
  giDeadline: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
  },
  giEmoji: { fontSize: 19 },
  giIco: {
    alignItems: 'center',
    backgroundColor: colors.purpleLight,
    borderRadius: 13,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  giInfo: { flex: 1 },
  giLabel: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  giNums: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  giPct: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
    marginTop: spacing.sm,
  },
  giSaved: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13),
  },
  giTarget: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
  },
  giTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  goalItem: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    padding: spacing.lg,
  },
  scroll: { paddingBottom: 40 },
  section: { paddingHorizontal: spacing.xl },
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
