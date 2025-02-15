import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true }
};

export default nextConfig;
