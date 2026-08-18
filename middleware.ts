import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * English is served from the root so that every URL a resident already has
 * keeps working: /food-pantry stays /food-pantry, not /en/food-pantry.
 *
 * Internally every page lives under app/[lang], so this rewrites root-level
 * requests onto the English tree without changing the address bar. Spanish and
 * Russian already carry their prefix and pass straight through.
 */

const PREFIXED = ["/es", "/ru"];

// Paths that are not localized content and must never be rewritten.
const PASS_THROUGH = [
  "/api",
  "/admin",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/manifest.webmanifest",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PASS_THROUGH.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  ) {
    return NextResponse.next();
  }

  // Anything with a file extension is a static asset in /public.
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (PREFIXED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
