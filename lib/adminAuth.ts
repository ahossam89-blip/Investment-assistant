import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'admin_session';

/**
 * SECURITY NOTE:
 * For production, DO NOT rely on a hardcoded admin user.
 * Use Supabase (or another identity provider) + roles in your database.
 *
 * These defaults exist ONLY because you requested a fixed admin credential.
 * Override them in Vercel Environment Variables.
 */
export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || 'admin_Sadek';
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || '87500005+Aa';
}

function sessionToken(): string {
  // Set this in Vercel as a long random string.
  // Edge Middleware cannot use Node's `crypto`, so we keep the middleware check Edge-safe.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_TOKEN || 'dev-insecure-admin-token-change-me';
}

export function createAdminSession(): string {
  // Opaque token stored in an HttpOnly cookie.
  return sessionToken();
}

export function verifyAdminSession(token: string | undefined | null): boolean {
  if (!token) return false;
  return token === sessionToken();
}

export function isAdminAuthed(): boolean {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSession(token);
}
