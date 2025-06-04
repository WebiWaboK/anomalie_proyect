import React from 'react';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import { store } from '../src/state/store';
import { ThemeProvider } from '../src/core/theme/ThemeContext';

export default function Layout() {
  return (
    <Provider store={store}>
      <ThemeProvider> {/* 👈 Envuelve tu app en el ThemeProvider */}
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Inicio' }} />
          <Stack.Screen name="add" options={{ title: 'Añadir Anomalía' }} />
          <Stack.Screen
            name="report/[id]"
            options={{ title: 'Detalle de Anomalía' }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
