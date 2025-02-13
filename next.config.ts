import { config } from "process"
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/i,
      loader: "raw-loader",
    })

    // Important: return the modified config
    return config
  },
  basePath: "",
  output: "export",
}

export default nextConfig
