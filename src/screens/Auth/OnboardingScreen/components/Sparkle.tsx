import { Animated, Image } from "react-native";
import { useTwinkle } from "../useOnboardingAnimations";
import { icons } from "@assets/icons";

type Props = {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  style?: any;
};

export const Sparkle = ({
  size = 12,
  color = "#2F8F5B",
  delay = 0,
  duration = 1400,
  style,
}: Props) => {
  const twinkle = useTwinkle(duration, delay);

  return (
    <Animated.View style={[{ position: "absolute" }, style, twinkle]}>
      <Image
        source={icons.sparkle}
        style={{ width: size, height: size, tintColor: color }}
      />
    </Animated.View>
  );
};
