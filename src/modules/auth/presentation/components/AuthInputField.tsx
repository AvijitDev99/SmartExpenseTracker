import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppFonts } from '@/assets/fonts';
import { BrandColors } from '@/constants/theme';
import { finalWishFeedback } from '@/styles/finalwish-groups';
import { fontSize, radius, spacing } from '@/utils/scale';

interface AuthInputFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  errorMessage?: string | undefined;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
  textContentType?:
    | 'emailAddress'
    | 'name'
    | 'none'
    | 'password'
    | 'username'
    | 'givenName'
    | 'familyName';
  active?: boolean;
  showEyeToggle?: boolean;
  onPressEyeToggle?: (() => void) | undefined;
}

export const AuthInputField = ({
  active = false,
  autoCapitalize = 'none',
  errorMessage,
  keyboardType = 'default',
  label,
  onChangeText,
  onPressEyeToggle,
  placeholder,
  secureTextEntry = false,
  showEyeToggle = false,
  textContentType = 'none',
  value,
}: AuthInputFieldProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <View
      style={[
        styles.inputWrap,
        active ? styles.inputWrapActive : undefined,
        errorMessage ? styles.inputWrapError : undefined,
      ]}
    >
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={BrandColors.finalWish.formPlaceholder}
        secureTextEntry={secureTextEntry}
        selectionColor={BrandColors.finalWish.formActiveBorder}
        style={styles.input}
        textContentType={textContentType}
        value={value}
      />
      {showEyeToggle ? (
        <Pressable hitSlop={8} onPress={onPressEyeToggle} style={styles.eyeButton}>
          <Text style={styles.eyeLabel}>{secureTextEntry ? 'Show' : 'Hide'}</Text>
        </Pressable>
      ) : null}
    </View>
    {errorMessage ? <Text style={finalWishFeedback.errorText}>{`* ${errorMessage}`}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  eyeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: spacing(34),
  },
  eyeLabel: {
    color: BrandColors.finalWish.formPlaceholder,
    fontFamily: AppFonts.interMedium,
    fontSize: fontSize(11),
    lineHeight: spacing(14),
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  input: {
    color: BrandColors.finalWish.formTextActive,
    flex: 1,
    fontFamily: AppFonts.interRegular,
    fontSize: fontSize(14),
    lineHeight: spacing(17),
    padding: 0,
    textAlign: 'left',
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: BrandColors.finalWish.cardBackground,
    borderColor: BrandColors.finalWish.formBorder,
    borderRadius: radius(16),
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing(10),
    minHeight: spacing(60),
    paddingHorizontal: spacing(17),
    paddingVertical: spacing(15),
  },
  inputWrapActive: {
    borderColor: BrandColors.finalWish.formActiveBorder,
  },
  inputWrapError: {
    borderColor: BrandColors.finalWish.error,
  },
  label: {
    color: '#222222',
    fontFamily: AppFonts.interRegular,
    fontSize: fontSize(13),
    letterSpacing: 0.5,
    lineHeight: spacing(16),
  },
  wrapper: {
    gap: spacing(8),
    width: '100%',
  },
});
