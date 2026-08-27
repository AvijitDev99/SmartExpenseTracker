/**
 * PNG icon assets. Use with `<Image source={icons.logo} />`.
 * Every file is a black glyph on a transparent background, so tint it via
 * `style={{ tintColor }}` to match the surface it sits on.
 */
export const images = {
  splash_background: require('./splash_background.png'),
} as const;

export type ImageName = keyof typeof images;
