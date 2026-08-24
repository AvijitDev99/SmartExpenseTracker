import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image as ExpoImage } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppFonts } from "@/assets/fonts";
import { splashImages } from "@/assets/images/splash";
import { BrandColors } from "@/constants/theme";
import { ROUTES, type RootStackParamList } from "@/navigation/route-types";
import { fontSize, spacing } from "@/utils/scale";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;

export const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace(ROUTES.signIn);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.artWrap}>
        <ExpoImage
          contentFit="contain"
          source={splashImages.splashFlower}
          style={styles.topFlower}
        />
        <ExpoImage
          contentFit="contain"
          source={splashImages.splashTwoFlower}
          style={styles.bottomFlower}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}></Text>
        <Text style={styles.subtitle}>Securely continue to your account.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  artWrap: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  bottomFlower: {
    alignSelf: "flex-end",
    height: spacing(210),
    width: spacing(210),
  },
  container: {
    alignItems: "center",
    backgroundColor: BrandColors.finalWish.bgPrimary,
    flex: 1,
    padding: spacing(24),
  },
  content: {
    gap: spacing(16),
    paddingBottom: spacing(24),
    width: "100%",
  },
  subtitle: {
    color: BrandColors.finalWish.textSecondary,
    fontFamily: AppFonts.interRegular,
    fontSize: fontSize(15),
    lineHeight: spacing(22),
    textAlign: "center",
  },
  title: {
    color: BrandColors.finalWish.splashTitle,
    fontFamily: AppFonts.breeSerif,
    fontSize: fontSize(42),
    lineHeight: spacing(52),
    textAlign: "center",
  },
  topFlower: {
    alignSelf: "flex-start",
    height: spacing(190),
    width: spacing(190),
  },
});
