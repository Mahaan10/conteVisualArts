import { useThemeMode } from "../context/useThemeModeContext";
import { PiSun } from "react-icons/pi";
import { HiOutlineMoon } from "react-icons/hi2";

function ThemeMode() {
  const { themeMode, setThemeMode } = useThemeMode();
  return (
    <>
      <div className="flex items-center justify-center dark:bg-dark-cerulean bg-almond-cookie rounded-full transition-colors duration-300 hover:bg-golden-sand dark:hover:bg-purple-plumeria">
        {themeMode === "light" ? (
          <button
            className="cursor-pointer rounded-full p-2 transition-colors duration-300"
            onClick={() => setThemeMode("dark")}
          >
            <HiOutlineMoon className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="cursor-pointer rounded-full p-2 transition-colors duration-300"
            onClick={() => setThemeMode("light")}
          >
            <PiSun className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
}

export default ThemeMode;
