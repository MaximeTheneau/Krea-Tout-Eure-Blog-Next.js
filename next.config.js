/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
