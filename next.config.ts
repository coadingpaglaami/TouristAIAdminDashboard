import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:['http://10.10.13.2:3143'],
  images:{
    remotePatterns:[new URL('https://res.cloudinary.com/**')]
  }
  /* config options here */
};

export default nextConfig;
