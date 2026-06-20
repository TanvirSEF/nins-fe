"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const STEPS = ["Department", "Doctor", "Date & Slot", "Checkout"]

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                (done || active) &&
                  "bg-primary text-primary-foreground",
                active && "ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                !done && !active && "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check className="size-3.5" /> : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-xs font-medium sm:inline",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 h-px w-4 bg-border sm:w-8" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
