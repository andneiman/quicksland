import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "api-cdn.figma.com" },
      { protocol: "https", hostname: "embed.figma.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en2",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en2/:path*",
        destination: "/en/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
