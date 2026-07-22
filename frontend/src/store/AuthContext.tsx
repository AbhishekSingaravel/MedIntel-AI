import {
  createContext,
  useContext,
  useState,
} from "react";

import type { UserResponse } from "@/types/auth";

import { useEffect } from "react";

import { userService } from "@/services/userService";

interface AuthContextType {
  token: string | null;

  user: UserResponse | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (token: string) => void;

  logout: () => void;

  setUser: (user: UserResponse | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("access_token")
  );

  const [user, setUser] = useState<UserResponse | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
  const initializeAuth = async () => {
        if (!token) {
        setLoading(false);
        return;
        }

        try {
        const currentUser =
            await userService.getCurrentUser();

        setUser(currentUser);
        } catch (error) {
        console.error(error);

        localStorage.removeItem("access_token");

        setToken(null);

        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    initializeAuth();
    }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}