import { NextResponse } from 'next/server';
import { createAdminSession, getAdminPassword, getAdminUsername, ADMIN_SESSION_COOKIE } from '../../../../lib/adminAuth';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body?.username || '');
  const password = String(body?.password || '');

  if (username !== getAdminUsername() || password !== getAdminPassword()) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createAdminSession();
  const res = NextResponse.json({ ok: true });

  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 8 // 8 hours
  });

  return res;
}
