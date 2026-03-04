import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isPublic = pathname === '/login' || pathname === '/register';
  const isProtected = pathname.startsWith('/grilla') || pathname.startsWith('/grafo');

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/grilla', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/grilla/:path*', '/grafo/:path*', '/login', '/register'],
};