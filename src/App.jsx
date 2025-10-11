import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PagesLayout from "./ui/PagesLayout";
import ThemeModeProvider from "./context/useThemeModeContext";
import Courses from "./pages/Courses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import News from "./pages/News";
import StudentWorks from "./pages/StudentWorks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CoursePageLayout from "./ui/CoursePageLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import StudentProfile from "./features/student/StudentProfile";
import StudentCourses from "./features/student/StudentCourses";
import StudentPayments from "./features/student/StudentPayments";
import AdminDashboard from "./features/admin/AdminDashboard";
import AdminCourses from "./features/admin/courses/AdminCourses";
import AdminStudentWorks from "./features/admin/studentWorks/AdminStudentWorks";
import AdminNews from "./features/admin/news/AdminNews";
import AdminUsers from "./features/admin/users/AdminUsers";
import AppInitializer from "./ui/AppInitializer";
import NewsPageLayout from "./ui/NewsPageLayout";
import NotFound from "./ui/NotFound";
import VerifyPayment from "./ui/VerifyPayment";
import { Toaster } from "react-hot-toast";
import AdminReviews from "./features/admin/reviews/AdminReviews";
import AdminPayments from "./features/admin/payments/AdminPayments";
import FAQ from "./pages/FAQ";
import Regulations from "./pages/Regulations";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <Toaster />
        <AppInitializer>
          <Routes>
            <Route path="/" element={<PagesLayout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />}>
                <Route path=":id" element={<CoursePageLayout />} />
              </Route>
              <Route path="student-works" element={<StudentWorks />} />
              <Route path="news" element={<News />}>
                <Route path=":id" element={<NewsPageLayout />} />
              </Route>
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="FAQ" element={<FAQ />} />
              <Route path="regulations" element={<Regulations />} />
              <Route
                path="student"
                element={<ProtectedRoute allowedRoles="student" />}
              >
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
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="studentWorks" element={<AdminStudentWorks />} />
                  <Route path="news" element={<AdminNews />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="payments" element={<AdminPayments />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="payment/result" element={<VerifyPayment />} />
          </Routes>
        </AppInitializer>
      </ThemeModeProvider>
    </QueryClientProvider>
  );
}

export default App;
