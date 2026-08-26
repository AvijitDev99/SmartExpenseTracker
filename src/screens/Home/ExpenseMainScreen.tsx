import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import { ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';

import { ExpenseHomeTab } from '@/screens/Home/ExpenseHomeTab';
import { TransactionsTab } from '@/screens/Home/TransactionsTab';
import { InsightsTab } from '@/screens/Home/InsightsTab';
import { ProfileTab } from '@/screens/Home/ProfileTab';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseMain'>;
type TabId = 'home' | 'transactions' | 'invest' | 'profile';

const TABS = [
  { id: 'home' as const, label: 'Home', icon: 'home-outline' as const },
  { id: 'transactions' as const, label: 'Transactions', icon: 'list-outline' as const },
  { id: 'invest' as const, label: 'Invest', icon: 'trending-up-outline' as const },
  { id: 'profile' as const, label: 'Profile', icon: 'person-outline' as const },
];

export const ExpenseMainScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isAddSheetOpen, setAddSheetOpen] = useState(false);

  /** Options listed in the bottom sheet opened by the FAB. */
  const addOptions = [
    {
      label: 'Expense',
      icon: 'arrow-up' as const,
      color: colors.red,
      bg: colors.redLight,
      action: () => navigation.navigate(ROUTES.addExpense, { type: 'expense' }),
    },
    {
      label: 'Income',
      icon: 'arrow-down' as const,
      color: colors.primary,
      bg: colors.primaryLight,
      action: () => navigation.navigate(ROUTES.addExpense, { type: 'income' }),
    },
    {
      label: 'Scan Payment Screenshot',
      icon: 'flash-outline' as const,
      color: colors.blue,
      bg: colors.blueLight,
      action: () => navigation.navigate(ROUTES.scanner),
    },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <ExpenseHomeTab navigation={navigation} onOpenTab={setActiveTab} />;
      case 'transactions':
        return <TransactionsTab navigation={navigation} />;
      case 'invest':
        return <InsightsTab />;
      case 'profile':
        return <ProfileTab navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.content}>{renderTab()}</View>

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setAddSheetOpen(true)}
        style={styles.fab}
      >
        <Ionicons color="#fff" name="add" size={27} />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {TABS.map((tab, i) => {
          const isActive = activeTab === tab.id;
          return (
            <View key={tab.id} style={styles.navSlot}>
              {/* Gap under the FAB, between the 2nd and 3rd tab */}
              {i === 2 ? <View style={styles.navSpacer} /> : null}
              <TouchableOpacity onPress={() => setActiveTab(tab.id)} style={styles.navItem}>
                <View style={[styles.navIcoWrap, isActive ? styles.navIcoActive : null]}>
                  <Ionicons
                    color={isActive ? colors.primary : colors.faint}
                    name={tab.icon}
                    size={21}
                  />
                </View>
                <Text style={[styles.navLabel, isActive ? styles.navLabelActive : null]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Add sheet */}
      <Modal
        animationType="slide"
        onRequestClose={() => setAddSheetOpen(false)}
        transparent
        visible={isAddSheetOpen}
      >
        <Pressable onPress={() => setAddSheetOpen(false)} style={styles.sheetOverlay}>
          <Pressable onPress={(event) => event.stopPropagation()} style={styles.sheet}>
            <View style={styles.sheetDrag} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>What would you like to add?</Text>
              <TouchableOpacity onPress={() => setAddSheetOpen(false)} style={styles.sheetClose}>
                <Ionicons color={colors.ink} name="close" size={19} />
              </TouchableOpacity>
            </View>

            {addOptions.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  setAddSheetOpen(false);
                  item.action();
                }}
                style={styles.sheetOption}
              >
                <View style={[styles.sheetOptionIcon, { backgroundColor: item.bg }]}>
                  <Ionicons color={item.color} name={item.icon} size={21} />
                </View>
                <Text style={styles.sheetOptionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-around',
    paddingBottom: scale(8),
    ...shadows.sm,
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  content: { flex: 1 },
  fab: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.bg,
    borderRadius: 29,
    borderWidth: 5,
    bottom: 44,
    height: 58,
    justifyContent: 'center',
    left: '50%',
    marginLeft: -29,
    position: 'absolute',
    width: 58,
    zIndex: 20,
    ...shadows.md,
  },
  navIcoActive: { backgroundColor: colors.primaryLight, transform: [{ translateY: -2 }] },
  navIcoWrap: {
    alignItems: 'center',
    borderRadius: 12,
    height: 26,
    justifyContent: 'center',
    width: 34,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    width: 74,
  },
  navLabel: {
    color: colors.faint,
    fontFamily: fonts.interBold,
    fontSize: fontSize(10),
  },
  navLabelActive: { color: colors.primary },
  navSlot: { alignItems: 'center', flexDirection: 'row' },
  navSpacer: { width: 74 },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    bottom: 0,
    gap: 12,
    left: 0,
    padding: 20,
    paddingBottom: 32,
    position: 'absolute',
    right: 0,
  },
  sheetClose: {
    alignItems: 'center',
    backgroundColor: colors.surface2,
    borderRadius: 99,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  sheetDrag: {
    alignSelf: 'center',
    backgroundColor: colors.line,
    borderRadius: 99,
    height: 5,
    marginBottom: 2,
    width: 40,
  },
  sheetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sheetOption: {
    alignItems: 'center',
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
  },
  sheetOptionIcon: {
    alignItems: 'center',
    borderRadius: 13,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  sheetOptionText: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  sheetOverlay: { backgroundColor: 'rgba(10,20,15,0.44)', flex: 1 },
  sheetTitle: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(17),
  },
});
