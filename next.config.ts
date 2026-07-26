import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/danuy5rqb/image/upload/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
