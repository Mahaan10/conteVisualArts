import { createContext, useContext, useEffect, useState } from "react";

const ThemeModeContext = createContext();

export default function ThemeModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode);
    if (darkMode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [darkMode]);

  return (
    <ThemeModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  return context;
}
