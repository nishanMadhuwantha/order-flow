import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '../theme/lightTheme';
import { darkTheme } from '../theme/darkTheme';

type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('Use Theme Mode must be used inside ThemeModeProvider');
  }
  return ctx;
};

export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
