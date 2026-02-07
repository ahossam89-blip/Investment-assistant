import { SCREENS } from '../../../lib/screens';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return SCREENS.map((s) => ({ slug: s.slug }));
}

export default function ScreenPage({ params }: { params: { slug: string } }) {
  const screen = SCREENS.find((s) => s.slug === params.slug);
  if (!screen) return notFound();

  const src = `/mockups/${screen.slug}.html`;

  return (
    <main className="container">
      <div className="header">
        <div>
          <a className="badge" href="/">← Back</a>
          <h1 style={{ margin: '10px 0 0', fontSize: 26 }}>{screen.title}</h1>
          <p style={{ margin: '6px 0 0', opacity: 0.75 }}>
            Rendering static HTML in an iframe: <code>{src}</code>
          </p>
        </div>
        <div className="nav">
          <a className="btn" href={src} target="_blank" rel="noreferrer">Open raw HTML</a>
        </div>
      </div>

      <div className="frame">
        <iframe
          title={screen.title}
          src={src}
          style={{ width: '100%', height: '100%', border: '0' }}
        />
      </div>
    </main>
  );
}
