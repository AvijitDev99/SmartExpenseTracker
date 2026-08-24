# Figma Structure

Use this master file when a developer provides a Figma node, Figma URL, screenshot, exported design metadata, or design notes. The implementation must follow the Finalwish-style project structure documented in `doc/BaseStructure.md`.

Developers should be able to mention only this file for UI implementation.

## Developer Prompt

```txt
I am providing a Figma node/screen.

Please follow FigmaStructure.md from the doc folder and create the screen using the same UI architecture, responsive styling system, reusable component structure, theme handling, and coding standards used in this project.

Figma Node:
[paste figma node here]

Optional Target Path:
[paste folder path here]
```

## Design Source

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

Convert raw Figma values into project tokens and reusable components when values repeat.

## Required Module Placement

Place screens into the same module ownership model used by Finalwish.

| Figma Screen Type | Required Destination |
| --- | --- |
| Sign in, sign up, login, forgot password, OTP, reset password, auth confirmation | `src/modules/auth/presentation/screens` |
| Auth-only fields/cards/buttons | `src/modules/auth/presentation/components` |
| Branded splash, loading splash, get-started, onboarding splash | `src/modules/splash/presentation/screens` |
| Home dashboard, tab home, post-login landing | `src/modules/home/presentation/screens` |
| Home-only cards/headers/quick links | `src/modules/home/presentation/components` |
| Message list/detail/composer | `src/modules/message/presentation/screens` |
| Message-only rows/cards/composer pieces | `src/modules/message/presentation/components` |
| More menu or secondary menu screen | `src/modules/more/presentation/screens` |
| Profile screen or profile section | `src/modules/profile/presentation/screens` |
| Privacy policy, terms, CMS/legal text | `src/modules/policy/presentation/screens` |
| Shared access, delegated access, trusted access | `src/modules/access/presentation/screens` |
| Existing business feature | `src/modules/<existing-feature>/presentation/screens` |
| New business feature | `src/modules/<feature>/presentation/screens` |

Do not create `src/modules/<figma-file-name>`, `src/modules/<app-name>`, or `src/modules/<brand-name>` just because the Figma file has that name. If one Figma file contains splash, sign-in, and home screens, split them into `splash`, `auth`, and `home`.

## Path Resolution

Use these rules in order:

1. If the user provides an explicit folder path, create the screen there.
2. If the user provides a file path, create the new screen beside that file.
3. If no path is provided, infer the module using Required Module Placement.
4. If no known module can be inferred, create a new feature folder in kebab-case: `src/modules/<feature>/presentation/screens`.
5. When multiple screens belong to one feature, keep them under the same feature module.

## Execution Order

1. Inspect the Figma node, screenshot, or design notes.
2. Identify the correct module and screen name.
3. Inspect existing screens/components/assets/tokens in that module and shared layers.
4. Resolve the destination folder.
5. Create or update the screen file in `presentation/screens`.
6. Extract repeated feature-only UI into `presentation/components`.
7. Use or create design-system primitives only for generic controls.
8. Use theme tokens, typography tokens, and responsive helpers.
9. Register required image/icon/font assets through local export maps.
10. Wire typed navigation only when the screen needs routing.
11. Add presentation hooks only when the screen has meaningful derived state, callbacks, route-param mapping, dispatch/select-state wiring, or repeated behavior.
12. Add tests for important behavior where the project test setup exists.
13. Run verification.

## Screen Output Structure

For a feature screen, use:

```text
src/modules/<feature>
`-- presentation
    |-- components
    |   |-- <FeatureCard>.tsx
    |   `-- <FeatureSection>.tsx
    |-- hooks
    |   `-- use<Feature>ScreenModel.ts
    |-- mappers
    |   `-- to<Feature>ViewModel.ts
    |-- screens
    |   `-- <Feature>Screen.tsx
    `-- view-models
        `-- <Feature>ViewModel.ts
