/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.sanity.io' },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
