import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/russian-music-learning",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
