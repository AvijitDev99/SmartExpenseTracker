import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors } from '@/styles/colors';

type Props = {
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
};

const Dot = ({ active }: { active: boolean }) => {
  const width = useRef(new Animated.Value(active ? 22 : 7)).current;
  const color = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(width, { toValue: active ? 22 : 7, useNativeDriver: false, friction: 7 }),
      Animated.timing(color, { toValue: active ? 1 : 0, duration: 250, useNativeDriver: false }),
    ]).start();
  }, [active]);

  const backgroundColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.greenWhite, colors.onboarding.darkBlueGreen],
  });

  return <Animated.View style={[styles.dot, { width, backgroundColor }]} />;
};

export const StepDots = ({ count, activeIndex, onSelect }: Props) => (
  <View style={styles.row}>
    {Array.from({ length: count }).map((_, i) => (
      <TouchableOpacity key={i} disabled={!onSelect} onPress={() => onSelect?.(i)} hitSlop={8}>
        <Dot active={i === activeIndex} />
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  dot: { borderRadius: 999, height: 7 },
  row: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
});
