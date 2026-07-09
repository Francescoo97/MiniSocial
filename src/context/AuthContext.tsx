import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Profile } from "../types";
import { supabase } from "../lib/supabase";

// Definisce cosa espone il context a tutta l'app.
type AuthContextType = {
  user: Profile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recupera il profilo dalla tabella profiles dato un userId.
  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // controlla se c'è già una sessione attiva al caricamento dell'app.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Se la sessione viene trovata, carica il profilo.
        fetchProfile(session.user.id);
      } else {
        // Se non c'è sessione attiva, smette di caricare.
        setIsLoading(false);
      }
    });
  }, []);

  // Chiama Supabase Auth con email e password
  // Se le credenziali sono errate, manda messaggio di errore.
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    if (data.user) {
      await fetchProfile(data.user.id);
    }
  };

  // Al logout, pulisce lo stato locale (null) e termina la sessione su Supabase.
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    // !!user serve per convertire l'oggetto in boolean: null è false e Profile è true.
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook per accedere al Context da ogni componente.
// eslint-disable-next-line
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  return context;
}
