/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimasi performa
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimasi images (jika dibutuhkan)
  images: {
    formats: ['image/webp'],
  },
  
  // Compress output
  compress: true,
  
  // Optimasi bundle
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
  },
}

module.exports = nextConfig
