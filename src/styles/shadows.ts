/** Elevation presets. Spread into a StyleSheet entry: `{ ...shadows.md }`. */
export const shadows = {
  sm: {
    shadowColor: '#0F1914',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0A281E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0A281E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;
