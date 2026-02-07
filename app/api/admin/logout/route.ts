import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '../../../../lib/adminAuth';

export async function POST() {
  const res = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  res.cookies.set(ADMIN_SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
