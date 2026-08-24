import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { HomeInsightCard } from '@/modules/home/domain/HomeInsightCard';

import type { RootState } from '../rootReducer';

interface HomeState {
  errorMessage: string | null;
  hasSharedWishesAccess: boolean;
  hasVerifiedDeceasedStatus: boolean;
  insightCards: HomeInsightCard[];
  profileCompletionPercentage: number;
  profileImageUrl: string;
  status: 'failed' | 'idle' | 'loading' | 'ready';
}

const initialState: HomeState = {
  errorMessage: null,
  hasSharedWishesAccess: false,
  hasVerifiedDeceasedStatus: false,
  insightCards: [],
  profileCompletionPercentage: 35,
  profileImageUrl: '',
  status: 'idle',
};

const homeSlice = createSlice({
  initialState,
  name: 'home',
  reducers: {
    loadHomeFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.status = 'failed';
    },
    loadHomeRequested(state) {
      state.errorMessage = null;
      state.status = 'loading';
    },
    loadHomeSucceeded(state, action: PayloadAction<HomeInsightCard[]>) {
      state.errorMessage = null;
      state.insightCards = action.payload;
      state.status = 'ready';
    },
    resetHomeProfileCompletionPercentage(state) {
      state.hasSharedWishesAccess = false;
      state.hasVerifiedDeceasedStatus = false;
      state.profileCompletionPercentage = 35;
      state.profileImageUrl = '';
    },
    setHomeProfileDetails(
      state,
      action: PayloadAction<{
        hasSharedWishesAccess: boolean;
        hasVerifiedDeceasedStatus: boolean;
        profileCompletionPercentage: number;
        profileImageUrl: string;
      }>,
    ) {
      state.hasSharedWishesAccess = Boolean(action.payload.hasSharedWishesAccess);
      state.hasVerifiedDeceasedStatus = Boolean(action.payload.hasVerifiedDeceasedStatus);
      state.profileCompletionPercentage = Math.max(
        0,
        Math.min(100, Math.round(action.payload.profileCompletionPercentage)),
      );
      state.profileImageUrl = action.payload.profileImageUrl.trim();
    },
    setHomeProfileCompletionPercentage(state, action: PayloadAction<number>) {
      state.profileCompletionPercentage = Math.max(0, Math.min(100, Math.round(action.payload)));
    },
    setHomeProfileImageUrl(state, action: PayloadAction<string>) {
      state.profileImageUrl = action.payload.trim();
    },
  },
});

export const {
  loadHomeFailed,
  loadHomeRequested,
  loadHomeSucceeded,
  resetHomeProfileCompletionPercentage,
  setHomeProfileDetails,
  setHomeProfileCompletionPercentage,
  setHomeProfileImageUrl,
} = homeSlice.actions;

export const selectHomeState = (state: RootState): HomeState => state.home;
export const selectHomeInsightCards = (
  state: RootState,
): HomeInsightCard[] => state.home.insightCards;
export const selectHomeStatus = (state: RootState): HomeState['status'] =>
  state.home.status;
export const selectHomeProfileCompletionPercentage = (
  state: RootState,
): number => state.home.profileCompletionPercentage;
export const selectHomeProfileImageUrl = (state: RootState): string =>
  state.home.profileImageUrl;
export const selectHomeHasSharedWishesAccess = (state: RootState): boolean =>
  Boolean(state.home.hasSharedWishesAccess);
export const selectHomeHasVerifiedDeceasedStatus = (state: RootState): boolean =>
  Boolean(state.home.hasVerifiedDeceasedStatus);

export const homeReducer = homeSlice.reducer;
