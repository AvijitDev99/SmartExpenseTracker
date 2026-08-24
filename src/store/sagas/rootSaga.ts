import { all } from 'redux-saga/effects';

import { authSaga } from './authSaga';
import { homeSaga } from './homeSaga';

export function* rootSaga() {
  yield all([
    authSaga(),
    homeSaga(),
  ]);
}
