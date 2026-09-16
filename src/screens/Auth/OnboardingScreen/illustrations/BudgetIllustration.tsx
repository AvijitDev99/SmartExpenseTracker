import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { fonts } from "@assets/fonts";
import { fontSize, scale } from "@/utils/scale";
import { Sparkle } from "../components/Sparkle";
import { colors } from "@/styles/colors";
import { icons } from "@assets/icons";
import { useEntrance, useFloat } from "../useOnboardingAnimations";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const SIZE = 180;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const USED_FRACTION = 0.75; // 75% of budget remaining, drawn as the colored arc

export const BudgetIllustration = ({ trigger }: { trigger: number }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const centerFade = useRef(new Animated.Value(0)).current;
  const bellEntrance = useEntrance(trigger, 100);
  const bellFloat = useFloat(4, 1800);
  const chartEntrance = useEntrance(trigger, 180);
  const chartFloat = useFloat(4, 2000, 150);
  const pieEntrance = useEntrance(trigger, 260);
  const cardEntrance = useEntrance(trigger, 520);

  useEffect(() => {
    progress.setValue(0);
    centerFade.setValue(0);
    Animated.sequence([
      Animated.timing(progress, {
        toValue: USED_FRACTION,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(centerFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [trigger]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.stage}>
      <Sparkle
        style={{ top: scale(150), left: scale(12) }}
        color={colors.onboarding.goldDrop}
        delay={0}
        size={scale(15)}
      />
      <Sparkle
        style={{ bottom: scale(110), right: scale(20) }}
        color={colors.onboarding.goldDrop}
        delay={500}
        size={scale(12)}
      />
      <Sparkle
        style={{ top: scale(50), right: scale(40), size: scale(14) }}
        color={colors.onboarding.goldDrop}
        delay={800}
        size={scale(8)}
      />

      <Image
        source={icons.border1}
        style={{
          width: scale(265),
          height: scale(265),
          resizeMode: "contain",
          position: "absolute",
          top: scale(5),
          opacity: 0.5,
        }}
      />

      <Animated.View
        style={[
          styles.iconBubble,
          styles.bellBubble,
          {
            opacity: bellEntrance.opacity,
            transform: [...bellEntrance.transform, { translateY: bellFloat }],
          },
        ]}
      >
        <Image
          source={icons.notification}
          style={{ width: scale(22), height: scale(22), resizeMode: "contain" }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.iconBubble,
          styles.chartBubble,
          {
            opacity: chartEntrance.opacity,
            transform: [...chartEntrance.transform, { translateY: chartFloat }],
          },
        ]}
      >
        <Image
          source={icons.networkGradient}
          style={{ width: scale(20), height: scale(20), resizeMode: "contain" }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.iconBubble,
          styles.pieBubble,
          { opacity: pieEntrance.opacity, transform: pieEntrance.transform },
        ]}
      >
        <Image
          source={icons.cartGradient}
          style={{ width: scale(22), height: scale(22), resizeMode: "contain" }}
        />
      </Animated.View>

      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#F0E4D4"
            strokeWidth={STROKE}
            fill="none"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={colors.onboarding.goldDrop}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            originX={SIZE / 2}
            originY={SIZE / 2}
          />
        </Svg>
        <Animated.View style={[styles.ringCenter, { opacity: centerFade }]}>
          <Text style={styles.ringLabel}>Monthly Budget</Text>
          <Text style={styles.ringAmount}>₹22,580</Text>
          <Text style={styles.ringSub}>remaining</Text>
        </Animated.View>

        <Animated.View style={[styles.wallet, { opacity: centerFade }]}>
          <Image
            source={icons.wallet}
            style={{
              width: scale(18),
              height: scale(18),
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontFamily: fonts.interSemiBold,
              fontSize: fontSize(13),
              color: colors.onboarding.goldDrop,
            }}
          >
            of ₹30,000
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.trackCard,
          { opacity: cardEntrance.opacity, transform: cardEntrance.transform },
        ]}
      >
        <Image
          source={icons.saftey}
          style={{ width: scale(28), height: scale(28), resizeMode: "contain" }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.trackTitle}>You're on track!</Text>
          <Text style={styles.trackSub}>
            Keep it up, you're spending smart.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bellBubble: { left: scale(35), top: scale(45) },
  chartBubble: { right: scale(30), top: scale(30) },
  iconBubble: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 999,
    elevation: 3,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#F6A000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 40,
  },
  pieBubble: { bottom: scale(100), left: scale(30) },
  ringAmount: {
    color: "#000000",
    fontFamily: fonts.interBold,
    fontSize: fontSize(26),
    marginTop: scale(4),
  },
  ringCenter: { alignItems: "center", position: "absolute" },
  ringLabel: {
    color: "#000000",
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
  },
  ringSub: {
    color: "#626D70",
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(12),
    marginTop: scale(6),
  },
  wallet: {
    height: scale(42),
    width: scale(120),
    backgroundColor: "#FFF3E4",
    borderRadius: scale(20),
    position: "absolute",
    bottom: scale(2),
    borderColor: "#FFDAA3",
    borderWidth: scale(1),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    justifyContent: "space-between",
  },
  ringWrap: {
    alignItems: "center",
    height: SIZE,
    justifyContent: "center",
    width: SIZE,
    position: "absolute",
    top: scale(45),
  },
  stage: {
    alignItems: "center",
    height: 335,
    justifyContent: "center",
    width: "100%",
  },
  trackCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    flexDirection: "row",
    gap: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    shadowColor: "#F6A000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    width: "75%",
    position: 'absolute',
    bottom: scale(28),
  },
  trackSub: {
    color: "#7A7C83",
    fontFamily: fonts.interMedium,
    fontSize: fontSize(11),
    marginTop: scale(3)
  },
  trackTitle: {
    color: "#000000",
    fontFamily: fonts.interSemiBold,
    fontSize: fontSize(15),
  },
});
