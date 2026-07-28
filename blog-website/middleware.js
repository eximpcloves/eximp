import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith('/preview/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  matcher: '/preview/:path*',
};