# services

Talking to the outside world lives here: HTTP calls, device storage, third-party SDKs.

The app currently runs on mock data from `src/constants/mockData.ts`, so this folder is empty.
When the backend arrives, add flat files such as:

```text
src/services/
├── api.ts              # axios/fetch instance + base URL
├── expenseService.ts   # getExpenses(), createExpense(), ...
└── storage.ts          # AsyncStorage / SecureStore wrappers
```

Keep it flat. No repositories, DTO/mapper layers, or use-case classes.
Screens and hooks call these functions directly.
