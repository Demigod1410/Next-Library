/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // PWA config if needed
  // experimental: {
  //   pwa: true,
  // },
};

export default nextConfig;
