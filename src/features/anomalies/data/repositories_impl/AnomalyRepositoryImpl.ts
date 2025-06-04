import { AnomalyRepository } from '../../domain/repositories/AnomalyRepository';
import { Anomaly } from '../../domain/entities/Anomaly';
import { AnomalyLocalDataSource } from '../datasources/AnomalyLocalDataSource';

export class AnomalyRepositoryImpl implements AnomalyRepository {
  async getAll(): Promise<Anomaly[]> {
    return AnomalyLocalDataSource.getAll();
  }

  async getById(id: string): Promise<Anomaly | null> {
    const all = await this.getAll();
    return all.find(a => a.id === id) || null;
  }

  async add(anomaly: Anomaly): Promise<void> {
    const all = await this.getAll();
    await AnomalyLocalDataSource.saveAll([...all, anomaly]);
  }

  async sync(): Promise<void> {
    // Simula sincronización desde una API falsa
    console.log('Sync: Sincronizando con API...');
  }
}
