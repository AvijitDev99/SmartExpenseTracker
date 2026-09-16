import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ScrollView as RNScrollView,
  ImageSourcePropType,
} from "react-native";
import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "@/navigation/routes";
import { fonts } from "@assets/fonts";
import { colors } from "@/styles/colors";
import { fontSize, scale } from "@/utils/scale";
import { icons } from "@assets/icons";
import { ONBOARDING_STEPS } from "./data";
import { useEntrance } from "./useOnboardingAnimations";
import { StepDots } from "./components/StepDots";
import { AnimatedButton } from "./components/AnimatedButton";

const { width } = Dimensions.get("window");
const AnimatedScrollView = Animated.ScrollView;

type Props = NativeStackScreenProps<RootStackParamList, "ExpenseOnboarding">;

const Header = ({ navigation, index }: { navigation: any; index: number }) => {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Image
          source={icons.smart}
          style={{
            width: scale(35),
            height: scale(35),
            tintColor: colors.primary,
            resizeMode: "contain",
            top: scale(-6),
          }}
        />
        <Text style={styles.brandText}>Smart Expense</Text>
      </View>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace(ROUTES.expenseSetup)}
        hitSlop={10}
      >
        <Text
          style={[
            styles.skipText,
            // { color: ONBOARDING_STEPS[index].accent },
          ]}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const FeatureRow = ({
  features,
  accent,
  trigger,
}: {
  features: {
    icon: ImageSourcePropType;
    label: string;
    caption: string;
    size: number;
  }[];
  accent: string;
  trigger: number;
}) => (
  <View style={styles.featureRow}>
    {features.map((f, i) => {
      const entrance = useEntrance(trigger, 260 + i * 90);
      return (
        <Animated.View
          key={f.label}
          style={[
            styles.featureItem,
            { opacity: entrance.opacity, transform: entrance.transform },
          ]}
        >
          <View style={[styles.featureIconWrap, { backgroundColor: accent }]}>
            <Image
              source={f.icon}
              style={{
                width: scale(f.size),
                height: scale(f.size),
                resizeMode: "contain",
              }}
            />
          </View>
          <Text style={styles.featureLabel}>{f.label}</Text>
          <Text style={styles.featureCaption}>{f.caption}</Text>
        </Animated.View>
      );
    })}
  </View>
);

const StepPage = ({
  step,
  index,
  activeIndex,
}: {
  step: (typeof ONBOARDING_STEPS)[number];
  index: number;
  activeIndex: number;
}) => {
  const titleEntrance = useEntrance(activeIndex, 60);
  const subtitleEntrance = useEntrance(activeIndex, 160);
  const Illustration = step.Illustration;

  return (
    <View style={[styles.page, { width }]}>
      <View style={[styles.illustrationCard, { backgroundColor: step.bg }]}>
        <Illustration trigger={activeIndex} />
      </View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleEntrance.opacity,
            transform: titleEntrance.transform,
          },
        ]}
      >
        {step.titleStart}
        {step.titleMiddle && (
          <Text style={styles.titleMiddle}>{" " + step.titleMiddle}</Text>
        )}
        {step.titleEnd && <Text>{" " + step.titleEnd}</Text>}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: subtitleEntrance.opacity,
            transform: subtitleEntrance.transform,
          },
        ]}
      >
        {step.subtitle}
      </Animated.Text>

      <FeatureRow
        features={step.features}
        accent={step.accentBg}
        trigger={activeIndex}
      />
    </View>
  );
};

export const OnboardingScreen = ({ navigation }: Props) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<RNScrollView>(null);

  const goTo = (next: number) => {
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
    setIndex(next);
  };

  const isLast = index === ONBOARDING_STEPS.length - 1;

  return (
    <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
      <View style={styles.flex}>
        <Header navigation={navigation} index={index} />

        <AnimatedScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          onMomentumScrollEnd={(e) => {
            const next = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(next);
          }}
        >
          {ONBOARDING_STEPS.map((step, i) => (
            <StepPage
              key={step.key}
              step={step}
              index={i}
              activeIndex={index}
            />
          ))}
        </AnimatedScrollView>

        <View style={styles.footer}>
          <StepDots
            count={ONBOARDING_STEPS.length}
            activeIndex={index}
            onSelect={goTo}
          />
          <AnimatedButton
            label={isLast ? "Get Started" : "Next"}
            onPress={() =>
              isLast ? navigation.replace(ROUTES.expenseSetup) : goTo(index + 1)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginTop: 6,
  },
  brand: { alignItems: "center", flexDirection: "row", gap: 3 },
  brandText: {
    color: colors.black,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(15),
  },
  skipButton: {
    borderColor: colors.onboarding.greenWhite,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
  },
  skipText: {
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
    color: colors.onboarding.spruce,
  },
  page: { alignItems: "stretch", paddingHorizontal: 0 },
  illustrationCard: {
    backgroundColor: "rgba(255, 216, 216, 0.35)",
    marginHorizontal: 35,
    marginTop: 40,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000000c0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(22),
    marginTop: 25,
    paddingHorizontal: 22,
    textAlign: "center",
  },
  titleMiddle: {
    color: colors.onboarding.darkBlueGreen,
  },
  subtitle: {
    color: colors.onboarding.mistBlue,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(13),
    marginTop: 14,
    textAlign: "center",
  },
  featureRow: { flexDirection: "row", marginTop: 25, paddingHorizontal: 4 },
  featureItem: { alignItems: "center", flex: 1 },
  featureIconWrap: {
    alignItems: "center",
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    marginBottom: 8,
    width: 35,
  },
  featureLabel: {
    color: colors.black,
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(11),
  },
  featureCaption: {
    color: colors.midGrey,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(9),
    marginTop: 3,
    textAlign: "center",
  },
  footer: { gap: 22, paddingBottom: 8, paddingHorizontal: 24, paddingTop: 8 },
});
