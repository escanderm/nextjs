/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Заменяем "domains" на "remotePatterns" и используем массив строк
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**/*'
      }
    ]
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;