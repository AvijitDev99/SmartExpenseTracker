import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { fonts } from "@assets/fonts";
import { fontSize, scale } from "@/utils/scale";
import { Sparkle } from "../components/Sparkle";
import { colors } from "@/styles/colors";
import { useEntrance, useFloat, useTwinkle } from "../useOnboardingAnimations";
import { icons } from "@assets/icons";
// import { onboardingPalette } from '../styles/onboardingColors';
// import { Sparkle } from '../components/Sparkle';
// import { FlagIcon, LeafIcon, StarIcon } from '../components/icons';
// import { useEntrance, useFloat, useTwinkle } from '../useOnboardingAnimations';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const BAR_HEIGHTS = [58, 82, 104, 138];
const ARROW_LENGTH = 210;

const Bar = ({
  height,
  delay,
  trigger,
}: {
  height: number;
  delay: number;
  trigger: number;
}) => {
  const grow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    grow.setValue(0);
    Animated.timing(grow, {
      toValue: 1,
      duration: 650,
      delay,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: false,
    }).start();
  }, [trigger]);

  return (
    <Animated.View
      style={[
        styles.bar,
        {
          height: grow.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height],
          }),
          opacity: grow.interpolate({
            inputRange: [0, 0.2, 1],
            outputRange: [0, 1, 1],
          }),
        },
      ]}
    />
  );
};

export const SavingsIllustration = ({ trigger }: { trigger: number }) => {
  const arrowDraw = useRef(new Animated.Value(0)).current;
  const savedEntrance = useEntrance(trigger, 60);
  const badgeEntrance = useEntrance(trigger, 900);
  const flagEntrance = useEntrance(trigger, 1000);
  const flagFloat = useFloat(4, 1800);
  const starTwinkle = useTwinkle(1200, 200);
  const leafSway = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   arrowDraw.setValue(0);
  //   Animated.timing(arrowDraw, {
  //     toValue: 1,
  //     duration: 900,
  //     delay: 500,
  //     easing: Easing.out(Easing.cubic),
  //     useNativeDriver: false,
  //   }).start();

  //   const sway = Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(leafSway, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
  //       Animated.timing(leafSway, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
  //     ])
  //   );
  //   sway.start();
  //   return () => sway.stop();
  // }, [trigger]);

  // const arrowDashoffset = arrowDraw.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [ARROW_LENGTH, 0],
  // });

  const leafRotate = leafSway.interpolate({
    inputRange: [0, 1],
    outputRange: ["-6deg", "6deg"],
  });

  return (
    <View style={styles.stage}>
      <Sparkle
        style={{ top: scale(80), left: scale(20) }}
        color={colors.onboarding.lightViolet}
        delay={0}
        size={scale(12)}
      />
      <Sparkle
        style={{ top: scale(120), right: scale(25) }}
        color={colors.onboarding.lightViolet}
        delay={500}
        size={16}
      />
      <Sparkle
        style={{ top: scale(135), right: scale(75) }}
        color={colors.onboarding.lightViolet}
        delay={0}
        size={scale(13)}
      />
      <Sparkle
        style={{ top: scale(30), right: scale(40), size: scale(14) }}
        color={colors.onboarding.lightViolet}
        delay={800}
        size={8}
      />

      <Animated.View style={[styles.starBubble, starTwinkle]}>
        <Image source={icons.starCircle} style={styles.star} />
      </Animated.View>

      <Animated.View
        style={[
          styles.savedCard,
          {
            opacity: savedEntrance.opacity,
            transform: savedEntrance.transform,
          },
        ]}
      >
        <Text style={styles.savedLabel}>This Month</Text>
        <Text style={styles.savedAmount}>₹12,450</Text>
        <Text style={styles.savedSub}>Saved</Text>
      </Animated.View>

      <View style={styles.chartArea}>
        <Image source={icons.lineTrack} style={styles.lineChart} />

        <Animated.View
          style={[
            styles.goalBadge,
            {
              opacity: flagEntrance.opacity,
              transform: [...flagEntrance.transform, { translateY: flagFloat }],
            },
          ]}
        >
          <Image source={icons.targetPin} style={styles.target} />
          <Text style={styles.goalText}>Goal</Text>
          <Image source={icons.polygon} style={styles.polygon} />
        </Animated.View>
      </View>

      <Animated.View
        style={[styles.leaf, { transform: [{ rotate: leafRotate }] }]}
      >
        <Image source={icons.leaf} style={styles.leafIcon} />
      </Animated.View>

      <Animated.View
        style={[
          styles.percentBadge,
          {
            opacity: badgeEntrance.opacity,
            transform: badgeEntrance.transform,
          },
        ]}
      >
        <Text style={styles.percentText}>+24%</Text>
        <Text style={styles.percentSub}>vs last month</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderRadius: 8,
    width: 30,
  },
  bars: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 14,
    height: 140,
    justifyContent: "center",
  },
  chartArea: {
    height: scale(210),
    justifyContent: "flex-end",
    width: "82%",
    position: "absolute",
    bottom: scale(20),
    left: scale(-5),
  },
  lineChart: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  goalBadge: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(8),
    elevation: 3,
    flexDirection: "row",
    gap: scale(6),
    right: scale(28),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    top: scale(-45),
    justifyContent: 'center'
  },
  target: {
    width: scale(25),
    height: scale(25),
  },
  goalText: {
    color: "#000000",
    fontFamily: fonts.archivoSemiBold,
    fontSize: fontSize(12),
  },
  polygon: {
    height: scale(12),
    width: scale(12),
    position: 'absolute',
    bottom: scale(-8)
  },
  leaf: { bottom: scale(80), position: "absolute", right: scale(15) },
  leafIcon: {
    height: scale(100),
    width: scale(100),
  },
  percentBadge: {
    backgroundColor: "#fff",
    borderRadius: scale(10),
    bottom: scale(25),
    elevation: 3,
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    position: "absolute",
    right: scale(-22),
    shadowColor: "#000000d9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    gap: scale(3)
  },
  percentSub: {
    color: "#8B949B",
    fontFamily: fonts.archivoSemiBold,
    fontSize: fontSize(12),
  },
  percentText: {
    color: "#7A54F7",
    fontFamily: fonts.archivoBold,
    fontSize: fontSize(18), },
  savedAmount: {
    color: "#7A54F7",
    fontFamily: fonts.archivoBold,
    fontSize: fontSize(18),
  },
  savedCard: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    left: scale(8),
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: scale(1),
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    top: scale(110),
    width: scale(110),
  },
  savedLabel: {
    color: "#8B949B",
    fontFamily: fonts.archivoMedium,
    fontSize: fontSize(8),
  },
  savedSub: {
    color: "#8B949B",
    fontFamily: fonts.archivoMedium,
    fontSize: fontSize(8),
  },
  stage: {
    alignItems: "center",
    height: 335,
    justifyContent: "center",
    width: "100%",
  },
  starBubble: {
    left: scale(25),
    position: "absolute",
    top: scale(25),
  },
  star: {
    height: scale(40),
    width: scale(40),
  },
});
