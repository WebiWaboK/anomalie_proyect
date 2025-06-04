// src/features/anomalies/domain/usecases/LoadAnomaliesLocallyUseCase.ts
import { Anomaly } from '../entities/Anomaly';
import { IAnomalyRepository } from '../repositories/IAnomalyRepository';

export class LoadAnomaliesLocallyUseCase {
  constructor(private repository: IAnomalyRepository) {}

  async execute(): Promise<Anomaly[]> {
    return this.repository.loadAnomaliesLocally();
  }
}
