import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Department/doctor images are served from multiple CDNs (e.g.
    // nins-cdn.zephlotech.com, zephlotech.com). Allow any https host for now;
    // tighten to known hosts once the asset domains are finalized.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
}

export default nextConfig
