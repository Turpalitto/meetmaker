"use client";

import type { ThemeType } from "@/types";

interface ThemeDecorationsProps {
  theme?: ThemeType;
  intensity?: "subtle" | "normal" | "bold";
}

/** iOS: clean background, no floating stickers */
export function ThemeDecorations(_props?: ThemeDecorationsProps) {
  return null;
}
