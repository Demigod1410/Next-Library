/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // ...
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any domain for book cover images
      },
    ],
  },
  // Optimize for large files like PDFs
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource',
    });
    return config;
  },
  // Enable static site generation for better reliability
  output: 'standalone',
  // Increase the asset size limit for PDFs (default is 1MB)
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024, // 128MB
  },
};

export default nextConfig;
