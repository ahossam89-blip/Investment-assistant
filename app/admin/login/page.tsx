'use client';

import { useMemo, useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const canPost = useMemo(() => true, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!canPost) return;

    try {
      setBusy(true);
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setMsg(data?.error || 'Login failed');
      window.location.href = '/admin';
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container" style={{ maxWidth: 520 }}>
      <div className="header">
        <a className="badge" href="/">← Back</a>
        <span className="badge">Admin</span>
      </div>

      <div className="card">
        <h1 style={{ marginTop: 0 }}>Admin login</h1>
        <p style={{ marginTop: 6, opacity: 0.85 }}>
          For production, replace this with Supabase role-based admin. Set ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SESSION_SECRET in Vercel.
        </p>

        <form onSubmit={onSubmit}>
          <label className="label">Username</label>
          <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" required />

          <label className="label">Password</label>
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />

          <button className="btn" type="submit" style={{ marginTop: 14 }} disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {msg && <p style={{ marginTop: 14, opacity: 0.9 }}>{msg}</p>}
      </div>
    </main>
  );
}
