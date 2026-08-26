/**
 * Smart Expense Tracker colour palette.
 * Mirrors the CSS custom properties in docs/smart-expense-tracker.html.
 */
export const colors = {
  // Backgrounds
  bg: '#F4F6F3',
  surface: '#FFFFFF',
  surface2: '#F0F2EE',

  // Text
  ink: '#161A17',
  muted: '#6E766F',
  faint: '#A2A99E',
  line: '#E7EBE4',

  // Primary (green)
  primary: '#0E6E52',
  primaryDark: '#093F30',
  primaryMid: '#12885F',
  primaryLight: '#E1F2E8',

  // Accent
  blue: '#3E63E0',
  blueLight: '#E7ECFC',
  purple: '#8B6EF0',
  purpleLight: '#EFE9FD',

  // Semantic
  green: '#1FA463',
  amber: '#DA8A15',
  amberLight: '#FCEFD8',
  red: '#D8484A',
  redLight: '#FBE7E7',

  // Dark mode overrides (not wired to a theme switch yet)
  dark: {
    bg: '#12140F',
    surface: '#1B1F19',
    surface2: '#242920',
    ink: '#F1F3EC',
    muted: '#9AA396',
    faint: '#7C8676',
    line: '#2C3226',
    primaryLight: '#173629',
    blueLight: '#1B2340',
    purpleLight: '#26203F',
    amberLight: '#332508',
    redLight: '#3A1E1F',
  },
} as const;
