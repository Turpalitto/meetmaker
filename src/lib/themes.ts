import { Coffee, Heart, Sparkles, type LucideIcon } from "lucide-react";
import type { ThemeType } from "@/types";

export interface ThemeConfig {
  id: ThemeType;
  label: string;
  description: string;
  gradient: string;
  emoji: string;
  stickers: string[];
  icon: LucideIcon;
}

export const THEME_CONFIG: Record<ThemeType, ThemeConfig> = {
  minimal: {
    id: "minimal",
    label: "Minimal",
    description: "Чистый, современный стиль",
    gradient: "from-indigo-500 to-purple-500",
    emoji: "✨",
    stickers: ["✨", "⭐", "💫", "🌟", "✦"],
    icon: Sparkles,
  },
  coffee: {
    id: "coffee",
    label: "Coffee",
    description: "Тёплая, уютная атмосфера",
    gradient: "from-amber-600 to-orange-500",
    emoji: "☕",
    stickers: ["☕", "🫘", "🍪", "🥐", "☕"],
    icon: Coffee,
  },
  romantic: {
    id: "romantic",
    label: "Romantic",
    description: "Нежный, романтичный стиль",
    gradient: "from-pink-500 to-rose-500",
    emoji: "💕",
    stickers: ["💕", "💗", "🌸", "🎀", "💖"],
    icon: Heart,
  },
};

export function getThemeConfig(theme: ThemeType): ThemeConfig {
  return THEME_CONFIG[theme];
}
