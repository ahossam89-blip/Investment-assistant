import { SCREENS } from '../lib/screens';
import { getLang } from '../lib/lang';
import { t } from '../lib/i18n';

export default function Home() {
  const lang = getLang();

  return (
    <main className="container">
      <div className="header">
        <div>
          <h1 style={{ margin: 0, fontSize: 32 }}>{t(lang, 'appTitle')}</h1>
          <p style={{ margin: '8px 0', opacity: 0.9 }}>
            {t(lang, 'subtitle')}
          </p>
        </div>
        <div className="nav">
          <a className="btn" href="/auth/signup">{t(lang, 'signupCta')}</a>
          <a className="btn" href="/admin/login">{t(lang, 'admin')}</a>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <strong>{t(lang, 'howWorksTitle')}</strong>
        <ul>
          <li>{t(lang, 'howWorks1')}</li>
          <li>{t(lang, 'howWorks2')}</li>
          <li>{t(lang, 'howWorks3')}</li>
        </ul>
      </div>

      <div className="grid">
        {SCREENS.map((s) => (
          <a key={s.slug} className="card" href={`/screens/${s.slug}`}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</div>
            <div style={{ marginTop: 6, opacity: 0.75, fontSize: 13 }}>{s.slug}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