```

Rules:

- Add `presentation/hooks` only for real screen-model behavior.
- Add `presentation/mappers` and `presentation/view-models` when API/domain data needs screen-specific shaping.
- Keep simple static screens in `presentation/screens` without unnecessary layers.
- Keep the screen responsible for layout composition, safe area, route params, and navigation.

Screen file order:

1. Third-party imports.
2. Project imports.
3. Type imports.
4. Local constants.
5. Helper functions.
6. Local interfaces/types.
7. Screen component.
8. Styles.

## Design Interpretation

| Design Element | Codex Action |
| --- | --- |
| Repeated card/row/section in one module | Extract into `presentation/components`. |
| Generic button/input/surface | Reuse or create a design-system primitive/composite. |
| Reusable loading/empty/error/success state | Reuse or create a design-system pattern or shared UI component. |
| Screen-specific illustration/image | Add to a feature image group under `src/assets/images/<feature>`. |
| Shared icon | Add/reuse under `src/assets/icons` or `src/design-system/icons` and export through an index map. |
| Raw repeated color/text style | Convert to semantic theme/typography token. |
| Long content | Use scrollable, safe-area aware screen structure. |
| Bottom actions | Handle safe area, keyboard overlap, and touch target sizing. |
| Navigation target | Add typed route constant and param type. |

## Component Rules

- Keep feature-only UI in `src/modules/<feature>/presentation/components`.
- Keep cross-feature app UI in `src/components`.
- Keep generic UI primitives/composites in `src/design-system/components`.
- Keep generic forms/feedback/states in `src/shared/ui`.
- Pass data through props; avoid tight coupling to screen internals.
- Extract cards/sections/widgets when a screen grows or when UI repeats.
- Do not promote feature-specific UI into shared folders unless it is genuinely reused across features.
- Do not create one-off shared controls when a local feature component is enough.
- Preserve accessibility with labels, roles where applicable, readable contrast, and minimum touch targets.
- Components should not trigger API calls directly.

## Styling Rules

- Use `StyleSheet.create` unless the project already uses another established styling pattern.
- Prefer theme tokens and semantic colors over hardcoded repeated values.
- Use typography tokens or font constants; do not hardcode raw font-family strings repeatedly.
- Use `spacing`, `radius`, and `fontSize` helpers for layout and text sizing.
- Avoid fixed heights for text-heavy sections.
- Prefer `flex`, percentages, max-width wrappers, and responsive constraints over absolute sizing.
- Keep status bar and safe area spacing explicit.
- Use scroll containers for forms and long screens.
- Use keyboard-aware layout for forms and fixed bottom actions.
- Add bottom-tab-aware padding when the screen sits inside tab navigation.
- Keep touch targets usable on small screens.
- Use `flexWrap` for chips/tags and stable aspect ratios for media/cards.
- Keep screen-specific styles inside the screen unless reused.
- Make text fit without overlap on small and large devices.

## Theme Rules

- Use semantic theme tokens.
- Register new tokens when repeated visual values become part of the design language.
- Keep brand-specific values isolated in theme/tokens.
- Add or reuse colors in `src/constants/theme.ts` or `src/design-system/tokens/colors.ts`, following the current project pattern.
- Add or reuse typography in `src/design-system/tokens/typography.ts` or the current font registry.
- Use the project theme hook instead of ad-hoc color branching.

## Asset Rules

- Check existing images, icons, fonts, and Figma exports before adding new files.
- Keep reusable icons under `src/assets/icons` or `src/design-system/icons`, following the current project pattern.
- Keep screen/feature artwork under `src/assets/images/<feature>`.
- Keep Figma-exported raw icons/assets under `src/assets/figmaIcons` only when that folder exists and the asset is still in conversion/review.
- Register image/icon groups through `index.ts` maps when more than one asset is used.
- Use descriptive lowercase asset names.
- Optimize large raster images before committing.
- Use SVG for vector graphics and PNG/JPG/WebP for raster content based on quality needs.
- Do not use ad-hoc remote `uri` links for bundled UI icons.

## Navigation Rules

- Route constants and param lists belong in `src/navigation/route-types`.
- Flow navigators belong in `src/navigation/flows`.
- Root composition belongs in `src/navigation/root`.
- Deep-link mapping belongs in `src/navigation/deep-links`.
- Navigators import screens from module public exports.
- Route params must be typed.
- Do not pass secrets, raw API responses, or large objects through route params.

## UI Preservation Rules

When adding API behavior or improving an existing screen:

- Preserve current UI design, layout, styling, visual hierarchy, and UX structure unless the user explicitly asks for UI changes.
- Limit API-related UI changes to loading, disabled state, validation, success/error feedback, and safe state handling.
- Do not redesign a screen as a side effect of wiring data.

## Verification Checklist

Run when available:

```bash
npm run typecheck
npm run lint
```

Confirm:

1. Screen is in the correct module's `presentation/screens` folder.
2. Splash/auth/home screens were split into the correct modules.
3. Repeated UI was extracted only where useful.
4. Shared components are genuinely generic.
5. Styling uses theme tokens and responsive helpers.
6. Assets are placed and exported correctly.
7. Navigation is typed and registered.
8. Text and controls do not overlap across small and large screens.
9. No unrelated modules, duplicate architecture folders, or app-name wrapper modules were created.
