/**
 * PNG icon assets. Use with `<Image source={icons.logo} />`.
 * Every file is a black glyph on a transparent background, so tint it via
 * `style={{ tintColor }}` to match the surface it sits on.
 */
export const icons = {
  diagram: require('./diagram.png'),
  logo: require('./logo.png'),
  pieChart: require('./pie-chart.png'),
  security: require('./security.png'),
  target: require('./target.png'),
  sparkle: require('./sparkle.png'),
} as const;

export type IconName = keyof typeof icons;
