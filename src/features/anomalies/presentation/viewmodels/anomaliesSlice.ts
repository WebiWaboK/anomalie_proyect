import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anomaly } from '../../domain/entities/Anomaly';

interface State {
  list: Anomaly[];
}

const initialState: State = {
  list: [],
};

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
});

export const { setAnomalies, addAnomaly } = anomaliesSlice.actions;
export default anomaliesSlice.reducer;
