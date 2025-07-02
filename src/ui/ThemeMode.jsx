import { useThemeMode } from "../context/useThemeModeContext";
import { PiSun } from "react-icons/pi";
import { HiOutlineMoon } from "react-icons/hi2";

function ThemeMode() {
  const { themeMode, setThemeMode } = useThemeMode();
  const isLight = themeMode === "light";

  return (
    <div className="flex items-center justify-center dark:bg-dark-cerulean bg-almond-cookie rounded-full transition-colors duration-300 hover:bg-golden-sand dark:hover:bg-purple-plumeria">
      <button
        aria-label={isLight ? "تغییر به حالت تاریک" : "تغییر به حالت روشن"}
        className="cursor-pointer rounded-full p-2 transition-colors duration-300"
        onClick={() => setThemeMode(isLight ? "dark" : "light")}
      >
        {isLight ? (
          <HiOutlineMoon className="w-5 h-5" />
        ) : (
          <PiSun className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default ThemeMode;
