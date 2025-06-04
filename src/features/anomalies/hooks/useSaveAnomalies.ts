import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { AnomalyRepositoryImpl } from '../data/repositories_impl/AnomalyRepositoryImpl';

const repo = new AnomalyRepositoryImpl();

export function useSaveAnomalies() {
  const anomalies = useSelector((state: RootState) => state.anomalies.list);

  useEffect(() => {
    async function save() {
      await repo.saveAnomaliesLocally(anomalies);
    }
    save();
  }, [anomalies]);
}
