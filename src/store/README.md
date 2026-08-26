# store

Application state that outlives a single screen, plus local-database access.

The app currently holds no shared state — every screen is self-contained and reads
`src/constants/mockData.ts` — so this folder is empty.

When state is needed, add one file per domain, e.g.:

```text
src/store/
├── expenseStore.ts
└── userStore.ts
```

Pick the simplest tool that works (React Context, Zustand, or Redux Toolkit) and keep the
slice/store definition, its selectors, and its actions in the same file.
