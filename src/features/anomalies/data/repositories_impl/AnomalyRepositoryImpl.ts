// src/features/anomalies/data/repositories_impl/AnomalyRepositoryImpl.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAnomalyRepository } from '../../domain/repositories/IAnomalyRepository';
import { Anomaly } from '../../domain/entities/Anomaly';

const STORAGE_KEY = '@anomalies_storage';

export class AnomalyRepositoryImpl implements IAnomalyRepository {
  
  async loadAnomaliesLocally(): Promise<Anomaly[]> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json) as Anomaly[];
  }

  async saveAnomaliesLocally(anomalies: Anomaly[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(anomalies));
  }

  // Aquí el método sync
  async sync(): Promise<void> {
    // Ejemplo de sincronización ficticia:
    // - Carga local
    const localAnomalies = await this.loadAnomaliesLocally();

    // - Aquí podrías hacer sincronización con API real o simulada,
    //   pero como solo tienes local, simplemente puedes actualizar la persistencia.
    //   Por ejemplo, si tienes una API, la llamarías acá para enviar datos o recibir actualizados.

    // Como ejemplo, vamos a "sincronizar" volviendo a guardar localmente:
    await this.saveAnomaliesLocally(localAnomalies);
  }
}
