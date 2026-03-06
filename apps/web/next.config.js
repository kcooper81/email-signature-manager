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
  async rewrites() {
    // IndexNow requires key file at /{key}.txt — rewrite to our API route
    return process.env.INDEXNOW_API_KEY
      ? [{ source: `/${process.env.INDEXNOW_API_KEY}.txt`, destination: '/api/indexnow-key' }]
      : [];
  },
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
