"use client";

import type { CardAppearance, MeetingCard } from "@/types";

export function resolveCardAppearance(
  card?: Pick<MeetingCard, "appearance"> | null,
  fallback: CardAppearance = "light",
): CardAppearance {
  return card?.appearance ?? fallback;
}

export function appearanceAttrs(
  appearance: CardAppearance,
): { "data-appearance": CardAppearance } {
  return { "data-appearance": appearance };
}
