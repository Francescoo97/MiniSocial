import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

// Rotte pubbliche per le pagine accessibili solo se NON loggato o registrato.
function PublicRoutes({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Caricamento...</p>;

  // Se sei loggato vieni reindirizzato al feed
  if (isAuthenticated) {
    return <Navigate to={ROUTES.FEED} />;
  }

  return children;
}

export default PublicRoutes;
