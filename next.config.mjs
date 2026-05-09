/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage — used for user-uploaded site avatar photos.
        // Pattern covers all Supabase project refs (*.supabase.co).
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  async rewrites() {
    return {
      beforeFiles: [
        /**
         * Subdomain routing — production only.
         *
         * Matches any request whose Host header is a single-label subdomain of
         * visionarydev.org (e.g. sarah-pt.visionarydev.org) and rewrites it to
         * the internal /sites/[subdomain] route, passing through any path suffix.
         *
         * The `has` array captures the subdomain from the hostname. The named
         * capture group :subdomain is forwarded to the destination.
         *
         * Local dev: use /sites/[subdomain] directly — e.g.
         *   http://localhost:3000/sites/sarah-pt
         */
        {
          source:      '/:path*',
          has: [
            {
              type:  'host',
              value: '(?<subdomain>[^.]+)\\.visionarydev\\.org',
            },
          ],
          destination: '/sites/:subdomain/:path*',
        },
      ],
    }
  },
}

export default nextConfig
