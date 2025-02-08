import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: { rules: { "*.glsl": { loaders: ["raw-loader"], as: "raw" } } },
    // reactCompiler: true,
  },
  basePath: "",
  output: "export",
}

export default nextConfig
