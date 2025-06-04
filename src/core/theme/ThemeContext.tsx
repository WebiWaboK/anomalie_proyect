// src/core/theme/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const lightColors = {
  background: '#ffffff',
  text: '#000000',
  buttonBackground: '#000000',
  buttonText: '#ffffff',
};

const darkColors = {
  background: '#000000',
  text: '#ffffff',
  buttonBackground: '#ffffff',
  buttonText: '#000000',
};

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightColors;
} | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
};
