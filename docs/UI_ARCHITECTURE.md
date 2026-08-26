# UI Architecture

How this app is put together, where every kind of file lives, and the rules for adding new
code. Read this before creating a file.

## Layer flow

```text
App.tsx                 fonts + providers + NavigationContainer, nothing else
   │
   ▼
src/navigation/         AppNavigator, routes, param types, deep links
   │
   ▼
src/screens/            one file per screen (Auth/ and Home/)
   │
   ▼
src/components/         reusable presentational UI (Card, Button, ProgressBar, …)
   │
   ▼
src/hooks/  src/store/  src/services/  src/utils/  src/styles/  src/types/  src/constants/
```

Data flows down through props. A component never reaches back up into a screen, and a
component never calls a service directly — the screen (or a hook) does that and passes
results down.

## Folder tree

```text
SmartExpenseTracker/
├── App.tsx                     root component: font gate + providers + navigator
├── index.ts                    Expo entry, registers App
├── app.json                    Expo app config (icons, scheme, platforms)
├── app.config.js               adds runtime `extra` values + Expo plugins
├── tsconfig.json               strict TS + the @/ and @assets/ path aliases
│
├── assets/
│   ├── fonts/                  Inter + BreeSerif files and index.ts (fonts, fontSources)
│   ├── images/                 app icon, favicon, adaptive icon, splash icon
│   └── gifs/                   animated assets (empty for now)
│
├── docs/
│   ├── UI_ARCHITECTURE.md      this file
│   ├── FIGMA.md                how to turn a Figma node into a screen here
│   └── smart-expense-tracker.html   the HTML prototype the UI is based on
│
└── src/
    ├── components/             reusable UI: Button, Card, ErrorBoundary, IconBox,
    │                           ProgressBar, SectionHeader, TypeToggle
    ├── constants/              mockData.ts (sample transactions, budgets, goals)
    ├── hooks/                  reusable custom hooks (see README)
    ├── navigation/
    │   ├── AppNavigator.tsx    the single native stack, every screen registered here
    │   ├── routes.ts           ROUTES — route name constants
    │   ├── types.ts            RootStackParamList + AppNavigation
    │   └── deepLinks.ts        linkingConfig for smartexpensetracker:// URLs
    ├── screens/
    │   ├── Auth/               ExpenseSplashScreen, OnboardingScreen, SetupScreen
    │   └── Home/               ExpenseMainScreen (tab shell), ExpenseHomeTab,
    │                           TransactionsTab, InsightsTab, ProfileTab,
    │                           BudgetsScreen, GoalsScreen, AddExpenseScreen,
    │                           ScannerScreen, TransactionDetailScreen,
    │                           ProfileSettingsScreen
    ├── services/               API / storage calls (see README)
    ├── store/                  shared app state + local DB (see README)
    ├── styles/                 colors.ts, spacing.ts (spacing + radius), shadows.ts
    ├── types/                  expense.ts — Transaction, Budget, Goal, …
    └── utils/                  scale.ts (scale, fontSize), currency.ts (formatCurrency)
```

## What goes where

| I need to add… | Put it in |
| --- | --- |
| A new screen | `src/screens/Auth/` or `src/screens/Home/`, one file, PascalCase |
| UI used by two or more screens | `src/components/<Name>.tsx` |
| UI used by exactly one screen | keep it in that screen file, below the screen component |
| Stateful logic shared by screens | `src/hooks/useSomething.ts` |
| App-wide state or local database | `src/store/` |
| An HTTP call or device storage | `src/services/` |
| A pure helper (format, validate, date, currency) | `src/utils/` |
| A colour, spacing step, radius, or shadow | `src/styles/` |
| A shared TypeScript type | `src/types/` (screen-only types stay in the screen) |
| A fixed value or sample data | `src/constants/` |
| A font, image, or GIF | `assets/fonts`, `assets/images`, `assets/gifs` |

## Navigation

One native stack in `src/navigation/AppNavigator.tsx`. There is no nested navigator — the
bottom tab bar in `ExpenseMainScreen` is plain local state that swaps which tab component
renders, matching the HTML prototype.

- `routes.ts` holds `ROUTES`, so screens never type a route name as a raw string.
- `types.ts` holds `RootStackParamList` (route name → params) and `AppNavigation`, a
  shorthand for `NavigationProp<RootStackParamList>` used by the tab components.
- Screens registered in the stack type their props with
  `NativeStackScreenProps<RootStackParamList, typeof ROUTES.x>`.
- `deepLinks.ts` maps `smartexpensetracker://` URLs onto routes and is passed to
  `NavigationContainer` as `linking`.
