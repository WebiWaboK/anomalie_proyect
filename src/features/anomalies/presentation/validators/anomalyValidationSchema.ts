import * as Yup from 'yup';
import { anomalyTypes } from '../../domain/entities/Anomaly';

export const anomalyValidationSchema = Yup.object().shape({
  title: Yup.string().required('El título es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  intensity: Yup.number()
    .min(1, 'Mínimo 1')
    .max(10, 'Máximo 10')
    .required('La intensidad es requerida'),
  type: Yup.mixed()
    .oneOf([...anomalyTypes])
    .required('El tipo es requerido'),
});
