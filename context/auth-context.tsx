"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { apiClient, AUTH_ENDPOINTS } from "@/lib/api-client"
import { getToken, setToken, clearToken } from "@/lib/auth"
import { User, Role, AuthResponse } from "@/types"

export interface AuthContextType {
  user: User | null
  token: string | null
  role: Role | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<AuthResponse>
  logout: () => void
  /** Patch the cached session user in place (e.g. after profile edits). */
  updateUser: (user: User) => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [token, setTokenState] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const queryClient = useQueryClient()
  const router = useRouter()

  // Load token from storage and fetch profile
  const fetchProfile = React.useCallback(async (savedToken: string) => {
    try {
      const profileUser = await apiClient<User>("/auth/profile", {
        method: "GET",
        token: savedToken,
      })
      setUser(profileUser)
      setTokenState(savedToken)
    } catch (error) {
      console.error("Failed to restore auth session:", error)
      clearToken()
      setUser(null)
      setTokenState(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const savedToken = getToken()
    if (savedToken) {
      // Async session hydration: state updates happen after `await`, not
      // synchronously, so this is the intended external-system sync pattern.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProfile(savedToken)
    } else {
      setIsLoading(false)
    }
  }, [fetchProfile])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        json: { email, password },
      })
      setToken(response.token)
      setTokenState(response.token)
      setUser(response.user)
      return response
    } catch (error) {
      setUser(null)
      setTokenState(null)
      clearToken()
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => {
    setIsLoading(true)
    try {
      const response = await apiClient<AuthResponse>("/auth/register", {
        method: "POST",
        json: { name, email, password, phone },
      })
      setToken(response.token)
      setTokenState(response.token)
      setUser(response.user)
      return response
    } catch (error) {
      setUser(null)
      setTokenState(null)
      clearToken()
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = React.useCallback(() => {
    clearToken()
    setUser(null)
    setTokenState(null)
    queryClient.clear()
  }, [queryClient])

  // Replace the cached session user without a refetch — used after a successful
  // profile update so the sidebar/header name updates instantly.
  const updateUser = React.useCallback((next: User) => {
    setUser(next)
  }, [])

  // Auto-logout on session expiry. apiClient dispatches `auth:unauthorized` on
  // any 401 that goes through it; auth endpoints are excluded because a 401
  // there means bad credentials (a form error), not an expired session.
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const handler = (e: Event) => {
      const { endpoint } = (e as CustomEvent).detail ?? {}
      if (
        endpoint &&
        (AUTH_ENDPOINTS as readonly string[]).includes(endpoint)
      ) {
        return
      }
      logout()
      router.push("/login")
    }
    window.addEventListener("auth:unauthorized", handler)
    return () => window.removeEventListener("auth:unauthorized", handler)
  }, [logout, router])

  const value = React.useMemo(
    () => ({
      user,
      token,
      role: user?.role || null,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, token, isLoading, logout, updateUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
