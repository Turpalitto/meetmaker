# MeetMaker

Красивые интерактивные открытки-приглашения на встречу. Создатель задаёт даты, время и места — получатель выбирает удобный вариант по ссылке.

## Стек

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Framer Motion, Zustand
- Supabase (PostgreSQL) — опционально, иначе in-memory (только локально)

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:3000 (или 3001, если порт занят).

## Supabase (для продакшена)

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните `supabase/schema.sql` в SQL Editor
3. Скопируйте `.env.example` → `.env.local` и заполните:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

Без Supabase данные хранятся в памяти сервера — **на Vercel это не работает** между запросами. Для деплоя Supabase обязателен.

## Маршруты

| Путь | Описание |
|------|----------|
| `/` | Лендинг |
| `/create` | Визард создания открытки |
| `/card/[id]` | Просмотр и выбор для получателя |
| `/status/[id]` | Статус встречи для создателя |
| `POST /api/cards` | Создать открытку |
| `GET/PATCH /api/cards/[id]` | Получить / обновить |

## Деплой на Vercel

```bash
vercel --prod
```

Добавьте env-переменные в настройках проекта Vercel.
