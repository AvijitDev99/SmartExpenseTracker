import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { ROUTES } from '@/navigation/routes';
import type { AppNavigation } from '@/navigation/types';

import { MOCK_USER } from '@/constants/mockData';

const SETTINGS_GROUPS = [
  {
    label: 'Account',
    rows: [
      { emoji: '👤', title: 'Edit Profile' },
      { emoji: '☁️', title: 'Backup & Restore' },
      { emoji: '🔄', title: 'Replay Onboarding' },
    ],
  },
  {
    label: 'Preferences',
    rows: [
      { emoji: '₹', title: 'Currency' },
      { emoji: '🌐', title: 'Language' },
      { emoji: '🌙', title: 'Dark Mode', toggle: true },
      { emoji: '🔔', title: 'Notifications', toggle: true },
    ],
  },
  {
    label: 'Security',
    rows: [
      { emoji: '🔒', title: 'App Lock' },
      { emoji: '🖐️', title: 'Fingerprint', toggle: true },
      { emoji: '🔢', title: 'PIN' },
    ],
  },
];

/** Quick links to the screens that live outside the bottom-nav tabs. */
const QUICK_LINKS = [
  {
    emoji: '📊',
    label: 'Budget',
    bg: colors.amberLight,
    route: ROUTES.budgets,
  },
  {
    emoji: '🎯',
    label: 'Goals',
    bg: colors.primaryLight,
    route: ROUTES.goals,
  },
] as const;

export const ProfileTab = ({ navigation }: { navigation: AppNavigation }) => (
  <SafeAreaView edges={['top']} style={styles.container}>
    <View style={styles.topBar}>
      <Text style={styles.title}>Profile</Text>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {/* Avatar */}
      <View style={styles.profileHead}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{MOCK_USER.initials}</Text>
        </View>
        <View>
          <Text style={styles.profileName}>{MOCK_USER.name}</Text>
          <Text style={styles.profileEmail}>{MOCK_USER.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.upgrade}>
        <Text style={styles.upgradeText}>✨ Upgrade to Pro</Text>
      </TouchableOpacity>

      {/* Settings groups */}
      {SETTINGS_GROUPS.map((group) => (
        <View key={group.label} style={styles.settingsGroup}>
          <Text style={styles.groupLabel}>{group.label}</Text>
          <Card>
            {group.rows.map((row, i) => (
              <TouchableOpacity
                key={row.title}
                onPress={() =>
                  row.toggle
                    ? undefined
                    : navigation.navigate(ROUTES.profileSettings, { title: row.title })
                }
                style={[
                  styles.settingsRow,
                  i < group.rows.length - 1 ? styles.settingsRowBorder : null,
                ]}
              >
                <View style={styles.rowIco}>
                  <Text style={styles.rowEmoji}>{row.emoji}</Text>
                </View>
                <Text style={styles.rowTitle}>{row.title}</Text>
                {row.toggle ? (
                  <View style={styles.toggle} />
                ) : (
                  <Text style={styles.chev}>›</Text>
                )}
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}

      {/* Quick links */}
      <View style={styles.settingsGroup}>
        <SectionHeader title="Quick links" />
        <View style={styles.quickGrid}>
          {QUICK_LINKS.map((link) => (
            <TouchableOpacity
              key={link.label}
              onPress={() => navigation.navigate(link.route)}
              style={styles.quickTile}
            >
              <View style={[styles.quickIco, { backgroundColor: link.bg }]}>
                <Text style={styles.quickEmoji}>{link.emoji}</Text>
              </View>
              <Text style={styles.quickLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutBtn}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 29,
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  avatarText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(20),
  },
  chev: {
    color: colors.faint,
    fontFamily: fonts.interBold,
    fontSize: fontSize(20),
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  groupLabel: {
    color: colors.muted,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(12),
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
    textTransform: 'uppercase',
  },
  profileEmail: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(13),
  },
  profileHead: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  profileName: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(17),
  },
  quickEmoji: { fontSize: 16 },
  quickGrid: { flexDirection: 'row', gap: spacing.md },
  quickIco: {
    alignItems: 'center',
    borderRadius: 10,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  quickLabel: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(11.5),
  },
  quickTile: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flex: 1,
    gap: 7,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.lg,
    ...shadows.sm,
  },
  rowEmoji: { fontSize: 16 },
  rowIco: {
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderRadius: 10,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  rowTitle: {
    color: colors.ink,
    flex: 1,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  scroll: { paddingBottom: 110 },
  settingsGroup: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  settingsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  settingsRowBorder: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  signOutBtn: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  signOutText: {
    color: colors.red,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(22),
    letterSpacing: -0.4,
  },
  toggle: {
    backgroundColor: colors.primary,
    borderRadius: 99,
    height: 26,
    width: 44,
  },
  topBar: {
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  upgrade: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
    marginHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  upgradeText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
});
