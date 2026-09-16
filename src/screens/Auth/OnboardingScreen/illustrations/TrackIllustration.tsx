import { Animated, Image, StyleSheet, View } from "react-native";
import { Sparkle } from "../components/Sparkle";
import { colors } from "@/styles/colors";
import { scale } from "@/utils/scale";
import { icons } from "@assets/icons";
import { useEntrance, useFloat } from "../useOnboardingAnimations";
import { FloatingCard } from "../components/FloatingCard";

export const TrackIllustration = ({ trigger }: { trigger: number }) => {
  const chartEntrance = useEntrance(trigger, 260);
  const plusEntrance = useEntrance(trigger, 340);
  const plusFloat = useFloat(4, 1700, 200);

  return (
    <View style={styles.stage}>
      <Sparkle
        style={{ top: scale(150), left: scale(-12) }}
        color={colors.onboarding.jellyfish}
        delay={0}
        size={scale(22)}
      />
      <Sparkle
        style={{ bottom: scale(10), right: scale(40) }}
        color={colors.onboarding.jellyfish}
        delay={500}
        size={12}
      />
      <Sparkle
        style={{ top: scale(30), right: scale(40), size: scale(14) }}
        color={colors.onboarding.jellyfish}
        delay={800}
        size={10}
      />

      <Image
        source={icons.border2}
        style={{ width: scale(220), height: scale(220), resizeMode: "contain" }}
      />

      <FloatingCard
        trigger={trigger}
        icon={icons.burger}
        title="Swiggy"
        subtitle="- ₹450"
        style={styles.foodCard}
        entranceDelay={120}
        floatDelay={0}
        iconBackgroundColor={'#FFECE8'}
      />

      <FloatingCard
        trigger={trigger}
        icon={icons.car}
        title="Uber"
        subtitle="- ₹285"
        style={styles.carCard}
        entranceDelay={120}
        floatDelay={0}
        iconBackgroundColor={'#E2F4FB'}
      />

      <Image
        source={icons.documents}
        style={{
          width: scale(165),
          height: scale(165),
          resizeMode: "contain",
          position: "absolute",
          top: scale(92),
        }}
      />

      <Animated.View
        style={[
          styles.chartBubble,
          {
            opacity: chartEntrance.opacity,
            transform: [...chartEntrance.transform],
          },
        ]}
      >
        <Image
          source={icons.network}
          style={{
            width: scale(22),
            height: scale(22),
            resizeMode: "contain",
          }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.plusBubble,
          {
            opacity: plusEntrance.opacity,
            transform: [...plusEntrance.transform, { translateY: plusFloat }],
          },
        ]}
      >
        <Image
          source={icons.add}
          style={{
            width: scale(18),
            height: scale(18),
            resizeMode: "contain",
          }}
        />
      </Animated.View>

      <View style={styles.overlay}>
        <Image
          source={icons.shape2}
          style={{
            resizeMode: "contain",
            width: scale(280),
            height: scale(42),
            position: "absolute",
            bottom: scale(-5),
            left: scale(10),
          }}
        />
        <Image
          source={icons.shape1}
          style={{
            resizeMode: "contain",
            width: scale(200),
            height: scale(100),
            position: "absolute",
            bottom: scale(-5),
            left: scale(-30),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stage: {
    alignItems: "center",
    height: 335,
    justifyContent: "center",
    width: "100%",
  },
  overlay: {
    overflow: "hidden",
    borderRadius: 20,
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  chartBubble: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 999,
    elevation: 3,
    height: 42,
    justifyContent: "center",
    position: "absolute",
    right: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    top: 65,
    width: 42,
  },
  plusBubble: {
    alignItems: "center",
    backgroundColor: "#E0EFE9",
    borderRadius: 999,
    bottom: 52,
    height: 42,
    justifyContent: "center",
    left: 28,
    position: "absolute",
    width: 42,
    shadowColor: "#5EC7AE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  foodCard: { left: 15, top: 45 },
  carCard: { right: 15, bottom: 45 },
});
