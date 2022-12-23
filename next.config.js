const path = require('path');
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'back.krea-tout-eure.fr',
      port: '',
      pathname: '/public/uploads/images/*',
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

module.exports = nextConfig, {
  siteUrl: 'https://krea-tout-eure.fr',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  additionnalSitemaps: [
    {
      path: '/sitemap-0.xml',
      changefreq: 'daily',
      priority: 0.7,
      sitemapSize: 7000,
      exclude: ['/'],
      },
      ],
      };

