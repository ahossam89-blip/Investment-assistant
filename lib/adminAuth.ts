import crypto from 'crypto';
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

function secret(): string {
  // Must be set in production
  return process.env.ADMIN_SESSION_SECRET || 'dev-insecure-secret-change-me';
}

export function createAdminSession(): string {
  const payload = JSON.stringify({
    u: getAdminUsername(),
    iat: Date.now()
  });
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return Buffer.from(payload).toString('base64url') + '.' + sig;
}

export function verifyAdminSession(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const payloadB64 = parts[0];
  const sig = parts[1];
  let payload: string;
  try {
    payload = Buffer.from(payloadB64, 'base64url').toString('utf8');
  } catch {
    return false;
  }
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try {
    const obj = JSON.parse(payload);
    return obj?.u === getAdminUsername();
  } catch {
    return false;
  }
}

export function isAdminAuthed(): boolean {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSession(token);
}
