import { useFormik } from 'formik';
import { anomalyValidationSchema } from '../validators/anomalyValidationSchema';
import { Anomaly, AnomalyType } from '../../domain/entities/Anomaly';
import * as Crypto from 'expo-crypto';
import { useDispatch } from 'react-redux';
import { addAnomaly } from './anomaliesSlice';

export const useAnomalyForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      intensity: 5,
      type: '' as AnomalyType,
    },
    validationSchema: anomalyValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const newAnomaly: Anomaly = {
        id: Crypto.randomUUID(), // ✅ corrección aquí
        date: new Date().toISOString(),
        ...values,
      };

      dispatch(addAnomaly(newAnomaly));
      resetForm();
    },
  });

  return formik;
};
