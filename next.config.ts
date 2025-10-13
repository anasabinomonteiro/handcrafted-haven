import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Replace with the hostname of your image source
        port: '', // Optional: specify if a non-standard port is used
         // Optional: specify a path pattern
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Replace with the hostname of your image source
        port: '', // Optional: specify if a non-standard port is used
         // Optional: specify a path pattern
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com', // Replace with the hostname of your image source
        port: '', // Optional: specify if a non-standard port is used
         // Optional: specify a path pattern
      },
    ],
  },
};

export default nextConfig;
