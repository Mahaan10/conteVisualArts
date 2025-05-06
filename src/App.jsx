import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PagesLayout from "./ui/PagesLayout";
import ThemeModeProvider from "./context/useThemeModeContext";

function App() {
  return (
    <ThemeModeProvider>
      <Routes>
        <Route path="/" element={<PagesLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </ThemeModeProvider>
  );
}

export default App;
