import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppFonts } from "@/assets/fonts";
import { AuthTopHeader } from "@/components/auth-top-header";
import { GradientButton } from "@/components/gradient-button";
import { BrandColors } from "@/constants/theme";
import { ROUTES, type RootStackParamList } from "@/navigation/route-types";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import { finalWishFeedback } from "@/styles/finalwish-groups";
import { fontSize, radius, spacing } from "@/utils/scale";
import { observabilityEvents } from "@services/observability/events";
import { useScreenTelemetry } from "@services/observability/performance/useScreenTelemetry";

import { AuthInputField } from "../components/AuthInputField";
import { useLoginViewModel } from "../hooks/useLoginViewModel";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { errorMessage, isPending, submit } = useLoginViewModel();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  useScreenTelemetry("SignIn", observabilityEvents.screenSignInViewed);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace(ROUTES.home);
    }
  }, [isAuthenticated, navigation]);

  const validate = (): boolean => {
    const normalizedEmail = email.trim();
    const nextEmailError = emailPattern.test(normalizedEmail)
      ? undefined
      : "Please enter a valid email address.";
    const nextPasswordError = password.trim()
      ? undefined
      : "Password is required.";

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);

    return !nextEmailError && !nextPasswordError;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    void submit({
      email: email.trim().toLowerCase(),
      password,
    });
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthTopHeader title="Test" />

          <View style={styles.bodyContent}>
            <View style={styles.formCard}>
              <View style={styles.copy}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subtitle}>
                  Access your account with your email and password.
                </Text>
              </View>

              <AuthInputField
                autoCapitalize="none"
                errorMessage={emailError}
                keyboardType="email-address"
                label="Email"
                onChangeText={(value) => {
                  setEmail(value);
                  if (emailError) {
                    setEmailError(undefined);
                  }
                }}
                placeholder="john@example.com"
                textContentType="emailAddress"
                value={email}
              />

              <AuthInputField
                autoCapitalize="none"
                errorMessage={passwordError}
                label="Password"
                onChangeText={(value) => {
                  setPassword(value);
                  if (passwordError) {
                    setPasswordError(undefined);
                  }
                }}
                onPressEyeToggle={() => setShowPassword((current) => !current)}
                placeholder="Password"
                secureTextEntry={!showPassword}
                showEyeToggle
                textContentType="password"
                value={password}
              />

              {errorMessage ? (
                <Text
                  style={finalWishFeedback.errorText}
                >{`* ${errorMessage}`}</Text>
              ) : null}

              <GradientButton
                arrowColor={BrandColors.finalWish.textPrimary}
                disabled={isPending}
                label={isPending ? "Signing In..." : "Sign In"}
                labelColor={BrandColors.finalWish.textPrimary}
                loading={isPending}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContent: {
    marginTop: -spacing(16),
    paddingBottom: spacing(24),
    paddingHorizontal: spacing(16),
    zIndex: 8,
  },
  container: {
    backgroundColor: BrandColors.finalWish.bgPrimary,
    flex: 1,
  },
  copy: {
    gap: spacing(8),
  },
  formCard: {
    backgroundColor: BrandColors.finalWish.cardBackground,
    borderRadius: radius(20),
    gap: spacing(16),
    padding: spacing(16),
    shadowColor: BrandColors.finalWish.cardShadow,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.95,
    shadowRadius: spacing(24),
    width: "100%",
    zIndex: 9,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    minHeight: "100%",
  },
  subtitle: {
    color: BrandColors.finalWish.textSecondary,
    fontFamily: AppFonts.interRegular,
    fontSize: fontSize(14),
    lineHeight: spacing(20),
  },
  title: {
    color: BrandColors.finalWish.textPrimary,
    fontFamily: AppFonts.interSemiBold,
    fontSize: fontSize(24),
    lineHeight: spacing(30),
  },
});
