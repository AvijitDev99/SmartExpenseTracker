import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { radius } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';
import { ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseSetup'>;

const LANGUAGES = ['English', 'हिंदी', 'বাংলা'];

const Field = ({
  label,
  placeholder,
  keyboardType,
}: {
  label: string;
  placeholder: string;
  keyboardType?: 'numeric';
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={colors.faint}
      style={styles.input}
    />
  </View>
);

export const SetupScreen = ({ navigation }: Props) => {
  const [language, setLanguage] = useState('English');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{`Let's personalize\nyour finances`}</Text>

        <View style={styles.form}>
          <Field label="Name" placeholder="Your name" />
          <Field keyboardType="numeric" label="Monthly income" placeholder="₹ 60,000" />

          <View>
            <Text style={styles.label}>CURRENCY</Text>
            <View style={styles.currency}>
              <Text style={styles.currencyText}>₹ INR</Text>
            </View>
          </View>

          <Field keyboardType="numeric" label="Starting monthly budget" placeholder="₹ 40,000" />

          <View>
            <Text style={styles.label}>PREFERRED LANGUAGE</Text>
            <View style={styles.chips}>
              {LANGUAGES.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setLanguage(item)}
                  style={[styles.chip, item === language && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, item === language && styles.chipTextSelected]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.replace(ROUTES.expenseMain)}
            style={styles.continue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace(ROUTES.expenseMain)}>
            <Text style={styles.skip}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actions: { gap: 16, paddingTop: 32 },
  chip: {
    borderColor: colors.line,
    borderRadius: 999,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: {
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(13),
  },
  chipTextSelected: { color: '#fff' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  container: { backgroundColor: colors.bg, flex: 1 },
  content: { flexGrow: 1, padding: 22 },
  continue: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 16,
    ...shadows.md,
  },
  continueText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  currency: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  currencyText: {
    color: '#fff',
    fontFamily: fonts.interBold,
    fontSize: fontSize(13),
  },
  form: { gap: 18, marginTop: 28 },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1.5,
    color: colors.ink,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(15),
    marginTop: 7,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(12),
    letterSpacing: 0.4,
  },
  skip: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
    paddingVertical: 8,
    textAlign: 'center',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(25),
    letterSpacing: -0.5,
    marginTop: 12,
  },
});
