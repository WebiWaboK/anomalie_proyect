// anomaliesSlice.ts - Redux slice + thunk para cargar y guardar anomalías

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Anomaly } from '../../domain/entities/Anomaly';
import { AnomalyRepositoryImpl } from '../../data/repositories_impl/AnomalyRepositoryImpl';

const repo = new AnomalyRepositoryImpl();

interface State {
  list: Anomaly[];
}

const initialState: State = {
  list: [],
};

// thunk para cargar anomalías desde AsyncStorage
export const loadAnomalies = createAsyncThunk('anomalies/load', async () => {
  const anomalies = await repo.loadAnomaliesLocally();
  return anomalies;
});

const anomaliesSlice = createSlice({
  name: 'anomalies',
  initialState,
  reducers: {
    setAnomalies(state, action: PayloadAction<Anomaly[]>) {
      state.list = action.payload;
    },
    addAnomaly(state, action: PayloadAction<Anomaly>) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAnomalies.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setAnomalies, addAnomaly } = anomaliesSlice.actions;
export default anomaliesSlice.reducer;
