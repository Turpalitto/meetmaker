-- MeetMaker: meeting invitation cards
create extension if not exists "pgcrypto";

create table if not exists public.meeting_cards (
  id text primary key,
  title text not null,
  dates jsonb not null default '[]'::jsonb,
  places jsonb not null default '[]'::jsonb,
  theme text not null default 'romantic' check (theme in ('minimal', 'coffee', 'romantic')),
  recipient_name text,
  personal_note text,
  appearance text not null default 'light' check (appearance in ('light', 'dark')),
  status text not null default 'created' check (
    status in ('created', 'link_opened', 'recipient_choosing', 'response_received', 'confirmed')
  ),
  recipient_choice jsonb,
  created_at timestamptz not null default now()
);

create index if not exists meeting_cards_created_at_idx on public.meeting_cards (created_at desc);

alter table public.meeting_cards enable row level security;

-- Service role bypasses RLS; explicit policy for clarity
-- (API routes use service role key)
create policy "Service role full access"
  on public.meeting_cards
  for all
  using (true)
  with check (true);

-- Anon read access for realtime subscriptions (browser client uses anon key)
-- Writes still go through API routes with service role key
create policy "Anon read for realtime"
  on public.meeting_cards
  for select
  to anon
  using (true);

-- Enable realtime for meeting_cards so the status page can subscribe
-- instead of polling. Requires Supabase project with realtime enabled.
alter publication supabase_realtime add table public.meeting_cards;
