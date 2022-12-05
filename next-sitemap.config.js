const path = require('path');
/**
 * @type {import('next').NextConfig}
 * @type {import('next-sitemap').IConfig}
 */
const nextConfig = {
  siteUrl: process.env.SITE_URL || 'https://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      port: '',
      pathname: '/Krea-Tout-Eure-Blog-Symfony-/public/uploads/images/*',
    }],
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
  },
};

module.exports = nextConfig;
