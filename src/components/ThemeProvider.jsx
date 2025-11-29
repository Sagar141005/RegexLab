import { createContext, useContext, useEffect, useState } from "react";

const storageKey = "app-theme";
const defaultTheme = "system";

const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(systemPrefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
