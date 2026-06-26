import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// Some vitest/jsdom combos expose `localStorage` only on `window`, not as a
// bare global. App code (lib/auth.ts) reads the bare global, so mirror or
// polyfill it before any test runs.
if (typeof globalThis.localStorage === "undefined") {
  const win = globalThis as unknown as { window?: { localStorage?: Storage } }
  if (win.window?.localStorage) {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get: () => win.window!.localStorage!,
    })
  } else {
    const store = new Map<string, string>()
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, String(v)),
        removeItem: (k: string) => void store.delete(k),
        clear: () => store.clear(),
        key: (i: number) => Array.from(store.keys())[i] ?? null,
        get length() {
          return store.size
        },
      },
    })
  }
}

// Reset DOM + React state between tests so they stay isolated.
afterEach(() => {
  cleanup()
  localStorage.clear()
})
