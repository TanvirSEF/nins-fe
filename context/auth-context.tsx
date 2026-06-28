"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import {
  apiClient,
  AUTH_ENDPOINTS,
  refreshSession,
} from "@/lib/api-client"
import {
  getToken,
  setToken,
  clearToken,
  subscribe,
} from "@/lib/auth"
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
  const [isLoading, setIsLoading] = React.useState(true)
  const queryClient = useQueryClient()
  const router = useRouter()

  // Mirror the in-memory token store into React (re-renders on rotation, null during SSR).
  const token = React.useSyncExternalStore(subscribe, getToken, () => null)

  // Rehydrate on load: memory is blank after a reload, so rotate the httpOnly
  // refresh cookie into a fresh access token. Null just means "not logged in".
  React.useEffect(() => {
    let active = true
    refreshSession().then((session) => {
      if (!active) return
      if (session) setUser(session.user)
      setIsLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        json: { email, password },
      })
      setToken(response.accessToken) // refresh cookie set by the backend
      setUser(response.user)
      return response
    } catch (error) {
      clearToken()
      setUser(null)
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
      setToken(response.accessToken)
      setUser(response.user)
      return response
    } catch (error) {
      clearToken()
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = React.useCallback(() => {
    // Clear local state first so the UI reacts instantly, then best-effort tell
    // the server to revoke the refresh token (clears the cookie + Redis entry).
    clearToken()
    setUser(null)
    queryClient.clear()
    apiClient("/auth/logout", { method: "POST", token: null }).catch(() => {})
  }, [queryClient])

  // Replace the cached session user without a refetch — used after a successful
  // profile update so the sidebar/header name updates instantly.
  const updateUser = React.useCallback((next: User) => {
    setUser(next)
  }, [])

  // Auto-logout on session expiry. apiClient dispatches `auth:unauthorized` on
  // any 401 that survives the silent-refresh retry; auth endpoints are excluded.
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