- Switching tabs from inside a tab is a callback, not navigation: `ExpenseMainScreen`
  passes `setActiveTab` down to `ExpenseHomeTab` as `onOpenTab`.

### Adding a new screen

1. Create `src/screens/<Auth|Home>/MyScreen.tsx` exporting a named component.
2. Add the route name to `ROUTES` in `src/navigation/routes.ts`.
3. Add the route and its params to `RootStackParamList` in `src/navigation/types.ts`
   (use `undefined` when the screen takes no params).
4. Register a `<Stack.Screen>` in `src/navigation/AppNavigator.tsx`.
5. Add it to `deepLinks.ts` only if it should be reachable by URL.
6. Navigate with `navigation.navigate(ROUTES.myScreen)`.

## Import aliases

Two aliases, defined once in `tsconfig.json` and resolved natively by Expo's Metro — no
Babel plugin and no `metro.config.js` needed.

| Alias | Resolves to |
| --- | --- |
| `@/*` | `./src/*` |
| `@assets/*` | `./assets/*` |

Always import through an alias, never with `../../`:

```ts
import { fonts } from '@assets/fonts';
import { Card } from '@/components/Card';
import { colors } from '@/styles/colors';
import { radius, spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';
import { fontSize, scale } from '@/utils/scale';
import { formatCurrency } from '@/utils/currency';
import { ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import type { Transaction } from '@/types/expense';
```

Import each thing from the file that owns it. There are no `index.ts` barrel files in
`src/` — the import path tells you exactly which file to open.

## Styling

- `colors` — every colour in the app, including the `dark` overrides.
- `spacing` / `radius` — fixed layout steps (`spacing.md`, `radius.lg`).
- `shadows` — `shadows.sm | md | lg`, spread into a style: `...shadows.md`.
- `fontSize(n)` — screen-size-aware font size, use for every `fontSize`.
- `scale(n)` — screen-size-aware length, for one-off paddings that are not on the
  `spacing` scale.
- `fonts` from `@assets/fonts` — font family names (`fonts.interExtraBold`).

Screen-specific styles stay in a `StyleSheet.create` block at the bottom of the screen
file. Only promote a style to `src/styles/` when more than one file needs it.

## Prototype-aligned presentation

- `OnboardingScreen` keeps its pager flow and recreates the four HTML prototype
  compositions with native layout: transaction cards and receipt icon, budget ring,
  savings bars, and rapid-add flow.
- `ExpenseHomeTab` is the Home compositional screen. Its order matches the prototype:
  greeting, balance hero, monthly budget, horizontally scrolling spending overview,
  sponsored banner, recent activity, and insight CTA.
- `SetupScreen` sits between onboarding and the main tab shell, matching the prototype's
  personalization screen with static name, income, budget, currency, language, continue,
  and skip controls.
- `ExpenseMainScreen` owns the UI-only FAB sheet and its three prototype actions:
  expense, income, and scan. `AddExpenseScreen` supports separate expense/income
  presentation through its route parameter; `ScannerScreen` provides the non-OCR scan
  choice and detected-payment states.
- The tab shell follows the prototype's four destinations — Home, Transactions, Invest,
  and Profile — with outline icons and the center FAB space. Profile rows use typed
  placeholder destinations for their prototype sub-flows.
- `BudgetsScreen` and `GoalsScreen` are pushed stack screens, not tabs. Budgets opens from
  the Home tab's "View Budget" button and from Profile → Quick links → Budget; Goals opens
  from Profile → Quick links → Goals. Both have a back button in their top bar.

## Visual assets

- The onboarding and Home prototype sections contain no local raster artwork. Their
  visuals are cards, gradients, icons, and decorative shapes, recreated with native
  views, `expo-linear-gradient`, and `@expo/vector-icons`.
- The HTML prototype has one remote scanner image
  (`images.unsplash.com/photo-1556742393-d75f468bfcb0...`). It has no bundled equivalent
  here, and no unrelated replacement was added. When the scanner UI needs real artwork,
  add an approved local receipt image to `assets/images/`.

## Motion

- The splash screen keeps its staged mark/title/progress sequence plus the prototype's
  expanding background rings.
- Native stack and modal transitions, onboarding pager movement, and the slide-up add
  sheet cover the prototype's primary screen and overlay motion. None of it carries
  application logic.

## Rules

- Keep it flat. If a folder needs subfolders, question the split first.
- One screen per file, one component per file.
- No barrel `index.ts` files inside `src/`.
- No architecture layers (repositories, use-cases, mappers, view-models, DI containers).
- Screens compose; components render; utils calculate; services talk to the outside.
