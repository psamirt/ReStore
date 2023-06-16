/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagekit.androidphoria.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's3.studytonight.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: "http2.mlstatic.com",
        port:""
      }
    ],
  },
};

module.exports = nextConfig;
