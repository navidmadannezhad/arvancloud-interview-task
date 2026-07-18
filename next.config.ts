import type { NextConfig } from "next";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const nextConfig: NextConfig = {
  output: "standalone",
    async rewrites() {
    if (!serverUrl) return [];

    return [
      {
        source: "/api/:path((?!auth/login|auth/refresh|auth/logout|auth/me).*)",
        destination: `${serverUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
