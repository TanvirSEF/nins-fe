"use client";

import * as React from "react";
import { Users, BedDouble, ShieldAlert, BadgeCheck } from "lucide-react";

export function Stats() {
  const statItems = [
    {
      value: "100+",
      label: "Clinicians",
      description: "Specialist neurosurgeons & neurologists",
      icon: Users,
      colorClass: "text-primary bg-primary/10",
    },
    {
      value: "250+",
      label: "Beds Capacity",
      description: "Fully-equipped ICU, HDU, and clinical wards",
      icon: BedDouble,
      colorClass: "text-info bg-info/10",
    },
    {
      value: "24/7",
      label: "Emergency Care",
      description: "Immediate response stroke & head trauma team",
      icon: ShieldAlert,
      colorClass: "text-destructive bg-destructive/10",
    },
    {
      value: "99.8%",
      label: "Success Rate",
      description: "Precision micro-neurosurgical procedures",
      icon: BadgeCheck,
      colorClass: "text-success bg-success/10",
    },
  ];

  return (
    <section className="bg-white py-12 border-y border-slate-100 dark:bg-slate-950 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col p-6 rounded-2xl border border-transparent transition-all duration-300 hover:border-slate-100 hover:shadow-sm dark:hover:border-white/5 dark:hover:bg-slate-900/10"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${item.colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      {item.value}
                    </div>
                    <div className="text-xs font-bold text-foreground">
                      {item.label}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
