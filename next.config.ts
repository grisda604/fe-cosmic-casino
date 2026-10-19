import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/MenuItems/:path*",
        destination: "https://ptmx-app.web.app/MenuItems/:path*",
      },
    ];
  },
};

export default nextConfig;
