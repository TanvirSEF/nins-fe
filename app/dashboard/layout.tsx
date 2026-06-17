"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RoleGate } from "@/components/shared/RoleGate";
import { Role } from "@/types";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    // Perform redirection only when we've loaded user state and we are at the exact "/dashboard" path
    if (!isLoading && user && pathname === "/dashboard") {
      switch (user.role) {
        case Role.PATIENT:
          router.replace("/dashboard/patient");
          break;
        case Role.DOCTOR:
          router.replace("/dashboard/doctor");
          break;
        case Role.SUPER_ADMIN:
        case Role.HOSPITAL_STAFF:
          router.replace("/dashboard/admin");
          break;
        default:
          router.replace("/login");
          break;
      }
    }
  }, [isLoading, user, pathname, router]);

  // Wrap in a base RoleGate requiring authentication
  return (
    <RoleGate>
      <div className="min-h-screen bg-slate-50/50 dark:bg-background">
        {isLoading || (pathname === "/dashboard" && user) ? (
          <div className="flex min-h-screen items-center justify-center bg-background p-6">
            <div className="relative flex flex-col items-center gap-4">
              <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="font-heading text-sm font-medium text-muted-foreground animate-pulse">
                Routing to clinical workspace...
              </p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </RoleGate>
  );
}
