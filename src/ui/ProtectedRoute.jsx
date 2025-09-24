import { Navigate, Outlet } from "react-router-dom";
import { useGetUser } from "../context/useGetUserContext";
import toast from "react-hot-toast";
import Loading from "./Loading";

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, token, isLoading, isError, error, isTokenChecked } =
    useGetUser();

  if (isLoading || !isTokenChecked) return <Loading />;

  if (isError) {
    toast.error(error?.response?.data?.message || "سطح دسترسی تعریف نشده");
    return <Navigate to="/" replace />;
  }

  if (!token) return <Navigate to="/" replace />;

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(user?.role)) {
    toast.error("شما به این بخش دسترسی ندارید");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
