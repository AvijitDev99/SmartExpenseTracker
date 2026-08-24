import { call, put, takeLatest } from 'redux-saga/effects';

import { getHomeInsightCards } from '@/modules/home/application/getHomeInsightCards';
import { logger } from '@/services/observability/logger/logger';
import { toAppError } from '@/shared/core/errors/AppError';

import {
  loadHomeFailed,
  loadHomeRequested,
  loadHomeSucceeded,
} from '../slices/homeSlice';
import type { HomeInsightCard } from '@/modules/home/domain/HomeInsightCard';

function* handleLoadHome() {
  try {
    const cards: HomeInsightCard[] = yield call(getHomeInsightCards);

    yield put(loadHomeSucceeded(cards));
  } catch (error) {
    const appError = toAppError(error);

    yield call([logger, logger.warn], 'Unable to load home state.', {
      code: appError.code,
      details: appError.details,
      scope: 'homeSaga',
    });
    yield put(loadHomeFailed(appError.userMessage));
  }
}

export function* homeSaga() {
  yield takeLatest(loadHomeRequested.type, handleLoadHome);
}
