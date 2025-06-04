export const anomalyTypes = [
  'Bucle temporal',
  'Distorsión espacio-tiempo',
  'Interferencia cuántica',
  'Fragmento dimensional',
] as const;

export type AnomalyType = typeof anomalyTypes[number];

export interface Anomaly {
  id: string;
  title: string;
  description: string;
  date: string;
  intensity: number;
  type: AnomalyType;
}
