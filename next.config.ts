import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phim.nguonc.com",
      },
      {
        protocol: "https",
        hostname: "phimimg.com", // Often used as well
      },
    ],
  },
};

export default nextConfig;
