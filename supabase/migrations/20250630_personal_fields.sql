-- Add personal fields to existing MeetMaker database
alter table public.meeting_cards
  add column if not exists recipient_name text;

alter table public.meeting_cards
  add column if not exists personal_note text;

alter table public.meeting_cards
  add column if not exists appearance text not null default 'light';

alter table public.meeting_cards
  drop constraint if exists meeting_cards_appearance_check;

alter table public.meeting_cards
  add constraint meeting_cards_appearance_check
  check (appearance in ('light', 'dark'));
