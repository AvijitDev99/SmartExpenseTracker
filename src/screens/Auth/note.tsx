import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fonts } from '@assets/fonts';
import { colors } from '@/styles/colors';
import { shadows } from '@/styles/shadows';
import { fontSize } from '@/utils/scale';
import { ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';

const width = Dimensions.get('window').width;

const slides = [
  [
    'track',
    'Know where your money goes',
    'Track your daily spending and understand your financial habits.',
    colors.primaryLight,
  ],
  [
    'budget',
    'Stay within your budget',
    'Set monthly limits and get notified before you overspend.',
    colors.amberLight,
  ],
  [
    'goals',
    'Build better saving habits',
    'Set goals and watch your savings grow.',
    colors.purpleLight,
  ],
  [
    'quick',
    'Add an expense in seconds',
    'Amount → Category → Payment → Done. No forms, no friction — just fast, honest tracking.',
    colors.blueLight,
  ],
] as const;

type Kind = (typeof slides)[number][0];
type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseOnboarding'>;

/** Looping illustration shown above each onboarding slide. */
const Art = ({ kind, tint }: { kind: Kind; tint: string }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: kind === 'budget' ? 2400 : 1800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [kind, progress]);

  const grow = (delay: number) => ({
    transform: [
      {
        scaleY: progress.interpolate({
          inputRange: [0, 0.5 + delay, 1],
          outputRange: [0.65, 1, 0.65],
        }),
      },
    ],
  });

  return (
    <LinearGradient
      colors={[tint, colors.bg]}
      end={{ x: 0.85, y: 0.9 }}
      start={{ x: 0.25, y: 0.1 }}
      style={styles.art}
    >
      {kind === 'track' && (
        <>
          <View style={[styles.mini, styles.first]}>
            <Text>🍔  Swiggy{`\n`}       −₹450</Text>
          </View>
          <View style={[styles.mini, styles.second]}>
            <Text>🚗  Uber{`\n`}     −₹280</Text>
          </View>
          <Ionicons color={colors.primary} name="receipt-outline" size={76} />
        </>
      )}

      {kind === 'budget' && (
        <Animated.View
          style={[
            styles.donut,
            {
              transform: [
                { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.02] }) },
              ],
            },
          ]}
        >
          <View style={styles.track} />
          <Animated.View
            style={[
              styles.arc,
              {
                transform: [
                  {
                    rotate: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-112deg', '118deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.donutCentre}>
            <Text style={styles.donutAmount}>₹22,580</Text>
            <Text style={styles.donutSub}>remaining</Text>
          </View>
        </Animated.View>
      )}

      {kind === 'goals' && (
        <View style={styles.chart}>
          {[44, 73, 101, 130].map((height, index) => (
            <Animated.View key={height} style={[styles.bar, { height }, grow(index * 0.08)]}>
              <LinearGradient colors={[colors.purple, '#6E8CF2']} style={styles.fill} />
            </Animated.View>
          ))}
          <View style={styles.goal}>
            <Text style={styles.goalText}>🎯 Goal</Text>
          </View>
        </View>
      )}

      {kind === 'quick' && (
        <View style={styles.quick}>
          <Text style={styles.quickCard}>₹450</Text>
          <Text style={styles.quickCard}>🍔 Food</Text>
          <Text style={styles.quickCard}>📱 UPI</Text>
          <Text style={styles.saved}>✓ Saved</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export const OnboardingScreen = ({ navigation }: Props) => {
  const [index, setIndex] = useState(0);
  const ref = useRef<ScrollView>(null);

  const next = () => {
    if (index === 3) {
      navigation.replace(ROUTES.expenseSetup);
      return;
    }
    setIndex(index + 1);
    ref.current?.scrollTo({ x: (index + 1) * width, animated: true });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <View style={styles.brand}>
          <Ionicons color={colors.primary} name="trending-up-outline" size={24} />
          <Text style={styles.brandText}>Smart Expense</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace(ROUTES.expenseSetup)}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        ref={ref}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.pager}
      >
        {slides.map(([kind, title, body, tint]) => (
          <View key={kind} style={[styles.slide, { width }]}>
            <Art kind={kind} tint={tint} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((slide, i) => (
            <View key={slide[0]} style={[styles.dot, i <= index && styles.active]} />
          ))}
        </View>
        <TouchableOpacity onPress={next} style={styles.button}>
          <Text style={styles.buttonText}>{index === 3 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  active: { backgroundColor: colors.primary },
  arc: {
    borderBottomColor: colors.amber,
    borderLeftColor: colors.surface2,
    borderRadius: 75,
    borderRightColor: colors.amber,
    borderTopColor: colors.amber,
    borderWidth: 12,
    height: 150,
    position: 'absolute',
    width: 150,
  },
  art: {
    alignItems: 'center',
    borderRadius: 32,
    height: 230,
    justifyContent: 'center',
    marginBottom: 70,
    overflow: 'hidden',
    width: 230,
  },
  bar: { borderRadius: 7, overflow: 'hidden', width: 20 },
  body: {
    color: colors.muted,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(14.5),
    lineHeight: 23,
    maxWidth: 290,
    textAlign: 'center',
  },
  brand: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  brandText: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(13.5),
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    ...shadows.md,
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(15),
  },
  chart: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    height: 130,
    justifyContent: 'center',
    position: 'relative',
  },
  donut: { alignItems: 'center', height: 150, justifyContent: 'center', width: 150 },
  donutAmount: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(21),
  },
  donutCentre: {
    alignItems: 'center',
    backgroundColor: '#FFF5E2',
    borderRadius: 58,
    height: 116,
    justifyContent: 'center',
    width: 116,
  },
  donutSub: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(11),
    marginTop: 3,
  },
  dot: { backgroundColor: colors.line, borderRadius: 99, height: 5, width: 34 },
  dots: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  fill: { flex: 1 },
  first: { left: 0, top: 10 },
  footer: { gap: 18, paddingBottom: 30, paddingHorizontal: 24 },
  goal: {
    backgroundColor: colors.surface,
    borderRadius: 99,
    position: 'absolute',
    right: 2,
    top: 3,
    ...shadows.md,
  },
  goalText: {
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(12),
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  head: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  mini: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    position: 'absolute',
    width: 140,
    ...shadows.md,
  },
  pager: { flex: 1 },
  quick: { alignItems: 'center', gap: 12 },
  quickCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    color: colors.ink,
    fontFamily: fonts.interBold,
    fontSize: fontSize(16),
    paddingHorizontal: 22,
    paddingVertical: 12,
    ...shadows.md,
  },
  saved: {
    backgroundColor: colors.primary,
    borderRadius: 99,
    color: '#fff',
    fontFamily: fonts.interExtraBold,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  screen: { backgroundColor: colors.bg, flex: 1 },
  second: { bottom: 18, right: -10 },
  skip: {
    color: colors.muted,
    fontFamily: fonts.interBold,
    fontSize: fontSize(14),
  },
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(23),
    letterSpacing: -0.45,
    marginBottom: 10,
    textAlign: 'center',
  },
  track: {
    borderColor: colors.surface2,
    borderRadius: 75,
    borderWidth: 12,
    height: 150,
    position: 'absolute',
    width: 150,
  },
});
