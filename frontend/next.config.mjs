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
};

export default nextConfig;
