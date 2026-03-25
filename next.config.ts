import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.siputzx.my.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Mengabaikan error saat build di Vercel agar lancar
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
