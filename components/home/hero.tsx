"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  UserSquare2, 
  Bed, 
  ChevronRight, 
  ShieldCheck 
} from "lucide-react";

export function Hero() {
  const { user } = useAuth();
  const router = useRouter();

  const handleActionClick = (path: string) => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 lg:py-24 dark:bg-slate-950/20">
      {/* Visual background gradient glows */}
      <div className="absolute -right-24 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.952_0.028_196/20%)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,oklch(0.36_0.05_196/10%)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.968_0.007_247.9/10%)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Text Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              National Institute of Neurosciences & Hospital
            </div>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Advancing <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">Neurological</span> Care & Innovation
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Access the NINS Enterprise Portal for automated outpatient appointment serials, real-time ICU/HDU status widgets, and secure electronic prescriptions.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                onClick={() => handleActionClick("/dashboard/patient/book")}
                className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 h-11 rounded-xl flex items-center gap-2 transition-all duration-200 active:scale-[0.98]"
              >
                Book Outpatient Serial
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/beds")}
                className="border-slate-200 bg-white hover:bg-slate-50 hover:text-foreground text-muted-foreground font-semibold px-6 h-11 rounded-xl transition-all duration-200"
              >
                ICU/HDU Bed Board
              </Button>
            </div>
          </div>

          {/* Quick Actions Right Column */}
          <div className="lg:col-span-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
            
            {/* Quick Action 1: Outpatient Booking */}
            <div 
              onClick={() => handleActionClick("/dashboard/patient/book")}
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:border-primary/10 dark:border-white/5 dark:bg-slate-900/50"
            >
              <div className="flex gap-4 items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                    Outpatient Serials
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px] sm:max-w-none">
                    Schedule checkups with specialists
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action 2: Patient Portal */}
            <div 
              onClick={() => handleActionClick("/dashboard/patient")}
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:border-primary/10 dark:border-white/5 dark:bg-slate-900/50"
            >
              <div className="flex gap-4 items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success transition-all duration-300 group-hover:scale-105 group-hover:bg-success group-hover:text-success-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1 group-hover:text-success transition-colors">
                    Patient Tickets & Rx
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    Prescriptions and paid tickets
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action 3: Doctor Console */}
            <div 
              onClick={() => handleActionClick("/dashboard/doctor")}
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:border-primary/10 dark:border-white/5 dark:bg-slate-900/50"
            >
              <div className="flex gap-4 items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info transition-all duration-300 group-hover:scale-105 group-hover:bg-info group-hover:text-info-foreground">
                  <UserSquare2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1 group-hover:text-info transition-colors">
                    Clinician Console
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    Outpatient queue & medical records
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action 4: Bed Board */}
            <div 
              onClick={() => router.push("/beds")}
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:border-primary/10 dark:border-white/5 dark:bg-slate-900/50"
            >
              <div className="flex gap-4 items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning transition-all duration-300 group-hover:scale-105 group-hover:bg-warning group-hover:text-warning-foreground">
                  <Bed className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1 group-hover:text-warning transition-colors">
                    ICU/HDU Availability
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    Real-time bed counts & status
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
