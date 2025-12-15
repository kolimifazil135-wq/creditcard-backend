import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("access");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin allowed
  return children;
}
