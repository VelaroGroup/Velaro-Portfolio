import type { NextConfig } from 'next';

const production = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Public commit identity is compiled into static and dynamic page metadata.
  env: { VELARO_RELEASE_SHA: process.env.GITHUB_SHA || 'local' },
  // Opt in for a minimal Node/container artifact; ordinary `next start` stays supported.
  output: process.env.VELARO_STANDALONE === '1' ? 'standalone' : undefined,
  images: {
    localPatterns: [
      { pathname: '/velaro-logo.png', search: '' },
      { pathname: '/velaro-mark.png', search: '' },
      { pathname: '/images/**', search: '' },
      { pathname: '/projects/**', search: '' },
      { pathname: '/_next/static/media/**', search: '' },
    ],
    qualities: [75],
    maximumRedirects: 0,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: '^velaro\\.group$' }],
        destination: 'https://www.velaro.group/',
        permanent: true,
      },
      {
        source: '/:path+',
        has: [{ type: 'host', value: '^velaro\\.group$' }],
        destination: 'https://www.velaro.group/:path*',
        permanent: true,
      },
      { source: '/website-development-lebanon', destination: '/services/web', permanent: true },
      { source: '/website-development-middle-east', destination: '/services/web', permanent: true },
      { source: '/shopify-store-lebanon', destination: '/services/ecommerce', permanent: true },
      { source: '/packages', destination: '/contact', permanent: true },
    ];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        ...(production ? [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] : []),
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        // Compatible with Next's static rendering and inline hydration scripts.
        { key: 'Content-Security-Policy', value: `base-uri 'self'; object-src 'none'${production ? "; frame-ancestors 'self'" : ''}` },
        ...(process.env.SITE_NOINDEX === '1' ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
      ],
    }];
  },
};

export default nextConfig;
