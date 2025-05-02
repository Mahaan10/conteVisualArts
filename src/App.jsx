import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ThemeModeProvider from "./context/useThemeContext";

function App() {
  return (
    <ThemeModeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeModeProvider>
  );
}

export default App;
