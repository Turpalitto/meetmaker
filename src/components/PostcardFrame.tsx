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
  showStamp?: boolean;
}

export function PostcardFrame({
  theme,
  children,
  className,
  ribbon = false,
  size = "lg",
  showStamp = true,
}: PostcardFrameProps) {
  const config = getThemeConfig(theme);

  return (
    <div
      className={cn("w-full mx-auto", size === "lg" ? "max-w-md" : "max-w-sm", className)}
      data-theme={theme}
    >
      {ribbon && <p className="mm-eyebrow mb-2">{config.ribbon}</p>}
      <div className="mm-postcard mm-rise">
        <div className="mm-accent-bar" />
        {showStamp && (
          <span className="mm-stamp" aria-hidden>
            {config.emoji}
          </span>
        )}
        <div className={cn("p-6 sm:p-8", showStamp && "pr-20 sm:pr-24")}>{children}</div>
      </div>
    </div>
  );
}
