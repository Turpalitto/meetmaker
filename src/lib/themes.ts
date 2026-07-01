import { Coffee, Heart, Sparkles, type LucideIcon } from "lucide-react";
import type { ThemeType } from "@/types";

export interface ThemeConfig {
  id: ThemeType;
  label: string;
  labelRu: string;
  description: string;
  gradient: string;
  emoji: string;
  stickers: string[];
  decor: string[];
  ribbon: string;
  tagline: string;
  badge?: string;
  icon: LucideIcon;
}

/** Romantic first — default feminine-forward palette */
export const THEME_ORDER: ThemeType[] = ["romantic", "coffee", "minimal"];

export const THEME_CONFIG: Record<ThemeType, ThemeConfig> = {
  romantic: {
    id: "romantic",
    label: "Romantic",
    labelRu: "Романтика",
    description: "Нежно, как открытка к свиданию",
    gradient: "from-pink-400 via-rose-400 to-fuchsia-400",
    emoji: "💕",
    stickers: ["💕", "💗", "🌸", "🎀", "💖", "🌹", "✨", "💝"],
    decor: ["💕", "🌸", "💖", "🎀"],
    ribbon: "♡ meetmaker ♡",
    tagline: "С любовью к деталям",
    badge: "Популярный",
    icon: Heart,
  },
  coffee: {
    id: "coffee",
    label: "Coffee",
    labelRu: "Уют",
    description: "Тёплый вайб кофейни и болтовни",
    gradient: "from-amber-500 via-orange-400 to-rose-300",
    emoji: "☕",
    stickers: ["☕", "🫖", "🍪", "🥐", "🧁", "🍯", "✨", "☕"],
    decor: ["☕", "🍪", "🥐", "🫖"],
    ribbon: "☕ уютно ♡",
    tagline: "Тепло и по-домашнему",
    icon: Coffee,
  },
  minimal: {
    id: "minimal",
    label: "Minimal",
    labelRu: "Лаконично",
    description: "Чисто и современно",
    gradient: "from-violet-400 via-indigo-400 to-purple-500",
    emoji: "✨",
    stickers: ["✨", "⭐", "💫", "🌟", "✦", "🤍", "✨", "⭐"],
    decor: ["✨", "⭐", "💫", "🌟"],
    ribbon: "✦ meetmaker ✦",
    tagline: "Стильно и просто",
    icon: Sparkles,
  },
};

export function getThemeConfig(theme: ThemeType): ThemeConfig {
  return THEME_CONFIG[theme];
}

export function themeGradientClass(theme: ThemeType): string {
  if (theme === "coffee") return "from-amber-400 via-orange-400 to-rose-300";
  if (theme === "romantic") return "from-pink-400 via-rose-400 to-fuchsia-400";
  return "from-violet-400 via-indigo-400 to-purple-500";
}
