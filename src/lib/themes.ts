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

export const THEME_CONFIG: Record<ThemeType, ThemeConfig> = {
  romantic: {
    id: "romantic",
    label: "Date",
    labelRu: "Свидание",
    description: "Нежно, по-вечернему",
    gradient: "from-pink-300 to-rose-400",
    accent: "#E8919F",
    primaryContainer: "#FFD8E4",
    onPrimaryContainer: "#5C3A42",
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
    gradient: "from-amber-300 to-orange-400",
    accent: "#D4A574",
    primaryContainer: "#FFDCB8",
    onPrimaryContainer: "#5C3D1E",
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
    gradient: "from-emerald-300 to-teal-400",
    accent: "#8FB9A8",
    primaryContainer: "#D4EDE4",
    onPrimaryContainer: "#2D4A3E",
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
