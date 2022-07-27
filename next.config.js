/* eslint-disable @typescript-eslint/no-var-requires */
const isProd = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');
const withImageLoader = require('next-image-loader');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  optimizedImages,
  withImageLoader,
  withBundleAnalyzer({
    experimental: {
      newNextLinkBehavior: true,
    },
    images: {
      domains: ['pedromarquez.dev', 'localhost'],
      loader: 'akamai',
      path: isProd ? '/' : '',
    },
    assetPrefix: isProd ? './' : '',
    basePath: '',
  }),
]);
