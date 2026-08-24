# Implement API

Use this master file when a developer provides cURL, Swagger/OpenAPI notes, Postman details, endpoint notes, or backend response examples. It orchestrates Finalwish-style feature/module structure with Janitorial-style API client, logger, interceptor, token refresh, loader, and error mapping behavior.

Developers should be able to mention only this file for API implementation. If they mention `API_STRUCTURE.md` directly, follow `doc/API_STRUCTURE.md` first and use this file for feature/store/module wiring.

## Developer Prompt

```txt
I need to implement this API.

Please follow ImplementApi.md from the doc folder and implement the API using the same service layer, hooks structure, response handling, error management, loading flow, and state management architecture used in this project.

API cURL:
[paste curl here]

Use this API in:
[screen/module name]
```

If cURL is unavailable, paste:

- HTTP method.
- Endpoint path.
- Headers.
- Request params/body.
- Success response example.
- Error response example.
- Auth requirements.
- Pagination/streaming rules if any.
- Target screen/module.

## Execution Order

1. Parse the cURL/API documentation.
2. Identify auth requirements, method, endpoint, params, body, response, errors, and target screen/module.
3. Read `doc/API_STRUCTURE.md` and use the Janitorial API client/interceptor/logger/error pattern.
4. Resolve the target feature using the rules below.
5. Inspect existing module files, store slice, saga, endpoints, API wrappers, DTOs, mappers, repositories, use cases, presentation hooks, and tests.
6. Add endpoint constants.
7. Add DTOs and mapper.
8. Add infrastructure API wrapper using governed `apiClient` or multipart helper.
9. Add repository contract and implementation.
10. Add use case and update `application/runtime.ts`.
11. Add or update central store slice and saga.
12. Register reducer and saga.
13. Update module public exports.
14. Update presentation hook/screen wiring while preserving UI.
15. Add success/error feedback where user-visible.
16. Add or update tests.
17. Run verification.

## Target Resolution

Use these rules in order:

1. If `Use this API in` includes an explicit file path or folder path, update that location.
2. If it includes a feature/module/screen name, update that feature.
3. If no target is given, infer the feature from the endpoint resource:
   - `/v1/auth/login` -> `auth`
   - `/v1/profile/details` -> `profile`
   - `/v1/legal-financial/assets` -> `legal-financial`
4. If the target feature already has `src/store/slices/<feature>Slice.ts` and `src/store/sagas/<feature>Saga.ts`, extend those files.
5. If the feature exists but has no API/store flow yet, add the required module layers and central store files.
6. If the feature does not exist, create `src/modules/<feature>` using the Finalwish module structure.

Naming:

- Module folder: `src/modules/<feature>` in kebab-case.
- Slice file: `src/store/slices/<feature>Slice.ts`.
- Saga file: `src/store/sagas/<feature>Saga.ts`.
- API wrapper: `src/modules/<feature>/infrastructure/api/<feature>Api.ts`.
- DTO: `src/modules/<feature>/infrastructure/dtos/<Feature>Dto.ts`.
- Mapper: `src/modules/<feature>/infrastructure/mappers/<feature>Mapper.ts`.
- Repository contract: `src/modules/<feature>/domain/repositories/<Feature>Repository.ts`.
- Repository implementation: `src/modules/<feature>/infrastructure/repositories/<Feature>RepositoryImpl.ts`.
- Use case: `src/modules/<feature>/application/use-cases/<Action><Feature>UseCase.ts`.
- Actions: endpoint-intent based, for example `fetchProfileRequested`, `createMessageRequested`, `updatePolicyRequested`.

## Required Output Structure

Store files are central:

```text
src/store
|-- slices
|   `-- <feature>Slice.ts
|-- sagas
|   |-- <feature>Saga.ts
|   `-- rootSaga.ts
`-- rootReducer.ts
```

Module files follow clean architecture:

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
|   |-- hooks
|   |-- mappers
|   |-- screens
|   `-- view-models
`-- index.ts
```

Add `presentation/screens` only when API work also introduces a new screen. For APIs used by existing screens, update the existing screen and its presentation hook/view model without redesigning the UI.

## Required API Flow

```text
screen or presentation hook
`-- dispatch(loadFeatureRequested(payload))
    `-- src/store/sagas/<feature>Saga.ts
        |-- call featureUseCases.loadFeature.execute(payload)
        |-- put(loadFeatureSucceeded(domainData))
        `-- put(loadFeatureFailed(appError.userMessage))
            `-- application/use-cases
                `-- domain repository contract
                    `-- infrastructure repository
                        `-- infrastructure API wrapper
                            `-- governed apiClient / sendMultipartRequest
```

Screens and hooks must not import or call infrastructure API wrappers, repositories, `apiClient`, or raw `fetch` directly.

