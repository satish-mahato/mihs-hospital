import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote hosts allowed through the Next.js Image Optimizer.
    // NOTE: keep this in sync with the hosts returned by the backend API
    // (uploaded assets are served straight from the S3 bucket, e.g.
    // https://s3.ap-south-1.amazonaws.com/mihs.edu/uploads/images/<file>.webp
    // while cdn.mihs.edu.np is used for some static assets).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.mihs.edu.np",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mihs.edu.s3.ap-south-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mihs.edu.s3.amazonaws.com",
        port: "",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90, 95],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
