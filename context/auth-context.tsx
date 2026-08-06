"use client"

import * as React from "react"
import { DEMO_USER } from "@/lib/mock-data"
import type { User, Role, AuthResponse } from "@/types"

// ---------------------------------------------------------------------------
// DEMO MODE: Auth context returns a hardcoded SUPER_ADMIN user. No API calls,
// no session refresh, no network dependency. Login accepts any credentials.
// ---------------------------------------------------------------------------

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
  updateUser: (user: User) => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
)

const DEMO_TOKEN = "demo-access-token"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start logged in as the demo user immediately — no loading spinner needed.
  const [user, setUser] = React.useState<User | null>(DEMO_USER)
  const [token, setTokenState] = React.useState<string | null>(DEMO_TOKEN)
  const isLoading = false

  const login = React.useCallback(
    async (_email: string, _password: string): Promise<AuthResponse> => {
      setUser(DEMO_USER)
      setTokenState(DEMO_TOKEN)
      return { user: DEMO_USER, accessToken: DEMO_TOKEN }
    },
    []
  )

  const register = React.useCallback(
    async (
      name: string,
      _email: string,
      _password: string,
      _phone?: string
    ): Promise<AuthResponse> => {
      const newUser: User = { ...DEMO_USER, name }
      setUser(newUser)
      setTokenState(DEMO_TOKEN)
      return { user: newUser, accessToken: DEMO_TOKEN }
    },
    []
  )

  const logout = React.useCallback(() => {
    setUser(null)
    setTokenState(null)
  }, [])

  const updateUser = React.useCallback((next: User) => {
    setUser(next)
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      token,
      role: user?.role ?? null,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, token, login, register, logout, updateUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
