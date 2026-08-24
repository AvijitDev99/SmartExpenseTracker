# API Structure

Use this master file when a developer says to follow `API_STRUCTURE.md` with an API/cURL. The project structure should remain Finalwish-style, but the API calling foundation must follow the Janitorial project pattern from `/Users/wtsuser/Desktop/newV/Janitorial`.

The API architecture must ensure every request uses the same base URL, headers, auth token handling, token refresh/retry, loading behavior, error mapping, sanitized logging, telemetry hooks, response normalization, and multipart fallback behavior.

## Developer Prompt

```txt
Please follow API_STRUCTURE.md from the doc folder and implement this API using the same API client, logger, interceptor, token refresh, error mapping, DTO, mapper, repository, use-case, saga, and loading architecture used in this project.

API cURL:
[paste curl here]

Use this API in:
[screen/module name]
```

## API Folder Structure

Use this Janitorial-style API foundation:

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

Global API loading and feedback live outside the API folder:

```text
src/services/ui
|-- globalLoader
|   `-- globalLoaderService.ts
`-- snackbar
    `-- globalSnackbarService.ts

src/shared/ui
|-- GlobalApiLoader.tsx
|-- GlobalSnackbar.tsx
`-- feedback
    `-- InlineFeedbackMessage.tsx
```

Observability and storage used by API calls:

```text
src/services/observability
|-- developmentLogging.ts
|-- logger
|   `-- logger.ts
|-- analytics
|-- events
`-- performance

src/services/storage
|-- sessionStorage.ts
`-- authSessionSnapshotStorage.ts

src/shared/core/errors
`-- AppError.ts
```

Feature API wrapper files live in:

```text
src/modules/<feature>/infrastructure/api/<feature>Api.ts
```

## Public API Client Export

Keep a short public re-export:

```ts
export { apiClient } from '@/services/api/client/apiClient';
```

Feature wrappers should import from the canonical governed client path used by the project. Prefer `@/services/api/client/apiClient` when adding new wrappers unless the project has standardized on the public re-export.

## Governed Axios Client

`src/services/api/client/apiClient.ts` owns the configured Axios instance.

Required behavior:

- `baseURL` comes from `env.apiBaseUrl`.
- Default headers include `Accept: application/json`, `Content-Type: application/json`, `X-App-Environment: env.appEnv`, and `X-App-Platform: Platform.OS`.
- Timeout comes from `runtimeConfig.network.requestTimeoutMs`.
- Request lifecycle is wrapped by request/response interceptors.
- Request start triggers `globalLoaderService.beginRequest()` unless `config.metadata.skipGlobalLoader` is true.
- Response success and response error both call `globalLoaderService.endRequest()` when the loader was started.
- FormData requests remove JSON `Content-Type` so the native boundary can be set correctly.
- Development request logging records the resolved request URL in dev only.
- Auth token attachment runs after compliance/request preparation.
- Error responses first attempt token refresh/retry when eligible, then map/log/reject app errors.

## Axios Metadata Flags

Support request metadata flags:

| Metadata | Purpose |
| --- | --- |
| `skipGlobalLoader` | Prevents global loader for documented background/inline requests. |
| `skipAuthToken` | Sends request without attaching bearer token. |
| `skipAuthRefresh` | Prevents token refresh retry for a request. |
| `hasRetriedWithRefresh` | Internal guard to prevent infinite refresh loops. |
| `startedAt` | Internal timestamp used for duration/performance logging. |

Do not add new metadata flags unless they have a documented API-client behavior.

## Request Interceptor Flow

```text
apiClient request
|-- if !metadata.skipGlobalLoader -> globalLoaderService.beginRequest()
|-- if FormData -> remove Content-Type/content-type
|-- developmentLogging.logApiRequest(config)
`-- attachAuthTokenInterceptor(config)
    |-- prepare request for compliance if the project has compliance interceptors
    |-- set metadata.startedAt
    |-- if metadata.skipAuthToken -> return config
    |-- read access token from sessionStorage
    `-- set Authorization: Bearer <accessToken>
```

Sensitive payloads, passwords, OTPs, tokens, and raw auth headers must not be logged.

## Response Success Flow

```text
apiClient response success
|-- if loader was shown -> globalLoaderService.endRequest()
`-- handleSuccessfulResponse(response)
    |-- compute operation: METHOD url
    |-- compute duration from metadata.startedAt
    |-- performanceMonitor.recordApiLatency(...)
    `-- analyticsService.track(apiRequestCompleted, ...)
