/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 86400, // 24 hours
  },

  webpack: (config, { isServer, dev }) => {
    // Only apply optimizations in production
    if (!dev) {
      // Enable tree shaking and module concatenation
      config.optimization = {
        ...config.optimization,
        concatenateModules: true,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 25,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Handle cases where module.context might be undefined
                if (!module.context) return 'vendor';
                const match = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                );
                return match ? `npm.${match[1].replace('@', '')}` : 'vendor';
              },
            },
          },
        },
      };
    }
    return config;
  },

  // Enable compression
  compress: true,

  experimental: {
    optimizeCss: true,
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = withBundleAnalyzer(nextConfig);
