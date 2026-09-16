import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { fonts } from "@assets/fonts";
import { radius } from "@/styles/spacing";
import { shadows } from "@/styles/shadows";
import { fontSize } from "@/utils/scale";
import { usePressScale } from "../useOnboardingAnimations";
import { colors } from "@/styles/colors";
import { icons } from "@assets/icons";

type Props = {
  label: string;
  onPress: () => void;
};

export const AnimatedButton = ({ label, onPress }: Props) => {
  const { scale, onPressIn, onPressOut } = usePressScale(0.97);
  const labelFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    labelFade.setValue(0);
    Animated.timing(labelFade, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [label]);

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: colors.darkSpringGreen, transform: [{ scale }] },
          shadows.md,
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            {
              opacity: labelFade,
              transform: [
                {
                  translateY: labelFade.interpolate({
                    inputRange: [0, 1],
                    outputRange: [6, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {label}
        </Animated.Text>
        <Image
          source={icons.arrow_right}
          style={{
            width: 22,
            height: 22,
            tintColor: colors.white,
            resizeMode: "contain",
            position: "absolute",
            right: 14,
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: radius.md,
    justifyContent: "center",
    overflow: "hidden",
    paddingVertical: 16,
  },
  label: {
    color: "#fff",
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
});
