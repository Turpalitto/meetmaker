"use client";

import { getTheme } from "@/lib/themes";

export function PostcardDecorations({ themeId }: { themeId: string }) {
  const theme = getTheme(themeId);
  const stickers = theme.stickers;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stickers.map((emoji, i) => (
        <span
          key={`${emoji}-${i}`}
          className="postcard-sticker absolute opacity-30"
          style={{
            left: `${10 + i * 22}%`,
            top: `${8 + (i % 2) * 40}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: i === 0 ? "1.75rem" : "1.1rem",
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
