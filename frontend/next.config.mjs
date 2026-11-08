import path from 'node:path'
import { fileURLToPath } from 'node:url'
import createNextIntlPlugin from 'next-intl/plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack scoped to frontend/. A stray repo-root lockfile made Next
  // watch the whole monorepo and thrash memory during compile.
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Cloudinary resizes and picks the format, so these images skip Vercel's
    // optimizer and do not count toward its usage limits.
    loader: 'custom',
    loaderFile: './lib/cloudinary-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/wwgwrs4y/**',
      },
    ],
  },
  async redirects() {
    // Retired surfaces — keep old URLs from 404ing.
    // Vercel Domains owns the apex → www redirect. Keep www as primary to
    // match SITE_URL / metadataBase; an opposite redirect here creates a loop.
    return [
      { source: '/outbound', destination: '/tours', permanent: true },
      { source: '/mountains', destination: '/tours', permanent: true },
      { source: '/festivals', destination: '/blog', permanent: true },
      { source: '/how-we-travel', destination: '/about', permanent: true },
      { source: '/how-we-travel/:slug', destination: '/about', permanent: true },
      // Former How We Travel chapters once lived under /experiences/*
      ...[
        'walk-with-the-people-who-live-there',
        'arrive-for-the-feast-days',
        'rest-at-the-edge-of-the-wild',
        'light-first-photography',
        'access-through-relationship',
        'coffee-traced-to-origin',
      ].map((slug) => ({
        source: `/experiences/${slug}`,
        destination: '/about',
        permanent: true,
      })),
    ]
  },
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? 'http://localhost:5000'
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default withNextIntl(nextConfig)
