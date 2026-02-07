import type { Metadata } from 'next';
import '../styles/globals.css';
import LanguageToggle from './components/LanguageToggle';
import { getLang } from '../lib/lang';
import { isRTL } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Investment Assistant (Live)',
  description: 'Converted from Stitch static export into a deployable Next.js app skeleton.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLang();
  const dir = isRTL(lang) ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body>
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
          <LanguageToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
