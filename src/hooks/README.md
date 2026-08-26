# hooks

Reusable custom React hooks, one file per hook, named `useSomething.ts`.

Put a hook here when two or more screens need the same stateful logic — for example
`useKeyboard.ts`, `useExpenses.ts`, `useDebouncedValue.ts`.

If only one screen uses it, keep it inside that screen file instead.
