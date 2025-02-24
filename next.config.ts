import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
    // turbo: { rules: { "*.glsl": { loaders: ["raw-loader"], as: "raw" } } },
  },
  basePath: "",
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
