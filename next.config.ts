// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['via.placeholder.com', 'api.siputzx.my.id', 'www.tikwm.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ESLint configuration moved to eslint.config.mjs
  // Remove eslint from here
};

export default nextConfig;