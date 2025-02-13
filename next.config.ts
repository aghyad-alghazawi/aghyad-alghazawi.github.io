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
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    })
    return config
  },
  basePath: "",
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
