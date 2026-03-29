/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/alutec-glass",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Această setare previne erorile de hidratare care pot apărea pe servere statice
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;