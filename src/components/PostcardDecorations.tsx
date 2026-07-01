"use client";

import { cn } from "@/lib/utils";
import { getThemeConfig } from "@/lib/themes";
import type { ThemeType } from "@/types";

interface PostcardDecorationsProps {
  theme: ThemeType;
  className?: string;
}

/** Soft floating stickers for postcard screens */
export function PostcardDecorations({ theme, className }: PostcardDecorationsProps) {
  const config = getThemeConfig(theme);
  const stickers = config.stickers;

  return (
    <div
      className={cn("postcard-decor pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {stickers.map((emoji, i) => (
        <span
          key={`${emoji}-${i}`}
          className="postcard-sticker"
          style={{
            left: `${8 + i * 22}%`,
            top: `${12 + (i % 2) * 38}%`,
            animationDelay: `${i * 0.35}s`,
            fontSize: i === 0 ? "1.75rem" : "1.25rem",
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
