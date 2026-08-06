"use client"

// DEMO MODE: Socket.IO connection removed entirely.
// This component is kept as a pass-through so the import in providers.tsx
// stays valid without any changes.

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
