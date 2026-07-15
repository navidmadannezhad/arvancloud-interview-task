import type { NextConfig } from "next";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!serverUrl) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${serverUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
