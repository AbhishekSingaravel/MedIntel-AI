import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({
  children,
}: PublicRouteProps) {
  
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
    ) : (
    <>{children}</>
    );
}

export default PublicRoute;