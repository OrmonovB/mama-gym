# Мама гимнастки — Next.js + Supabase

## Шаг 1 — Настройка Supabase

1. Зайдите на supabase.com и создайте проект
2. Откройте SQL Editor и выполните:

```sql
create table users (
  id uuid references auth.users primary key,
  name text not null,
  last_name text default '',
  email text not null unique,
  phone text default '',
  role text default 'user',
  created_at timestamptz default now()
);

create table orders (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  last_name text default '',
  phone text not null,
  email text default '',
  product text not null,
  size text default '',
  competition_date date,
  comment text default '',
  status text default 'new',
  created_at timestamptz default now()
);

alter table orders enable row level security;
create policy "Service role full access" on orders using (true) with check (true);
alter table users enable row level security;
create policy "Service role full access" on users using (true) with check (true);
```

3. Создайте администратора: Authentication → Users → Add user (admin@mama.ru / admin123)
   Затем: `update users set role = 'admin' where email = 'admin@mama.ru';`

## Шаг 2 — Переменные окружения

Создайте .env.local:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```
Ключи: Supabase → Settings → API

## Шаг 3 — Локальный запуск

```bash
npm install
npm run dev
```

## Шаг 4 — Деплой на Vercel

1. Загрузите на GitHub
2. vercel.com → Add New Project → выберите репозиторий
3. Добавьте три переменные из .env.local в Environment Variables
4. Deploy 🚀

## Как добавить фото

Положите в public/images/ и раскомментируйте <img> в коде:
- hero-gymnast.jpg — главный экран
- section-articles/salons/atelier/shops.jpg — карточки разделов
- review-1/2/3.jpg — фото в отзывах
- leotard-1..9.jpg — купальники
