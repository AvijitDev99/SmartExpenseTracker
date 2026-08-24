# Base Structure

Use this master file immediately after creating or restructuring an Expo/React Native project. The target structure is the same scalable structure used by `/Users/wtsuser/Desktop/Project/finalwish`, with the API foundation following the Janitorial API-client pattern documented in `doc/API_STRUCTURE.md`.

Developers should be able to mention only this file for base setup.

## Developer Prompt

```txt
Please follow BaseStructure.md from the doc folder and create the complete initial project architecture using the same folder structure, reusable patterns, navigation flow, API structure, coding standards, and scalable architecture used in this project.
```

## Required Result

| Area | Expected Result |
| --- | --- |
| App entry | Thin root `App.tsx` bridges to `src/app/App`; root `index.ts` registers the app. |
| App shell | `src/app` owns providers, bootstrap, and startup orchestration. |
| Folder structure | Source code lives under `src`; no Expo Router/root template app folders. |
| Modules | Feature-first clean architecture under `src/modules/<feature>`. |
| Navigation | Typed route constants, param lists, root navigator, flow navigators, guards, deep links. |
| State | Redux Toolkit slices and Redux Saga generators live centrally in `src/store`. |
| API | Janitorial-style governed API client, endpoint registry, interceptors, error mapping, token refresh, logger, loader, multipart helper. |
| Theme/UI | Design-system tokens, theme, primitives, composites, patterns, shared UI, app components. |
| Services | API, storage, observability, runtime, background, UI services, access/policy services. |
| Compliance/security | Security helpers plus compliance-ready folders for audit, consent, redaction, masking, retention, policy, and guarded actions when needed. |
| Tests | Tests mirror production ownership under `tests`. |

## Root Structure

```text
.
|-- App.tsx
|-- index.ts
|-- app.config.ts
|-- app.json
|-- babel.config.js
|-- eslint.config.js
|-- jest.config.js
|-- jest.setup.ts
|-- package.json
|-- tsconfig.json
|-- doc
|-- scripts
|-- src
`-- tests
```

Project documentation lives in root `doc`. Do not create a second architecture or implementation doc folder under `src`; duplicate docs drift and make future implementation instructions unreliable.

## Forbidden Root Folders

Do not keep or recreate the default Expo template folders for app code:

```text
app
assets
components
constants
hooks
```

All application source folders belong under `src`.

## Source Structure

Mirror the Finalwish source layout:

```text
src
|-- app
|   |-- bootstrap
|   |-- providers
|   |   `-- state
|   `-- startup
|-- assets
|   |-- figmaIcons
|   |-- fonts
|   |-- icons
|   `-- images
|-- components
|   `-- ui
|-- compliance
|   |-- core
|   |-- gdpr
|   |-- hipaa
|   |-- pci
|   `-- shared
|-- config
|   |-- build-config
|   |-- env
|   |-- feature-flags
|   `-- runtime-config
|-- constants
|-- design-system
|   |-- components
|   |   |-- composites
|   |   `-- primitives
|   |-- icons
|   |-- patterns
|   |-- theme
|   `-- tokens
|-- hooks
|-- modules
|-- navigation
|   |-- deep-links
|   |-- flows
|   |-- guards
|   |-- root
|   `-- route-types
|-- security
|-- services
|   |-- access-control
|   |-- api
|   |-- background
|   |-- observability
|   |-- policy
|   |-- runtime
|   |-- storage
|   `-- ui
|-- shared
|   |-- constants
|   |-- core
|   |   |-- errors
|   |   |-- query
|   |   `-- validation
|   |-- types
|   |-- ui
|   |   |-- feedback
|   |   `-- forms
|   `-- utils
|-- store
|   |-- sagas
|   `-- slices
|-- styles
|-- types
`-- utils
```

Add only folders a project needs, but when a folder is needed it must use this ownership model.

## Folder Responsibilities

| Folder | Responsibility |
| --- | --- |
| `src/app` | App entry, provider composition, bootstrap/startup orchestration. |
| `src/assets` | Fonts, icons, images, Figma exports, static media. |
| `src/components` | Cross-feature reusable components outside formal design-system primitives. |
| `src/compliance` | Compliance, consent, policy, audit, masking, retention, guarded actions. |
| `src/config` | Environment resolution, build config, runtime config, feature flags. |
| `src/constants` | App-wide UI/navigation constants. |
| `src/design-system` | Tokens, theme, primitives, composites, patterns, icons. |
| `src/hooks` | App-wide reusable hooks only. |
| `src/modules` | Feature-first domain modules. |
| `src/navigation` | Navigators, route constants, route params, guards, deep links. |
| `src/security` | Secure storage wrappers, redaction, safe logging helpers. |
| `src/services` | API, storage, observability, background/runtime, UI services, policy/access services. |
| `src/shared` | Feature-agnostic UI, errors, validation, query helpers, constants, utilities, types. |
| `src/store` | Redux store, root reducer, slices, sagas, typed hooks. |
| `src/styles` | Shared style groups that are not design-system primitives. |
| `src/types` | Global type declarations. |
| `src/utils` | App-level utilities such as scaling and normalization. |

## Module Structure

Every real business area should live in its own feature module:

