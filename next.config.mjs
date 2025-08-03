/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringB: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
