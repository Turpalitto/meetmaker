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
  md: "w-16 h-16 rounded-2xl",
  lg: "w-[72px] h-[72px] rounded-[20px]",
  xl: "w-20 h-20 rounded-[22px]",
};

const ICON_SIZES = {
  md: "h-8 w-8",
  lg: "h-9 w-9",
  xl: "h-10 w-10",
};

export function ThemeHeroIcon({
  theme,
  size = "lg",
  className,
  celebrate = false,
}: ThemeHeroIconProps) {
  const config = getThemeConfig(theme);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "md-app-icon flex items-center justify-center mx-auto md-elevation-2",
        SIZES[size],
        celebrate && "success-pop",
        className,
      )}
      style={{
        backgroundColor: config.primaryContainer,
        color: config.onPrimaryContainer,
      }}
    >
      <Icon className={ICON_SIZES[size]} strokeWidth={2} />
    </div>
  );
}