## API Client Requirements

All wrappers must follow `doc/API_STRUCTURE.md`:

- Use `src/services/api/client/apiClient.ts` for normal JSON APIs.
- Use `src/services/api/client/sendMultipartRequest.ts` for multipart uploads only when the project/platform requires the Janitorial Android-safe fetch fallback.
- Add paths to `src/services/api/apiEndpoints.ts`.
- Let the governed API client trigger `GlobalApiLoader`.
- Let interceptors attach auth tokens unless `metadata.skipAuthToken` is set.
- Let the error interceptor handle token refresh/retry unless `metadata.skipAuthRefresh` is set.
- Let `mapApiError` convert transport errors into `AppError` subclasses.
- Use shared `logger`/observability services for safe logging.
- Never log sensitive payloads, tokens, OTPs, passwords, auth headers, or raw sensitive responses.

## Feature API Wrapper Pattern

```ts
import { API } from '@/services/api/apiEndpoints';
import { apiClient } from '@/services/api/client/apiClient';
import { mapApiError } from '@/services/api/error-mapping/mapApiError';

import type { FeatureResponseDto } from '../dtos/FeatureDto';

export const featureApi = {
  async fetchFeature(): Promise<FeatureResponseDto> {
    try {
      const response = await apiClient.get<FeatureResponseDto>(API.feature.resource);
      return response.data;
    } catch (error) {
      throw mapApiError(error);
    }
  },
};
```

Multipart wrapper pattern:

```ts
import { API } from '@/services/api/apiEndpoints';
import { sendMultipartRequest } from '@/services/api/client/sendMultipartRequest';

export const featureApi = {
  uploadFeature(formData: FormData): Promise<FeatureResponseDto> {
    return sendMultipartRequest<FeatureResponseDto>({
      formData,
      method: 'POST',
      url: API.feature.upload,
    });
  },
};
```

## DTO, Mapper, Repository, Use Case

Rules:

- DTOs model raw backend shape exactly.
- Domain entities model app-safe data.
- Mappers convert DTOs to domain entities and normalize nulls, missing arrays, booleans, IDs, dates, pagination, and nested objects.
- Request mappers convert form/domain data to backend payloads when needed.
- Repositories return domain data, not DTOs.
- Use cases expose a single `execute` method.
- Runtime composition wires repository implementations to use-case instances.

## Store Rules

- Async state lives in `src/store/slices/<feature>Slice.ts`.
- Saga side effects live in `src/store/sagas/<feature>Saga.ts`.
- Register every reducer in `src/store/rootReducer.ts`.
- Register every saga in `src/store/sagas/rootSaga.ts`.
- Re-export public actions, selectors, reducer, screens, and public types from `src/modules/<feature>/index.ts`.
- Do not create reducers or sagas inside `src/modules/<feature>`.
- Keep public feature hooks in `src/modules/<feature>/hooks` only when reused outside presentation.
- For repeated APIs in the same feature, keep using the same `<feature>Slice.ts` and `<feature>Saga.ts`; add new request/success/failure action groups and saga handlers there.

## Redux Action Logger

API implementation work should preserve Janitorial-style Redux action logs in development. The console should show dispatched actions like:

```text
action     {type: 'auth/forgotPasswordRequested', payload: {...}}
action     {type: 'auth/forgotPasswordSucceeded', payload: '...'}
```

This comes from `redux-logger`. If the target project does not have it, install it:

```bash
npm install redux-logger@^3.0.6
```

Then configure `src/store/store.ts` with development-only middleware:

```ts
import { configureStore, type Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const createDevelopmentReduxLogger = (): Middleware | null => {
  if (!__DEV__) {
    return null;
  }

  const { createLogger } = require('redux-logger') as {
    createLogger: (options?: Record<string, unknown>) => Middleware;
  };

  return createLogger({
    collapsed: false,
    duration: true,
    predicate: () => __DEV__,
  });
};
const developmentReduxLogger = createDevelopmentReduxLogger();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sagaMiddleware,
      ...(developmentReduxLogger ? [developmentReduxLogger] : []),
    ),
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);
```

Keep Redux action logging behind `__DEV__`; never enable it for production builds.

## Slice Shape

Use clear async status fields. Split load/save status when a feature has both reads and mutations.

```ts
export type FeatureAsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface FeatureState {
  data: FeatureEntity | null;
  loadStatus: FeatureAsyncStatus;
  loadErrorMessage: string | null;
  saveStatus: FeatureAsyncStatus;
  saveErrorMessage: string | null;
}
```

Common actions:

```text
loadFeatureRequested
loadFeatureSucceeded
loadFeatureFailed
saveFeatureRequested
saveFeatureSucceeded
saveFeatureFailed
clearFeatureState
```

