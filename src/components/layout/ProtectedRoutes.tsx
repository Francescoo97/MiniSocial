import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

// Rotte protette per le pagine che richieddono il login
function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Caricamento...</p>;

  // Se non sei loggato vieni reindirizzato al login.
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // Se sei loggato mostra la pagina richiesta.
  return children;
}

export default ProtectedRoutes;
