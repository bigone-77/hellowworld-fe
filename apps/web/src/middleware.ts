import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/login',
  '/find-pw',
  '/member-join',
  '/redirect/oauth/google',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const loginUser = request.cookies.get('accessToken')?.value;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (loginUser && isPublicPath) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!loginUser && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
};
