import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.mihs.edu.np",
        port: "",
      },
    ],
  },
};

export default nextConfig;
