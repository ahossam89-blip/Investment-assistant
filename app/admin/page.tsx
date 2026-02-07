import { isAdminAuthed } from '../../lib/adminAuth';

export default function AdminPage() {
  const ok = isAdminAuthed();

  return (
    <main className="container" style={{ maxWidth: 760 }}>
      <div className="header">
        <a className="badge" href="/">← Back</a>
        <span className="badge">Admin</span>
        <div className="nav" style={{ marginLeft: 'auto' }}>
          <form action="/api/admin/logout" method="post">
            <button className="btn" type="submit">Log out</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h1 style={{ marginTop: 0 }}>Admin dashboard</h1>
        {ok ? (
          <p style={{ opacity: 0.9 }}>You are signed in as admin.</p>
        ) : (
          <p style={{ opacity: 0.9 }}>Not authenticated.</p>
        )}
        <ul style={{ marginTop: 12 }}>
          <li>Next step: wire real admin role checks via Supabase profiles table.</li>
          <li>Move sensitive admin actions behind server-side checks (not client).</li>
        </ul>
      </div>
    </main>
  );
}
