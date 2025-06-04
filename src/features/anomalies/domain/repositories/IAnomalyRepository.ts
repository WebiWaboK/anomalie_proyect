// src/features/anomalies/domain/repositories/IAnomalyRepository.ts

import { Anomaly } from '../entities/Anomaly';

export interface IAnomalyRepository {
  loadAnomaliesLocally(): Promise<Anomaly[]>;
  saveAnomaliesLocally(anomalies: Anomaly[]): Promise<void>;

  sync(): Promise<void>;  // <- aquí el método sync
}
