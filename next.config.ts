import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: { rules: { "*.glsl": { loaders: ["raw-loader"], as: "raw" } } },
    reactCompiler: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
      use: {
        loader: "raw-loader",
      },
    })
    return config
  },
  basePath: "",
  output: "export",
}

export default nextConfig
