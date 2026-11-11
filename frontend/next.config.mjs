/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a check build run beside a live dev server without sharing its cache.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.8", "172.19.228.248"],
};

export default nextConfig;
