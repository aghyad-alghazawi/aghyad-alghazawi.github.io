import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    after: true,
  },
  basePath: "",
  output: "export",
}

export default nextConfig
