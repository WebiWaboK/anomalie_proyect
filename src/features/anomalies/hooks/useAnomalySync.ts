import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AnomalyRepositoryImpl } from '../data/repositories_impl/AnomalyRepositoryImpl';

const repo = new AnomalyRepositoryImpl();

export function useAnomalySync() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await repo.sync();
      }
    });

    return () => unsubscribe();
  }, []);
}
