// eslint-disable-next-line import/no-import-module-exports
import path from 'path';

module.exports = {
  webpack: {
    alias: {
      '@containers': path.resolve(__dirname, './src/containers'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@features': path.resolve(__dirname, './src/features'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@services': path.resolve(__dirname, './src/services'),
      '@app': path.resolve(__dirname, './src/app'),
      '@customTypes': path.resolve(__dirname, './src/customTypes'),
      '@config': path.resolve(__dirname, './src/config'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@models': path.resolve(__dirname, './src/models'),
      '@customHooks': path.resolve(__dirname, './src/customHooks'),
    },
  },
};