```

If analytics/performance services are not installed yet, create safe no-op placeholders rather than removing the API hooks.

## Response Error Flow

```text
apiClient response error
|-- if loader was shown -> globalLoaderService.endRequest()
|-- tryRefreshAndRetryRequest(error, retryRequest)
|   |-- only for 401
|   |-- only when request had Authorization
|   |-- not for refresh endpoint
|   |-- not when skipAuthRefresh is true
|   |-- not when hasRetriedWithRefresh is true
|   |-- queues parallel 401 requests behind one refresh call
|   `-- retries queued requests with new token on success
`-- handleErrorResponse(error)
    |-- mapApiError(error)
    |-- expire authenticated session when required
    |-- reset global loader on session expiry
    |-- record performance/analytics failure
    |-- logger.warn('API request failed', safe context)
    `-- reject AppError
```

## Token Refresh Rules

`refreshTokenInterceptor.ts` must:

- Use a separate Axios refresh client with the same base URL, env/platform headers, and timeout.
- Read refresh token from `sessionStorage`.
- Call `API.auth.refresh`.
- Parse access token and refresh token defensively from top-level or nested response data.
- Store refreshed tokens in `sessionStorage`.
- Update `authSessionSnapshotStorage` when a snapshot exists.
- Queue concurrent 401 requests while one refresh request is in progress.
- Mark retried requests with `metadata.hasRetriedWithRefresh`.
- Set the new Authorization header before retrying.
- Expire the authenticated session if refresh token is missing, refresh fails, or the response does not include an access token.
- Log refresh lifecycle events only in dev and only with safe metadata.

## Session Expiry Rules

`errorResponseInterceptor.ts` must:

- Map transport errors with `mapApiError`.
- Treat authenticated `401` responses as session expiry when the original request had Authorization or a stored access token exists.
- Clear `sessionStorage` and `authSessionSnapshotStorage`.
- Reset `globalLoaderService`.
- Emit an unauthorized lifecycle event for root/auth navigation to consume.
- Prevent duplicate expiry handling for the same expired session.
- Expose `authApiLifecycle.markSessionActive()` and `authApiLifecycle.subscribeUnauthorized(...)`.

## Error Mapping

`mapApiError(error)` converts unknown transport errors to `AppError` subclasses:

| Condition | App Error |
| --- | --- |
| No Axios response | `NetworkError` with user-safe network message. |
| `400` or `422` | `ValidationError` with backend message when safe. |
| `401` | `AuthenticationError` with session-expired user message. |
| `403` | `AuthorizationError`. |
| `>= 500` | `ServerError` with temporary-unavailable user message. |
| Other Axios error | `UnknownAppError`. |
| Non-Axios `Error` | `UnknownAppError(error.message)`. |
| Unknown value | `UnknownAppError`. |

Error details should include status and correlation ID from payload or `x-correlation-id` header when present.

## App Error Types

`src/shared/core/errors/AppError.ts` must define reusable app errors:

