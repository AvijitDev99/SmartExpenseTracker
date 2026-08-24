import { useEffect, useState, useSyncExternalStore } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { BrandColors } from '@/constants/theme';
import { spacing } from '@/utils/scale';
import { globalLoaderService } from '@/services/ui/globalLoader/globalLoaderService';

export const GlobalApiLoader = () => {
  const isVisible = useSyncExternalStore(
    globalLoaderService.subscribe,
    globalLoaderService.getSnapshot,
  );
  const [spinValue] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!isVisible) {
      spinValue.stopAnimation();
      spinValue.setValue(0);
      return undefined;
    }

    spinValue.setValue(0);
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        duration: 900,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [isVisible, spinValue]);

  if (!isVisible) {
    return null;
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.wheelWrap}>
        <Animated.View style={[styles.spinnerRing, { transform: [{ rotate: spin }] }]} />
        <View style={styles.innerCircle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerCircle: {
    backgroundColor: '#E8E2DA',
    borderRadius: spacing(29),
    height: spacing(58),
    position: 'absolute',
    width: spacing(58),
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(32, 29, 43, 0.18)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  spinnerRing: {
    borderBottomColor: BrandColors.finalWish.pinkPrimary300,
    borderColor: BrandColors.finalWish.pinkPrimary300,
    borderLeftColor: 'transparent',
    borderRadius: spacing(46),
    borderTopColor: BrandColors.finalWish.formActiveBorder,
    borderRightColor: BrandColors.finalWish.pinkPrimary400,
    borderWidth: spacing(6),
    height: spacing(92),
    width: spacing(92),
  },
  wheelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
