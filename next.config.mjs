/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Îi spunem unde stă folderul _next pe GitHub
  basePath: "/alutec-glass",
  assetPrefix: "/alutec-glass/",

  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;