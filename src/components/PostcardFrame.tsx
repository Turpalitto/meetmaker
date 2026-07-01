"use client";

import { cn } from "@/lib/utils";
import { getThemeConfig } from "@/lib/themes";
import type { CardAppearance, ThemeType } from "@/types";

interface PostcardFrameProps {
  theme: ThemeType;
  children: React.ReactNode;
  className?: string;
  ribbon?: boolean;
  size?: "md" | "lg";
  variant?: "elevated" | "filled";
  appearance?: CardAppearance;
}

export function PostcardFrame({
  theme,
  children,
  className,
  ribbon = false,
  size = "lg",
  variant = "elevated",
  appearance = "light",
}: PostcardFrameProps) {
  const config = getThemeConfig(theme);

  return (
    <div
      className={cn(
        "md-section w-full mx-auto",
        size === "lg" ? "max-w-md" : "max-w-sm",
        className,
      )}
      data-appearance={appearance}
    >
      {ribbon && <p className="md-overline">{config.ribbon}</p>}
      <div
        className={cn(
          variant === "filled" ? "md-filled-card" : "md-elevated-card",
          "postcard-card md-card-enter p-5 sm:p-6 pt-6",
        )}
      >
        <div className="md-card-accent-bar" aria-hidden />
        {children}
      </div>
    </div>
  );
}
