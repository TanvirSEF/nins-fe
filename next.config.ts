import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Turbopack: Rust-based compiler — dramatically faster dev HMR and cold
  // compile times vs Webpack (often 3–10×). Stable in Next.js 15+.
  turbopack: {},

  images: {
    // Tightened from hostname:"**" to known CDN origins. This allows Next.js
    // image optimisation to work (the wildcard disables it as a security measure).
    remotePatterns: [
      { protocol: "https", hostname: "nins-cdn.zephlotech.com" },
      { protocol: "https", hostname: "zephlotech.com" },
      { protocol: "https", hostname: "**.zephlotech.com" },
    ],
  },

  experimental: {
    // Tree-shake icon libraries and Radix UI on a per-import basis so only
    // used icons/primitives are included in each route's bundle.
    optimizePackageImports: [
      "lucide-react",
      "radix-ui",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "date-fns",
    ],
  },

  output: "standalone",
}

export default nextConfig
