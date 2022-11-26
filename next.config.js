/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'http',
            hostname: 'localhost',
            port: '',
            pathname: '/Krea-Tout-Eure-Blog-Symfony-/public/uploads/images/*',
            },
    ],
    },
  }

module.exports = nextConfig
