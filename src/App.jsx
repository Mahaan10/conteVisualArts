import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PagesLayout from "./ui/PagesLayout";
import ThemeModeProvider from "./context/useThemeModeContext";
import Courses from "./pages/Courses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./context/useToastContext";
import News from "./pages/News";
import StudentWorks from "./pages/StudentWorks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CoursePageLayout from "./features/course/CoursePageLayout";

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
              <Route path="/courses" element={<Courses />}>
                <Route path=":slug" element={<CoursePageLayout />} />
              </Route>
              <Route path="/student-works" element={<StudentWorks />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </ToastProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}

export default App;
