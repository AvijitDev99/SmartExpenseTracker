export const Colors = {
  light: {
    background: '#ffffff',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#111827',
    text: '#111827',
    tint: '#111827',
  },
  dark: {
    background: '#111827',
    icon: '#9ca3af',
    tabIconDefault: '#9ca3af',
    tabIconSelected: '#ffffff',
    text: '#f9fafb',
    tint: '#f9fafb',
  },
} as const;

// Final Wishes palette from Figma variables/node styles.
export const BrandColors = {
  finalWish: {
    badgeBackground: '#F8F4ED',
    bgPrimary: '#F8F4ED',
    cardBackground: '#FFFFFF',
    cardShadow: '#F4E8E2',
    confirmationBackground: '#FAF7F5',
    confirmationCheckmark: '#FBF9F6',
    confirmationGradientStart: '#F9EBEE',
    error: '#b58c19',
    floralLine: '#F28589',
    formActiveBorder: '#F2BBBD',
    formBorder: '#F4E8E2',
    formPlaceholder: '#E2DBD0',
    formTextActive: '#4E4762',
    headerBackground: '#F3DDD7',
    iconPrimary: '#ED9A9C',
    noteBackground: '#F8F4ED',
    pinkPrimary300: '#F3DDD7',
    pinkPrimary400: '#F2BBBD',
    splashTitle: '#E97376',
    textPrimary: '#201D2B',
    textSecondary: '#342F43',
  },
} as const;

export const BrandEffects = {
  finalWish: {
    headerFadeColors: [
      'rgba(255, 255, 255, 0.92)',
      'rgba(255, 255, 255, 0.35)',
      'rgba(255, 255, 255, 0)',
    ] as const,
    shadowColor: '#222222',
  },
} as const;
