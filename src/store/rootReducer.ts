import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { deviceReducer } from './slices/deviceSlice';
import { homeReducer } from './slices/homeSlice';
import { uiReducer } from './slices/uiSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  device: deviceReducer,
  home: homeReducer,
  uiPreferences: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
