import { AnomalyRepository } from '../repositories/AnomalyRepository';
import { Anomaly } from '../entities/Anomaly';

export class AddAnomaly {
  constructor(private repo: AnomalyRepository) {}

  execute(anomaly: Anomaly): Promise<void> {
    return this.repo.add(anomaly);
  }
}
