import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { fonts } from "@assets/fonts";
import { icons } from "@assets/icons";
import { colors } from "@/styles/colors";
import { shadows } from "@/styles/shadows";
import { fontSize, scale } from "@/utils/scale";
import { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";
import { images } from "@assets/images";

const STAGE = scale(300);
const HALO = scale(92);
const TILE = scale(75);

const ORBIT_RADIUS = scale(108);
const ORBIT_SLOT = scale(10);
const PROGRESS_MS = 2500;
const SPLASH_MS = 3500;

const MINT = "#8DE6B0";
const MINT_SOFT = "rgba(190, 244, 212, 0.90)";

const features = [
  {
    hint: "Every Expense",
    icon: icons.pieChart,
    label: "Track",
  },
  {
    hint: "Smart Insights",
    icon: icons.diagram,
    label: "Analyze",
  },
  {
    hint: "Save Better",
    icon: icons.target,
    label: "Set Goals",
  },
  {
    hint: "Always",
    icon: icons.security,
    label: "Stay in Control",
  },
] as const;

const haloRings = [0.75, 1.35, 1.85, 2.35, 2.85] as const;

/**
 * Sparkle placement as a fraction of the stage box,
 * plus its twinkle timing.
 */
const sparkles = [
  {
    delay: 0,
    duration: 900,
    size: scale(15),
    x: 0.87,
    y: 0.14,
  },
  {
    delay: 520,
    duration: 1100,
    size: scale(10),
    x: 0.09,
    y: 0.46,
  },
  {
    delay: 1150,
    duration: 800,
    size: scale(7),
    x: 0.24,
    y: 0.06,
  },
  {
    delay: 780,
    duration: 1000,
    size: scale(9),
    x: 0.95,
    y: 0.7,
  },
  {
    delay: 1450,
    duration: 950,
    size: scale(6),
    x: 0.62,
    y: 0.02,
  },
] as const;

const spinTo = (spin: Animated.Value, degrees: number) =>
  spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `${degrees}deg`],
  });

interface OrbitProps {
  dots: number;
  radius: number;
  span: number;
  spin: Animated.Value;
  degrees?: number;
}

const Orbit = ({ dots, radius, span, spin, degrees = 360 }: OrbitProps) => (
  <Animated.View
    pointerEvents="none"
    style={[
      styles.orbit,
      {
        transform: [{ rotate: spinTo(spin, degrees) }],
      },
    ]}
  >
    {Array.from({ length: dots }, (_, index) => {
      /**
       * Progress goes from 0 → 1 along the comet trail.
       */
      const progress = index / (dots - 1);

      const size = scale(2.2) + progress * scale(2.2);

      return (
        <View
          key={index}
          style={[
            styles.orbitSlot,
            {
              transform: [
                {
                  rotate: `${-span * (1 - progress)}deg`,
                },
                {
                  translateY: -radius,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.orbitDot,
              {
                borderRadius: size,
                height: size,
                opacity: 0.02 + progress * 0.68,
                width: size,
              },
            ]}
          />
        </View>
      );
    })}

    {/* Bright orbit head */}
    <View
      style={[
        styles.orbitSlot,
        {
          transform: [{ translateY: -radius }],
        },
      ]}
    >
      <View style={styles.orbitGlow} />
      <View style={styles.orbitHead} />
    </View>
  </Animated.View>
);

/**
 * Four-point star that fades and grows in a loop.
 */
const Sparkle = ({
  delay,
  duration,
  size,
  x,
  y,
}: (typeof sparkles)[number]) => {
  const twinkle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(delay),

      Animated.loop(
        Animated.sequence([
          Animated.timing(twinkle, {
            duration,
            easing: Easing.out(Easing.quad),
            toValue: 1,
            useNativeDriver: true,
          }),

          Animated.timing(twinkle, {
            duration,
            easing: Easing.in(Easing.quad),
            toValue: 0,
            useNativeDriver: true,
          }),

          Animated.delay(420),
        ]),
      ),
    ]);

    anim.start();

    return () => {
      anim.stop();
    };
  }, [delay, duration, twinkle]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.sparkle,
        {
          height: size,

          left: STAGE * x - size / 2,

          opacity: twinkle.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
          }),

          top: STAGE * y - size / 2,

          transform: [
            {
              scale: twinkle.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
            {
              rotate: twinkle.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "75deg"],
              }),
            },
          ],

          width: size,
        },
      ]}
    >
      <Image
        resizeMode="contain"
        source={icons.sparkle}
        style={styles.sparkleImg}
      />
    </Animated.View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "ExpenseSplash">;