Selectors should be exported from the slice and re-exported from the module public API.

## Saga Pattern

Use Redux Saga generator functions. Do not create custom async dispatcher patterns such as `AppSaga`, `SagaDispatch`, manual `RootAction` guards, or `void runFeature(...)`.

```ts
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { featureUseCases } from '@/modules/<feature>/application/runtime';
import { logger } from '@/services/observability/logger/logger';
import { toAppError } from '@/shared/core/errors/AppError';

import {
  loadFeatureFailed,
  loadFeatureRequested,
  loadFeatureSucceeded,
  type LoadFeatureRequestedPayload,
} from '../slices/<feature>Slice';

function* handleLoadFeature(
  action: PayloadAction<LoadFeatureRequestedPayload>
): SagaIterator {
  try {
    const result: FeatureEntity = yield call(
      [featureUseCases.loadFeature, featureUseCases.loadFeature.execute],
      action.payload
    );

    yield put(loadFeatureSucceeded(result));
  } catch (error) {
    const appError = toAppError(error);

    logger.warn('Load feature failed', {
      code: appError.code,
      details: appError.details,
      scope: 'featureSaga',
    });
    yield put(loadFeatureFailed(appError.userMessage));
  }
}

export function* featureSaga() {
  yield takeLatest(loadFeatureRequested.type, handleLoadFeature);
}
```

Required registration:

```ts
import { all } from 'redux-saga/effects';

import { featureSaga } from './featureSaga';

export function* rootSaga() {
  yield all([
    featureSaga(),
  ]);
}
```

## Presentation Hook Rules

Create a presentation hook when a screen needs a screen model:

```text
src/modules/<feature>/presentation/hooks/use<Feature>ScreenModel.ts
```

The hook should:

- Select state with typed app selectors.
- Dispatch request actions with typed app dispatch.
- Expose loading, error, data, callbacks, and derived view state.
- Trigger initial load or submit actions when appropriate.
- Clear stale errors when a new request starts.
- Avoid direct API wrapper, repository, or raw use-case calls for UI-triggered API flows.
- Keep screen components focused on rendering.

## Loading And Feedback UX

- Use `GlobalApiLoader` for request lifecycle through the governed API client.
- Use local `status` or `isPending` state for button disabling, inline skeletons, or screen-specific UX.
- Store `errorMessage` as a user-safe string.
- Show success feedback for successful mutation/submit flows when the user needs confirmation.
- Show error feedback for failed request paths using mapped app errors.
- Use shared snackbar/toast/feedback utilities; do not create one-off message systems.
- Handle mapped API errors gracefully without breaking layout.

## UI Preservation Rules

When wiring API functionality into an existing screen:

- Do not change existing UI design, layout, styling, UX structure, or visual hierarchy unless the user explicitly asks for UI changes.
- Limit changes to data flow, loading state, disabled state, validation, success/error feedback, and safe state handling.
- Do not replace existing components as a side effect of API work.

## Security And Observability Rules

- Never log tokens, passwords, OTPs, auth headers, raw sensitive payloads, or sensitive responses.
- Use shared `logger` so context is sanitized.
- Use `mapApiError`/`toAppError` before putting user-facing errors in state.
- Preserve correlation IDs and status codes in error details.
- Let API interceptors record request duration and analytics/performance events when those services exist.
- Auth/session APIs must update secure/session storage and global auth state consistently.
- Session expiry must clear session storage and return the app to the unauthenticated flow through the shared auth lifecycle.

## Tests

Add focused tests when test infrastructure exists:

```text
tests/modules/<feature>
|-- <feature>Api.test.ts
|-- <feature>Mapper.test.ts
|-- <feature>Slice.test.ts
`-- <feature>Hook.test.tsx
```

Minimum coverage:

- API wrapper method, endpoint, request payload, metadata, auth/multipart behavior when relevant.
- Mapper success, null handling, malformed response handling, request payload shaping.
- Slice request/success/failure transitions and selectors.
- Saga success and failure behavior when saga tests exist.
- Hook/screen important user interaction behavior.

## Verification Checklist

Run when available:

```bash
npm run typecheck
npm run lint
```

Confirm:

1. Endpoint is registered in `apiEndpoints.ts`.
2. API wrapper uses governed `apiClient` or approved multipart helper.
3. DTO, mapper, repository, use case, slice, and saga exist where needed.
4. Reducer and saga are registered.
5. `redux-logger` is installed and configured in development so Redux actions print as `action { type, payload }`.
6. Module public exports are updated.
7. Screen/hook dispatches store actions instead of calling APIs directly.
8. Existing UI is preserved unless UI changes were requested.
9. Success and failure feedback paths are handled.
10. Sensitive data is not logged.
11. Tests cover success and at least one failure path when feasible.
