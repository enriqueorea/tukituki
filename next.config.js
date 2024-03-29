/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn7.kiwilimon.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
