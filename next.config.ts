import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client-runtime-utils", "bcryptjs"],
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
