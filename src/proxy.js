// proxy.js
import { NextResponse } from 'next/server';

const defaultLocale = 'en';
const hindiPrefix = '/hindi';

// Paths to skip (static files, api, etc.)
const skippedPrefixes = [
  '/_next',
  '/api',
  '/static',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

function cloneWithPath(req, pathname) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  return url;
}

/** @param {import('next/server').NextRequest} req */
export function proxy(req) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static/assets/api/...
  if (skippedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // ────────────────────────────────────────────────
  // 1. Redirect /en → /    (and /en/xxx → /xxx)
  // ────────────────────────────────────────────────
  if (pathname.startsWith('/en')) {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(cloneWithPath(req, newPath));
  }

  // ────────────────────────────────────────────────
  // 2. Hindi prefix → internal rewrite to /hi/...
  // ────────────────────────────────────────────────
  if (pathname.startsWith(hindiPrefix)) {
    const internalPath = pathname.replace(hindiPrefix, '') || '/';
    return NextResponse.rewrite(cloneWithPath(req, `/hi${internalPath}`));
  }

  // ────────────────────────────────────────────────
  // 3. No prefix → default locale (English) via rewrite
  //    → browser still shows clean /blog/my-post
  // ────────────────────────────────────────────────
  return NextResponse.rewrite(
    cloneWithPath(req, `/${defaultLocale}${pathname === '/' ? '' : pathname}`)
  );
}

export const config = {
  matcher: [
    // Match the base-path root too, otherwise /your-picks can skip middleware.
    '/',
    // Match everything except api/_next/static files, etc.
    '/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
