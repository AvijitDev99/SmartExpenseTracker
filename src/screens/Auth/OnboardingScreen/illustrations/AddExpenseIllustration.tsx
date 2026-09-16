import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fonts } from "@assets/fonts";
import { fontSize, scale } from "@/utils/scale";
import { useEntrance } from "../useOnboardingAnimations";
import { icons } from "@assets/icons";
import { Sparkle } from "../components/Sparkle";
import { colors } from "@/styles/colors";

const ROWS = [
  { icon: icons.ruppes, iconSize: 22, label: "Amount", value: "450" },
  { icon: icons.burger, iconSize: 25, label: "Category", value: "Food" },
  {
    icon: icons.card,
    iconSize: 28,
    label: "Payment",
    value: "UPI **** 1234",
  },
];

const Row = ({
  icon,
  label,
  value,
  delay,
  trigger,
  iconSize,
}: {
  icon: ImageSourcePropType;
  label: string;
  value: string;
  delay: number;
  trigger: number;
  iconSize: number;
}) => {
  const entrance = useEntrance(trigger, delay);
  return (
    <Animated.View
      style={[
        styles.row,
        { opacity: entrance.opacity, transform: entrance.transform },
      ]}
    >
      <Image
        source={icon}
        style={{
          height: iconSize,
          width: iconSize,
        }}
      />
      <View>
        <Text style={styles.rowValue}>{value}</Text>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
    </Animated.View>
  );
};

export const AddExpenseIllustration = ({ trigger }: { trigger: number }) => {
  const checkScale = useRef(new Animated.Value(0)).current;
  const successEntrance = useEntrance(trigger, 900);
  const clockPulse = useEntrance(trigger, 300);

  useEffect(() => {
    checkScale.setValue(0);
    Animated.sequence([
      Animated.delay(650),
      Animated.spring(checkScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 90,
      }),
    ]).start();
  }, [trigger]);

  return (
    <View style={styles.stage}>
      <Sparkle
        style={{ top: scale(80), left: scale(20) }}
        color={colors.onboarding.geyser}
        delay={0}
        size={scale(14)}
      />
      <Sparkle
        style={{ top: scale(120), right: scale(25) }}
        color={colors.onboarding.geyser}
        delay={500}
        size={16}
      />
      <Sparkle
        style={{ top: scale(30), right: scale(40), size: scale(14) }}
        color={colors.onboarding.geyser}
        delay={800}
        size={10}
      />

      <Image source={icons.sendTrack} style={styles.sendTrack} />

      <Animated.View style={[styles.clock, clockPulse]}>
        <Image source={icons.timer} style={styles.timer} />
      </Animated.View>

      <View style={styles.rows}>
        {ROWS.map((row, i) => (
          <Row
            key={row.label}
            icon={row.icon}
            label={row.label}
            value={row.value}
            iconSize={row.iconSize}
            delay={i * 160}
            trigger={trigger}
          />
        ))}
      </View>

      <Animated.View
        style={[styles.checkWrap, { transform: [{ scale: checkScale }] }]}
      >
        <Image source={icons.checkSuccess} style={styles.success} />
      </Animated.View>

      <Animated.View
        style={[
          styles.successChip,
          {
            opacity: successEntrance.opacity,
            transform: successEntrance.transform,
          },
        ]}
      >
        <Text style={styles.successText}>Saved Successfully!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkWrap: { position: "absolute", bottom: 25 },
  success: {
    height: 115,
    width: 115,
    resizeMode: "contain",
  },
  sendTrack: {
    height: 340,
    width: 340,
    resizeMode: "contain",
    position: "absolute",
    left: 15,
  },
  clock: {
    backgroundColor: "#E0E6FC",
    borderRadius: 999,
    bottom: 65,
    elevation: 3,
    left: 30,
    padding: 5,
    position: "absolute",
    shadowColor: "#346BBF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  timer: {
    height: 20,
    width: 20,
  },
  row: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    width: 175,
  },
  rowLabel: {
    color: "#8C9199",
    fontFamily: fonts.archivoSemiBold,
    fontSize: fontSize(11),
  },
  rowValue: {
    color: "#000000",
    fontFamily: fonts.archivoBold,
    fontSize: fontSize(16),
    marginBottom: 3,
  },
  rows: { alignItems: "center", gap: 9, marginTop: 8 },
  stage: {
    alignItems: "center",
    height: 335,
    justifyContent: "center",
    width: "100%",
  },
  successChip: {
    backgroundColor: "#FBFCFC",
    borderRadius: 999,
    marginTop: 75,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  successText: {
    color: "#008969",
    fontFamily: fonts.archivoBold,
    fontSize: fontSize(12),
  },
});
