import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Re-enable TypeScript checks during build after fixing errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Re-enable ESLint checks during build after fixing errors
    ignoreDuringBuilds: false,
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
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bosquemananciais.org.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['react-hook-form'], // Add this line
};

export default nextConfig;
