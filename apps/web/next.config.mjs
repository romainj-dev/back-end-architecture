import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '@next/env'
const { loadEnvConfig } = pkg

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..')

// Load .env files from repo root before config is evaluated
loadEnvConfig(repoRoot)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  turbopack: {
    root: repoRoot,
  },
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' }, // Google
      { hostname: 'avatars.githubusercontent.com' }, // GitHub
      { hostname: 'media.licdn.com' }, // LinkedIn
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/mesh/:path*',
        destination: `${process.env.API_URL}:${process.env.MESH_GATEWAY_PORT}/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
