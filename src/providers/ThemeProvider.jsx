import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('vx-theme') || 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('vx-theme', theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
