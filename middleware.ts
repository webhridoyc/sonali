import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-session';

export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  // Safer default: if env vars are missing, do NOT expose /admin.
  if (!expectedUser || !expectedPass || !sessionSecret) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const { pathname, search } = request.nextUrl;

  // Allow the login page + login endpoint + logout endpoint without session.
  if (
    pathname === '/admin/login' ||
    pathname === '/admin/logout' ||
    pathname.startsWith('/admin/login/') ||
    pathname === '/admin/api/login'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifyAdminSessionToken(token, sessionSecret);
  if (!session) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.searchParams.set('next', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  // Hardening for admin pages
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );
  return response;
}
