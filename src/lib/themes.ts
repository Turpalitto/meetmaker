export type Theme = {
  id: string;
  label: string;
  description: string;
  tagline: string;
  stickers: string[];
  gradient: string;
  cardGradient: string;
  accent: string;
  text: string;
  subtext: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  selectedBg: string;
  selectedBorder: string;
  hoverBg: string;
  tag: string;
};

export const THEMES: Theme[] = [
  {
    id: "sunset",
    label: "Свидание",
    description: "Нежно, по-вечернему",
    tagline: "Буду ждать нашей встречи",
    stickers: ["💗", "✨", "🌸", "🕯️"],
    gradient: "from-orange-400 via-pink-500 to-purple-600",
    cardGradient: "from-orange-50 via-pink-50 to-purple-50",
    accent: "text-pink-600",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-pink-200",
    buttonBg: "bg-gradient-to-r from-orange-400 to-pink-500",
    buttonText: "text-white",
    selectedBg: "bg-pink-100",
    selectedBorder: "border-pink-400",
    hoverBg: "hover:bg-pink-50",
    tag: "bg-pink-100 text-pink-700",
  },
  {
    id: "gold",
    label: "Кофе",
    description: "Уютно и по-домашнему",
    tagline: "С удовольствием встречу тебя за чашкой",
    stickers: ["☕", "🥐", "✨", "🤎"],
    gradient: "from-amber-400 via-yellow-400 to-orange-400",
    cardGradient: "from-amber-50 via-yellow-50 to-orange-50",
    accent: "text-amber-600",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-amber-200",
    buttonBg: "bg-gradient-to-r from-amber-400 to-orange-400",
    buttonText: "text-white",
    selectedBg: "bg-amber-100",
    selectedBorder: "border-amber-400",
    hoverBg: "hover:bg-amber-50",
    tag: "bg-amber-100 text-amber-700",
  },
  {
    id: "forest",
    label: "Прогулка",
    description: "Свежо и без суеты",
    tagline: "Погуляем и поговорим",
    stickers: ["🌿", "🦋", "✨", "🌤️"],
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    cardGradient: "from-emerald-50 via-green-50 to-teal-50",
    accent: "text-emerald-600",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-emerald-200",
    buttonBg: "bg-gradient-to-r from-emerald-400 to-teal-500",
    buttonText: "text-white",
    selectedBg: "bg-emerald-100",
    selectedBorder: "border-emerald-400",
    hoverBg: "hover:bg-emerald-50",
    tag: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "lavender",
    label: "Друзья",
    description: "Легко и по-душам",
    tagline: "Давно хотел(а) увидеться",
    stickers: ["💜", "✨", "🎵", "🌙"],
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    cardGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
    accent: "text-violet-600",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-violet-200",
    buttonBg: "bg-gradient-to-r from-violet-400 to-fuchsia-500",
    buttonText: "text-white",
    selectedBg: "bg-violet-100",
    selectedBorder: "border-violet-400",
    hoverBg: "hover:bg-violet-50",
    tag: "bg-violet-100 text-violet-700",
  },
  {
    id: "ocean",
    label: "Океан",
    description: "Спокойно и ярко",
    tagline: "Встретимся у воды",
    stickers: ["🌊", "✨", "🐚", "☀️"],
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    cardGradient: "from-cyan-50 via-blue-50 to-indigo-50",
    accent: "text-blue-600",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-blue-200",
    buttonBg: "bg-gradient-to-r from-cyan-400 to-blue-500",
    buttonText: "text-white",
    selectedBg: "bg-blue-100",
    selectedBorder: "border-blue-400",
    hoverBg: "hover:bg-blue-50",
    tag: "bg-blue-100 text-blue-700",
  },
  {
    id: "rose",
    label: "Роза",
    description: "Романтично и смело",
    tagline: "Этот вечер — для нас",
    stickers: ["🌹", "💕", "✨", "🍷"],
    gradient: "from-rose-400 via-red-400 to-pink-500",
    cardGradient: "from-rose-50 via-red-50 to-pink-50",
    accent: "text-rose-600",
    text: "text-slate-900",
    subtext: "text-slate-500",
    border: "border-rose-200",
    buttonBg: "bg-gradient-to-r from-rose-400 to-pink-500",
    buttonText: "text-white",
    selectedBg: "bg-rose-100",
    selectedBorder: "border-rose-400",
    hoverBg: "hover:bg-rose-50",
    tag: "bg-rose-100 text-rose-700",
  },
];

/** Primary moods shown first in the wizard */
export const MOOD_THEME_IDS = ["sunset", "gold", "forest", "lavender"] as const;

export const EMOJIS = [
  "🌟", "💫", "✨", "🎉", "🥂", "☕", "🌸", "🌿",
  "🦋", "💗", "🌙", "🔥", "🍀", "🌈", "🎵", "🚀",
];

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function greetingForRecipient(name: string): string {
  const trimmed = name.trim();
  return trimmed ? `Привет, ${trimmed}!` : "Привет!";
}
