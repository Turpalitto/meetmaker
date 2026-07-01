# MeetMaker

Красивые интерактивные открытки-приглашения на встречу. Создатель задаёт варианты даты, времени и места — получатель выбирает удобный по ссылке.

## Стек

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Drizzle ORM + PostgreSQL (локально или Supabase)

## Быстрый старт (этот ПК, без Supabase)

```bash
npm install
cp .env.example .env
# Поднять PostgreSQL и создать БД app_db, затем:
npm run db:apply
# или: npm run db:push
npm run dev
```

Откройте http://localhost:3000

### PostgreSQL через Docker

```bash
docker run -d --name meetmaker-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=app_db -p 5432:5432 postgres:16
npm run db:apply
```

## Supabase (другой ПК / продакшен)

На машине, где уже есть проект Supabase:

1. Скопируйте connection string из Supabase → Settings → Database
2. Положите в `.env.local` как `DATABASE_URL` (или `POSTGRES_URL_NON_POOLING`)
3. Примените схему:

```bash
npm run db:apply
```

Либо подтяните env с Vercel:

```bash
npx vercel env pull .env.local
npm run db:apply
```

> **Важно:** ветка `main` использует таблицу `cards` (новая схема). Старая `master` на Vercel использовала `meeting_cards` — перед переключением деплоя на `main` нужно применить `supabase/schema.sql`.

## Маршруты

| Путь | Описание |
|------|----------|
| `/` | Лендинг |
| `/create` | Визард создания открытки |
| `/card/[id]` | Просмотр и выбор для получателя |
| `/status/[id]` | Статус для создателя (polling) |
| `POST /api/cards` | Создать открытку |
| `GET/PATCH /api/cards/[id]` | Получить / обновить |
| `GET /api/health` | Проверка подключения к БД |

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run db:apply` | SQL-схема (Supabase / любой Postgres) |
| `npm run db:push` | Drizzle push схемы |
| `npm run db:studio` | Drizzle Studio |

## Деплой (Vercel)

```bash
vercel --prod
```

Переменные: `DATABASE_URL` (Supabase connection string с SSL).

## Ветки на GitHub

- `main` — текущая версия (Drizzle + PostgreSQL)
- `master` — предыдущая версия на meetmaker.vercel.app (Supabase SDK, другая схема)

Перед продакшен-деплоем `main` согласуйте схему БД и env на Vercel.

## Пока не сделано

- Email-уведомления (`notifyEmail` сохраняется, отправка не реализована)
- Публичная галерея (`isPublic` в схеме, UI нет)
