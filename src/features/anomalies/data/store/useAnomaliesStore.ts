import { create } from 'zustand';
import { Anomaly } from '../../domain/entities/Anomaly';

interface AnomaliesState {
  anomalies: Anomaly[];
  addAnomaly: (a: Anomaly) => void;
}

export const useAnomaliesStore = create<AnomaliesState>((set) => ({
  anomalies: [],
  addAnomaly: (a: Anomaly) =>
    set((state) => ({
      anomalies: [...state.anomalies, a],
    })),
}));
