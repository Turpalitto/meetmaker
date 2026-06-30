import type { MeetingCard, MeetingSession, RecipientChoice } from "@/types";

export async function saveCard(card: MeetingCard): Promise<MeetingSession> {
  const res = await fetch("/api/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ card }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Не удалось сохранить открытку");
  }
  return res.json();
}

export async function fetchCard(id: string): Promise<MeetingSession | null> {
  const res = await fetch(`/api/cards/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Не удалось загрузить открытку");
  }
  return res.json();
}

export async function submitRecipientChoice(
  id: string,
  choice: RecipientChoice,
): Promise<MeetingSession> {
  const res = await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipientChoice: choice }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Не удалось отправить ответ");
  }
  return res.json();
}

export async function markCardOpened(id: string): Promise<void> {
  await fetch(`/api/cards/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "link_opened" }),
  });
}
