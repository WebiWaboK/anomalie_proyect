import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAnomalies } from '../presentation/viewmodels/anomaliesSlice';
import { AnomalyRepositoryImpl } from '../data/repositories_impl/AnomalyRepositoryImpl';

const repo = new AnomalyRepositoryImpl();

export function useLoadAnomalies() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      const anomalies = await repo.loadAnomaliesLocally();
      dispatch(setAnomalies(anomalies));
    }
    load();
  }, [dispatch]);
}
