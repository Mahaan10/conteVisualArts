import { Navigate, Outlet } from "react-router-dom";
import { useGetUser } from "../context/useGetUserContext";
import { useToast } from "../context/useToastContext";
import Loading from "./Loading";

function ProtectedRoute({ allowedRoles = "" }) {
  const { user, token, isLoading, isError, error } = useGetUser();
  const { showToast } = useToast();

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "سطح دسترسی تعریف نشده"
    );

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/courses" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
