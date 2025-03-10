import type { NextConfig } from "next"

const withRspack = require("@next/plugin-rspack")

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

export default withRspack(nextConfig)
