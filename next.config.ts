import type { NextConfig } from "next";

/** Tree-shake lucide / motion barrel imports — smaller client chunks. */
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
};

export default nextConfig;