```text
src/modules/<feature>
|-- application
|   |-- runtime.ts
|   `-- use-cases
|-- domain
|   |-- entities
|   `-- repositories
|-- infrastructure
|   |-- api
|   |-- dtos
|   |-- mappers
|   `-- repositories
|-- presentation
|   |-- components
|   |-- hooks
|   |-- mappers
|   |-- screens
|   `-- view-models
`-- index.ts
```

Add only folders the feature needs. Do not create empty layers only for appearance.

## Module Ownership Map

Place screens by responsibility, not by Figma file name, app name, brand name, or temporary page name.

| Module | Owns |
| --- | --- |
| `auth` | Sign in, sign up, forgot password, OTP, reset password, auth confirmation, auth policy screens. |
| `splash` | Branded splash, loading splash, get-started, onboarding splash screens. |
| `home` | Post-login dashboard, home tab, profile completion entry points. |
| `message` | Message home/list/detail/composer screens. |
| `more` | More tab menu and secondary flow entry screen. |
| `profile` | Profile screen and profile section view models. |
| `policy` | Privacy policy, terms, CMS/legal text screens. |
| `access` | Shared-access, delegated-access, trusted-access screens. |
| Existing business modules | Keep each existing business domain in its own module. |

If one Figma file contains splash, sign-in, and home screens, split them into `splash`, `auth`, and `home`.

## Architecture Direction

```text
presentation -> application -> domain <- infrastructure
```

| Layer | Can Depend On | Must Not Depend On |
| --- | --- | --- |
| `presentation` | Application/domain types, store actions/selectors, shared UI, design system, navigation types. | Raw HTTP clients, DTO parsing, storage internals. |
| `application` | Domain entities and repository contracts. | React, React Native UI, navigation. |
| `domain` | Pure TypeScript entities, value objects, repository contracts. | API clients, Redux, storage, React, platform APIs. |
| `infrastructure` | Domain contracts, DTOs, mappers, governed API client, services. | Screens and presentation components. |
| `store` | Module use cases, shared errors, logger. | Feature screen internals or infrastructure API wrappers directly from UI. |
| `services` | Shared config, security, storage, platform APIs. | Feature presentation internals. |

## Store Baseline

Reducers and sagas stay in `src/store`, not inside modules.

```text
src/store
|-- hooks.ts
|-- index.ts
|-- rootReducer.ts
|-- store.ts
|-- sagas
|   |-- rootSaga.ts
|   `-- <feature>Saga.ts
`-- slices
    `-- <feature>Slice.ts
```

Modules may re-export store actions, selectors, reducer, and public types from `src/modules/<feature>/index.ts`, but source files stay centralized.

## API Baseline

Use the Janitorial API foundation from `doc/API_STRUCTURE.md`.

Required base files:

```text
src/services/api
|-- apiClient.ts
|-- apiEndpoints.ts
|-- apiError.ts
|-- client
|   |-- apiClient.ts
|   `-- sendMultipartRequest.ts
|-- error-mapping
|   `-- mapApiError.ts
|-- interceptors
|   |-- authTokenInterceptor.ts
|   |-- errorResponseInterceptor.ts
|   `-- refreshTokenInterceptor.ts
`-- serializers
    `-- jsonSerializer.ts
```

The API client must handle base URL, headers, request timeout, global loader, auth token attachment, development request logging, token refresh/retry, session expiry, sanitized logger output, analytics/performance hooks, and app error mapping.

## Navigation Baseline

```text
src/navigation
|-- deep-links
|-- flows
|-- guards
|-- root
`-- route-types
```

Rules:

- Route names are constants, not inline strings.
- Param lists live in `src/navigation/route-types`.
- Root navigation composes public/private flow navigators.
- Navigators import screens from module public exports.
- Do not pass secrets, large objects, backend DTOs, or raw API responses through route params.

## Theme And UI Baseline

```text
src/design-system
|-- components
|   |-- primitives
|   `-- composites
|-- icons
|-- patterns
|-- theme
`-- tokens
```

Rules:

- Use semantic tokens for colors, spacing, radius, typography, elevation.
- Keep brand-specific values isolated in tokens/theme.
- Use `src/shared/ui` for generic feedback/forms/states.
- Use `src/components` for reusable app components that are not formal design-system primitives.
- Keep feature-only UI inside `src/modules/<feature>/presentation/components`.

## Hooks Rules

| Hook Type | Location |
| --- | --- |
| App-wide reusable hook | `src/hooks` |
| Public feature hook reused outside presentation | `src/modules/<feature>/hooks` |
| Screen/view-model hook | `src/modules/<feature>/presentation/hooks` |
| Service subscription hook | Near the owning service or shared hook folder |

Hooks should be focused, side-effect aware, and extracted when repeated behavior is reused two or more times or when a screen model becomes too large.

## Utilities Rules

- Keep app-level utilities in `src/utils`.
- Keep feature-agnostic shared utilities in `src/shared/utils`.
- Prefer `spacing`, `radius`, and `fontSize` helpers over raw normalization calls in UI.
- Avoid local aliases such as `const n = normalize`.
- Keep utility functions pure and framework-agnostic when possible.

## Tests

```text
tests
|-- components
|-- modules
|   `-- <feature>
`-- services
    `-- <service-area>
```

Minimum coverage when adding a feature/API:

- API wrapper: method, endpoint, payload, error mapping.
- Mapper: null handling, normalization, request payload shaping.
- State: request/success/failure transitions and selectors.
- Hook/screen: important rendering and user interaction behavior.
- Mock network and time when needed for deterministic tests.

## Completion Checklist

Before finishing base setup or structural work, confirm:

1. Root source folders from the Expo template were removed or ignored.
2. Application source lives under `src`.
3. Root `doc` is the only architecture documentation folder.
4. Feature modules follow `application/domain/infrastructure/presentation`.
5. Reducers and sagas live centrally in `src/store`.
6. API foundation follows Janitorial-style `apiClient`, interceptors, logger, loader, refresh, and error mapping.
7. Navigation uses typed route constants and param lists.
8. Theme, assets, components, hooks, services, and utilities use the ownership rules above.
9. Tests mirror production ownership.
10. `npm run typecheck` and `npm run lint` were run when available.
