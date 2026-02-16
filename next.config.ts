import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/flights/airline_logos/**",
      },
      {
        protocol: "https", 
        hostname: "images.kiwi.com", 
        pathname: "/airlines/**"
      }
    ],
  },
};

export default nextConfig;
