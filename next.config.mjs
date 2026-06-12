/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/LearnStack',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
