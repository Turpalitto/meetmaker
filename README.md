# MeetMaker

Красивые интерактивные открытки-приглашения на встречу. Создатель задаёт даты, время и места — получатель выбирает удобный вариант по ссылке.

## Стек

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Framer Motion, Zustand
- Supabase (PostgreSQL) — опционально
- GitHub repo storage — fallback для Vercel без Supabase

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:3000 (или 3001, если порт занят).

## Хранение данных (продакшен)

**Приоритет:** Supabase → GitHub → in-memory (только dev).

### Вариант A — Supabase (рекомендуется)

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните `supabase/schema.sql` в SQL Editor
3. Добавьте env в Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://meetmaker.vercel.app
```

### Вариант B — GitHub (уже настроено для meetmaker.vercel.app)

Карточки сохраняются в приватный репозиторий [meetmaker-data](https://github.com/Turpalitto/meetmaker-data).

Env-переменные:

```
GITHUB_TOKEN=ghp_... (repo scope)
GITHUB_STORAGE_REPO=Turpalitto/meetmaker-data
NEXT_PUBLIC_SITE_URL=https://meetmaker.vercel.app
```

Проверка: `GET /api/health` → `"storage":"github","persistent":true`

Без Supabase и GitHub данные **не сохраняются** на Vercel между запросами.

## Маршруты

| Путь | Описание |
|------|----------|
| `/` | Лендинг |
| `/create` | Визард создания открытки |
| `/card/[id]` | Просмотр и выбор для получателя |
| `/status/[id]` | Статус встречи для создателя |
| `POST /api/cards` | Создать открытку |
| `GET/PATCH /api/cards/[id]` | Получить / обновить |
| `GET /api/health` | Проверка storage (supabase / memory) |

## Деплой на Vercel

```bash
vercel --prod
```

Добавьте env-переменные в настройках проекта Vercel.
