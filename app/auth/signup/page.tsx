'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Lang } from '../../../lib/i18n';
import { t } from '../../../lib/i18n';

function getLangCookie(): Lang {
  if (typeof document === 'undefined') return 'en';
  const m = document.cookie.match(/(^| )lang=([^;]+)/);
  const v = m ? decodeURIComponent(m[2]) : 'en';
  return v === 'ar' ? 'ar' : 'en';
}

export default function SignupPage() {
  const enabled = useMemo(() => !!supabase, []);
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    setLang(getLangCookie());
  }, []);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!agree) return setMsg(t(lang, 'acceptTosErr'));
    if (!enabled) return setMsg(t(lang, 'supabaseMissingErr'));
    try {
      setBusy(true);
      const { error } = await supabase!.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) return setMsg(error.message);
      setMsg(t(lang, 'signupSent'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container" style={{ maxWidth: 520 }}>
      <div className="header">
        <a className="badge" href="/">{t(lang, 'back')}</a>
        <span className="badge">{t(lang, 'authBadge')}</span>
      </div>

      <div className="card">
        <h1 style={{ marginTop: 0 }}>{t(lang, 'createAccount')}</h1>
        <p style={{ marginTop: 6, opacity: 0.85 }}>
          {t(lang, 'createAccountDesc')}
        </p>

        <form onSubmit={onSubmit}>
          <label className="label">{t(lang, 'fullName')}</label>
          <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Mohamed Ali" required />

          <label className="label">{t(lang, 'workEmail')}</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" type="email" required />

          <label className="label">{t(lang, 'password')}</label>
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />

          <label style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 14 }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span style={{ fontSize: 13, opacity: 0.9 }}>{t(lang, 'agreeTos')}</span>
          </label>

          <button className="btn" type="submit" style={{ marginTop: 14 }} disabled={busy}>
            {busy ? t(lang, 'creating') : t(lang, 'createAccountBtn')}
          </button>
        </form>

        {msg && <p style={{ marginTop: 14, opacity: 0.9 }}>{msg}</p>}

        {!enabled && (
          <div style={{ marginTop: 14, opacity: 0.85 }}>
            <strong>{t(lang, 'supabaseNotConfigured')}</strong>
            <div style={{ marginTop: 6, fontSize: 13 }}>
              {t(lang, 'addEnvVars')}
              <ul>
                <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
                <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
