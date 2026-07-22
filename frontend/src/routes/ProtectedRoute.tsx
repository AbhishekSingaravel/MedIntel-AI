import { Navigate } from "react-router-dom";

import { useAuth } from "@/store/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;