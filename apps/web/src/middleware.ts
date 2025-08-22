import { COOKIE } from '@/config/mock';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/find-pw', '/member-join'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const accessToken = request.cookies.get('accessToken')?.value;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 1. 로그인한 유저가 public 경로에 접근 시 -> /home으로 리디렉션
  if (COOKIE && isPublicPath) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 2. 로그인 안 한 유저가 public이 아닌 경로(보호된 경로)에 접근 시 -> /login으로 리디렉션
  if (!COOKIE && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // api, _next/static, _next/image, favicon.ico를 제외한 모든 경로에서 미들웨어를 실행
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
};
