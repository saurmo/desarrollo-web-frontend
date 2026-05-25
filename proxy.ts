import { NextRequest, NextResponse } from 'next/server';

type Role = 'donante' | 'admin';

interface TokenPayload {
  userId: string;
  role: Role;
  exp: number;
}

function decodeJwt(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;
  const payload = token ? decodeJwt(token) : null;
  const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : true;
  const isAuth = !!payload && !isExpired;

  if (!isAuth) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/dashboard/admin') && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/donante', request.url));
  }

  if (pathname.startsWith('/dashboard/donante') && payload.role !== 'donante' && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/dashboard') {
    const target = payload.role === 'admin' ? '/dashboard/admin' : '/dashboard/donante';
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
