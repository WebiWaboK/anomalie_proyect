// src/features/anomalies/domain/usecases/SaveAnomaliesLocallyUseCase.ts
import { Anomaly } from '../entities/Anomaly';
import { IAnomalyRepository } from '../repositories/IAnomalyRepository';

export class SaveAnomaliesLocallyUseCase {
  constructor(private repository: IAnomalyRepository) {}

  async execute(anomalies: Anomaly[]): Promise<void> {
    return this.repository.saveAnomaliesLocally(anomalies);
  }
}
