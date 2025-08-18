/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Increased to 6MB as requested
    },
  },
};

export default nextConfig;
