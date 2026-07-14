"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase, isRealtimeAvailable } from "@/lib/supabase-client";
import type { CardRow } from "@/lib/card-storage";
import type { MeetingSession } from "@/types";

function rowToSession(row: CardRow): MeetingSession {
  return {
    card: {
      id: row.id,
      title: row.title,
      dates: row.dates,
      places: row.places,
      theme: row.theme,
      createdAt: row.created_at,
      recipientName: row.recipient_name ?? undefined,
      personalNote: row.personal_note ?? undefined,
      appearance: row.appearance ?? "light",
    },
    status: row.status,
    recipientChoice: row.recipient_choice ?? undefined,
  };
}

export function useCardRealtime(
  cardId: string | null,
  onUpdate: (session: MeetingSession) => void,
): { connected: boolean; active: boolean } {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!cardId || !isRealtimeAvailable()) return;

    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const channel = supabase
      .channel(`card-${cardId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "meeting_cards",
          filter: `id=eq.${cardId}`,
        },
        (payload) => {
          const row = payload.new as CardRow;
          if (row) {
            onUpdate(rowToSession(row));
          }
        },
      )
      .subscribe((status) => {
        setConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
      setConnected(false);
    };
  }, [cardId, onUpdate]);

  return {
    connected,
    active: isRealtimeAvailable() && Boolean(cardId),
  };
}
