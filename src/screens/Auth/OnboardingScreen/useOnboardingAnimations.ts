import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useEntrance = (trigger: number, delay = 0) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 520,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [trigger]);

  return {
    opacity: anim,
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
      { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
    ],
  };
};

export const usePressScale = (to = 0.96) => {
  const anim = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(anim, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  const onPressOut = () =>
    Animated.spring(anim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 10 }).start();

  return { scale: anim, onPressIn, onPressOut };
};

export const useTwinkle = (duration = 1400, delay = 0) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return {
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.75, 1.15] }) }],
  };
};

export const useSpin = (duration = 6000) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
};

export const useFloat = (distance = 6, duration = 1600, delay = 0) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return anim.interpolate({ inputRange: [0, 1], outputRange: [distance, -distance] });
};