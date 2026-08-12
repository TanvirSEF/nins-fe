"use client"

import * as React from "react"
import enDict from "@/dictionaries/en.json"
import bnDict from "@/dictionaries/bn.json"

export type Language = "en" | "bn"
export type Dictionary = typeof enDict

const dicts: Record<Language, Dictionary> = { en: enDict, bn: bnDict as unknown as Dictionary }

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  dict: Dictionary
}

const LanguageContext = React.createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  dict: enDict,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>("en")

  // Hydrate from localStorage on mount (client only)
  React.useEffect(() => {
    const stored = localStorage.getItem("nins-lang")
    if (stored === "en" || stored === "bn") {
      setLangState(stored)
    }
  }, [])

  // Keep <html lang="..."> in sync for accessibility & CSS font selectors
  React.useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("nins-lang", newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, dict: dicts[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return React.useContext(LanguageContext)
}
