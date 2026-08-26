import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { fontSize } from '@/utils/scale';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileSettings'>;

/** Placeholder destination for the Profile settings rows. `title` comes from the tapped row. */
export const ProfileSettingsScreen = ({ navigation, route }: Props) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons color={colors.ink} name="arrow-back" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{route.params.title}</Text>
      <View style={styles.back} />
    </View>

    <View style={styles.card}>
      <Text style={styles.copy}>
        This prototype screen preserves the destination and visual structure for{' '}
        {route.params.title.toLowerCase()}. Interactive data settings can be connected later.
      </Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  back: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 99,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    margin: spacing.xl,
    padding: spacing.xl,
  },
  container: { backgroundColor: colors.bg, flex: 1 },
  copy: {
    color: colors.muted,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(14),
    lineHeight: 21,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(19),
  },
});
