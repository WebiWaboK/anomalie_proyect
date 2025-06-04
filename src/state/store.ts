import { configureStore } from '@reduxjs/toolkit';
import anomaliesReducer from '../features/anomalies/presentation/viewmodels/anomaliesSlice';

export const store = configureStore({
  reducer: {
    anomalies: anomaliesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
