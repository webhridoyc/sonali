import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from '@/lib/admin-session';

export const dynamic = 'force-dynamic';

function isSafeString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export async function POST(request: Request) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!expectedUser || !expectedPass || !sessionSecret) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const username = body?.username;
  const password = body?.password;

  if (!isSafeString(username) || !isSafeString(password)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  // Default to a shorter session. You can override via ADMIN_SESSION_TTL_SECONDS.
  const ttl = Number(process.env.ADMIN_SESSION_TTL_SECONDS || 60 * 30);
  const payload = { iat: now, exp: now + ttl };
  const token = await createAdminSessionToken(payload, sessionSecret);

  const persist = process.env.ADMIN_SESSION_PERSIST === 'true';

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    persist
      ? {
          name: ADMIN_SESSION_COOKIE,
          value: token,
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/admin',
          maxAge: ttl,
        }
      : {
          name: ADMIN_SESSION_COOKIE,
          value: token,
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/admin',
        }
  );

  return response;
}
