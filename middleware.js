import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run on all page routes except static assets and API routes.
     * Excludes: _next/static, _next/image, favicon, and /api/* (Stripe webhooks etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
}
