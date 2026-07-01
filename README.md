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

### Supabase (активно на meetmaker.vercel.app)

Подключено через Vercel Integration (`meetmaker-db`, регион `fra1`).

Локально применить схему:

```bash
node scripts/apply-schema.mjs
```

Env подтягиваются автоматически: `npx vercel env pull .env.local`

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
