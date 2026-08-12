"use client"

import * as React from "react"
import { useLanguage } from "@/context/language-context"

export function MarqueeBar() {
  const { dict } = useLanguage()
  const text = dict.marquee.text

  return (
    <div className="w-full overflow-hidden bg-destructive py-1.5 text-destructive-foreground print:hidden">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        <span className="mx-16 text-sm font-medium tracking-wide">{text}</span>
        <span className="mx-16 text-sm font-medium tracking-wide" aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}
