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
  /** Large corner / floating decorations */
  decor: string[];
  /** Header ribbon pattern */
  ribbon: string;
  tagline: string;
}

export const THEME_CONFIG: Record<ThemeType, ThemeConfig> = {
  minimal: {
    id: "minimal",
    label: "Minimal",
    description: "Чистый, современный стиль",
    gradient: "from-indigo-500 to-purple-500",
    emoji: "✨",
    stickers: ["✨", "⭐", "💫", "🌟", "✦", "⚡", "🔮"],
    decor: ["✨", "⭐", "💫", "🌟"],
    ribbon: "✦ ✨ ✦ ✨ ✦",
    tagline: "Современно и легко",
    icon: Sparkles,
  },
  coffee: {
    id: "coffee",
    label: "Coffee",
    description: "Тёплая, уютная атмосфера",
    gradient: "from-amber-600 to-orange-500",
    emoji: "☕",
    stickers: ["☕", "🫘", "🍪", "🥐", "🧁", "🍩", "☕"],
    decor: ["☕", "🍪", "🥐", "🫘"],
    ribbon: "☕ 🍪 ☕ 🍪 ☕",
    tagline: "Тепло и уютно",
    icon: Coffee,
  },
  romantic: {
    id: "romantic",
    label: "Romantic",
    description: "Нежный, романтичный стиль",
    gradient: "from-pink-500 to-rose-500",
    emoji: "💕",
    stickers: ["💕", "💗", "🌸", "🎀", "💖", "🌹", "💝"],
    decor: ["💕", "🌸", "💖", "🎀"],
    ribbon: "💕 🌸 💕 🌸 💕",
    tagline: "Нежно и по-особенному",
    icon: Heart,
  },
};

export function getThemeConfig(theme: ThemeType): ThemeConfig {
  return THEME_CONFIG[theme];
}

export function themeGradientClass(theme: ThemeType): string {
  if (theme === "coffee") return "from-amber-500 via-orange-500 to-amber-700";
  if (theme === "romantic") return "from-pink-400 via-rose-500 to-fuchsia-600";
  return "from-indigo-400 via-violet-500 to-purple-600";
}
