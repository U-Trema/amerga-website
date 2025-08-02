import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  output: 'export',
  images: { unoptimized: true },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'ALLOW-FROM https://amerga-dev.netlify.app'
  //         }
  //       ]
  //     }
  //   ];
  // }
};

export default nextConfig;
