import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  githubCreateCard,
  githubGetCard,
  githubUpdateCard,
  isGitHubConfigured,
} from "@/lib/github-storage";
import type {
  MeetingCard,
  MeetingSession,
  MeetingStatus,
  RecipientChoice,
} from "@/types";

export interface CardRow {
  id: string;
  title: string;
  dates: MeetingCard["dates"];
  places: MeetingCard["places"];
  theme: MeetingCard["theme"];
  status: MeetingStatus;
  recipient_choice: RecipientChoice | null;
  created_at: string;
}

const memoryStore = new Map<string, CardRow>();

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function rowToSession(row: CardRow): MeetingSession {
  return {
    card: {
      id: row.id,
      title: row.title,
      dates: row.dates,
      places: row.places,
      theme: row.theme,
      createdAt: row.created_at,
    },
    status: row.status,
    recipientChoice: row.recipient_choice ?? undefined,
  };
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export type StorageBackend = "supabase" | "github" | "memory";

export function getStorageBackend(): StorageBackend {
  if (isSupabaseConfigured()) return "supabase";
  if (isGitHubConfigured()) return "github";
  return "memory";
}

export async function createCard(card: MeetingCard): Promise<MeetingSession> {
  const row: CardRow = {
    id: card.id,
    title: card.title,
    dates: card.dates,
    places: card.places,
    theme: card.theme,
    status: "created",
    recipient_choice: null,
    created_at: card.createdAt,
  };

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("meeting_cards").insert(row);
    if (error) throw new Error(error.message);
  } else if (isGitHubConfigured()) {
    await githubCreateCard(row);
  } else {
    memoryStore.set(row.id, row);
  }

  return rowToSession(row);
}

export async function getCard(id: string): Promise<MeetingSession | null> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("meeting_cards")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? rowToSession(data as CardRow) : null;
  }

  if (isGitHubConfigured()) {
    const row = await githubGetCard(id);
    return row ? rowToSession(row) : null;
  }

  const row = memoryStore.get(id);
  return row ? rowToSession(row) : null;
}

export async function updateCard(
  id: string,
  patch: Partial<Pick<CardRow, "status" | "recipient_choice">>,
): Promise<MeetingSession | null> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("meeting_cards")
      .update(patch)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? rowToSession(data as CardRow) : null;
  }

  if (isGitHubConfigured()) {
    const updated = await githubUpdateCard(id, patch);
    return updated ? rowToSession(updated) : null;
  }

  const row = memoryStore.get(id);
  if (!row) return null;
  const updated = { ...row, ...patch };
  memoryStore.set(id, updated);
  return rowToSession(updated);
}
