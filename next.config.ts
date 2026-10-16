import type { NextConfig } from "next";

/** Tree-shake lucide / motion barrel imports — smaller client chunks. */
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon/favicon.ico",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
