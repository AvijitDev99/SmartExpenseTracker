# Figma → Screen

Use this file when someone hands over a Figma node, Figma URL, screenshot, exported design
metadata, or design notes. It describes how to turn that design into a screen inside this
project's structure. The structure itself is documented in `docs/UI_ARCHITECTURE.md`.

## Developer prompt

```txt
I am providing a Figma node/screen.

Follow docs/FIGMA.md and create the screen using this project's structure, responsive
styling helpers, reusable components, and coding standards.

Figma Node:
[paste figma node here]

Optional Target Path:
[paste folder path here]
```

## Design source

Treat the Figma reference as the visual source of truth for:

- Screen layout and hierarchy.
- Component boundaries.
- Spacing rhythm.
- Typography.
- Colors and semantic token needs.
- Icons and images.
- Loading, empty, success, and error states if shown.
- Responsive behavior.
- Navigation destinations.

Convert raw Figma values into project tokens (`src/styles/`) and reusable components
(`src/components/`) when a value or a block repeats.

## Where the screen goes

| Figma screen type | Destination |
| --- | --- |
| Splash, get-started, onboarding, personalization/setup | `src/screens/Auth/` |
| Sign in, sign up, forgot password, OTP, reset password | `src/screens/Auth/` |
| Dashboard, tab screen, post-login landing | `src/screens/Home/` |
| Transactions list/detail, add expense, scanner | `src/screens/Home/` |
| Budgets, goals, insights | `src/screens/Home/` |
| Profile and profile sub-screens | `src/screens/Home/` |
| Anything else in the signed-in app | `src/screens/Home/` |

Path resolution, in order:

1. If an explicit file path is given, use it.
2. If a sibling file is given, create the screen beside it.
3. Otherwise pick `Auth/` for pre-login and `Home/` for post-login.

Do not create a folder named after the Figma file, the app, or the brand. Do not create a
third screens folder — `Auth` and `Home` are the only two. If a Figma file contains splash,
sign-in, and dashboard screens, split them across `Auth/` and `Home/` as separate files.

## Execution order

1. Inspect the Figma node, screenshot, or design notes.
2. Pick the screen name and whether it is `Auth/` or `Home/`.
3. Read a nearby existing screen to match its structure and conventions.
4. Check `src/components/` and `src/styles/` for what already exists before adding.
5. Create the single screen file, exporting a named component.
6. Extract any repeated block into `src/components/` — only if two or more screens use it.
7. Use `colors`, `spacing`, `radius`, `shadows`, `fonts`, `fontSize()`, and `scale()`.
8. Add fonts/images/gifs under `assets/` and reference them through `@assets/`.
9. Register the route: `routes.ts`, `types.ts`, `AppNavigator.tsx` (see UI_ARCHITECTURE.md).
10. Run `npx tsc --noEmit`.

## Screen file layout

One file per screen. No `presentation/`, no `hooks/`, `mappers/`, or `view-models/`
folders. Order inside the file:

1. Third-party imports (`react`, `react-native`, navigation, Expo).
2. Project imports via `@assets/` and `@/`.
3. Type imports.
4. Local constants.
5. Local helper functions.
6. Local interfaces/types.
7. The screen component (named export).
8. Screen-only sub-components, if any.
9. `const styles = StyleSheet.create({ ... })`.

Reference example: `src/screens/Home/TransactionsTab.tsx`.

## Design interpretation

| Design element | What to do |
| --- | --- |
| Block repeated across two or more screens | Add `src/components/<Name>.tsx` |
| Block repeated inside one screen only | Local sub-component in the same file |
| Generic button/input/surface | Reuse `Button`, `Card`, `IconBox`, `TypeToggle` |
| Empty / no-data state | Build it in the screen file; promote it only when a second screen needs it |
| Progress ring or bar | Reuse `src/components/ProgressBar.tsx` |
| Section title with an action link | Reuse `src/components/SectionHeader.tsx` |
| Screen illustration or photo | Add to `assets/images/` |
| Icon | Use `@expo/vector-icons`; only add a file if the set lacks it |
| Raw repeated colour or text style | Add a token to `src/styles/` |
| Long content | Wrap in `ScrollView` inside a `SafeAreaView` |
| Bottom actions | Handle safe area, keyboard overlap, and touch target size |
| Navigation target | Add to `ROUTES` and `RootStackParamList` |

## Component rules

- Reusable UI goes in `src/components/`, one component per file, no subfolders.
- Screen-only UI stays in the screen file.
- Pass data in through props. A component does not read global state or call a service.
- Do not promote a screen-specific component into `src/components/` until a second screen
  actually needs it.
- Keep accessibility: readable contrast, labels where the content is not text, and touch
  targets large enough to hit.

## Styling rules

- Use `StyleSheet.create` at the bottom of the file.
- Use tokens over hardcoded values: `colors.*`, `spacing.*`, `radius.*`, `shadows.*`.
- Use `fonts.*` for `fontFamily` and `fontSize(n)` for every font size.
- Use `scale(n)` for one-off lengths that are not on the `spacing` scale.
- Avoid fixed heights on text-heavy sections; prefer `flex`, percentages, and max widths.
- Keep safe area and status bar spacing explicit.
- Use `ScrollView` for forms and long screens, and keyboard-aware layout for forms with
  fixed bottom actions.
- Add bottom padding on tab screens so content clears the tab bar and FAB.
- Use `flexWrap` for chips/tags and stable aspect ratios for media and cards.
- Text must fit without overlap on small and large devices.

## Asset rules

- Fonts in `assets/fonts/`, registered in `assets/fonts/index.ts`.
- Images in `assets/images/`, GIFs in `assets/gifs/`.
- Check what already exists before adding a file.
- Use descriptive lowercase kebab-case names.
- Optimize large rasters before committing. Prefer PNG/JPG/WebP for photos.
- Do not point bundled UI at remote `uri` links.
- There is no SVG transformer configured; convert vector exports to PNG, or add the
  transformer deliberately before committing `.svg` files.

## Navigation rules

- Route name constants: `src/navigation/routes.ts`.
- Param list and `AppNavigation`: `src/navigation/types.ts`.
- Stack registration: `src/navigation/AppNavigator.tsx`.
- Deep links: `src/navigation/deepLinks.ts`.
- Route params must be typed, and small: ids and flags, never secrets, raw API responses,
  or large objects.

## UI preservation

When wiring data into an existing screen:

- Preserve the current layout, styling, visual hierarchy, and UX unless UI changes were
  explicitly requested.
- Limit changes to loading, disabled, validation, and success/error feedback.
- Do not redesign a screen as a side effect of connecting it to data.

## Verification

```bash
npx tsc --noEmit
```

```bash
npx eslint .
```

Then confirm:

1. The screen is a single file in `src/screens/Auth/` or `src/screens/Home/`.
2. Multi-screen designs were split into separate screen files.
3. UI was extracted to `src/components/` only where genuinely reused.
4. Styling uses tokens and the responsive helpers.
5. Assets sit under `assets/` and are imported via `@assets/`.
6. The route is typed and registered in all three navigation files.
7. Text and controls do not overlap on small or large screens.
8. No new folder layers, barrel files, or app-name wrapper folders were introduced.
