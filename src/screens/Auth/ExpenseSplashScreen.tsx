import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import { ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseSplash'>;

export const ExpenseSplashScreen = ({ navigation }: Props) => {
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(150),
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 6 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(titleAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(progressAnim, { toValue: 1, duration: 1600, useNativeDriver: false }),
      ]),
    ]).start();
    Animated.loop(Animated.timing(ringAnim, { toValue: 1, duration: 2600, useNativeDriver: true })).start();

    const timer = setTimeout(() => {
      navigation.replace(ROUTES.expenseOnboarding);
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigation, scaleAnim, opacityAnim, titleAnim, titleOpacity, progressAnim, ringAnim]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.inner}>
        {[0, 0.7, 1.4].map((delay, index) => (
          <Animated.View
            key={delay}
            style={[styles.ring, {
              opacity: ringAnim.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0.55, 0] }),
              transform: [{ scale: ringAnim.interpolate({ inputRange: [0, 1], outputRange: [0.28 + index * 0.02, 3.55] }) }],
            }]}
          />
        ))}
        <Animated.View
          style={[styles.mark, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.markEmoji}>₹</Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            { opacity: titleOpacity, transform: [{ translateY: titleAnim }] },
          ]}
        >
          Smart Expense
        </Animated.Text>
        <Animated.Text
          style={[
            styles.sub,
            { opacity: titleOpacity, transform: [{ translateY: titleAnim }] },
          ]}
        >
          Track smarter, spend better
        </Animated.Text>

        <View style={styles.progressWrap}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mark: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: 26,
    borderWidth: 1,
    height: 88,
    justifyContent: 'center',
    marginBottom: scale(22),
    width: 88,
    ...shadows.lg,
  },
  markEmoji: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(40),
  },
  progressFill: {
    backgroundColor: '#fff',
    borderRadius: 99,
    height: '100%',
  },
  progressWrap: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 99,
    bottom: 56,
    height: 3,
    overflow: 'hidden',
    position: 'absolute',
    width: 120,
  },
  ring: { borderColor: 'rgba(255,255,255,0.28)', borderRadius: 99, borderWidth: 1.5, height: 90, position: 'absolute', width: 90 },
  sub: {
    color: 'rgba(255,255,255,0.72)',
    fontFamily: fonts.interRegular,
    fontSize: fontSize(14),
    marginTop: scale(8),
  },
  title: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(28),
    letterSpacing: -0.5,
  },
});