export const ExpenseSplashScreen = ({ navigation }: Props) => {
  const pulse = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.62)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleShift = useRef(new Animated.Value(scale(14))).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const bottomOpacity = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const loadingPulse = useRef(new Animated.Value(0)).current;

  const featureAnims = useRef(
    features.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    /**
     * ------------------------------------------------
     * INTRO ANIMATION
     * ------------------------------------------------
     */
    const intro = Animated.sequence([
      Animated.delay(120),

      /**
       * Logo animation
       */
      Animated.parallel([
        Animated.spring(logoScale, {
          friction: 6,
          tension: 78,
          toValue: 1,
          useNativeDriver: true,
        }),

        Animated.timing(logoOpacity, {
          duration: 620,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),

      /**
       * Title + subtitle animation
       */
      Animated.parallel([
        Animated.timing(titleOpacity, {
          duration: 520,
          toValue: 1,
          useNativeDriver: true,
        }),

        Animated.timing(titleShift, {
          duration: 520,
          easing: Easing.out(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),

      /**
       * Features animation
       */
      Animated.stagger(
        150,
        featureAnims.map((value) =>
          Animated.timing(value, {
            duration: 700,
            easing: Easing.out(Easing.cubic),
            toValue: 1,
            useNativeDriver: true,
          }),
        ),
      ),
    ]);

    /**
     * ------------------------------------------------
     * PROGRESS BAR
     * ------------------------------------------------
     */
    const loadingBar = Animated.timing(progress, {
      duration: PROGRESS_MS,
      easing: Easing.linear,
      toValue: 1,
      useNativeDriver: false,
    });

    /**
     * ------------------------------------------------
     * LOOPING ANIMATIONS
     * ------------------------------------------------
     */
    const loops = [
      /**
       * Orbit rotation
       */
      Animated.loop(
        Animated.timing(spin, {
          duration: 2600,
          easing: Easing.linear,
          toValue: 1,
          useNativeDriver: true,
        }),
      ),

      /**
       * Pulse ring
       */
      Animated.loop(
        Animated.timing(pulse, {
          duration: 2800,
          easing: Easing.out(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
      ),

      /**
       * Loading text pulse
       */
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingPulse, {
            duration: 700,
            toValue: 1,
            useNativeDriver: true,
          }),

          Animated.timing(loadingPulse, {
            duration: 700,
            toValue: 0,
            useNativeDriver: true,
          }),
        ]),
      ),
    ];

    intro.start();
    loadingBar.start();
    loops.forEach((loop) => {
      loop.start();
    });

    /**
     * Navigation can be enabled later if required.
     */
    const timer = setTimeout(
      () => navigation.replace(ROUTES.expenseOnboarding),
      SPLASH_MS,
    );

    return () => {
      clearTimeout(timer);

      intro.stop();
      loadingBar.stop();

      loops.forEach((loop) => {
        loop.stop();
      });
    };
  }, [
    bottomOpacity,
    featureAnims,
    loadingPulse,
    logoOpacity,
    logoScale,
    progress,
    navigation,
    pulse,
    spin,
    titleOpacity,
    titleShift,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background gradient */}
      <LinearGradient
        colors={["#0C5340", colors.primaryDark, "#052A20"]}
        locations={[0, 0.58, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Background dot grid */}
      <View pointerEvents="none" style={styles.dotGrid}>
        {Array.from({ length: 40 }, (_, index) => (
          <View key={index} style={styles.gridDot} />
        ))}
      </View>

      <SafeAreaView style={styles.inner}>
        {/* Bottom wave / splash background */}
        <Image
          source={images.splash_background}
          style={styles.splash_background}
        />

        {/* Main logo / orbit stage */}
        <View style={styles.stage}>
          {/* Static halo rings */}
          {haloRings.map((ratio, index) => (
            <View
              key={ratio}
              style={[
                styles.halo,
                {
                  borderRadius: (HALO * ratio) / 2,
                  height: HALO * ratio,
                  opacity: 0.09 - index * 0.014,
                  width: HALO * ratio,
                },
              ]}
            />
          ))}

          {/* Animated pulse ring */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.halo,
              styles.pulseRing,
              {
                opacity: pulse.interpolate({
                  inputRange: [0, 0.15, 1],
                  outputRange: [0, 0.4, 0],
                }),

                transform: [
                  {
                    scale: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 3],
                    }),
                  },
                ],
              },
            ]}
          />

          {/* DENSE ORBIT */}
          <Orbit dots={96} radius={ORBIT_RADIUS} span={150} spin={spin} />

          {/* Sparkles */}
          {sparkles.map((sparkle) => (
            <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
          ))}

          {/* Logo tile */}
          <Animated.View
            style={[
              styles.tile,
              {
                opacity: logoOpacity,

                transform: [
                  {
                    scale: logoScale,
                  },
                ],
              },
            ]}
          >
            <Image
              resizeMode="contain"
              source={icons.logo}
              style={styles.logo}
            />
          </Animated.View>
        </View>

        {/* Main title */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,

              transform: [
                {
                  translateY: titleShift,
                },
              ],
            },
          ]}
        >
          Smart Expense
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text
          style={[
            styles.sub,
            {
              opacity: titleOpacity,

              transform: [
                {
                  translateY: titleShift,
                },
              ],
            },
          ]}
        >
          Take control of your money.
        </Animated.Text>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <Animated.View
              key={feature.label}
              style={[
                styles.feature,
                {
                  opacity: featureAnims[index],
                  transform: [
                    {
                      translateY: featureAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [scale(18), 0],
                      }),
                    },
                    {
                      scale: featureAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.94, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Divider */}
              {index > 0 ? <View style={styles.featureDivider} /> : null}

              {/* Feature icon */}
              <View style={styles.featureChip}>
                <Image
                  resizeMode="contain"
                  source={feature.icon}
                  style={[
                    styles.featureIcon,

                    index === 2 && styles.featureIcon2,
                  ]}
                />
              </View>

              {/* Feature title */}
              <Text numberOfLines={1} style={styles.featureLabel}>
                {feature.label}
              </Text>

              {/* Feature description */}
              <Text numberOfLines={1} style={styles.featureHint}>
                {feature.hint}
              </Text>
            </Animated.View>
          ))}
        </View>
      </SafeAreaView>

      {/* BOTTOM LOADER */}
      <Animated.View
        style={[
          styles.loader,
          {
            opacity: bottomOpacity,
          },
        ]}
      >
        {/* Loading text */}
        <View style={styles.loadingRow}>
          <Animated.Text
            style={[
              styles.loadingText,
              styles.loadingStrong,
              {
                opacity: loadingPulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.62, 1],
                }),
              },
            ]}
          >
            Loading
          </Animated.Text>

          <Text style={styles.loadingText}> your experience...</Text>
        </View>

        {/* Progress track */}
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(141,230,176,0.55)", MINT, "#DFFBE9"]}
              end={{
                x: 1,
                y: 0,
              }}
              start={{
                x: 0,
                y: 0,
              }}
              style={styles.fillGradient}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  splash_background: {
    width: "105%",
    height: 340,
    position: "absolute",
    bottom: 0,
    resizeMode: "cover",
    alignSelf: "center",
  },
  container: {
    backgroundColor: colors.primaryDark,
    flex: 1,
  },
  dotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: scale(120),
    left: scale(24),
    opacity: 0.5,
    position: "absolute",
    top: scale(70),
    width: scale(180),
  },
  feature: {
    alignItems: "center",
    flexGrow: 1,
  },
  featureChip: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: scale(35),
    borderWidth: 1,
    height: scale(35),
    justifyContent: "center",
    marginBottom: scale(9),
    width: scale(35),
  },
  featureDivider: {
    backgroundColor: "rgba(255,255,255,0.13)",
    bottom: scale(4),
    left: 0,
    position: "absolute",
    top: scale(4),
    width: 1,
  },
  featureHint: {
    color: MINT_SOFT,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(10),
    marginTop: scale(4),
  },
  featureIcon: {
    height: scale(20),
    tintColor: "#c9feda",
    width: scale(20),
  },
  featureIcon2: {
    height: scale(25),
    tintColor: "#c9feda",
    width: scale(25),
  },
  featureLabel: {
    color: "#FFFFFF",
    fontFamily: fonts.interBold,
    fontSize: fontSize(11),
  },
  features: {
    flexDirection: "row",
    marginTop: scale(34),
    paddingHorizontal: scale(20),
    width: "100%",
  },
  fill: {
    borderRadius: 99,
    height: "100%",
    overflow: "hidden",
  },
  fillGradient: {
    flex: 1,
  },
  gridDot: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 2,
    height: 2,
    marginBottom: scale(20),
    marginRight: scale(20),
    width: 2,
  },
  halo: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    position: "absolute",
  },
  inner: {
    alignItems: "center",
    flex: 1,
    paddingBottom: scale(120),
    paddingTop: scale(50),
  },
  loader: {
    alignItems: "center",
    bottom: scale(44),
    left: 0,
    position: "absolute",
    right: 0,
  },
  loadingRow: {
    flexDirection: "row",
    marginBottom: scale(14),
  },
  loadingStrong: {
    color: "#DFFBE9",
    fontFamily: fonts.interSemiBold,
  },
  loadingText: {
    color: "rgba(255,255,255,0.62)",
    fontFamily: fonts.interRegular,
    fontSize: fontSize(13),
  },
  logo: {
    height: TILE,
    width: TILE,
  },
  orbit: {
    alignItems: "center",
    height: STAGE,
    justifyContent: "center",
    position: "absolute",
    width: STAGE,
  },
  orbitDot: {
    backgroundColor: "#CFF7E1",
  },
  orbitGlow: {
    backgroundColor: "rgba(141, 230, 176, 0.3)",
    borderRadius: scale(11),
    height: scale(22),
    position: "absolute",
    width: scale(22),
  },
  orbitHead: {
    backgroundColor: "#EAFFF3",
    borderRadius: scale(4),
    height: scale(8),
    shadowColor: MINT,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: scale(7),
    width: scale(8),
  },
  orbitSlot: {
    alignItems: "center",
    height: ORBIT_SLOT,
    justifyContent: "center",
    position: "absolute",
    width: ORBIT_SLOT,
  },
  pulseRing: {
    borderColor: MINT,
    borderRadius: HALO / 2,
    height: HALO,
    width: HALO,
  },
  sparkle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  sparkleImg: {
    height: 12,
    position: "absolute",
    width: 12,
    tintColor: "#88d09f",
  },
  stage: {
    alignItems: "center",
    height: STAGE,
    justifyContent: "center",
    marginBottom: scale(-25),
    width: STAGE,
  },
  sub: {
    color: MINT_SOFT,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(15),
    marginTop: scale(10),
  },
  tile: {
    height: TILE,
    width: TILE,
    ...shadows.lg,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(31),
    letterSpacing: -0.6,
  },
  track: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 99,
    height: scale(5),
    overflow: "hidden",
    width: "66%",
  },
});
