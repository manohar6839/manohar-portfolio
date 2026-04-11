import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
    if (!umamiUrl) return [];

    return [
      {
        source: "/stats/:path*",
        destination: `${umamiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
