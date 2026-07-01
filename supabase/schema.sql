-- MeetMaker: invitation cards (Drizzle schema)
create table if not exists public.cards (
  id text primary key,
  creator_name text not null,
  recipient_name text not null,
  message text not null default '',
  slots jsonb not null default '[]'::jsonb,
  chosen_slot_id text,
  status text not null default 'pending',
  theme text not null default 'sunset',
  emoji text not null default '🌟',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  notify_email text,
  is_public boolean not null default false
);

create index if not exists cards_created_at_idx on public.cards (created_at desc);

alter table public.cards enable row level security;

drop policy if exists "Service role full access" on public.cards;
create policy "Service role full access"
  on public.cards
  for all
  using (true)
  with check (true);
