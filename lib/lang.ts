import { cookies } from 'next/headers';
import type { Lang } from './i18n';
import { DEFAULT_LANG } from './i18n';

export const LANG_COOKIE = 'lang';

export function getLang(): Lang {
  const c = cookies().get(LANG_COOKIE)?.value;
  return (c === 'ar' || c === 'en') ? c : DEFAULT_LANG;
}
