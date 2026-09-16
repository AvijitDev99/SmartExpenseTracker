import type { ComponentType } from "react";
import { TrackIllustration } from "./illustrations/TrackIllustration";
import { BudgetIllustration } from "./illustrations/BudgetIllustration";
import { SavingsIllustration } from "./illustrations/SavingsIllustration";
import { AddExpenseIllustration } from "./illustrations/AddExpenseIllustration";
import { icons } from "@assets/icons";
import { colors } from "@/styles/colors";
import { ImageSourcePropType } from "react-native";

export type OnboardingStep = {
  key: string;
  titleStart: string;
  titleMiddle: string;
  titleEnd: string;
  subtitle: string;
  bg: string;
  accentBg: string;
  Illustration: ComponentType<{ trigger: number }>;
  features: {
    icon: ImageSourcePropType;
    label: string;
    caption: string;
    size: number;
  }[];
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    key: "track",
    titleStart: "Know where\nyour",
    titleMiddle: "money",
    titleEnd: "goes",
    subtitle:
      "Track your daily spending and\nunderstand your financial habits.",
    bg: colors.onboardingPalette.trackBg,
    accentBg: colors.onboardingPalette.trackAccent,
    Illustration: TrackIllustration,
    features: [
      {
        icon: icons.circleChart,
        label: "Track",
        caption: "Your Expenses",
        size: 22,
      },
      {
        icon: icons.chart,
        label: "Analyze",
        caption: "Smart Insights",
        size: 22,
      },
      {
        icon: icons.targetCopy,
        label: "Achieve",
        caption: "Your Goals",
        size: 25,
      },
    ],
  },
  {
    key: "budget",
    titleStart: "Stay within\nyour",
    titleMiddle: "budget",
    titleEnd: "",
    subtitle: "Set monthly limits and get notified\nbefore your overspend.",
    bg: colors.onboardingPalette.budgetBg,
    accentBg: colors.onboardingPalette.budgetAccent,
    Illustration: BudgetIllustration,
    features: [
      {
        icon: icons.wallet,
        label: "Set Limits",
        caption: "Create monthly\nbudgets easily.",
        size: 20,
      },
      {
        icon: icons.notification,
        label: "Get Alerts",
        caption: "Notifications before\nyou overspend.",
        size: 22,
      },
      {
        icon: icons.privacyCheck,
        label: "Stay in Control",
        caption: "Manage your money\nwith confidence.",
        size: 22,
      },
    ],
  },
  {
    key: "savings",
    titleStart: "Build better\n",
    titleMiddle: "saving",
    titleEnd: "habits",
    subtitle: "Set goals and watch\nyour savings grow.",
    bg: colors.onboardingPalette.savingsBg,
    accentBg: colors.onboardingPalette.savingsAccent,
    Illustration: SavingsIllustration,
    features: [
      {
        icon: icons.goals,
        label: "Set Goals",
        caption: "Define your savings\ngoals easily.",
        size: 22,
      },
      {
        icon: icons.track,
        label: "Track Progress",
        caption: "Monitor your progress\nin real-time.",
        size: 26,
      },
      {
        icon: icons.trophy,
        label: "Stay Motivated",
        caption: "Celebrate milestones\nand stay consistent.",
        size: 28,
      },
    ],
  },
  {
    key: "add-expense",
    titleStart: "Add an expense\nin",
    titleMiddle: "seconds",
    titleEnd: "",
    subtitle:
      "Amount → Category → Payment → Done.\nNo forms, no friction — just fast, honest\ntracking.",
    bg: colors.onboardingPalette.addBg,
    accentBg: colors.onboardingPalette.addAccent,
    Illustration: AddExpenseIllustration,
    features: [
      {
        icon: icons.power,
        label: "Super Fast",
        caption: "Add expenses\nin just a few taps.",
        size: 22,
      },
      {
        icon: icons.pin,
        label: "Accurate",
        caption: "Every detail\ntracked correctly.",
        size: 24,
      },
      {
        icon: icons.saftey,
        label: "No Hassle",
        caption: "No complex forms\nor extra steps.",
        size: 20,
      },
      {
        icon: icons.lock,
        label: "100% Secure",
        caption: "Your data is safe\nand private.",
        size: 22,
      },
    ],
  },
];
