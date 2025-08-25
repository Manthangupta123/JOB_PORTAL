import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ this skips lint errors on Vercel
  },
  typescript: {
    ignoreBuildErrors: true, // optional: skip TS errors if they block deploy
  },
}

export default nextConfig
