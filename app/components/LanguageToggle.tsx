'use client';

import { useEffect, useState } from 'react';

const LANG_COOKIE = 'lang';

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

export default function LanguageToggle() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const v = getCookie(LANG_COOKIE);
    if (v === 'ar' || v === 'en') setLang(v);
  }, []);

  function toggle() {
    const next = lang === 'en' ? 'ar' : 'en';
    setCookie(LANG_COOKIE, next);
    // full reload so server components pick up cookie + dir changes
    window.location.reload();
  }

  return (
    <button className="btn" type="button" onClick={toggle} aria-label="Toggle language">
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
