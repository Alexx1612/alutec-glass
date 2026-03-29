/** @type {import('next').NextConfig} */
const nextConfig = {
  // ==========================================
  // 1. SETĂRI PENTRU GITHUB PAGES (TESTARE ACUM)
  // ==========================================

  // Forțează crearea de fișiere statice (HTML/CSS) - obligatoriu pe GitHub Pages
  output: "export",

  // GitHub Pages nu suportă procesarea avansată a imaginilor din Next.js
  images: {
    unoptimized: true,
  },

  // Pentru că pe GitHub site-ul tău e într-un sub-folder (ex: github.io/alutec-glass)
  basePath: "/alutec-glass",

  // ==========================================
  // 2. SETĂRILE TALE ORIGINALE (PĂSTRATE)
  // ==========================================
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;