"use client"

import * as React from "react"
import { useLanguage, type Language } from "@/context/language-context"

const LANGS: { code: Language; label: string }[] = [
  { code: "bn", label: "BN" },
  { code: "en", label: "EN" },
]

/** Floating language switcher — always visible, sits just above the back-to-top button */
export function FloatingLangSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="fixed bottom-[88px] right-6 z-50 flex flex-row gap-0.5 rounded-xl border border-white/10 bg-slate-900/90 p-1 shadow-2xl backdrop-blur-md transition-all duration-300"
      role="group"
      aria-label="Select language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={`Switch to ${l.label}`}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold leading-none transition-all duration-200 ${
            lang === l.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

/** Inline lang switcher used inside the Navbar */
export function LangSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-100/80 p-0.5 dark:border-white/10 dark:bg-slate-900"
      role="group"
      aria-label="Select language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={`Switch to ${l.label}`}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none transition-all duration-200 ${
            lang === l.code
              ? "bg-white text-primary shadow-sm dark:bg-slate-700 dark:text-sky-300"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
