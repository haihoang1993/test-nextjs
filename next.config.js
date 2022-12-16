/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/post/:path*", destination: "/api/:path*" }];
  },
  experimental: {
    allowMiddlewareResponseBody: true,
  },
}

module.exports = nextConfig
