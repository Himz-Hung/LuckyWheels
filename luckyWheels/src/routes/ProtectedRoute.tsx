import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const accessToken =
    sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}