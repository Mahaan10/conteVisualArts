import { Navigate, Outlet } from "react-router-dom";
import { useGetUser } from "../context/useGetUserContext";
import { useToast } from "../context/useToastContext";
import Loading from "./Loading";

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, token, isLoading, isError, error, isTokenChecked } =
    useGetUser();
  const { showToast } = useToast();

  if (isLoading || !isTokenChecked) return <Loading />;

  if (isError) {
    showToast(
      "error",
      error?.response?.data?.message || "سطح دسترسی تعریف نشده"
    );
    return <Navigate to="/" replace />;
  }

  if (!token) return <Navigate to="/" replace />;

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(user?.role)) {
    showToast("error", "شما به این بخش دسترسی ندارید");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
