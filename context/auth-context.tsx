"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient, ApiError } from "@/lib/api-client";
import { getToken, setToken, clearToken } from "@/lib/auth";
import { User, Role, AuthResponse } from "@/types";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<AuthResponse>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setTokenState] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const queryClient = useQueryClient();

  // Load token from storage and fetch profile
  const fetchProfile = React.useCallback(async (savedToken: string) => {
    try {
      const profileUser = await apiClient<User>("/auth/profile", {
        method: "GET",
        token: savedToken,
      });
      setUser(profileUser);
      setTokenState(savedToken);
    } catch (error) {
      console.error("Failed to restore auth session:", error);
      clearToken();
      setUser(null);
      setTokenState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      fetchProfile(savedToken);
    } else {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        json: { email, password },
      });
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setUser(null);
      setTokenState(null);
      clearToken();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => {
    setIsLoading(true);
    try {
      const response = await apiClient<AuthResponse>("/auth/register", {
        method: "POST",
        json: { name, email, password, phone },
      });
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setUser(null);
      setTokenState(null);
      clearToken();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = React.useCallback(() => {
    clearToken();
    setUser(null);
    setTokenState(null);
    queryClient.clear();
  }, [queryClient]);

  // Intercept unauthorized requests to log out automatically
  React.useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      if (res.status === 401) {
        logout();
      }
      return res;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, [logout]);

  const value = React.useMemo(
    () => ({
      user,
      token,
      role: user?.role || null,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
