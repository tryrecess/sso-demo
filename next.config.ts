import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' *.recess.gg recess.gg *.tryrecess.dev tryrecess.dev;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
