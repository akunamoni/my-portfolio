import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'clean' | 'glass' | 'dark' | 'material';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('theme');
      return (stored as Theme) || 'clean';
    } catch {
      return 'clean';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    // set data-theme on html for CSS targeting if needed
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export type { Theme };
