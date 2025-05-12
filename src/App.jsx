import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PagesLayout from "./ui/PagesLayout";
import ThemeModeProvider from "./context/useThemeModeContext";
import Courses from "./pages/Courses";

function App() {
  return (
    <ThemeModeProvider>
      <Routes>
        <Route path="/" element={<PagesLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </ThemeModeProvider>
  );
}

export default App;
