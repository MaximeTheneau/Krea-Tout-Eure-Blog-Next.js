const path = require('path');
/**
 * @type {import('next').NextConfig}
 * @type {import('next-sitemap').IConfig}
 */
const nextConfig = {
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
    'react/prop-types': 'off',
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
