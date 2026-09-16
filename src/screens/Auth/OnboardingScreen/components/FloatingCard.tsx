import type { ReactNode } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/colors';
import { radius } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fonts } from '@assets/fonts';
import { fontSize } from '@/utils/scale';
import { useEntrance, useFloat } from '../useOnboardingAnimations';

type Props = {
  icon: ImageSourcePropType;
  title: string;
  subtitle: string;
  positive?: boolean;
  trigger: number;
  entranceDelay?: number;
  floatDelay?: number;
  style?: any;
  iconBackgroundColor?: string;
};

export const FloatingCard = ({
  icon,
  title,
  subtitle,
  positive = false,
  trigger,
  entranceDelay = 0,
  floatDelay = 0,
  style,
  iconBackgroundColor = '#fff',
}: Props) => {
  const entrance = useEntrance(trigger, entranceDelay);
  const floatY = useFloat(4, 1900, floatDelay);

  return (
    <Animated.View
      style={[
        styles.card,
        style,
        { opacity: entrance.opacity, transform: [...entrance.transform, { translateY: floatY }] },
      ]}
    >
      <View style={[  styles.iconWrap, { backgroundColor: iconBackgroundColor }]}>
        <Image
        source={icon}
        style={{ width: 22, height: 22, resizeMode: 'contain' }}
        />
      </View>
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.subtitle, positive ? styles.positive : styles.negative]}>{subtitle}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: 'absolute',
    minWidth: 145,
    ...shadows.md,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 12,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  negative: { color: '#FF4637' },
  positive: { color: '#2F8F5B' },
  subtitle: { fontFamily: fonts.interMedium, fontSize: fontSize(12),marginTop: 5 },
  title: { color: colors.black, fontFamily: fonts.interSemiBold, fontSize: fontSize(14) },
});
