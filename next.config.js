const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ['pedromarquez.dev', 'localhost'],
  },
});
