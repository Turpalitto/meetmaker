import { Coffee, Footprints, Heart, type LucideIcon } from "lucide-react";
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
  accent: string;
  /** M3 primary container */
  primaryContainer: string;
  onPrimaryContainer: string;
}

export const THEME_ORDER: ThemeType[] = ["romantic", "coffee", "minimal"];

// Редизайн «Тёплая бумага»: акценты приведены к тёплой кремово-терракотовой
// палитре. Значения синхронизированы с [data-theme] в globals.css.
export const THEME_CONFIG: Record<ThemeType, ThemeConfig> = {
  romantic: {
    id: "romantic",
    label: "Date",
    labelRu: "Свидание",
    description: "Нежно, по-вечернему",
    gradient: "from-[#D98A76] to-[#C2603D]",
    accent: "#C2603D",
    primaryContainer: "#FBEADF",
    onPrimaryContainer: "#6b4a3c",
    emoji: "💗",
    stickers: ["💗", "✨", "🌸", "🕯️"],
    decor: ["rose", "sparkle"],
    ribbon: "Свидание",
    tagline: "Буду ждать нашей встречи",
    badge: "Популярный",
    icon: Heart,
  },
  coffee: {
    id: "coffee",
    label: "Coffee",
    labelRu: "Кофе",
    description: "Уютно и по-домашнему",
    gradient: "from-[#C79A6B] to-[#A5673A]",
    accent: "#A5673A",
    primaryContainer: "#F3E7D6",
    onPrimaryContainer: "#6a4322",
    emoji: "☕",
    stickers: ["☕", "🥐", "✨", "🤎"],
    decor: ["steam", "warm"],
    ribbon: "Кофе",
    tagline: "С удовольствием встречу тебя за чашкой",
    icon: Coffee,
  },
  minimal: {
    id: "minimal",
    label: "Walk",
    labelRu: "Прогулка",
    description: "Свежо и без суеты",
    gradient: "from-[#8FB985] to-[#5E8A5A]",
    accent: "#5E8A5A",
    primaryContainer: "#E6EFE0",
    onPrimaryContainer: "#3c5335",
    emoji: "🌿",
    stickers: ["🌿", "🦋", "✨", "🌤️"],
    decor: ["leaf", "breeze"],
    ribbon: "Прогулка",
    tagline: "Погуляем и поговорим",
    icon: Footprints,
  },
};

export function getThemeConfig(theme: ThemeType): ThemeConfig {
  return THEME_CONFIG[theme];
}

export function themeGradientClass(theme: ThemeType): string {
  return THEME_CONFIG[theme].gradient;
}

export function greetingForRecipient(name?: string): string {
  const trimmed = name?.trim();
  if (!trimmed) return "Привет!";
  return `Привет, ${trimmed}!`;
}

export type MoodListItem = {
  key: ThemeType;
  label: string;
  tagline: string;
  emoji: string;
};

export const MOOD_LIST: MoodListItem[] = THEME_ORDER.map((id) => ({
  key: id,
  label: THEME_CONFIG[id].labelRu,
  tagline: THEME_CONFIG[id].description,
  emoji: THEME_CONFIG[id].emoji,
}));
