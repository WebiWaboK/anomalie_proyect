import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/state/store';

export default function AnomalyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const anomaly = useSelector((state: RootState) =>
    state.anomalies.list.find((a) => a.id === id)
  );

  if (!anomaly) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>⚠️ Anomalía no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <Text style={styles.value}>{anomaly.title}</Text>

      <Text style={styles.label}>Tipo</Text>
      <Text style={styles.value}>{anomaly.type}</Text>

      <Text style={styles.label}>Intensidad</Text>
      <Text style={styles.value}>{anomaly.intensity}/10</Text>

      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>{anomaly.date}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.value}>{anomaly.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  value: {
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  notFound: {
    fontSize: 18,
    color: '#B00020',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
