import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.wypazanotim.tv',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.feb.cm',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudcoffee.com.bd',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
