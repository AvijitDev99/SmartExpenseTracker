import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { authUseCases } from '@/modules/auth/application/runtime';
import { homeUseCases } from '@/modules/home';
import type { ProfileCompletion } from '@/modules/home/domain/entities/ProfileDetails';
import { analyticsService } from '@/services/observability/analytics/analyticsService';
import { observabilityEvents } from '@/services/observability/events';
import { logger } from '@/services/observability/logger/logger';
import { toAppError } from '@/shared/core/errors/AppError';

import type { AuthSession } from '@/modules/auth/domain/entities/AuthSession';
import {
  resetHomeProfileCompletionPercentage,
  setHomeProfileDetails,
} from '../slices/homeSlice';
import {
  clearSession,
  setSessionError,
  signInCompleted,
  signInRequested,
  signOutRequested,
  type SignInRequestedPayload,
} from '../slices/authSlice';

function* handleSignIn(action: PayloadAction<SignInRequestedPayload>) {
  const { commitSession = true, credentials } = action.payload;

  try {
    const session: AuthSession = yield call(
      [authUseCases.loginUser, authUseCases.loginUser.execute],
      credentials,
    );

    yield put(signInCompleted({ commitSession, session }));
    yield call([analyticsService, analyticsService.track], observabilityEvents.authLoginSucceeded, {
      userId: session.user.id,
    });
    yield put(resetHomeProfileCompletionPercentage());

    try {
      const profileDetails: ProfileCompletion = yield call([
        homeUseCases.getProfileCompletion,
        homeUseCases.getProfileCompletion.execute,
      ]);
      yield put(
        setHomeProfileDetails({
          hasSharedWishesAccess: profileDetails.hasSharedWishesAccess,
          hasVerifiedDeceasedStatus: profileDetails.hasVerifiedDeceasedStatus,
          profileCompletionPercentage: profileDetails.percentage,
          profileImageUrl: profileDetails.profileImageUrl,
        }),
      );
    } catch (error) {
      const appError = toAppError(error);

      yield call([logger, logger.warn], 'Unable to fetch profile details after sign in.', {
        code: appError.code,
        details: appError.details,
        scope: 'authSaga',
      });
    }
  } catch (error) {
    const appError = toAppError(error);

    yield call([analyticsService, analyticsService.track], observabilityEvents.authLoginFailed, {
      code: appError.code,
    });
    yield call([logger, logger.warn], 'Login failed', {
      code: appError.code,
      details: appError.details,
    });
    yield put(setSessionError(appError.userMessage));
    yield call(
      [analyticsService, analyticsService.track],
      observabilityEvents.formValidationFailed,
      { formName: 'sign_in' },
    );
  }
}

function* handleSignOut() {
  try {
    yield call([authUseCases.signOutUser, authUseCases.signOutUser.execute]);
    yield put(clearSession());
    yield put(resetHomeProfileCompletionPercentage());
    yield call([analyticsService, analyticsService.track], observabilityEvents.authSignedOut, {
      reason: 'user_action',
    });
  } catch (error) {
    const appError = toAppError(error);

    yield call([logger, logger.warn], 'Sign out failed', {
      code: appError.code,
      details: appError.details,
      scope: 'authSaga',
    });
  }
}

export function* authSaga() {
  yield takeLatest(signInRequested.type, handleSignIn);
  yield takeLatest(signOutRequested.type, handleSignOut);
}
