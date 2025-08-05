import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  /* config options here */
  distDir: process.env.BUILD_DIR || ".next",
	transpilePackages: ["three"],

  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  eslint: {
    ignoreDuringBuilds: true,
  },
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // TODO Startup: Remove this in production
      // {
      // 	protocol: "https",
      // 	hostname: "craft.ddev.site",
      // 	port: "",
      // 	pathname: "/publicFiles/**",
      // },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
