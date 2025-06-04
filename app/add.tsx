import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAnomalyForm } from '../src/features/anomalies/presentation/viewmodels/useAnomalyForm';
import { anomalyTypes } from '../src/features/anomalies/domain/entities/Anomaly';
import { useRouter } from 'expo-router';

export default function AddAnomalyScreen() {
  const formik = useAnomalyForm();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await formik.submitForm();
      if (formik.isValid && !formik.isSubmitting) {
        Alert.alert('Éxito', 'Anomalía registrada correctamente', [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]);
      }
    } catch (error) {
      // Manejo de errores si es necesario
      Alert.alert('Error', 'Hubo un problema al registrar la anomalía.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={formik.values.title}
        onChangeText={formik.handleChange('title')}
        onBlur={formik.handleBlur('title')}
        placeholder="Ej. Fisura en el tiempo"
        returnKeyType="done"
        autoCapitalize="sentences"
      />
      {formik.touched.title && formik.errors.title && (
        <Text style={styles.error}>{formik.errors.title}</Text>
      )}

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
        placeholder="Describe la anomalía encontrada"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        returnKeyType="default"
        autoCapitalize="sentences"
      />
      {formik.touched.description && formik.errors.description && (
        <Text style={styles.error}>{formik.errors.description}</Text>
      )}

      <Text style={styles.label}>Intensidad (1 a 10)</Text>
      <TextInput
        style={styles.input}
        value={formik.values.intensity !== undefined ? String(formik.values.intensity) : ''}
        onChangeText={(text) => {
          // Asegura que solo números entre 1 y 10 sean establecidos
          const num = Number(text);
          if (!isNaN(num) && num >= 1 && num <= 10) {
            formik.setFieldValue('intensity', num);
          } else if (text === '') {
            formik.setFieldValue('intensity', '');
          }
        }}
        keyboardType="numeric"
        placeholder="Ej. 7"
        maxLength={2}
        onBlur={formik.handleBlur('intensity')}
      />
      {formik.touched.intensity && formik.errors.intensity && (
        <Text style={styles.error}>{formik.errors.intensity}</Text>
      )}

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formik.values.type}
          onValueChange={(value) => formik.setFieldValue('type', value)}
          onBlur={() => formik.setFieldTouched('type', true)}
        >
          <Picker.Item label="Seleccione un tipo..." value="" />
          {anomalyTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>
      {formik.touched.type && formik.errors.type && (
        <Text style={styles.error}>{formik.errors.type}</Text>
      )}

      <Pressable
        style={[styles.button, formik.isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>📡 Registrar Anomalía</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    marginBottom: 12,
  },
  multiline: {
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#8B5CF6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#B00020',
    marginBottom: 10,
    fontSize: 14,
  },
});
