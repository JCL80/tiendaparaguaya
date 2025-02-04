import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "via.placeholder.com", 
      "tiendaparaguaya.nyc3.cdn.digitaloceanspaces.com" // ✅ Added your image domain
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Specify the Strapi port
        pathname: "/uploads/**", // Match all images in the /uploads folder
      },
    ],
  },
};

export default nextConfig;
