import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = 'www.esslingencastle.com';

export default function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;

  // 1) Enforce the www canonical host for the production apex only
  //    (preview / workers.dev domains are left untouched)
  if (hostname === 'esslingencastle.com') {
    const url = request.nextUrl.clone();
    url.host = WWW_HOST;
    url.port = '';
    return NextResponse.redirect(url, { status: 308 });
  }

  // 2) Remove trailing slash (except the root) so /de/ → /de
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, { status: 308 });
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
