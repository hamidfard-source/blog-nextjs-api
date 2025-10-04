'use client'
import { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

type isDark = boolean;
type ThemeContextType = {
  theme: isDark;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<isDark>(true);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === false ? true : false));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as isDark | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  useLayoutEffect(() => {
    localStorage.setItem("theme", theme ? "dark": "light")
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme ? "dark": "light");
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};