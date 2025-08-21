const path = require('path');

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],  // unterstützt TypeScript
  experimental: {
    appDir: true,  // falls du den Layout Router nutzt
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'demo-src');
    return config;
  },
};
