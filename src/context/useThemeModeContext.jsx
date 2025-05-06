import { createContext, useContext, useEffect, useState } from "react";

const ThemeModeContext = createContext();

export default function ThemeModeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
    if (themeMode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  return context;
}
