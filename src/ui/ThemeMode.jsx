import React from "react";
import { useThemeMode } from "../context/useThemeContext";
import { BsSun } from "react-icons/bs";
import { GoMoon } from "react-icons/go";

function ThemeMode() {
  const { darkMode, setDarkMode } = useThemeMode();

  return (
    <>
      {darkMode === "light" ? (
        <button className="cursor-pointer" onClick={() => setDarkMode("dark")}>
          <GoMoon className="w-6 h-6" />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => setDarkMode("light")}>
          <BsSun className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

export default ThemeMode;
