export type Lang = 'en' | 'ar';

export const DEFAULT_LANG: Lang = 'en';

export const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    appTitle: 'Investment Assistant',
    subtitle: 'Converted from Stitch static export into a deployable Next.js shell.',
    howWorksTitle: 'How this works',
    howWorks1: 'Place each Stitch screen HTML into /public/screens/<slug>.html',
    howWorks2: 'Update lib/screens.ts with all your screen slugs (23 screens)',
    howWorks3: 'The app serves them in an iframe so navigation stays responsive on Vercel',
    signupCta: 'Signup (wire up Auth)',
    back: '← Back',
    authBadge: 'Auth',
    createAccount: 'Create your account',
    createAccountDesc: 'This signup form works once Supabase env vars are set. For production, manage admin via database roles.',
    fullName: 'Full name',
    workEmail: 'Work email',
    password: 'Password',
    agreeTos: 'I agree to the Terms of Service',
    creating: 'Creating…',
    createAccountBtn: 'Create account',
    acceptTosErr: 'Please accept Terms of Service',
    supabaseMissingErr: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel env vars.',
    signupSent: 'Signup request sent. If email confirmations are enabled, check your inbox.',
    supabaseNotConfigured: 'Supabase not configured.',
    addEnvVars: 'Add these in Vercel → Project → Settings → Environment Variables:',
    admin: 'Admin',
    adminLogin: 'Admin login',
    adminUsername: 'Username',
    adminPassword: 'Password',
    signIn: 'Sign in',
    adminDashboard: 'Admin dashboard',
    adminWelcome: 'You are signed in as admin.',
    logout: 'Log out'
  },
  ar: {
    appTitle: 'مساعد الاستثمار',
    subtitle: 'تم تحويل تصدير Stitch الثابت إلى هيكل Next.js قابل للنشر.',
    howWorksTitle: 'كيف يعمل',
    howWorks1: 'ضع ملفات HTML لكل شاشة داخل /public/screens/<slug>.html',
    howWorks2: 'حدّث lib/screens.ts بإسماء الشاشات (23 شاشة)',
    howWorks3: 'يعرض التطبيق الشاشات داخل iframe لتظل التنقلات تعمل على Vercel',
    signupCta: 'إنشاء حساب (توصيل المصادقة)',
    back: 'رجوع ←',
    authBadge: 'تسجيل',
    createAccount: 'إنشاء حساب',
    createAccountDesc: 'يعمل نموذج التسجيل بعد إعداد Supabase. للإنتاج استخدم صلاحيات قاعدة البيانات لتحديد الأدمن.',
    fullName: 'الاسم الكامل',
    workEmail: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    agreeTos: 'أوافق على شروط الخدمة',
    creating: 'جارٍ الإنشاء…',
    createAccountBtn: 'إنشاء حساب',
    acceptTosErr: 'يرجى الموافقة على شروط الخدمة',
    supabaseMissingErr: 'Supabase غير مُعد. أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY في إعدادات Vercel.',
    signupSent: 'تم إرسال طلب التسجيل. إذا كانت رسائل التأكيد مفعلة، افحص بريدك.',
    supabaseNotConfigured: 'Supabase غير مُعد.',
    addEnvVars: 'أضف المتغيرات التالية في Vercel → Project → Settings → Environment Variables:',
    admin: 'لوحة الإدارة',
    adminLogin: 'تسجيل دخول الأدمن',
    adminUsername: 'اسم المستخدم',
    adminPassword: 'كلمة المرور',
    signIn: 'دخول',
    adminDashboard: 'لوحة الإدارة',
    adminWelcome: 'تم تسجيل دخولك كأدمن.',
    logout: 'تسجيل خروج'
  }
};

export function t(lang: Lang, key: string): string {
  return STRINGS[lang]?.[key] ?? STRINGS[DEFAULT_LANG][key] ?? key;
}

export function isRTL(lang: Lang): boolean {
  return lang === 'ar';
}
