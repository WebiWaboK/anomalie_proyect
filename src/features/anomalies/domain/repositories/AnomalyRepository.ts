import { Anomaly } from '../entities/Anomaly';

export interface AnomalyRepository {
  getAll(): Promise<Anomaly[]>;
  getById(id: string): Promise<Anomaly | null>;
  add(anomaly: Anomaly): Promise<void>;
  sync(): Promise<void>;
}
