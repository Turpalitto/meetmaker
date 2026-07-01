"use client";

import { cn } from "@/lib/utils";
import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

interface ThemeHeroIconProps {
  theme: ThemeType;
  size?: "md" | "lg" | "xl";
  className?: string;
  celebrate?: boolean;
}

const SIZES = {
  md: "w-16 h-16 rounded-[22px]",
  lg: "w-20 h-20 rounded-[28px]",
  xl: "w-24 h-24 rounded-[32px]",
};

const ICON_SIZES = {
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

export function ThemeHeroIcon({
  theme,
  size = "lg",
  className,
  celebrate = false,
}: ThemeHeroIconProps) {
  const config = getThemeConfig(theme);
  const Icon = config.icon;

  const gradientClass =
    theme === "coffee"
      ? "from-amber-600 to-orange-500"
      : theme === "romantic"
        ? "from-pink-500 to-rose-500"
        : "from-indigo-500 to-purple-500";

  return (
    <div
      className={cn(
        "theme-hero-icon bg-gradient-to-br flex items-center justify-center mx-auto",
        gradientClass,
        SIZES[size],
        celebrate && "success-pop",
        className,
      )}
    >
      <Icon className={cn("text-white", ICON_SIZES[size])} strokeWidth={1.5} />
    </div>
  );
}
