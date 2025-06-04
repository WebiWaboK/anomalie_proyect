import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/state/store';
import { useLoadAnomalies } from '../src/features/anomalies/hooks/useLoadAnomalies';
import { useSaveAnomalies } from '../src/features/anomalies/hooks/useSaveAnomalies';

export default function HomeScreen() {
  const router = useRouter();
  const anomalies = useSelector((state: RootState) => state.anomalies.list);

  useLoadAnomalies();
  useSaveAnomalies();

  const renderItem = ({ item }: { item: typeof anomalies[number] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/report/${item.id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>
        {item.type} • Intensidad: {item.intensity}
      </Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Anomalías Detectadas</Text>

      <Pressable style={styles.button} onPress={() => router.push('/add')}>
        <Text style={styles.buttonText}>➕ Nueva Anomalía</Text>
      </Pressable>

      <FlatList
        data={anomalies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay anomalías registradas</Text>
        }
        contentContainerStyle={
          anomalies.length === 0 ? styles.centerEmpty : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#F5F3FF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#333' },
  subtitle: { fontSize: 14, color: '#555', marginTop: 4 },
  date: { fontSize: 12, color: '#888', marginTop: 2 },
  empty: { textAlign: 'center', color: '#777', marginTop: 32 },
  centerEmpty: { flexGrow: 1, justifyContent: 'center' },
});
