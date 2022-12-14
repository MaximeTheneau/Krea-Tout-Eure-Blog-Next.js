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

module.exports = nextConfig;
