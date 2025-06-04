// src/features/anomalies/data/datasources/AnomalyLocalDataSource.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Anomaly } from '../../domain/entities/Anomaly';

const STORAGE_KEY = '@anomalies_list';

export interface IAnomalyLocalDataSource {
  saveAnomalies(anomalies: Anomaly[]): Promise<void>;
  loadAnomalies(): Promise<Anomaly[]>;
}

export class AnomalyLocalDataSource implements IAnomalyLocalDataSource {
  async saveAnomalies(anomalies: Anomaly[]): Promise<void> {
    try {
      const json = JSON.stringify(anomalies);
      await AsyncStorage.setItem(STORAGE_KEY, json);
    } catch (e) {
      console.error('Error saving anomalies', e);
      throw e;
    }
  }

  async loadAnomalies(): Promise<Anomaly[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        return JSON.parse(json);
      }
      return [];
    } catch (e) {
      console.error('Error loading anomalies', e);
      return [];
    }
  }
}
