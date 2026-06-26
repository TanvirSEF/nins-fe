import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// Vitest config — runs independently of the Next.js build (pnpm test).
// Resolves the `@/*` path alias from tsconfig.json via Vite's native support.
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist", "out"],
  },
})
