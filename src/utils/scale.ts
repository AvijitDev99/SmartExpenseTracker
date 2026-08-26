import { Dimensions, PixelRatio } from 'react-native';

const FIGMA_BASE_WIDTH = 375;
const PHONE_MAX_SCALE = 1.02;
const PHONE_MIN_SCALE = 0.9;
const TABLET_MAX_SCALE = 1.1;
const TABLET_BREAKPOINT = 550;

/** Converts a 375px-wide design value into a device-appropriate pixel value. */
export const scale = (value: number, factor = 1): number => {
  const { width } = Dimensions.get('window');

  const baseScale = width / FIGMA_BASE_WIDTH;
  const clampedScale =
    width > TABLET_BREAKPOINT
      ? Math.min(baseScale, TABLET_MAX_SCALE)
      : Math.min(Math.max(baseScale, PHONE_MIN_SCALE), PHONE_MAX_SCALE);

  return Math.round(PixelRatio.roundToNearestPixel(value * clampedScale * factor));
};

const getFontFactor = () => {
  const { width, height } = Dimensions.get('window');
  const shortestSide = Math.min(width, height);

  if (shortestSide >= 900) return 1.32;
  if (shortestSide >= 768) return 1.24;
  if (shortestSide >= 600) return 1.16;
  return 1;
};

/** Same as `scale()` but with an extra bump on tablets so text stays readable. */
export const fontSize = (value: number): number => scale(value, getFontFactor());
