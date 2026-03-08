const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['@esm/shared'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical: /integrations/google-workspace → /google-workspace
      { source: '/integrations/google-workspace', destination: '/google-workspace', permanent: true },
    ];
  },
  // IndexNow key file is now served via middleware at runtime (no rebuild needed)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
