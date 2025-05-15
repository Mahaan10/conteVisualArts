import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PagesLayout from "./ui/PagesLayout";
import ThemeModeProvider from "./context/useThemeModeContext";
import Courses from "./pages/Courses";
import ArtistsWork from "./pages/ArtistsWork";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./context/useToastContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<PagesLayout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/artists-work" element={<ArtistsWork />} />
            </Route>
          </Routes>
        </ToastProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}

export default App;
