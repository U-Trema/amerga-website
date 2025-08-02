import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
