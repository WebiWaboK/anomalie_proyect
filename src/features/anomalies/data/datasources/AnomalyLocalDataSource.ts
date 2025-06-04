import AsyncStorage from '@react-native-async-storage/async-storage';
import { Anomaly } from '../../domain/entities/Anomaly';

const STORAGE_KEY = 'anomalies';

export const AnomalyLocalDataSource = {
  async getAll(): Promise<Anomaly[]> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  },

  async saveAll(anomalies: Anomaly[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(anomalies));
  },
};
