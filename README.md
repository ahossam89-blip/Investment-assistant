# Investment Assistant (Live)

## What happened
Your current deployment is a **Stitch static HTML mockup export**. It looks real, but it's not an application: there is no React/Next project, no build, and no backend. That is why tabs/forms were "non responsive".

This repo is a **Next.js shell** that:
- hosts your exported HTML screens under `/mockups/*.html`
- provides real routing `/screens/<slug>`
- includes a working Signup page that becomes functional once you connect Supabase

## 1) Add your Stitch screens
Put each exported screen HTML file in:

`public/mockups/<slug>.html`

Update `lib/screens.ts` with all 23 slugs.

## 2) Add Supabase Auth
Create a Supabase project, then add env vars in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3) Admin user (automatic first-user admin)
Run in Supabase SQL editor:

```sql
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case
      when (select count(*) from public.profiles) = 0 then 'admin'
      else 'user'
    end
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure handle_new_user();
```

## 4) Deploy to Vercel
1. Push this repo to GitHub
2. Import to Vercel
3. Framework: **Next.js** (auto)
4. Deploy



## Language (English / Arabic)

A simple language toggle is included (top-right). It stores the selected language in a `lang` cookie (`en` / `ar`) and switches `dir` to RTL for Arabic.

## Admin Login (Requested)

An **Admin** demo login is available at `/admin/login`.

- Default username: `admin_Sadek`
- Default password: `87500005+Aa`

**Important:** This is for demo only. For production, override credentials and set a secret in Vercel environment variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` (required for secure sessions)

Then redeploy.
