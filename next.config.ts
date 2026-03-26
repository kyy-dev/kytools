import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Abaikan error ESLint pas build di Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Abaikan error TypeScript pas build di Vercel
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
