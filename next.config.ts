import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['via.placeholder.com'], // Add the hostname here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Specify the Strapi port
        pathname: '/uploads/**', // Match all images in the /uploads folder
      },
    ],
  },
  
};

export default nextConfig;
