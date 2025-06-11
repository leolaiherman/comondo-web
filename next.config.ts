import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // assetPrefix: isProd ? "/" : "",
  // basePath: isProd ? "/" : "",
  images: {
    unoptimized: true, // Required for static export (next export)
  },
};

export default nextConfig;