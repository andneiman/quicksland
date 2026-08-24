import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  serverActions: {
    allowedOrigins: ["quicks.school", "www.quicks.school", "quicksland.vercel.app"],
  },
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
