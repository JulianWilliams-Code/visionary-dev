/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        /**
         * Subdomain routing — production only.
         *
         * Matches any request whose Host header is a single-label subdomain of
         * visionarydev.com (e.g. sarah-pt.visionarydev.com) and rewrites it to
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
              value: '(?<subdomain>[^.]+)\\.visionarydev\\.com',
            },
          ],
          destination: '/sites/:subdomain/:path*',
        },
      ],
    }
  },
}

export default nextConfig