```text
AppError
|-- ValidationError
|-- AuthenticationError
|-- AuthorizationError
|-- NetworkError
|-- ServerError
|-- BusinessRuleError
`-- UnknownAppError
```

Each error carries:

- `code`
- `message`
- `userMessage`
- `details`
- `cause`

Also provide helpers such as `toAppError(error)`, `createHandledSessionExpiredError()`, and `isHandledSessionExpiredError(error)` when session expiry needs special UI handling.

## Logger Rules

Use the shared logger, not raw console calls, outside development-only diagnostics.

Required logger behavior:

- `logger.info`, `logger.warn`, and `logger.error`.
- Sanitize context through the project redaction helper before output.
- Suppress production console output when policy requires it.
- Send errors to crash reporting through `logger.error`.
- API failures use `logger.warn('API request failed', { code, details, message })`.
- Saga failures use `logger.warn('<Feature> failed', { code, details, scope })`.

Never log tokens, passwords, OTPs, raw authorization headers, complete request payloads containing sensitive data, or unredacted backend responses.

## Redux Action Logger

Development builds must include Janitorial-style Redux action logging so every dispatched action is visible in the console, for example:

```text
action     {type: 'auth/forgotPasswordRequested', payload: {...}}
action     {type: 'auth/forgotPasswordSucceeded', payload: '...'}
```

This log is produced by `redux-logger`, not by the shared `logger` service or API logging utilities.

If `redux-logger` is not installed in the target project, install it before wiring the store:

```bash
npm install redux-logger@^3.0.6
```

Configure `src/store/store.ts` with development-only middleware:

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

Keep this middleware development-only. Do not enable Redux action logging in production builds.

## Development API Logging

`developmentLogging` may log resolved API request URLs in `__DEV__` only. Keep it small and safe:

- Log method/URL or URL only.
- Do not log request bodies by default.
- Do not log tokens or auth headers.
- Keep one-off diagnostics behind `__DEV__`.

## Multipart Requests

Use the governed Axios client for normal JSON APIs. For multipart upload APIs, follow Janitorial's Android-safe fetch helper when needed:

```text
src/services/api/client/sendMultipartRequest.ts
```

Required behavior:

- Build full URL from `env.apiBaseUrl` plus API path.
- Add `Accept`, `X-App-Environment`, and `X-App-Platform` headers.
- Add `Authorization` from `sessionStorage` when `requireAuth` is true.
- Do not manually force multipart `Content-Type`.
- Use an abort timeout for long uploads.
- Parse JSON response when possible.
- Map `400`, `413`, `422`, `401`, `403`, `>=500`, network, and unknown failures to `AppError` subclasses.
- Include `transport: 'fetch_multipart_android'` or equivalent in details when using this fallback.
- Provide `shouldUseFetchForMultipartOnAndroid()` when the platform-specific decision is needed.

## Endpoint Registry

All endpoint paths live in `src/services/api/apiEndpoints.ts`.

```ts
export const API = {
  auth: {
    refresh: 'v1/auth/refresh',
  },
  feature: {
    resource: 'v1/<resource>',
    resourceById: (id: string) => `v1/<resource>/${id}`,
  },
} as const;
```

Rules:

- Keep paths discoverable by feature/resource.
- Use functions for path params.
- Do not build endpoint strings inline in screens or hooks.
- Keep API version prefixes consistent.

## Feature API Wrapper

Feature wrappers are low-level HTTP adapters only. They must not orchestrate screen state.

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

For multipart APIs, call `sendMultipartRequest<T>()` only where the project/platform requires it; otherwise use `apiClient`.

## Clean API Execution Flow

UI-triggered API work must go through Redux Saga:

```text
screen or presentation hook
`-- dispatch(loadFeatureRequested(payload))
    `-- src/store/sagas/<feature>Saga.ts
        |-- yield call([featureUseCases.loadFeature, featureUseCases.loadFeature.execute], payload)
        |-- yield put(loadFeatureSucceeded(domainData))
        `-- yield put(loadFeatureFailed(appError.userMessage))
            `-- src/modules/<feature>/application/use-cases
                `-- repository contract
                    `-- infrastructure repository
                        `-- infrastructure API wrapper
                            `-- governed apiClient / sendMultipartRequest
```

Screens and presentation hooks must not call `apiClient`, feature API wrappers, infrastructure repositories, or raw `fetch` directly.

## Feature Target Resolution

Use these rules in order:

1. If the user provides a feature/module/screen target, update that feature.
2. If the user provides a path, update that exact module/path.
3. If no target is provided, infer `<feature>` from the endpoint resource name.
4. If the feature exists, extend the same module, slice, saga, runtime, repository, mapper, and API wrapper.
5. If the feature does not exist, create `src/modules/<feature>` using the standard module structure.
6. Create a new `src/store/slices/<feature>Slice.ts` and `src/store/sagas/<feature>Saga.ts` only when that feature does not already have store files.

## Response Handling

- DTOs model raw backend request/response shape.
- Mappers convert DTOs into safe domain entities.
- Normalize optional strings, arrays, IDs, booleans, date values, pagination, and nested objects.
- Throw mapped app errors when required fields are missing.
- Repositories return domain data, not DTOs.
- Screen view models must not expose backend DTOs.
- Keep response mapping centralized in infrastructure mappers or API-specific mappers.

## API Flow Documentation

Document API flows when they affect startup, root app state, auth/session state, navigation, or multiple screens.

Capture:

- endpoint and method
- purpose
- trigger point
- request payload/params
- auth/session requirements
- response mapping
- saved state mapping
- consuming screens or services
- success behavior
- failure behavior
- pagination/streaming behavior when relevant
- test coverage

## API Implementation Checklist

1. Add or update endpoint constants.
2. Add request/response DTOs.
3. Add or update API wrapper using governed `apiClient` or `sendMultipartRequest`.
4. Add mapper.
5. Add repository contract and implementation.
6. Add use case and update `application/runtime.ts`.
7. Add or update `src/store/slices/<feature>Slice.ts`.
8. Add or update `src/store/sagas/<feature>Saga.ts`.
9. Register reducer in `src/store/rootReducer.ts`.
10. Register saga in `src/store/sagas/rootSaga.ts`.
11. Confirm `redux-logger` is installed and configured in development so Redux actions print as `action { type, payload }`.
12. Re-export public actions/selectors/reducer/types from `src/modules/<feature>/index.ts`.
13. Add or update presentation hook that dispatches actions and selects state.
14. Preserve existing UI unless UI changes were requested.
15. Add success/error feedback through shared snackbar/feedback utilities when user-visible.
16. Add tests for API wrapper, mapper, state transitions, success path, and failure path.
17. Confirm no sensitive data is logged.
