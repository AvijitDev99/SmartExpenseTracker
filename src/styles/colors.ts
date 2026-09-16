/**
 * Smart Expense Tracker colour palette.
 * Mirrors the CSS custom properties in docs/smart-expense-tracker.html.
 */
export const colors = {
  // Backgrounds
  bg: "#F4F6F3",
  surface: "#FFFFFF",
  surface2: "#F0F2EE",

  // Text
  ink: "#161A17",
  muted: "#6E766F",
  faint: "#A2A99E",
  line: "#E7EBE4",
  midGrey: '#555E6A',
  greenWhite: "#E9E8E8",

  // Primary (green)
  primary: "#0E6E52",
  primaryDark: "#093F30",
  primaryMid: "#12885F",
  primaryLight: "#E1F2E8",
  darkSpringGreen: "#1C7258",

  // Accent
  blue: "#3E63E0",
  blueLight: "#E7ECFC",
  purple: "#8B6EF0",
  purpleLight: "#EFE9FD",

  // Semantic
  green: "#1FA463",
  amber: "#DA8A15",
  amberLight: "#FCEFD8",
  red: "#D8484A",
  redLight: "#FBE7E7",
  black: "#000000",
  white: "#FFFFFF",

  // Dark mode overrides (not wired to a theme switch yet)
  dark: {
    bg: "#12140F",
    surface: "#1B1F19",
    surface2: "#242920",
    ink: "#F1F3EC",
    muted: "#9AA396",
    faint: "#7C8676",
    line: "#2C3226",
    primaryLight: "#173629",
    blueLight: "#1B2340",
    purpleLight: "#26203F",
    amberLight: "#332508",
    redLight: "#3A1E1F",
  },
  onboarding: {
    jewel: "#0E6245",
    spruce: "#01593A",
    greenWhite: "#DDEBE4",
    darkBlueGreen: "#095C40",
    mistBlue: "#656D75",
    jellyfish: "#5EC7AE",
    goldDrop: "#EB8E01",
    geyser: "#CADCF8",
    lightViolet: "#CFBFFF"
  },
  onboardingPalette: {
    trackBg: "#EDF6F2",
    trackAccent: "#E6F1EC",
    budgetBg: "#FFF4E7",
    budgetAccent: "#FBF0E3",
    savingsBg: "#F2ECFE",
    savingsAccent: "#F2EFFB",
    addBg: "#EFF5FD",
    addAccent: "#EEF3F1",
  },
} as const;
