import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "api-cdn.figma.com" },
      { protocol: "https", hostname: "embed.figma.com" },
    ],
  },
};

export default nextConfig;
