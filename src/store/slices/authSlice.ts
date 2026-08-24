import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type {
  AuthSession,
  AuthenticatedUser,
  RestoredSession,
  SignInCredentials,
} from '@/modules/auth/domain/entities/AuthSession';
import { accessControlService } from '@/services/access-control/accessControlService';
import type { AccessContext } from '@/services/access-control/types';

import type { RootState } from '../rootReducer';

export interface SignInRequestedPayload {
  commitSession?: boolean;
  credentials: SignInCredentials;
}

type AuthStatus = 'anonymous' | 'authenticated' | 'idle' | 'loading';

interface AuthState {
  errorMessage: string | null;
  isHydrated: boolean;
  lastCompletedSession: AuthSession | null;
  status: AuthStatus;
  user: AuthenticatedUser | null;
}

const initialState: AuthState = {
  errorMessage: null,
  isHydrated: false,
  lastCompletedSession: null,
  status: 'idle',
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    clearSession(): AuthState {
      return {
        ...initialState,
        isHydrated: true,
        status: 'anonymous',
      };
    },
    clearSessionError(state) {
      state.errorMessage = null;
    },
    completeSessionHydration(state, action: PayloadAction<RestoredSession>) {
      state.errorMessage = null;
      state.isHydrated = true;
      state.lastCompletedSession = null;
      state.status = action.payload.isAuthenticated
        ? 'authenticated'
        : 'anonymous';
      state.user = action.payload.user;
    },
    resetLastCompletedSession(state) {
      state.lastCompletedSession = null;
    },
    setAuthenticatedSession(
      state,
      action: PayloadAction<{ user: AuthenticatedUser | null }>,
    ) {
      state.errorMessage = null;
      state.isHydrated = true;
      state.lastCompletedSession = null;
      state.status = 'authenticated';
      state.user = action.payload.user;
    },
    setAuthenticationPending(state) {
      state.errorMessage = null;
      state.lastCompletedSession = null;
      state.status = 'loading';
    },
    setSessionError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isHydrated = true;
      state.lastCompletedSession = null;
      state.status = 'anonymous';
      state.user = null;
    },
    signInCompleted(
      state,
      action: PayloadAction<{
        commitSession: boolean;
        session: AuthSession;
      }>,
    ) {
      state.errorMessage = null;
      state.isHydrated = true;
      state.lastCompletedSession = action.payload.session;
      state.status = action.payload.commitSession
        ? 'authenticated'
        : 'anonymous';
      state.user = action.payload.commitSession
        ? action.payload.session.user
        : null;
    },
    signInRequested(state, _action: PayloadAction<SignInRequestedPayload>) {
      state.errorMessage = null;
      state.lastCompletedSession = null;
      state.status = 'loading';
    },
    signOutRequested(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  clearSession,
  clearSessionError,
  completeSessionHydration,
  resetLastCompletedSession,
  setAuthenticatedSession,
  setAuthenticationPending,
  setSessionError,
  signInCompleted,
  signInRequested,
  signOutRequested,
} = authSlice.actions;

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectAuthErrorMessage = (state: RootState): string | null =>
  state.auth.errorMessage;
export const selectAuthIsHydrated = (state: RootState): boolean =>
  state.auth.isHydrated;
export const selectAuthStatus = (state: RootState): AuthStatus => state.auth.status;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.status === 'authenticated';
export const selectAuthenticatedUser = (
  state: RootState,
): AuthenticatedUser | null => state.auth.user;
export const selectLastCompletedSession = (
  state: RootState,
): AuthSession | null => state.auth.lastCompletedSession;
export const selectAccessContext = createSelector(
  [selectAuthState],
  (authState): AccessContext => {
    if (authState.status !== 'authenticated') {
      return accessControlService.buildGuestContext();
    }

    return accessControlService.buildAuthenticatedContext(
      authState.user?.roles,
      authState.user?.capabilities,
    );
  },
);

export const authReducer = authSlice.reducer;
