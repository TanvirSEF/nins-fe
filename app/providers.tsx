"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  // Ensure QueryClient is created once on the client to avoid state sharing across requests
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes stale time
            refetchOnWindowFocus: false, // disable aggressive refetching on window focus
            retry: 1, // retry failed queries once
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {children}
          <Toaster closeButton position="top-right" richColors />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
