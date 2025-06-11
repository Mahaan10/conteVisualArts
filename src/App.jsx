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
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import StudentProfile from "./features/student/StudentProfile";
import StudentCourses from "./features/student/StudentCourses";
import StudentPayments from "./features/student/StudentPayments";
import AdminDashboard from "./features/admin/AdminDashboard";
import AdminCourses from "./features/admin/courses/AdminCourses";
import AdminStudentWorks from "./features/admin/studentWorks/AdminStudentWorks";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<PagesLayout />}>
              <Route index element={<Home />} />
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="courses" element={<Courses />}>
                <Route path=":id" element={<CoursePageLayout />} />
              </Route>
              <Route path="student-works" element={<StudentWorks />} />
              <Route path="news" element={<News />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="student" element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate to="profile" replace />} />
                  <Route path="profile" element={<StudentProfile />} />
                  <Route path="courses" element={<StudentCourses />} />
                  <Route path="payments" element={<StudentPayments />} />
                </Route>
              </Route>
              <Route
                path="admin"
                element={<ProtectedRoute allowedRoles="admin" />}
              >
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="courses" element={<AdminCourses />} />
                  <Route path="studentWorks" element={<AdminStudentWorks />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ToastProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}

export default App;
