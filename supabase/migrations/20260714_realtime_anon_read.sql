-- Enable realtime for meeting_cards + anon read policy
-- Allows browser-side Supabase client to subscribe to card status changes
-- instead of polling the API every 5 seconds.

alter publication supabase_realtime add table public.meeting_cards;

create policy "Anon read for realtime"
  on public.meeting_cards
  for select
  to anon
  using (true);
